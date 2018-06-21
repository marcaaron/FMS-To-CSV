module.exports = (doubleLine) => {
  return new Promise((resolve, reject)=>{
      // Init Object
      const obj = { };
      // Split into 2 lines
      const line1 = doubleLine[0];
      const line2 = doubleLine[1];
      const district_code = doubleLine[2];
      const district_office = doubleLine[3];
      const location = doubleLine[4];
      const unit_code = doubleLine[5];
      const unit_name = doubleLine[6];
      const dtl = doubleLine[7];

      obj.property_num = line1.substr(0,10).trim() || null;
      obj.orig_id = line1.substr(11,3).trim() || null;
      obj.qty = line1.substr(14,9).trim() || null;
      obj.subclass = line1.substr(29, 13).trim() || '';
      obj.description = `${line1.substr(38, 30).trim() || null} ${line2.substr(23, 50).trim() || null}`;
      obj.make = line1.substr(73,16).trim() || null;
      obj.model = line1.substr(95, 16).trim() || null;
      obj.serial_num = line1.substr(115).trim() || null;
      obj.acq = line2.substr(73,4).trim() || null;
      obj.date = line2.substr(77,7).trim() || null;
      obj.cost = line2.substr(82,19).trim() || null;
      obj.fs = line2.substr(101,6).trim() || null;
      obj.decal = line2.substr(108,8).trim() || null;
      obj.po = line2.substr(116,10).trim() || null;
      obj.prog_id = line2.substr(126).trim() || null;
      obj.district_code = district_code;
      obj.district_office = district_office;
      obj.unit_code = unit_code;
      obj.unit_name = unit_name;
      obj.dtl = dtl;
      obj.location = location;
      obj.line1 = line1;
      obj.line2 = line2;

      // Test to see if result has the correct number of keys 14 for no lines 16 if the lines are in
      const objectkeys = Object.keys(obj);
        if(objectkeys.length !== 23){
          console.log(obj, objectkeys.length);
        }
      resolve(obj);
  })
}
