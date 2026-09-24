# 서원 게임 No1. 추석 불꽃놀이 - Electron 버전

## 최종 사용자
빌드된 `SeowonGame.exe`만 더블클릭하면 됩니다.
Python은 필요하지 않습니다.

게임은 현재 Windows 사용자의 홈 폴더를 기준으로 아래 위치들을 자동 탐색합니다.

1. OneDrive\문서\카카오톡 받은 파일\게임공유
2. OneDrive\Documents\카카오톡 받은 파일\게임공유
3. Documents\카카오톡 받은 파일\게임공유
4. 문서\카카오톡 받은 파일\게임공유

달을 클릭할 때 사진/동영상을 파일명 순서대로 보여줍니다.

## 개발자 PC에서 빌드
Node.js LTS를 설치한 뒤 `build_windows.bat` 실행.
완료 파일: `dist\SeowonGame.exe`

## 개발자 PC에도 아무것도 설치하지 않고 빌드
이 프로젝트를 GitHub 저장소에 올리면 포함된
`.github/workflows/build-windows.yml`이 Windows 서버에서 자동 빌드합니다.
GitHub Actions의 Artifacts에서 `SeowonGame.exe`를 받을 수 있습니다.
