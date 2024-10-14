import { deleteUser } from "../../Api/User";

export const handleUpdateUser = async () => {
  const response = await deleteUser();

  if (response.status !== 200) {
    return { ok: false, message: response.data.message };
  }

  return {
    ok: true,
    message: "Usuário e todos os dados associados foram deletados com sucesso.",
  };
};
