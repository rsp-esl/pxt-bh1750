
/**
 * BH1750 Digital Ambient Light Sensor
 * Datasheet: https://www.mouser.com/ds/2/348/bh1750fvi-e-186247.pdf
 * Tested with GY-302 BH1750 Module
 */
//% weight=100 color=#000011 icon="\uf185"

enum BH1750Address {
    ADDR_PIN_LOW  = 0x23,
    ADDR_PIN_HIGH = 0x5C
}

namespace BH1750 {

    let i2c_addr = BH1750Address.ADDR_PIN_LOW

    /**
     * set BH1750 Digital Ambient Light Sensor I2C address, 
     * @param is the 7-bit I2C address of BH1750 module
     */
    //% blockId="BH1750_SET_ADDRESS" block="set Address %addr"
    //% weight=100 blockGap=8
    export function setAddress(addr: BH1750Address): void {
        i2c_addr = addr
    }

    /**
     * initialize BH1750 by turning the devie on and
     * then sending a soft-reset command.
     */
    //% blockId="BH1750_BEGIN" block="begin"
    //% weight=90 blockGap=8
    export function begin( addr : BH1750Address = BH1750Address.ADDR_PIN_LOW ): void {
        // power on
        pins.i2cWriteNumber(i2c_addr, 0x01, NumberFormat.UInt8BE)
        // reset
        pins.i2cWriteNumber(i2c_addr, 0x07, NumberFormat.UInt8BE)
        // set measurement mode
        pins.i2cWriteNumber(i2c_addr, 0x10, NumberFormat.UInt8BE)
    }

    /**
     * turn on BH1750 to operate in continuous measurement mode
     */
    //% blockId="BH1750_ON" block="turn on"
    //% weight=90 blockGap=8
    export function powerOn(): void {
        // power on
        pins.i2cWriteNumber(i2c_addr, 0x01, NumberFormat.UInt8BE)
        // set measurement mode
        pins.i2cWriteNumber(i2c_addr, 0x10, NumberFormat.UInt8BE)
    }

    /**
     * turn off BH1750, to reduce power consumption.
     */
    //% blockId="BH1750_OFF" block="turn off"
    //% weight=90 blockGap=8
    export function powerOff(): void {
        pins.i2cWriteNumber(i2c_addr, 0x00, NumberFormat.UInt8BE)
    }

    /**
     * get the level of ambient light (lx)
     */
    //% blockId="BH1750_GET_INTENSITY" block="get intensity (lx)"
    //% weight=80 blockGap=8
    export function getIntensity(): number {
        return Math.idiv(pins.i2cReadNumber(i2c_addr, NumberFormat.UInt16BE) * 5, 6)
    }
}  
