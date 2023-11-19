import axios from "axios";
import { toast } from "react-toastify";
import fetch from "./Fetch";

async function Delete(id: any, path: string, endpoint:string, setter: React.Dispatch<React.SetStateAction<any>>) {
  try {
    const response = await axios.delete(path + `/${id}`);

    if (response.status === 200) {
      toast.success("Eliminación exitosa!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
    fetch(endpoint, setter);
  } catch (error) {
    console.error(`Error de eliminación (${error})`);
    toast.error(`Error de eliminación (${error})`, {
      position: "bottom-right",
      autoClose: 3000,
    });
  }
}

export default Delete;
