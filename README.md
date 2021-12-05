# posts auth api example

## Overview

This is an example api which demonstrates how to implement otp based authentication. It also includes apis for creating posts/comments etc. You can [read the documentation](./DOCUMENTATION.md) to get an understanding of the apis. 

## Installation 

1. Clone this repo:
```bash
git clone https://github.com/atTheShikhar/posts-api.git
```

2. Goto the cloned repo by:
```bash
cd posts-api
```

3. **Server Setup**
	1. Install all dependencies by: 
	```bash
	npm install
	```
	3. Goto `/src/configs` folder and create a file `config.env` and set the following with your own values:
	```
	PORT= <port on which you want to run the server>
	MONGO_CONNECTION_URI= <your mongodb connection url>
	JWT_KEY= <your jwt key (something stong)>
	CLIENT_ID= <your client id (from google playground)>
	CLIENT_SECRET= <your client secret (from google playground)>
	REFRESH_TOKEN= <your refresh token (from google playground)>
	GMAIL_ID= <gmail id which will be used for sending mails>
	```

	> **Database** : You can create your database using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and generate the connection string from there. **NOTE:** You may need to put your ip address to Atlas's whitelist to be able to acess the database, Read [this](https://docs.atlas.mongodb.com/security/ip-access-list/) for more details.

	> **Mailing System** : This api uses **gmail** account to provide mailing system, the related variables like `CLIENT_ID`, `CLIENT_SECRET` and `REFRESH_TOKEN` can be found at you google playgrounds panel. The complete guide to generate your tokens are given on [this blog post](https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1)


## Running

1. You can run the api using: 
```bash
npm start
```



