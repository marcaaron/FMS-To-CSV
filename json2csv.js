const fs = require('fs');
const Json2csvTransform = require('json2csv').Transform;

// Json2csv Fields & Options
const fields = ['property_num', 'orig_id', 'subclass', 'make', 'model', 'serial_num', 'description', 'acq', 'date', 'fs', 'decal', 'po', 'prog_id' ];
const opts = { fields };
const transformOpts = { highWaterMark: 16384, encoding: 'utf-8' };

// File Paths
const inputPath = './tmp/data.json';
const outputPath = './tmp/data.csv';

const input = fs.createReadStream(inputPath, { encoding: 'utf8' });
const output = fs.createWriteStream(outputPath, { encoding: 'utf8' });
const json2csv = new Json2csvTransform(opts, transformOpts);

const processor = input.pipe(json2csv).pipe(output);
console.log('done');
