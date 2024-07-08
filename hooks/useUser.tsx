import { useContext } from "react";
import { UserContext } from "@/contexts/useUserContext";

const useUser = () => useContext(UserContext)

export { useUser };