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
#### Installation and Configuration

 - Add Metamask as an extension to the browser 
 - Create and account
 - Connect account with Remix
 - Link tokens using: `0xa36085F69e2889c224210F603D836748e7dC0088` 
 Find a more detailed instructions [here](https://developers.rsk.co/tutorials/ethereum-devs/remix-and-metamask-with-rsk-testnet/)
 
---

## Instructions and Configuration

### Server (Back End)
In the project directory, you can run the backend server:
#### Project setup
npm install
Runs package.json to install all the dependecies.
#### Run
node server.js
Runs the app in the development mode.
Open http://localhost:8081 to view it in the browser.
The page will show you the message
{"message":"Welcome to Rou application by Lette."}

---
### Bot (Back End)
Steps to run bot:

Remove all files from bot directory and place in main directory
npm install
Create .env file and copy contents of .env.example file into it
Configure .env variables
Run command "npm run start"

---
### Contract (Back End)
#### Steps to deploy the contract:

1.	Casino will deploy the contract
2.	A contract address will be deployed (we can copy that address directly into the front end). The contract address will always be the same. This is the address needed for players to join the game.
3.	After deploying contract the Casino must deposit money using the deposit money function (recommended amount is 1 ether)
4.	Contract can deposit any amount of money to contract at any time

#### After the contract is deployed:



---
### Testing (Back End)
Steps for testing the contract;

1. Begin by installing truffle and a text editor, we used Atom.
2. After installing both systems, the user would have to import roullette.sol into the contracts folder and roulettetest.js into the test folder.
3. To begin the testing process, one must run the `testrpc` client from the terminal, which starts the server to connect the contract to the testing file.
4. Open a new terminal window and run `truffle develop` to deploy the contract and then use the command `test` to see all the available tests written in the javascript file.
5. There should be 6 available test files to view.

---
### Front End

