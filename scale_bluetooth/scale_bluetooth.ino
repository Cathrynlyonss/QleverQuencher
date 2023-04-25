//Arduino UNO with Bluefruit LE Shield
//Script to get weight data and send it to the pi via bluetooth


//bluetooth initialization - based off of bleuart_cmdmode example

#include <Arduino.h>
#include <SPI.h>
#include "Adafruit_BLE.h"
#include "Adafruit_BluefruitLE_SPI.h"
#include "Adafruit_BluefruitLE_UART.h"

#include "BluefruitConfig.h"

#if SOFTWARE_SERIAL_AVAILABLE
  #include <SoftwareSerial.h>
#endif

    #define FACTORYRESET_ENABLE         1
    #define MINIMUM_FIRMWARE_VERSION    "0.6.6"
    #define MODE_LED_BEHAVIOUR          "MODE"
/*=========================================================================*/


/* ...hardware SPI, using SCK/MOSI/MISO hardware SPI pins and then user selected CS/IRQ/RST */
Adafruit_BluefruitLE_SPI ble(BLUEFRUIT_SPI_CS, BLUEFRUIT_SPI_IRQ, BLUEFRUIT_SPI_RST);


// A small helper
void error(const __FlashStringHelper*err) {
  Serial.println(err);
  while (1);
}


//set up scale
#include "HX711.h"

//get scale pins
const int LOADCELL_DOUT_PIN = 2;
const int LOADCELL_SCK_PIN = 3;

HX711 scale;

long pastreading = 0;


void setup(void)
{
  while (!Serial);
  delay(500);

  Serial.begin(9600);

  //set pin 6 as input to see if sip taken when high
  pinMode(6, INPUT);

  //setup scale
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  scale.set_scale(466);
  scale.tare(299);
  delay(500);
  Serial.println("Scale is setup!");
  pastreading = scale.get_units(10);

  //setup bluetooth
  if ( !ble.begin(VERBOSE_MODE) )
  {
    error(F("Couldn't find Bluefruit, make sure it's in CoMmanD mode & check wiring?"));
  }

  if ( FACTORYRESET_ENABLE )
  {
    /* Perform a factory reset to make sure everything is in a known state */
    //Serial.println(F("Performing a factory reset: "));
    if ( ! ble.factoryReset() ){
      error(F("Couldn't factory reset"));
    }
  }

  /* Disable command echo from Bluefruit */
  ble.echo(false);

  //get mac address
  ble.println("AT+BLEGETADDR");

  // Check response status
  Serial.print("Arduino UNO MAC Address: ");
  ble.waitForOK();

  ble.verbose(false);  // debug info is a little annoying after this point!

  //wait for pi to connect via bluetooth
  while (! ble.isConnected()) {
      delay(500);
  }
  Serial.println("Connected to Pi!");

}




void loop(void)
{
  
  //get scale data
  if (ble.isConnected()){

    //check if a sip was taken
    if (digitalRead(6) == HIGH){
      Serial.println("Sip taken!");
      
      if (scale.is_ready()){
        delay(1000);
        long reading = scale.get_units(10);
        long sipSize = (pastreading - reading);//*0.035274;
        
        //Serial.print("Weight: ");
        //Serial.println(reading);
        
        Serial.print("Sip Size: ");
        Serial.println(sipSize);
  
        //send sip size to pi
        ble.print("AT+BLEUARTTX=");
        ble.println(sipSize);

        //set past reading to be most recent
        pastreading = reading;
        
        // check response status
        if (! ble.waitForOK() ) {
          Serial.println(F("Failed to send?"));
        } 
        
      }
      else{
        Serial.println("Scale not found");
      }
      
    }
    
    
  }
  
}
