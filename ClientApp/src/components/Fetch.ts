import axios from "axios";

const fetch = async (
  endpoint: string,
  setter: React.Dispatch<React.SetStateAction<any>>
) => {
  const response = await axios.get(endpoint);
  console.log("Fetch " + endpoint);
  setter(response.data);
};

export default fetch;
