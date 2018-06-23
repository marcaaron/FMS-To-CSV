module.exports = (count, filename) => {
  const fs = require('fs');
  const Json2csvTransform = require('json2csv').Transform;
  const logUpdate = require('log-update');

  // Json2csv Fields & Options
  const fields = [
    'property_num',
    'orig_id',
    'qty',
    'subclass_id',
    'subclass_name',
    'description',
    'make',
    'model',
    'serial_num',
    'acq',
    'date',
    'cost',
    'fs',
    'decal',
    'po',
    'prog_id',
    'district_code',
    'district_office',
    'unit_code',
    'unit_name',
    'dtl',
    'location',
    'line1',
    'line2' ];

  const opts = { fields };
  const transformOpts = { highWaterMark: 16384, encoding: 'utf-8' };

  // File Paths
  const inputPath = `./tmp/${filename}.json`;
  const outputPath = `./tmp/${filename}.csv`;
  let counter = 0;
  const input = fs.createReadStream(inputPath, { encoding: 'utf8' });
  const output = fs.createWriteStream(outputPath, { encoding: 'utf8' });
  const json2csv = new Json2csvTransform(opts, transformOpts)
  .on('line', line => {
    const percentage = Math.round((counter/count)*100);
    logUpdate(
      `Converting JSON to CSV... ${percentage} %`
     );
    counter++;
  })
  .on('end', () =>{
    if(counter!==count){
      console.log(`There was a problem converting one or more entries!`);
    }else{
      console.log(`Successfully Converted TXT to CSV`);
      console.log(`Created ${count} entries!`);
      console.log(`${filename}.txt --> ${filename}.csv`);      
    }
  });
  const processor = input.pipe(json2csv).pipe(output);
}
