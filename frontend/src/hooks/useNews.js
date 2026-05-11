// Convenience hook for consuming the global news context
import { useContext } from "react";
import { NewsContext } from "../context/NewsContext";

export const useNews = () => useContext(NewsContext);
