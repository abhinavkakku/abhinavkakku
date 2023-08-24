---
title: BrainFuck Writeup w/o Metasploit
date: 2021-08-21
author: Abhinav Kumar
image: {
  src: "/images/bash.jpeg",
  alt: "Bash for Hackers",
}
description: Bash for hackers is about essentials of Bash that people in security should know, a Bash crash course for hackers.
draft: true
category: Hacking 101
---

### Initial Nmap Scan

```bash
                                                                               
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ sudo nmap -p- -sC -sV -A -O -T5 brainfuck -Pn    
Starting Nmap 7.94 ( https://nmap.org ) at 2023-08-21 09:11 IST
Nmap scan report for brainfuck (10.10.10.17)
Host is up (0.16s latency).
Not shown: 65530 filtered tcp ports (no-response)
PORT    STATE SERVICE  VERSION
22/tcp  open  ssh      OpenSSH 7.2p2 Ubuntu 4ubuntu2.1 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 94:d0:b3:34:e9:a5:37:c5:ac:b9:80:df:2a:54:a5:f0 (RSA)
|   256 6b:d5:dc:15:3a:66:7a:f4:19:91:5d:73:85:b2:4c:b2 (ECDSA)
|_  256 23:f5:a3:33:33:9d:76:d5:f2:ea:69:71:e3:4e:8e:02 (ED25519)
25/tcp  open  smtp     Postfix smtpd
|_smtp-commands: brainfuck, PIPELINING, SIZE 10240000, VRFY, ETRN, STARTTLS, ENHANCEDSTATUSCODES, 8BITMIME, DSN
110/tcp open  pop3     Dovecot pop3d
|_pop3-capabilities: AUTH-RESP-CODE CAPA SASL(PLAIN) UIDL PIPELINING USER TOP RESP-CODES
143/tcp open  imap     Dovecot imapd
|_imap-capabilities: more AUTH=PLAINA0001 IDLE post-login Pre-login SASL-IR ID listed ENABLE IMAP4rev1 LITERAL+ capabilities have LOGIN-REFERRALS OK
443/tcp open  ssl/http nginx 1.10.0 (Ubuntu)
| ssl-cert: Subject: commonName=brainfuck.htb/organizationName=Brainfuck Ltd./stateOrProvinceName=Attica/countryName=GR
| Subject Alternative Name: DNS:www.brainfuck.htb, DNS:sup3rs3cr3t.brainfuck.htb
| Not valid before: 2017-04-13T11:19:29
|_Not valid after:  2027-04-11T11:19:29
|_http-title: Welcome to nginx!
|_ssl-date: TLS randomness does not represent time
| tls-alpn: 
|_  http/1.1
| tls-nextprotoneg: 
|_  http/1.1
|_http-server-header: nginx/1.10.0 (Ubuntu)
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Device type: general purpose|specialized|phone|storage-misc
Running (JUST GUESSING): Linux 3.X|4.X|5.X (90%), Crestron 2-Series (86%), Google Android 4.X (86%), HP embedded (85%)
OS CPE: cpe:/o:linux:linux_kernel:3 cpe:/o:linux:linux_kernel:4 cpe:/o:crestron:2_series cpe:/o:google:android:4.0 cpe:/o:linux:linux_kernel:5.0 cpe:/h:hp:p2000_g3
Aggressive OS guesses: Linux 3.10 - 4.11 (90%), Linux 3.13 (90%), Linux 3.13 or 4.2 (90%), Linux 3.16 (90%), Linux 3.16 - 4.6 (90%), Linux 3.2 - 4.9 (90%), Linux 4.2 (90%), Linux 4.4 (90%), Linux 4.8 (90%), Linux 4.9 (89%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 2 hops
Service Info: Host:  brainfuck; OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE (using port 22/tcp)
HOP RTT       ADDRESS
1   162.55 ms 10.10.14.1
2   162.48 ms brainfuck (10.10.10.17)

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 218.45 seconds
                                                                                
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ 
```