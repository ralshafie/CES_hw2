# CES_hw2

The goal of this project was to create an interactive device with the given ESP32, button (momentary switch), potentiometer, and joystick. My project specifically allows these hardware pieces to control a memory card game, where the player tries to match the cards with pictures of me in pairs by flipping them. 

This interactive devices was extremely multi-faceted in that it involved the development of multiple programs. Code was required in the Arduino IDE in order to interact with HTML elements. These elements were in turn linked to the Arduino code through the JavaScript, and styled through CSS. In this section, it is assumed the user now knows how to run the program. We will begin with explaining the Arduino code, and then illustrate how it connects to the HTML, CSS, and Javascript. 

## Arduino

There are about 3 main sections to the Arduino code for this device:

- The first section is dedicated to defining global variables, shortcuts, and invoking certain libraries
    - Include the ArduinoJson library to allow us to to convert data to JSON objects.
    - declare the pin numbers for each device to its corresponding pin on the ESP32. These can be declared as  `const` because these pin numbers won’t change once connected.
- `void setup(void)`
    - Initializes the program and sets the BAUD Rate
    - initialize the pushbutton pin as an input:
- `void loop()`
    - This is the main body of the code.
        - It first creates an empty JSON Dictionary object with a set buffer size
        - We analogRead the Joystick and potentiometer positional data, and digitalRead the button data.
            - analogRead produces a continuous data flow, while digitalRead will produce a 1 or 0 binary data.
        - we add each value to the JSON object dictionary that we created earlier with its corresponding key name.
        - For the joystick values, because there is more than one value, we add the values to an array and then add the array to the JSON dictionary.
        - Finally, we send this dictionary to a Javascript program using the function `serializeJson(JSONencoder,Serial)`

## HTML, CSS, JavaScript

For the  receiving side of the device, I used HTML, CSS, and JavaScript. 

- The HTML and CSS were used in creating the card elements, and the buttons, and being able to add attributes and classes that will distinguish the different states of the card throughout the game.
    - The HTML organized the cards in columns and rows, and had each card enclosed in a `<section>`and `<div>`
- The Javascript received the serialized data from the Arduino code and mapped it manually to the positions of the HTML elements and create the different functions that allowed you to flip the cards, for example.
    - A bulk of the JavaScript assigns event listeners to the buttons and cards to give them the power to flip when being clicked on
    - Afterwards, there are two functions that deal with the ESP32. The first establishes a connection between the program and the ESP32 itself. The second reads in the JSON data from the Arduino code and calls functions on the positional and digital data being collected. The button clicks on a card, the joystick navigates between the cards, and the potentiometer controls the background color.
    - Following this, I manually create a sort of grid to map the coordinates of the positional arguments of the joystick and link them with positional arguments of the grid by defining ranges for these values to match each of the cardinal directions.

## Electrical Aspect
I soldered the wires of the button, joystick, and potentiometer to the different pins of the ESP32. They are as follows: 

- Button
    - Connect one wire to ground and the other to pin 26
- Potentiometer (pin
    - Connect pin 1 of potentiometer to bottom left 3V
    - Connect pin 2 of potentiometer to pin 12 of ESP32
    - Connect pin 3 of potentiometer to ground at top left of ESP32
- Joystick
    - Joystick GND -> bottom left ground on the TTGO
    - Joystick 5V -> top right 3V
    - Joystick VRy -> TTGO 13
    - Joystick VRx -> TTGO 25
    - Joystick SW  -> TTGO 15


#Final Product


<img width="306" alt="Screen Shot 2022-03-10 at 2 17 13 AM" src="https://user-images.githubusercontent.com/67122420/157608892-28c15215-98b3-4f0d-9c3e-a49e842de11e.png">



