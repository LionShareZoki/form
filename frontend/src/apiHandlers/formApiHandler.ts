import axios from "axios";
import { MyFormData } from "../redux/formTypes";

async function postUserData(url: string, userData: MyFormData) {
  try {
    const response = await axios.post(url, userData);
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error making post request:", error);
    throw error;
  }
}



export default postUserData;
