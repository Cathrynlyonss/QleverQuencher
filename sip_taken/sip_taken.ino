//Arduino Nano 33 BLE
//Script to see if "sip is taken"


#include <Arduino_LSM9DS1.h>


void setup() {
  Serial.begin(9600);
  while (!Serial);

  //set pin 2 as output to write high when sip taken
  pinMode(2, OUTPUT);
  

  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");
    while (1);
  }

  Serial.println("X\tY\tZ");
}


void loop() {
  float x, y, z;

  if (IMU.gyroscopeAvailable()) {
    IMU.readGyroscope(x, y, z);

    Serial.print(x);
    Serial.print('\t');
    Serial.print(y);
    Serial.print('\t');
    Serial.println(z);

    //check if sip taken - what is threshold?
    if(y > 100 or y < -100){
      digitalWrite(2, HIGH);
      Serial.println("Sip taken!");
    }
    
    //set back to low - don't want it always to think a sip is taken
    digitalWrite(2, LOW);


    // wait 1 second to print again
    delay(1000);
  }
}





// tested for resting state (x, y, z) = ()
