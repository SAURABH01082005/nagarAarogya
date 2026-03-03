
import jwt from 'jsonwebtoken';
import { listOfHosptials } from '../info.js';
import axios from 'axios';
//get hospital details 

const getHospitalDetails = async (req, res) => {
  //taking static dagta

  try {
    const hopitalArray = []

    for (const hospital of listOfHosptials) {
      const gToken = jwt.sign(hospital.email + hospital.password, process.env.JWT_SECRET_GOVERNMENT);
      console.log(`Hospital Name: ${hospital.name}, URL: ${hospital.url}`);
      const { data } = await axios.get(hospital.url + "/hospital-details", { headers: { gtoken: gToken } });
      if (data.success) {
        hopitalArray.push(data.address);
        
      } else {
        console.error(`Failed to fetch data from ${hospital.name}:`);
        
      }
      // console.log("hospital array", hopitalArray);
      return res.status(200).json({ success: true, data: hopitalArray });

    }


  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export { getHospitalDetails }