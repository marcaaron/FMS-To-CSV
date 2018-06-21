Turns your confusing and useless space delimitted school inventory text documents into friendly JSON or CSV with a simple command-line NodeJS script.

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

Before you can run these scripts you'll also need to install some dependencies. CD into the directory you just created by cloning the repository (/FMS-To-CSV) and run the command:

`npm install`

(**hint**: *if you're not sure how to access this directory from terminal try typing `cd` followed by a space then drag and drop the folder into the terminal window and press enter*).

Make sure to place your text file in this same directory before advancing or else the scripts will not be able to run.


At this point you have two options:

**Option 1:**

Rename your txt file to `fms.txt` and run the command:

`node index.js`

**Option 2:** (Recommended)

Leave your text file named whatever it is and run the command:

`node index.js <your file name here>`

If everything went smoothly you should find two files inside the `/tmp` directory. A CSV and a JSON both either matching the filename you provided or "fms".

## Note

This program will automatically look for an existing file inside `/tmp` that matches either the filename you provided or the default `fms.txt`. If you attempt to run a script on a previously converted TXT file and it's corresponding CSV file is present in the `/tmp` directory it will ask if you'd like to overwrite it. This will not have any impact on the input TXT file. But I'd recommended to either change the filename of the file you'd like to convert and provide that re: Option 2 above or rename the output file and place it somewhere outside of the `/tmp` directory.
