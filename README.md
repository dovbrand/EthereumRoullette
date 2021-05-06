# Ethereum Roullette

## Dependencies
 - Solidity
 - Javascript
 - Node.js (Express, Mysql2, Sequelize)
 - Truffle
 - Ganache
 - Metamask
 
---

## Clone and Configuring Dapp
1. Clone this repository
2. Download [Truffle](https://www.trufflesuite.com/truffle) 
3. Download [Ganache](https://www.trufflesuite.com/ganache)
4. [Configure](https://www.trufflesuite.com/docs/ganache/reference/ganache-settings) Ganache using ```truffle-config.js``` from src directory

### Metamask 

 - [Add](https://metamask.io/download.html) Metamask as an extension to your browser 
 - Create an account
 - [Configure](https://youtu.be/nUEBAS5r4Og?t=139) Metamask with Ganache
---

## Deploy the contract

**In the src directory** 

1. install dependecies:
```
npm install
```

2. Compile the contract:
```
  truffle compile --all
```

3. Deploy the contract:
```
  truffle migrate
```

### Update ABI and Contract address

1. Navigate to: ```client/src/contracts```
2. Open Roulette.json
3. Copy the **ABI** and **Contract Address**
4. Navigate to ```client/src/config.js```
5. Update ```ROU_ABI``` and ```ROU_ADDRESS```
6. Navigate to ```bot/index.js```
7. Update ```CONTRACT_ABI``` and ```CONTRACT_ADDRESSS```

#### Video Walkthrough:
<img src='http://g.recordit.co/QgmKNQQZwC.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

---

## Running the Bot 

### Steps to deploy the bot

#### The bot serves as the casino. The Metamask account used to deploy the contract will serve as the casino.
#### **Important** The bot **must** be configured to the same Metamask account used to deploy the contract

* Make sure you are in a new **terminal window**
1. Navigate to 'bot' directory, from source folder run: ```cd bot```
2. On this directory, run to install dependecies: ```npm install```
3. Create a new```.env``` file and copy contents of ```.env.example``` file into it
4. Configure ```.env``` variables
    -  **RPC_URL** is the network url that your Metamask Account is connected to. You can get ganache's RPC in the top menus where it says ```RPC SERVER```
    -  **PRIVATE_KEY** is the private key of your Metamask Account for the casino (should be different from the player's account)
    -  **ACCOUNT** is the account address of the Metamask account

* On 'bot/index.js' update **abi** and **contract address** (copy these from 'client/src/config.js')
* Run command 
```npm run start```

#### How does the bot work?
1.	Casino will deploy the contract
2.	The bot will check the casino deposit amount and deposit money automatically to ensure that the deposit is not below the minimum
3.	The bot will first reset the game
4.	The bot will then generate a random number and random hash, hash them together, and send the commitment has to the contract
5.	The bot will wait two minutes, then reveal the winning number, the casino will automatically payout
6.	The bot will reset the game and repeat the process

#### After the contract is deployed:
1. Deploy bot
2. Bot will deposit 1 ether 
3. Player will join contract by switching account addresses 
4. During the betting phase player can  place their bets
  - Player can remove or see their current bets on the table 
---

## Server (Back End)

- In the cloned the repository files, ````server/app/config/db.config.js```` should look like this:
``` bash
  module.exports = {
    HOST: "freedb.tech",
    USER: "freedbtech_rou",
    PASSWORD: "1807Mich@3l",
    DB: "freedbtech_rousp",
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

1. Create a ***new terminal window*** 
2. Navigate to 'server' directory: ``` cd server ``` from src folder
3. Run ```npm install```, this install all the project dependecies.
4. Run ```node server.js``` which starts the app backend in development mode.
5. Open http://localhost:8080 to view it in the browser. The page will show you the message ```{"message":"Welcome to Rou application by Lette."}```

---

## Client (Front End)
1. Create a ***new terminal window*** 
2. Navigate to 'client' directory: from source folder run ```cd client```
3. Run ```npm install```, this install all the project dependecies.
4. ```npm start```, which starts the app front-end in development mode.
5. Automatically will open [http://localhost:8081](http://localhost:8081) in the browser.The page will reload if you make edits. You will also see any lint errors in the console.

---

### Testing (Back End)
Steps for testing the contract;

1. To begin the testing process, one must run the `testrpc` client from the terminal, which starts the server to connect the contract to the testing file.
2. Open a new terminal window and run `truffle develop` to deploy the contract.
3. Then use the command `test` to see all the available tests written in the javascript file.
5. There should be 6 available test files to view.

---

### Contributors

#### Frontend:
* **Mayra Vazquez-Sanchez** - [mayravs](https://github.com/mayravs)
* **Pierce Ruddock Taylor**  - [pkrtaylor](https://github.com/pkrtaylor)
#### Backend:
* **Avraham Brand**  - [dovbrand](https://github.com/dovbrand)
* **Hope Dunner**  - [hpdnnr7](https://github.com/hpdnnr7)
#### General (Both Front & Backend):
* **Michael Mayaguari**  - [mgmayagu](https://github.com/mgmayagu)
* **Inna Baryanova**  - [innabaryanova](https://github.com/innabaryanova)


