score_a = 0
score_b = 0
pressed = False
def draw_score(score: number, column: number):
    index = 0
    while index <= score:
        led.plot(column, (index - 4) * -1)
        index += 1
def celebrate():
    basic.show_leds("""
        . . . . .
                . . . . .
                . . # . .
                . . . . .
                . . . . .
    """)
    basic.pause(200)
    basic.show_leds("""
        . . . . .
                . . # . .
                . # . # .
                . . # . .
                . . . . .
    """)
    basic.pause(200)
    basic.show_leds("""
        . . # . .
                . # . # .
                # . . . #
                . # . # .
                . . # . .
    """)
    basic.pause(500)
def won():
    basic.pause(1000)
    basic.show_leds("""
        # . . . #
                # . . . #
                # . # . #
                # . # . #
                # # # # #
    """)
    basic.pause(200)
    basic.show_leds("""
        # # # # #
                # . . . #
                # . . . #
                # . . . #
                # # # # #
    """)
    basic.pause(200)
    basic.show_leds("""
        # # # # #
                # . . . #
                # . . . #
                # . . . #
                # . . . #
    """)
def reset():
    global score_a, score_b
    basic.clear_screen()
    score_a = -1
    score_b = -1

def on_forever():
    global pressed, score_a, score_b
    basic.show_icon(IconNames.HAPPY)
    while True:
        if input.button_is_pressed(Button.AB):
            basic.show_string("Starting")
            break
    reset()
    while True:
        pressed = False
        basic.pause(randint(1000, 3000))
        music.play_tone(659, music.beat(BeatFraction.HALF))
        while True:
            if input.button_is_pressed(Button.A):
                basic.clear_screen()
                basic.show_leds("""
                    . . # . .
                                        . # . . .
                                        # # # # #
                                        . # . . .
                                        . . # . .
                """)
                score_a += 1
                break
            elif input.button_is_pressed(Button.B):
                basic.clear_screen()
                basic.show_leds("""
                    . . # . .
                                        . . . # .
                                        # # # # #
                                        . . . # .
                                        . . # . .
                """)
                score_b += 1
                break
        basic.clear_screen()
        draw_score(score_a, 0)
        draw_score(score_b, 4)
        basic.pause(2000)
        if score_a == 4:
            celebrate()
            basic.show_leds("""
                . # # # .
                                # . . . #
                                # # # # #
                                # . . . #
                                # . . . #
            """)
            won()
            break
        elif score_b == 4:
            celebrate()
            basic.show_leds("""
                # # # # .
                                # . . . #
                                # # # # #
                                # . . . #
                                # # # # .
            """)
            won()
            break
    basic.show_leds("""
        . . . . .
                . . . . #
                . . . # .
                # . # . .
                . # . . .
    """)
basic.forever(on_forever)
