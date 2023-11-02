---
title: Things to do After installing Kali Linux
date: 2023-09-25
author: Abhinav Kumar
image: {
  src: "/images/bash.jpeg",
  alt: "Linux Commands for Everyday Hacking and Security",
}
description: Linux commands and shortcuts very often used by Hackers, Security professionals, CTF Players.
draft: true
category: Hacking 101
---

Update and Upgrade

```bash
sudo apt-get update && sudo apt-get upgrade -y
```

Change Hostname
```bash
sudo hostnamectl set-hostname "ETHICALHACKX"
```

Change Default Repository

```bash
echo "deb http://http.kali.org/kali kali-rolling main contrib non-free non-free-firmware" | sudo tee /etc/apt/sources.list```

```bash
echo "deb-src http://http.kali.org/kali kali-rolling main contrib non-free non-free-firmware" | sudo tee -a /etc/apt/sources.list
```


Alias for common tasks
```bash
alias ins="sudo apt install -y"
alias rem="sudo apt purge -y"
alias ls='ls --color=always'
alias grep="grep --color=auto"
```

Functions in zshrc
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

Essential Tweaks

```bash
#!/usr/bin/bash
echo "Removing boilerplate home directories!"
mv $HOME/Downloads/* $HOME
sudo rm -rf $HOME/{.vim,Downloads,Pictures,Documents,Music,Videos}

#Updating sources with fast mirrors
echo "deb https://mirrors.ocf.berkeley.edu/kali kali-rolling main contrib non-free" | sudo tee -a /etc/apt/sources.list
echo "deb-src https://mirrors.ocf.berkeley.edu/kali kali-rolling main contrib non-free" | sudo tee -a /etc/apt/sources.list

sudo apt update -y
sudo apt install -y kali-archive-keyring git stow python3 neovim curl python3 zsh tmux texlive-latex-recommended texlive-fonts-extra texlive-latex-extra pandoc evince

wget https://bootstrap.pypa.io/get-pip.py -O get-pip.py && sudo python3 get-pip.py
python3 -m pip install --upgrade pip

mkdir -p $HOME/ctf
touch $HOME/ctf/target

mkdir -p $HOME/ctf/{htb,thm}
```

Update and Upgrade
sudo apt update
sudo apt upgrade
sudo apt dist-upgrade

Install Additional reposiroties
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"

sudo apt install software-properties-common


Install Archive Managers

sudo apt-get install unrar unace rar unrar p7zip zip unzip p7zip-full p7zip-rar file-roller -y

Obtain the latest or current Kali GPG keys

$ wget -q -O - https://www.kali.org/archive-key.asc | gpg --import
# or…

$ gpg --keyserver hkp://keys.gnupg.net --recv-key 7D8D0BF6

Install Guest Additions to Enable Fullscreen, Clipboard sharing & Drag n Drop
to be added

Change your SSH Keys & default Password
cd /etc/ssh
mkdir original_ssh_keys
mv ssh_host_* original_ssh_keys/
dpkg-reconfigure openssh-server

Install Java:

to be added


Install Screen Recorder
apt-get install recordmydesktop


Setup Wine to use WIndwos apps
to be added

Install Terminator.
sudo apt-get install terminator

Install Code Editor
Visual Studio Code (VS Code):
sudo apt install code
Sublime Text:
sudo apt install sublime-text
Atom:
sudo apt install atom



Install VLC: 
sudo apt install vlc

Install Aptitude, Gdebi and Synaptic
sudo apt-get install aptitude gdebi synaptic

Configure Google DNS / OpenDNS Servers
By using Google or OpenDNS can make your internet a bit more smooth.
The Google DNS addresses are – “8.8.8.8 and 8.8.4.4“
The OpenDNS addresses are – “208.67.222.222 and 208.67.220.220“

Install Chromium
sudo apt-get install chromium


Disable your Lock Screen
Go to the Settings > now goto Power Manager > click on the Display tab and disable the blue button.


 sudo apt install open-vm-tools -y


 Install VLC Media Player
 sudo apt install vlc
 sudo sed -i s/geteuid/getppid/g /usr/bin/vlc


Explore different desktop environments
sudo apt install gnome-core
sudo apt install <desktop-environment>


Enable autologin for a seamless login experience

sudo nano /etc/lightdm/lightdm.conf
Within the file, find the [SeatDefaults or Seat*] section and add the following lines:

autologin-user=<your-username>

autologin-user-timeout=0



Resolve the “Device Not Managed” error
You need to modify the Network Manager configuration file to resolve this issue. Launch the configuration file in a text editor:

sudo nano /etc/NetworkManager/NetworkManager.conf
Within the file, add the following lines under the [device] section:

wifi.scan-rand-mac-address=no

Save the file and terminate the text editor session. Then, restart the Network Manager service to apply the changes:

sudo service network-manager restart

Adding new user
adduser abhinav

Sudo privilleges for new user

sudo -aG sudo abhinav

granting login shell
chsh -s /bin/bash abhinav


tilix Terminal Multiplexer
sudo apt install tilix guake konsole -y
