---
published: 2026-06-10
updated: 2026-06-10
---
# Euro NCAP 智驾测评规程

# 1. 总体逻辑


> 📌 Euro NCAP 从 2026 开始采用<strong>新的四阶段评价体系</strong>，和 C-NCAP（[C-NCAP 智驾测评规程](./C-NCAP%20智驾测评规程.md)）按“乘员保护、VRU 保护、主动安全”加权计算综合得分率的方式不太一样。
>
> 理解 Euro NCAP 时，要先看 Stage，再看星级门槛，最后再落到 Safe Driving、Crash Avoidance 和 Assisted Driving 的具体项目。


---

## 1.1. 评价框架

Euro NCAP 2026+ 把整车安全拆成四个独立 Stage，每个 Stage 都按 100 分评价，然后用各 Stage 的达标情况决定车辆能达到的星级上限。

| Stage | 满分 | 权重 | 主要评价对象 |
|-|-|-|-|
| <strong>Safe Driving</strong> | 100 | 20 | 驾驶员、乘员、车速辅助、ACC、转向辅助、车控 HMI |
| <strong>Crash Avoidance</strong> | 100 | 20 | 前向碰撞、车道偏离、低速碰撞的避免或减轻 |
| <strong>Crash Protection</strong> | 100 | 50 | 正碰、侧碰、后碰、VRU 被动碰撞保护 |
| <strong>Post-Crash Safety</strong> | 100 | 10 | 救援信息、eCall、事故后干预、脱困能力 |


> ❗ <strong>注意：</strong>Euro NCAP 官方表里给四个 Stage 标了 Weight：Safe Driving 20、Crash Avoidance 20、Crash Protection 50、Post-Crash 10。
> 这个权重主要用于年度 <strong>Best in Class</strong> 加权排序，星级计算仍以各 Stage 门槛为核心。


## 1.2. 星级门槛

Euro NCAP 的星级门槛可以理解成“木桶原则”。车辆想拿到某个星级，四个 Stage 都必须达到该星级对应的最低分。某一个 Stage 明显短板，即使其他 Stage 很高，也会限制最终星级。

| 星级 | Safe Driving | Crash Avoidance | Crash Protection | Post-Crash |
|-|-|-|-|-|
| 5 星 | 80% | 80% | 80% | 80% |
| 4 星 | 70% | 70% | 70% | 70% |
| 3 星 | 60% | 60% | 60% | 60% |
| 2 星 | 50% | 50% | 50% | 50% |
| 1 星 | 40% | 40% | 40% | 40% |

举例来说，如果某车 Crash Protection、Post-Crash 都很高，但 Safe Driving 只有 65%，在常规门槛下它就不具备 5 星资格，因为 5 星要求 Safe Driving 至少 80%。这和“综合分高就能补短板”的直觉不同。

### 1.2.1. 软着陆

考虑到新体系切换需要开发周期，Euro NCAP 对 2026 和 2027 两年设置了 Soft Landing。这个软着陆只作用于 <strong>Safe Driving</strong> 和 <strong>Crash Avoidance</strong>，Crash Protection 和 Post-Crash 仍按常规门槛理解。

<table>
	<thead>
		<tr>
			<th rowspan="2">星级</th>
			<th colspan="2">Safe Driving</th>
			<th colspan="2">Crash Avoidance</th></tr>
	</thead>
	<tbody>
		<tr>
			<td>2026 </td>
			<td>2027 </td>
			<td>2026 </td>
			<td>2027 </td></tr>
		<tr>
			<td>5 星</td>
			<td>60%</td>
			<td>70%</td>
			<td>70%</td>
			<td>80%</td></tr>
		<tr>
			<td>4 星</td>
			<td>50%</td>
			<td>60%</td>
			<td>60%</td>
			<td>70%</td></tr>
		<tr>
			<td>3 星</td>
			<td>40%</td>
			<td>50%</td>
			<td>50%</td>
			<td>60%</td></tr>
		<tr>
			<td>2 星</td>
			<td>30%</td>
			<td>40%</td>
			<td>40%</td>
			<td>50%</td></tr>
		<tr>
			<td>1 星</td>
			<td>20%</td>
			<td>30%</td>
			<td>30%</td>
			<td>40%</td></tr>
	</tbody>
</table>


> ✅ <strong>工程解读：</strong>2026 年新体系刚实施，Safe Driving 获得过渡窗口。到 2027 年，Safe Driving 门槛提高；到完整门槛阶段，Safe Driving 和 Crash Avoidance 都会成为拿高星的硬约束。
> 所以可以说：<strong>2026 年 Safe Driving 达到 60%、Crash Avoidance 达到 70%，就可能满足 5 星在这两个 Stage 上的过渡门槛</strong>，不必一开始就都达到完整的 80%。


### 1.2.2. 分数补偿

Euro NCAP 2026+ 引入了一个补偿规则：前三个 Stage 中，如果某个 Stage 有富余分，最多可以拿 <strong>5 分</strong> 去补偿相邻 Stage，以帮助车辆达到更高星级。但这个补偿有边界：

- 只能补偿相邻 Stage，例如 Safe Driving 可以和 Crash Avoidance 相邻，Crash Avoidance 可以和 Safe Driving / Crash Protection 相邻。
- Safe Driving 和 Crash Protection 不相邻，因此不能直接互相补偿。
- 同一份富余分只能用一次，不能重复补多个地方。
- 这个规则主要用于提高评分稳定性，不应被理解为允许某一大块长期明显短板。


> ✅ <strong>可以理解为：</strong>Crash Avoidance 多出来的一点分，可能补 Safe Driving 或 Crash Protection 的小缺口。

> ❌ <strong>不能理解为：</strong>只要 AEB 做得很好，就能完全抵消 DMS、HMI、被动安全或事故后安全的不足。


### 1.2.3. Backstop

#### 1.2.3.1. 与扣分的区别

普通扣分是某个项目表现不好，导致该项目少拿分；Backstop 则更像一道门槛或封顶条件。它不一定体现为“扣几分”，而可能直接影响某个项目能不能计分，或者限制整车最高星级。


> ✅ <strong>普通得分逻辑：</strong>某个 AEB 场景没避开碰撞，该测试点少拿分，最终影响 Crash Avoidance 分数。

> 💡 <strong>Backstop 逻辑：</strong>即使某些 Stage 分数已经达到 5 星门槛，只要触发关键封顶规则，最终也可能不能拿 5 星。


#### 1.2.3.2. 辅助驾驶约束

如果车辆提供 Assisted Driving 系统，无论是标配还是选装，都不能只看纵向/横向控制能力。Euro NCAP 要求该 AD 系统在 Assisted Driving Grading 中，<strong>Driver Monitoring</strong> 和 <strong>Driving Collaboration</strong> 分别达到至少 50%，Safe Driving 里的 Driver Engagement 才能正常获得相关分数。

| 约束点 | 规程含义 | 工程含义 |
|-|-|-|
| Driver Monitoring ≥ 50% | 辅助驾驶开启时，系统需要有效识别驾驶员是否仍在监督道路和系统。 | DMS 不能只是满足法规最低提醒；要覆盖视线、分心、手机使用、睡眠/失能等关键状态，并能触发合理的提醒和干预。 |
| Driving Collaboration ≥ 50% | 驾驶员介入转向或接管时，系统需要表现出合理协作，避免和驾驶员“抢控制权”。 | LCC/NOA 的横向控制要能被自然覆盖、退出或恢复；接管扭矩、接管响应、变道/避障时的控制权切换都要设计清楚。 |
| 影响 Driver Engagement | AD 系统如果监管和协作不足，会影响 Safe Driving 下 Driver Engagement 的得分资格。 | 高阶辅助驾驶项目不能把 DMS、HMI、接管策略放到后期补丁处理，它们属于星级相关的核心系统要求。 |


> ❗ <strong>这条规则的本质：</strong>Euro NCAP 不鼓励“辅助能力很强，但驾驶员监管很弱”的系统。车辆越能自动跟车、居中、变道或处理道路特征，就越需要证明驾驶员仍然被正确监控，并且能和系统安全协作。


#### 1.2.3.3. VRU 主被动联动

Euro NCAP 把 VRU 安全拆到了两个不同 Stage：Crash Protection 里有 VRU Impact，也就是车头结构对行人、骑行者等弱势交通参与者的被动保护；Crash Avoidance 里有 Frontal Collisions 的 Pedestrian & Cyclist 场景，也就是主动避撞能力。

规程要求：车辆需要在 Crash Protection 的 VRU Impacts 中达到最低表现，才有资格在 Crash Avoidance 的 Frontal Collisions 行人/骑行者场景中计分。这个逻辑是在防止车辆只依赖 AEB，而忽略车头结构对行人和骑行者的基础保护。

| 安全能力 | 对应 Stage | 为什么要联动 |
|-|-|-|
| VRU Impact 被动保护 | Crash Protection | 如果最终还是发生碰撞，车头、机盖、风挡区域要尽量降低对人体的伤害。 |
| Pedestrian & Cyclist 主动避撞 | Crash Avoidance | 系统通过识别、报警、制动或转向尽量避免与行人、骑行者碰撞。 |
| Prerequisite 关联 | 跨 Stage 约束 | 主动安全和被动安全不能互相替代。AEB 做得好，不代表可以放松车头行人保护。 |


> 📌 <strong>工程解读：</strong>对于智驾团队来说，这意味着 AEB VRU 不能只写传感器识别距离、TTC 和制动策略；还要和整车安全、造型、车身、机盖、保险杠等团队确认被动 VRU 保护底线。否则主动避撞分数可能存在资格风险。


#### 1.2.3.4. 碰撞红区封顶

Euro NCAP 明确规定：如果车辆满足 5 星的各 Stage 平衡门槛，但在 Crash Protection 的关键人体区域中出现红色评级，整车最高只能获得 4 星。这是典型的星级封顶 Backstop。

这条规则说明，Euro NCAP 不允许车辆通过 Safe Driving 或 Crash Avoidance 的高分来掩盖严重碰撞保护短板。尤其是正碰、侧碰、后碰、VRU Impact 等项目中，如果关键身体区域表现很差，即使总分看起来够，也不能给消费者传达“这是 5 星安全车”的信号。

| 触发条件 | 结果 | 对智驾车型的含义 |
|-|-|-|
| 5 星分数门槛已满足 | 仍需检查 Crash Protection 关键人体区域颜色评级。 | 高阶智驾车型不能只强调主动安全和辅助驾驶体验。 |
| 关键身体区域出现红色 | 整车最高星级被限制为 4 星。 | 被动安全严重短板会直接压低星级上限，无法靠智驾高分完全补回。 |
| VRU 保护区域整体红色 | 同样可能触发 VRU 相关封顶逻辑。 | 行人/骑行者安全必须同时考虑“不撞上”和“撞上后少伤害”。 |

#### 1.2.3.5. 乘员监测联动

Safe Driving 里的 Occupant Monitoring 也不只是单独拿分。部分乘员监测能力会成为其他 Stage 计分的前置条件。例如，乘员身材分类与约束系统自适应有关，碰撞时乘员信息又会影响事故后救援和 eCall 信息完整性。

| 联动项 | 关联关系 | 开发含义 |
|-|-|-|
| Occupant Stature Classification | 影响 Crash Protection 中正面碰撞约束系统自适应相关评价。 | 座舱感知、座椅传感器、乘员分类算法和约束系统策略需要联合定义。 |
| Crash Occupancy Information | 影响 Post-Crash 中 eCall 可提供乘员数量等信息的资格。 | 事故后安全不只是 TBox 发信号，还需要车内乘员信息链路可用、可信、可传输。 |
| Seatbelt / Occupant Presence | 作为 Safe Driving 得分项，同时支撑碰撞前、碰撞中和事故后安全策略。 | 安全带误用、儿童遗留、后排占用检测都属于安全评价输入，不能只按舒适配置理解。 |

#### 1.2.3.6. 开发前置管理

Backstop 最容易出问题的地方，是项目团队只盯具体测试分数，到了认证或预评估阶段才发现某个前置条件没有满足。对智驾系统开发来说，Backstop 应该在需求分解阶段就进入检查清单。

| 开发阶段 | 需要检查什么 | 输出物建议 |
|-|-|-|
| 概念阶段 | 车型是否提供 Assisted Driving；是否目标 5 星；是否有 VRU、eCall、乘员监测等跨域约束。 | 星级目标分解表、Backstop / Prerequisite 清单。 |
| 系统需求阶段 | DMS、驾驶协作、乘员分类、VRU 被动保护、事故后信息链路是否满足前置条件。 | 跨域需求矩阵，明确责任域、输入信号、输出信号和验证方法。 |
| 验证阶段 | 不仅验证测试点得分，还验证是否触发星级封顶、不得分或资格缺失。 | Euro NCAP 评分预测表、Backstop 风险关闭报告。 |


> ✅ <strong>本小节结论：</strong>Backstop 是 Euro NCAP 防止安全短板被高分掩盖的硬性机制。对智驾开发来说，它要求 ADAS、DMS、HMI、乘员监测、被动安全和事故后安全协同设计；否则某个前置条件缺失，就可能导致相关项目不得分或整车星级被封顶。


---

# 2. 智驾主线


> 📌 <strong>这一章重点是说明分数怎么来的。</strong>Euro NCAP 智驾相关评分大体遵循一条链路：
> - 先把能力拆成测试项或审核项
> - 再把测试项拆成场景矩阵或检查条款
> - 然后把每个测试点转成颜色、通过/失败或条款得分
> - 最后按场景分值归一化并汇总到 Stage 分数。


Euro NCAP 里和智驾最相关的是三条线：<strong>Safe Driving</strong>、<strong>Crash Avoidance</strong> 和 <strong>Assisted Driving</strong>。其中 Safe Driving 和 Crash Avoidance 进入星级门槛。

*（Assisted Driving 单独发布评级，但会影响 Safe Driving 中 Driver Engagement 的得分资格。）*

| 主线 | 是否进入星级 | 分数来源 | 计分关键词 |
|-|-|-|-|
| <strong>Safe Driving</strong><br>（安全驾驶） | 进入星级门槛 | Occupant Monitoring、Driver Engagement、Vehicle Assistance 三个子项相加，共 100 分。 | 条款审核、功能可用性、DMS 资料包与抽查、ACC/转向辅助测试、道路特征响应。 |
| <strong>Crash Avoidance</strong><br>（碰撞避免） | 进入星级门槛 | Frontal Collisions、Lane Departure Collisions、Low Speed Collisions 三个子项相加，共 100 分。 | 场景矩阵、网格点、颜色带、通过/失败、标准范围、扩展范围、鲁棒性层、验证测试。 |
| <strong>Assisted Driving</strong><br>（辅助驾驶） | 单独评级，但影响星级资格 | Assistance Competence 与 Safety Backup 共同决定辅助驾驶评级。 | 辅助能力与驾驶员参与平衡、系统状态提示、驾驶协作、失效兜底、传感器遮挡、失能驾驶员。 |

## 2.1. Safe Driving

Safe Driving 的 Stage 分数满分 100 分，由三个子项直接相加。下面按最小计分行展开，读表时直接把满足的小项分数相加即可。

```text
Safe Driving = Occupant Monitoring + Driver Engagement + Vehicle Assistance
              = 30 + 30 + 40
              = 100 分
```

| 评分块 | 一级项 | 分值 | 得分口径 |
|-|-|-|-|
| Occupant Monitoring  <br>（乘员监测） | 三类 | 30 | Seatbelt Usage 10 + Occupant Classification 10 + Occupant Presence 10；各小项按满足情况加总。 |
| Driver Engagement  <br>（驾驶员参与） | 两类 | 30 | Driver Monitoring 25 + General Vehicle Controls 5；DMS 需先满足资格要求。 |
| Vehicle Assistance  <br>（车辆辅助） | 三类 | 40 | Speed Assistance 20 + ACC Performance 15 + Steering Assistance 5；按功能小项、场景和测试结果加总。 |

### 2.1.1. Occupant Monitoring

Occupant Monitoring 的计分更接近条款表。除档位取分或比例计分项外，满足该小项要求拿对应分，不满足该小项为 0 分。

<table>
	<thead>
		<tr>
			<th>一级项</th>
			<th>小项 / 档位</th>
			<th>分值</th>
			<th>得分 / 失分条件</th></tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="4">Seatbelt Usage<br>（安全带使用）</td>
			<td>Seatbelt buckle only<br>（仅插扣假系）</td>
			<td>2</td>
			<td>能识别插扣假系并按要求提醒，得 2 分；不能识别或提醒不满足要求，得 0。</td></tr>
		<tr>
			<td>Seatbelt completely behind back<br>（安全带完全绕背）</td>
			<td>1</td>
			<td>能识别肩带/安全带完全绕背误用，得 1 分；不能识别得 0。</td></tr>
		<tr>
			<td>Lap belt only<br>（仅腰带 / 肩带绕背）</td>
			<td>2</td>
			<td>能识别仅腰带约束或肩带绕背误用，得 2 分；不能识别得 0。</td></tr>
		<tr>
			<td>Rear seat occupancy<br>（后排占用检测）</td>
			<td>最高 5</td>
			<td>按覆盖比例得分：合格后排座位数 / 后排座位总数 × 5。某个后排座位无占用检测或不能触发合格提醒，该座位不计入分子。</td></tr>
		<tr>
			<td rowspan="8">Occupant Classification<br>（乘员分类）</td>
			<td>Passenger airbag status: Automatic<br>（气囊状态：自动）</td>
			<td>4</td>
			<td rowspan="4">四个档位互斥，按最高满足档取分。自动识别并控制气囊状态拿 4；只能系统建议并人工切换则按 3/2；纯手动仅 1；无有效气囊状态管理得 0。</td></tr>
		<tr>
			<td>System advised + manual software switch<br>（系统建议 + 软件开关）</td>
			<td>3</td></tr>
		<tr>
			<td>System advised + manual hardware switch<br>（系统建议 + 硬件开关）</td>
			<td>2</td></tr>
		<tr>
			<td>Manual switch<br>（纯手动开关）</td>
			<td>1</td></tr>
		<tr>
			<td>Close proximity to airbag<br>（靠近气囊）</td>
			<td>1</td>
			<td>能识别前排乘员头部/身体靠近气囊风险并提醒，得 1；不能识别或提醒不合格得 0。</td></tr>
		<tr>
			<td>Feet on dashboard<br>（脚放仪表台）</td>
			<td>1</td>
			<td>能识别脚放仪表台姿态并提醒，得 1；不能识别得 0。</td></tr>
		<tr>
			<td>Driver stature classification<br>（驾驶员身材分类）</td>
			<td>3</td>
			<td>能对驾驶员身材分类，并把分类结果用于约束系统自适应策略，得 3；无法分类或不能用于约束策略，得 0。</td></tr>
		<tr>
			<td>Front passenger stature classification<br>（前排乘员身材分类）</td>
			<td>1</td>
			<td>能对前排乘员身材分类，并用于约束系统自适应策略，得 1；无法分类或策略不可用，得 0。</td></tr>
		<tr>
			<td rowspan="8">Occupant Presence<br>（乘员存在）</td>
			<td>Child left behind: rear seats, warning<br>（儿童遗留：后排，提醒）</td>
			<td>1.5</td>
			<td rowspan="4">同一儿童遗留场景按覆盖范围和能力取对应档位，不累加。<br>覆盖后排且仅提醒 1.5；<br>后排提醒+干预 3.0；<br>覆盖所有乘员座位且仅提醒 3.0；<br>覆盖所有乘员座位且提醒+干预 4.0。<br>提醒时延、升级提醒或干预不满足要求时降档或得 0。</td></tr>
		<tr>
			<td>Child left behind: rear seats, warning + intervention<br>（儿童遗留：后排，提醒+干预）</td>
			<td>3.0</td></tr>
		<tr>
			<td>Child left behind: all passenger seats, warning<br>（儿童遗留：所有乘员座位，提醒）</td>
			<td>3.0</td></tr>
		<tr>
			<td>Child left behind: all passenger seats, warning + intervention<br>（儿童遗留：所有乘员座位，提醒+干预）</td>
			<td>4.0</td></tr>
		<tr>
			<td>Child enters unlocked vehicle: rear seats<br>（儿童进入未锁车：后排）</td>
			<td>0.5</td>
			<td>能覆盖儿童进入未锁车辆场景并满足提醒要求，后排覆盖得 0.5；不能识别或提醒超时/不合格得 0。</td></tr>
		<tr>
			<td>Child enters unlocked vehicle: all passenger seats<br>（儿童进入未锁车：所有乘员座位）</td>
			<td>1.0</td>
			<td>覆盖所有乘员座位得 1.0；只覆盖后排按 0.5；不能识别或提醒不合格得 0。</td></tr>
		<tr>
			<td>Adult occupants in eCall<br>（eCall 成人乘员数量）</td>
			<td>4</td>
			<td>事故后 eCall 能提供所有座位成人乘员数量，并覆盖系带/未系带状态，得 4；信息缺失、座位覆盖不足或无法传输得 0。</td></tr>
		<tr>
			<td>Children in all CRS in eCall<br>（eCall 儿童约束系统乘员）</td>
			<td>1</td>
			<td>能识别并上报所有 CRS 中儿童乘员，得 1；不能识别儿童 CRS 或无法进入事故后信息链路，得 0。</td></tr>
	</tbody>
</table>

### 2.1.2. Driver Engagement

<strong>先把它理解成两步：</strong>

- <strong>第一步，算这张表里的 30 分。</strong>这里就是 Driver Monitoring 25 分 + General Vehicle Controls 5 分。
- <strong>第二步，只在车辆提供 Assisted Driving 时检查 50% 门槛。</strong>Euro NCAP 会回到 AD 评级里看两个小项：Driver Monitoring 是否 ≥50%，Driving Collaboration 是否 ≥50%。两个门槛都通过，上表 30 分正常计入；任一门槛没过，整车 Safety Rating 里的 Driver Engagement 相关分数会被卡住。

<table>
	<thead>
		<tr>
			<th>一级项</th>
			<th>小项</th>
			<th>分值</th>
			<th>得分 / 失分条件</th></tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="7">Driver Monitoring<br>（驾驶员监测）</td>
			<td>Long distraction<br>（长分心）</td>
			<td>5</td>
			<td>能检测单次长时间视线离开前方道路，并触发规定提醒/响应，得 5；检测不到或响应不合格，得 0。</td></tr>
		<tr>
			<td>Short distraction / VATS<br>（短分心 / 视觉注意分配）</td>
			<td>5</td>
			<td>能检测多次短时离路、累计降低情境感知的状态，并触发规定响应，得 5；只检测长分心但不能检测短分心，本项得 0。</td></tr>
		<tr>
			<td>Phone Use<br>（手机使用）</td>
			<td>5</td>
			<td>能单独识别手机使用导致的注意力占用，并触发规定响应，得 5；仅把手机使用泛化为普通分心且不能满足手机使用要求，得 0。</td></tr>
		<tr>
			<td>Impairment<br>（受损状态）</td>
			<td>4</td>
			<td>能识别疲劳/困倦、酒精或药物等受损状态，并触发规定警告或干预，得 4；不能分类或响应不合格，得 0。</td></tr>
		<tr>
			<td>Microsleep<br>（微睡眠）</td>
			<td>2</td>
			<td>能识别短暂睡眠片段，并给出高于分心/受损提醒等级的响应，得 2；不能识别或提醒等级不合格，得 0。</td></tr>
		<tr>
			<td>Sleep<br>（睡眠）</td>
			<td>2</td>
			<td>能识别持续数秒以上睡眠状态，并触发规定响应，得 2；不能识别或响应不合格，得 0。</td></tr>
		<tr>
			<td>Unresponsive<br>（失能 / 无响应）</td>
			<td>2</td>
			<td>能识别无响应驾驶员并触发 Emergency Function 等要求响应，得 2；不能识别或未触发规定兜底，得 0。</td></tr>
		<tr>
			<td rowspan="10">General Vehicle Controls<br>（通用车辆控制）</td>
			<td>Driving<br>（驾驶相关控制）</td>
			<td>1</td>
			<td>该子类下所有规定动作满足可触达、可识别和交互要求，得 1；任一必测动作不满足，该子类得 0。</td></tr>
		<tr>
			<td>Vision<br>（视野相关控制）</td>
			<td>0.5</td>
			<td>该子类下所有规定动作通过得 0.5；任一必测动作不满足得 0。</td></tr>
		<tr>
			<td>Lights<br>（灯光）</td>
			<td>0.5</td>
			<td>该子类下所有规定动作通过得 0.5；任一必测动作不满足得 0。</td></tr>
		<tr>
			<td>ADAS<br>（驾驶辅助控制）</td>
			<td>0.5</td>
			<td>该子类下所有规定动作通过得 0.5；任一必测动作不满足得 0。</td></tr>
		<tr>
			<td>Audio entertainment<br>（音频娱乐）</td>
			<td>0.5</td>
			<td rowspan="6">各子类按“全通过才得分”计算。该子类任一规定任务不能以合格交互方式完成，则该子类得 0；不影响其他子类。</td></tr>
		<tr>
			<td>Calling &amp; dialling<br>（通话拨号）</td>
			<td>0.5</td></tr>
		<tr>
			<td>Navigation system<br>（导航）</td>
			<td>0.5</td></tr>
		<tr>
			<td>Climate controls<br>（空调控制）</td>
			<td>0.5</td></tr>
		<tr>
			<td>Windows<br>（车窗）</td>
			<td>0.25</td></tr>
		<tr>
			<td>Other<br>（其他）</td>
			<td>0.25</td></tr>
	</tbody>
</table>


> ✅ <strong>例子：</strong>长分心可检测、短分心不可检测、手机使用不可检测时，Transient driver states = 5 + 0 + 0 = 5 分。若 Impairment、Microsleep、Sleep、Unresponsive 都满足，则 Non-transient driver states = 4 + 2 + 2 + 2 = 10 分。


所以，这里要分清两件事：上表只负责计算 Safe Driving 里的 30 分；Driving Collaboration 出现在 AD 评级中，车辆带 Assisted Driving 时会被拿来做 50% 门槛检查。

### 2.1.3. Vehicle Assistance

Vehicle Assistance 的 40 分按功能和场景拆行。ACC 项目中，多个测试速度点会先在场景内部结算，表里列的是规程给出的场景权重。

<table>
	<thead>
		<tr>
			<th>一级项</th>
			<th>小项 / 档位</th>
			<th>分值</th>
			<th>得分 / 失分条件</th></tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="7">Speed Assistance<br>（车速辅助）</td>
			<td>SLIF Accuracy: distance KPI<br>（距离准确率）</td>
			<td>2</td>
			<td>距离准确率 KPI &gt; 80% 得 2；未达到阈值得 0。</td></tr>
		<tr>
			<td>SLIF Accuracy: event KPI<br>（事件准确率）</td>
			<td>2</td>
			<td>事件准确率 KPI 满足规程阈值得 2；未达到阈值得 0。</td></tr>
		<tr>
			<td>Advanced Speed Limits<br>（高级限速）</td>
			<td>3</td>
			<td>能处理规程要求的高级/条件限速并正确显示，得 3；覆盖不足或显示不合格则按规程少拿或得 0。</td></tr>
		<tr>
			<td>Local Hazards<br>（本地危险）</td>
			<td>3</td>
			<td>能提供合格本地危险提醒，得 3；数据、显示或提醒不满足要求则少拿或得 0。</td></tr>
		<tr>
			<td>System updates<br>（系统更新）</td>
			<td>2</td>
			<td>限速/道路信息更新能力满足要求，得 2；更新机制不满足要求得 0。</td></tr>
		<tr>
			<td>ISL<br>（智能限速）</td>
			<td>5</td>
			<td rowspan="2">SCF 档位取分。iACC 满足要求可拿 8；仅 ISL 满足要求可拿 5。速度表精度 -5/+0 km/h 时 SCF 分数减半；不满足控制/恢复/超越等要求则不得分或降档。</td></tr>
		<tr>
			<td>iACC<br>（智能自适应巡航）</td>
			<td>8</td></tr>
		<tr>
			<td rowspan="14">ACC Performance<br>（自适应巡航性能）</td>
			<td>CCRs straight<br>（静止车直道）</td>
			<td>1</td>
			<td rowspan="4">车车纵向场景。<br>完全避免碰撞拿该场景满分；<br>ACC 介入且 AEB 前速度降低 &gt;15 km/h 通常拿 0.5；<br>≤15 km/h 得 0。</td></tr>
		<tr>
			<td>CCRs curve<br>（静止车弯道）</td>
			<td>1</td></tr>
		<tr>
			<td>CCRm<br>（移动车）</td>
			<td>1</td></tr>
		<tr>
			<td>CCRb<br>（制动车）</td>
			<td>1</td></tr>
		<tr>
			<td>Car-to-Car cut-in</td>
			<td>1</td>
			<td>切入场景按测试结果给 1 / 0.5 / 0；验证结果低于预测时按实测颜色/结果修正。</td></tr>
		<tr>
			<td>Car-to-Car cut-out</td>
			<td>1</td>
			<td>切出场景按测试结果给 1 / 0.5 / 0；验证结果低于预测时按实测颜色/结果修正。</td></tr>
		<tr>
			<td>CMRs straight</td>
			<td>1</td>
			<td rowspan="4">车对摩托车纵向场景。完全避免拿 1；速度降低 &gt;15 km/h 拿 0.5；≤15 km/h 得 0。</td></tr>
		<tr>
			<td>CMRs curve</td>
			<td>1</td></tr>
		<tr>
			<td>CMRm</td>
			<td>1</td></tr>
		<tr>
			<td>CMRb</td>
			<td>1</td></tr>
		<tr>
			<td>Car-to-PTW cut-in</td>
			<td>0.5</td>
			<td>摩托车切入场景满足要求拿 0.5；未达到要求得 0。</td></tr>
		<tr>
			<td>Car-to-PTW cut-out</td>
			<td>0.5</td>
			<td>摩托车切出场景满足要求拿 0.5；未达到要求得 0。</td></tr>
		<tr>
			<td>CPLA</td>
			<td>1</td>
			<td>同向行人：速度降低 &gt;30 km/h 拿 1；&gt;15 km/h 拿 0.5；≤15 km/h 得 0。</td></tr>
		<tr>
			<td>CBLA</td>
			<td>1</td>
			<td>同向骑行者：速度降低 &gt;30 km/h 拿 1；&gt;15 km/h 拿 0.5；≤15 km/h 得 0。</td></tr>
		<tr>
			<td rowspan="5">Road Features<br>（道路特征）</td>
			<td>Curves<br>（弯道）</td>
			<td>0.2</td>
			<td>能显示并调整车速，使横向加速度不超过要求，得 0.2；不显示、不降速或降速不足得 0。</td></tr>
		<tr>
			<td>Roundabouts<br>（环岛）</td>
			<td>0.2</td>
			<td>进入环岛前按要求显示并开始降速，得 0.2；无响应或降速不足得 0。</td></tr>
		<tr>
			<td>Intersection, no right-of-way<br>（无优先权路口）</td>
			<td>0.2</td>
			<td>驾驶员无响应时降至 30 km/h 或更低，得 0.2；未降至要求速度得 0。</td></tr>
		<tr>
			<td>Traffic lights<br>（交通灯）</td>
			<td>0.2</td>
			<td>红灯/黄灯按要求显示并降速，得 0.2；不识别、不显示或降速不足得 0。</td></tr>
		<tr>
			<td>Stop signs<br>（停车标志）</td>
			<td>0.2</td>
			<td>驾驶员无响应时降至 30 km/h 或更低，得 0.2；未降至要求速度得 0。</td></tr>
		<tr>
			<td rowspan="2">Auto-Resume<br>（自动恢复）</td>
			<td>Automatic resume<br>（自动恢复）</td>
			<td>1</td>
			<td rowspan="2">互斥档位。自动恢复需确认周边传感器安全且驾驶员视线回到道路，得 1；只能驾驶员确认恢复得 0.5；不能合格恢复得 0。</td></tr>
		<tr>
			<td>Driver input<br>（驾驶员确认恢复）</td>
			<td>0.5</td></tr>
		<tr>
			<td rowspan="5">Steering Assistance<br>（转向辅助）</td>
			<td>S-bend 60 km/h</td>
			<td>1</td>
			<td rowspan="4">每个速度点独立计分。两段弯都保持车道内得 1；第一段保持、第二段重定向得 0.5；出车道或不能完成要求得 0。</td></tr>
		<tr>
			<td>S-bend 80 km/h</td>
			<td>1</td></tr>
		<tr>
			<td>S-bend 100 km/h</td>
			<td>1</td></tr>
		<tr>
			<td>S-bend 130 km/h</td>
			<td>1</td></tr>
		<tr>
			<td>Lane Change Assist<br>（变道辅助）</td>
			<td>1</td>
			<td>具备驾驶员发起，或系统建议并经驾驶员确认的单次变道功能，得 1；无合格功能得 0。</td></tr>
	</tbody>
</table>


> 📌 <strong>ACC 子场景得分：</strong>车车和摩托车纵向场景通常按“完全避免 = 1、速度降低 >15 km/h = 0.5、≤15 km/h = 0”结算；VRU 同向场景按“速度降低 >30 km/h = 1、>15 km/h = 0.5、≤15 km/h = 0”结算。


## 2.2. Crash Avoidance

Crash Avoidance 的 100 分更像传统意义上的主动避撞测试，但 Euro NCAP 的计分方式比“撞上/没撞上”复杂。它通常先把一个场景拆成很多 <strong>grid cell</strong>，每个 grid cell 是速度、目标类型、横向位置、遮挡、方向等参数组合，然后把每个 grid cell 的表现换成颜色或通过/失败，最后归一化到该场景分值。

```text
Crash Avoidance = Frontal Collisions + Lane Departure Collisions + Low Speed Collisions
                = 60 + 20 + 20
                = 100 分
```

### 2.2.1. 评分流程

Crash Avoidance 最重要的是理解“场景分怎么来”。典型链路如下：

1. <strong>定义场景。</strong>例如车对车追尾、摩托车横穿、行人夜间横穿、道路边缘偏离、倒车儿童、开门杀等。
2. <strong>拆成网格点。</strong>每个场景由一组速度、目标位置、目标方向、遮挡、横向速度等参数组合而成，每个组合就是一个 grid cell。
3. <strong>车企提交预测。</strong>车企需要提供每个 grid cell 的预测表现，可以来自虚拟测试、自声明、实车数据或场地测试。
4. <strong>实验室抽查验证。</strong>Euro NCAP 从预测中抽取若干测试点验证。验证结果会决定预测能否被接受，必要时会扩展测试。
5. <strong>转成颜色或通过/失败。</strong>不同协议用不同 KPI，例如碰撞速度、速度降低、FCW TTC、是否碰撞、扭矩抑制、开门提醒 TTC 等。
6. <strong>归一化到场景分。</strong>把所有 grid cell 的子分相加，再按该场景总分归一化。

```text
场景得分 = 所有 grid cell 子分之和 / grid cell 数量 × 该场景总分
```

### 2.2.2. 颜色映射

在 Frontal Collisions 和 Low Speed Collisions 中，很多场景采用颜色带；颜色带会直接映射到子分。

| 颜色 | 子分 | 常见含义 |
|-|-|-|
| Green  <br>（绿色） | 1.00 | 表现最好。可能是完全避免碰撞，或满足对应场景的最高要求。 |
| Yellow  <br>（黄色） | 0.75 | 有明显减轻或较好响应，但未达到 Green。 |
| Orange  <br>（橙色） | 0.50 | 有一定减轻或中等响应。 |
| Brown  <br>（棕色） | 0.25 | 响应较弱，但仍优于完全失败。 |
| Red  <br>（红色） | 0.00 | 未满足要求，通常意味着碰撞严重、预警不足、未抑制或响应太晚。 |

不同场景颜色判定用的 KPI 不一样：

| 场景类型 | KPI | 示例解释 |
|-|-|-|
| 前向 AEB / VRU 避撞  <br>（自动紧急制动 / 弱势道路使用者） | Vimpact 或相对碰撞速度  <br>（碰撞速度） | 完全避免碰撞通常是 Green；仍发生碰撞时，根据碰撞速度或速度降低程度进入不同颜色带。 |
| FCW 场景  <br>（前向碰撞预警） | FCW TTC  <br>（前向碰撞预警的碰撞时间） | 预警足够早才得分。例如部分场景要求 TTC 达到规定阈值，否则为 Red。 |
| 低速误踩油门 | Drivetrain torque suppression  <br>（动力传动扭矩抑制） | 是否把误踩油门导致的动力需求抑制到零或等效移除油门输入。 |
| 开门杀 | TTC 与车辆响应等级  <br>（碰撞时间） | 只提示、报警、车门保持/抑制开门，对应不同颜色；响应越早、覆盖车门越多，分值越高。 |
| 车道偏离 / ELK  <br>（紧急车道保持） | Pass / Fail  <br>（通过 / 失败） | 对向车、超车车辆、摩托车等场景中，是否避免碰撞；道路边缘场景中，是否控制车辆不越过允许边界。 |

### 2.2.3. 测试范围

Euro NCAP 不只测试标准场景，还会看扩展范围和鲁棒性层。这一点是它和很多“固定工况测试”的重要区别。

| 范围 | 含义 | 计分特点 |
|-|-|-|
| Standard Range  <br>（标准范围） | 基础测试范围，是每个场景的核心测试矩阵。 | 按 grid cell 子分归一化到 Standard Range 分值。表现差会直接影响该场景主分。 |
| Extended Range  <br>（扩展范围） | 在标准范围基础上增加速度、横向位置、目标状态等复杂度。 | 通常需要标准范围达到一定比例，才有资格拿扩展范围分。扩展范围常采用 50%、75%、100% 这样的阶梯得分。 |
| Robustness Layer  <br>（鲁棒性层） | 引入真实世界扰动，例如目标位置偏差、目标外观变化、车道边界变化、夜间、雨雾、眩光、传感器遮挡等。 | 通常要求标准范围先达到一定水平，才有资格拿鲁棒性分。验证测试失败时，可能导致对应层或同类目标场景降级。 |


> 💡 <strong>验证测试会实质影响得分。</strong>车企提交的预测会被 Euro NCAP 随机抽点验证。如果验证点没有达到预测颜色或通过结果，最终场景分会被验证结果影响；虚拟测试预测不满足接受准则时，也可能被按 Self-claim 处理，得分更保守。


### 2.2.4. 汇总规则

| 子项 | 分值 | 分数来源 |
|-|-|-|
| Frontal Collisions  <br>（前向碰撞） | 60 | 车与 PTW 40 分，行人与骑行者 20 分。每类再按纵向、转弯、横穿等场景拆分；每个场景由标准范围、扩展范围和鲁棒性层构成，按颜色带或 KPI 归一化。 |
| Lane Departure Collisions  <br>（车道偏离碰撞） | 20 | 单车偏离 10 分，车与 PTW 10 分。很多项目按 Pass / Fail 计 grid cell 子分；扩展范围中 LDW 或 BSM 有时只能拿半分，不等同于 ELK 完整避险。 |
| Low Speed Collisions  <br>（低速碰撞） | 20 | 车与 PTW 10 分，行人与骑行者 10 分。低速横穿、倒车、误踩油门、开门杀等按颜色或通过结果计分，再归一化到对应场景分。 |

因此，Crash Avoidance 的打分重点是场景矩阵里有多少 grid cell 达到对应颜色或通过要求；越复杂、越接近真实道路的场景，越考验感知、预测、控制和误触发抑制的综合能力。

## 2.3. Assisted Driving

Assisted Driving 是单独发布的辅助驾驶评级，不直接并入整车星级总分。它和 Safe Driving 的关系分两条线看：在 Assisted Driving 自己的评级里，Driver Engagement 是 Assistance Competence 的输入，会和 Vehicle Assistance 做平衡；在整车 Safety Rating 里，如果车辆提供 Assisted Driving，Euro NCAP 又会用 AD 评级中的 Driver Monitoring 和 Driving Collaboration 作为 50% 门槛，检查 Safe Driving 里的 Driver Engagement 相关分数是否可用。

### 2.3.1. Assistance Competence

Assisted Driving 先看 Assistance Competence，它由 Vehicle Assistance 和 Driver Engagement 平衡得到。核心原则是：辅助能力不能超过驾驶员监管能力。

```text
如果 Driver Engagement ≥ Vehicle Assistance：
    Assistance Competence = Vehicle Assistance

如果 Driver Engagement < Vehicle Assistance：
    Assistance Competence = Driver Engagement
```

这意味着系统纵向和横向能力很强，但驾驶员监控、状态提示、接管协作不足时，最终不会按强辅助能力给高分，而会被 Driver Engagement 限制。

| 评价块 | 满分 | 怎么得分 |
|-|-|-|
| Driver Engagement  <br>（驾驶员参与） | 100 | 消费者信息 25，系统状态 25，驾驶员监控 25，驾驶协作 25。  <br>系统名称、营销材料、快速指南、状态提示、DMS、接管扭矩和接管响应都会影响得分。 |
| Vehicle Assistance  <br>（车辆辅助） | 100 | 车速辅助 25，ACC 性能 45，转向辅助 30。  <br>ACC 按车对车、车对摩托车、车对 VRU、道路特征、自动恢复等测试换算。 |

### 2.3.2. Safety Backup

Assisted Driving 还单独评价 Safety Backup，满分 100。它回答的问题是：系统、传感器或驾驶员出问题时，车辆有没有安全兜底。

| Safety Backup 子项 | 分值 | 计分对象 |
|-|-|-|
| System Failure  <br>（系统失效） | 25 | 传感器在启动前遮挡、行驶中遮挡且系统未激活、行驶中遮挡且系统已激活三类场景。重点看系统是否阻止不安全激活、是否提示驾驶员、是否安全降级。 |
| Non-transient Driver States  <br>（非瞬态驾驶员状态） | 25 | 微睡眠、睡眠、失能驾驶员。失能驾驶员需要车辆触发 Emergency Function，维持转向控制并停车或降到爬行速度；更高级响应可获得额外分。 |
| Collision Avoidance  <br>（碰撞避免） | 50 | 车对车、车对摩托车、车对 VRU 和车道支持系统。这里评价辅助驾驶开启时，ACC/AEB/AES/LSS 等系统组合能否避免碰撞或提供足够预警。 |

### 2.3.3. 评级门槛

Assisted Driving 最终用 Assistance Competence 和 Safety Backup 的合计分决定评级。它类似星级体系，但单独发布，不直接作为整车星级的一个 Stage。

| 评级 | 分数要求 | 含义 |
|-|-|-|
| Very Good  <br>（优秀） | ≥160 分（≥80%） | 辅助能力、驾驶员参与和安全兜底都比较完整。 |
| Good  <br>（良好） | ≥140 分（≥70%） | 整体能力较好，但某些参与或兜底能力仍有提升空间。 |
| Moderate  <br>（中等） | ≥120 分（≥60%） | 具备基础辅助能力，但不能理解成高可信自动驾驶。 |
| Entry  <br>（入门） | ≥100 分（≥50%） | 达到入门级辅助驾驶评级。 |


> ✅ <strong>本章结论：</strong>Euro NCAP 智驾相关评分强调计算链路，而非简单罗列功能分值。Safe Driving 更像条款和功能审核的加总；Crash Avoidance 是场景矩阵、颜色带、验证测试和归一化计算；Assisted Driving 则用“辅助能力不能超过驾驶员监管能力”的平衡原则，再叠加 Safety Backup 形成单独评级。


# 3. 例子


> 💡 <strong>示例说明：</strong>下面用一台假设车型 A 来走完整流程。分数是为了说明 Euro NCAP 的计算方式而设置的示例结果；真实项目中，Crash Avoidance 和 Assisted Driving 的大量 grid cell 需要由车企预测、虚拟测试材料和实验室抽查共同确认。


## 3.1. 示例车辆

假设车型 A 是 5 座乘用车，带前排/后排安全带提醒、前排乘员分类、儿童遗留检测、DSM 摄像头、iACC、ACC、车道居中、紧急车道保持、AEB、AES、开门预警和高速/城际 Assisted Driving。车辆提供的辅助驾驶包既可标配，也可选装；只要它在被测配置中存在，就要同时进入 Safe Driving 的门槛检查和 Assisted Driving 的单独评级。

| 模块 | 满分 | 本例结果 | 先看什么 |
|-|-|-|-|
| Safe Driving  <br>（安全驾驶） | 100 | 78.05 | 看车内监测、驾驶员参与、速度/ACC/转向辅助能拿多少分；如果有 Assisted Driving，还要检查 AD 中 Driver Monitoring 和 Driving Collaboration 是否都达到 50%。 |
| Crash Avoidance  <br>（碰撞避免） | 100 | 78.50 | 看前向碰撞、车道偏离、低速碰撞三大类。每类拆成很多场景矩阵，按 grid cell 的颜色或通过结果折算。 |
| Assisted Driving  <br>（辅助驾驶评级） | 200 | 157 | 先算 Assistance Competence，再算 Safety Backup。两者相加后给出单独的 AD 评级。 |

## 3.2. 测评流程

| 步骤 | 输入材料 | Euro NCAP 怎么处理 |
|-|-|-|
| 资料准备 | 车型配置、功能清单、传感器布置、系统默认状态、用户手册、营销材料、功能 dossier、虚拟测试材料。 | 先确认哪些功能可计分、哪些功能默认开启、哪些功能属于选装包。对 DSM、速度识别、ACC、LSS、AEB 等功能，车企通常要提交性能说明和预测矩阵。 |
| 实验室抽查 | 车企提交的 grid cell 颜色预测、虚拟测试证据、自声明材料。 | 实验室不会只相信表格。它会抽取代表性 grid cell 做实车验证；如果验证结果低于预测，相关场景可能按验证结果降级，虚拟测试不满足接受准则时也可能按 Self-claim 处理。 |
| 单项计分 | 每个小项的通过/失败、颜色带、速度降低、碰撞速度、TTC、报警和干预时机。 | Safe Driving 多数是功能和响应审核；Crash Avoidance 多数是场景矩阵归一化；Assisted Driving 同时看信息提示、驾驶员监控、接管协作、车辆辅助和失效兜底。 |
| 门槛检查 | AD 中 Driver Monitoring 和 Driving Collaboration 的分数、VRU 主被动相关分数、碰撞保护红区等。 | 门槛不是额外加分。门槛没过时，即使某些功能本身表现不错，也可能导致相关分数不可用或星级被封顶。 |
| 评级发布 | Safe Driving、Crash Avoidance、Crash Protection、Post-Crash Safety 四个 stage 分数，以及 AD 单独评级分数。 | 整车星级按四个 stage 的门槛、补偿和 backstop 判断；Assisted Driving 评级单独发布，不直接并入整车星级总分。 |

## 3.3. Safe Driving

Safe Driving 满分 100，由 Occupant Monitoring 30、Driver Engagement 30、Vehicle Assistance 40 组成。本例先按小项逐个算，再汇总。

### 3.3.1. Occupant Monitoring

<table>
	<thead>
		<tr>
			<th>一级项</th>
			<th>小项</th>
			<th>本例得分</th>
			<th>测评场景和拿分原因</th></tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="4">Seatbelt Usage<br>（安全带使用）<br>10 分</td>
			<td>Seatbelt buckle only<br>（只插锁扣）</td>
			<td>2 / 2</td>
			<td>驾驶员把安全带锁扣插上但未正确佩戴，系统能在旅程开始或状态变化后报警。</td></tr>
		<tr>
			<td>Belt behind back<br>（整条背后绕过）</td>
			<td>0 / 1</td>
			<td>本例不能稳定识别整条安全带绕到背后的误用，因此本项不得分。</td></tr>
		<tr>
			<td>Lap belt only<br>（只用腰带）</td>
			<td>2 / 2</td>
			<td>能识别肩带绕到背后、只剩腰带约束的误用，并给出符合要求的声光报警。</td></tr>
		<tr>
			<td>Rear seat occupancy<br>（后排占用检测）</td>
			<td>5 / 5</td>
			<td>3 个后排座位都具备占用检测，计算为 3 / 3 × 5 = 5。</td></tr>
		<tr>
			<td rowspan="5">Occupant Classification<br>（乘员分类）<br>10 分</td>
			<td>Passenger airbag status<br>（乘客气囊状态）</td>
			<td>4 / 4</td>
			<td>前排乘客气囊可自动判断启用/禁用状态，不依赖驾驶员手动开关。</td></tr>
		<tr>
			<td>Close proximity<br>（靠近气囊）</td>
			<td>1 / 1</td>
			<td>前排乘员头部靠近仪表台/气囊区域时，系统能识别并警告。</td></tr>
		<tr>
			<td>Feet on dashboard<br>（脚放仪表台）</td>
			<td>0 / 1</td>
			<td>本例无法可靠识别脚放仪表台姿态，因此失去 1 分。</td></tr>
		<tr>
			<td>Driver stature<br>（驾驶员体型分类）</td>
			<td>3 / 3</td>
			<td>能向约束系统提供驾驶员体型分类，支持碰撞保护中的约束自适应。</td></tr>
		<tr>
			<td>Passenger stature<br>（前排乘客体型分类）</td>
			<td>0 / 1</td>
			<td>前排乘客体型分类未提供给约束系统，本项不得分。</td></tr>
		<tr>
			<td rowspan="4">Occupant Presence<br>（乘员存在）<br>10 分</td>
			<td>Child left behind<br>（儿童遗留）</td>
			<td>4 / 4</td>
			<td>所有乘客座位覆盖儿童遗留，且有警告和干预，因此取该场景最高档。</td></tr>
		<tr>
			<td>Child enters unlocked vehicle<br>（儿童进入未锁车辆）</td>
			<td>0.5 / 1</td>
			<td>只覆盖后排座位，未覆盖所有乘客座位，因此只能拿 0.5。</td></tr>
		<tr>
			<td>Adult occupants in eCall<br>（eCall 成人数量）</td>
			<td>4 / 4</td>
			<td>事故后 eCall MSD 能包含成人乘员数量。</td></tr>
		<tr>
			<td>Children in CRS in eCall<br>（eCall 儿童约束系统信息）</td>
			<td>1 / 1</td>
			<td>能把所有儿童约束系统中的儿童信息纳入 eCall。</td></tr>
	</tbody>
</table>

本例 Occupant Monitoring = 9 + 8 + 9.5 = <strong>26.5 / 30</strong>。失分集中在“整条安全带背后绕过”“脚放仪表台”和“前排乘客体型分类”。

### 3.3.2. Driver Engagement

Driver Engagement 先看 Safe Driving 表内 30 分：Driver Monitoring 25 分 + General Vehicle Controls 5 分。因为车型 A 提供 Assisted Driving，还要额外检查 AD 评级中的 Driver Monitoring 和 Driving Collaboration 是否都达到 50%；本例后面会算到这两个门槛均通过。

<table>
	<thead>
		<tr>
			<th>一级项</th>
			<th>小项</th>
			<th>本例得分</th>
			<th>细分场景</th></tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="5">Long distraction<br>（长分心）<br>5 分</td>
			<td>Non-driving Owl<br>（非驾驶任务，大幅转头）</td>
			<td>1 / 1</td>
			<td>驾驶员明显转头看向非驾驶任务目标，系统能识别并报警/干预。</td></tr>
		<tr>
			<td>Non-driving Lizard<br>（非驾驶任务，眼动为主）</td>
			<td>1 / 1</td>
			<td>头部基本朝前但视线离路，系统能通过眼动识别。</td></tr>
		<tr>
			<td>Body Lean<br>（身体前倾/侧倾）</td>
			<td>0 / 1</td>
			<td>身体倾斜导致视线和姿态异常时识别不稳定，本小项不得分。</td></tr>
		<tr>
			<td>Driving Owl<br>（驾驶任务，大幅转头）</td>
			<td>1 / 1</td>
			<td>如长时间看后视镜/侧向道路，系统能按驾驶任务场景响应。</td></tr>
		<tr>
			<td>Driving Lizard<br>（驾驶任务，眼动为主）</td>
			<td>1 / 1</td>
			<td>眼睛离开前方道路但头部动作较小，系统能识别。</td></tr>
		<tr>
			<td rowspan="5">Short distraction / VATS<br>（短分心 / 视觉注意分配）<br>5 分</td>
			<td>Non-driving Owl</td>
			<td>1 / 1</td>
			<td>多次短时大幅离路可检测。</td></tr>
		<tr>
			<td>Non-driving Lizard</td>
			<td>0 / 1</td>
			<td>短时眼动离路识别不足，导致本小项失分。</td></tr>
		<tr>
			<td>Driving Owl</td>
			<td>1 / 1</td>
			<td>驾驶相关的短时大幅转头可检测。</td></tr>
		<tr>
			<td>Driving Lizard</td>
			<td>0 / 1</td>
			<td>驾驶相关短时眼动离路识别不足。</td></tr>
		<tr>
			<td>Multi-target Lizard<br>（多目标短扫视）</td>
			<td>1 / 1</td>
			<td>多点反复扫视导致情境感知下降时可识别。</td></tr>
		<tr>
			<td rowspan="2">Phone Use<br>（手机使用）<br>5 分</td>
			<td>Basic<br>（基础手机使用）</td>
			<td>2.5 / 2.5</td>
			<td>能识别典型手持手机导致的注意力占用。</td></tr>
		<tr>
			<td>Advanced<br>（高级手机使用）</td>
			<td>0 / 2.5</td>
			<td>对低头眼动、遮挡或更隐蔽手机使用识别不足。</td></tr>
		<tr>
			<td rowspan="5">Non-transient<br>（非瞬态状态）<br>10 分</td>
			<td>Drowsiness<br>（疲劳困倦）</td>
			<td>2 / 2</td>
			<td>能在高风险困倦水平前识别并响应。</td></tr>
		<tr>
			<td>Non-fatigue impairment<br>（非疲劳受损）</td>
			<td>0 / 2</td>
			<td>酒精/药物等非疲劳受损识别证据不足。</td></tr>
		<tr>
			<td>Microsleep<br>（微睡眠）</td>
			<td>2 / 2</td>
			<td>短暂闭眼/微睡眠能识别并给出更高紧迫度响应。</td></tr>
		<tr>
			<td>Sleep<br>（睡眠）</td>
			<td>0 / 2</td>
			<td>持续睡眠状态识别或响应未达到要求。</td></tr>
		<tr>
			<td>Unresponsive<br>（失能 / 无响应）</td>
			<td>2 / 2</td>
			<td>能识别无响应驾驶员，并触发 Emergency Function。</td></tr>
		<tr>
			<td rowspan="10">General Vehicle Controls<br>（通用车辆控制）<br>5 分</td>
			<td>Driving<br>（驾驶相关）</td>
			<td>1 / 1</td>
			<td>关键驾驶控制可触达、可识别、可低分心操作。</td></tr>
		<tr>
			<td>Vision<br>（视野）</td>
			<td>0.5 / 0.5</td>
			<td>雨刷、除雾、视野相关功能满足要求。</td></tr>
		<tr>
			<td>Lights<br>（灯光）</td>
			<td>0.5 / 0.5</td>
			<td>灯光控制满足要求。</td></tr>
		<tr>
			<td>ADAS<br>（驾驶辅助）</td>
			<td>0.5 / 0.5</td>
			<td>驾驶辅助开关、状态调整和提示满足要求。</td></tr>
		<tr>
			<td>Audio entertainment<br>（音频娱乐）</td>
			<td>0.5 / 0.5</td>
			<td rowspan="5">这些子类按“该子类全通过才得分”计算。本例音频、通话、导航、空调、车窗均通过。</td></tr>
		<tr>
			<td>Calling &amp; dialling<br>（通话拨号）</td>
			<td>0.5 / 0.5</td></tr>
		<tr>
			<td>Navigation<br>（导航）</td>
			<td>0.5 / 0.5</td></tr>
		<tr>
			<td>Climate<br>（空调）</td>
			<td>0.5 / 0.5</td></tr>
		<tr>
			<td>Windows<br>（车窗）</td>
			<td>0.25 / 0.25</td></tr>
		<tr>
			<td>Other<br>（其他）</td>
			<td>0 / 0.25</td>
			<td>其他控制中有一项必测任务交互不合格。</td></tr>
	</tbody>
</table>

本例 Driver Monitoring = Long 4 + Short 3 + Phone 2.5 + Non-transient 6 = <strong>15.5 / 25</strong>；General Vehicle Controls = <strong>4.75 / 5</strong>。Safe Driving 中 Driver Engagement = <strong>20.25 / 30</strong>。

### 3.3.3. Vehicle Assistance

<table>
	<thead>
		<tr>
			<th>一级项</th>
			<th>小项</th>
			<th>本例得分</th>
			<th>测评场景和失分点</th></tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="6">Speed Assistance<br>（车速辅助）<br>20 分</td>
			<td>SLIF distance KPI<br>（限速距离识别）</td>
			<td>2 / 2</td>
			<td>限速标志识别距离满足要求。</td></tr>
		<tr>
			<td>SLIF event KPI<br>（限速事件识别）</td>
			<td>1.5 / 2</td>
			<td>部分复杂限速事件识别延迟，扣 0.5。</td></tr>
		<tr>
			<td>Advanced Speed Limits<br>（高级限速）</td>
			<td>3 / 3</td>
			<td>可处理条件限速、道路类型变化等高级限速信息。</td></tr>
		<tr>
			<td>Local Hazards<br>（本地危险）</td>
			<td>2 / 3</td>
			<td>对部分施工/临时危险提示覆盖不足。</td></tr>
		<tr>
			<td>System updates<br>（系统更新）</td>
			<td>2 / 2</td>
			<td>地图/限速数据更新机制满足要求。</td></tr>
		<tr>
			<td>iACC / ISL<br>（智能 ACC / 智能限速）</td>
			<td>5.5 / 8</td>
			<td>可建议或自动采用限速，但对部分限速变化响应不够平顺。</td></tr>
		<tr>
			<td rowspan="5">ACC Performance<br>（ACC 性能）<br>15 分</td>
			<td>Car-to-Car<br>（车对车）</td>
			<td>5 / 6</td>
			<td>CCRs、CCRm、CCRb、cut-in、cut-out 大部分通过；高速 cut-in 只达到减速要求，未完全避免。</td></tr>
		<tr>
			<td>Car-to-PTW<br>（车对摩托车）</td>
			<td>4 / 5</td>
			<td>静止/移动/制动摩托车目标表现较好，弯道静止目标有失分。</td></tr>
		<tr>
			<td>Car-to-VRU<br>（车对弱势道路使用者）</td>
			<td>1 / 2</td>
			<td>同向行人/骑行者场景只能达到部分速度降低。</td></tr>
		<tr>
			<td>Road Features<br>（道路特征）</td>
			<td>0.8 / 1</td>
			<td>弯道、环岛、无优先权路口、红灯、停止标志中 4 项满足，1 项响应不足。</td></tr>
		<tr>
			<td>Auto-Resume<br>（自动恢复）</td>
			<td>0.5 / 1</td>
			<td>停车后需要驾驶员确认恢复，因此拿 0.5，不拿自动恢复满分。</td></tr>
		<tr>
			<td rowspan="2">Steering Assistance<br>（转向辅助）<br>5 分</td>
			<td>S-bend<br>（S 弯）</td>
			<td>3 / 4</td>
			<td>60、80、100 km/h 留在车道内；130 km/h 第二个弯仅能重新指向车道，按半分或失分处理，本例计 3。</td></tr>
		<tr>
			<td>Lane Change Assist<br>（变道辅助）</td>
			<td>1 / 1</td>
			<td>变道辅助状态、条件和执行满足要求。</td></tr>
	</tbody>
</table>

本例 Vehicle Assistance = Speed Assistance 16 + ACC Performance 11.3 + Steering Assistance 4 = <strong>31.3 / 40</strong>。Safe Driving 总分 = 26.5 + 20.25 + 31.3 = <strong>78.05 / 100</strong>。

## 3.4. Crash Avoidance

Crash Avoidance 的重点是把每个大场景拆成大量 grid cell。一个 grid cell 通常由 VUT 速度、目标速度、横向位置、转弯/横穿路径、遮挡、光照或鲁棒性层等参数组合而成。先给每个 grid cell 判颜色或通过/失败，再归一化到场景分。

<table>
	<thead>
		<tr>
			<th>一级项</th>
			<th>场景组</th>
			<th>本例得分</th>
			<th>怎么测、怎么扣</th></tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="2">Frontal Collisions<br>（前向碰撞）<br>60 分</td>
			<td>Car &amp; PTW<br>（车与车 / 摩托车）</td>
			<td>32 / 40</td>
			<td>覆盖 CCRs、CCRm、CCRb、CCFtap、CCCscp、CCFhos/hol，以及 CMRs、CMRm、CMRb、CMFtap、CMCscp 等。完全避免通常判 Green；速度降低不足、预警晚或仍碰撞会进入 Orange/Brown/Red。本例高速横穿摩托车和部分转弯对向目标失分。</td></tr>
		<tr>
			<td>Pedestrian &amp; Cyclist<br>（行人 / 骑行者）</td>
			<td>16 / 20</td>
			<td>覆盖 CPNA、CPFA、CPNCO、CPLA、CPTA、CBNA、CBFA、CBNAO、CBLA、CBTA 等。白天横穿和同向目标表现较好；夜间、遮挡儿童、转弯骑行者场景出现 Orange 或 Red。</td></tr>
		<tr>
			<td rowspan="2">Lane Departure<br>（车道偏离）<br>20 分</td>
			<td>Single Vehicle<br>（单车偏离）</td>
			<td>8 / 10</td>
			<td>包括 Driver Acceptance、Driveability、Driver State Link、道路边缘和车道线偏离。Override torque、连续干预、回正横向速度、DSM 联动都要看。本例驾驶员状态联动满足，但道路边缘扩展范围有失分。</td></tr>
		<tr>
			<td>Car &amp; PTW<br>（对向 / 超车目标）</td>
			<td>7 / 10</td>
			<td>看 ELK 在对向车、对向摩托车、超车车辆、超车摩托车场景中是否避免接触。扩展范围中只靠 LDW 或 BSM 往往只能拿有限分；本例超车摩托车高速接近时失分。</td></tr>
		<tr>
			<td rowspan="2">Low Speed<br>（低速碰撞）<br>20 分</td>
			<td>Car &amp; PTW<br>（低速车 / 摩托车）</td>
			<td>8 / 10</td>
			<td>覆盖 Start from Stop、低速转弯横穿等场景，如 CCFtap SfS、CCCscp SfS、CMFtap SfS、CMCscp SfS。碰撞即 Red，完全避免为 Green。本例横穿摩托车最短 TTC 场景未完全避免。</td></tr>
		<tr>
			<td>Pedestrian &amp; Cyclist<br>（低速行人 / 骑行者）</td>
			<td>7.5 / 10</td>
			<td>覆盖倒车儿童移动/静止、前进误踩油门儿童、骑行者遮挡横穿、开门杀等。倒车儿童完全避免；误踩油门能抑制动力；开门杀只提示未保持车门，因此扣分。</td></tr>
	</tbody>
</table>

本例 Crash Avoidance = 48 + 15 + 15.5 = <strong>78.5 / 100</strong>。如果看单个 grid cell，Euro NCAP 会先按 Green 1.00、Yellow 0.75、Orange 0.50、Brown 0.25、Red 0.00 折算 Standard Range；Extended Range 通常只有 Green 才算通过，最后再按 50%、75%、100% 的阶梯拿扩展分。鲁棒性层还会看目标速度偏差、初始位置偏差、目标外观、夜间、雨雾、眩光、遮挡和路边杂物等变化。

## 3.5. Assisted Driving

Assisted Driving 单独发布评级，满分 200。先算 Driver Engagement 100 和 Vehicle Assistance 100，再用二者较低值作为 Assistance Competence；然后加 Safety Backup 100。

### 3.5.1. Assistance Competence

<table>
	<thead>
		<tr>
			<th>一级项</th>
			<th>小项</th>
			<th>本例得分</th>
			<th>测评细节</th></tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="4">AD Driver Engagement<br>（辅助驾驶驾驶员参与）<br>100 分</td>
			<td>Consumer Information<br>（消费者信息）</td>
			<td>21 / 25</td>
			<td>系统名称没有过度暗示自动驾驶，拿 7 / 10；营销材料 4 / 5；快速指南可获得且集成到车机，5 / 5；用户手册清楚说明系统边界，5 / 5。</td></tr>
		<tr>
			<td>System Status<br>（系统状态）</td>
			<td>20 / 25</td>
			<td>持续状态指示 16 / 20，状态变化提示 4 / 5。失分来自部分退出原因提示不够明确。</td></tr>
		<tr>
			<td>Driver Monitoring<br>（驾驶员监测）</td>
			<td>21 / 25</td>
			<td>Hands-on Monitoring 5 / 5；Transient Driver States 中长分心 4 / 6、短分心 3 / 6、手机使用 6 / 8，系统锁止 bonus 3 分但总分封顶后计 16 / 20。</td></tr>
		<tr>
			<td>Driving Collaboration<br>（驾驶协作）</td>
			<td>21 / 25</td>
			<td>Pothole Test 中驾驶员无转向灯主动转向时，系统接管扭矩适中，Override torque 4 / 5；系统能及时让权并稳定退出/回归，Override response 17 / 20。</td></tr>
		<tr>
			<td rowspan="3">AD Vehicle Assistance<br>（辅助驾驶车辆辅助）<br>100 分</td>
			<td>Speed Assistance<br>（车速辅助）</td>
			<td>22 / 25</td>
			<td>可识别限速变化并应用或建议到 ACC；部分临时限速和道路环境变化响应不够早。</td></tr>
		<tr>
			<td>ACC Performance<br>（ACC 性能）</td>
			<td>35 / 45</td>
			<td>车对车、车对摩托车、车对 VRU、道路特征和自动恢复均参与；高速 cut-in、弯道静止摩托车、同向 VRU 速度降低不足导致失分。</td></tr>
		<tr>
			<td>Steering Assistance<br>（转向辅助）</td>
			<td>24 / 30</td>
			<td>S 弯和变道辅助多数通过；高速度 S 弯和复杂变道边界条件有失分。</td></tr>
	</tbody>
</table>

```text
AD Driver Engagement = 21 + 20 + 21 + 21 = 83 / 100
AD Vehicle Assistance = 22 + 35 + 24 = 81 / 100
Assistance Competence = min(83, 81) = 81 / 100
```

这里可以看到，辅助能力再强也不能超过驾驶员参与能力。本例 Driver Engagement 比 Vehicle Assistance 略高，所以 Assistance Competence 取 Vehicle Assistance 的 81 分。

### 3.5.2. Safety Backup

<table>
	<thead>
		<tr>
			<th>一级项</th>
			<th>小项</th>
			<th>本例得分</th>
			<th>测评场景</th></tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="3">System Failure<br>（系统失效）<br>25 分</td>
			<td>Sensor blocked at start-up<br>（启动前传感器遮挡）</td>
			<td>10 / 10</td>
			<td>摄像头或雷达启动前遮挡时，系统禁止激活，并清楚告知原因。</td></tr>
		<tr>
			<td>Blocked in motion, inactive<br>（行驶中遮挡，系统未激活）</td>
			<td>5 / 5</td>
			<td>车辆行驶中系统未开，但传感器不可用时仍能提示并阻止后续不安全激活。</td></tr>
		<tr>
			<td>Blocked in motion, active<br>（行驶中遮挡，系统已激活）</td>
			<td>5 / 10</td>
			<td>系统能降级并退出，但提示和控制过渡不够充分，只拿半数。</td></tr>
		<tr>
			<td rowspan="3">Non-transient Driver States<br>（非瞬态驾驶员状态）<br>25 分</td>
			<td>Microsleep<br>（微睡眠）</td>
			<td>5 / 5</td>
			<td>进入 Assisted Mode 后能识别微睡眠，并提高跟车/车道支持响应。</td></tr>
		<tr>
			<td>Sleep<br>（睡眠）</td>
			<td>3 / 5</td>
			<td>能识别并报警，但干预策略不完整。</td></tr>
		<tr>
			<td>Unresponsive driver<br>（无响应驾驶员）</td>
			<td>10 / 15</td>
			<td>能触发 Emergency Function 并控制停车，但没有变道到最慢车道/应急车道的高级响应。</td></tr>
		<tr>
			<td rowspan="4">Collision Avoidance<br>（碰撞避免）<br>50 分</td>
			<td>Car-to-Car<br>（车对车）</td>
			<td>8 / 10</td>
			<td>辅助驾驶开启时，对前车静止、慢行、制动、切入/切出能多数避免或充分减速。</td></tr>
		<tr>
			<td>Car-to-PTW<br>（车对摩托车）</td>
			<td>7 / 10</td>
			<td>对摩托车纵向和切入目标有一定失分。</td></tr>
		<tr>
			<td>Car-to-VRU<br>（车对弱势道路使用者）</td>
			<td>4 / 5</td>
			<td>同向行人/骑行者多数能避免或强减速。</td></tr>
		<tr>
			<td>Lane Support System<br>（车道支持系统）</td>
			<td>19 / 25</td>
			<td>道路边缘、对向车、超车车辆场景多数通过；夜间和高速摩托车超车场景失分。</td></tr>
	</tbody>
</table>

```text
Safety Backup = 20 + 18 + 38 = 76 / 100
Assisted Driving 总分 = Assistance Competence 81 + Safety Backup 76 = 157 / 200
157 分 ≥ 140 且 < 160，因此评级为 Good（良好）
```

### 3.5.3. 门槛检查

| 门槛 | 要求 | 本例结果 | 影响 |
|-|-|-|-|
| AD Driver Monitoring  <br>（辅助驾驶驾驶员监测） | ≥50% | 21 / 25 = 84% | 通过。Safe Driving 里的 Driver Monitoring 分数不会因为辅助驾驶过度依赖风险被卡住。 |
| AD Driving Collaboration  <br>（辅助驾驶驾驶协作） | ≥50% | 21 / 25 = 84% | 通过。说明系统允许驾驶员合理接管，不会用过高扭矩或不合理响应阻碍驾驶员避险。 |
| 结果 | 两项都过 | 通过 | 车型 A 的 Safe Driving Driver Monitoring 25 分可按前述 15.5 分计入。如果任一门槛低于 50%，这部分分数会被门槛限制。 |

## 3.6. 最终结果

| 评价对象 | 本例分数 | 评级判断 | 解释 |
|-|-|-|-|
| Safe Driving | 78.05 / 100 | 2026 可支撑 5 星门槛 | 2026 软着陆下，Safe Driving 的 5 星门槛是 60%；长期正常门槛是 80%。所以本例在 2026 足够，但按完全门槛还差约 2 分。 |
| Crash Avoidance | 78.5 / 100 | 2026 可支撑 5 星门槛 | 2026 软着陆下，Crash Avoidance 的 5 星门槛是 70%；长期正常门槛是 80%。本例在复杂 VRU、低速开门和高速摩托车场景还有短板。 |
| Assisted Driving | 157 / 200 | Good  <br>（良好） | 157 分落在 140 到 160 之间。它不直接并入整车星级，但它的 Driver Monitoring 和 Driving Collaboration 会影响 Safe Driving 中相关分数资格。 |
| 整车星级 | 需四个 stage 一起看 | 本例只演示智驾链路 | 若再假设 Crash Protection 和 Post-Crash Safety 都满足 5 星门槛且没有 backstop 封顶，则车型 A 在 2026 可冲 5 星；到正常门槛年份，Safe Driving 和 Crash Avoidance 都需要继续补分。 |


> ✅ <strong>这个例子最关键的结论：</strong>Euro NCAP 智驾测评是一条完整链路。车内监测决定 Safe Driving 基础分；DSM 和接管协作又会成为辅助驾驶门槛；主动避撞要通过大量场景矩阵和验证测试；Assisted Driving 还会用“驾驶员参与能力不能低于车辆辅助能力”的平衡原则限制最终评级。


# 4. C-NCAP 映射

为了和已有的 C-NCAP 文档对齐，可以把 C-NCAP 主动安全里的项目映射到 Euro NCAP 的新框架中。这样后续展开 Euro NCAP 章节时，读者能快速知道“我熟悉的 AEB / LSS / DMS 在 Euro NCAP 里去了哪里”。

| C-NCAP 习惯说法 | Euro NCAP 2026+ 对应位置 | 口径差异 |
|-|-|-|
| AEB C2C | Crash Avoidance / Frontal Collisions / Car & PTW | 不只覆盖车车追尾，还扩展到摩托车、横穿、转弯、遮挡、对向等更复杂冲突。 |
| AEB VRU | Crash Avoidance / Frontal Collisions / Pedestrian & Cyclist，以及 Low Speed Collisions | 行人和骑行者既有前向高速/中速场景，也有低速倒车、遮挡、开门杀等近距风险。 |
| LSS / LKA / ELK | Crash Avoidance / Lane Departure Collisions；部分能力也影响 Assisted Driving / Safety Backup | Euro NCAP 更强调 ELK 对对向车、超车目标、摩托车和道路边缘的危险避让，而不只是压线纠偏。 |
| DMS | Safe Driving / Driver Engagement；Assisted Driving / Driver Engagement 和 Safety Backup | DMS 从“报警功能”升级为辅助驾驶安全闭环的一部分，要影响分心、疲劳、手机使用、失能驾驶员和系统兜底。 |
| TSR / ISLS / 限速辅助 | Safe Driving / Vehicle Assistance / Speed Assistance；Assisted Driving / Vehicle Assistance | 不仅识别限速，还要和 ACC/iACC、限速变化、道路特征响应结合。 |
| HMI / 开关 / 报警 | Safe Driving / Driver Engagement / General Vehicle Controls；Assisted Driving / Driver Engagement | Euro NCAP 明确关注关键驾驶控制和辅助系统状态提示，HMI 不再只是附属说明。 |

# 5. 乘用车评分


> 💡 <strong>资料口径：</strong>以下整理基于 Euro NCAP 官方 Assisted Driving Gradings 总览页和车型详情页，检索时间为 2026-06-10。Assisted Driving 评级是单独发布的辅助驾驶评级，不等同于整车星级，也不等同于 Safety Assist 分数。


## 5.1. 国内品牌

国内品牌和中国关联车型里，目前能在 Euro NCAP 官方页面直接查到 Assistance Competence、Safety Backup 分项的车型如下。这里的“合计”按 Assistance Competence + Safety Backup 换算为 200 分口径。

| 车型 | 年款 / 版本 | AD 系统 | 评级 | AC | SB | 合计 | 参考 |
|-|-|-|-|-|-|-|-|
| BYD ATTO 3 | 2025 MY Bosch | Intelligent Cruise Control System | Good | 67% | 80% | 147 | [Euro NCAP](https://www.euroncap.com/assessments/byd/atto+3/a033/) |
| BYD ATTO 3 | 2022 MY Veoneer，软件升级后 | Intelligent Cruise Control System | Moderate | 60% | 72% | 132 | [Euro NCAP](https://www.euroncap.com/assessments/byd/atto+3/a032/) |
| XPENG G9 | 2025 | XPILOT ASSIST | Good | 71% | 71% | 142 | [Euro NCAP](https://www.euroncap.com/assessments/xpeng/g9/a023/) |
| MG ZS | 2025 | MG Pilot Advanced Driver Assistance System | Moderate | 65% | 62% | 127 | [Euro NCAP](https://www.euroncap.com/assessments/mg/zs/a029/) |
| Polestar 2 | 2022 | Pilot Assist | Good | 53% | 88% | 141 | [Euro NCAP](https://www.euroncap.com/assessments/polestar/2/a011/) |
| Volvo EX30 | 2025 | Pilot Assist | Moderate | 62% | 72% | 134 | [Euro NCAP](https://www.euroncap.com/assessments/volvo/ex30/a024/) |

从结果看，国内品牌里目前公开表现较好的车型是 BYD ATTO 3 2025 MY Bosch 版和 XPENG G9，二者都达到 Good。BYD ATTO 3 还很适合作为升级案例：2022 MY 曾在 2024 被评为 Not recommended，软件升级后重新评为 Moderate；2025 MY Bosch 系统进一步提升到 Good。

## 5.2. 其他车型

Euro NCAP 官方总览页同期还列出以下车型。它们有助于对比国内车型与当前欧洲公开 AD 评级的头部水平。

| 车型 | 年款 | AD 系统 | 评级 | AC | SB | 合计 | 参考 |
|-|-|-|-|-|-|-|-|
| Porsche Macan | 2025 | Porsche InnoDrive with active Lane Keeping | Very Good | 85% | 92% | 177 | [官方](https://www.euroncap.com/assessments/porsche/macan/a028/) |
| Toyota bZ4X | 2025 | Toyota Safety Sense | Very Good | 83% | 89% | 172 | [官方](https://www.euroncap.com/assessments/toyota/bz4x/a030/) |
| Kia EV3 | 2025 | Highway Driving Assist 2 | Very Good | 74% | 88% | 162 | [官方](https://www.euroncap.com/assessments/kia/ev3/a026/) |
| Mazda CX-80 | 2025 | Cruising & Traffic Support | Good | 62% | 79% | 141 | [官方](https://www.euroncap.com/assessments/mazda/cx-80/a027/) |

## 5.3. 分项对比

仅看总评级不够。Euro NCAP AD 评级经常出现“Assistance Competence 一般，但 Safety Backup 很强”或“车辆辅助强，但驾驶员参与拖后腿”的情况。下面把关键分项拆开看。

| 车型 | DE | VA | CI | SS | DM | DC | 主要观察 |
|-|-|-|-|-|-|-|-|
| BYD ATTO 3 2025 | 67.9% | 75.5% | 23/25 | 14.9/25 | 5/25 | 25/25 | 驾驶协作满分，但驾驶员监测和系统状态提示仍是短板。 |
| XPENG G9 | 73% | 71.6% | 25/25 | 15/25 | 10/25 | 23/25 | 信息材料和系统命名表现很好，AC 与 SB 较均衡。 |
| MG ZS | 65.9% | 68.6% | 23/25 | 17.9/25 | 0/25 | 25/25 | 驾驶员监测不得分，虽然协作满分，整体仍只能 Moderate。 |
| Polestar 2 | 70% | 53% | 20/25 | 15/25 | 10/25 | 25/25 | Safety Backup 很强，但车辆辅助能力偏低，AC 被 VA 限制。 |
| Volvo EX30 | 62.5% | 71.6% | 23/25 | 18.5/25 | 0/25 | 21/25 | 驾驶员参与低于车辆辅助，AC 被 DE 限制。 |
| Porsche Macan | 85% | 87% | 25/25 | 25/25 | 10/25 | 25/25 | 系统信息、状态提示、协作和兜底都强，是当前公开结果中的高分样本。 |
| Toyota bZ4X | 83% | 85.5% | 23/25 | 25/25 | 10/25 | 25/25 | 状态提示和协作表现突出，Safety Backup 也高。 |
| Kia EV3 | 74.6% | 75.7% | 23/25 | 23.6/25 | 5/25 | 23/25 | AC 不算最高，但 Safety Backup 把总评级推到 Very Good。 |
| Mazda CX-80 | 70% | 62% | 20/25 | 25/25 | 0/25 | 25/25 | 车辆辅助能力较低，DM 不得分，但 SB 较好，因此总评 Good。 |

## 5.4. 车型备注

- <strong>BYD ATTO 3：</strong>官方详情页说明 2022 MY 曾在 2024 年被评为 Not recommended；软件升级后的 2022 MY 重新评为 Moderate，2025 MY Bosch 系统评为 Good。这说明 AD 评级不仅看硬件，也看软件策略、系统状态提示、DMS、失效兜底和接管协作。
- <strong>XPENG G9：</strong>官方评价中提到 XPILOT ASSIST 命名能准确表达系统功能，Driver Engagement 与 Vehicle Assistance 比较均衡，Safety Backup 也达到合理水平，因此总评 Good。
- <strong>MG ZS / Volvo EX30 / Mazda CX-80：</strong>这些车型都出现 Driver Monitoring 分项为 0 / 25 的情况，说明只靠方向盘手力矩或基础监测，在新 AD 评级下很难形成高分。
- <strong>ZEEKR X、ZEEKR 001、NIO EL6：</strong>其 Euro NCAP 安全星级页中出现 “Assisted Driving grading available” 提示，但当前未在官方 AD 总览页中抓到可核验的 AC/SB 分项，因此本节不把它们列为已有公开 AD 分数车型。

参考入口：[Euro NCAP Assisted Driving Gradings](https://www.euroncap.com/assisted-driving-gradings/)。
