const int LED_PIN = 23;
const int BUTTON_PIN = 18;
const unsigned long DEBOUNCE_MS = 50;

bool requestOn = false;   // 버튼을 놓아도 유지할 요청 상태
int lastRaw = HIGH;      // 직전에 읽은 원래 입력
int stableButton = HIGH; // 안정된 입력
unsigned long lastChangeAt = 0;

void setup() {
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  digitalWrite(LED_PIN, LOW);
  Serial.begin(115200);
  // 시작할 때 이미 눌린 버튼은 새 요청으로 세지 않아요.
  lastRaw = digitalRead(BUTTON_PIN);
  stableButton = lastRaw;
  lastChangeAt = millis();
  Serial.println("READY: request OFF");
}

void loop() {
  int raw = digitalRead(BUTTON_PIN);
  unsigned long now = millis();

  // 원래 입력이 바뀌면 안정 시간을 다시 측정해요.
  if (raw != lastRaw) {
    lastChangeAt = now;
    lastRaw = raw;
  }

  // 같은 값이 50 ms 이상 유지되어야 새 입력으로 인정해요.
  if (now - lastChangeAt >= DEBOUNCE_MS && raw != stableButton) {
    int previousStable = stableButton;
    stableButton = raw;

    // 안정된 입력이 HIGH -> LOW로 변한 순간에만 반전!
    if (previousStable == HIGH && stableButton == LOW) {
      requestOn = !requestOn;
      digitalWrite(LED_PIN, requestOn ? HIGH : LOW);
      Serial.println(requestOn ? "Request ON" : "Request OFF");
    }
  }
}
