---
title: 故障码DTC
date: 2025-11-21 11:02:26
cover: https://cdn.jsdelivr.net/gh/xiaoyuewhut/image@main/20251121135429557.png
tags: 
- uds
- 诊断
- 故障
categories:
- 新能源技术
---

明确一个重点：我们平时说的 DTC，比如`P0123`这种格式，和`0x19`服务读取的 DTC 故障码格式是不一样的。前者是**五个字符的字母数字**组合，遵循 SAE J2012 / ISO 15031-6 标准。而 `0x19` 服务返回的 DTC 是以原始数据字节的形式传输的，总数据长度为 **4 个 byte，也就是 32 个 bit**。

我们把这两种故障码，分别称为：
- 五位故障码
- 故障内码

![](https://cdn.jsdelivr.net/gh/xiaoyuewhut/image@main/20251121110422523.png)
![](https://cdn.jsdelivr.net/gh/xiaoyuewhut/image@main/20251121110444377.png)

# 五位故障码
## 第一位，故障系统
是字母，占 2 个 bit
| 故障内码 | 字母 | 所属系统 |
|----------|------|----------|
| 00       | P    | 动力系统 |
| 01       | C    | 底盘系统 |
| 10       | B    | 车身系统 |
| 11       | U    | 通信系统 |

## 第二位，故障类型
| 故障内码 | 五位故障码 | 故障类型               |
|----------|------------|------------------------|
| 00       | 0          | 标准定义，通用故障类型 |
| 01       | 1          | 自定义                 |
| 10       | 2          | 预留                   |
| 11       | 3          | 预留                   |

## 第三位，故障子系统
没什么好说的，4 个 bit，8 个子系统。

## 第四、五位
主机厂自定义，具体发生的问题

# 故障内码
障码由四个字节组成，分别是 `DTCHighByte`，`DTCMiddleByte`，`DTCLowByte` 以及 `StatusOfDTC`，其中前三个字节是故障诊断码，最后一个字节是状态位。

`DTCHighByte` 和 `DTCMiddleByte` 用来表示五位故障码，而 `DTCLowByte` **表示故障类别和故障子类型**。

## DTCLowByte
> 格式说明：DTC 故障类型由 16 （实际上只有 10 个类型，另外两个是预留）个不同的 `DTCFailureCategory`（故障类别）组成，而每个类别与 16 个 `DTCFailureSubtype`（子类型故障）相关联。

![](https://cdn.jsdelivr.net/gh/xiaoyuewhut/image@main/20251121111307127.png)
![](https://cdn.jsdelivr.net/gh/xiaoyuewhut/image@main/20251121111321720.png)

## StatusOfDTC
> DTC 状态位包含 1 个字节数据长度，当条件成立时，该 Bit 位置 1，通过读取各 Bit 的置位信息即可得知当前及过去 DTC 的情况，当然也可以通过诊断命令对状态位进行清除。
但并不是每一位不一定都要使用，具体取决于各 OEM 的需求，在 ISO14229-1 中，除了 bit3: `ConfirmedDTC` 是强制约束外，其他都没有强制约束。

![](https://cdn.jsdelivr.net/gh/xiaoyuewhut/image@main/20251121111409411.png)
备注：一般主机厂至少支持 Bit0 和 Bit3 的状态位，其余状态根据需求 OEM 自己定义是否一定需要支持。
因此，bit0和bit3所代表的status也是最重要的：
- bit0 `testFailed`：当前故障
- bit3 `confirmedDTC`：已确认故障

