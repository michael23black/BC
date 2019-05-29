#include <Servo.h>

#define Servo_1_Init_Pos 80
#define Servo_2_Init_Pos 80
#define Servo_3_Init_Pos 80
#define Servo_4_Init_Pos 95
#define Servo_5_Init_Pos 30
#define Servo_6_Init_Pos 150

#define Bottom_Limit 0
#define Top_Limit 100

#define Servo_1_Bottom_Limit 0
#define Servo_1_Top_Limit 170
#define Servo_2_Bottom_Limit 0
#define Servo_2_Top_Limit 90
#define Servo_3_Bottom_Limit 0
#define Servo_3_Top_Limit 110
#define Servo_4_Bottom_Limit 20
#define Servo_4_Top_Limit 180
#define Servo_5_Bottom_Limit 10
#define Servo_5_Top_Limit 110
#define Servo_6_Bottom_Limit 110
#define Servo_6_Top_Limit 180

#define Speed_Bottom_Limit 5
#define Speed_Top_Limit 50

Servo Servo_1;
Servo Servo_2;
Servo Servo_3;
Servo Servo_4;
Servo Servo_5;
Servo Servo_6;

byte Servo_1_Pos = Servo_1_Init_Pos, Servo_2_Pos = Servo_2_Init_Pos, Servo_3_Pos = Servo_3_Init_Pos, Servo_4_Pos = Servo_4_Init_Pos, Servo_5_Pos = Servo_5_Init_Pos, Servo_6_Pos = Servo_6_Init_Pos;
byte Servo_1_Prev_Pos = Servo_1_Init_Pos, Servo_2_Prev_Pos = Servo_2_Init_Pos, Servo_3_Prev_Pos = Servo_3_Init_Pos, Servo_4_Prev_Pos = Servo_4_Init_Pos, Servo_5_Prev_Pos = Servo_5_Init_Pos, Servo_6_Prev_Pos = Servo_6_Init_Pos;
byte Servo_1_Story_Pos[50], Servo_2_Story_Pos[50], Servo_3_Story_Pos[50], Servo_4_Story_Pos[50], Servo_5_Story_Pos[50], Servo_6_Story_Pos[50];

String Data_In = "";
byte Speed = 20;
int Index = 0;

void setup() {
  Servo_1.attach(2);
  Servo_2.attach(3);
  Servo_3.attach(4);
  Servo_4.attach(5);
  Servo_5.attach(6);
  Servo_6.attach(7);
  
  Serial.begin(9600);
  
  Servo_1.write(Servo_1_Prev_Pos);
  Servo_2.write(Servo_2_Prev_Pos);
  Servo_3.write(Servo_3_Prev_Pos);
  Servo_4.write(Servo_4_Prev_Pos);
  Servo_5.write(Servo_5_Prev_Pos);
  Servo_6.write(Servo_6_Prev_Pos);
}

void loop(){
  if (Serial.available()) {
    Data_In = Serial.readString();
    
    Servo_Watcher("S1", Servo_1, Servo_1_Prev_Pos, Servo_1_Pos, Servo_1_Bottom_Limit, Servo_1_Top_Limit, 2);
    Servo_Watcher("S2", Servo_2, Servo_2_Prev_Pos, Servo_2_Pos, Servo_2_Bottom_Limit, Servo_2_Top_Limit, 2);
    Servo_Watcher("S3", Servo_3, Servo_3_Prev_Pos, Servo_3_Pos, Servo_3_Bottom_Limit, Servo_3_Top_Limit, 2);
    Servo_Watcher("S4", Servo_4, Servo_4_Prev_Pos, Servo_4_Pos, Servo_4_Bottom_Limit, Servo_4_Top_Limit, 2);
    Servo_Watcher("S5", Servo_5, Servo_5_Prev_Pos, Servo_5_Pos, Servo_5_Bottom_Limit, Servo_5_Top_Limit, 2);
    Servo_Watcher("S6", Servo_6, Servo_6_Prev_Pos, Servo_6_Pos, Servo_6_Bottom_Limit, Servo_6_Top_Limit, 2);

    Speed_Watcher();
    
    if (Data_In == "SAVE") {
      Servo_1_Story_Pos[Index] = Servo_1_Pos;
      Servo_2_Story_Pos[Index] = Servo_2_Pos;
      Servo_3_Story_Pos[Index] = Servo_3_Pos;
      Servo_4_Story_Pos[Index] = Servo_4_Pos;
      Servo_5_Story_Pos[Index] = Servo_5_Pos;
      Servo_6_Story_Pos[Index] = Servo_6_Pos;
      Index++;             
    }
    
    if (Data_In == "RUN" && Index > 1) {
      Run_Servos_In_Loop();
    }
    
    if ( Data_In == "RESET") {
      Reset();
    }
    
    if (Data_In == "INITIAL") {
      Reset();
      To_Initial();
    }
  }
}
void Servo_Watcher(String Watched_Value, Servo &Current_Servo, byte &Servo_Prev_Pos, byte &Servo_Pos, byte Servo_Bottom_Limit, byte Servo_Top_Limit, byte Prefix_Length) {
  if(Data_In.startsWith(Watched_Value)) {
    byte New_Angle = constrain(Parse_Angle(Data_In, Prefix_Length), Bottom_Limit, Top_Limit);
    Servo_Pos = map(New_Angle, Bottom_Limit, Top_Limit, Servo_Bottom_Limit, Servo_Top_Limit);
    Move_To(Servo_1_Prev_Pos, Servo_2_Prev_Pos, Servo_3_Prev_Pos, Servo_4_Prev_Pos, Servo_5_Prev_Pos, Servo_6_Prev_Pos, Servo_1_Pos, Servo_2_Pos, Servo_3_Pos, Servo_4_Pos, Servo_5_Pos, Servo_6_Pos);
    Servo_Prev_Pos = Servo_Pos;
  }
}
void Speed_Watcher() {
  if (Data_In.startsWith("SS")){
    Speed = map(Parse_Angle(Data_In, 2), Bottom_Limit, Top_Limit, Speed_Bottom_Limit, Speed_Top_Limit);
  } 
}
int Parse_Angle(String Data, byte Prefix_Length) {
  String Sub_Data = Data.substring(Prefix_Length, Data.length());
  return Sub_Data.toInt();
}

void Run_Servos_In_Loop() {
  byte Servo_1_Last_Pos = Servo_1_Story_Pos[0], Servo_2_Last_Pos = Servo_2_Story_Pos[0], Servo_3_Last_Pos = Servo_3_Story_Pos[0], Servo_4_Last_Pos = Servo_4_Story_Pos[0], Servo_5_Last_Pos = Servo_5_Story_Pos[0], Servo_6_Last_Pos = Servo_6_Story_Pos[0];
  Move_To(Servo_1_Prev_Pos, Servo_2_Prev_Pos, Servo_3_Prev_Pos, Servo_4_Prev_Pos, Servo_5_Prev_Pos, Servo_6_Prev_Pos, Servo_1_Story_Pos[0], Servo_2_Story_Pos[0], Servo_3_Story_Pos[0], Servo_4_Story_Pos[0], Servo_5_Story_Pos[0], Servo_6_Story_Pos[0]);
  Servo_1_Story_Pos[Index] = Servo_1_Story_Pos[0];
  Servo_2_Story_Pos[Index] = Servo_2_Story_Pos[0];
  Servo_3_Story_Pos[Index] = Servo_3_Story_Pos[0];
  Servo_4_Story_Pos[Index] = Servo_4_Story_Pos[0];
  Servo_5_Story_Pos[Index] = Servo_5_Story_Pos[0];
  Servo_6_Story_Pos[Index] = Servo_6_Story_Pos[0];
  while (Data_In != "RESET" && Data_In != "INITIAL") {
    for (byte i = 0; i <= Index - 1; i++) {
      if (Serial.available()) {     
        Data_In = Serial.readString();  
        while (Data_In == "PAUSE") {         
          if (Serial.available()) {
            Data_In = Serial.readString();
          }
        }
        if ( Data_In == "RESET" || Data_In == "INITIAL") {
          Servo_1_Prev_Pos = Servo_1_Last_Pos;
          Servo_2_Prev_Pos = Servo_2_Last_Pos;
          Servo_3_Prev_Pos = Servo_3_Last_Pos;
          Servo_4_Prev_Pos = Servo_4_Last_Pos;
          Servo_5_Prev_Pos = Servo_5_Last_Pos;
          Servo_6_Prev_Pos = Servo_6_Last_Pos;
          Servo_1_Pos = Servo_1_Last_Pos;
          Servo_2_Pos = Servo_2_Last_Pos;
          Servo_3_Pos = Servo_3_Last_Pos;
          Servo_4_Pos = Servo_4_Last_Pos;
          Servo_5_Pos = Servo_5_Last_Pos;
          Servo_6_Pos = Servo_6_Last_Pos;
          break;
        }
        Speed_Watcher();
      }
      Move_To(Servo_1_Story_Pos[i], Servo_2_Story_Pos[i], Servo_3_Story_Pos[i], Servo_4_Story_Pos[i], Servo_5_Story_Pos[i], Servo_6_Story_Pos[i], Servo_1_Story_Pos[i + 1], Servo_2_Story_Pos[i + 1], Servo_3_Story_Pos[i + 1], Servo_4_Story_Pos[i + 1], Servo_5_Story_Pos[i + 1], Servo_6_Story_Pos[i + 1]);
      Servo_1_Last_Pos = Servo_1_Story_Pos[i + 1];
      Servo_2_Last_Pos = Servo_2_Story_Pos[i + 1];
      Servo_3_Last_Pos = Servo_3_Story_Pos[i + 1];
      Servo_4_Last_Pos = Servo_4_Story_Pos[i + 1];
      Servo_5_Last_Pos = Servo_5_Story_Pos[i + 1];
      Servo_6_Last_Pos = Servo_6_Story_Pos[i + 1];
    }
  }
}
void Reset() {
  memset(Servo_1_Story_Pos, 0, sizeof(Servo_1_Story_Pos));
  memset(Servo_2_Story_Pos, 0, sizeof(Servo_2_Story_Pos));
  memset(Servo_3_Story_Pos, 0, sizeof(Servo_3_Story_Pos));
  memset(Servo_4_Story_Pos, 0, sizeof(Servo_4_Story_Pos));
  memset(Servo_5_Story_Pos, 0, sizeof(Servo_5_Story_Pos));
  memset(Servo_6_Story_Pos, 0, sizeof(Servo_6_Story_Pos));
  Index = 0;
}
void To_Initial() {
  Move_To(Servo_1_Prev_Pos, Servo_2_Prev_Pos, Servo_3_Prev_Pos, Servo_4_Prev_Pos, Servo_5_Prev_Pos, Servo_6_Prev_Pos, Servo_1_Init_Pos, Servo_2_Init_Pos, Servo_3_Init_Pos, Servo_4_Init_Pos, Servo_5_Init_Pos, Servo_6_Init_Pos);
  Servo_1_Prev_Pos = Servo_1_Init_Pos;
  Servo_2_Prev_Pos = Servo_2_Init_Pos;
  Servo_3_Prev_Pos = Servo_3_Init_Pos;
  Servo_4_Prev_Pos = Servo_4_Init_Pos;
  Servo_5_Prev_Pos = Servo_5_Init_Pos;
  Servo_6_Prev_Pos = Servo_6_Init_Pos;
  Servo_1_Pos = Servo_1_Init_Pos;
  Servo_2_Pos = Servo_2_Init_Pos;
  Servo_3_Pos = Servo_3_Init_Pos;
  Servo_4_Pos = Servo_4_Init_Pos;
  Servo_5_Pos = Servo_5_Init_Pos;
  Servo_6_Pos = Servo_6_Init_Pos;
}

void Move_To(byte Servo_1_Current_Pos, byte Servo_2_Current_Pos, byte Servo_3_Current_Pos, byte Servo_4_Current_Pos, byte Servo_5_Current_Pos, byte Servo_6_Current_Pos, byte Servo_1_Next_Pos, byte Servo_2_Next_Pos, byte Servo_3_Next_Pos, byte Servo_4_Next_Pos, byte Servo_5_Next_Pos, byte Servo_6_Next_Pos) {
  byte Servo_Not_Done_Counter = 6;
  boolean Servo_1_Done = false, Servo_2_Done = false, Servo_3_Done = false, Servo_4_Done = false, Servo_5_Done = false, Servo_6_Done = false;
  while(Servo_Not_Done_Counter != 0) {
    Check_Servo(Servo_1, Servo_1_Current_Pos, Servo_1_Next_Pos, Servo_1_Done, Servo_Not_Done_Counter);
    Check_Servo(Servo_2, Servo_2_Current_Pos, Servo_2_Next_Pos, Servo_2_Done, Servo_Not_Done_Counter);
    Check_Servo(Servo_3, Servo_3_Current_Pos, Servo_3_Next_Pos, Servo_3_Done, Servo_Not_Done_Counter);
    Check_Servo(Servo_4, Servo_4_Current_Pos, Servo_4_Next_Pos, Servo_4_Done, Servo_Not_Done_Counter);
    Check_Servo(Servo_5, Servo_5_Current_Pos, Servo_5_Next_Pos, Servo_5_Done, Servo_Not_Done_Counter);
    Check_Servo(Servo_6, Servo_6_Current_Pos, Servo_6_Next_Pos, Servo_6_Done, Servo_Not_Done_Counter);
  }
}
void Check_Servo(Servo &Current_Servo, byte &Servo_Current_Pos, byte Servo_Next_Pos, boolean &Servo_Done, byte &Servo_Not_Done_Counter) {
  if(Servo_Done) {
  } else if(Servo_Current_Pos == Servo_Next_Pos) {
    Servo_Done = true;
    Servo_Not_Done_Counter--;
    
  } else if(Servo_Current_Pos > Servo_Next_Pos) {
    One_Step_Servo(Current_Servo, --Servo_Current_Pos, Servo_Not_Done_Counter);
    
  } else if(Servo_Current_Pos < Servo_Next_Pos) {
    One_Step_Servo(Current_Servo, ++Servo_Current_Pos, Servo_Not_Done_Counter);
  }
}
void One_Step_Servo(Servo &Current_Servo, byte Servo_Pos, byte Active_Servos) {
  Current_Servo.write(Servo_Pos);
  delay(Speed / Active_Servos);
}
