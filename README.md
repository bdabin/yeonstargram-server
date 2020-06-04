# Yeonstargram express SERVER

서버 실행
```
  npm start
```

## 회원관련

### [GET] /account

Request

```
 {

 }
```

Response

```
  {
   email,
   username,
   phone 
  }
```

200 : 성공
404 : 로그인 중이 아닏 때


### [POST] /account/login

Request

```
  {
    email:'',
    password:''
  }
```

Response

```
  {

  }
```

200 : 성공


### [POST] /account/join

```
  {
    email : '',
    password : '',
    username : '',
    phone : ''
  }
```

200 : 성공
400 : 이미 가입된 이메일


### DB 관계 구조

![erd_yeonstargram](./erd.png)