import { resetPasswordApi } from "../../Api/User";
import { IForgotPassword } from "./props";

export const resetPassword = async (data: IForgotPassword) => {
  const result = await resetPasswordApi(data);
  return result;
};
