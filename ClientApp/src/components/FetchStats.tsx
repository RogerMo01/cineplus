import axios from "axios";

const fetchStats = async(
    endpoint: string,
    setter: React.Dispatch<React.SetStateAction<any>>,
    request?:any
    ) => {
      const response = await axios.get(endpoint, request);
      setter(response.data);
      console.log("Fetch " + endpoint);
    }

    export default fetchStats;
