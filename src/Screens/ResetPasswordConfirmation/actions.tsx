import { resetPasswordConfirm } from "../../Api/User";
import { IResetPasswordConfirm } from "./props";

export const changePassword = async (data: IResetPasswordConfirm) => {
  const result = await resetPasswordConfirm(data);
  return result;
};
