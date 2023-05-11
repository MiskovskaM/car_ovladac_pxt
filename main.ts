//ovladani tlacitky
let lastBtnA = 0;
let lastBtnB = 0;
let lastLogo = 0;
let lastP2 = 0;

function sendData() {
    let data = {
        x: input.rotation(Rotation.Pitch),
        y: input.rotation(Rotation.Roll),
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
    let btnA = input.buttonIsPressed(Button.A);
    let btnB = input.buttonIsPressed(Button.B);
    let logo = input.logoIsPressed();
    let p2 = input.pinIsPressed(TouchPin.P2);

    if (+btnA != lastBtnA || +btnB != lastBtnB || +logo != lastLogo || +p2 != lastP2) {
        sendData();
    }

    lastBtnA = +btnA;
    lastBtnB = +btnB;
    lastLogo = +logo;
    lastP2 = +p2;
})