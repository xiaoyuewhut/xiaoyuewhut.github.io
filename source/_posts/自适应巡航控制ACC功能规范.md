---
title: 自适应巡航控制ACC功能规范
date: 2025-11-21 11:25:52
cover: https://cdn.jsdelivr.net/gh/xiaoyuewhut/image@main/20251121134725596.png
tags: 
- 自动驾驶
- 智能驾驶
- 控制
- 纵向控制
categories:
- 自动驾驶
---

# 从工程实现看L2级纵向控制
将从系统架构、状态机设计、人机交互策略等维度，剖析ACC的工程实现精髓。

# 系统架构：多传感器协同
ACC系统的感知层采用"视觉+雷达"的异构冗余方案：
**传感器配置矩阵**
- **前视摄像头**：通过LVDS接口接入，分辨率1280×960，综合视距150m+，主要负责车道线识别和目标分类
- **前向毫米波雷达**：77GHz频段，160m探测距离，±45°水平视场角，提供高鲁棒性的距离与速度测量
- **超声波雷达**：12探头方案，私有CAN通信，主要用于低速Stop&Go场景的近距离补盲

**执行路径设计**
系统采用 **"ADAS控制器→ESP→VCU"** 的纵向控制链路。ADAS通过私有CAN发送目标加速度请求（`ADAS_VLCAxTarAim`），ESP的VLC（Vehicle Longitudinal Control）模块负责扭矩仲裁，最终通过`ESP_MotorTorqReq`信号驱动VCU实现加减速。这种分层架构将控制算法与车辆动力学解耦，提升了跨平台移植性。

**核心信号带宽**
- 感知刷新率：30Hz（摄像头与雷达融合周期）
- CAN总线负载：500kbps，采用滚动计数器（Rolling Counter）和校验和（Checksum）保证功能安全

# 状态机设计：面向功能安全
状态机是ACC系统的"大脑"，其健壮性直接决定了功能安全等级。定义了6大状态：
## 1. Prepare Mode：系统自检与初始化
- **触发条件**：KL15上电后，系统完成传感器有效性检查、`ESP_VLCAvailable`信号确认
- **关键逻辑**：此状态下ADAS持续发送`ADAS_MRR_ACCMode = initialization`，ESP反馈功能可用性

## Standby Mode：静默待命
- **准入条件**：这是最复杂的逻辑门，需同时满足11项子条件：
  ```c
  // 伪代码示例
  if (BrakePedal == NOT_PRESSED 
      && Speed ∈ [5,135]km/h 
      && AllDoors == CLOSED 
      && SeatBelt == BUCKLED
      && Gear == D
      && ESP_AEBActive == INACTIVE
      && FCWWarning == NOT_WARNING) {
      Enter_Standby();
  }
- 人机交互：IPC显示灰色巡航图标，提示系统"已就绪但未激活"

## Active Mode：纵控闭环
+ **定速巡航**：`ADAS_MainObjectID = no target`时，系统进入速度PI控制，目标加速度解析度0.1m/s²
+ **跟车巡航**：基于毫米波雷达的`TTC`（Time to Collision）计算，实现可变时距控制。车间时距支持7档调节（0.86s~1.88s），通过`TCM_ACCDistSwitchStatus`接口设置
+ **弯道速度控制**：根据前视摄像头计算的道路曲率R，当R≥125m时系统可正常跟车，低于此阈值需降级

## Pause Mode（Hold状态）：Stop&Go的核心
这是ACC系统的技术亮点之一：
+ Hold触发条件：前车刹停后，根据与前车距离查表确定Hold进入时间（非固定180s，而是动态调整）
+ 制动保持：ESP通过CDD（Creep Drive-away Damp）功能实现600s保压，避免频繁切换EPB
+ 重启机制：需检测`VCU_CH_AccelPedalPosition > 0` + `ADAS_LKAorALCTouchWarning` == `Normal`，防止驾驶员注意力分散

## Override Mode：驾驶员优先权
+ 扭矩仲裁逻辑：VCU实时比较驾驶员踏板扭矩请求与ACC系统扭矩请求，当驾驶员请求超过系统请求持续60ms，触发`VCU_CH_TorqOverrideReq` = `Override Request`
+ 平滑退出：ADAS持续发送目标加速度，ESP保持激活状态，确保接管瞬间无纵向冲击
+ 恢复策略：驾驶员松油门后，若扭矩请求低于系统请求，自动返回Active模式，实现"无缝"切换

## Failure Mode：故障熔断
采用分级故障管理：
+ 可逆故障：如短暂传感器遮挡，进入Reversible Error，系统尝试恢复
+ 不可逆故障：如`ESP_ErrorFlag` = `Failure`，直接触发`Irreversible Error`，所有ADAS功能熔断
+ 单点故障保护：仅融合传感器故障时，保留LDW等独立功能；ECU级故障则整车ADAS功能静默


# 状态机的进入退出条件
![](https://cdn.jsdelivr.net/gh/xiaoyuewhut/image@main/20251121125853403.png)
- **ALL**：必须全部条件满足  
- **ANY**：任意条件触发即可迁移  
## T1: Prepare -> Standby, ALL
|序号|信号逻辑|含义解释|
|---|---|---|
|a|`IB_BrakePedalStatus=Not Pressed`|驾驶员未踩下制动踏板|
|b|无前车时仪表车速在5\~135km/h间<br>或跟车状态下0~135km/h|确保车辆在合理速度范围内运行|
|c|`BCM_FL/FR/RL/RRDoorStatus=Closed` &&<br>`BCM_HoodAjarStatus=Closed` &&<br>`PLG_RearLatchPosition=Locked`|车辆四门、前舱盖、后尾门全部关闭|
|d|`ACU_DriverBuckleStatus=Buckled`|驾驶员安全带已系紧|
|f|`VCU_CH_ActualGearShiftPosition=D`|车辆挡位处于D档（前进挡）|
|g|`ADAS_FCWWarning=not warning`|前方碰撞预警（FCW）功能未启动且无报警|
|h|`ESP_AEBBACtrlActive=Inactive` &&<br>`ESP_AEBCtrlActive=Inactive` &&<br>`ESP_ABSCtrlActive=Inactive` &&<br>`ESP_VDCCtrlActive=Inactive` &&<br>`ESP_TCSCtrlActive=Inactive`|ESP系统未进行任何形式的自动制动干预|
|i|`VCU_CH_ACCAvailable=Available`|ACC功能处于可用状态|
|j|`ESP_VLCAvailable=Available`|ESP车速控制功能可用|
|k|驾驶员设置ESP ON|ESP系统已开启|

## T2: Standby -> Prepare, ANY
|序号|信号逻辑|含义解释|
|---|---|---|
|a|`IB_BrakePedalStatus=Pressed`|驾驶员踩下制动踏板|
|b|`ESP_VehicleSpeed > 128.16km/h`|实际车速超过135km/h（仪表显示值）|
|c|`BCM_FL/FR/RL/RRDoorStatus=Ajar` \|\|<br>`BCM_HoodAjarStatus=Ajar` \|\|<br>`PLG_RearLatchPosition!=Closed`|车辆任意门、前舱盖或后尾门处于打开状态|
|d|`ACU_DriverBuckleStatus=UnBuckled`|驾驶员解开安全带|
|f|`VCU_CH_ActualGearShiftPosition!=D`|车辆挡位不在D档|
|g|`ADAS_FCWWarning=warning`|前方碰撞预警（FCW）功能启动报警|
|i|`ESP_AEBBACtrlActive=Active` \|\|<br>`ESP_AEBCtrlActive=Active` \|\|<br>`ESP_ABSCtrlActive=Active` \|\|<br>`ESP_VDCCtrlActive=Active` \|\|<br>`ESP_TCSCtrlActive=Active`|ESP系统正在进行自动制动干预|
|j|未跟车状态下，仪表车速低于3km/h|无前方车辆时车速过低|
|k|`VCU_CH_ACCAvailable=Unavailable`|ACC功能不可用|
|l|`ESP_VLCAvailable=Unavailable`|ESP车速控制功能不可用|
|m|驾驶员设置ESP OFF|ESP系统被关闭|

## T3: Standby -> Active, ALL
|序号|信号逻辑|含义解释|
|---|---|---|
|a|`TCM_ACCSetSwitchStatus=ON` \|\|<br>`TCM_ACCSpdPlusSwitchStatus=ON` \|\|<br>`TCM_ACCSpdMinusSwitchStatus=ON`|驾驶员通过拨杆一次操作开启ACC或调节ACC车速（SET/+/-）|

## T4, Active -> Pause, ANY
|序号|信号逻辑|含义解释|
|---|---|---|
|a|LKA启动条件下，驾驶员超过50s未触碰方向盘，车辆刹停后ADAS向ACC发送ACC Hold标识位|车道保持辅助长脱手导致ACC Hold|
|b|跟车模式下，前方存在静止障碍物，车辆刹停后若干时间内未启动|前车静止超时触发Hold|
|c|跟车模式下，跟随前车减速刹停，车辆静止后与前车距离小于2.0m|停车距离过近触发Hold|
|d|跟车模式下，车辆静止后识别到前方有行人、自行车目标经过|检测到 vulnerable road user 触发Hold|
|e|跟车模式下，本车由静止开启acc且开启时距离前车距离小于5.0m|起步时距离前车过近触发Hold|

## T5, Pause -> Active, ANY
|序号|信号逻辑|含义解释|
|---|---|---|
|a|`ADAS_LKAorALCTouchWarning=Normal`|车辆未静止时，驾驶员接管方向盘（脱离LKA/ALC控制）|
|b|`ESP_CDDS_VehiHoldStatus=In standstill` &&<br>`VCU_CH_AccelPedalPosition>0` &&<br>`ADAS_LKAorALCTouchWarning=Normal`|车辆静止后，驾驶员踩下油门踏板并接管方向盘|

## T6, Active -> Override, ALL
|序号|信号逻辑|含义解释|
|---|---|---|
| - |`VCU_CH_TorqOverrideReq=Override Request`|驾驶员踩下油门踏板达到扭矩接管阈值|

## T7, Override -> Active, ALL
|序号|信号逻辑|含义解释|
|---|---|---|
|a|`VCU_CH_TorqOverrideReq=No Request`|驾驶员松开油门踏板未达到扭矩接管请求|
|b|`VCU_CH_ACCAvailable=Available`|ACC功能恢复可用状态|
|c|`ESP_VLCAvailable=Available`|ESP车速控制功能恢复可用状态|

## T8, Override -> Exit, ANY
|序号|信号逻辑|含义解释|
|:-|:-|:-|
|a|`BCM_FL/FR/RL/RRDoorStatus=Ajar \|\| BCM_HoodAjarStatus=Ajar \|\| PLG_RearLatchPosition=Unlocked`|车辆任意门、前舱盖或后尾门未锁闭|
|c|`ESP_AEBBACtrlActive=Active \|\| ESP_AEBCtrlActive=Active \|\| ESP_ABSCtrlActive=Active \|\| ESP_VDCCtrlActive=Active \|\| ESP_TCSCtrlActive=Active`|ESP系统正在进行自动制动干预|
|d|`ACU_DriverBuckleStatus=Unbuckled`|驾驶员未系安全带|
|f|`VCU_CH_ACCAvailable=Unavailable`|ACC功能不可用|
|g|`ESP_VLCAvailable=Unavailable`|ESP车速控制功能不可用|
|h|`EGSM_phyGearShiftSwitchStatus!=POS_Y(D)`|物理换挡开关不在D档位置|
|i|`TCM_ACCCancelSwitchStatus=OFF`|驾驶员主动操作退出ACC或LKA功能|
|j|`IB_BrakePedalStatus=Pressed`|驾驶员踩下制动踏板|
|k|LKA长脱手车辆刹停后ACC进入Hold且100s内未重新踩油门启动|长时间Hold自动退出|
|l|仪表车速＜3km/h（前方无车）|无跟车目标时车速过低|
|m|`ESP_VehicleSpeed >134.09km/h`|实际车速超过137km/h（仪表显示值）|
|n|驾驶员设置ESP OFF|ESP系统被关闭|

## T9, Exit -> Failure, ANY
| 序号 | 信号逻辑                             | 含义解释        |
| :- | :------------------------------- | :---------- |
| a  | `ADAS_FusionFaultStatus=Failure` | 前方传感器（融合）故障 |
| b  | `ADAS_ECUFaultStatus=Failure`    | ADAS控制器自身故障 |
| c  | `ESP_ErrorFlag=Failure`          | ESP系统故障     |

## T10, Exit -> Prepare,ALL
|序号|信号逻辑|含义解释|
|:-|:-|:-|
|a|`ADAS_FusionFaultStatus=Normal && ADAS_ECUFaultStatus=Normal && ESP_ErrorFlag=Normal`|所有系统故障已清除，传感器与模块信号恢复正常|
|b|`VCU_CH_ACCAvailable=Available && ESP_VLCAvailable=Available`|ACC与ESP_VLC功能重新可用|
|c|`TCM_ACCSetSwitchStatus=ON` || TCM_ACCResSwitchStatus=ON`|**驾驶员主动操作**：重新按下SET或RES键表达启动意图|
|d|`IB_BrakePedalStatus=Not Pressed && VCU_CH_AccelPedalPosition=0%`|驾驶员未踩制动踏板且油门踏板处于初始位置|
|e|`VCU_CH_ActualGearShiftPosition=D && EGSM_phyGearShiftSwitchStatus=POS_Y(D)`|车辆处于D档（行驶档）|
|f|`ACU_DriverBuckleStatus=Buckled`|驾驶员安全带已系紧|
|g|`BCM_FL/FR/RL/RRDoorStatus=Closed && BCM_HoodAjarStatus=Closed && PLG_RearLatchPosition=Locked`|所有车门、前舱盖、后尾门均已关闭锁止|
|h|`ESP_VehicleSpeed ≤ 128.16km/h`|当前车速未超过ACC工作上限（≤135km/h仪表车速）|


## T11, Pause -> Prepare, ALL
|序号|信号逻辑|含义解释|
|:-|:-|:-|
|-|ACC在停车Hold模式条件超过600s|ACC Hold状态持续时间超过10分钟，系统自动退出|






# 性能指标
## 速度与加速度控制精度
ACC 是一个典型的纵向闭环控制系统，最核心的评价就是“跟得稳、控得准”。
- **稳态速度误差 ≤ 1 km/h**
- **稳态加速度误差 ≤ 0.1 m/s²**
- **加速度指令响应延迟：加速 ≤ 300 ms，减速 ≤ 400 ms**
- **纵向 jerk（加加速度）不超过 5 m/s³**
> 工程含义：  
> - 响应延迟直接体现 ECU–ESP–VCU 三层链路的实际执行速度。  
> - jerk 过大会导致乘坐“点头感”，影响舒适性与品牌感知。

## 纵向极限能力
ACC 虽然不是 AEB，但必须具备一定的制动能力来应对驾驶员无法立即反应的缓变场景：

- **最大加速度 ≥ 2~3 m/s²**
- **最大减速度 ≥ 3.5~5 m/s²，取决于车速区间**
- **Stop&Go 最低跟停距离 2.5~5.5 m**

这些指标必须同时满足**可控性**与**舒适性**，尤其对电车来说，驱动扭矩变化会直接影响能耗模型，因此 ACC 的纵向曲线通常需要带约束优化。

## 跟车稳定性与时距控制
ACC 的灵魂是“稳稳地跟着前车”，实现这一点有 3 个关键指标：

1. **车间时距精度**：7 档可调，0.86 s～1.88 s  
2. **TTC（碰撞时间）动态控制**：能在频繁加减速中保持稳定时距  
3. **队列跟车稳定性**：不放大前车速度扰动（Avoid String Instability）

> 这是 ACC 和 LCC 联调中经常踩坑的问题：弯道、坡道、并线等场景下，时距控制容易出现突变或误跟问题。

## 弯道与特殊场景的适应能力
- **支持最小曲率半径 R ≥ 125 m 的弯道跟车**
- **支持普通城市道路坡度 ≤ 10%**
- **支持雨雾等感知退化场景下的降级策略**

# 人机交互策略
在工程实现里，**人机交互（HMI）不是附属功能，而是 ACC 是否能量产成功的核心要素之一**。  

一个优秀的 ACC，一定具备以下三个特性：
1. **驾驶员随时知道系统处于什么状态**
2. **系统的行为必须“可预期”且“不惊不乍”**
3. **系统与驾驶员之间永远由驾驶员掌控优先权**

基于此，ACC 的 HMI 设计通常围绕四个层级展开：
## 状态可视化（State Visualization）
ACC 本身是一台状态机，因此 HMI 的关键任务是：**把不可见的状态转化为驾驶员能理解的视觉反馈。**
| 状态 | 图标颜色 | 含义 |
|------|----------|------|
| Standby | 灰色 | 系统可用但未激活 |
| Active | 蓝色高亮 | 正在进行 ACC 控制 |
| Hold | 黄色或白色闪烁 | 暂停，等待驾驶员确认或前车启动 |
| Override | 橙色提示 | 驾驶员主动接管 |
| Failure / Unavailable | 红色或消失 | 系统故障或不可用 |

示例说明：
- 激活 ACC 后，**图标从灰色变为蓝色**，并显示设定车速。
- Override 时，**出现橙色“油门接管”提示图标**，提醒驾驶员松油即可恢复

## 信息透明（Driving Information Transparency）
在 ACC 工作时，驾驶员需要实时知道车辆的“意图”，否则会产生不信任感。

### ► 关键显示内容包括：
- **设定车速（Cruise Speed）**
- **跟车时距档位（Distance 1~7）**
- **当前目标（前车）是否被锁定**
- **系统当前是否减速、加速、匀速**

例如：
- 当前方无车 → 仪表显示“设定速度: 100 km/h”
- 当前方有车 → 显示“锁定前车”图标 + 实时距离
- 弯道速度控制触发 → 图标轻微闪现或显示“弯道速度控制”提示（部分 OEM 会隐藏）

### ► 车间时距调整反馈
驾驶员旋钮调节车距时：
- IPC 会在屏幕上高亮显示：“车距 档位 3”
- 显示时间约 **2.5s**

## 驾驶员动作反馈（Driver Input Feedback）
### 拨杆操作（Set / Resume / Cancel）
每一次拨杆动作必须伴随：
- 图标改变
- 声音反馈（短提示音）
- 数值变化（巡航车速或车距）

例如：
- 向上拨杆 → 车速 +5 km/h，并出现数字跳动动画
- 长拨杆 → 连续增加车速
- 拨杆恢复巡航（Resume）→ 提示“恢复至 XX km/h”

### Override（油门接管）
当驾驶员踩油门超过 60ms：
- 显示橙色提示：“已接管，请松油恢复 ACC”
- ACC 图标不消失，但变为橙色框（保持存在感）

### 刹车接管
比油门接管更强：
- ACC 图标立即 **闪烁 3 次 → 消失**
- 显示 “立即接管” 图示
- 播放短促提示音

刹车接管代表 ACC 完全退出，与 Override 不同。

## 安全提示（Safety-oriented Notifications）
ACC 的人机交互本质是为了**降低驾驶员负担，同时保证驾驶员仍然是主导者**。  
因此，以下场景都需要做及时的安全提示：

### ► Hold 模式提示
- 当前车刹停，系统进入 Hold  
→ 仪表显示 “HOLD” 图标  
→ 若超过 preset 时间未启动，显示“前车已停，请踩油门继续”  

### ► Drive-off 提示（起步提醒）
- 前车启动 → 显示 “请踩油门继续 ACC”  
- 并伴随轻提示音（SR 或 ACC Driveoff）

### ► 异常/不可用提示
包括：
- 门开 / 盖开
- 驾驶员未系安全带
- ESP/AEB 触发
- 感知故障
- 后备箱开启
- 档位非 D

这些都会触发：
- 图标闪烁 3 次  
- 提示文字：“巡航不可用”  
- 轻提示音  

### ► 货车并线预警（Truck Cut-in Warning）
在 ACC 激活时：
- 若旁侧大货车切入，本车存在 TTC 风险  
→ 显示并线预警图标  
→ 根据昼夜不同阈值触发  
→ 最少持续 2 秒  

这个功能可以显著提高高速场景的信任感。

## 总结：一个优秀 HMI 的关键点
1. **状态可见** —— 驾驶员永远知道系统在干什么  
2. **可预期行为** —— 图标变化和车辆行为一致  
3. **操作即反馈** —— 每个操作都带来视觉与听觉确认  
4. **接管优先** —— 驾驶员始终最高优先级  
5. **防惊吓策略** —— 避免突然的图标闪烁与突兀提示  
6. **场景感知提示** —— 弯道、并线、前车启动等关键节点明确提示  
7. **错误透明** —— 出错必须明确告诉驾驶员原因来源 