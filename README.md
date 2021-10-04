# Auth Service

> login & user/role management example

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/pxI4fXrNChI/0.jpg)](https://www.youtube.com/watch?v=pxI4fXrNChI)


![login page](./login.png)

## Backend/Frontend INFO

- Backend : express + jwt
- Frontend : reactjs

## backend test

```
$ curl --location --request POST 'http://localhost:3000/login' \
--header 'Content-Type: application/json' \
--data-raw '{"user_id":"lahuman", "password": "1234"}'


---
Result : 
{"status":"success","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibGFodW1hbiIsImRlc2MiOm51bGwsInJvbGUiOlsiUk9MRV9URVNUMSIsIlJPTEVfVEVTVDIiXSwiaWF0IjoxNjMyMzAwMDI5LCJleHAiOjE2MzIzMDAzMjl9.8UuMP_ah-xnVZhDJg1QoHtWvXLfjrSzYHlWxAtZGNRM"}
```

## 참고 자료

- https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
- https://www.javatpoint.com/how-to-make-a-navigation-bar-in-html
- https://codepen.io/chris22smith/pen/NWWRWxJ