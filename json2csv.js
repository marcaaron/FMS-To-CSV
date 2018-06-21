module.exports = (entryCount, filename) => {
  const fs = require('fs');
  const Json2csvTransform = require('json2csv').Transform;

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

  const input = fs.createReadStream(inputPath, { encoding: 'utf8' });
  const output = fs.createWriteStream(outputPath, { encoding: 'utf8' });
  const json2csv = new Json2csvTransform(opts, transformOpts)
  .on('end', () =>{
      const ln = filename.length;
      const gutter = (32 - (ln*2))/2;
      let lgutter, rgutter;
      lgutter = gutter;
      rgutter = gutter;

      const count = entryCount;
      const entryGutter = (32 - (count.toString().length*2))/2;
      let rgutter2 = entryGutter;
      let lgutter2 = entryGutter;
      if(entryGutter%2 !== 0){
        rgutter2 +=1;
      }
      console.log(`-----------------------------------------------`);
      console.log(`|      Successfully Converted TXT to CSV      |`);
      console.log(`-----------------------------------------------`);
      console.log(`|${' '.repeat(lgutter2)}Created ${count} entries!${' '.repeat(rgutter2)}|`);
      console.log(`|${' '.repeat(lgutter)}${filename}.txt --> ${filename}.csv${' '.repeat(rgutter)}|`);
      console.log(`-----------------------------------------------`);
  });
  const processor = input.pipe(json2csv).pipe(output);
}
