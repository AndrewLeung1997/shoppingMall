import { srAxios } from "../../utils/fetch.ts";

export const signIn = async ({ email, password }) => {
  return await srAxios.post("/.netlify/functions/SigninHandler", {
    email,
    password,
  });
};
