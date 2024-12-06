import axios from "@/lib/axios";
import ENDPOINTS from "@/constants/endpoints";
import { Author } from "@/types";

export const getUser = async (user_id?: number) => {
  if (!user_id) {
    return null;
  }

  try {
    const { data } = await axios.get<Author>(
      `${ENDPOINTS.USERS.GET_USERS}/${user_id}`
    );

    return data;
  } catch (error) {
    return null;
  }
};
