---
title: DVWA Brute Force Low Security - Burp Suite
date: 2019-06-26
category: WebAppSec
image: {
  src: "/images/DVWA-Brute-Force-Burp-Suite-Tutorial-9.png",
  alt: "DVWA Brute Force Attack",
}
author: Abhinav Kumar
description: DVWA Brute Force Tutorial. Brute Force Technique is basically trying a set of username password combinations
---

DVWA Brute Force Tutorial : Brute Force Technique is basically trying a set of username password combinations, you can say it s a guess work, but let the machines do the guessing and we will use machines power to crack through the logins.

### Prerequisite - you only need a vitim website but...

  
We have in past covered two very related Topics,  
How to make your OWN Penetration Testing Lab - ( I will cover other options very soon) [https://ethicalhackx.com/how-to-host-dvwa-pentest-lab-on-wamp-server/](https://ethicalhackx.com/how-to-host-dvwa-pentest-lab-on-wamp-server/)  
  
How to make a Good Password List using CRUNCH which can be used for Brute Force  
How to Configure Burp Suite - [https://ethicalhackx.com/crunch-generate-password-word-list-brute-force/](https://ethicalhackx.com/crunch-generate-password-word-list-brute-force/)  
  
This article might be a bit lengthy but let me assure you, just because I have explained a bit, more, else the whole process is hardly even 1 minute thing.  
NOTE: all the tools packages used here are available for both Windows and Linux, you can perform exact operations on which ever you like, but it s suggested do these on a LAB setup of your own. Want to setup you Pentesting LAB ? We are here to help.

## Steps to Brute Force DVWA Low Security

These Steps are applicable to Low Security Settings of DVWA, we will soon cover the other settings that is Medium and High Security. One strange thing in DVWA is, to Brute Force you already need to have login, and Go to Brute Force tab.

If you are familiar with first few steps, starting burp and rest, you can skip first few steps and scroll below.

Start your Virtual Machine , I have chosen OWASP VM here, you can either select locally installed DVWA - [https://ethicalhackx.com/how-to-host-dvwa-pentest-lab-on-wamp-server/](https://ethicalhackx.com/how-to-host-dvwa-pentest-lab-on-wamp-server/)  
Okay , we can access DVWA in browser by localhost/dvwa or from a Pentesting Lab VM setup. See screenshots Below.

![OWASP BWA Pentesting LAB MV](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-2.png)

OWASP BWA Pentesting LAB VM

Login to DVWA and check if the security settings are set to low, this is the last step, next we are cracking it. The default login username: password in DVWA is admin:admin

![OWASP LAB](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-3.png)

OWASP LAB

When attacking with Burp Suite always remember to add URL to target scope and only intercept the URLs which are in Target Scope else you get annoying popups in Burp. We will cover Basics of Burp Suite in another URL very very soon.  
NOTE: I have skipped requests forwarding in Burp Screenshots here, after clicking anything in browser check if the request has been held with Interceptor in Burp, forward it.

![Basic Burp Suite Interceptor](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-4.png)

Basic Burp Suite Interceptor - Click Forward to move ahead with intercepting request

![DVWA First Screen to login, admin admin are default username password](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-5.png)

DVWA First Screen to login, admin admin are default username password

![DVWA Home Screen after login](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-7.png)

DVWA Home Screen after login, Check Security Settings are Low and proceed.

![DVWA Low Security](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-8.png)

DVWA Low Security

Click on Brute Force Tab in left pane, Forward any intercept request in Burp .

![DVWA Brute Force Page](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-9.png)

DVWA Brute Force Page , we have to try multiple username password to get the right one.

In username password box type any combination like username1 password is password 1 and click login. In Burp suite , Now click on Actions and Forward to Intruder, which will forward this request to Intruder in Burp Suite, again in proxy tab, you can forward this intercept to receive the response that your username password was wrong.

![Burp Suite, Forward to Intruder](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-11.png)

Burp Suite, Forward to Intruder to brute force form fields.

So finally we are on the page where we bombard/hit with all the password combinations.  
Things we need to know before hand. How do we know if the login username password Combination is correct ? or **How do we know if the username password combination is wrong ?  
We decide it with some response like : Login successful, welcome to admin area...**

![](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-13.png)

Try any username password combination to get the error message , which will be used in further steps as flag for wrong or right password

In Burp Suite Intruder Tab, we see 4 sub tabs : Target, Position, Payload , Options.  
Target is already set, We change Few things in Positon tab,

![Burp Suite Intruder](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-14.png)

Burp Suite Intruder

In positions tab, clear all position and select to add username and password fields manually. Rest are not required for now. We also see Attack Type Option here, you can select cluster bomb, sniper.., We use cluster Bomb , where we will have different set of username and password list, in Sniper a single list servers as both username and password list.  
Sniper will test each words as user name and password, Cluster bomb method will have two lists, each of username and password separate.  
Read more about different attach Type from Burp on their website : [https://portswigger.net/burp/documentation/desktop/tools/intruder/positions](https://portswigger.net/burp/documentation/desktop/tools/intruder/positions)

![](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-15.png)

Now move to Payloads tab, we have to set few things here, Payload Set 1 and 2. payload 1 is username list so we write in few usernames, this can also be loaded from any file.

![Burp Suite configuring payloads](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-17.png)

Burp Suite configuring payloads

Now select payload 2 and give in few passwords or again load password list form any file.

![Burp Suite Setting payloads](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-18.png)

Burp Suite Setting payloads

Now last option that is named Options Tab, go to options tab. Scroll to Grep Match Section.  
Clear all to remove previous entries. This will help analyze the response for each requrest. We are already aware what is response on failed and successful login, if the username password combination works the response page will have some where in it : Welcome to the password protected area admin . So enter the same in this GREP Match box

![Burp Suite Intruder setting the Flag Options](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-19.png)

Burp Suite Intruder setting the Flag Options

Thats all, Click the Start Attack on top.

#### Attack...... Brute Force...

![Burp Suite , Intruder Brute Force Attack](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-20.png)

Burp Suite , Intruder Brute Force Attack

We see the progress windows where different usernames and password combinations are being tried, We have a column for the text we specified "Welcome to the password protected area admin" , which will have a tick when the username password combo was right, and you can see it where payload1 was admin and payload2 was also admin, So that is our username and password.

![Burp Suite Brute Force Attack Progress](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-21.png)

Burp Suite Brute Force Attack Progress

![Burp Suite Brute Force Completed, Result Flagged](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-22.png)

Burp Suite Brute Force Completed, Result Flagged

So we got the correct username and password that is admin:admin . you can click on each request in attack window to see the request that was sent and the response received. That's all, we finally got the password. But there are few more points to be noted, read till end.

This can also be other way round where you specify what is the response when you give wrong username and password, and flag that response, just the reverse of other case, where the flag is missing is your username and password, See the below image for such example.

![Set the response what you get on username and password, flag the result, so that all wrong username passwords get flagged](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-23.png)

Set the response what you get on username and password, flag the result, so that all wrong username passwords get flagged

![All wrong username passwords flagged, and you can find the right username password by checking the flags.](/images/DVWA-Brute-Force-Burp-Suite-Tutorial-24.png)

All wrong username passwords flagged, and you can find the right username password by checking the flags.

This guide is written long because of explanations, but it is really a 2 minute thing once you know what to do. Next we will cover the medium and High Security settings in very brief in very precise and short post.
