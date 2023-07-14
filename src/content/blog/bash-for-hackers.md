---
title: Bash for Hackers
date: 2021-03-05
author: Abhinav Kumar
image: {
  src: "/images/bash.jpeg",
  alt: "Bash for Hackers",
}
description: Bash for hackers is about essentials of Bash that people in security should know, a Bash crash course for hackers.
draft: false
category: Hacking 101
---

Bash Scripting, often termed as one of the essential skills when you want to become Hacker. Often the guides are comprehensive, I am outlining bare minimum skills or topics we should understand regarding bash.

This article like many other is a progressive one, that is will be updated with more related contents.  
This article was last updated on - **14 April 2k21.**

```bash
#!/bin/bashecho "Lets Learn Scripting"
```

While `#` in bash means rest of the line is commented out, `#!<path to shell/interpreter>` means which program will parse the script.  
Usually this is the first line of script directing which interpreter to use.

#### How to Execute script ?

To execute the script, it should have executable [**permission**](/blog/linux-file-permissions-chmod-part-1/) , now you can set file permission to execute to one or more users groups to let it execute.

```bash
chmod 755 myscript.sh
./myscript.sh
Lets Learn Scripting
```

The script can be called/executed from the current directory with `./script-name.sh` where `./` means its present in the current path, else the complete path has to be specified.

Various Shell Script interpreters

So in case you want the script to be processed by zsh ksh csh, specify respectively on the first line

```bash
#!/bin/zsh  
#!/bin/ksh  
#!/bin/csh
```
What happens when the shell/interpreter is not specified ? Script will execute using the current shell

#### Variables

VARIABLE_NAME="VALUE"

Also bash follows the usual naming convention like variable name should not begin with number, should not contain special symbols other than \_.

Conventionally Uppercase, case sensitive, and no space before or after the = sign.  
To use a variable precede with variable by a "$" sign, or "${VARIABLE}".  
The `{}` format is optional unless the variable is followed by something like below

```bash
#!/bin/bash
NAME="Hacker"
echo "Hello $NAME , hope you are Learning"
echo "Hello ${NAME} , hope you are Learning"

VERB="run"
echo "Hello Hacker what are you doing ?"
echo "Hey ! I am ${VERB}ing."
echo "Hey! I am $VERBing #//This is wrong as the variable name changed.
```

#### **Assign Command to Variable**

One might want to pass a command to variable name which executes and displays the result of command in place of variable.  
So below is how to do that, instead of value pass the command enclosed in brackets and precede by $ like "$(command)"

```bash
#!/bin/bash
LINUX_KERNEL=$(uname -r)  
echo "We are running Linux Kernel version - #{LINUX_KERNEL}
```

### Variable Expansion

The we can write statements in bash in two ways, one being older. Enclosed in `" "` and enclosed in `' '` .  
The difference is variables in `" "` will expand or will behave differently when it encounters `$ ' \` .  
The below example should make it clear. See the output differs when enclosed in `" "` and when enclosed in `' '` .

```bash
┌──(**abhinav㉿ETHICALHACKX**)-\[**~**\]
└─**$** user=$(whoami)
┌──(**abhinav㉿ETHICALHACKX**)-\[**~**\]
└─**$** host='EthicalHackX'
┌──(**abhinav㉿ETHICALHACKX**)-\[**~**\]
└─**$** echo "I am $user on machine - $host"
I am abhinav on machine - EthicalHackX
┌──(**abhinav㉿ETHICALHACKX**)-\[**~**\]
└─**$** echo 'I am $user on machine - $host'
I am $user on machine - $host
┌──(**abhinav㉿ETHICALHACKX**)-\[**~**\]
└─**$** 
```
#### Conditional Operators in Bash

What if you want to make the script test some conditions and decide the flow of script ? Yes you can do that and it is very simple.  
`[ condition to test ]`

\[ -e /etc/shadow \] -- This checks if the mentioned part /etc/passwd exists.

There are a number of File operator tests in bash  
\-d True if file  is a directory  
\-e True if file exists  
\-f True if file exists and is a regular file.  
\-r True if file exists and is readable.  
\-s True if file exists and has a size greater than zero.  
\-w True if file exists and is writable.  
\-x True if file exists and is executable.  
More comprehensively explained at - [https://www.gnu.org/software/bash/manual/html\_node/Bash-Conditional-Expressions.html](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html)

\-n STRING if string is not empty  
\-z STRING if string is empty  
STRING1 == STRING2 True is strings are equal  
STRING1 != STRING2 True if strings are not equal  
  
arg1 **OP** arg2 `OP` is one of ‘\-eq’, ‘\-ne’, ‘\-lt’, ‘\-le’, ‘\-gt’, or ‘\-ge’. - equal to, not equal to, less than, greater than or equa to...

#### Decision Making in Bash using IF

We also need to make the programs testing some conditions, `if [ condition ] then [ do this]`, let see.

```bash
if [ condition-is-true ]
then
 command1
 command2
fi
```

```bash
if [ condition-is-true ]
then
 command1
 command2
else
 command3
 command4
fi
```

First we test the if condition, if it evaluates to true, execute the commands specified in then, and end the block with reverse if - fi. If you want to test for condition not true, we can also have else part, which executes commands if the condition test evaluates not true. **NOTE :** else can be skipped if not true condition is not desired.

##### Multiple if else --> elif

```bash
if [ condition-is-true ]   #dont forget the space after if
then
 command1
elif [ condition-is-true]
then
 command2
else
command3
command4
fi
```

#### Loops in Bash

##### For loop

```bash
for variable_name in item1 in item_n
do
 command1
 command2
 commandN
done
```

```bash
#!/bin/bash
for food_name in burger pizza roll
 
do
 echo "I want to eat $food_name"
done
```

Instead of putting the items in for loop like above,we can assign the list to a variable.

```bash
#!/bin/bash
food="burger pizza roll"
for food_name in $food
 
do
 echo "I want to eat $food_name"
done
```

The loops or rather say the commands can be a one liner too like the example below.

```bash
┌──(**abhinav㉿ETHICALHACKX**)-\[**~/bash**\]
└─**$** foods="pizza burger noodles"
┌──(**abhinav㉿ETHICALHACKX**)-\[**~/bash**\]
└─**$** for food in $foods; do echo $food; done
pizza
burger
noodles
┌──(**abhinav㉿ETHICALHACKX**)-\[**~/bash**\]
└─**$** for food in pizza burger noodles; do echo $food; done
pizza
burger
noodles
┌──(**abhinav㉿ETHICALHACKX**)-\[**~/bash**\]
└─**$** 
```

#### Accepting Input in Bash (STDIN)

```bash
read -p "PROMPT" VARIABLE_NAME
```

NOTE : This(STDIN) can also come from output of other programs/piped commands.

```bash
#!/bin/bash
read -p "Hello hacker, what's ur name  ?" HACKER_NAME
echo " Hacker $HACKER_NAME is welcomed to Ethical Hacking Tutorials"
```

the -p switch is usual, want the input to be hidden ? Like a password, `-sp` (silent) will help.

```bash
┌──(**abhinav㉿ETHICALHACKX**)-\[**~/bash**\]
└─**$** read -sp "Enter the Password : " PasswordValue
Enter the Password :   
┌──(**abhinav㉿ETHICALHACKX**)-\[**~/bash**\]
└─**$** 
```

#### Case Statements

What if there are too many cases arising and writing if-else is not a good idea, or say like a list of items to chose from will decide the consecutive actions, case statements are at our rescue

```bash
case EXPRESSION in

  PATTERN_1)
      #//patterns here can have special characters
    STATEMENTS
    #// statements to execute if the pattern matches
    ;;

            #// ending a clause, another pattern can be added like the below
  PATTERN_2)
    STATEMENTS
    ;;

  PATTERN_N)
    STATEMENTS
    ;;

  *)
               #// default clause, when none of the patterns match
    STATEMENTS
    ;;
esac               #// ending the case statements , reverse of case - esac
```

```bash
#!/bin/bash

echo -n "Enter the name of a Programming Language: "
echo "" #// just a blank line
read PL
#read -p "Enter the name of a Programming Language: " PL

echo -n "$PL Programming Language was Developed by "

case $PL in

  FORTRAN)
    echo -n "John Backus"
    ;;

  JavaScript)
    echo -n "Brendan Eich"
    ;;

  Limbo | "Go")
    echo -n "Rob Pike"
    ;;

  C)
    echo -n "Dennis Ritchie"
    ;;

  *)
    echo -n "You Know Hack is a Language developed by Facebook"
    ;;
esac
```

### Positional Parameters

If you made a script to accept some input and wondering how to pass the values to parameters here we go.  
Parameters in bash are defined starting `$0 , $1, $2` and so on.  
`$0` is by default the script name/file passed to interpreter .

So if you want to execute script with parameters, the code and output are like below ( a very simple script).

```bash
#!/bin/sh
echo " This is paramenetr 0 -- $0 "
echo "This is parameter 1 given in bash -- $1 "
echo "This is parameter 2 given in bash -- $2 "
```

```bash
┌──(**kali㉿ETHICALHACKX**)-\[**~**\]
└─**$** chmod 755 ./bash/parameters.sh                                        126 **⨯**
                                                                                
┌──(**kali㉿ETHICALHACKX**)-\[**~**\]
└─**$** ./bash/parameters.sh EthicalhackX Abhinav
 This is paramenetr 0 -- ./bash/parameters.sh 
This is parameter 1 given in bash -- EthicalhackX 
This is parameter 2 given in bash -- Abhinav 
```

We want to pass more parameters , say multiple parameters to same place ( we will see examples further how and where we can use these things/concepts).  
Say you have to archive 10 users at once, or even remove users, expire user passwords and many more.

```bash
#!/bin/sh

echo " This is paramenetr 0 -- $0 "
echo "This is parameter 1 given in bash -- $1 "
for user in $@
do
 echo "I am -- $user "
done 
```

```bash
┌──(**kali㉿ETHICALHACKX**)-\[**~**\]
└─**$** ./bash/variables.sh EthicalhackX Abhinav Learning Hacking Bash
 This is paramenetr 0 -- ./bash/variables.sh 
This is parameter 1 given in bash -- EthicalhackX 
I am -- EthicalhackX 
I am -- Abhinav 
I am -- Learning 
I am -- Hacking 
I am -- Bash 
```
The below are more constant variables in bash, have it for ready reference.

- $#: number of command line parameters that were passed to the script.
- $@: All the parameters sent to the script.
- $?: The end status of the last process to execute.
- $$: The Process ID of the current script.
- $USER: The user executing the script.
- $HOSTNAME: The hostname of the machine executing the script.
- $SECONDS: The number of seconds the script has been running for.
- $RANDOM: Returns a random number.
- $LINENO: Returns the current line number of the script.

### Exit Status Codes

Every command executed returns an exit code ranging 0 to 255 where 0 is successfully executed, non 0 means otherwise.  
This can be used for error checking or executing other commands based on exit status. Documentation or man-page can help more on exit status.  
Below we can see when the `ls` command is successful , the status code is `0`, when otherwise, it is non 0. 
The status command of last executed process is returned by `$?` .

```bash
┌──(**abhinav㉿ETHICALHACKX**)-\[**~**\]
└─**$** ls /home/abhinav
**Desktop**  **Documents**  **Downloads**  **Music**  **Pictures**  **Public**  **Templates**  **Videos**
┌──(**abhinav㉿ETHICALHACKX**)-\[**~**\]
└─**$** ls /home/NON\_EXISTING\_DIR
ls: cannot access '/home/NON\_EXISTING\_DIR': No such file or directory
┌──(**abhinav㉿ETHICALHACKX**)-\[**~**\]
└─**$** echo $?
2
```
an example where we are using the exit status to execute commands cehcking exit status in conditional statements.

```bash
#!/bin/sh
HOST="google.comasdwr"   #just to throw an error, invalid domain being used
ping -c 1 $HOST
RETURN_CODE=$?
if [ "$RETURN_CODE" -ne "0" ]
then
 echo "$HOST unrechable."
fi
```

```bash
┌──(**abhinav㉿ETHICALHACKX**)-\[**~/bash**\]
└─**$** ./exit\_status\_1.sh 
ping: google.comasdwr: Name or service not known
google.comasdwr unrechable.
```

### && and || and the exit status relation

#### && =AND 
if there are two commands linked with `&&` like below, the second command only executes when the first command is successfully executed, in other words the exit status code returned from first command is `0` ( command executed successfully) , otherwise the second command won't execute.

```bash
┌──(**abhinav㉿ETHICALHACKX**)-\[**~/bash**\]
└─**$** ls -la && echo "Last command Executed with Exit Status $?"
total 12
drwxr-xr-x  2 abhinav abhinav 4096 Apr 13 23:55 **.**
drwxr-xr-x 15 abhinav abhinav 4096 Apr 13 23:49 **..**
-rwxr-xr-x  1 abhinav abhinav  129 Apr 13 23:55 **exit\_status\_1.sh**
Last command Executed with Exit Status 0
┌──(**abhinav㉿ETHICALHACKX**)-\[**~/bash**\]
└─**$** ls -RANDOM\_ERRORFULL\_ARGS && echo "Last command Executed with Exit Status $?"
ls: invalid option -- 'O'
Try 'ls --help' for more information.
```

#### || = or
if two or more commands are linked with or which is `||` , the second or consecutive commands will only execute if the first command returns non 0 exit status which means failed. if the first command executes successfully, the other part linked with `or - ||` would not execute.  
So these && and || can be used to check for conditions like execute the other command only when a set of tasks have succeeded or failed likewise.  
In the below example see how || or functions , when exit status code is - 0, the other command won't execute, when it is non-0, the other command will execute.

```bash
┌──(**abhinav㉿ETHICALHACKX**)-\[**~/bash**\]
└─**$** ls -la || echo "Last command Executed with Exit Status $?"
total 16
drwxr-xr-x  2 abhinav abhinav 4096 Apr 14 00:10 **.**
drwxr-xr-x 15 abhinav abhinav 4096 Apr 13 23:49 **..**
-rwxr-xr-x  1 abhinav abhinav  129 Apr 14 00:10 **exit2.sh**
-rwxr-xr-x  1 abhinav abhinav  129 Apr 13 23:55 **exit\_status\_1.sh**
┌──(**abhinav㉿ETHICALHACKX**)-\[**~/bash**\]
└─**$** ls -123qwe || echo "Last command Executed with Exit Status $?"
ls: invalid option -- '2'
Try 'ls --help' for more information.
Last command Executed with Exit Status 2
```

#### ; Seperator

When we encounter ; instead of && or || , this simply means all the commands separated by ; will execute. They can be thought of independent command and execution does not depends on previous commands exit status.

```bash
command1 ; command2 ; command3

can be written/or thought of as below
command1
command2
command3
```

#### Exit Command Defined Explicitly

How do we define the exit status code explicitly ?  
Mention exit {0,1,2,3....255} like exit 3 after a command. If no exit code is specified , the exit code of last command is considered.  
Also if no code is specified in whole script, agin the last exit code of command in whole script is taken.  
Always remember, whenever you mention exit code in shell script , on reaching there the execution of shell script stops. Say a part of your script at top had exit code mentioned, and when(if) the execution flow reaches there, that is going out of script completely and return exit status code will the the one what you defined. See the below example.

```bash
!/bin/bash
echo "Statement 1 : Learn Ethical Hacking"
exit 2
echo "Statement 2 : Belkome to Ethicalhackx
```

```bash
┌──(**abhinav㉿ETHICALHACKX**)-\[**~/bash**\]
└─**$** ./exit2.sh
Statement 1 : Learn Ethical Hacking
┌──(**abhinav㉿ETHICALHACKX**)-\[**~/bash**\]
└─**$** echo $?
2
┌──(**abhinav㉿ETHICALHACKX**)-\[**~/bash**\]
└─**$**
```