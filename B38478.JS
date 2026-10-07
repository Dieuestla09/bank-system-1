/*
  SIMPLE BANKING SYSTEM

  Description:
  This program simulates a simple banking system using
  JavaScript and Node.js. It runs completely in the terminal.

  Purpose:
  To show the use of functions, conditions (if / else if / else),
  loops (while) and user input (readline) in a practical program.

  Features:
  - Check account balance
  - Deposit money
  - Withdraw money
  - View transaction history
  - Exit the applicatioN

  
*/


// 1. IMPORT READLINE
// readline is a built-in Node.js module for reading user input

const readline = require("readline");


// 2. CREATE THE READLINE INTERFACE
// This connects our program to the keyboard (input)
// and the terminal screen (output)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


// 3. VARIABLES

let customerName = "";        // The customer's full name
let accountNumber = "";       // The customer's account number
let balance = 100000;         // Starting balance in UGX


// 4. TRANSACTION ARRAY
// Every deposit and withdrawal is saved here as text

let transactions = [];


// 5. FUNCTIONS


// Asks the user a question and waits for the answer.
// It lets us write "await askQuestion(...)" inside our loops.
function askQuestion(question) {
  return new Promise(function (resolve) {
    rl.question(question, function (answer) {
      resolve(answer.trim()); // trim() removes extra spaces
    });
  });
}

// Changes a number like 150000 into the text "150,000 UGX"
function formatMoney(amount) {
  return amount.toLocaleString("en-US") + " UGX";
}

// Converts what the user typed into a number.
// Commas are removed first, so "50,000" becomes 50000.
function convertToNumber(text) {
  let cleanText = text.split(",").join("");
  return Number(cleanText);
}

// Displays the current account balance
function checkBalance() {
  console.log("\n========== ACCOUNT BALANCE ==========");
  console.log("");
  console.log("Customer:       " + customerName);
  console.log("Account Number: " + accountNumber);
  console.log("Balance:        " + formatMoney(balance));
  console.log("");
  console.log("=====================================");
}

// Asks for an amount, validates it and adds it to the balance
// and saves the deposit in the transaction history
async function depositMoney() {
  console.log("\n========== DEPOSIT MONEY ==========");
  let input = await askQuestion("Enter amount to deposit: ");
  let amount = convertToNumber(input);

  if (isNaN(amount)) {
    console.log("Invalid amount. Please enter numbers only.");
  } else if (amount <= 0) {
    console.log("Invalid amount. Deposit must be greater than zero.");
  } else {
    balance = balance + amount;
    transactions.push("Deposit: +" + formatMoney(amount));
    console.log("\nDeposit successful!");
    console.log("Amount deposited: " + formatMoney(amount));
    console.log("New balance: " + formatMoney(balance));
  }
}

// Asks for an amount, checks it, subtracts it from the balance
// (only if there is enough money) and saves the transaction
async function withdrawMoney() {
  console.log("\n========== WITHDRAW MONEY ==========");
  let input = await askQuestion("Enter amount to withdraw: ");
  let amount = convertToNumber(input);

  if (isNaN(amount)) {
    console.log("Invalid amount. Please enter numbers only.");
  } else if (amount <= 0) {
    console.log("Invalid amount. Withdrawal must be greater than zero.");
  } else if (amount > balance) {
    console.log("Insufficient balance.");
    console.log("Your current balance is " + formatMoney(balance));
  } else {
    balance = balance - amount;
    transactions.push("Withdrawal: -" + formatMoney(amount));
    console.log("\nWithdrawal successful!");
    console.log("Amount withdrawn: " + formatMoney(amount));
    console.log("Remaining balance: " + formatMoney(balance));
  }
}

// Displays all deposits and withdrawals made so far
function showTransactions() {
  console.log("\n========== TRANSACTION HISTORY ==========");
  console.log("");

  if (transactions.length === 0) {
    console.log("No transactions found.");
  } else {
    // Loop through the array and print each transaction with a number
    for (let i = 0; i < transactions.length; i++) {
      console.log((i + 1) + ". " + transactions[i]);
    }
  }

  console.log("");
  console.log("=========================================");
}

// Displays the main menu with customer details
function mainMenu() {
  console.log("\n========================================");
  console.log("          SIMPLE BANKING SYSTEM");
  console.log("========================================");
  console.log("Customer: " + customerName);
  console.log("Account:  " + accountNumber);
  console.log("Balance:  " + formatMoney(balance));
  console.log("----------------------------------------");
  console.log("1. Check Balance");
  console.log("2. Deposit Money");
  console.log("3. Withdraw Money");
  console.log("4. Transaction History");
  console.log("5. Exit");
  console.log("----------------------------------------");
}

// Asks for the customer's name and account number at the start.
// The loops keep asking until the user enters valid details.
async function getAccountDetails() {
  console.log("========================================");
  console.log("     WELCOME TO THE SIMPLE BANKING SYSTEM");
  console.log("========================================\n");

  // Keep asking while the name is empty
  while (customerName === "") {
    customerName = await askQuestion("Enter your name: ");
    if (customerName === "") {
      console.log("Name cannot be empty. Please try again.");
    }
  }

  // Keep asking while the account number is empty or not a number
  while (accountNumber === "") {
    accountNumber = await askQuestion("Enter your account number: ");
    if (accountNumber === "") {
      console.log("Account number cannot be empty. Please try again.");
    } else if (isNaN(accountNumber)) {
      console.log("Account number must contain numbers only.");
      accountNumber = ""; 
    }
  }
}


// 6. START THE APPLICATION

async function startApplication() {
  await getAccountDetails();

  let running = true; 

  // MAIN LOOP: user chooses 5
  while (running) {
    mainMenu();
    let choice = await askQuestion("Enter your choice: ");

    if (choice === "1") {
      checkBalance();
    } else if (choice === "2") {
      await depositMoney();
    } else if (choice === "3") {
      await withdrawMoney();
    } else if (choice === "4") {
      showTransactions();
    } else if (choice === "5") {
      let firstName = customerName.split(" ")[0]; // first word of the name
      console.log("\n========================================");
      console.log("Thank you for using our Banking System.");
      console.log("Goodbye, " + firstName + "!");
      console.log("========================================\n");
      running = false; // stops the loop
    } else {
      console.log("\nInvalid option. Please enter a number from 1 to 5.");
    }
  }

  rl.close(); 
}

// Run the program
startApplication();
