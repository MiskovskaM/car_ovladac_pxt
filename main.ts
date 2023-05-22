//ovladani
radio.setGroup(54);
radio.setFrequencyBand(7);

function sendData() {
    let data = {
        x: Math.round((input.acceleration(Dimension.X) + 1024) / 1024 * 255),
        y: Math.round((input.acceleration(Dimension.Y) + 1024) / 1024 * 255),
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

basic.forever(function () {
   sendData();
   basic.pause(50);
})