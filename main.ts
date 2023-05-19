//ovladani
radio.setGroup(54);
radio.setFrequencyBand(7);

let lastX = 0;
let lastY = 0;
let lastBtnA = 0;
let lastBtnB = 0;
let lastLogo = 0;
let lastP2 = 0;

let calibrateX = 0;
let calibrateY = 0;

function sendData() {
    let data = {
        x: Math.round(input.acceleration(Dimension.X) / 1024 * 255),
        y: Math.round(input.acceleration(Dimension.Y) / 1024 * 255),
        a: input.buttonIsPressed(Button.A),
        b: input.buttonIsPressed(Button.B),
        l: input.logoIsPressed(),
        p0: input.pinIsPressed(TouchPin.P0),
        p1: input.pinIsPressed(TouchPin.P1),
        p2: input.pinIsPressed(TouchPin.P2)
    };
    let posliData = String.fromCharCode(data.x) + String.fromCharCode(data.y) + (data.a ? 1 : 0) + (data.b ? 1 : 0) + (data.l ? 1 : 0) + (data.p0 ? 1 : 0) + (data.p1 ? 1 : 0) + (data.p2 ? 1 : 0);
    radio.sendString(posliData);
}

input.onButtonPressed(Button.A, function () {
    basic.showString("C");
    basic.clearScreen();
    calibrateX = input.acceleration(Dimension.X);
    calibrateY = input.acceleration(Dimension.Y);
    basic.showString("D");
    basic.clearScreen();
})

basic.forever(function () {
    let x = input.acceleration(Dimension.X) / 1024 * 255;
    let y = input.acceleration(Dimension.Y) / 1024 * 255;
    let btnA = input.buttonIsPressed(Button.A);
    let btnB = input.buttonIsPressed(Button.B);
    let logo = input.logoIsPressed();
    let p2 = input.pinIsPressed(TouchPin.P2);

    if (+btnA !== lastBtnA || +btnB !== lastBtnB || +logo !== lastLogo || +p2 !== lastP2) {
        sendData();
    }

    if (Math.abs(x) >= 100 && Math.abs(y) >= 100) {
        sendData();
    }

    lastX = +x;
    lastY = +y;
    lastBtnA = +btnA;
    lastBtnB = +btnB;
    lastLogo = +logo;
    lastP2 = +p2;

    if (Math.abs(x) < 100 && Math.abs(y) < 100) {
        radio.sendString("STOP");
    }
})

basic.forever(function () {
    console.logValue("X", lastX);
    console.logValue("Y", lastY);
    basic.pause(250);
})