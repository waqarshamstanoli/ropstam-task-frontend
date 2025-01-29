import { postRequest } from "./api.service";
import { store } from "../store/store";
import { setEmail } from "../store/AuthSlice";
export const updateUser = async (item) => {
  console.log('dfaffaffafa',item)
    try {
      const data = await postRequest("edit-profile",item);
      // console.log('data',data.data.token)
      // localStorage.setItem('access_token', JSON.stringify(data.data.token));
      await store.dispatch(setEmail(data));
      return data;
    } catch (err) {
      alert(err)
      console.log(err);
    }
  };

  