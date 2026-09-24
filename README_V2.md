# 서원게임 Electron V2

## 수정 내용
- 화면 클릭이 전혀 동작하지 않던 JavaScript 오류 수정
  - `bubbles` 배열과 `bubbles()` 함수의 이름 충돌이 원인이었습니다.
- 비누방울 데이터를 `bubbleParticles`, 함수는 `makeBubbles()`로 분리했습니다.
- Windows 빌드 중 `signing with signtool.exe` 단계에서 오래 정지하는 문제를 줄이기 위해
  `signAndEditExecutable: false`를 적용했습니다.
- 먼저 `dist\win-unpacked\SeowonGame.exe`를 만들고,
  이어서 단일 파일 `dist\SeowonGame.exe`를 만듭니다.
- 실행 중 F12를 누르면 개발자 도구를 열 수 있습니다.

## 테스트
1. 기존 dist 폴더는 build_windows.bat이 새로 생성합니다.
2. build_windows.bat 실행
3. 먼저 dist\win-unpacked\SeowonGame.exe 실행
4. 클릭/불꽃/달/악어 동작 확인
5. 최종 단일 파일은 dist\SeowonGame.exe
