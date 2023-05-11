//ovladani tlacitky
let lastOsaX = 0;
let lastOsaY = 0;
let lastBtnA = 0;
let lastBtnB = 0;
let lastLogo = 0;
let lastPinP0 = 0;
let lastPinP1 = 0;
let lastPinP2 = 0;

function sendData() {
    let data = {
        x: input.acceleration(Dimension.X),
        y: input.acceleration(Dimension.Y),
        a: input.buttonIsPressed(Button.A),
        b: input.buttonIsPressed(Button.B),
        l: input.logoIsPressed(),
        p0: input.pinIsPressed(TouchPin.P0),
        p1: input.pinIsPressed(TouchPin.P1),
        p2: input.pinIsPressed(TouchPin.P2)
    }
    let posliData = String.fromCharCode(data.x) + String.fromCharCode(data.y) + (data.a ? 1 : 0) + (data.b ? 1 : 0) + (data.l ? 1 : 0) + (data.p0 ? 1 : 0) + (data.p1 ? 1 : 0) + (data.p2 ? 1 : 0);
    radio.sendString(posliData);
}

basic.forever(function () {
    let osaX = input.acceleration(Dimension.X);
    let osaY = input.acceleration(Dimension.Y);
    let btnA = input.buttonIsPressed(Button.A);
    let btnB = input.buttonIsPressed(Button.B);
    let logo = input.logoIsPressed();
    let pinP0 = input.pinIsPressed(TouchPin.P0);
    let pinP1 = input.pinIsPressed(TouchPin.P1);
    let pinP2 = input.pinIsPressed(TouchPin.P2);

    if (+osaX != lastOsaX || +osaY != lastOsaY || +btnA != lastBtnA || +btnB != lastBtnB || +logo != lastLogo || +pinP0 != lastPinP0 || +pinP1 != lastPinP1 || +pinP2 != lastPinP2) {
        sendData();
    }

    lastOsaX = +osaX;
    lastOsaY = +osaY;
    lastBtnA = +btnA;
    lastBtnB = +btnB;
    lastLogo = +logo;
    lastPinP0 = +pinP0;
    lastPinP1 = +pinP1;
    lastPinP2 = +pinP2;
})