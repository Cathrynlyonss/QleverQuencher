//Arduino Nano 33 BLE
//Script to see if "sip is taken"

//testing
#include <ArduinoBLE.h>
#include "TimeoutTimer.h"
#define BUFSIZE 20

//use uart to send gyroscope data to Pi
BLEService uartService("6E400001-B5A3-F393-E0A9-E50E24DCCA9E");
BLEStringCharacteristic txChar("6E400002-B5A3-F393-E0A9-E50E24DCCA9E", BLEWrite, 20 );
BLEStringCharacteristic rxChar("6E400003-B5A3-F393-E0A9-E50E24DCCA9E", BLERead | BLENotify, 20 );



#include <Arduino_LSM9DS1.h>


void setup() {
//  Serial.begin(9600);
//  while (!Serial);

  //set pin 2 as output to write high when sip taken
  pinMode(2, OUTPUT);
  

  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");
    while (1);
  }

 if ( !BLE.begin() )
  {
    //Serial.println("Starting BLE failed!");
    while(1);
  } 

  // Get the Arduino's BT address
  String deviceAddress = BLE.address();

  // The device name we'll advertise with.
  BLE.setLocalName("ArduinoBLE QleverQuencher");

  // Get UART service ready.
  BLE.setAdvertisedService( uartService );
  uartService.addCharacteristic( txChar );
  uartService.addCharacteristic( rxChar );
  BLE.addService( uartService );

  // Start advertising our new service.
  BLE.advertise();
  //Serial.println("Bluetooth device (" + deviceAddress + ") active, waiting for connections...");
}


void loop() {
  float x, y, z;
  
  // Wait for a BLE central device.
  BLEDevice central = BLE.central();

  // If a central device is connected to the peripheral...
  if ( central )
  {
    // Print the central's BT address.
//    Serial.print("Connected to central: ");
//    Serial.println( central.address() );
//
//    Serial.println("X\tY\tZ");

    // While the central device is connected...
    while( central.connected() )
    {
//      // DEBUGGING - Get input from user, send to central
//      char inputs[BUFSIZE+1];
//      if ( getUserInput( inputs, BUFSIZE ) )
//      {
//        Serial.print("[Send] ");
//        Serial.println( inputs );
//        rxChar.writeValue( inputs );
//      }


      //get gyroscope data
      if (IMU.gyroscopeAvailable()) {
        IMU.readGyroscope(x, y, z);
    
//        Serial.print(x);
//        Serial.print('\t');
//        Serial.print(y);
//        Serial.print('\t');
//        Serial.println(z);

        rxChar.writeValue("x " + String(x));
        rxChar.writeValue("y " + String(y));
        rxChar.writeValue("z "+ String(z));


        ////check if sip taken - what is threshold?
        if( abs(x)>1 or abs(y)>1 or abs(z)>1 ) {
          digitalWrite(2, HIGH);
          //Serial.println("Sip taken!");
          rxChar.writeValue("Sip taken!");
          delay(20000);
          digitalWrite(2, LOW);
        }
        
      }

    }
    
//    Serial.print("Disconnected from central: ");
//    Serial.println( central.address() );
    
  }
}
