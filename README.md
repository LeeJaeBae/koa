# 블로그 프로젝트

## _Koa_ 프레임워크를 활용한 블로그 프로젝트.

1. 프로젝트 시작
   - Yarn init
   - eslint 설치
   - src/index.js 생성
   - koa 설치
   - nodemon설치로 서버 최신화
2. 라우트 생성
   - koa-router 설치
     > parameter ":" & query "?"
3. 컨트롤러 제작
   - HTTP method 사용
4. DB 연동
   - mongodb 설치
   - .env 설치 후 포트, 몽고 URI 설정
   - mongoose를 이용하여 데이터베이스 연결
     > 터미널 mongo 명령어 확인
   - 데이터베이스 생성
   - 컨트롤러를 이용한 데이터 관리/검색
   - 요청 검증
   - 페이지네이션
     > 페이지 구현, 마지막 페이지 헤더설정, body 글자 갯수 제한
