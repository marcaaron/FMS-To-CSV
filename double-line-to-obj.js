module.exports = (doubleLine) => {
  return new Promise((resolve, reject)=>{
      // Init Object
      const obj = { };
      // Split into 2 lines
      const lines = doubleLine;
      // Declare line one and splice out the property number orig id and subclass
      let line1 = lines[0].replace(/(\d{10}) (\d{3})\s+\d+\sSUBCL:\s{3}(\d{6})/,(_,propertyNumber, origId, subcl)=>{
        obj.property_num = propertyNumber;
        obj.orig_id = origId;
        obj.subclass = subcl;
        return '';
      });

      // Match on Make and replace
      line1 = line1.replace(/(MAKE:)(\w+)?/, (_, makeText, make)=>{
        if(make){
          obj.make = make;
        }else{
          obj.make = null;
        }
        return '';
      });

      // Match on Model and replace
      line1 = line1.replace(/(MODEL:)(\w+)?/, (_, modelText, model)=>{
        if(model){
          obj.model = model;
        }else{
          obj.model = null;
        }
        return '';
      });


      // Match on SER and replace
      line1 = line1.replace(/(SER:)(\w+)?/, (_, serText, ser)=>{
        if(ser){
          obj.serial_num = ser;
        }else{
          obj.serial_num = null;
        }
        return '';
      });

      line1 = line1.trim();
      if(line1){
        obj.description = line1;
      }else{
        obj.description = null;
      }

      // Start Line 2
      let line2 = lines[1];

      const acq = lines[1].replace(/(.{74})(\d+)/, (_, prev, acq)=>{
        obj.acq = acq;
      });

      const date = lines[1].replace(/(.{77})(\d{2}-\d{2})/, (_, prev, date, index)=>{
        obj.date = date;
      });


      const cash = lines[1].replace(/(.{80,})(\$)(\d+)?,?(\d+)?.(\d{2})\s{2}(\d{2})?/, (_, prev, dollar, one, two, three, fs, index)=>{
        obj.cost=`${one ? one : '0'}${two ? two + '.' : '.'}${three}`;
        if(fs){
          obj.fs = fs;
        }else{
          obj.fs = null;
        }
      });

      let decal = lines[1].substr(108,8);
      decal.trim();
      obj.decal = decal.length>0 ? decal : null;

      const substr = lines[1].substr(117);
      let po = substr.substr(0,8);
      po = po.trim();
      obj.po = po.length>0 ? po : null;

      let progid = substr.substr(9);
      progid = progid.trim();
      obj.prog_id = progid.length>0 ? progid : null;

      const description = lines[1].substr(0,74);
      const trimWSMid = /\s{2,}/g;
      obj.description = obj.description.trim().replace(trimWSMid,'') + ' ' + description.trim().replace(trimWSMid,'');

      // Uncomment these to add them back in
      // obj.line1 = lines[0];
      // obj.line2 = lines[1];

      // Test to see if result has the correct number of keys 14 for no lines 16 if the lines are in
      // const objectkeys = Object.keys(obj);
      // if(objectkeys.length !== 14){
      //   console.log(obj, objectkeys.length);
      // }

      resolve(obj);
  })
}
