import { updateUser } from "../../Api/User";

import { IUpdateUser } from "./props";

export const handleUpdateUser = async (data: IUpdateUser) => {
  const response = await updateUser(data);

  if (response.status !== 200) {
    return { ok: false, message: response.data.message };
  }

  return { ok: true, message: "Dados atualizados" };
};
