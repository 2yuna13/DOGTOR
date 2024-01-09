<p align="center"> 
  <img src="https://github.com/2yuna13/DOGTOR/assets/121540949/51026dbc-2658-4ac5-bfda-cf8b09db08ac" width="100px" height="100px">
</p>

<h1 align="center"> DOCTOR </h1>
<h3 align="center"> AI 반려동물 피부질환 예측 사이트</h3>
<h5 align="center"> Elice AI track-7 AI Project -  (2023 08 11) </h5>

<h3><a href="http://kdt-ai7-team04.elicecoding.com/" target="blank" >DOCTOR 바로가기</a></h3>

<!-- TABLE OF CONTENTS -->
<h2 id="table-of-contents"> :book: Table of Contents</h2>

<details open="open">
  <summary>목차</summary>
  <ol>
    <li><a href="#about-project"> ➤ DOCTOR 소개</a></li>
    <li><a href="#available"> ➤ 사용 기술</a></li>
    <li><a href="#getting-started"> ➤ 설치 방법</a></li>
    <li><a href="#login"> ➤ 로그인 </a></li>
    <li><a href="#register"> ➤ 회원가입 </a></li>
    <li><a href="#main"> ➤ 메인 페이지 </a></li>
    <li><a href="#ai"> ➤ AI 반려동물 피부질환 예측 </a></li>
    <li><a href="#hospital"> ➤ 동물병원 찾기 </a></li>
    <li><a href="#vet-list"> ➤ 실시간 상담 수의사 리스트 </a></li>
    <li><a href="#chat"> ➤ 실시간 상담(채팅) </a></li>
    <li><a href="#comunnity"> ➤ 커뮤니티 </a></li>
    <li><a href="#mypage"> ➤ 마이페이지</a></li>
    <li><a href="#admin"> ➤ 관리자페이지</a></li>
    <li><a href="#structure"> ➤ 폴더 구조</a></li>
    <li><a href="#credits"> ➤ 개발자</a></li>
    <li><a href="#license"> ➤ 라이센스</a></li>
  </ol>
</details>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- ABOUT THE PROJECT -->
<h2 id="about-project"> :pencil: DOCTOR 소개</h2>

1. **기획 의도**

   1. **조사할 문제, 조사할 문제가 흥미로운 이유**
      `반려동물 양육 인구 비율은 대한민국 인구 비율의 30%에 육박한다. 이에 따라 반려동물 헬스케어 산업에 대한 관심이 높아지고 있다. 피부 질환은 반려과 반려묘의 치료비 발생 원인 순위에서 1위를 차지한다. 이는 정기 건강 검진보다도 높은 순위이다. 반려동물의 의료비는 반려동물 입양 시 중요하게 고민되는 요소이다. 따라서 반려동물 질환에 대한 오진 및 과잉 진단 문제를 해결하기 위해 AI 보조 진료 서비스 기술의 필요성이 확대되고 있다.`
   2. **어떤 사용자의, 어떤 문제를 해결하는지**

      ➡️ `반려동물을 키우는 사람들이, 반려동물의 피부 질환이 발생한 경우 초기에 증상 유무를 빠르게 판단해 신속한 병원 내원 및 진료를 할 수 있도록 하기 위해 개발`

   3. **프로젝트가 제공하는 기대 효과와 활용 방안**

      ➡️ `피부과 비전공 수의사 진단 보조로 활용`

      - `병원 진료 후 처방에 대한 차도 확인 보조로 활용`
      - `건강 상태를 주기적으로 확인하여 질병 예방에 기여`
      - `질환 초기 발견으로 조기 병원 내원 유도`

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- ABOUT THE PROJECT -->
<h2> :pencil: 데이터 플로우</h2>

<img src="/uploads/ed42c5d76d79944c33d5fead6bc8bd6b/데이터.png" width="750px">

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2> :pencil: ERD </h2>

<img src="/uploads/ce1d991d5e8e81a3be276c4055d9d747/erds.png" width="750px">

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- PROJECT FILES DESCRIPTION -->
<h2 id="available"> :floppy_disk: 사용 기술</h2>

<h3>Front</h3>
<ul>
  <li><b>JavaScript</b></li>
  <li><b>TypeScript</b> </li>
  <li><b>React</b> </li>
  <li><b>React-Query</b> </li>
  <li><b>KakaoMap-API</b> </li>
  <li><b>Socket.io</b> </li>
  <li><b>Styled-Component</b> </li>
  <li><b>MUI</b></li> 
</ul>

<h3>Back</h3>
<ul>
  <li><b>JavaScript</b></li>
  <li><b>TypeScript</b> </li>
  <li><b>NodeJs</b></li>
  <li><b>Express</b></li>
  <li><b>Socket.io</b></li>
  <li><b>MySql</b></li>
  <li><b>prisma</b></li>
  <li><b>passport</b></li>
  <li><b>jwt</b></li>
</ul>

<h3>AI</h3>
<ul>
  <li><b>Flask</b></li>
  <li><b>TensorFlow</b> </li>
</ul>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- GETTING STARTED -->
<h2 id="getting-started"> :book: 설치 방법</h2>

<p>FrontEnd 서버 실행</p>
  <pre><code>
    bash
    yarn
    yarn dev
  </code></pre>
<p>BackEnd 서버 실행</p>
   <pre><code>
    bash
    yarn
    yarn start
    </code></pre>
    
![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="login"> :small_orange_diamond: 로그인</h2>

<p>이메일과 비밀번호를 입력하여 로그인합니다.</p>
<p>Google 아이디를 통한 소셜로그인이 가능합니다.</p>

<p align="center">

![로그인](/uploads/00940cad2cb2f4164ca17b601d4fb410/로그인.mp4)

<!--gif/DFS.gif-->
<!--height="382px" width="737px"-->
</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="register"> :small_orange_diamond: 회원가입</h2>

<p>이메일, 비밀번호, 닉네임을 입력하여 회원을 등록합니다.</p>

<p align="center">

![회원가입](/uploads/bb728a5692c2556b54f2fa6f64cdf0f5/회원가입.mp4)

</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="main"> :small_orange_diamond: 메인 페이지</h2>

<p>DOCTOR 서비스를 소개해주는 메인페이지 입니다.</p>

<p align="center">

![메인페이지](/uploads/7dfcc6be5c725b8574419b6207496903/메인페이지.mp4)

</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="ai"> :small_orange_diamond: AI 반려동물 피부질환 예측</h2>

<p>인공지능을 통해 반려동물 피부질환을 예측해주는 서비스입니다.</p>

<p align="center">

![AI](/uploads/f566bc41579cfc01b8c197c0ba372cf7/AI.mp4)

</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="hospital"> :small_orange_diamond: 동물병원 찾기</h2>

<p>카카오맵과 GeoLocation을 통해 내 주변 동물병원을 찾을 수 있고 검색을 통해 동물병원 정보를 얻을 수 있습니다.</p>

<p align="center">

![동물병원찾기](/uploads/54752d88c98449a6141b8b061f9856dc/동물병원찾기.mp4)

</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="vet-list"> :small_orange_diamond: 실시간 상담 수의사 리스트</h2>

<p>DOCTOR에 등록한 수의사들을 지역별로 살펴볼 수 있습니다.</p>

<p align="center">

![실시간상담신청](/uploads/5a937ee323632b0c6b663bc81f447543/실시간상담신청.mp4)

</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="chat"> :small_orange_diamond: 실시간 상담(채팅)</h2>

<p>전문적인 지식들을 가지고 있는 수의사와 실시간 채팅을 할 수 있습니다.</p>

<p align="center">

![실시간채팅](/uploads/d14567860b44a0237bce69293f5cc20c/실시간채팅.mp4)

</p>
<p align="center">

![상담만족도조사](/uploads/c693fe51ad96f69aa3253b4e7ef340c3/상담만족도조사.mp4)

</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="comunnity"> :small_orange_diamond: 커뮤니티 - 조회</h2>

<p>카테고리별 커뮤니티 조회가 가능합니다.</p>

<p align="center">

![커뮤니티조회](/uploads/0a346a3eaedb67c61924177f8fd403a8/커뮤니티조회.mp4)

</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id=""> :small_orange_diamond: 커뮤니티 - 작성</h2>

<p>커뮤니티를 작성하는 페이지 입니다.</p>

<p align="center">

![커뮤니티등록](/uploads/758c8da4eb2e35a5867a38a1c83a086a/커뮤니티등록.mp4)

</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id=""> :small_orange_diamond: 커뮤니티 - 댓글</h2>

<p>커뮤니티 댓글을 달아 여러 사람들과 소통이 가능합니다.</p>

<p align="center">

![커뮤니티댓글](/uploads/db8a965a5ac0da2575bbb02fe7b46dbe/커뮤니티댓글.mp4)

</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id=""> :small_orange_diamond: 커뮤니티 - 신고</h2>

<p>부적절한 내용이 담긴 커뮤니티 내용을 신고하는 기능입니다.</p>

<p align="center">

![커뮤니티신고](/uploads/a47679f7bcea790ae2c7a4f57c8a9b7d/커뮤니티신고.mp4)

</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="mypage"> :small_orange_diamond: 마이페이지</h2>

<p>내 정보조회 및 수의사인증이 가능한 페이지입니다.</p>

<p align="center">

![마이페이지](/uploads/c8cb990016aa2bd2f230191c89d01030/마이페이지.mp4)

</p>

<p align="center">

![수의사인증](/uploads/54525e42edfb412571d418ff6e6006fe/수의사인증.mp4)

</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="admin"> :small_orange_diamond: 관리자페이지 - 유저관리</h2>

<p>회원가입한 유저들의 정보와 유저상태를 변경할 수 있는 페이지 입니다.</p>

<p align="center">

![관리자페이지-유저관리](/uploads/c0711d4409e9de8d69080fe90082082b/관리자페이지-유저관리.mp4)

</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id=""> :small_orange_diamond: 관리자페이지 - 수의사인증</h2>

<p>수의사 인증신청 내용을 확인하고 인증해주는 페이지 입니다.</p>

<p align="center">

![관리자페이지-수의사인증](/uploads/7e4e6431486e1b4129452183ca3475f1/관리자페이지-수의사인증.mp4)

</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id=""> :small_orange_diamond: 관리자페이지 - 신고관리</h2>

<p>커뮤니티 신고내용을 확인하고 내용에 부합한 처리를 해주는 페이지 입니다.</p>

<p align="center">

![관리자페이지-커뮤니티신고](/uploads/beaae361b00f2e6bfaba98eca915cbf1/관리자페이지-커뮤니티신고.mp4)

</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- structure -->
<h2 id="structure"> :small_orange_diamond: 폴더 구조</h2>

<pre><code>
📦src
 ┣ 📂admins
 ┃ ┣ 📂controllers
 ┃ ┃ ┗ 📜adminController.ts
 ┃ ┣ 📂dtos
 ┃ ┃ ┗ 📜adminDto.ts
 ┃ ┣ 📂repositories
 ┃ ┃ ┗ 📜adminRepository.ts
 ┃ ┣ 📂routers
 ┃ ┃ ┗ 📜adminRouter.ts
 ┃ ┗ 📂services
 ┃ ┃ ┗ 📜adminService.ts
 ┣ 📂chats
 ┃ ┣ 📂controllers
 ┃ ┃ ┗ 📜chatController.ts
 ┃ ┣ 📂dtos
 ┃ ┃ ┗ 📜chatDto.ts
 ┃ ┣ 📂repositories
 ┃ ┃ ┗ 📜chatRepository.ts
 ┃ ┣ 📂routers
 ┃ ┃ ┗ 📜chatRouter.ts
 ┃ ┣ 📂services
 ┃ ┃ ┗ 📜chatService.ts
 ┃ ┗ 📂sockets
 ┃ ┃ ┗ 📜chatSocket.ts
 ┣ 📂communities
 ┃ ┣ 📂controllers
 ┃ ┃ ┣ 📜commentController.ts
 ┃ ┃ ┗ 📜postController.ts
 ┃ ┣ 📂dtos
 ┃ ┃ ┣ 📜commentDto.ts
 ┃ ┃ ┗ 📜postDto.ts
 ┃ ┣ 📂repositories
 ┃ ┃ ┣ 📜commentRepository.ts
 ┃ ┃ ┗ 📜postRepository.ts
 ┃ ┣ 📂routers
 ┃ ┃ ┣ 📜commentRouter.ts
 ┃ ┃ ┗ 📜postRouter.ts
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📜commentService.ts
 ┃ ┃ ┗ 📜postService.ts
 ┃ ┗ 📜.gitkeep
 ┣ 📂diseases
 ┃ ┣ 📂controllers
 ┃ ┃ ┗ 📜diseaseController.ts
 ┃ ┣ 📂repositories
 ┃ ┃ ┗ 📜diseaseRepository.ts
 ┃ ┣ 📂routers
 ┃ ┃ ┗ 📜diseaseRouter.ts
 ┃ ┣ 📂services
 ┃ ┃ ┗ 📜diseaseService.ts
 ┃ ┗ 📜.gitkeep
 ┣ 📂middlewares
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜passport.ts
 ┃ ┣ 📜permission.ts
 ┃ ┣ 📜upload.ts
 ┃ ┗ 📜validateDto.ts
 ┣ 📂users
 ┃ ┣ 📂controllers
 ┃ ┃ ┗ 📜userController.ts
 ┃ ┣ 📂dtos
 ┃ ┃ ┗ 📜userDto.ts
 ┃ ┣ 📂repositories
 ┃ ┃ ┗ 📜userRepository.ts
 ┃ ┣ 📂routers
 ┃ ┃ ┗ 📜userRouter.ts
 ┃ ┗ 📂services
 ┃ ┃ ┗ 📜userService.ts
 ┣ 📂utils
 ┃ ┣ 📜constant.ts
 ┃ ┣ 📜mail.ts
 ┃ ┣ 📜scheduledTask.ts
 ┃ ┗ 📜winston.ts
 ┗ 📜app.ts
 </code></pre>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- CREDITS -->
<h2 id="credits"> :scroll: Credits</h2>

| 개발자 | 이름   |
| ------ | ------ |
| Front  | 김한빈 |
| Front  | 유승제 |
| Front  | 조정택 |
| Back   | 이연아 |
| Back   | 변상기 |
| Back   | 황준성 |

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- CREDITS -->
<h2 id="license"> :scroll: 라이센스</h2>

본 프로젝트에서 제공하는 모든 코드 등의는 저작권법에 의해 보호받는 ㈜엘리스의 자산이며, 무단 사용 및 도용, 복제 및 배포를 금합니다.

Copyright 2023 엘리스 Inc. All rights reserved.
