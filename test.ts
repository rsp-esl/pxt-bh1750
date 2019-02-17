/////////////////////////////////////////////////////
let value = 0
let value_max = 1000

serial.redirectToUSB() // in order to send message to the computer
led.plotAll() // turn on all 5x5 LEDs
BH1750.begin( BH1750Address.ADDR_PIN_LOW ) // initialize the BH1750 sensor

basic.forever(() => {
    BH1750.powerOn() // turn the sensor on
    value = BH1750.getIntensity()
    serial.writeLine( '' + value ) // send value to the computer
    if( value > value_max ) { value = value_max } // limit the value
    led.setBrightness(Math.map(value, 0, value_max, 0, 255))
    BH1750.powerOff() // turn the sensor off
    basic.pause(1000) // pause for about 1 second
}) 
/////////////////////////////////////////////////////
