Turns your confusing and useless space delimitted school inventory text documents into friendly JSON or CSV with a simple command-line NodeJS script. Made by request for the state of Hawaii's public school system.

## Instructions

### Requirements:

In order to run this script you will need to install NodeJS and NPM (bundled with Node).

[Install Node](https://nodejs.org/en/)

Next you will need to clone this repository.

You will need Git if you don't have it installed. Hint: type `git` in terminal and you should see a list of commands pop up. If not...

[Install Git](https://git-scm.com/downloads)

Next head to your terminal and type:

`git clone https://github.com/marcaaron/FMS-To-CSV.git`

This will create a directory where you will place your text file that you'd like to convert to CSV.

Before you can run these scripts you'll also need to install some dependencies. CD into the directory and run the command:

`npm install`

(**hint**: *if you're not sure how to access this directory from terminal try typing `cd` followed by a space then drag and drop the folder into the terminal window and press enter*).

Make sure to place your text file in this same directory before advancing or else the scripts will not be able to run.


At this point you have two options:

**Option 1:**

Rename your txt file to `fms.txt` and run the command:

`node index.js`

**Option 2:**

Leave your text file named whatever it is and run the command:

`node index.js <your file name here>`

If everything went smoothly you should have a new directory named `/temp` and a file inside called `data.json`.

If you'd like to turn this into a CSV file then you'll have to run one additional command.

`node json2csv.js`

This should create a file called `data.csv` in the same directory as the `data.json` file.

## Notes

If you must run these scripts against multiple files I would suggest you first rename the `data.json` and/or `data.csv` files. If you run the script twice in a row you will end up with duplicate data. So make sure to run each script only once.

e.g.

Run the script.

Rename `data.csv` to `<somethingelse>.csv`

Delete the `data.csv` and `data.json` files.

Re-Run the script on a new text file.
