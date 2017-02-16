# **Node Bot** [![Collaborizm](https://www.collaborizm.com/GitHubBadge.svg)](https://www.collaborizm.com/project/r1dE09adg)
Raspberry Pi on wheels, powered by Node.js.

![Node Bot](/images/Node_Bot.jpg "Node Bot")

## Hardware Setup
### Raspberry Pi
![Raspberry Pi 2 Pin Layout](/images/Raspberry_Pi_2_Pinout.jpg "RPi Pin Layout")  

| RPi Pin        | Connects to                              |
|----------------|------------------------------------------|
| 4 (5V)         | Relay VCC (Headlight)                    |
| 6 (GND)        | Relay GND (Headlight)                    |
| 7 (GPIO4)      | L298N D2 (Left Motors Forward)           |
| 8 (GPIO14)     | Relay SIGNAL (Headlight)                 |
| 9 (GND)        | L298N GND (0V)                           |
| 11 (GPIO17)    | L298N D1 (Left Motors Reverse)           |
| 13 (GPIO27)    | L298N D4 (Right Motors Forward)          |
| 15 (GPIO22)    | L298N D3 (Right Motors Reverse)          |

*You may have to play with the motor driver input pins (D1-D4) to get the directions right.*  
If the directions are reversed for a particular pair of motors, swap the pins within the pair, i.e., swap **D1** with **D2** or **D3** with **D4** and not in any other combination(s).  

### L298N Motor Driver
![L298N](/images/L298N.jpg "L298N")  
The L298N motor driver module is screwed to the undercarriage of the bot.

| L298N Pin      | Connects to                      |
|----------------|----------------------------------|
| 12V            | SLA Battery +12V                 |
| 0V (GND)       | SLA Battery GND                  |
| M1+, M1-       | Left Hand Side Motors            |
| M2+, M2-       | Right Hand Side Motors           |
| 5V             | 5V output for camera servos      |

Each pair of motors is connected in parallel to one output of the L298N.

You might want to connect each side's pair of motors to a battery and get both the motors of the pair to turn in the same direction before you wire them up to the L298N output.
