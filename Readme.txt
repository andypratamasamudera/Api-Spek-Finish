npm install @nestjs/passport @nestjs/config @nestjs/mapped-types @nestjs/common @nestjs/core @nestjs/mongoose @nestjs/platform-express @nestjs/jwt class-validator typeorm mongoose dotenv passport-jwt

$ Register
Post = http://localhost:3000/users/auth/register

Body
{
    "username":"user",
    "email":"user@gmail.com",
    "password":"123456"
}

========================================================================================================

$ Login
Post = http://localhost:3000/users/auth/login

Body
{
    "email":"user@gmail.com",
    "password":"123456"
}

=========================================================================================================

$ GetUser
Post = http://localhost:3000/users/auth/user

Authorization(Bearer Token) = input token

=========================================================================================================

$ Create Article 
Post = http://localhost:3000/article/user/article

Body
{
  "title": "Name Book",
  "description": "Dess"
}

=========================================================================================================

$ GetBookUserId
Get = http://localhost:3000/article/user/article

Authorization(Bearer Token) = input token

=========================================================================================================

$ UpdateArticle
Put = http://localhost:3000/article/user/article/<IdBook>

Authorization(Bearer Token) = input token

Body
{
  "title": "UpdateBook",
  "description": "Update"
}

Note :  Akan Ada Validasi Dan Logika Jika Salah Satu Data Nya Null Untuk Respone 
=========================================================================================================

$ DeleteArticle
Delete = http://localhost:3000/article/user/article/<IdBook>

Authorization(Bearer Token) = input token

Body
{
  "title": "DeleteBook",
  "description": "Delete"
}

Note :  Akan Ada Validasi Dan Logika Jika Salah Satu Data Nya Null Untuk Respone 
