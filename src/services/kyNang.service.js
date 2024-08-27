import { http } from "./config";

export const kyNangService = {
  getSkill: () => {
    return http.get("/skill");
  },
};
