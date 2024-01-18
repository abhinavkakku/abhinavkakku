---
title: My Kali Linux Setup {things I do after install}
date: 2024-01-16
author: Abhinav Kumar
image: {
  src: "/images/my_kali_linux_setup.png",
  alt: "My Kali Linux Setup",
}
description: My Kali Linux Setup, things that I do / modify after installing Kali Linux.
draft: False
category: Hacking 101
---

My Kali Linux Setup, things that I configure or modify or install everytime I am setting up my machine.
This is not a must do list, this is just me who does these.

## Update and Upgrade

```bash
sudo apt-get update && sudo apt-get upgrade -y
```

## Change Hostname
If you have downloaded VM/VBox Image and want to rename the hostname to something specific {EthicalHackX}  like me.
```bash
sudo hostnamectl set-hostname "ETHICALHACKX"
```

## Change Default Repository
I must admit Kali Linux Repositories have improved alot over the years with mirrors and default CDNs. AT some environments we can observe the default repository to be blocked, in organisations specally, how to escape, how to get more speed from a nearby mirror, change the default repository config, use a different mirror.

```bash
echo "deb http://http.kali.org/kali kali-rolling main contrib non-free non-free-firmware" | sudo tee /etc/apt/sources.list
```

I prefer to enable the deb-src mirror too.

```bash
echo "deb-src http://http.kali.org/kali kali-rolling main contrib non-free non-free-firmware" | sudo tee -a /etc/apt/sources.list
```

## Setup some alias (command-shortcuts) for your terminal.

Alias for common tasks
```bash
alias ins="sudo apt install -y"
alias rem="sudo apt purge -y"
alias ls='ls --color=always'
alias grep="grep --color=auto"
```

We can also add some functions in bashrc or zshrc files like below.
Functions in .zshrc / .bashrc , these files are located in user folder , type cd ~/.zshrc to access or edit.

```bash
updater() {
  sudo apt update -y 2> /dev/null;
  sudo apt --fix-broken install -y 2> /dev/null;
  sudo apt upgrade -y 2> /dev/null;
  sudo apt dist-upgrade -y 2> /dev/null;
  sudo apt autoremove -y 2> /dev/null;
  sudo apt autoclean -y 2> /dev/null;
  sudo apt clean -y 2> /dev/null;
}
```

## Essential Tweaks

### Remove Boilerplate home directories
```bash
#!/usr/bin/bash
echo "Removing boilerplate home directories!"
mv $HOME/Downloads/* $HOME
#carefull , if you already have something in below directories, move it.
sudo rm -rf $HOME/{.vim,Downloads,Pictures,Documents,Music,Videos}
```

### Updating sources with fast mirrors

```bash
echo "deb https://mirrors.ocf.berkeley.edu/kali kali-rolling main contrib non-free" | sudo tee -a /etc/apt/sources.list
echo "deb-src https://mirrors.ocf.berkeley.edu/kali kali-rolling main contrib non-free" | sudo tee -a /etc/apt/sources.list

# Update the Repository after changing mirror
sudo apt update -y
```


## CTF Setup !!

### Create Diretory for CTF / Attacks
```bash
mkdir -p $HOME/ctf
touch $HOME/ctf/target

mkdir -p $HOME/ctf/{htb,thm}
```

### Essential Packages to Install

```bash
sudo apt install -y kali-archive-keyring git stow python3 neovim curl python3 zsh tmux texlive-latex-recommended texlive-fonts-extra texlive-latex-extra pandoc evince

sudo apt install html2text

#python3-pip
wget https://bootstrap.pypa.io/get-pip.py -O get-pip.py && sudo python3 get-pip.py
python3 -m pip install --upgrade pip

```

### Install Additional repositories
to be edited
```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
```

```bash
sudo apt install software-properties-common
```

### Install Archive Managers

```bash
sudo apt-get install unrar unace rar unrar p7zip zip unzip p7zip-full p7zip-rar file-roller -y
```

### Obtain the latest or current Kali GPG keys
to  be verified if this is really required or can be ignored
```bash
wget -q -O - https://www.kali.org/archive-key.asc | gpg --import
# or…

gpg --keyserver hkp://keys.gnupg.net --recv-key 7D8D0BF6
```

### Install Guest Additions to Enable Fullscreen, Clipboard sharing & Drag n Drop
to be added
```bash
sudo apt install open-vm-tools -y
```

### Change your SSH Keys & default Password

```bash
cd /etc/ssh
mkdir original_ssh_keys
mv ssh_host_* original_ssh_keys/
dpkg-reconfigure openssh-server
```

### Install Java:
to be added


### Install Screen Recorder
I have been using Kali in VM like environemnt where I use OBS Studio on host instead of recorder in Kali
```bash
apt-get install recordmydesktop
```

### Setup Wine to use Windows apps
to be added

### Install Terminator.
```bash
sudo apt-get install terminator
```

### Tilix Terminal Multiplexer
only if you need.
```bash
sudo apt install tilix guake konsole -y
```

### Install Code Editor
Visual Studio Code (VS Code): ( I prefer over others)
```bash
sudo apt install code
```
Sublime Text:
```bash
sudo apt install sublime-text
```
Atom:
```bash
sudo apt install atom
```


### Install VLC: (because fun is must)
```bash
sudo apt install vlc
#if VLC does not runs as expected 
sudo sed -i s/geteuid/getppid/g /usr/bin/vlc```
### Install Aptitude, Gdebi and Synaptic
```bash
sudo apt-get install aptitude gdebi synaptic
```
### Configure Google DNS / OpenDNS Servers
to be edited
By using Google or OpenDNS can make your internet a bit more smooth.
The Google DNS addresses are – “8.8.8.8 and 8.8.4.4“
The OpenDNS addresses are – “208.67.222.222 and 208.67.220.220“

### Install Chromium
```bash
sudo apt-get install chromium
```

### Disable your Lock Screen
Go to the Settings > now goto Power Manager > click on the Display tab and disable the blue button.




### Install/Explore different desktop environments
```bash
sudo apt install kali-desktop-gnome
sudo apt install kali-desktop-{kde|xfce|gnome......}
```

### Enable autologin for a seamless login experience
I do this , many may find this as bad practice but.... 

```bash
sudo nano /etc/lightdm/lightdm.conf
```
Within the file, find the [SeatDefaults or Seat*] section and add the following lines:

```
autologin-user=<your-username>

autologin-user-timeout=0
```


### Resolve the “Device Not Managed” error
You need to modify the Network Manager configuration file to resolve this issue. Launch the configuration file in a text editor:

```bash sudo nano /etc/NetworkManager/NetworkManager.conf
```
Within the file, add the following lines under the [device] section:

```
wifi.scan-rand-mac-address=no
```
Save the file and terminate the text editor session. Then, restart the Network Manager service to apply the changes:

```bash
sudo service network-manager restart
```
### Adding new user
```bash
adduser abhinav
```

### Sudo privilleges for new user

```bash
sudo -aG sudo abhinav
```
### Granting login shell
```bash
chsh -s /bin/bash abhinav
```

