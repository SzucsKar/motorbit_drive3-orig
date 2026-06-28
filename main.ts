function playBeep() {
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
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

function setAllBoardLights(color: RgbColors) {
    motorbit.Setting_the_on_board_lights(Offset.ONE, color)
    motorbit.Setting_the_on_board_lights(Offset.TWO, color)
    motorbit.Setting_the_on_board_lights(Offset.THREE, color)
    motorbit.Setting_the_on_board_lights(Offset.FOUR, color)
}

function flashLight(offset: Offset, color: RgbColors, count: number) {
    for (let index = 0; index < count; index++) {
        motorbit.Setting_the_on_board_lights(offset, color)
        playBeep()
        basic.pause(500)
        motorbit.close_the_on_board_lights(offset)
        basic.pause(500)
    }
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

function turnLeft() {
    motorbit.MotorStopAll()
    showStatus("turn left", 1, 0, true)
    flashLight(Offset.TWO, RgbColors.Yellow, 4)
    motorbit.MotorRunDual(motorbit.Motors.M3, 0, motorbit.Motors.M4, 50)
    motorbit.MotorRunDual(motorbit.Motors.M1, 50, motorbit.Motors.M2, 50)
    showStatus("", 1, 0, false)
}

function turnRight() {
    motorbit.MotorStopAll()
    showStatus("turn right", 1, 0, true)
    flashLight(Offset.THREE, RgbColors.Yellow, 4)
    motorbit.MotorRunDual(motorbit.Motors.M3, -50, motorbit.Motors.M4, 0)
    motorbit.MotorRunDual(motorbit.Motors.M1, -50, motorbit.Motors.M2, -50)
    showStatus("", 1, 0, false)
}

function stopRobot() {
    motorbit.MotorStopAll()
    playBeep()
    setAllBoardLights(RgbColors.Red)
    showStatus("Motor Stop", 2, 2, true)
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

function updateServoPosition() {
    if (degree < 0) {
        degree = 0
    } else if (degree > 180) {
        degree = 180
    }
    motorbit.Servo(motorbit.Servos.S1, degree)
}

radio.onReceivedValue(function (name, value) {
    if (name == "\"drive\"") {
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
    } else if (name == "\"servo\"") {
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
let degree = 0
basic.showIcon(IconNames.SmallSquare)
basic.showIcon(IconNames.Square)
radio.setGroup(2)
degree = 90
motorbit.Servo(motorbit.Servos.S1, degree)
I2C_LCD1602.LcdInit(39)
basic.showIcon(IconNames.Square)
basic.showIcon(IconNames.SmallSquare)
basic.clearScreen()
showStatus("Have a good day", 1, 1, true)
basic.pause(2000)
showStatus("", 1, 0, false)

basic.forever(function () {
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
