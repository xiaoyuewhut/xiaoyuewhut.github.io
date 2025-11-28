---
title: Actor-Critic 方法
date: 2025-11-27 12:18:30
tags:
- 强化学习
- 控制理论
categories:
- 控制
cover: https://cdn.jsdelivr.net/gh/xiaoyuewhut/image@main/20251127122048503.png
---

# 为什么需要Actor-Critic？
在传统强化学习（RL）中，有两种方法：

+ 策略梯度（Policy Gradient）：是让agent直接学习一个policy，什么样的state该做什么样的action。但这种方法训练时波动大，效率低。
+ 价值函数方法（Value-based）：例如**Q-learning**，让agent学习“某个状态或动作的价值有多大”，但难以处理连续动作（ 比如自动驾驶汽车方向盘的角度）。

**Actor-Critic方法将两者结合，Actor负责做出action，Critic负责评估价值**，也就是action value或者state value：

+ Actor: policy update
+ Critic: policy evaluation or value estimation

## 一个例子说明如何结合？
1. 假如有一个目标函数$J(\theta)$，可以使state value也可以使action value

2. 通过梯度上升算法，最大化$J(\theta)$如下
   $$
   \theta_{t+1} = \theta_t + \alpha \mathbb{E}_{S \sim \eta,A \sim \pi}[\nabla \ln \pi (A|S, \theta_t) q_\pi(S, A)]
   $$

3. 通过采样，避免直接计算期望$\mathbb{E}$：
   $$
   \theta_{t+1} = \theta_t + \alpha \nabla_\theta \ln \pi (a_t|s_t, \theta_t) q_\pi(s_t, a_t)
   $$

4. 由$\theta_t$到$\theta_{t+1}$的过程就是actor的更新，也就是policy update

5. 对$q_\pi(s_t,a_t)$的estimation就是Critic的更新

# Critic简要介绍

## The core task of Critic
简而言之，评估状态s下执行a的长期收益：
$$
Q(s,a)=\mathbb{E}[未来累积奖励|s,a]
$$
## How to update the action value（Q value）？
在Actor-Critic中，Q的更新依赖于**时序差分误差（TD Error）**，通过不断地修正预测值，来逼近真实的长期收益。

$$
Q(s,a) \leftarrow Q(s,a)+\alpha [实际奖励+\gamma Q(s',a')-Q(s,a)]
$$
这种就是最简单的Critic更新方法。

# Advantage Actor-Critic (A2C)方法
A2C是AC的一个改进版本，核心思想是引入**优势函数**（Advantage Function）来替代传统的Action value (Q)或时序差分误差（TD Error）。

## 优势函数
Advantage Function用来衡量某个action相对于当前state的平均价值有多好：
$$
A(s,a)=Q(s,a)-V(s)
$$

+ $Q(s,a)$ 是动作价值
+ $V(s)$是状态价值

比如说，action value $V(s)$是60，表明当前状态$s$下，采取所有动作收到的价值是60：

+ 如果$Q(s,a)=50,A(s,a)=-10$，就说明当前action实在是有点差，够不上平均水平。
+ 如果$Q(s,a)=100,A(s,a)=40$，说明这个action太好了，高于平均水准

## 为什么需要引入优势函数?
+ 如果状态本身的“基础value”较高，Actor可能会选择哪些“看似高Q值但实则优势较小”的动作，也就是此时Q实际上和a不太相关了。
+ Q或TD误差可能会有比较大的波动导致训练不稳定。

## Baseline
在A2C中，baseline就是状态价值函数$V(s)$，它的作用是减少policy gradient的方差。

policy gradient原本的更新为：
$$
\Delta \theta \propto Q(s,a) \cdot \nabla_\theta \log \pi(a|s)
$$
引入baseline后：
$$
\Delta \theta \propto (Q(s,a)-V(s)) \cdot \nabla_\theta \log \pi(a|s)
$$
到这里baseline和advantage function就对上了，也就是baseline实际上是优势函数的偏置。

> 简单解释一下这个公式

| **符号**               | **含义**                                                     |
| ---------------------- | ------------------------------------------------------------ |
| $ \Delta \theta $      | 策略参数 $ \theta $ 的更新量（调整方向）                     |
| $ \propto $            | “正比于”，表示更新量的幅度与右侧表达式的大小相关             |
| $ Q(s, a) $            | 动作价值函数，表示在状态 $ s $ 下执行动作 $ a $ 的长期预期收益 |
| $ \nabla_{\theta} $    | 对参数 $ \theta $ 求梯度（即调整参数的方向）                 |
| $ \log \pi(a \mid s) $ | 策略 $ \pi $ 在状态 $ s $ 下选择动作 $ a $ 的对数概率        |

也就是advantage function对策略对数概率的梯度，正比影响到policy参数$\theta$的更新量。

## 将优势函数简化
$$
\begin{aligned}
A(s,a) &= Q(s,a) - V(s) \\
&= \text{reward} + \gamma V(S')-V(s)
\end{aligned}
$$
可以看出这个替换是根据_Bellman Function_来的，发现这就是个TD error。

所以这个时候，比如原来在Critic中，要两个神经网络拟合$Q(s,a)$和$V(s)$，现在只需要一个拟合$V(s)$。

# Off-policy actor-critic

## 什么是on/off policy？
+ 拿做蛋糕举例子，强化学习的过程就是在找到**最佳配方**

__On-policy__

用配方1做了一个蛋糕，太甜了，于是减少20g的糖，做了一个，还是太甜，又减少10g糖。

__Off-policy__

尝试了多种配方123,1太甜，2有点甜，3太淡，那就比2少一点糖。

| 场景     | On-policy                      | Off-policy                         |
| -------- | ------------------------------ | ---------------------------------- |
| 配方更新 | 必须用最新配方，旧数据丢弃     | 可混合使用所有历史数据             |
| 学习效率 | 低（每次调整需重新做蛋糕）     | 高（利用所有试验结果）             |
| 探索能力 | 受限（只能按当前配方微调）     | 强（可尝试多种配方，甚至他人方法） |
| 实际应用 | 适合简单任务（如少量材料调整） | 适合复杂任务（需多维度优化）       |

## 为什么A2C是on-policy的？
policy的更新依赖于实时数据计算的advantage function $A(s,a)$和state value $V(s)$，更新后，旧的$A(s,a)$和$V(s)$已经过期了，无法反应新策略的价值，也就是“**不允许复用历史数据/经验回放**”。

A2C禁用经验回放的原因是$A(s,a)$和$V(s)$是依赖当前policy的。

## 如何将A2C改进为off-policy？
一种方式是“**重要性采样（importance sampling）**”，接下来会把旧策略称为“**行为策略**”$\beta(a|s)$，新策略称为“**目标策略**”$\pi(a|s)$。

我们希望估计目标策略下的期望值$\mathbb{E}_{a \sim \pi}[Q(s,a)]$
$$
\mathbb{E}_{a \sim \pi}[Q(s,a)] = \mathbb{E}_{a\sim\beta}[\frac{\pi(a|s)}{\beta(a|s)}Q(s,a)]
$$
拿机器人举例子，通过神经网络学习policy，做出左转、右转、直行的动作，神经网络参数为$\theta$。

1. **第t步训练**

   + 行为策略$\beta$是使用旧参数$\theta_{old}$的神经网络（例如左转概率 50%，右转 30%，直行 20%）
   + 随机采样，左转，得到奖励$r$，进入新状态$r'$
   + 记录数据$(s,a,r,s')$

2. **第t+1步训练**

   + 更新policy $\pi(s,a)$和$\theta$，左转概率变为 60%，采样还是左转。

   + 采样旧数据

   + 计算重要性权重：
     $$
     \rho = \frac{\pi_{new}(左转|s)}{\beta(左转|s)} = \frac{0.6}{0.5}=1.2
     $$

   + 策略梯度更新，也就是在前面乘上这**个importance weight**。
    $$
    \Delta \theta \propto \rho \cdot (Q(s,a)-V(s)) \cdot \nabla_\theta \log \pi(a|s)
    $$

# Deterministic Actor-Critic 
 > **Deterministic Actor-Critic（确定性 Actor-Critic）** 是 Actor-Critic 框架的一种变体，其核心特点是 **策略（Actor）输出确定性动作**，而非动作的概率分布。这种方法特别适用于 **连续动作空间** 的任务（如机器人控制、自动驾驶），在训练效率和稳定性上表现优异

和stochastic actor-critic不同的是，在deterministic actor-critic方法中，policy不再用$\pi$表示，而是$\mu$，代表一种映射:
$$
a=\mu (s,\theta)
$$
也可以简写成$\mu (s)$，$a$是一个确定性动作，而不是概率分布。

它的policy gradient为：
$$
\nabla_{\theta} J(\theta) = \mathbb{E}_{s \sim \rho^{\mu}} \left[ \nabla_{\theta} \mu(s) \cdot \nabla_{a} Q^{\mu}(s,a) \bigg|_{a = \mu(s)} \right]
$$

## 为什么它是天然的off-policy？
只要behavior policy $\beta$ 覆盖target policy $\mu$ 的状态空间，梯度公式中的状态分布可以替换为$\rho^\beta$，也就是梯度更新仅依赖状态分布的覆盖性，动作无概率分布差异，因此无需修正动作分布。

## 在这里$\mu$和$\beta$的区别，以自动驾驶为例

### $\mu$

是训练后的实际的优化策略，输出精确稳定的控制指令。

### $\beta$

是训练过程中的，负责探索的角色，$\mu + \text{noise} = \beta$，用来增加探索性。比如$\mu$ 的输出动作：方向盘右转 0.15 + 油门 0.3。但$\beta$做出实际动作：方向盘右转 0.15 + **随机噪声** 0.05 → 实际动作 = 右转 0.2，油门 0.3 + **随机噪声** -0.1 → 实际油门 0.2。
