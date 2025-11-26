---
title: UDS 0x19 服务
date: 2025-11-21 11:18:35
cover: https://cdn.jsdelivr.net/gh/xiaoyuewhut/image@main/20251122142219135.png
tags: 
- uds
- 诊断
- 故障
categories:
- 新能源技术
---

# 什么是0x19服务？
`ReadDTCInformation Service`，就是读取DTC相关的服务。常用的包括：
- `19 01`：根据DTC的状态掩码查找匹配的DTC数量，客户端可以定义掩码来筛选要读取的DTC类型，例如当前故障、历史故障或全部故障。
- `19 02`：`ReportDTCByStatusMask`，通过DTC 状态掩码获取DTC状态，读取符合特定掩码条件的DTC列表及其状态
- `19 04`：根据提供的冻结帧记录号，获取DTC和DTC对应的冻结帧数据
- `19 06`：根据DTC值和扩展数据记录号，获取DTC和DTC对应的扩展数据
- `19 0A`：获取支持的所有DTC的状态

# 19 01 查找对应状态的DTC数量
Request格式如下：
| 字节   | 参数名称         | 参数约定 | 数值   |
|--------|------------------|----------|--------|
| Byte1  | SID              | M        | 19     |
| Byte2  | SubFunction      | M        | 01     |
| Byte3  | DTCStatusMask<br>DTC状态掩码     | M        | 00-FF  |

![](https://cdn.jsdelivr.net/gh/xiaoyuewhut/image@main/20251121112113868.png)
备注：一般主机厂至少支持 Bit0 和 Bit3 的状态位，其余状态根据需求 OEM 自己定义是否一定需要支持。
因此，bit0和bit3所代表的status也是最重要的：
- bit0 `testFailed`：当前故障
- bit3 `confirmedDTC`：已确认故障

Positive Response格式如下：
| 字节   | 参数名称                                                                 | 参数约定 | 数值（Hex） |
|--------|--------------------------------------------------------------------------|----------|-------------|
| Byte1  | Positive Response Service Identifier 肯定响应回复ID      | M        | 59          |
| Byte2  | SubFunction=ReportNumberOfDTCByStatusMask 子功能=报告匹配状态掩码的DTC故障码的数量 | M        | 01          |
| Byte3  | DTCStatusAvailabilityMask 当前ECU支持的状态掩码                           | M        | 01-FF       |
| Byte4  | DTCFormatIdentifier DTC所用的格式                                         | M        | 00-FF       |
| Byte5  | DTCCountHighbyte DTC计数高字节                                            | M        | 00-FF       |
| Byte6  | DTCCountLowbyte DTC计数高低节                                             | M        | 00-FF       |

> 什么是参数约定？
>- **M**(Mandatory)：该参数必须存在于A_PDU中，标记为M的服务，表示当该服务存在的时候，该参数一定存在。
>- **C**(Conditional)：该参数可以基于某些条件（例如A_PDU中的子函数/参数）存在于A_PDU中。
>- **S**(Selection)：指示参数是必需的（除非另有指定），并且是从参数列表中选择的参数。
>- **U**(Use option)：该参数可能存在，也可能不存在，具体取决于用户的动态使用情况。

Negative Response中的NRC如下：
- `0x12`：服务器不支持客户端请求服务的子功能
- `0x13`：服务器认为客户端请求数据的报文长度不符合标准
- `0x31`：服务器没有客户端请求的数据，此否定响应适用于支持数据读写，或者根据数据调整功能的服务器

# 19 02 读取故障码列表
![](https://cdn.jsdelivr.net/gh/xiaoyuewhut/image@main/20251121112432884.png)
![](https://cdn.jsdelivr.net/gh/xiaoyuewhut/image@main/20251121112448116.png)

