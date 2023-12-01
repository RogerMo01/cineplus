import { jwtDecode } from "jwt-decode";
import { UserPayload } from "../types/types";
import axios from "axios";

export const ValidateSession = (setToken: React.Dispatch<React.SetStateAction<string | null>>) => {
  const token = localStorage.getItem("sessionToken");

  if (token) {
    const decodedToken = jwtDecode<UserPayload>(token);
    const expTime = decodedToken.exp ? new Date(decodedToken.exp * 1000) : null;

    if (expTime && expTime < new Date()) {
      // Close session
      localStorage.removeItem("sessionToken");
      delete axios.defaults.headers.common["Authorization"];
      setToken(null);
      
      window.location.replace('/log-in');
    }
  }
};
