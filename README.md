# Ethereum Roullette

## Dependencies
 - Solidity
 - Remix IDE
 - Javascript
 - Node.js (Express, Mysql2, Sequelize)
 - Truffle
 - Metamask
 
---
### Metamask 

 - Add Metamask as an extension to the browser 
 - Create and account
 - Connect account with Remix
 - Link tokens using: 
 Find a more detailed instructions [here](https://developers.rsk.co/tutorials/ethereum-devs/remix-and-metamask-with-rsk-testnet/)
 
 
## Instructions and Configuration

### Server (Back End)

- Once cloned the repository, 'server/app/config/db.config.js' should look like this:
``` bash
  module.exports = {
    HOST: "sql5.freemysqlhosting.net",
    USER: "sql5408535",
    PASSWORD: "CNFq9khMkW",
    DB: "sql5408535",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

```

this will run the server on a hosted server.

* navigate to 'client' directory
``` cd client ```
In the project directory, you can run the backend server:
#### Project setup
```npm install```
Runs package.json to install all the dependecies.
#### Run
```
node server.js
```

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.
The page will show you the message
{"message":"Welcome to Rou application by Lette."}


### Deploy contract
#### Locally
**if you have truffle install, follow these steps.**
- Make sure you have truffle installed, follow these [steos](https://www.trufflesuite.com/docs/truffle/getting-started/installation)
* on the src folder, 
- install dependecies:
```
npm install
```

- Compile the contract:
```
  truffle compile
```

- Migrate the contract:
```
  truffle migrate
```
- Navegate to: 'client/src/contracts'
- Open Roulette.json
- Copy the **ABI** and **Contract Address**
- Navigate to 'client/src/config.js' 
- Paste respectivelly 

#### REMIX
***DEPLOY CONTRACT ON REMIX***
- Copy contract 'contracts/Roulette.sol'
- Open [Remix](https://remix.ethereum.org/)
- Paste and Deploy contract on Remix, follow these [steps](https://remix-ide.readthedocs.io/en/latest/create_deploy.html)
- Copy **ABI** and **Contract Address**
- Navigate to 'client/src/config.js' on project 
- Paste respectivelly 

---

### Bot (Back End)

#### Steps to deploy the bot

* Make sure you are in a new **terminal window**
* Navigate to 'bot' directory
From source folder run:

```cd bot```
* Remove all files from bot directory and place in main directory
```npm install```
* Create .env file and copy contents of .env.example file into it
* Configure .env variables
* Run command 
```npm run start```
* On 'bot/index.js' update **abi** and **contract address** (copy these from 'client/src/config.js')

#### How does the bot work?
1.	Casino will deploy the contract
2.	A contract address will be deployed (we can copy that address directly into the front end). The contract address will always be the same. This is the address needed for players to join the game.
3.	After deploying contract the Casino must deposit money using the deposit money function (recommended amount is 1 ether)
4.	Contract can deposit any amount of money to contract at any time

#### After the contract is deployed:
1. Commitment Hash is called
2. Casino deposits 1 ether 
3. Player will join contract by switching account addresses 
4. Player will deposit their bet amount 
5. Player can now place their bet 
  - Player can remove or see their current bets on the table 
---

### Testing (Back End)
Steps for testing the contract;

1. Begin by installing truffle and a text editor, we used Atom.
2. After installing both systems, the user would have to import roullette.sol into the contracts folder and roulettetest.js into the test folder.
3. To begin the testing process, one must run the `testrpc` client from the terminal, which starts the server to connect the contract to the testing file.
4. Open a new terminal window and run `truffle develop` to deploy the contract and then use the command `test` to see all the available tests written in the javascript file.
5. There should be 6 available test files to view.

---

### Client (Front End)
* Make sure you are in a new **terminal window**
* Navigate to 'client' directory
From source folder run:

```cd client```

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
*Note: The user should be in the directory dapp/client to run npm start*

Runs the app in the development mode.\
Open [http://localhost:8081](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
