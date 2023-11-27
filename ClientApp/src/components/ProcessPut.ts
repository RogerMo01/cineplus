import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import fetch from "./Fetch";

async function Put(id: any, request: any, path: string, endpoint:string, setter: React.Dispatch<React.SetStateAction<any>>, alertMessage?: boolean) {
  try {
    const response = axios.put(path + `/${id}`, request);
    const status = (await response).status;

    if (alertMessage && (status === 200 || status === 201 || status === 204)) {
      toast.success("Solicitud exitosa!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
    fetch(endpoint, setter);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;

      if (axiosError.response) {
        const status = axiosError.response.status;
        const message = axiosError.response.data.message;

        if (message) {
          console.log("Error " + status);
          toast.error(message, { position: "bottom-right", autoClose: 3000 });
        }
      }
    } else {
      console.error(`Error en la solicitud (${error})`);
      toast.error(`Error en la solicitud (${error})`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
    return false;
  }
}

export default Put;
