# Ethereum Roullette

## Testing 
*Note if you do not have truffle installed, you should follow the steps down below to install truffle on your machine. After installing truffle, you can follow the steps of viewing the available test files for the contract*

Steps for testing the contract;

1. To begin the testing process, one must run the `testrpc` client from the terminal, which starts the server to connect the contract to the testing file.
2. Open a new terminal window and run `truffle develop` to deploy the contract.
3. Then use the command `test` to see all the available tests written in the javascript file.
4. There should be 12 available test files to view.

## Dependencies

Install `yarn` if you haven't already:

```
npm install -g yarn
```

## Getting Started
Download zip file or git clone repo:

```
git clone https://github.com/trufflesuite/trufflesuite.com.git
```

Navigate into the directory in terminal:

```
cd trufflesuite.com/
yarn
```

## Run dev build
In terminal run:

```
yarn dev
```

Navigate to **[localhost:9000](http://localhost:9000)**/port specified in your terminal

To view Browsersync settings navigate to **[localhost:3001](http://localhost:3001)**

## Compile to a production build

In terminal run:

```
yarn build
```

Navigate to ./build folder for the compiled files.




