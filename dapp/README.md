# Rou
## by Lette

## MySql

To get started, you need to create a 'localhost' server with a database named 'rou'

- Make sure you have MySQL or MySQL Workbench installed. 
- if you have a macbook BigSur, download [this 8.0.21 version of MySQL Workbench](https://downloads.mysql.com/archives/workbench/)

- Follow these steps: [Configure MySQL Workbench](https://docs.bitnami.com/installer/infrastructure/lamp/configuration/configure-workbench/)

- Create a database called 'Rou'
```
CREATE DATABASE Rou;
```

- navigate to 
``` 
./server/app/config/db.config.js 
```
and modify to your host. For example mine is:
```
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "password",
    DB: "rou",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
```

Once completed those steps:
* navigate to 'client' directory
``` cd client ```

## Client (FrontEnd)

In the project directory, you can run the front-end server:

### Project setup
```
npm install
```
Runs package.json to install all the dependecies.

### Run
```
npm start
```

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

* Create a new terminal window or tab
* From the source folder, navigate to 'server' directory
``` cd server ```

## Server (BackEnd)

In the project directory, you can run the backend server:

### Project setup
```
npm install
```
Runs package.json to install all the dependecies.

### Run
```
node server.js
```
Runs the app in the development mode.\
Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

The page will show you the message
```
{"message":"Welcome to Rou application by Lette."}
```