# **Node Bot** # [![Collaborizm](https://www.collaborizm.com/GitHubBadge.svg)](https://www.collaborizm.com/project/r1dE09adg)
Raspberry Pi on wheels, powered by Node.js.

![Node Bot](/images/Node_Bot.jpg "Node Bot")

## Hardware Setup ##
### Raspberry Pi ###
![Raspberry Pi 2 Pin Layout](/images/Raspberry_Pi_2_Pinout.jpg "RPi Pin Layout")  

| RPi Pin        | Connects to                              |
|----------------|------------------------------------------|
| 4 (5V)         | Relay VCC (Headlight)                    |
| 6 (GND)        | Relay GND (Headlight)                    |
| 7 (GPIO4)      | L298N D2 (Left Motors Forward)           |
| 8 (GPIO14)     | Relay SIGNAL (Headlight)                 |
| 9 (GND)        | L298N GND (0V) (Input)                   |
| 11 (GPIO17)    | L298N D1 (Left Motors Reverse)           |
| 13 (GPIO27)    | L298N D4 (Right Motors Forward)          |
| 15 (GPIO22)    | L298N D3 (Right Motors Reverse)          |

&nbsp;

### L298N Motor Driver ###
![L298N](/images/L298N.jpg "L298N")  
The L298N motor driver module is screwed to the undercarriage of the bot.
Each pair of motors is connected in parallel to one output of the L298N.

| L298N Pin              | Connects to                      |
|------------------------|----------------------------------|
| 12V (Battery)          | SLA Battery +12V                 |
| 0V (GND) (Battery)     | SLA Battery GND                  |
| M1+, M1-               | Left Hand Side Motors            |
| M2+, M2-               | Right Hand Side Motors           |
| 5V (Output)            | 5V output for camera servos      |

&nbsp;

### Getting the motor directions right! ###
Required: Arduino with 5V output.  
For best results, connect the wheels to the motors.

#### Steps ####
1. Connect the SLA battery to the motor driver.
2. Connect the motor driver input GND to the Arduino's GND.
3. Connect Left-Hand side motors in parallel to M1+ and M1-.
4. Connect Right-Hand side motors in parallel to M2+ and M2-.
5. Connect D1 to the Arduino's 5V and check if both the Left-Hand side motors are rotating reverse.
6. If not, flip the wires of one Left-Hand side motor in M1+ and M1-.
7. Similarly, do the same with the Right-Hand side motors with D3.
8. Finally, check if both side's motors spin reverse when D1 and D3 are connected to 5V.
