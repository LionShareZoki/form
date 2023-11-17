import axios from "axios";

async function postUserData(url: string, userData: FormData) {
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
