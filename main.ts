radio.onReceivedValue(function (name, value) {
    if (name == "\"drive\"" && value == 8) {
        motorbit.MotorRunDual(motorbit.Motors.M3, -40, motorbit.Motors.M4, 40)
        motorbit.MotorRunDual(motorbit.Motors.M1, 40, motorbit.Motors.M2, -40)
        motorbit.Setting_the_on_board_lights(Offset.TWO, RgbColors.White)
        motorbit.Setting_the_on_board_lights(Offset.THREE, RgbColors.White)
        motorbit.Setting_the_on_board_lights(Offset.ONE, RgbColors.Red)
        motorbit.Setting_the_on_board_lights(Offset.FOUR, RgbColors.Red)
        I2C_LCD1602.clear()
        I2C_LCD1602.BacklightOff()
    } else if (name == "\"drive\"" && value == 4) {
        motorbit.MotorStopAll()
        I2C_LCD1602.clear()
        I2C_LCD1602.BacklightOn()
        I2C_LCD1602.ShowString("turn left", 1, 0)
        for (let index = 0; index < 4; index++) {
            motorbit.Setting_the_on_board_lights(Offset.TWO, RgbColors.Yellow)
            music.play(music.tonePlayable(262, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
            basic.pause(500)
            motorbit.close_the_on_board_lights(Offset.TWO)
            basic.pause(500)
        }
        motorbit.MotorRunDual(motorbit.Motors.M3, 0, motorbit.Motors.M4, 50)
        motorbit.MotorRunDual(motorbit.Motors.M1, 50, motorbit.Motors.M2, 50)
        I2C_LCD1602.BacklightOff()
        I2C_LCD1602.clear()
    } else if (name == "\"drive\"" && value == 6) {
        motorbit.MotorStopAll()
        I2C_LCD1602.clear()
        I2C_LCD1602.BacklightOn()
        I2C_LCD1602.ShowString("turn right", 1, 0)
        for (let index = 0; index < 4; index++) {
            motorbit.Setting_the_on_board_lights(Offset.THREE, RgbColors.Yellow)
            music.play(music.tonePlayable(262, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
            basic.pause(500)
            motorbit.close_the_on_board_lights(Offset.THREE)
            basic.pause(500)
        }
        motorbit.MotorRunDual(motorbit.Motors.M3, -50, motorbit.Motors.M4, 0)
        motorbit.MotorRunDual(motorbit.Motors.M1, -50, motorbit.Motors.M2, -50)
        I2C_LCD1602.BacklightOff()
        I2C_LCD1602.clear()
    } else if (name == "\"drive\"" && value == 5) {
        motorbit.MotorStopAll()
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
        motorbit.Setting_the_on_board_lights(Offset.TWO, RgbColors.Red)
        motorbit.Setting_the_on_board_lights(Offset.THREE, RgbColors.Red)
        motorbit.Setting_the_on_board_lights(Offset.ONE, RgbColors.Red)
        motorbit.Setting_the_on_board_lights(Offset.FOUR, RgbColors.Red)
        motorbit.close_all_the_on_board_lights()
        I2C_LCD1602.clear()
        I2C_LCD1602.BacklightOn()
        I2C_LCD1602.ShowString("Motor Stop", 2, 2)
    } else if (name == "\"drive\"" && value == 2) {
        I2C_LCD1602.clear()
        I2C_LCD1602.BacklightOn()
        I2C_LCD1602.ShowString("REVERSE", 3, 0)
        for (let index = 0; index < 4; index++) {
            motorbit.Setting_the_on_board_lights(Offset.TWO, RgbColors.Yellow)
            motorbit.Setting_the_on_board_lights(Offset.ONE, RgbColors.Yellow)
            motorbit.Setting_the_on_board_lights(Offset.THREE, RgbColors.Yellow)
            motorbit.Setting_the_on_board_lights(Offset.FOUR, RgbColors.Yellow)
            music.play(music.tonePlayable(262, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
            motorbit.close_all_the_on_board_lights()
        }
        motorbit.MotorRunDual(motorbit.Motors.M3, 40, motorbit.Motors.M4, -40)
        motorbit.MotorRunDual(motorbit.Motors.M1, -40, motorbit.Motors.M2, 40)
        I2C_LCD1602.BacklightOff()
    } else if (name == "\"servo\"" && value == 5) {
        degree = 90
        motorbit.Servo(motorbit.Servos.S1, degree)
    } else if (name == "\"servo\"" && value == 4) {
        degree += 10
        motorbit.Servo(motorbit.Servos.S1, degree)
    } else if (name == "\"servo\"" && value == 6) {
        degree += -10
        motorbit.Servo(motorbit.Servos.S1, degree)
    }
})
let degree = 0
basic.showIcon(IconNames.SmallSquare)
basic.showIcon(IconNames.Square)
motorbit.Servo(motorbit.Servos.S1, 90)
radio.setGroup(2)
degree = 90
I2C_LCD1602.LcdInit(39)
basic.showIcon(IconNames.Square)
basic.showIcon(IconNames.SmallSquare)
basic.clearScreen()
I2C_LCD1602.ShowString("Have a good day", 1, 1)
basic.pause(2000)
I2C_LCD1602.clear()
I2C_LCD1602.BacklightOff()
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P12) == 1 && pins.digitalReadPin(DigitalPin.P13) == 1) {
        motorbit.MotorStopAll()
        basic.showLeds(`
            # # # # #
            . . . . .
            . . . . .
            . . . . .
            # # # # #
            `)
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        I2C_LCD1602.BacklightOn()
        I2C_LCD1602.clear()
        I2C_LCD1602.ShowString("Motor Stop", 2, 2)
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
