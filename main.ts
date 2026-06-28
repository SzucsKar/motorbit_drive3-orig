function turnLeft() {
    motorbit.MotorStopAll()
    showStatus("turn left", 1, 0, true)
    flashLight(Offset.TWO, RgbColors.Yellow, 4)
    motorbit.MotorRunDual(motorbit.Motors.M3, 0, motorbit.Motors.M4, 50)
    motorbit.MotorRunDual(motorbit.Motors.M1, 50, motorbit.Motors.M2, 50)
    showStatus("", 1, 0, false)
}

function driveReverse() {
    showStatus("REVERSE", 3, 0, true)
    for (let index = 0; index < 4; index++) {
        setAllBoardLights(RgbColors.Yellow)
        playBeep()
        motorbit.close_all_the_on_board_lights()
    }
    motorbit.MotorRunDual(motorbit.Motors.M3, 40, motorbit.Motors.M4, -40)
    motorbit.MotorRunDual(motorbit.Motors.M1, -40, motorbit.Motors.M2, 40)
    showStatus("", 1, 0, false)
}

function showStartupAnimation() {
    basic.showIcon(IconNames.SmallSquare)
    basic.pause(100)
    basic.showIcon(IconNames.Square)
    basic.pause(100)
    basic.clearScreen()
}

function showStatus(text: string, row: number, col: number, backlightOn: boolean) {
    I2C_LCD1602.clear()
    if (backlightOn) {
        I2C_LCD1602.BacklightOn()
    } else {
        I2C_LCD1602.BacklightOff()
    }
    
    I2C_LCD1602.ShowString(text, row, col)
}

EM_IR.OnPressEvent(function on_press_event(message: number) {
    showStatus(convertToText(message), 1, 1, true)
    if (message == 69) {
        basic.showString("A")
    } else if (message == 70) {
        basic.showString("B")
    } else if (message == 71) {
        basic.showString("C")
    } else if (message == 68) {
        basic.showString("D")
    } else if (message == 64) {
        basic.showString("UP")
    } else if (message == 67) {
        basic.showString("+")
    } else if (message == 7) {
        basic.showString("LEFT")
    } else if (message == 21) {
        basic.showString("OK")
    } else if (message == 9) {
        basic.showString("RIGHT")
    } else if (message == 22) {
        basic.showString("0")
    } else if (message == 25) {
        basic.showString("DOWN")
    } else if (message == 13) {
        basic.showString("-")
    } else if (message == 12) {
        basic.showString("1")
    } else if (message == 24) {
        basic.showString("2")
    } else if (message == 94) {
        basic.showString("3")
    } else if (message == 8) {
        basic.showString("4")
    } else if (message == 28) {
        basic.showString("5")
    } else if (message == 90) {
        basic.showString("6")
    } else if (message == 66) {
        basic.showString("7")
    } else if (message == 82) {
        basic.showString("8")
    } else if (message == 74) {
        basic.showString("9")
    }
    
})
function turnRight() {
    motorbit.MotorStopAll()
    showStatus("turn right", 1, 0, true)
    flashLight(Offset.THREE, RgbColors.Yellow, 4)
    motorbit.MotorRunDual(motorbit.Motors.M3, -50, motorbit.Motors.M4, 0)
    motorbit.MotorRunDual(motorbit.Motors.M1, -50, motorbit.Motors.M2, -50)
    showStatus("", 1, 0, false)
}

function updateServoPosition() {
    
    if (degree < 0) {
        degree = 0
    } else if (degree > 180) {
        degree = 180
    }
    
    motorbit.Servo(motorbit.Servos.S1, degree)
}

function stopRobot() {
    motorbit.MotorStopAll()
    playBeep()
    setAllBoardLights(RgbColors.Red)
    showStatus("Motor Stop", 2, 2, true)
}

function driveForward() {
    motorbit.MotorRunDual(motorbit.Motors.M3, -40, motorbit.Motors.M4, 40)
    motorbit.MotorRunDual(motorbit.Motors.M1, 40, motorbit.Motors.M2, -40)
    motorbit.Setting_the_on_board_lights(Offset.TWO, RgbColors.White)
    motorbit.Setting_the_on_board_lights(Offset.THREE, RgbColors.White)
    motorbit.Setting_the_on_board_lights(Offset.ONE, RgbColors.Red)
    motorbit.Setting_the_on_board_lights(Offset.FOUR, RgbColors.Red)
    showStatus("", 1, 0, false)
}

radio.onReceivedValue(function on_received_value(name: string, value: number) {
    
    if (name == "drive") {
        if (value == 8) {
            driveForward()
        } else if (value == 4) {
            turnLeft()
        } else if (value == 6) {
            turnRight()
        } else if (value == 5) {
            stopRobot()
        } else if (value == 2) {
            driveReverse()
        }
        
    } else if (name == "servo") {
        if (value == 5) {
            degree = 90
        } else if (value == 4) {
            degree += 10
        } else if (value == 6) {
            degree += -10
        }
        
        updateServoPosition()
    }
    
})
function playBeep() {
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
}

let degree = 0
function setAllBoardLights(color: number) {
    motorbit.Setting_the_on_board_lights(Offset.ONE, color)
    motorbit.Setting_the_on_board_lights(Offset.TWO, color)
    motorbit.Setting_the_on_board_lights(Offset.THREE, color)
    motorbit.Setting_the_on_board_lights(Offset.FOUR, color)
}

function flashLight(offset: number, color2: number, count: number) {
    for (let index2 = 0; index2 < count; index2++) {
        motorbit.Setting_the_on_board_lights(offset, color2)
        playBeep()
        basic.pause(500)
        motorbit.close_the_on_board_lights(offset)
        basic.pause(500)
    }
}

showStartupAnimation()
radio.setGroup(2)
degree = 90
EM_IR.IrRemote_init(IrPins.P5)
motorbit.Servo(motorbit.Servos.S1, degree)
I2C_LCD1602.LcdInit(39)
basic.pause(100)
showStatus("Have a good day", 1, 1, true)
basic.pause(500)
showStatus("", 1, 0, false)
basic.forever(function on_forever() {
    if (pins.digitalReadPin(DigitalPin.P12) == 1 && pins.digitalReadPin(DigitalPin.P13) == 1) {
        stopRobot()
        basic.showLeds(`
            # # # # #
            . . . . .
            . . . . .
            . . . . .
            # # # # #
            `)
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    } else if (pins.digitalReadPin(DigitalPin.P13) == 1) {
        basic.showLeds(`
            # # # # #
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    } else if (pins.digitalReadPin(DigitalPin.P12) == 1) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            # # # # #
            `)
    } else {
        basic.clearScreen()
    }
    
})
