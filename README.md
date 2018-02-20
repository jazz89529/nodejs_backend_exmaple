# nodejs_backend_exmaple (Postman)

## API測試(1)-Register

* HTTP Method: POST
* URL:http://localhost:3000/member
* Body(x-www-form-urlencoded):
  * name: test
  * email: test@gmail.com
  * password: test

## API測試(2)-Log In

* HTTP Method: POST
* URL:http://localhost:3000/member/login
* Body(x-www-form-urlencoded):
  * email: test@gmail.com
  * password: test
ps. headers 有token哦

## API測試(3)-Modify 

* HTTP Method: PUT
* URL:http://localhost:3000/member
# Headers:
  * Content-Type: application/x-www-form-urlencoded
  * token: 貼上剛剛登入取得的token
* Body(x-www-form-urlencoded):
  * name: test123123
  * password: test

## API測試(4)-Modify Image

* HTTP Method: PUT
* URL:http://localhost:3000/updateimg
# Headers:
  * Content-Type: application/form-data
* Body(form-data):
  * name: test123123
  * password: test
  * file: test.png(隨意上傳一張做測試)



