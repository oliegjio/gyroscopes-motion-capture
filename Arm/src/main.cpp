#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <Servo.h>

#define MESSAGE_SIZE 4
#define PORT 1337

//Forward declaration
int* convertMessage (String str, char symbol);
void connect(const char *ssid, const char *password);
void changeArmPosition(int message[4]);

// WIFI
WiFiClient client;
const char *ssid  = "OnePlus3";
const char *password = "allhailklab";
const String id = "3";
IPAddress ip = IPAddress(192,168,43,66);

// SERVO
Servo Arm_Motors[4];




void setup()
{
    Serial.begin(9600);
    
}


void loop()
{

    if(client.available()){
        String line = client.readStringUntil('\n');
        int *message;
        message = convertMessage(line, '|');


        delete [] message;
    }

}

void connect(const char *ssid, const char *password)
{
    WiFi.mode(WIFI_OFF);
    WiFi.begin(ssid, password);

    while(WiFi.status() != WL_CONNECTED){
        Serial.print(".");
    }
    Serial.println();
    Serial.println("Connected to the WiFi");
    Serial.println(ssid);
    Serial.println(WiFi.localIP());

    if(!client.connect(ip, PORT)){
        Serial.println("Connection failed");
    }
    else{
        Serial.println("Connected to the Server");
    }
}

int* convertMessage (String str, char symbol)
{
    int *message = new int[MESSAGE_SIZE];
    unsigned short int message_element = 0;

    while(message_element != MESSAGE_SIZE)
    {
        unsigned short int position = str.indexOf(symbol);
        message[message_element] = str.substring(0, position).toInt();
        str = str.substring(position + 1, str.length());
        message_element++;
    }
    return message;
}

void changeArmPosition(int message[4]){

}
