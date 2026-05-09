---
title: "Diffusion Planner"
slug: "端到端自动驾驶/diffusion-planner"
published: 2026-04-17
updated: 2026-04-17
description: "现实驾驶并不是这样。很多场景天然带有多解。跟车时，你可以稍微保守一些，也可以更积极一些；路口会车时，你可以先让一下，也可以在安全前提下稍早通过；并线时，你可以选择更早切入，也可以再观察半秒。换句话说，驾驶行为往往是多峰的，而不是单峰的。"
tags: ["端到端自动驾驶", "Diffusion", "轨迹规划", "生成模型"]
category: "端到端自动驾驶"
draft: false
---
# Diffusion 扩散模型基础
## 规划问题和生成模型
传统规划问题更像一个优化问题。给定当前环境、目标路线和车辆状态，系统应该算出一条未来轨迹，或者算出一串控制量。这种直觉没有错，但它隐含了一个前提：一个场景通常只有一条明显最优的轨迹。

现实驾驶并不是这样。很多场景天然带有多解。跟车时，你可以稍微保守一些，也可以更积极一些；路口会车时，你可以先让一下，也可以在安全前提下稍早通过；并线时，你可以选择更早切入，也可以再观察半秒。换句话说，驾驶行为往往是多峰的，而不是单峰的。

这正是生成模型适合介入的地方。相比只回归一条均值轨迹，生成模型更擅长表达一类可能的未来行为分布。Diffusion Planner 之所以吸引人，不是因为它把规划问题变得更花哨，而是因为它试图用扩散模型去刻画复杂、多模态、交互性很强的未来轨迹分布。

## 扩散模型理解
扩散模型可以先理解为：先学会怎样把一个被加噪到几乎看不出原样的对象一步步去噪，再利用这套去噪能力，从随机噪声逐步生成有结构的结果。

如果任务是图像生成，那么这个对象是一张图片。如果任务是轨迹生成，那么这个对象就是一段未来轨迹。如果任务是联合建模自车和邻车未来，那么这个对象就可以是一组参与者未来轨迹的集合。

所以，diffusion 的关键不在于图像，而在于下面这条生成思路：
1. 先定义一个逐步加噪过程，把真实数据慢慢破坏成近似高斯噪声。
2. 再训练一个模型，学习如何把噪声一步步恢复回有结构的数据。
3. 推理时从纯噪声开始，反复应用这个去噪模型，最终得到样本。

这就是 diffusion 模型最核心的思路。

下面这张图把最直观的过程画出来了。左边是一条结构清晰的未来轨迹，中间是逐步加噪后的带噪轨迹，最右侧接近纯高斯噪声。训练时模型真正学的是反向过程，也就是如何从这些不同噪声级别的状态一步步往更有结构的轨迹方向推回去。

<img src="%E9%99%84%E4%BB%B6/Pasted%20image%2020260416135252.png" alt="Pasted image 20260416135252" />

## 前向扩散过程
前向扩散过程的目标很简单：从真实样本出发，不断加一点点噪声，直到最后变成几乎纯噪声。

如果把原始数据记作 $\textbf{x}_0$，那么一步前向加噪可以写成：
$$
q(\textbf{x}_t \mid \textbf{x}_{t-1}) = \mathcal{N} \left( \sqrt{1-\beta_t}\,\textbf{x}_{t-1}, \beta_t \textbf{I} \right)
$$

这里的 $\beta_t$ 是第 $t$ 步的噪声强度。这个公式表达的是：在上一步的基础上，保留一点原信号，再加入一点高斯噪声。

经过很多步之后，原始结构会被逐渐淹没。最后的 $\textbf{x}_T$ 可以近似看成一个高斯噪声样本。你可以把这个过程想成把一条清晰轨迹逐渐打散，直到看不出它原本怎么走。

更常用的一种写法，是直接把任意时刻的带噪样本写成原始样本和高斯噪声的线性组合：
$$
\textbf{x}_t = \sqrt{\bar{\alpha}_t}\,\textbf{x}_0 + \sqrt{1-\bar{\alpha}_t}\,\boldsymbol{\epsilon}, \quad \boldsymbol{\epsilon}\sim\mathcal{N}(\textbf{0}, \textbf{I})
$$

这里的 $\bar{\alpha}_t$ 可以理解成信号保留比例，$\boldsymbol{\epsilon}$ 是标准高斯噪声。

这个表达式很重要，因为它告诉我们：给定一条真实轨迹 $\textbf{x}_0$，我们可以在任意噪声强度下，直接采样出它的带噪版本 $\textbf{x}_t$。

## 反向扩散过程
前向过程负责把数据毁掉，反向过程负责把数据救回来。扩散模型真正要学的是反向过程，也就是：
$$
p_\theta(\textbf{x}_{t-1} \mid \textbf{x}_t, \textbf{cond})
$$

这里的条件项 `cond` 可以是文本条件、图像条件，也可以是自动驾驶里的场景上下文，例如自车当前状态、邻车历史轨迹、静态障碍物、车道信息和路线信息。

它的含义是：当前我已经拿到了一个带噪版本 $\textbf{x}_t$，并且我知道当前场景条件，那么我能不能学会把它往更干净、更合理的方向推一步，得到 $\textbf{x}_{t-1}$。只要这一步学得足够好，连续做很多步，就能从噪声慢慢恢复出结构化轨迹。

## 为什么不直接学从噪声到结果的一步映射？
如果最终目标是从噪声变成轨迹，为什么不直接训练一个大网络一步输出结果？

原因在于，多步去噪比一步生成更容易学习复杂分布。把生成任务拆成很多个小修正步骤之后，每一步都只需要做局部调整，而不是一次性决定整条轨迹的所有细节。这种逐步修正的方式，对多模态、约束复杂、结构高度耦合的任务尤其有吸引力。

在自动驾驶里，一条未来轨迹不仅要符合道路几何，还要考虑前车、行人、相邻车道、路线目标以及自车动力学约束。如果要求模型一步直接做出全套决策，问题会很硬。扩散式的逐步生成，相当于给了模型一套反复修正轨迹的机会。

## 训练时让模型预测什么？
扩散模型训练时，未必直接预测 $\textbf{x}_{t-1}$。常见做法有三种：
1. 预测噪声 $\boldsymbol{\epsilon}$。
2. 预测干净样本 $\textbf{x}_0$。
3. 预测 score，也就是分布对输入的梯度方向。

以最常见的噪声预测为例，训练目标可以写成：
$$
\mathcal{L} = \mathbb{E}_{\textbf{x}_0, t, \boldsymbol{\epsilon}} \left[ \left\| \boldsymbol{\epsilon} - \boldsymbol{\epsilon}_\theta(\textbf{x}_t, t, \textbf{cond}) \right\|^2 \right]
$$

它的意思是，先从真实样本构造带噪样本 $\textbf{x}_t$，然后让模型去猜那一份噪声到底是什么。只要模型能把噪声猜对，就等于知道应该往哪个方向去噪。

有些模型则更喜欢直接预测干净样本：
$$
\mathcal{L} = \mathbb{E} \left[ \left\| \textbf{x}_0 - \hat{\textbf{x}}_{0,\theta}(\textbf{x}_t, t, \textbf{cond}) \right\|^2 \right]
$$

这两种目标都很常见，只是建模视角不同。

Diffusion Planner 的官方代码里就同时支持 `score` 和 `x_start` 两种模式。

## 条件扩散和无条件扩散
无条件扩散的任务，是从噪声中生成一个合理样本，但它不需要服从额外上下文。条件扩散则不同，它要求生成结果不仅合理，还要符合给定条件。

在自动驾驶规划里，条件项就是整个驾驶上下文。比如：
- 自车当前状态
- 邻车过去若干帧轨迹
- 静态障碍物
- 车道和地图结构
- 路由走廊或目标车道

所以 Diffusion Planner 不是在无条件地胡乱生成轨迹，而是在做条件扩散：给定场景上下文，让扩散模型从噪声中恢复出符合当前场景的未来轨迹。

# 为什么 diffusion 特别适合做规划？
## 规划天然是多峰的
自动驾驶规划最麻烦的一点，是同一个场景往往不只有一种合理未来。直接做回归时，模型很容易把多种合理行为平均掉，得到一条谁都不像的均值轨迹。比如左绕和右绕都可行时，平均出来的轨迹可能反而撞上障碍物。

扩散模型的优势在于，它不是一开始就被迫输出单个确定结果，而是通过逐步去噪在复杂分布上采样。只要条件建模得好，它就更有机会表达多种可行未来。

下面这张图可以把多峰这件事讲得更具体一些。上绕和下绕都是合理规划，但如果模型只能输出一个均值结果，最后反而可能落到障碍物中心附近。扩散模型的价值之一，就是避免把这种多解场景粗暴平均掉。

<img src="%E9%99%84%E4%BB%B6/Pasted%20image%2020260416135307.png" alt="Pasted image 20260416135307" />

## 规划质量不只是拟合历史轨迹
行为克隆式规划最常见的问题，是模型容易学到数据集里的平均动作，却不一定真正学会怎样在复杂场景里平衡安全、效率和舒适性。

扩散规划的一大吸引力，在于它允许你把轨迹生成视作一个分布建模问题，而不是单步动作回归问题。

这并不意味着 diffusion 自动比 imitation learning 高级，而是意味着它在建模复杂未来轨迹分布这件事上，形式上更自然。

## 轨迹可以被当成一个高维结构对象
对于扩散模型来说，一张图片是一个高维数组，一段轨迹同样也是。只要你愿意把未来轨迹写成一个张量，扩散模型就可以把它看成一个待生成对象。

在自动驾驶里，一条轨迹通常不只是位置点序列，还可能包含朝向、速度、甚至邻车未来。Diffusion Planner 正是走了这条路：把自车和关键邻车的未来状态拼成一个更大的结构对象，然后联合生成。

# Diffusion Planner 原理
## 论文思想
根据官方 README 和 OpenReview 页面，Diffusion Planner 的核心目标是：用一个 transformer-based diffusion planner 来做闭环自动驾驶规划，在不强依赖规则式 refinement 的前提下，建模多模态驾驶行为，并把规划和关键参与者的未来建模统一起来。

[官方仓库 README](https://github.com/ZhengYinan-AIR/Diffusion-Planner) 明确强调了三点：基于 DiT 的结构、联合建模邻车状态、以及大约 20Hz 的快速采样推理；

[ICLR 2025 OpenReview 页面](https://openreview.net/forum?id=wM2sfVgMDH) 则把它概括为 transformer-based closed-loop planning with flexible guidance。

如果把这些话翻译成更工程化的语言，大致可以理解成：
- **不只预测自车未来，还一起预测关键邻车未来。**
- 把这件事统一写成未来轨迹生成问题。
- 训练时学习从带噪未来轨迹恢复出合理未来。
- 推理时从随机噪声出发，逐步生成自车和邻车未来。
- 必要时再通过 guidance 去偏向更安全或更符合路线约束的结果。

## 生成结果
从官方代码的 `decoder.py` 可以看到，核心输出维度是：
```matlab
output_dim = (future_len + 1) * 4  # x, y, cos, sin
```

也就是说，Diffusion Planner 生成的基本对象不是单个方向盘角度，而是一段状态序列。每个时间步包含四个量：
- `x`
- `y`
- `cos(yaw)`
- `sin(yaw)`

这里用 `cos` 和 `sin` 而不是直接用角度，是一个常见技巧，用来避免角度在 `-pi` 和 `pi` 附近的跳变问题。

更重要的是，它不是只为自车生成未来。官方 README 明确提到 joint modeling of key participants' statuses，而训练代码里也能看到它把 `ego_future` 和 `neighbors_future` 拼接起来一起作为未来状态进行建模。这意味着它把规划和一部分运动预测统一到了同一个扩散生成问题里。

## 输入上下文
从 `encoder.py` 和 `decoder.py` 的官方代码结构可以看到，模型的上下文至少包含三大块：
- 邻车历史轨迹 `neighbor_agents_past`
- 静态目标 `static_objects`
- 车道向量与相关属性 `lanes`, `lanes_speed_limit`, `lanes_has_speed_limit`

此外，解码阶段还使用：
- 自车当前状态 `ego_current_state`
- 路线相关车道 `route_lanes`

也就是说，Diffusion Planner 并不是直接从摄像头原图起步，而是建立在已经整理过的结构化场景输入之上。这一点很重要，因为它说明它的重点不在端到端像素理解，而在于利用结构化上下文做未来联合生成。

## 为什么它要联合建模邻车未来
如果只生成自车未来，就必须把其他交通参与者未来的影响全部压进上下文特征里。这样当然可以做，但交互关系会更难显式表达。

Diffusion Planner 的一个关键设计，是把邻车未来也放进同一个生成对象里。这样模型就不是先单独预测别人、再单独规划自己，而是在一个统一生成过程中同时考虑它们之间的协调关系。

直觉上，这更像是在同时生成一段多主体未来片段，而不是把自车当作完全孤立的规划者。对于会车、让行、并线这种强交互场景，这种联合建模是有吸引力的。

# 从扩散模型到 Diffusion Planner 的训练
## 第一步：把未来轨迹整理成训练目标
在官方 `loss.py` 里，训练从 `ego_future` 和 `neighbors_future` 出发，先把它们拼接成统一的未来状态张量，再把当前状态也拼进去。

代码里可以看到这样的思路：
```python
gt_future = torch.cat([ego_future[:, None, :, :], neighbors_future[..., :]], dim=1)
current_states = torch.cat([ego_current[:, None], neighbors_current], dim=1)
all_gt = torch.cat([current_states[:, :, None, :], norm(gt_future)], dim=2)
```

这段逻辑的含义是：
- 把自车未来和邻车未来拼成统一未来目标。
- 把当前时刻状态作为时间轴第一个点固定保留。
- 对未来部分做归一化，方便训练。

所以从训练角度看，模型看到的不是单条 ego trajectory，而是一个多参与者、带当前状态起点的未来状态块。

## 第二步：随机采样扩散时间和噪声
官方损失函数里，会随机采样一个扩散时刻 `t`，再采样一份高斯噪声 `z`：
```python
t = torch.rand(B, device=gt_future.device) * (1 - eps) + eps
z = torch.randn_like(gt_future, device=gt_future.device)
```

然后通过 SDE 的 `marginal_prob` 计算当前时刻带噪分布的均值和方差，并构造带噪未来：
```python
mean, std = marginal_prob(all_gt[..., 1:, :], t)
xT = mean + std * z
xT = torch.cat([all_gt[:, :, :1, :], xT], dim=2)
```

这里有一个很值得注意的设计：它只对未来部分加噪，而把当前状态保持不动。也就是说，模型永远知道当前真实状态，扩散过程主要作用在未来轨迹上。

## 第三步：把带噪未来交给解码器恢复
训练时，`decoder.py` 接收的输入里会带上：
- `sampled_trajectories`
- `diffusion_time`

然后调用 `self.dit(...)` 去预测未来状态：
```python
return {
    "score": self.dit(
        sampled_trajectories,
        diffusion_time,
        ego_neighbor_encoding,
        route_lanes,
        neighbor_current_mask
    ).reshape(B, P, -1, 4)
}
```

这说明解码器的核心任务是：给定当前带噪的多主体轨迹、扩散时间 `t`、场景编码和路线编码，输出对未来状态的恢复结果。

## 第四步：根据模型类型定义损失
官方 `loss.py` 里支持两种模式：

### 模式一：预测 score
如果 `model_type == "score"`，损失写成：

$$\mathcal{L}_{\mathrm{score}} = \left\| \hat{\textbf{s}} \cdot \sigma_t + \boldsymbol{\epsilon} \right\|^2$$

代码里对应的是：

`dpm_loss = torch.sum((score * std + z)**2, dim=-1)`

这个写法本质上是在学习 trajectory score function 的梯度方向。

### 模式二：直接预测干净未来
如果 `model_type == "x_start"`，损失写成：

$$\mathcal{L}_{x_0} = \left\| \hat{\textbf{x}}_0 - \textbf{x}_0 \right\|^2$$

代码里对应的是：

`dpm_loss = torch.sum((score - all_gt[:, :, 1:, :])**2, dim=-1)`

尽管变量名还是 `score`，但在这种模式下，它实际扮演的是预测干净未来的角色。

## 第五步：同时优化 ego planning 和 neighbor prediction
官方实现没有把自车和邻车混成一个单一平均损失，而是分别统计：
- `ego_planning_loss`
- `neighbor_prediction_loss`

这很符合它的建模目标。因为它本来就是在一个架构里联合处理规划和关键参与者未来建模。这样做的好处是，自车规划质量不会被邻车数量简单稀释，邻车未来建模也能单独受到约束。

# 推理
## 初始化：当前状态固定，未来全是噪声
在 `decoder.py` 的推理分支里，官方代码会先构造一个初值 `xT`：
```python
xT = torch.cat(
    [current_states[:, :, None], torch.randn(B, P, future_len, 4).to(current_states.device) * 0.5],
    dim=2
).reshape(B, P, -1)
```

这里的意思很直接：
- 时间轴第一个状态点使用真实当前状态。
- 未来部分全部从随机噪声初始化。

所以推理的起点不是一条模糊轨迹，而是当前已知、未来未知的结构。扩散采样只需要逐步把未来那一段从噪声恢复出来。

## 采样过程中强制保持当前状态不变
紧接着，代码定义了一个 `initial_state_constraint`：
```python
def initial_state_constraint(xt, t, step):
    xt = xt.reshape(B, P, -1, 4)
    xt[:, :, 0, :] = current_states
    return xt.reshape(B, P, -1)
```

这一步非常关键。它意味着无论扩散采样走到哪一步，时间轴第一个状态都会被重置为真实当前状态。这样做的目的，是防止模型在反向采样过程中连当前状态一起漂移。

从规划角度看，这相当于在生成过程中显式施加一个边界条件：规划必须从真实当前状态出发。

如果只看代码，这个约束很容易被忽略。下面这张图把它单独画出来了。每一步采样时，模型只对未来时域做去噪修正，当前状态点始终被强制钉在真实值上，所以扩散生成的不是整段可以随意漂移的轨迹，而是从真实当前状态出发的未来轨迹。

<img src="%E9%99%84%E4%BB%B6/Pasted%20image%2020260416135336.png" alt="Pasted image 20260416135336" />

## 用 DPM-Solver 做快速采样
官方代码推理时通过 `dpm_sampler(...)` 进行反向采样。README 里提到 fast inference around 20Hz，本质上依赖的就是比最朴素逐步采样更高效的数值解法。你可以把 DPM-Solver 理解成一种更快的扩散 ODE / SDE 求解器，它减少了达到可用结果所需的采样步数。

对自动驾驶来说，这一点很重要。因为规划是在线闭环任务，不能像离线图像生成那样慢慢采很多步。如果生成一条轨迹要几百步、每步都很慢，那它很难真正进入车载闭环系统。

## guidance 是怎么加进去的
在推理分支里，`model_wrapper_params` 中可以看到：
```python
"classifier_fn": self._guidance_fn,
"guidance_scale": 0.5,
"guidance_type": "classifier" if self._guidance_fn is not None else "uncond"
```

同时，官方指导文档 documentation_guidance.md 说明，可以自己写一个 guidance 函数：
```python
def my_guidance_fn(x, t, cond, inputs) -> torch.Tensor:
    ...
    return reward
```

这说明 Diffusion Planner 的 guidance 机制，本质上是允许你在采样过程中附加一个偏好函数或奖励函数，让生成结果往更偏好的方向调整。

从直觉上说，如果原始 diffusion 只负责生成一条在数据分布里看起来合理的轨迹，那么 guidance 则可以额外告诉它：
- 更偏向安全一点
- 更贴近路线一点
- 更少碰撞风险一点
- 更符合某种驾驶风格一点

这也是论文标题里 flexible guidance 的来源。

## 一个极简的推理伪代码
把上面的流程压缩成最简版，可以写成：
```python
def sample_plan(context, current_state):
    x = init_noise_future_with_fixed_current(current_state)
    for step in reversed(range(N)):
        pred = model(x, step, context)
        x = solver_update(x, pred, step)
        x = enforce_current_state(x, current_state)
        if guidance_fn is not None:
            x = apply_guidance(x, step, context)
    return denormalize(x)
```

这段代码并不是官方源码，而是把 Diffusion Planner 推理阶段最核心的逻辑压缩成了一个便于理解的骨架。

# 官方实现到底是怎么组织的？
## 顶层结构：一个编码器加一个解码器
从官方仓库 `diffusion_planner/model/diffusion_planner.py` 看，顶层结构很清楚：
```python
class Diffusion_Planner(nn.Module):
    def init(self, config):
        self.encoder = Diffusion_Planner_Encoder(config)
        self.decoder = Diffusion_Planner_Decoder(config)

    def forward(self, inputs):
        encoder_outputs = self.encoder(inputs)
        decoder_outputs = self.decoder(encoder_outputs, inputs)
        return encoder_outputs, decoder_outputs
```

所以整个系统不是一个单体大网络，而是明显分成两段：
- 编码器负责把结构化场景输入编码成上下文。
- 解码器负责在扩散框架下，根据上下文恢复未来轨迹。

## 编码器：把场景拆成几类 token 再融合
官方 `encoder.py` 里最重要的部分是：
```python
self.neighbor_encoder = AgentFusionEncoder(...)
self.static_encoder = StaticFusionEncoder(...)
self.lane_encoder = LaneFusionEncoder(...)
self.fusion = FusionEncoder(...)
self.pos_emb = nn.Linear(7, config.hidden_dim)
```

这说明编码器把场景显式拆成三种来源：
- 动态邻车
- 静态目标
- 车道和地图元素

三类输入分别做专门编码，然后再拼接起来融合。更进一步，代码里还对位置做了显式嵌入，注释写得很清楚，位置编码包含：
- `x`
- `y`
- `cos`
- `sin`
- `type`

这和前面讨论的场景表示是一致的。Diffusion Planner 不是直接把所有输入硬塞给一个统一网络，而是先按对象类型做结构化编码，再进入更统一的融合空间。

## `AgentFusionEncoder` 在做什么
`AgentFusionEncoder` 负责处理邻车历史。官方代码里可以看到它使用了两类预投影：
```python
self.channel_pre_project = Mlp(in_features=8+1, ...)
self.token_pre_project = Mlp(in_features=time_len, ...)
```

这说明它既在通道维上压缩状态特征，也在时间维上压缩历史轨迹长度，然后再通过若干 `MixerBlock` 和最终投影得到 agent token。你可以把它理解成：先在单个目标内部，把历史轨迹揉成一个紧凑表示，再把这个表示交给后面的全局融合器。

## `StaticFusionEncoder` 和 `LaneFusionEncoder`
`StaticFusionEncoder` 相对简单，主要把静态目标状态直接投影到隐藏空间。`LaneFusionEncoder` 则更复杂一些，因为车道不只是几何折线，还带着速度限制和交通属性。官方代码里能看到：
```python
self.speed_limit_emb = nn.Linear(1, channels_mlp_dim)
self.traffic_emb = nn.Linear(4, channels_mlp_dim)
```

这说明车道编码不仅考虑线段几何，还显式融合了速度限制和交通控制相关属性。对于规划任务来说，这是合理的，因为路线是否可行，不只取决于空间几何，还取决于规则语义。

## 编码器最终怎么融合
`encoder.py` 中关键的融合步骤是：
```python
encoding_input = torch.cat([encoding_neighbors, encoding_static, encoding_lanes], dim=1)
encoding_pos = torch.cat([neighbor_pos, static_pos, lane_pos], dim=1)
encoder_outputs["encoding"] = self.fusion(encoding_input, encoding_mask)
```

这意味着前面三类 token 被拼成一串统一 token 序列，再通过一个融合模块做全局交互建模。从结构上看，这非常像典型的 token-based 场景编码器：前面先做对象级特征抽取，后面再做全局上下文融合。

## 解码器：真正的 diffusion planning 发生在哪里
真正负责扩散建模的是 `decoder.py` 里的 `Decoder` 和内部的 `DiT`。在初始化时，官方代码直接写了：
```python
self._sde = VPSDE_linear()
self.dit = DiT(...)
```

这说明它采用的是基于 VP-SDE 的扩散框架，主干网络则是一个 DiT 风格结构。这里的 DiT 可以理解成把 diffusion model 和 transformer block 结合起来的解码器。

## DiT 里输入：轨迹 token
从 `decoder.py` 可以看到，解码器把采样轨迹 reshape 成：
```python
sampled_trajectories.reshape(B, P, -1)
```

然后在 `DiT` 里做 `preproj` 投影：
```python
self.preproj = Mlp(in_features=output_dim, hidden_features=512, out_features=hidden_dim, ...)
```

这说明在 Diffusion Planner 里，DiT 的基本 token 不是图像 patch，而是某个参与者的一整段当前加未来状态。这里的参与者维度 `P` 通常包括自车和若干关键邻车。

也就是说，DiT 在这里更像一个多主体未来生成器，而不是一个图像生成器。

## 时间步嵌入和路线编码怎么进入 DiT
官方 `dit.py` 中可以看到：
```python
self.t_embedder = TimestepEmbedder(hidden_dim)
route_encoding = self.route_encoder(route_lanes)
y = route_encoding
y = y + self.t_embedder(t)
```

这一步很值得注意。扩散时间步 `t` 和路线编码被加到同一个条件向量里，后面作为 DiT block 的调制信号使用。这意味着 DiT 在每一步去噪时都知道两件事：
- 当前处在哪个扩散阶段
- 当前路线条件是什么

这和图像 diffusion 里常见的 timestep conditioning 非常类似，只不过这里额外加入了规划任务强相关的 route condition。

## DiT block 内部的注意力机制
从官方 `dit.py` 可以看到，每个 `DiTBlock` 同时包含：
- 自注意力 `self.attn`
- 前馈网络 `self.mlp1`
- 交叉注意力 `self.cross_attn`
- 第二个前馈网络 `self.mlp2`

并且还使用了 `adaLN-Zero` 风格的条件调制。关键前向逻辑大致是：
```python
modulated_x = modulate(self.norm1(x), shift_msa, scale_msa)
x = x + gate_msa.unsqueeze(1) * self.attn(modulated_x, modulated_x, modulated_x, ...)[0]

modulated_x = modulate(self.norm2(x), shift_mlp, scale_mlp)
x = x + gate_mlp.unsqueeze(1) * self.mlp1(modulated_x)

x = self.cross_attn(self.norm3(x), cross_c, cross_c)[0]
x = self.mlp2(self.norm4(x))
```

可以把它理解成三层含义：
1. 先在参与者 token 内部做自注意力，让自车和邻车未来候选彼此交互。
2. 用 route + timestep 条件通过 adaLN 调制网络行为。
3. 再通过交叉注意力把编码器输出的场景上下文 `cross_c` 注入进来。

这意味着 DiT 不是只盯着带噪轨迹本身，它还会持续从场景编码器拿上下文信息。

## cross attention
如果没有交叉注意力，解码器只能在带噪轨迹 token 之间自娱自乐。它知道当前未来片段长什么样，却不一定能高效读取场景上下文。

有了 cross attention 之后，解码器在每一步去噪时都能主动去查询编码器给出的场景 token。这使得生成的未来轨迹可以持续参考：
- 邻车历史和当前状态
- 静态障碍物
- 地图和车道结构

从自动驾驶角度看，这正是扩散规划能真正落到条件规划任务上的关键。

# 参考资料
- [Diffusion Planner 官方 OpenReview 页面](https://openreview.net/forum?id=wM2sfVgMDH)
- [Diffusion Planner 官方代码仓库](https://github.com/ZhengYinan-AIR/Diffusion-Planner)
- [Diffusion Planner 项目页](https://zhengyinan-air.github.io/Diffusion-Planner/)
- [Denoising Diffusion Probabilistic Models 官方项目页](https://hojonathanho.github.io/diffusion/)
