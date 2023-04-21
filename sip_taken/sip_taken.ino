//Arduino Nano 33 BLE
//Script to see if "sip is taken"


#include <Arduino_LSM9DS1.h>


void setup() {

  //set pin 2 as output to write high when sip taken
  pinMode(2, OUTPUT);
  

  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");
    while (1);
  }
  
}


void loop() {
  float x, y, z;
  
//get gyroscope data
      if (IMU.gyroscopeAvailable()) {
        IMU.readGyroscope(x, y, z);
 

        //check if sip taken - what is threshold?
        if( abs(x)>3 or abs(y)>3 or abs(z)>3 ) {
          IMU.readGyroscope(x, y, z);

          while( abs(x)>1 or abs(y)>1 or abs(z)>1 ){
            IMU.readGyroscope(x, y, z);
          }

           digitalWrite(2, HIGH);
           delay(500);
           digitalWrite(2, LOW);
          
        }
        
      }

  
 }
