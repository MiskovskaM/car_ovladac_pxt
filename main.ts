<!-- //servo S1
//levý motor M1
//pravý motor M4
//ovladač
radio.setGroup(22)
radio.setFrequencyBand(6)

radio.sendNumber(5)
radio.sendString("jeď")

let leftIdx = 0
let rightInx = 0
const speeds = [0, 30, 50, 70, 85, 100]
input.onButtonPressed(Button.A, function () {
    PCAmotor.MotorRun(PCAmotor.Motors.M1,
        speeds[++leftIdx % speeds.length])
    basic.showNumber(speeds[leftIdx])
    basic.clearScreen()
})

input.onButtonPressed(Button.B, function () {
    PCAmotor.MotorRun(PCAmotor.Motors.M4,
        speeds[++rightInx % speeds.length])
    basic.showNumber(speeds[rightInx])
    basic.clearScreen()
})
input.onButtonPressed(Button.AB, function () {
    PCAmotor.MotorStopAll()
    leftIdx = rightInx = 0
}) -->



//spojeni microbitu
let pitch = 0;
let roll = 0;

let data = {
    x: pitch,
    y: roll,
    a: input.buttonIsPressed(Button.A),
    b: input.buttonIsPressed(Button.B),
    l: input.logoIsPressed(),
    p0: input.pinIsPressed(TouchPin.P0),
    p1: input.pinIsPressed(TouchPin.P1),
    p2: input.pinIsPressed(TouchPin.P2)
}

let posliData = String.fromCharCode(data.x) + String.fromCharCode(data.y) + (data.a ? 1 : 0) + (data.b ? 1 : 0) + (data.l ? 1 : 0) + (data.p0 ? 1 : 0) + (data.p1 ? 1 : 0) + (data.p2 ? 1 : 0);
radio.sendString(posliData);
