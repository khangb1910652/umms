# User Guide and Source Code Installation Instructions

## Step 1: Install Node.js
1. Visit the official Node.js website at [https://nodejs.org](https://nodejs.org).
2. Download the appropriate version of Node.js for your operating system (usually the LTS - Long-Term Support version).
3. Open the downloaded installation file and follow the on-screen installation instructions.
4. Complete the Node.js installation process.

## Step 2: Install LibreOffice
1. Open a terminal or command prompt on the server.
2. Run the command `$ soffice` to check if LibreOffice is installed.
3. If LibreOffice is not installed, install it before proceeding.
4. Set up the environment variable so that the system can locate the path to LibreOffice.

## Step 3: Set Up Oracle Cloud
### Method 1: Use Oracle Cloud Directly in the Source Code
### Method 2: Create Your Own Oracle Cloud
1. Visit the official Oracle website at [https://cloud.oracle.com/](https://cloud.oracle.com/) and log in or create an account if you don't have one.
2. Navigate to "Oracle Database" and select "Autonomous Databases."
3. Create an "Autonomous Database" (remember to save the username and password).
4. After creating, select "Database connection," download the "Instance Wallet," and copy any "Connection string."
5. Extract the downloaded "Instance Wallet" and save it all in the "admin" folder (Note: keep the "Instance Wallet" in .zip format).
6. Delete the "admin" folder in the source code "umms\SourceCode\server\src\database\instantclient_21_10\network."
7. Copy the "admin" folder to the source code "umms\SourceCode\server\src\database\instantclient_21_10\network."
8. Edit the connection information in "umms\SourceCode\server\src\database\knex.ts."

## Step 4: Install Oracle SQL Developer
1. Visit the official Oracle website to download the Oracle SQL Developer application [https://www.oracle.com/database/sqldeveloper/](https://www.oracle.com/database/sqldeveloper/) and log in or create an account if you don't have one.
2. Install the application and select "New Connection."
3. Enter the username and password. If using Oracle Cloud directly in the source code, the username is "ADMIN," and the password is "Thuctap2023*."
4. Select Cloud Wallet for Connection Type.
5. Browse to the downloaded Wallet.zip file. If using Oracle Cloud directly in the source code, select the Wallet.zip file at "umms\SQL\Wallet_KNUM984WSLT3BMIX.zip."
6. Select Connect to connect to Oracle Cloud.
7. Open the Table_Script.txt file at "umms\SQL\Table_Script.txt" and run all the table creation and data insertion commands.

## Step 5: Install and Start the Server
1. Open a terminal or command prompt on the server.
2. Navigate to the directory containing the server project code.
3. Run the command `$ npm i` to install project dependencies.
4. After the installation is complete, run the command `$ npm start` to start the server.

## Step 6: Install and Run the User Interface (UI)
1. Open a terminal or command prompt on your computer.
2. Navigate to the directory containing the user interface project code.
3. Run the command `$ npm i` to install project dependencies.
4. After the installation is complete, run the command `$ npm run dev` to launch the user interface.
