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