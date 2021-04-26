# Ethereum Roullette

## Dependencies
 - Solidity
 - Remix IDE
 - Javascript
 - Node.js (Express, Mysql2, Sequelize)
 - Truffle
 - Metamask
## Instructions 

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

### Bot (Back End)
Steps to run bot:

Remove all files from bot directory and place in main directory
npm install
Create .env file and copy contents of .env.example file into it
Configure .env variables
Run command "npm run start"

### Contract (Back End)
Download our roullette.sol file and deploy using RemixIDE.

### Testing (Back End)
Steps for testing the contract;

1. Begin by installing truffle and a text editor, we used Atom.
2. After installing both systems, the user would have to import roullette.sol into the contracts folder and roulettetest.js into the test folder.
3. To begin the testing process, one must run the testrpc client from the terminal, which starts the server to connect the contract to the testing file.
4. Open a new terminal window and run `truffle develop` to deploy the contract and then use the command `test` to see all the available tests written in the javascript file.

### Front End

