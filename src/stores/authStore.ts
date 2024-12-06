import { defineStore } from "pinia";

import router from "@/router";
import type {UserInfo} from "@/api/login/type.ts";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    user: null as UserInfo | null
  }),
  persist: true,

  getters: {},

  actions: {
    setLoggedIn(user: UserInfo) {
      this.isLoggedIn = true;
      this.user = user;
      router.push("/");
    },

    logout() {
      this.isLoggedIn = false;
      router.push("/");
    },
  },
});
