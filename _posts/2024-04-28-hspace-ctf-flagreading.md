---
title: "[HSPACE CTF][Web] flagreading"
categories: writeups
permalink: /writeups/2024-04-28-hspace-ctf-flagreading
#venue: "UC San Francisco, Department of Testing"
date: 2024-04-28
#location: "San Francisco, CA, USA"
---

> 2024년 04월 28일에 진행되었던 HSPACE WAR CTF의 `flagreading` 문제 Write-Up 입니다.<br><br>대회 종료 및 Write-Up 제출 마감 후 공개전환되었습니다.


# flagreading

- 분야: Web
- 체감 난이도(1-10): 3 
- Flag: `hspace{catflag!!}`

## 풀이과정

### 1. 문제 페이지 분석

![](https://velog.velcdn.com/images/dhlife09/post/707dc3eb-15e5-4c79-a732-cf9b93ebd8b7/image.png)

문제 페이지에 접속하면 명령어를 입력할 수 있는 입력란과 실행 결과를 나타내는 화면으로 구성되어 있습니다.

### 2. 문제 코드 분석
![](https://velog.velcdn.com/images/dhlife09/post/bb7dcda8-1fbb-48e4-b18b-42e51b649012/image.png)


문제 파일을 분석해보면 Flask로 구성된 웹페이지이며, `subprocess` 모듈을 통해 사용자가 입력한 명령어를 실행하고 있습니다.

1. 사용자가 루트페이지(`/`)에 접속하면 명령어를 입력할 수 있는 `index.html`을 렌더링합니다.
2. 사용자가 명령어를 입력 후 Run 버튼을 누르면 `/execute_command` 페이지로 데이터가 전송됩니다.
3. `/execute_command` 페이지에서는 명령어 도배를 방지하기 위해 30초 전에 명령어를 입력한 경우 대기하도록 유도하고, 그렇지 않은 경우 유효성 검사를 위해 `is_valid_command` 함수를 실행합니다.
4. 코드 위에 blacklist 지정하는 코드(`blacklist = set('flag/')`)가 있어, blacklist는 "`f`", "`l`", "`a`", "`g`", "`/`"로 구성되어 있습니다. `flag/` 를 입력하면 blacklist에 해당하는 것이 아니라, 단어가 하나라도 포함된 경우(예: `cat`) blacklist에 해당되어, `is_valid_command` 함수에서는 `False`를 리턴하게 됩니다.
5. 아까 `/execute_command` URI 부분에서 `if not is valid(command)`로 확인하게 되는데, blacklist에 해당한 경우에는 `False`를 리턴받으므로, `not False` -> `True`가 되어 `"try harder!"` 라는 메시지를 리턴하게 됩니다. blacklist에 해당하지 않은 경우에는 `True`를 리턴받으므로, `not True` -> `False`가 되어, 해당 구문이 실행되지 않습니다.
6. blacklist에 해당하지 않아 `"try harder!"`라는 구문이 출력되지 않은 경우, 명령어를 실행하기 위해 사용자가 입력한 값을 `execute_command`라는 함수로 보내게 됩니다.
7. `execute_command` 함수에서는 `subprocess` 모듈을 통해 리눅스에서 명령어를 실행하고 `output`을 리턴합니다. 리턴된 값은 사용자가 명령어를 입력한 페이지(`/index.html`)에 보이게 됩니다.
8. 다시 `/execute_command`에서는 아까 함수에서 리턴해준 값을 리턴하게 됩니다. 그리고 명령어 반복 실행을 방지하기 위해 현재 시간을 기록합니다.

### 풀이 방법
- blacklist("`f`", "`l`", "`a`", "`g`", "`/`") 단어가 포함되지 않은 상태에서 flag.txt 내용을 읽어내 플래그를 얻으면 풀이할 수 있습니다.

### 풀이 과정
![](https://velog.velcdn.com/images/dhlife09/post/8a0ec45d-d129-4579-afff-18a68c2c0700/image.png)

먼저 `ls` 명령어는 `l`이 blacklist에 포함되어 사용할 수 없으므로, `dir` 명령어를 통해 아래의 파일, 디렉토리가 존재하는 것을 알 수 있습니다. 

파일 리스트를 살펴보면 `flag.txt` 파일이 존재하는 것을 확인할 수 있습니다.
- TEST.TXT
- TEST.txt
- /app
- docker-compose.yml
- dockerfile
- flag.txt
- q.sss

이제 blacklist에 포함된 단어들을 사용하지 않고 `flag.txt` 파일을 읽어야 합니다.

파일 내용을 읽는 커맨드는 대표적으로 `cat`, `tail`, `less`, `more`, `head` 등이 있으며, blacklist에 걸리지 않는 커맨드는 `more`가 있습니다.

`more` 명령어는 `more filename.txt` 와 같이 입력하면 `filename.txt`라는 파일의 내용을 알 수 있습니다.

어떤 명령어를 사용할 것인지 선택했으므로 파일명을 우회해서 입력해야했습니다.

단어가 한개라도 포함되면 명령어 실행이 불가하다는 점이 중요했습니다.

### 리눅스 정규식

이를 우회하기 위해 리눅스의 정규식을 이용했습니다.

`????.txt` 또는 `****.txt` 라는 정규식을 사용하면 `flag`라는 단어를 사용하지 않고, 간접적으로 입력할 수 있게 됩니다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99BC194C5B650B1031)
출처: https://rfriend.tistory.com/373

|`????.txt`|`****.txt`|
|----|----|
|![](https://velog.velcdn.com/images/dhlife09/post/4361a855-4f3e-4de9-a6bd-05720fa8404b/image.png)|![](https://velog.velcdn.com/images/dhlife09/post/530dbed7-0dd1-477f-ba9b-e70daac666ea/image.png)|


이렇게 리눅스의 정규식을 활용해 flag를 얻을 수 있었습니다.

## 후기
리눅스 정규식 개념을 활용하면 쉽게 풀 수 있었던 간단한 문제였습니다.

리눅스 기초에 대해서도 정리와 복습을 꾸준히 해야겠다는 생각이 들었습니다.
