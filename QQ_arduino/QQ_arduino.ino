#include <ArduinoBLE.h>
#include "TimeoutTimer.h"
#define BUFSIZE 20
#include <Arduino_LSM9DS1.h>


//use uart to send gyroscope data to Pi
BLEService uartService("6E400001-B5A3-F393-E0A9-E50E24DCCA9E");
BLEStringCharacteristic txChar("6E400002-B5A3-F393-E0A9-E50E24DCCA9E", BLEWrite, 20 );
BLEStringCharacteristic rxChar("6E400003-B5A3-F393-E0A9-E50E24DCCA9E", BLERead | BLENotify, 20 );



//setup
void setup() {
  Serial.begin(9600);
  while(!Serial);

  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");
    while (1);
  }


  if ( !BLE.begin() )
  {
    Serial.println("Starting BLE failed!");
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
  Serial.println("Bluetooth device (" + deviceAddress + ") active, waiting for connections...");
}






//main
void loop() {
  float x, y, z;
  
  // Wait for a BLE central device.
  BLEDevice central = BLE.central();

  // If a central device is connected to the peripheral...
  if ( central )
  {
    // Print the central's BT address.
    Serial.print("Connected to central: ");
    Serial.println( central.address() );

    Serial.println("X\tY\tZ");

    // While the central device is connected...
    while( central.connected() )
    {
      // DEBUGGING - Get input from user, send to central
      char inputs[BUFSIZE+1];
      if ( getUserInput( inputs, BUFSIZE ) )
      {
        Serial.print("[Send] ");
        Serial.println( inputs );
        rxChar.writeValue( inputs );
      }


      //TODO: get gyroscope data and send to Pi via UART
      if (IMU.gyroscopeAvailable()) {
        IMU.readGyroscope(x, y, z);
    
        Serial.print(x);
        Serial.print('\t');
        Serial.print(y);
        Serial.print('\t');
        Serial.println(z);
      }

    // wait 1 second to print again
    delay(1000);
      
    
    }
    
    Serial.print("Disconnected from central: ");
    Serial.println( central.address() );
    
  }

}



//DEBUG STUFF
/**************************************************************************/
/*!
    @brief  Checks for user input (via the Serial Monitor)
            From: https://github.com/adafruit/Adafruit_BluefruitLE_nRF51
*/
/**************************************************************************/
bool getUserInput(char buffer[], uint8_t maxSize)
{
  // timeout in 100 milliseconds
  TimeoutTimer timeout(100);

  memset(buffer, 0, maxSize);
  while( (!Serial.available()) && !timeout.expired() ) { delay(1); }

  if ( timeout.expired() ) return false;

  delay(2);
  uint8_t count=0;
  do
  {
    count += Serial.readBytes(buffer+count, maxSize);
    delay(2);
  } while( (count < maxSize) && (Serial.available()) );
  
  return true;
}
