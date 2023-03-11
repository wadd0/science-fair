let score_a = 0
let score_b = 0
let pressed = false
function draw_score (score: number, column: number) {
    for (let index = 0; index <= score; index++) {
        led.plot(column, (index - 4) * -1)
    }
}
function celebrate () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.pause(200)
    basic.showLeds(`
        . . . . .
        . . # . .
        . # . # .
        . . # . .
        . . . . .
        `)
    basic.pause(200)
    basic.showLeds(`
        . . # . .
        . # . # .
        # . . . #
        . # . # .
        . . # . .
        `)
    basic.pause(500)
}
function won () {
    basic.pause(1000)
    basic.showLeds(`
        # . . . #
        # . . . #
        # . # . #
        # . # . #
        # # # # #
        `)
    basic.pause(200)
    basic.showLeds(`
        # # # # #
        # . . . #
        # . . . #
        # . . . #
        # # # # #
        `)
    basic.pause(200)
    basic.showLeds(`
        # # # # #
        # . . . #
        # . . . #
        # . . . #
        # . . . #
        `)
}
function reset () {
    basic.clearScreen()
    score_a = -1
    score_b = -1
}
basic.forever(function () {
    basic.showIcon(IconNames.Happy)
    while (true) {
        if (input.buttonIsPressed(Button.AB)) {
            basic.showString("Starting")
            break;
        }
    }
    reset()
    while (true) {
        pressed = false
        basic.pause(randint(1000, 3000))
        music.playTone(659, music.beat(BeatFraction.Half))
        while (true) {
            if (input.buttonIsPressed(Button.A)) {
                basic.clearScreen()
                basic.showLeds(`
                    . . # . .
                    . # . . .
                    # # # # #
                    . # . . .
                    . . # . .
                    `)
                score_a += 1
                break;
            } else if (input.buttonIsPressed(Button.B)) {
                basic.clearScreen()
                basic.showLeds(`
                    . . # . .
                    . . . # .
                    # # # # #
                    . . . # .
                    . . # . .
                    `)
                score_b += 1
                break;
            }
        }
        basic.clearScreen()
        draw_score(score_a, 0)
        draw_score(score_b, 4)
        basic.pause(2000)
        if (score_a == 4) {
            celebrate()
            basic.showLeds(`
                . # # # .
                # . . . #
                # # # # #
                # . . . #
                # . . . #
                `)
            won()
            break;
        } else if (score_b == 4) {
            celebrate()
            basic.showLeds(`
                # # # # .
                # . . . #
                # # # # #
                # . . . #
                # # # # .
                `)
            won()
            break;
        }
    }
    basic.showLeds(`
        . . . . .
        . . . . #
        . . . # .
        # . # . .
        . # . . .
        `)
})
