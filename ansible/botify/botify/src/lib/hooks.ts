import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./store";
import axios from "axios";
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const genWelcomeMessage = async (companyName: string) => {
  try {
    const res = await axios.get("/api/routes/genWelcomeMessage", {
      params: companyName,
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
