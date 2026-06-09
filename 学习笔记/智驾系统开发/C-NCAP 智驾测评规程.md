---
published: 2026-06-09
updated: 2026-06-09
---
# C-NCAP 智驾测评规程

> 参考资料：C-NCAP管理规则（2024年版）.pdf

> 参考资料：附录L  主动安全ADAS试验规程.pdf

## 1. C-NCAP

**C-NCAP**（全称 **China-New Car Assessment Program**）是由**中国汽车技术研究中心（中汽中心）** 于 2006 年发布的车辆安全性能评价体系，对量产车型进行全方位安全测试，涵盖：

- **乘员保护**
- **行人保护**
- **主动安全**

最新版 **C-NCAP 2024** 于 2024 年 7 月 1 日正式实施，对自动驾驶相关功能测评做了进一步扩展。

## 2. C-NCAP 怎么给星

星级门槛：

| 星级 | 综合得分率 | 乘员保护最低得分率 | VRU 保护最低得分率 | 主动安全最低得分率 |
|-|-|-|-|-|
| 5+( ★★★★★☆)  | ≥92% | ≥95% | ≥75% | ≥85% |
| 5( ★★★★★)  | ≥83%且＜92% | ≥85% | ≥70% | ≥70% |
| 4( ★★★★)  | ≥74%且＜83% | ≥75% | ≥65% | ≥60% |
| 3( ★★★)  | ≥65%且＜74% | ≥65% | / | / |
| 2( ★★)  | ≥45%且＜65% | ≥60% | / | / |
| 1( ★)  | ＜45% | ＜60% | / | / |

<span style="color: #d83931;"><strong>综合得分率=乘员保护版块得分率×54%+VRU 保护版块得分率×25%+主动安全版块得分率×21%</strong></span>

**综合分够了也不一定能拿对应星级**。还要满足各板块最低得分率。

此外，如果在必做碰撞试验中任意一项试验结束后的 5min 内，如车辆出现着火现象（观测到明火），该车将被降一个星级。

对于 4 星及以上星级车辆，应装备 ESC 系统。

对于 5 星及以上星级车辆，VRU 保护版块的头型试验和腿型试验总得分率应≥62%；

### 2.1. 各项目得分分值

![[附件/C-NCAP 智驾测评规程 01.png]]

主动安全板块的得分是先分别算两个子块得分率，再加权：
<span style="color: #d83931;"><strong>主动安全得分率 = ADAS 实际得分 / 24 × 71.4% + 整车灯光实际得分 / 10 × 28.6%</strong></span>

## 3. 主动安全 ADAS 测试

---

ADAS 在主动安全得分率里占 24 的分值，71.4%的权重。

<table>
	<thead>
		<tr>
			<th style="vertical-align: top;">项目类别</th>
			<th style="vertical-align: top;">项目名称</th>
			<th style="vertical-align: top;">测试场景</th>
			<th style="vertical-align: top;">各项分值</th>
			<th style="vertical-align: top;">总分值</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="10" style="vertical-align: middle;">评价项</td>
			<td rowspan="6" style="vertical-align: middle;">AEB C2C</td>
			<td style="vertical-align: top;">CCRs</td>
			<td style="vertical-align: top;">3</td>
			<td rowspan="16" style="vertical-align: middle;">24</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">CCRH</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">C2C SCP</td>
			<td style="vertical-align: top;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">C2C SCPO</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">CCFT</td>
			<td style="vertical-align: top;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">HMI</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">AEB 误作用</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">3</td>
		</tr>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">LSS</td>
			<td style="vertical-align: top;">LKA</td>
			<td style="vertical-align: top;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">ELK</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">DMS</td>
			<td style="vertical-align: top;">DMS</td>
			<td style="vertical-align: top;">2</td>
		</tr>
		<tr>
			<td rowspan="6" style="vertical-align: middle;">可选审核项</td>
			<td style="vertical-align: top;">LDW</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">TSR</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">ISLS</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">BSD</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">DOW</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">RCTA</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">1</td>
		</tr>
	</tbody>
</table>

**ADAS 块满分 24 分**

### 3.1. AEB C2C

**Automatic Emergency Braking Car-to-Car**，车辆对车辆自动紧急制动。就是测试车在可能和**前方车辆/目标车**发生碰撞时，能不能自动报警、自动刹车，避免碰撞或降低碰撞速度。

在 C-NCAP 里，AEB C2C 属于主动安全 ADAS 项目，满分 **10 分**。它主要测这些车对车场景：

| 缩写 | 含义 | 解释 |
|-|-|-|
| **CCRs** | Car-to-Car Rear stationary | 前车静止，本车追尾风险 |
| **CCRH** | Car-to-Car Rear High-speed | 高速前车切出后遇静止车，本车追尾风险 |
| **C2C SCP** | Car-to-Car Straight Crossing Path | 十字路口直行交叉冲突 |
| **C2C SCPO** | Car-to-Car Straight Crossing Path Obstructed | 有遮挡的交叉路口冲突 |
| **CCFT** | Car-to-Car Front Turn-Across-Path | 前方车辆转向横穿/对向转弯冲突 |

#### 3.1.1. 测试场景

![[附件/C-NCAP 智驾测评规程 02.png]]

![[附件/C-NCAP 智驾测评规程 03.png]]

![[附件/C-NCAP 智驾测评规程 04.png]]

![[附件/C-NCAP 智驾测评规程 05.png]]

![[附件/C-NCAP 智驾测评规程 06.png]]





#### 3.1.2. 各项目分数

<table>
	<thead>
		<tr>
			<th rowspan="2" style="vertical-align: middle;">测试场景</th>
			<th rowspan="2" style="vertical-align: middle;">测试类型</th>
			<th rowspan="2" style="vertical-align: middle;">测试速度（km/h）</th>
			<th rowspan="2" style="vertical-align: middle;">偏置率</th>
			<th colspan="2" style="vertical-align: top;">项目权重</th>
			<th rowspan="2" style="vertical-align: middle;">场景分值</th>
		</tr>
		<tr>
			<th style="vertical-align: top;">速度点权重</th>
			<th style="vertical-align: top;">场景总权重</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="7" style="vertical-align: middle;">CCRs</td>
			<td rowspan="3" style="vertical-align: middle;">AEB</td>
			<td style="vertical-align: top;">20</td>
			<td style="vertical-align: top;">-50%</td>
			<td style="vertical-align: top;">1</td>
			<td rowspan="7" style="vertical-align: middle;">11</td>
			<td rowspan="7" style="vertical-align: middle;">3</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">30</td>
			<td style="vertical-align: top;">+50%</td>
			<td style="vertical-align: top;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">40</td>
			<td style="vertical-align: top;">-50%</td>
			<td style="vertical-align: top;">2</td>
		</tr>
		<tr>
			<td rowspan="4" style="vertical-align: middle;">FCW</td>
			<td style="vertical-align: top;">50</td>
			<td style="vertical-align: top;">+50%</td>
			<td style="vertical-align: top;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">60</td>
			<td style="vertical-align: top;">-50%</td>
			<td style="vertical-align: top;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">70</td>
			<td style="vertical-align: top;">+50%</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">80</td>
			<td style="vertical-align: top;">-50%</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">CCRH</td>
			<td rowspan="2" style="vertical-align: middle;">FCW</td>
			<td style="vertical-align: top;">80</td>
			<td style="vertical-align: top;">100%</td>
			<td style="vertical-align: top;">1</td>
			<td rowspan="2" style="vertical-align: middle;">2</td>
			<td rowspan="2" style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">120</td>
			<td style="vertical-align: top;">100%</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td rowspan="4" style="vertical-align: middle;">C2C SCP</td>
			<td rowspan="2" style="vertical-align: middle;">AEB</td>
			<td style="vertical-align: top;">30</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">1</td>
			<td rowspan="4" style="vertical-align: middle;">5</td>
			<td rowspan="4" style="vertical-align: middle;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">40</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">2</td>
		</tr>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">FCW</td>
			<td style="vertical-align: top;">50</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">60</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">C2C SCPO</td>
			<td rowspan="2" style="vertical-align: middle;">FCW</td>
			<td style="vertical-align: top;">50</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">1</td>
			<td rowspan="2" style="vertical-align: middle;">2</td>
			<td rowspan="2" style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">60</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td rowspan="3" style="vertical-align: middle;">CCFT</td>
			<td rowspan="3" style="vertical-align: middle;">AEB</td>
			<td style="vertical-align: top;">10</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">1</td>
			<td rowspan="3" style="vertical-align: middle;">3</td>
			<td rowspan="3" style="vertical-align: middle;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">20</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">30</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td rowspan="3" style="vertical-align: middle;">HMI</td>
			<td style="vertical-align: top;">关闭要求</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">2</td>
			<td rowspan="3" style="vertical-align: middle;">4</td>
			<td rowspan="3" style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">报警要求</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">主动安全带</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">1</td>
		</tr>
	</tbody>
</table>

#### 3.1.3. 偏置率

> 🐵 注：偏置率就是测试目标与测试车辆在横向方向上的重叠/错开比例。
在 AEB C2C 这类追尾测试里，它通常描述本车撞向前方目标车时，两车中心线是否对齐，以及偏到哪一侧：
- 100%：完全重叠，正对正。
- 50% / -50%：只重叠一半，模拟偏置碰撞或偏置识别场景。
- \+ / -：表示向左或向右偏，具体方向按测试规程坐标定义。
- /：该场景不考察偏置率，或不适用。


![[附件/C-NCAP 智驾测评规程 07.png]]



#### 3.1.4. 分数结算逻辑

具体地讲，测试拆成了<span style="background-color: rgba(255, 246, 122, 0.8);">多个车对车场景</span>，每个场景先按项目权重算通过比例，再折算成场景分值。

```Plain Text
某场景得分 = 该场景已获得项目权重 / 该场景项目权重总和 × 该场景分值
AEB C2C 总分 = 各场景得分相加，满分 10 分
```

举个 CCRs 的例子：

CCRs 场景总权重是 11，满分折算成 3 分。里面又分 AEB 和 FCW 多个速度/偏置率工况：

```Plain Text
20 km/h，-50%，权重 1
30 km/h，+50%，权重 2
40 km/h，-50%，权重 2
50 km/h，+50%，权重 2
60 km/h，-50%，权重 2
70 km/h，+50%，权重 1
80 km/h，-50%，权重 1
```

如果这些小工况里拿到了 9 个权重，那么 CCRs 得分就是：

`9 / 11 × 3 = 2.45 分`

某一行能不能拿到对应权重，要看该工况下是否满足规程规定的制动/预警判定要求。

> 😲 具体怎么判定拿到的权重值呢？


每个测试行都有一个固定权重，然后按该行测试结果算一个完成系数。

`该行实际获得权重 = 表中项目权重 × 该行表现系数`

这个表现系数，CCRs 和 C2C SCP 是按相对速度减少量计算；CCRH 和 C2C SCPO 看 FCW 报警时间；CCFT 看是否碰撞；HMI 则按关闭要求、报警要求、主动安全带要求判断。

具体来说，不同场景的表现系数不能混用同一套指标。它不是简单地看“有没有报警”或“有没有刹车”，而是先按场景确定评价指标，再把该指标换算成这一测试点的表现系数：

- **CCRs 和 C2C SCP：按相对速度减少量折算。**

这两类场景关注系统有没有把碰撞时的相对速度降下来。若车辆完全避免碰撞，说明碰撞相对速度为 0，该测试点表现系数为 1，拿满这一行的项目权重。若仍发生碰撞，则比较测试初始相对速度和实际碰撞相对速度：相对速度降低得越多，表现系数越高；几乎没有速度减免时，表现系数接近 0。

$S \approx (V_{rel,test} - V_{rel,impact}) / V_{rel,test}$

（如果某测试速度点车速减免作用小于 5 km/h，或碰撞速度 $V_{impact}$ > 40 km/h，会停止该场景后续试验。)

- **CCRH 和 C2C SCPO：按 FCW 报警时间判定。**

这两类场景主要考察预警是否足够早，评价重点从“碰撞速度降低多少”转为“驾驶员还能不能来得及反应”。判定时看 FCW 是否在规程规定的 TTC 时间窗口内发出有效碰撞预警。<span style="background-color: rgba(255, 246, 122, 0.8);">TTC ≥ 1.7s 时场景得分</span>，否则不得分。 在 C2C SCPO 场景下， 当 AEB 系统可使车辆避免碰撞时，则对应场景也可得分。

- **CCFT：按是否避免碰撞判定。**

CCFT 是转向横穿/对向转弯冲突场景，规程对它的判定更直接：该速度点下<span style="background-color: rgba(255, 246, 122, 0.8);">系统避免碰撞，就拿该测试点权重；发生碰撞，则该测试点不得分</span>。

- **HMI：按条款逐项审核。**

HMI 不是动态碰撞工况，而是检查系统的人机交互是否满足要求，包括<span style="background-color: rgba(255, 246, 122, 0.8);">关闭要求</span>、<span style="background-color: rgba(255, 246, 122, 0.8);">报警要求</span>和<span style="background-color: rgba(255, 246, 122, 0.8);">主动安全带要求</span>。

- 关闭要求：AEB 和 FCW 不能被驾驶员“一次短按一个按键”就关掉。
- 报警要求：FCW 不能只有基础声光报警，还要有额外提醒方式。
- 主动安全带要求：车要有可重复使用的碰撞前安全带主动预紧。



### 3.2. AEB 误作用

> 对于 AEB 误作用测试项目，评价标准为功能是否触发：AEB 或 FCW 功能均不触发则为通过，AEB 和 FCW 任一功能触发则为不通过。<span style="background-color: rgba(255, 246, 122, 0.8);"><strong>10 个场景通过不少于 8 个，可以得满分。若通过场景小于 8 个，则按照通过场景比例乘以总分进行得分计算。</strong></span>
>
> 计算方法如下：
>
> 1. 场景通过大于等于 8 个，得分率 = 100%。
> 2. 场景通过小于 8 个，得分率 = n / 10 × 100%。（n = 场景通过个数）
>
> 每个测试点按组进行试验，每组重复开展三次试验。三次试验均通过，则判定该测试点通过；且每个测试点最多开展两组试验。

| 序号 | 测试场景 | 测试速度（km/h） | 目标物运动状态 |
|-|-|-|-|
| 1 | 车辆直行经过前方运动的行人 | 30 | 运动 |
| 2 | 车辆直行经过对向运动二轮车 | 30 | 运动 |
| 3 | 车辆直行避让本车道前方静止车辆 | 40 | 静止 |
| 4 | 车辆直行经过单侧顺序停放的车辆 | 20 | 静止 |
| 5 | 车辆直行经过双侧顺序停放的车辆 | 20 | 静止 |
| 6 | 车辆转弯经过弯道外侧行人 | 30 | 静止 |
| 7 | 车辆直行前方行人横穿终止 | 30 | 运动 |
| 8 | 车辆交叉路口左转遇到前方静止车辆 | 30 | 静止 |
| 9 | 车辆直行遇到前方右转车辆 | 40 | 运动 |
| 10 | 车辆弯道行驶超越相邻车道车辆 | 25 | 静止 |



### 3.3. LSS

车道辅助系统（LSS）得分前提为车辆应装备 ESC 系统。

<table>
	<thead>
		<tr>
			<th style="vertical-align: top;">车道线类型</th>
			<th style="vertical-align: top;">偏离方向</th>
			<th style="vertical-align: top;">测试车速（km/h）</th>
			<th style="vertical-align: top;">目标物速度（km/h）</th>
			<th style="vertical-align: top;">偏离速度（m/s）</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="4" style="vertical-align: middle;">LKA 实线</td>
			<td rowspan="2" style="vertical-align: middle;">左侧</td>
			<td rowspan="2" style="vertical-align: middle;">80</td>
			<td rowspan="4" style="vertical-align: middle;">/</td>
			<td style="vertical-align: top;">0.3</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">0.5</td>
		</tr>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">右侧</td>
			<td rowspan="2" style="vertical-align: middle;">80</td>
			<td style="vertical-align: top;">0.3</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">0.5</td>
		</tr>
		<tr>
			<td rowspan="4" style="vertical-align: middle;">LKA 虚线</td>
			<td rowspan="2" style="vertical-align: middle;">左侧</td>
			<td rowspan="2" style="vertical-align: middle;">80</td>
			<td rowspan="4" style="vertical-align: middle;">/</td>
			<td style="vertical-align: top;">0.3</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">0.5</td>
		</tr>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">右侧</td>
			<td rowspan="2" style="vertical-align: middle;">80</td>
			<td style="vertical-align: top;">0.3</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">0.5</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">ELK 虚线</td>
			<td style="vertical-align: top;">左侧有意识</td>
			<td style="vertical-align: top;">70</td>
			<td style="vertical-align: top;">80</td>
			<td style="vertical-align: top;">0.6</td>
		</tr>
	</tbody>
</table>

#### 3.3.1. LKA

![[附件/C-NCAP 智驾测评规程 08.png]]

<table>
	<thead>
		<tr>
			<th style="vertical-align: top;">车道线类型</th>
			<th style="vertical-align: top;">偏离方向</th>
			<th style="vertical-align: top;">测试车速（km/h）</th>
			<th style="vertical-align: top;">偏离速度（m/s）</th>
			<th style="vertical-align: top;">速度点权重</th>
			<th style="vertical-align: top;">项目权重</th>
			<th style="vertical-align: top;">场景分值</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="4" style="vertical-align: middle;">实线</td>
			<td rowspan="2" style="vertical-align: middle;">左侧</td>
			<td rowspan="2" style="vertical-align: middle;">80</td>
			<td style="vertical-align: top;">0.3</td>
			<td style="vertical-align: top;">1</td>
			<td rowspan="4" style="vertical-align: middle;">4</td>
			<td rowspan="8" style="vertical-align: middle;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">0.5</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">右侧</td>
			<td rowspan="2" style="vertical-align: middle;">80</td>
			<td style="vertical-align: top;">0.3</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">0.5</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td rowspan="4" style="vertical-align: middle;">虚线</td>
			<td rowspan="2" style="vertical-align: middle;">左侧</td>
			<td rowspan="2" style="vertical-align: middle;">80</td>
			<td style="vertical-align: top;">0.3</td>
			<td style="vertical-align: top;">1</td>
			<td rowspan="4" style="vertical-align: middle;">4</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">0.5</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">右侧</td>
			<td rowspan="2" style="vertical-align: middle;">80</td>
			<td style="vertical-align: top;">0.3</td>
			<td style="vertical-align: top;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">0.5</td>
			<td style="vertical-align: top;">1</td>
		</tr>
	</tbody>
</table>

注：偏离速度的意思其实就是横向速度。

LKA 是 Lane Keeping Assist，车道保持辅助。它主要处理比较常见、较温和的偏离车道场景：车辆没有打转向灯，逐渐压线或偏出车道时，系统通过方向盘辅助、纠偏或提醒，把车拉回车道内。

<span style="background-color: rgba(255, 246, 122, 0.8);"><strong>LKA 系统最多 2 分；评价标准是轮胎最外缘到车道线外侧的距离。</strong></span>

通过条件是：车辆逐渐向左侧或右侧偏离时，偏离侧轮胎最外缘不应超过车道线外侧 0.2 m。

也就是说，车可以靠近车道线，甚至可能轻微压线附近，但不能让轮胎外缘越过车道线外侧超过 0.2 m。超过这个边界，就说明 LKA 没有及时、有效把车拉住，该测试点不得分。

每组重复 3 次，3 次都通过，才判定该测试点通过，每个测试点最多开展 2 组。

也就是第一次一组三次没全过，可以再做第二组。第二组如果三次都通过，这个测试点仍然可以判定通过；如果第二组也没做到三次全过，这个测试点就不通过。



#### 3.3.2. ELK

![[附件/C-NCAP 智驾测评规程 09.png]]

- GVT 位于 VUT 左侧相邻车道。
- GVT 与 VUT 同向直线行驶。
- GVT 的行驶路径距离中心虚线到靠近 VUT 车道标记的内侧 1.8 m。
- <span style="background-color: rgba(255, 246, 122, 0.8);">如果 ELK 系统不工作，目标车前缘与 VUT 的撞击点会位于 VUT 的后轴附近</span>。

偏离/变道动作：

- VUT 以 0.6 m/s 的横向偏离速度向左侧偏离。
- 这是一次有意识变道测试，并不是无意识跑偏。
- <span style="background-color: rgba(255, 246, 122, 0.8);">VUT 需要在 Tsteer 前至少 1 s 打左转向灯</span>。

| 车道线类型 | 偏离方向 | 测试车速（km/h） | 目标物速度（km/h） | 偏离速度（m/s） | 项目权重 | 场景分值 |
|-|-|-|-|-|-|-|
| ELK 虚线 | 左侧有意识 | 70 | 80 | 0.6 | 1 | 1 |

ELK 是 Emergency Lane Keeping，紧急车道保持。

它处理的是更危险、更紧急的偏离场景，比如车辆即将冲出道路边界、靠近路沿/护栏，或者旁边有车辆、两轮车等目标，继续偏离会有碰撞风险。这时系统需要更强、更及时地介入。

<span style="background-color: rgba(255, 246, 122, 0.8);"><strong>ELK 最多拿 1 分。</strong></span>

它测的是：车辆在 70 km/h 行驶时，左侧相邻目标物以 80 km/h 运动，本车以 0.6 m/s 的横向偏离速度向左偏离虚线车道。这里的“左侧有意识”可以理解为驾驶员有意向左偏，但左侧有目标物，继续偏离会产生侧向碰撞风险。





### 3.4. DMS

<table>
	<thead>
		<tr>
			<th colspan="3" style="vertical-align: top;">场景</th>
			<th style="vertical-align: top;">评分细则</th>
			<th style="vertical-align: top;">场景权重</th>
			<th style="vertical-align: top;">项目分值</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">驾驶员疲劳监测（DFM）测试场景</td>
			<td style="vertical-align: top;">完全闭眼（3s）</td>
			<td style="vertical-align: top;">裸眼</td>
			<td rowspan="2" style="vertical-align: middle;">（1）每人 4 次测试全通过，则得分率 100%；<br>（2）每人至少 2 次测试通过，则得分率 50%；<br>（3）有一人全通过，则得分率 25%。<br>其他情况不得分。</td>
			<td rowspan="2" style="vertical-align: middle;">2</td>
			<td rowspan="7" style="vertical-align: middle;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">完全闭眼（3s）</td>
			<td style="vertical-align: top;">佩戴墨镜</td>
		</tr>
		<tr>
			<td rowspan="5" style="vertical-align: middle;">驾驶员注意力监测（DAM）测试场景</td>
			<td rowspan="3" style="vertical-align: middle;">长时间分心<br>（头动）</td>
			<td style="vertical-align: top;">驾驶员侧后视镜（3s）</td>
			<td rowspan="3" style="vertical-align: middle;">（1）每人 6 次测试全通过，则得分率 100%；<br>（2）每人至少 3 次测试通过，则得分率 50%；<br>（3）有一人全通过，则得分率 25%。<br>其他情况不得分。</td>
			<td rowspan="3" style="vertical-align: middle;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">内后视镜（3s）</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">车载娱乐系统的中控屏幕（3s）</td>
		</tr>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">长时间分心<br>（头不动）</td>
			<td style="vertical-align: top;">仪表盘速度显示区域（3s）</td>
			<td rowspan="2" style="vertical-align: middle;">（1）每人 4 次测试全通过，则得分率 100%；<br>（2）每人至少 2 次测试通过，则得分率 50%；<br>（3）有一人全通过，则得分率 25%。<br>其他情况不得分。</td>
			<td rowspan="2" style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">驾驶员右腿膝盖处（3s）</td>
		</tr>
	</tbody>
</table>

驾驶员开始闭眼或分心动作后，系统在 <span style="background-color: rgba(255, 246, 122, 0.8);">2-4s</span> 内发出警告，则单次场景测试通过；系统未发出警告，则单次场景测试不通过；若发生误报，则单次场景测试不通过。

**DMS 部分最多 2 分。**

<span style="background-color: rgba(255, 246, 122, 0.8);">场景开展 2 名驾驶员测试，每人每个场景执行 3 次，选取结果较优的 2 次纳入得分计算。</span>

| 序号 | 驾驶员特征 | 1 组 | 2 组 |
|-|-|-|-|
| A | 身高（cm） | [150-175] | (175-188] |
| B | 眼睑缝隙（mm） | [5-8] | (8-14] |

注：*1 号驾驶员的特征数值满足 A1 和 B1，则 2 号驾驶员的特征数值需满足 A2 和 B2；若 1 号驾驶员的特征数值满足 A1 和 B2，则 2 号驾驶员的特征数值需满足 A2 和 B1。*





### 3.5. 可选审核项

对于配置了车道偏离预警系统 （LDW） 、 交通信号识别系统 （TSR） 、 智能限速系统 （ISLS） 、盲区监测系统（BSD） 、车辆开门预警系统（DOW） 、后方交通穿行提示系统（RCTA）试验车辆， 车辆生产企业需提供具备资质的第三方检测机构出具的关于此车型按照本规程要求的场景及方法进行测试并满足要求的测试报告，并同时提交 C-NCAP 测试车型与相应试验报告样车的一致性说明文件。

有这些功能并通过审核，就可以获得对应分值；没有或不通过，就不拿这部分分。

<span style="background-color: rgba(255, 246, 122, 0.8);">可选审核项总和理论是 7 分，但最高只计 6 分。</span>







#### 3.5.1. LDW

LDW 是 Lane Departure Warning，车道偏离预警。

LDW 测试主要有两类场景：<span style="background-color: rgba(255, 246, 122, 0.8);">直道直线</span>和<span style="background-color: rgba(255, 246, 122, 0.8);">弯道直线。</span>每个场景也都要测左右两侧。

![[附件/C-NCAP 智驾测评规程 10.png]]

![[附件/C-NCAP 智驾测评规程 11.png]]

<table>
	<thead>
		<tr>
			<th style="vertical-align: top;">车道线类型</th>
			<th style="vertical-align: top;">偏离方向</th>
			<th style="vertical-align: top;">测试车速（km/h）</th>
			<th style="vertical-align: top;">偏离速度（m/s）</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="4" style="vertical-align: middle;">直道实线</td>
			<td rowspan="2" style="vertical-align: middle;">左侧</td>
			<td rowspan="2" style="vertical-align: middle;">80</td>
			<td style="vertical-align: top;">0.6</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">0.7</td>
		</tr>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">右侧</td>
			<td rowspan="2" style="vertical-align: middle;">80</td>
			<td style="vertical-align: top;">0.6</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">0.7</td>
		</tr>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">弯道实线</td>
			<td style="vertical-align: top;">左侧</td>
			<td style="vertical-align: top;">80</td>
			<td style="vertical-align: top;">0</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">右侧</td>
			<td style="vertical-align: top;">80</td>
			<td style="vertical-align: top;">0</td>
		</tr>
	</tbody>
</table>

LDW 需要在车辆越线前后规定范围内发出有效报警。报警可以是：

- 视觉报警
- 声音报警
- 触觉报警

通过标准是：<span style="background-color: rgba(255, 246, 122, 0.8);"><strong>LDW 发出报警时，偏离侧轮胎最外缘不应超过车道线外侧 0.2 m。</strong></span>

LDW 是可选审核项，满分 1 分，有 6 个测试点：

1. 直道实线左侧 0.6
2. 直道实线左侧 0.7
3. 直道实线右侧 0.6
4. 直道实线右侧 0.7
5. 弯道实线左侧
6. 弯道实线右侧

按通过测试点比例折算：

`LDW 得分 = 通过测试点数 / 6 × 1 分`

#### 3.5.2. TSR

TSR 是 Traffic Signal Recognition，交通信号识别系统，主要测的是：<span style="background-color: rgba(255, 246, 122, 0.8);"><strong>车辆接近信号灯控制路口时，能不能识别红灯并及时提醒驾驶员不要闯红灯</strong></span>。

属于可选审核项，满分 1 分。

测试过程中，道路交通信号灯设置为红色，VUT，也就是被测车，按照规划路径沿车道中心线行驶。系统需要识别当前前方是红灯，并向驾驶员发出有效提示。

![[附件/C-NCAP 智驾测评规程 12.png]]

<table>
	<thead>
		<tr>
			<th rowspan="2" style="vertical-align: middle;">信号灯灯色</th>
			<th colspan="4" style="vertical-align: top;">TSR 试验车辆行驶速度及方向</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="vertical-align: top;">20km/h</td>
			<td style="vertical-align: top;">40km/h</td>
			<td style="vertical-align: top;">50km/h</td>
			<td style="vertical-align: top;">60km/h</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">红灯</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">直行</td>
			<td style="vertical-align: top;">直行</td>
			<td style="vertical-align: top;">直行</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">红灯</td>
			<td style="vertical-align: top;">右转（开启转向灯）</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">/</td>
			<td style="vertical-align: top;">/</td>
		</tr>
	</tbody>
</table>

VUT 在直行车道越过停止线（超过 4 m）时 TSR 功能均未产生预警， 或 VUT 在右转时产生误报预警，终止本测试场景试验。

#### 3.5.3. ISLS

![[附件/C-NCAP 智驾测评规程 13.png]]

测试道路为至少包含一条车道的长直道，并于该路段道路一侧设置限速标志牌（40km/h、80km/h）。测试车辆在车道中央沿直线行驶，选择车道时应满足车辆纵向中心线与道路一侧标志牌立柱的横向距离在 ≤ 5m。试验开始时，车辆以低于限制速度（5±1）km/h 的车速行驶。

<table>
	<thead>
		<tr>
			<th colspan="3" style="vertical-align: top;">智能限速系统 ISLS 测试场景</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="vertical-align: top;">测试类型</td>
			<td style="vertical-align: top;">限速标识速度（km/h）</td>
			<td style="vertical-align: top;">测试车速（km/h）</td>
		</tr>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">限速识别 ISLD</td>
			<td style="vertical-align: top;">40</td>
			<td style="vertical-align: top;">35</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">80</td>
			<td style="vertical-align: top;">75</td>
		</tr>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">超速报警 ISLI</td>
			<td style="vertical-align: top;">40</td>
			<td style="vertical-align: top;">50</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">80</td>
			<td style="vertical-align: top;">90</td>
		</tr>
	</tbody>
</table>

#### 3.5.4. BSD

![[附件/C-NCAP 智驾测评规程 14.png]]

- <span style="color: #d83931;"><strong>FCGB</strong></span> 围成的区域为直线工况下的车辆<span style="color: #d83931;"><strong>左侧盲区</strong></span>监视范围
- <span style="color: #d83931;"><strong>KCLB</strong></span> 围成的区域为直线工况下的车辆<span style="color: #d83931;"><strong>右侧盲区</strong></span>监视范围

下面是关键线条说明：

- 线 B 平行于试验车辆后缘，并位于试验车辆后缘后部 3.0m 处。
- 线 C 平行于试验车辆前缘，并位于第九十五百分位眼椭圆的中心。
- 线 F 平行于试验车辆的中心线， 并位于试验车辆车身左侧最外缘的左边， 与左侧最外缘相距 0.5m。
- 线 G 平行于试验车辆的中心线，并位于试验车辆车身左侧最外缘的左边，与左侧最外缘相距 3.0m。
- 线 K 平行于试验车辆的中心线，并位于试验车辆车身右侧最外缘的右边，与右侧最外缘相距 0.5m。
- 线 L 平行于试验车辆的中心线， 并位于试验车辆车身右侧最外缘的右边， 与右侧最外缘相距 3.0m。

BSD 一共测 4 个核心场景：

1. BSD C2C 车对车超车
VUT 以 50 km/h 匀速直行，目标车在相邻车道以 60 km/h 匀速直行并超越。两车横向距离保持 1.5 m。当两车纵向距离到 33 m 时开始测，目标车前缘超过参考 C 线 3 m 时结束。左右两侧都要测。

![[附件/C-NCAP 智驾测评规程 15.png]]

1. BSD C2C 车对车并道
VUT 50 km/h，目标车也 50 km/h，初始横向距离 6 m。目标车从侧后方以 0.5 m/s 侧向速度并入，直到两车横向距离变成 1.5 m，保持至少 300 ms 后再返回。左右两侧都要测。

![[附件/C-NCAP 智驾测评规程 16.png]]

1. BSD C2TW 车对踏板式摩托车超车
VUT 30 km/h，踏板式摩托车 40 km/h，从侧后方进入盲区并超越。两轮车外缘到 VUT 中心线距离保持 2.0–3.5 m。左右两侧都测。

![[附件/C-NCAP 智驾测评规程 17.png]]

1. BSD C2TW 二轮车并道
VUT 25 km/h，二轮车 25 km/h，初始横向距离 7.5 m。二轮车以 （0.5 ± 0.25） m/s 从侧后方并道，直到外缘到 VUT 中心线距离变成 2.5 m。左右两侧都测。

![[附件/C-NCAP 智驾测评规程 18.png]]

**总结：**

<table>
	<thead>
		<tr>
			<th style="vertical-align: top;">测试车辆速度（km/h）</th>
			<th style="vertical-align: top;">目标物类型</th>
			<th style="vertical-align: top;">目标物速度（km/h）</th>
			<th style="vertical-align: top;">目标物动作</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="vertical-align: top;">50</td>
			<td rowspan="2" style="vertical-align: middle;">车辆</td>
			<td style="vertical-align: top;">60</td>
			<td style="vertical-align: top;">超车</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">50</td>
			<td style="vertical-align: top;">50</td>
			<td style="vertical-align: top;">变道</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">30</td>
			<td rowspan="2" style="vertical-align: middle;">踏板式摩托车</td>
			<td style="vertical-align: top;">40</td>
			<td style="vertical-align: top;">超车</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">25</td>
			<td style="vertical-align: top;">25</td>
			<td style="vertical-align: top;">变道</td>
		</tr>
	</tbody>
</table>

> 任一目标物相关的所有场景测试结果为通过，则对应系统（BSD C2C 或 BSD C2TW）的测试结果为通过，获得相应分数，否则不得分。

意思是 BSD 总分 2 分，C2C 和 C2TW 各 1 分。

#### 3.5.5. DOW

![[附件/C-NCAP 智驾测评规程 19.png]]

- 线 A 平行于试验车辆前缘，并位于车辆左右外后视镜最后端处；
- 线 B 平行于试验车辆的中心线，并位于试验车辆车身左侧最外缘的左边，与左侧最外缘（不包括外后视镜）相距 1.5m；
- 线 C 平行于试验车辆的中心线， 并位于试验车辆车身 （不包括外后视镜） 左侧的最外缘；
- 线 D 平行于试验车辆的中心线， 并位于试验车辆车身 （不包括外后视镜） 右侧的最外缘；
- 线 E 平行于试验车辆的中心线，并位于试验车辆车身右侧最外缘的右边，与右侧最外缘（不包括外后视镜）相距 1.5m。

DOW（Door Open Warning，车辆开门预警）测的是<span style="background-color: rgba(255, 246, 122, 0.8);">车辆静止准备开门时，系统能不能对侧后方接近的车辆/两轮车及时发出警告</span>。

1. VUT 也就是被测车是静止的，测试车速为 0 km/h。
2. 后面会放一台障碍车，形成真实的路边停车开门环境。
3. 目标物从侧后方向前直线超越被测车。
4. 试验要求在安全带未扣紧状态下进行，且车门已经开启、开门角度尽量小并保持静止。
5. 车辆处于熄火/下电/静止状态后 180 秒内，DOW 功能仍应保持激活。

官方设了 3 类目标场景：

| 测试车辆速度（km/h） | 目标物类型 | 目标物速度（km/h） | 目标物动作 | 测试车门 |
|-|-|-|-|-|
| 0 | 乘用车 | 30 | 直线超越 | 驾驶员位 |
| 0 | 踏板式摩托车 | 20 | 直线超越 | 驾驶员位、右后侧乘员 |
| 0 | 电动自行车 | 15 | 直线超越 | 驾驶员位、右后侧乘员 |

![[附件/C-NCAP 智驾测评规程 20.png]]

![[附件/C-NCAP 智驾测评规程 21.png]]

![[附件/C-NCAP 智驾测评规程 22.png]]

通过标准：

1. 报警时刻必须满足 <span style="color: #d83931;"><strong>TTC ≥ 1.7s</strong></span>
2. 报警<span style="color: #d83931;"><strong>结束时间不得早于目标超过所开车门的最后端</strong></span>
3. 系统必须提供至少一种易被感知的声、光或触觉报警，而且这个报警要能和别的系统区分开，驾驶员/乘员能明确辨认。

- 每个场景按组测试，每组做 3 次重复试验，3 次都通过，这一组才算通过；
- 每个车门位最多做两组；
- 某个场景下，只有所有相关车门位都通过，这个场景才算通过，否则该场景不通过。

<span style="background-color: rgba(255, 246, 122, 0.8);">要 3 类场景全部通过才能拿这 1 分。</span>

#### 3.5.6. RCTA

RCTA（Rear Cross Traffic Alert，后方交通穿行提示）<span style="background-color: rgba(255, 246, 122, 0.8);">项目分值 1 分</span>。它测的是：车辆倒车时，后方横向穿行的儿童、踏板摩托车、电动自行车接近，系统能不能及时预警。

目标物有 3 类，都是横向穿过车尾后方：

<table>
	<thead>
		<tr>
			<th style="vertical-align: top;">测试场景</th>
			<th style="vertical-align: top;">车辆速度（km/h）</th>
			<th style="vertical-align: top;">目标物类型</th>
			<th style="vertical-align: top;">目标物速度（km/h）</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="vertical-align: top;">儿童穿行</td>
			<td rowspan="3" style="vertical-align: middle;">0</td>
			<td style="vertical-align: top;">PTC</td>
			<td style="vertical-align: top;">5</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">踏板摩托车穿行</td>
			<td style="vertical-align: top;">STA</td>
			<td style="vertical-align: top;">20</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">电动自行车穿行</td>
			<td style="vertical-align: top;">EBTA</td>
			<td style="vertical-align: top;">15</td>
		</tr>
	</tbody>
</table>

![[附件/C-NCAP 智驾测评规程 23.png]]

![[附件/C-NCAP 智驾测评规程 24.png]]

![[附件/C-NCAP 智驾测评规程 25.png]]

每一类目标都要测 两个方向：从左到右穿行一次和从右到左穿行一次

评价指标是：报警时刻，测试车辆靠近目标物运动方向一侧车身外缘，与目标物参考点之间的 TTC。

必须满足 <span style="color: #d83931;"><strong>TTC ≥ 1.7s 以及 报警结束时间不得早于目标物行驶过车身最外缘</strong></span>

如果车辆配了后向 AEB，并且在该场景中能够避免碰撞，也可以得分；此时规程写明参考条件是：

- VUT 倒车速度 8 km/h
- 碰撞点 50%

所有场景测试结果均为通过，则该测试项目得分，任一场景不通过不得分。

## 4. 主动安全 整车灯光性能

---

整车灯光性能试验可获得的最高得分为 10 分。

（这里不怎么需要了解，略过）





## 5. AEB VRU 测试

---

VRU 保护版块一共分三部分：

- 头型试验区域
- 腿型试验区域
- AEB VRU

<span style="color: #d83931;"><strong>VRU 保护版块得分率=（头型试验得分+腿型试验得分）/15\*60%+（AEB VRU_Ped 得分+AEB VRU_TW 得分）/24\*40%。</strong></span>

其中 AEB VRU 最高 24 分，又分成两大子项：

- AEB VRU_Ped：车对行人，最高 12 分
- AEB VRU_TW：车对二轮车，最高 12 分

### 5.1. AEB VRU_Ped

行人部分一共包含这些场景：

1. CPFAO-25 白天
2. CPFAO-25 夜间
3. CPNCO-25
4. CPLA-25 白天
5. CPLA-25 夜晚
6. CPTA-LN-50
7. CPTA-LF-50
8. CPTA-RF-50
9. HMI

<table>
	<thead>
		<tr>
			<th style="vertical-align: middle;">测试场景</th>
			<th style="vertical-align: middle;">测试类型</th>
			<th style="vertical-align: middle;">测试速度（km/h）</th>
			<th style="vertical-align: middle;">目标物速度（km/h）</th>
			<th style="vertical-align: middle;">碰撞位置</th>
			<th style="vertical-align: middle;">各项分值</th>
			<th style="vertical-align: middle;">场景分值</th>
			<th style="vertical-align: middle;">车灯状况</th>
			<th style="vertical-align: middle;">路灯状况</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="4" style="vertical-align: middle;">CPLA-25</td>
			<td rowspan="2" style="vertical-align: middle;">AEB</td>
			<td style="vertical-align: middle;">20</td>
			<td rowspan="4" style="vertical-align: middle;">5</td>
			<td rowspan="4" style="vertical-align: middle;">25%</td>
			<td style="vertical-align: middle;">1</td>
			<td rowspan="4" style="vertical-align: middle;">2</td>
			<td rowspan="4" style="vertical-align: middle;">/</td>
			<td rowspan="4" style="vertical-align: middle;">/</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">40</td>
			<td style="vertical-align: middle;">2</td>
		</tr>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">FCW</td>
			<td style="vertical-align: middle;">60</td>
			<td style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">80</td>
			<td style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td rowspan="4" style="vertical-align: middle;">CPLA-25 夜晚</td>
			<td rowspan="2" style="vertical-align: middle;">AEB</td>
			<td style="vertical-align: middle;">20</td>
			<td rowspan="4" style="vertical-align: middle;">5</td>
			<td rowspan="4" style="vertical-align: middle;">25%</td>
			<td style="vertical-align: middle;">1</td>
			<td rowspan="4" style="vertical-align: middle;">2</td>
			<td rowspan="4" style="vertical-align: middle;">近光灯</td>
			<td rowspan="4" style="vertical-align: middle;">/</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">40</td>
			<td style="vertical-align: middle;">2</td>
		</tr>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">FCW</td>
			<td style="vertical-align: middle;">60</td>
			<td style="vertical-align: middle;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">80</td>
			<td style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td rowspan="3" style="vertical-align: middle;">CPNCO-25</td>
			<td rowspan="3" style="vertical-align: middle;">AEB</td>
			<td style="vertical-align: middle;">20</td>
			<td rowspan="3" style="vertical-align: middle;">5</td>
			<td rowspan="3" style="vertical-align: middle;">25%</td>
			<td style="vertical-align: middle;">1</td>
			<td rowspan="3" style="vertical-align: middle;">2</td>
			<td rowspan="3" style="vertical-align: middle;">/</td>
			<td rowspan="3" style="vertical-align: middle;">/</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">40</td>
			<td style="vertical-align: middle;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">60</td>
			<td style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td rowspan="3" style="vertical-align: middle;">CPFAO-25</td>
			<td rowspan="3" style="vertical-align: middle;">AEB</td>
			<td style="vertical-align: middle;">20</td>
			<td rowspan="3" style="vertical-align: middle;">6.5</td>
			<td rowspan="3" style="vertical-align: middle;">25%</td>
			<td style="vertical-align: middle;">1</td>
			<td rowspan="3" style="vertical-align: middle;">2</td>
			<td rowspan="3" style="vertical-align: middle;">/</td>
			<td rowspan="3" style="vertical-align: middle;">/</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">40</td>
			<td style="vertical-align: middle;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">60</td>
			<td style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td rowspan="3" style="vertical-align: middle;">CPFAO-25 夜晚</td>
			<td rowspan="3" style="vertical-align: middle;">AEB</td>
			<td style="vertical-align: middle;">20</td>
			<td rowspan="3" style="vertical-align: middle;">6.5</td>
			<td rowspan="3" style="vertical-align: middle;">25%</td>
			<td style="vertical-align: middle;">1</td>
			<td rowspan="3" style="vertical-align: middle;">2</td>
			<td rowspan="3" style="vertical-align: middle;">近光灯</td>
			<td rowspan="3" style="vertical-align: middle;">路灯</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">40</td>
			<td style="vertical-align: middle;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">60</td>
			<td style="vertical-align: middle;">2</td>
		</tr>
		<tr>
			<td rowspan="3" style="vertical-align: middle;">CPTA-LN-50</td>
			<td rowspan="3" style="vertical-align: middle;">AEB</td>
			<td style="vertical-align: middle;">10</td>
			<td rowspan="3" style="vertical-align: middle;">5</td>
			<td rowspan="3" style="vertical-align: middle;">50%</td>
			<td style="vertical-align: middle;">1</td>
			<td rowspan="3" style="vertical-align: middle;">1</td>
			<td rowspan="3" style="vertical-align: middle;">/</td>
			<td rowspan="3" style="vertical-align: middle;">/</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">20</td>
			<td style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">30</td>
			<td style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td rowspan="3" style="vertical-align: middle;">CPTA-LF-50</td>
			<td rowspan="3" style="vertical-align: middle;">AEB</td>
			<td style="vertical-align: middle;">10</td>
			<td rowspan="3" style="vertical-align: middle;">6.5</td>
			<td rowspan="3" style="vertical-align: middle;">50%</td>
			<td style="vertical-align: middle;">1</td>
			<td rowspan="3" style="vertical-align: middle;">1</td>
			<td rowspan="3" style="vertical-align: middle;">/</td>
			<td rowspan="3" style="vertical-align: middle;">/</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">20</td>
			<td style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">30</td>
			<td style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">CPTA-RF-50</td>
			<td rowspan="2" style="vertical-align: middle;">AEB</td>
			<td style="vertical-align: middle;">10</td>
			<td rowspan="2" style="vertical-align: middle;">6.5</td>
			<td rowspan="2" style="vertical-align: middle;">50%</td>
			<td style="vertical-align: middle;">1</td>
			<td rowspan="2" style="vertical-align: middle;">1</td>
			<td rowspan="2" style="vertical-align: middle;">/</td>
			<td rowspan="2" style="vertical-align: middle;">/</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">20</td>
			<td style="vertical-align: middle;">1</td>
		</tr>
	</tbody>
</table>

可以先把这些英文缩写粗略理解成几类典型风险：

- 直行遇到横穿行人
- 直行遇到被遮挡后突然出现的行人
- 跟行方向上的行人
- 转弯时与行人发生冲突
- 人机交互/HMI 要求

AEB VRU_Ped 要拿分，需要先满足前提条件：

1. 在 CPFAO-25 场景下，系统从 10 km/h 开始就应当工作，至少要能报警或制动
2. 系统必须能识别 3 km/h 的行人；并且在 CPFAO-25、20 km/h 下，系统要能产生减速效果
3. 如果系统只有 FCW，没有 AEB，那 AEB VRU_Ped 直接不得分

也就是说，这一项不是只要报个警就有基础分。<span style="color: #d83931;">没有 AEB 实际制动能力，Ped 这项分数会直接丢掉</span>。

> 👍 <span style="color: #d83931;"><strong>对于 VUT <= 40 km/h 的 AEB 测试点，官方按相对速度减少量来评分。</strong></span>
意思是：
- 如果成功避免碰撞，通常这个速度点拿满
- 如果没避免碰撞，就看碰撞前把相对速度削掉了多少
- 按线性方式折算得分


所以这类速度点是有连续得分的。

> 😱 <span style="color: #d83931;"><strong>对于 VUT > 40 km/h 的 AEB 测试点：</strong></span>
- 如果速度减少量 >= 20 km/h，该速度点给满分
- 如果 < 20 km/h，该速度点 0 分


> 😲 并且试验如果效果太差，测试场景也可能提前停止：
- 对 VUT <= 40 km/h 的试验，如果速度减少量 < 3 km/h
- 对 VUT > 40 km/h 的试验，如果速度减少量 < 20 km/h
- 或厂商预测该点没有性能
- 或 FCW 场景中 TTC < 1.5 s




### 5.2. AEB VRU_TW

主要覆盖两类目标物：

- EBTA：电动自行车目标物
- STA：踏板式摩托车目标物

<table>
	<thead>
		<tr>
			<th style="vertical-align: middle;">测试场景</th>
			<th style="vertical-align: middle;">测试类型</th>
			<th style="vertical-align: middle;">测试速度（km/h）</th>
			<th style="vertical-align: middle;">目标物速度（km/h）</th>
			<th style="vertical-align: middle;">碰撞位置</th>
			<th style="vertical-align: middle;">各项分值</th>
			<th style="vertical-align: middle;">场景分值</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="3" style="vertical-align: middle;">CBNAO-50</td>
			<td rowspan="3" style="vertical-align: middle;">AEB</td>
			<td style="vertical-align: middle;">20</td>
			<td rowspan="3" style="vertical-align: middle;">15</td>
			<td rowspan="3" style="vertical-align: middle;">50%</td>
			<td style="vertical-align: middle;">1</td>
			<td rowspan="3" style="vertical-align: middle;">3</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">40</td>
			<td style="vertical-align: middle;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">60</td>
			<td style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td rowspan="3" style="vertical-align: middle;">CSFAO-50</td>
			<td rowspan="3" style="vertical-align: middle;">AEB</td>
			<td style="vertical-align: middle;">20</td>
			<td rowspan="3" style="vertical-align: middle;">20</td>
			<td rowspan="3" style="vertical-align: middle;">50%</td>
			<td style="vertical-align: middle;">2</td>
			<td rowspan="3" style="vertical-align: middle;">3</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">40</td>
			<td style="vertical-align: middle;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">60</td>
			<td style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td rowspan="4" style="vertical-align: middle;">CBLA-25</td>
			<td rowspan="2" style="vertical-align: middle;">AEB</td>
			<td style="vertical-align: middle;">20</td>
			<td rowspan="4" style="vertical-align: middle;">15</td>
			<td rowspan="4" style="vertical-align: middle;">25%</td>
			<td style="vertical-align: middle;">1</td>
			<td rowspan="4" style="vertical-align: middle;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">40</td>
			<td style="vertical-align: middle;">2</td>
		</tr>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">FCW</td>
			<td style="vertical-align: middle;">60</td>
			<td style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">80</td>
			<td style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td rowspan="3" style="vertical-align: middle;">CSTA-LN-50</td>
			<td rowspan="3" style="vertical-align: middle;">AEB</td>
			<td style="vertical-align: middle;">10</td>
			<td rowspan="3" style="vertical-align: middle;">20</td>
			<td rowspan="3" style="vertical-align: middle;">50%</td>
			<td style="vertical-align: middle;">1</td>
			<td rowspan="3" style="vertical-align: middle;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">20</td>
			<td style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">30</td>
			<td style="vertical-align: middle;">1</td>
		</tr>
		<tr>
			<td rowspan="2" style="vertical-align: middle;">CSTA-RN</td>
			<td rowspan="2" style="vertical-align: middle;">AEB</td>
			<td style="vertical-align: middle;">10</td>
			<td rowspan="2" style="vertical-align: middle;">20</td>
			<td rowspan="2" style="vertical-align: middle;">右前端</td>
			<td style="vertical-align: middle;">1</td>
			<td rowspan="2" style="vertical-align: middle;">2</td>
		</tr>
		<tr>
			<td style="vertical-align: middle;">20</td>
			<td style="vertical-align: middle;">1</td>
		</tr>
	</tbody>
</table>

AEB VRU_TW 的 评分逻辑和 AEB VRU_Ped 差不多，主要是没有 HMI。

## 6. 从场景→感知需求的推导

---

拿 AEB C2C 距离，在 CCRH 场景，FCW 要测到 120 km/h，撞静止车。

如果要满足 TTC >= 1.7s 的要求，则需要前向摄像头的探测距离至少为：

$$120 / 3.6 \times 1.7 \approx 57 \mathrm{m}$$

再加上感知抖动、融合延迟、目标确认冗余，工程上通常不会只留 57m，往往会希望 70 到 100m 级更稳。

但这里还有一个关键点：<span style="background-color: rgba(255, 246, 122, 0.8);">前向摄像头不等于前向感知系统</span>。

因为在 AEB C2C 里，真正瓶颈点是：

- 静止车能不能稳定分出来
- 遮挡后突然出现的横穿车能不能及时建轨
- 远距离下测距和 TTC 算得稳不稳

所以其实真实需求是<span style="background-color: rgba(255, 246, 122, 0.8);">前向融合链路得在 60 到 100m 级可靠工作</span>。

### 6.1. 在传感器选型阶段

在传感器选型阶段，就要把“前向融合链路 60 到 100m 可靠工作”翻译成可采购、可对比、可验收的传感器规格。也就是：

> 🫡 这个传感器在目标 ODD 下，对指定目标，能以**什么精度**、**什么置信度**、**什么时延**，**在多远距离输出可用信息**。
<span style="background-color: rgba(255, 246, 122, 0.8);">摄像头选型要看的参数</span>
- **FOV 视场角**：决定看多宽。前视 AEB/FCW 通常需要中长焦窄视场或广角+长焦组合；单广角远距识别会吃亏。
- **有效识别距离 / Detection Range**：要按目标拆开写，比如车辆、行人、二轮车、交通标志。
- **分辨率**：远距离目标占多少像素，直接决定 80m、100m 处还能不能分类。
- **焦距 / PPD**：比单看分辨率更有用。PPD 是每度像素数，越高远距离细节越好。
- **动态范围 HDR**：逆光、隧道口、夜间灯光场景很关键。
- **低照度性能**：夜间 VRU 和灯光条件下很关键。
- **帧率和曝光延迟**：影响 TTC 计算和报警时机。
- **安装位置和俯仰角容差**：决定远处目标是否落在有效成像区域里。
- **ISP/算法接口**：是否输出原始图、目标列表、置信度、时间戳，是否方便融合。
<span style="background-color: rgba(255, 246, 122, 0.8);">雷达选型要看的参数</span>
- **最大探测距离**：车辆目标建议至少 120m 级，工程上 150m 更稳。
- **距离精度**：影响 TTC 和 AEB 触发。
- **速度精度**：雷达对 FCW/AEB 很关键，因为 TTC 本质依赖相对速度。
- **角分辨率**：决定能不能区分本车道/邻车道目标。
- **静止目标能力**：AEB C2C 里静止车场景非常关键。
- **更新率和时延**：要能跟功能触发时间预算对齐。
- **虚警/漏检性能**：尤其是护栏、井盖、路牌、金属物反射。


### 6.2. 各场景与传感器配置的映射

> 💡 C-NCAP 评价的是功能表现，不直接规定必须采用哪一种传感器。这里的映射是从测试场景反推感知能力，再进一步映射到适合承担主责的传感器配置。整体原则是：**前视摄像头负责语义识别，前向毫米波雷达负责纵向距离和相对速度，前角雷达负责路口横穿和侧前冲突，后角雷达负责侧后风险，舱内红外摄像头负责驾驶员状态。**


#### 6.2.1. 总体映射

| 场景/功能 | 主责传感器 | 辅助传感器/信号 | 关键原因 |
|-|-|-|-|
| AEB C2C 追尾 | 前向毫米波雷达 + 前视摄像头 | 轮速、IMU、制动系统状态 | 雷达负责测距测速和 TTC 稳定性，摄像头负责车辆分类、本车道关联和误触发抑制。 |
| AEB C2C 路口横穿 | 前角雷达 + 前视摄像头 | 前雷达、V2X | 目标来自侧前方或被遮挡后出现，单一正前方传感器覆盖不足，需要侧前视场和快速建轨。 |
| AEB VRU 行人/二轮车 | 前视摄像头 | 前雷达、前角雷达、车灯状态 | VRU 的类别识别依赖视觉，雷达用于补充距离、速度和夜间/遮挡条件下的稳定性。 |
| LKA/LDW | 前视摄像头 | IMU、轮速、方向盘转角 | 核心是识别车道线并计算车辆相对车道线的位置。 |
| ELK | 前视摄像头 + 后角雷达/侧后雷达 | IMU、轮速、方向盘转角、转向灯 | ELK 不只看车道线，还要判断相邻车道目标是否构成碰撞风险。 |
| TSR/ISLS | 前视摄像头 | 地图/导航可辅助 | 识别交通信号灯、限速牌和车道方向，雷达帮助很小。 |
| BSD/DOW/RCTA | 后角雷达/侧后雷达 | 侧视/后视/环视摄像头 | 目标来自侧后方或后方横穿，常有遮挡，雷达更适合做距离和速度判断。 |
| DMS | 舱内红外摄像头 | 方向盘、车速、转向灯、驾驶行为信号 | 关注驾驶员疲劳、分神、视线和闭眼状态，属于舱内感知。 |

#### 6.2.2. AEB C2C 场景

| 场景 | 感知需求 | 推荐配置 | 选型关注点 |
|-|-|-|-|
| CCRs | 前方静止目标车追尾，需识别本车道静止车辆并稳定计算 TTC。 | 前雷达 + 前视摄像头 | 前雷达要有静止目标能力和稳定测速测距能力；前摄要能确认车辆类别、车道归属和重叠关系。 |
| CCRH | 高速追尾，80/120km/h 条件下需要较远距离识别前方静止目标并及时报警。 | 中长距前雷达 + 前视摄像头；可用 V2X 增强 | 雷达探测距离建议 120m 级以上，工程上 150m 更稳；前摄负责目标语义和道路结构确认。 |
| C2C SCP | 交叉路口直行横穿，目标车垂直穿行，需要判断横向轨迹是否与本车冲突。 | 前角雷达 + 宽视场前摄 | 需要侧前方横向速度和横向位置能力，单前雷达容易覆盖不足。 |
| C2C SCPO | 遮挡横穿，目标被障碍车遮挡，出现时间晚。 | 前角雷达 + 前摄；V2X 可增强 | 前角雷达负责遮挡后快速发现和建轨；前摄用于目标确认和场景语义理解。 |
| CCFT | 本车左转与对向车冲突，需要结合转向轨迹预测碰撞风险。 | 前视摄像头 + 前角雷达 | 需要识别对向目标、转向轨迹、转向灯、方向盘角、横摆率等信息。 |

#### 6.2.3. AEB VRU 场景

| 场景类别 | 感知需求 | 推荐配置 | 选型关注点 |
|-|-|-|-|
| Ped 横穿 | 识别行人/儿童横穿路径，判断碰撞位置和可避免性。 | 前视摄像头主责，前雷达辅助 | 摄像头需要足够的 VRU 识别距离、低照度能力和 HDR；雷达补充距离速度。 |
| Ped 纵向 | 识别前方低速行人/儿童，目标尺寸小且速度低。 | 前视摄像头 + 前雷达 | 前摄负责类别识别；雷达补充纵向距离和相对速度，减少 TTC 误差。 |
| Ped 转弯冲突 | 本车转向时识别近端/远端行人，判断转向轨迹是否相交。 | 宽视场前摄 + 前角雷达 | 需要更宽的侧前覆盖，同时融合转向灯、方向盘角和横摆率。 |
| TW 横穿 | 电动自行车/踏板车横穿速度更高，留给系统的建轨时间更短。 | 前视摄像头 + 前角雷达 | 摄像头负责二轮车分类，前角雷达负责横向速度、横向位置和遮挡后快速建轨。 |
| TW 纵向 | 前方同向二轮车，可能涉及 AEB 和 FCW 速度点。 | 前雷达 + 前视摄像头 | 前雷达稳定输出距离和相对速度，前摄确认目标类型和本车道关联。 |
| TW 转弯冲突 | 左转/右转时与踏板车冲突，路径关系复杂。 | 宽视场前摄 + 前角雷达 | 需要覆盖侧前区域，并结合转向状态做轨迹预测。 |

#### 6.2.4. LSS、侧后与倒车场景

| 项目 | 感知需求 | 推荐配置 | 关键点 |
|-|-|-|-|
| LDW | 识别实线/弯道实线，判断轮胎外缘相对车道线外侧距离。 | 前视摄像头 | 看车道线质量、识别距离、弯道半径适应性和报警时机。 |
| LKA | 识别实线/虚线并进行横向控制，避免车辆偏出允许距离。 | 前视摄像头 + 车辆状态信号 | 比 LDW 更依赖稳定车道线、横向偏移估计和控制闭环。 |
| ELK | 车辆有意识向左偏离时，判断相邻车道快速接近目标是否构成冲突。 | 前视摄像头 + 后角雷达/侧后雷达 | LKA 主要看线，ELK 还要看侧后目标；后角雷达是核心配置。 |
| BSD | 侧后方车辆或二轮车进入盲区后，需要及时、持续报警。 | 后角雷达 | 重点关注侧后 30m 级覆盖、横向覆盖 3m 到 6m、300ms 报警响应和误报抑制。 |
| DOW | 停车开门前识别侧后方接近的车辆/二轮车。 | 后角雷达/侧后雷达 | 车辆下电静置后仍需保持功能激活；要覆盖车门打开风险区域。 |
| RCTA | 倒车时识别车后左右横向接近的儿童、二轮车或车辆。 | 后角雷达 | 常有旁车遮挡，雷达适合横向速度和距离判断；后视/环视摄像头可辅助视觉确认。 |

#### 6.2.5. 交通标志、DMS 与误作用

| 项目 | 感知需求 | 推荐配置 | 选型关注点 |
|-|-|-|-|
| TSR | 识别红灯、直行/右转关系，直行红灯要预警，右转场景不应误报。 | 前视摄像头 | 关注信号灯识别距离、HDR、逆光能力、车道方向理解和误报抑制。 |
| ISLS | 识别 40/80km/h 限速牌，并在车辆尾部越过标志牌平面前完成显示或报警。 | 前视摄像头，地图可辅助 | 关注交通牌识别距离、分辨率、焦距/PPD、侧向 5m 范围内标志牌识别。 |
| DMS | 识别疲劳、分神、视线、闭眼等驾驶员状态。 | 舱内红外摄像头 | 关注夜间红外、人脸/眼部可见性、眼镜/遮挡鲁棒性和算法输出稳定性。 |
| AEB 误作用 | 经过行人/二轮车、停放车辆、避让静止车等场景中，不应误触发 AEB 或 FCW。 | 前视摄像头 + 前雷达 + 融合策略 | 重点不是看得更远，而是准确判断目标是否处于碰撞路径上，并结合转角、横摆率识别驾驶员避让意图。 |

#### 6.2.6. 按传感器反查

| 传感器 | 主要覆盖场景 | 选型关注点 |
|-|-|-|
| 前视摄像头 | AEB VRU、AEB C2C 分类、LDW、LKA、TSR、ISLS、AEB 误作用 | 有效识别距离、FOV、分辨率、焦距/PPD、HDR、低照度、帧率、曝光延迟、目标列表接口。 |
| 前向毫米波雷达 | CCRs、CCRH、纵向 AEB/FCW、前车测距测速 | 车辆探测距离、静止目标能力、距离精度、速度精度、角分辨率、更新率和虚警抑制。 |
| 前角雷达 | C2C SCP、C2C SCPO、CCFT、转弯 VRU、侧前横穿 | 侧前覆盖范围、横向速度测量、遮挡后快速建轨、与前摄/前雷达的目标关联能力。 |
| 后角雷达 | BSD、DOW、RCTA、ELK 侧后目标 | 侧后 30m 级覆盖、横向 3m 到 6m 覆盖、300ms 报警响应、低速/静止车辆场景激活策略。 |
| 环视/侧视摄像头 | 低速近距 VRU、DOW/RCTA 辅助、泊车类场景 | 近距离盲区覆盖、目标语义识别和低速场景辅助，通常不适合承担高速 AEB 主责。 |
| 舱内红外摄像头 | DMS 疲劳、分神、视线监测 | 红外补光、夜间能力、人脸/眼部关键点稳定性、遮挡和眼镜鲁棒性。 |
| 轮速/IMU/转角/横摆率 | AEB、LKA、ELK、AEB 误作用、轨迹预测 | 用于判断本车运动状态、转向意图、路径预测和功能触发时机，是感知融合的基础输入。 |
| V2X | CCRH、C2C SCPO 等高速或遮挡增强场景 | 适合作为遮挡和远距离场景增强信息，但不应替代基本传感器感知能力。 |

> ✅ 选型建议：<span style="background-color: rgba(255, 246, 122, 0.8);"><strong>基础覆盖可按“前视摄像头 + 前向毫米波雷达 + 后角雷达”起步</strong></span>；若要更稳地覆盖路口横穿、遮挡、ELK、DOW/RCTA 等场景，应增加前角雷达，并把传感器规格写成“目标类型 + ODD + 有效距离 + 精度 + 时延 + 输出字段”的组合要求。
