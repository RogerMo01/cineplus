import axios from "axios";

export const postPoster = async (
  endpoint: string,
  poster: File | null,
  name: string
) => {
  const formData = new FormData();
  if (poster) {
    formData.append("name", name);
    formData.append("file", poster);

    try {
      const resp = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(resp);
    } catch (error) {
      console.error(error);
    }
  }
};

export const putPoster = async (
  endpoint: string,
  poster: File | null,
  name: string,
  id: number
) => {

  const formData = new FormData();
  formData.append("id", id.toString());
  formData.append("name", name);

  if (poster) {
    formData.append("file", poster);
  }

  try {
    // Utilizar axios.post en lugar de axios.put cuando no hay póster
    const resp = poster
      ? await axios.put(endpoint, formData, { headers: { "Content-Type": "multipart/form-data" } })
      : await axios.put(endpoint, formData, { headers: { "Content-Type": "multipart/form-data" } });

    console.log(resp);
  } catch (error) {
    console.error(error);
  }
};