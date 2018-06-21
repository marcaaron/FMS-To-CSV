// Dependencies
const fs = require('fs');
const split = require('split');
const jsonfile = require('jsonfile')
const prompt = require('prompt');
prompt.start();

const schema = {
  properties: {
    response: {
      pattern: /^[ynYN]$/,
      message: 'Please Enter Y or N...',
      required: true
    }
  }
};

// CSV Module

const json2csv = require('./json2csv');

// Parser Function
const doubleLineToObj = require('./double-line-to-obj');

// Temp Variables
const array = [];

let previous = null;

let district_code = null;
let district_office = null;
let location = null;
let unit_code = null;
let unit_name = null;
let dtl = null;

// File Path
const file = process.argv[2] || 'fms.txt';
const filename = file.replace(/\.txt/ig, '');

// Read Stream
fs.stat(`./tmp/${filename}.csv`, function(err, stat) {
  if(err == null) {
      console.log(`A file named ${filename}.csv already exists.`);
      console.log('Would You Like to Overwrite These Files? (Y/N)');
      prompt.get(schema, function (err, result) {
        if (err) { return onErr(err); }
        if(/[yY]/.test(result.response)){
          console.log('Overwriting Existing Files...');
          fs.unlinkSync(`./tmp/${filename}.json`);
          fs.unlinkSync(`./tmp/${filename}.csv`);
          runScripts();
        }else{
          console.log('Goodbye!');
        }
      });

  } else if(err.code == 'ENOENT') {
    runScripts();
  } else {
      console.log('Some other error: ', err.code);
  }
});

function runScripts(){
  console.log('Converting TXT to JSON...');
  // Output File Path
  const output = `./tmp/${filename}.json`;
  fs.createReadStream(file)
  // Split on carriage return
  .pipe(split(/\r/))
  .on('data', function (current) {

    if(/^DISTRICT OFFICE/.test(current)){
      district_code = current.substr(16,9).trim() || null;
      district_office = current.substr(21,49).trim() || null;
      location = current.substr(79, 13).trim() || null;
    }

    if(/^SCHOOL\/UNIT/.test(current)){
      unit_code = current.substr(18,7).trim() || null;
      unit_name = current.substr(25,45).trim() || null;
      dtl = current.substr(83, 9).trim() || null;
    }

    // If temp exists (a.k.a. we had a match on the last line)
    // then push the previous line and current line into our array
    if(previous){
      array.push([previous, current, district_code, district_office, location, unit_code, unit_name, dtl]);
      previous = null;
    }

    // Set previous to the current line if there's a match
    previous = /^\d{10}/.test(current) && current;
  })
  .on('end', function(){
    // Testing our temporary array of lines that begin with a
    // property number and concatenating the next line...
    const arrayLength = array.length;
    let count = 0;
    array.forEach((dblLine)=>{
      doubleLineToObj(dblLine).then(res=>
        jsonfile.writeFile(output, res, {spaces: 4, flag: 'a'}, function(err) {
          count++;
          if(count===arrayLength){
            json2csv(arrayLength, filename);
            console.log('Converting JSON to CSV...');
          }
        })
      );
    });
  });
}
