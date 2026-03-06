import { useContext } from "react";
import { userContext } from "../context/authContext";

export const useAuth = () => useContext(userContext);
