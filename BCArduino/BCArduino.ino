//Библиотеки
#include <Servo.h>

//Директивы
//Начальные положения сервоприводов
#define Servo_1_Init_Pos 80
#define Servo_2_Init_Pos 80
#define Servo_3_Init_Pos 80
#define Servo_4_Init_Pos 95
#define Servo_5_Init_Pos 30
#define Servo_6_Init_Pos 150
//Границы
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

//Инициализация сервоприводов
Servo Servo_1;
Servo Servo_2;
Servo Servo_3;
Servo Servo_4;
Servo Servo_5;
Servo Servo_6;

//Текущие положения сервоприводов
int Servo_1_Pos, Servo_2_Pos, Servo_3_Pos, Servo_4_Pos, Servo_5_Pos, Servo_6_Pos;

//Предыдущие положения сервоприводов
int Servo_1_Prev_Pos, Servo_2_Prev_Pos, Servo_3_Prev_Pos, Servo_4_Prev_Pos, Servo_5_Prev_Pos, Servo_6_Prev_Pos;
//История положений сервоприводов
int Servo_1_Story_Pos[50], Servo_2_Story_Pos[50], Servo_3_Story_Pos[50], Servo_4_Story_Pos[50], Servo_5_Story_Pos[50], Servo_6_Story_Pos[50];

//Прочие переменные
int New_Angle;
String Data_In = "";
int Speed = 20;
int Index = 0;

void setup() {
  //Инициализация сервоприводов
  Servo_1.attach(2);
  Servo_2.attach(3);
  Servo_3.attach(4);
  Servo_4.attach(5);
  Servo_5.attach(6);
  Servo_6.attach(7);
  
  //Открытие последовательного порта
  Serial.begin(9600);
  
  //Начальные положения сервоприводов
  toInitial();
}

void loop(){
  //Проверка наличия данных в последовательном порте
  if (Serial.available()) {
    //Чтение данный из последовательного порта
    Data_In = Serial.readString();
    
    //Обработчик первого сервопривода 
    if (Data_In.startsWith("S1")){
      New_Angle = constrain(parseAngle(Data_In, 2), Bottom_Limit, Top_Limit);
      Servo_1_Pos = map(New_Angle, Bottom_Limit, Top_Limit, Servo_1_Bottom_Limit, Servo_1_Top_Limit);
      moveServoInCourse(Servo_1, Servo_1_Prev_Pos, Servo_1_Pos);
      Servo_1_Prev_Pos = Servo_1_Pos;
    } 
    
    //Обработчик второго сервопривода 
    if (Data_In.startsWith("S2")){
      New_Angle = constrain(parseAngle(Data_In, 2), Bottom_Limit, Top_Limit);
      Servo_2_Pos = map(New_Angle, Bottom_Limit, Top_Limit, Servo_2_Bottom_Limit, Servo_2_Top_Limit);
      moveServoInCourse(Servo_2, Servo_2_Prev_Pos, Servo_2_Pos);
      Servo_2_Prev_Pos = Servo_2_Pos;
    }
     
    //Обработчик третьего сервопривода 
    if (Data_In.startsWith("S3")){
      New_Angle = constrain(parseAngle(Data_In, 2), Bottom_Limit, Top_Limit);
      Servo_3_Pos = map(New_Angle, Bottom_Limit, Top_Limit, Servo_3_Bottom_Limit, Servo_3_Top_Limit);
      moveServoInCourse(Servo_3, Servo_3_Prev_Pos, Servo_3_Pos);
      Servo_3_Prev_Pos = Servo_3_Pos;
    }

     //Обработчик четвертого сервопривода 
    if (Data_In.startsWith("S4")){
      New_Angle = constrain(parseAngle(Data_In, 2), Bottom_Limit, Top_Limit);
      Servo_4_Pos = map(New_Angle, Bottom_Limit, Top_Limit, Servo_4_Bottom_Limit, Servo_4_Top_Limit);
      moveServoInCourse(Servo_4, Servo_4_Prev_Pos, Servo_4_Pos);
      Servo_4_Prev_Pos = Servo_4_Pos;
    } 
    
    //Обработчик пятого сервопривода 
    if (Data_In.startsWith("S5")){
      New_Angle = constrain(parseAngle(Data_In, 2), Bottom_Limit, Top_Limit);
      Servo_5_Pos = map(New_Angle, Bottom_Limit, Top_Limit, Servo_5_Bottom_Limit, Servo_5_Top_Limit);
      moveServoInCourse(Servo_5, Servo_5_Prev_Pos, Servo_5_Pos);
      Servo_5_Prev_Pos = Servo_5_Pos;
    }
     
    //Обработчик шестого сервопривода 
    if (Data_In.startsWith("S6")){
      New_Angle = constrain(parseAngle(Data_In, 2), Bottom_Limit, Top_Limit);
      Servo_6_Pos = map(New_Angle, Bottom_Limit, Top_Limit, Servo_6_Bottom_Limit, Servo_6_Top_Limit);
      moveServoInCourse(Servo_6, Servo_6_Prev_Pos, Servo_6_Pos);
      Servo_6_Prev_Pos = Servo_6_Pos;
    }

    //Обработчик регулировки скорости
    if (Data_In.startsWith("SS")){
      Speed = map(parseAngle(Data_In, 2), Bottom_Limit, Top_Limit, Speed_Bottom_Limit, Speed_Top_Limit);
    } 
    
    //Обработчик сохранения
    if (Data_In == "SAVE") {
      Servo_1_Story_Pos[Index] = Servo_1_Pos;
      Servo_2_Story_Pos[Index] = Servo_2_Pos;
      Servo_3_Story_Pos[Index] = Servo_3_Pos;
      Servo_4_Story_Pos[Index] = Servo_4_Pos;
      Servo_5_Story_Pos[Index] = Servo_5_Pos;
      Servo_6_Story_Pos[Index] = Servo_6_Pos;
      Index++;             
    }
    if (Data_In == "RUN") {
      runServos();
    }
    //Обработчик сброса
    if ( Data_In == "RESET") {
      reset();
    }
    if (Data_In == "INITIAL") {
      reset();
      toInitial();
    }
  }
}

//Сброс в начальные значения
void toInitial() {
  Servo_1_Prev_Pos = Servo_1_Init_Pos;
  Servo_1.write(Servo_1_Prev_Pos);
  Servo_2_Prev_Pos = Servo_2_Init_Pos;
  Servo_2.write(Servo_2_Prev_Pos);
  Servo_3_Prev_Pos = Servo_3_Init_Pos;
  Servo_3.write(Servo_3_Prev_Pos);
  Servo_4_Prev_Pos = Servo_4_Init_Pos;
  Servo_4.write(Servo_4_Prev_Pos);
  Servo_5_Prev_Pos = Servo_5_Init_Pos;
  Servo_5.write(Servo_5_Prev_Pos);
  Servo_6_Prev_Pos = Servo_6_Init_Pos;
  Servo_6.write(Servo_6_Prev_Pos);
}
void reset() {
  memset(Servo_1_Story_Pos, 0, sizeof(Servo_1_Story_Pos));
  memset(Servo_2_Story_Pos, 0, sizeof(Servo_2_Story_Pos));
  memset(Servo_3_Story_Pos, 0, sizeof(Servo_3_Story_Pos));
  memset(Servo_4_Story_Pos, 0, sizeof(Servo_4_Story_Pos));
  memset(Servo_5_Story_Pos, 0, sizeof(Servo_5_Story_Pos));
  memset(Servo_6_Story_Pos, 0, sizeof(Servo_6_Story_Pos));
  Index = 0;
}

//Парсинга угла из строки
int parseAngle(String Data, int Prefix_Length) {
  //Получение значения без префикса
  String SubData = Data.substring(Prefix_Length, Data.length());
  //Приведение угла к числу
  return SubData.toInt();
}

//Движение сервопривода
void moveServoInCourse(Servo &Current_Servo, int Servo_Prev_Pos, int Servo_Pos) {
  if (Servo_Prev_Pos > Servo_Pos) {
    for ( int i = Servo_Prev_Pos; i >= Servo_Pos; i--) {
      Current_Servo.write(i);
      delay(Speed);
    }
  } else if (Servo_Prev_Pos < Servo_Pos) {
    for ( int i = Servo_Prev_Pos; i <= Servo_Pos; i++) {   
      Current_Servo.write(i);
      delay(Speed);
    }
  }
}
//Последовательное движение всех сервоприводов
void runServosConsistently(int index) {
  moveServoInCourse(Servo_1, Servo_1_Story_Pos[index], Servo_1_Story_Pos[index + 1]);
  moveServoInCourse(Servo_2, Servo_2_Story_Pos[index], Servo_2_Story_Pos[index + 1]);
  moveServoInCourse(Servo_3, Servo_3_Story_Pos[index], Servo_3_Story_Pos[index + 1]);
  moveServoInCourse(Servo_4, Servo_4_Story_Pos[index], Servo_4_Story_Pos[index + 1]);
  moveServoInCourse(Servo_5, Servo_5_Story_Pos[index], Servo_5_Story_Pos[index + 1]);
  moveServoInCourse(Servo_6, Servo_6_Story_Pos[index], Servo_6_Story_Pos[index + 1]);
}
//Параллельное движение всех сервоприводов
void runServosParallel() {

}
//Движение сервоприводов
void runServos() {
  //Записываем начальные положения, как конечные для сервоприводов 
  Servo_1_Story_Pos[Index] = Servo_1_Story_Pos[0];
  Servo_2_Story_Pos[Index] = Servo_2_Story_Pos[0];
  Servo_3_Story_Pos[Index] = Servo_3_Story_Pos[0];
  Servo_4_Story_Pos[Index] = Servo_4_Story_Pos[0];
  Servo_5_Story_Pos[Index] = Servo_5_Story_Pos[0];
  Servo_6_Story_Pos[Index] = Servo_6_Story_Pos[0];
  
  while (Data_In != "RESET" || Data_In != "INITIAL") {
    for (int i = 0; i <= Index - 1; i++) {
      if (Serial.available()) {     
        Data_In = Serial.readString();  
        
        while (Data_In == "PAUSE") {         
          if (Serial.available()) {
            Data_In = Serial.readString();
          }
        }
        
        if ( Data_In == "RESET" || Data_In == "INITIAL") {     
          break;
        }
        
        if (Data_In.startsWith("SS")) {
          Speed = map(parseAngle(Data_In, 2), Bottom_Limit, Top_Limit, Speed_Bottom_Limit, Speed_Top_Limit);
        }
      }
      runServosConsistently(i);
    }
    
    if ( Data_In == "RESET" || Data_In == "INITIAL") {     
      break;
    }
  }
}
