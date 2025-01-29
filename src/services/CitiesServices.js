import { getRequest } from "./api.service";
import { store } from "../store/store";
import { setCities } from "../store/CitiesSlice";
export const getCities = async () => {
  
    try {
      const data = await getRequest("get-car-cities");
      await store.dispatch(setCities(data.data));
      return data;
    } catch (err) {
      console.log(err);
    }
  };
 