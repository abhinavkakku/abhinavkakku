---
title: "AES-Killer - Burp Plugin To Decrypt AES Encrypted Traffic Of Mobile Apps"
date: 2018-10-06
category: "Tools"
image: {
  src: "/images/AES-Killer_4.png",
  alt: "AES Killer",
}
author: Abhinav Kumar
description: AES Killer
---

Burpsuite Plugin to decrypt AES Encrypted mobile app traffic.

#### **[Download AES-Killer](https://github.com/Ethicalhackx/AES-Killer)**

**Requirements**

- Burpsuite
- Java

**Tested on**

- Burpsuite 1.7.36
- Windows 10
- xubuntu 18.04
- Kali [Linux](https://www.kitploit.com/search/label/Linux) 2018

**What it does**

- Decrypt AES Encrypted traffic on proxy tab
- Decrypt AES Encrypted traffic on proxy, scanner, repeater and intruder

**How it works**

- Require AES Encryption Key (Can be obtained by reversing mobile app)
- Require AES Encryption Initialize Vector (Can be obtained by reversing mobile app)
- Request Parameter (Leave blank in case of whole request body)
- Response Parameter (Leave blank in case of whole response body)
- Character Separated with space for obfuscation on request/response
- URL/Host of target to filter request and response

**How to Install**

```
Download jar file from Release and add in burpsuite
```

 

![AES-Killer_5](/public/images/AES-Killer_5.gif)

<!-- Local image stored at public/assets/stars.png -->

**Original Request/Response**

![AES-Killer_6](/public/images/AES-Killer_6-1.png)

**Decrypted Request/Response**

![AES-Killer_7.png)](/public/images/AES-Killer_7-1.png)
