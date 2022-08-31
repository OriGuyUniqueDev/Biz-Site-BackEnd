# Biz Site - Server Side (nodeJS project)

The projects consist of two parts

    1. The Server Side
    2. The Frontend

This project is the server side of the project. I build an API to use the site's services and integrate it with the MongoDB database.

The API contains the actions below:

    1. Let the user register to the site
    2. Login to the site (with validation)
    3. Store data in the database (MongoDB)
    4. Add business card
    5. Get the business card
    6. Update the business card
    7. Delete the business card

## API Reference

#### Register

```http
POST  /api/register
```

The data comes from the front-end side.
The server side will validate the data and add an account to the database with the JWT token and display it to the user
the body of the request should consist of the following keys:

    1. name - full name of the user
    2. email - the email of the user will be used to login
    3. password - the password of the user to log in
    4. biz - is the user a business user? boolean value

![POST request screenshot](https://github.com/OriGuyUniqueDev/Biz-Site-BackEnd/blob/main/public/images/postRegister.png?raw=true)
#### Log in

```http
POST  /api/login
```

The data comes from the front-end side.
The server side will validate the data and log in to the user.
the server will return an object with the details of the user
the body of the request should consist of the following keys:

    1. email
    2. password


![POST login screenshot](https://github.com/OriGuyUniqueDev/Biz-Site-BackEnd/blob/main/public/images/postLignin.png?raw=true)

```http
GET  /api/login
```

At the POST method of the login, you received a JWT token you need to get the data.
the server will return an object with the details of the user that related to the given JWT token
the Authorization of the request should include the JWT token

![post request screenshot](https://github.com/OriGuyUniqueDev/Biz-Site-BackEnd/blob/main/public/images/getLogin.png?raw=true)

#### Add Business Card

```http
POST  /api/addBizCard
```

At the POST method of the login, you received a JWT token you need to add the data.
the server will add the card to the database and return the results
the Authorization of the request should include the JWT token
the body of the request should include the following keys:

    1. Business Name
    2. Description
    3. Address
    4. Telephone Number
    5. Url Image

![post request screenshot](https://github.com/OriGuyUniqueDev/Biz-Site-BackEnd/blob/main/public/images/postAddBizCard.png?raw=true)

#### Get Business Card

```http
GET  /api/getBizCard/:bizCardID
```

At the POST method of the login, you received a JWT token you need to add the data.
the server will add the card to the database and return the results
the Authorization of the request should include the JWT token
the body of the request should include the following keys:

    1. Business Name
    2. Description
    3. Address
    4. Telephone Number
    5. Url Image

| Parameter   | Type        | Description                                |
| :---------- | :---------- | :----------------------------------------- |
| `bizCardID` | `bizCardID` | **Required**. Id of business card to fetch |

![GET login screenshot](https://github.com/OriGuyUniqueDev/Biz-Site-BackEnd/blob/main/public/images/getBizCard.png?raw=true)

#### Update Business Card

```http
PUT  /api/updateBizCard/:bizCardID
```

At the POST method of the login, you received a JWT token you need to add the data.
the server will update the card details with the given key: value received from the request body
the Authorization of the request should include the JWT token
the body of the request should have the following keys:

    1. Key To Update
    2. Value

| Parameter   | Type        | Description                                |
| :---------- | :---------- | :----------------------------------------- |
| `bizCardID` | `bizCardID` | **Required**. Id of business card to fetch |

![PUT request screenshot](https://github.com/OriGuyUniqueDev/Biz-Site-BackEnd/blob/main/public/images/updateBizCard.png?raw=true)

#### Delete Business Card

```http
DELETE  /api/deleteBizCard/:bizCardID
```

At the POST method of the login, you received a JWT token you need to add the data.
the server will delete the card from the database with the given parameter (which needs to be the ID of the Card)
the Authorization of the request should include the JWT token

| Parameter   | Type        | Description                                |
| :---------- | :---------- | :----------------------------------------- |
| `bizCardID` | `bizCardID` | **Required**. Id of business card to fetch |

![DELETE request screenshot](https://github.com/OriGuyUniqueDev/Biz-Site-BackEnd/blob/main/public/images/deketeBizCard.png?raw=true)

#### Get User Business Card or Cards

```http
GET  /api/getUserBizCard/:bizCardID
```

At the POST method of the login, you received a JWT token you need to add the data.
the server will send the card or cards from the database with the given parameter (which needs to be the ID of the Card)
the Authorization of the request should include the JWT token

| Parameter   | Type        | Description                                |
| :---------- | :---------- | :----------------------------------------- |
| `bizCardID` | `bizCardID` | **Required**. Id of business card to fetch |

![GET User Business Card or Cards screenshot](https://github.com/OriGuyUniqueDev/Biz-Site-BackEnd/blob/main/public/images/getUserBixCard.png?raw=true)

#### Get All Cards

```http
GET  /api/getAllCards/
```

At the POST method of the login, you received a JWT token you need to add the data.
The server will send all the cards from the database.
The Authorization of the request should include the JWT token

![GET All Cards screenshot](https://github.com/OriGuyUniqueDev/Biz-Site-BackEnd/blob/main/public/images/getAllCards.png?raw=true)

The file '/requests.rest' is demo file with requests


## Run Locally

Clone the project

```bash
  git clone https://github.com/OriGuyUniqueDev/Biz-Site-BackEnd.git
```

Go to the project directory

```bash
  cd Biz-Site-BackEnd
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run server
```


## Authors

- [@OriGuyUniqueDev](https://github.com/OriGuyUniqueDev)


