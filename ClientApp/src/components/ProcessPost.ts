import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

async function Post(request: any, path: string) {
  try {
    const response = axios.post(path, request);
    const status = (await response).status;

    if (status === 200 || status === 201 || status === 204) {
      toast.success("Solicitud exitosa!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
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
  }
}

export default Post;
