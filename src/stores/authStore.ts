import { defineStore } from "pinia";
import router from "@/router";
import type {UserVO} from "@/api/login/type.ts";
import {getUserInfo} from "@/api/login/api.ts";
import { useSnackbarStore } from "@/stores/snackbarStore";
import {storage} from "@/util/storage.ts";

export const useAuthStore = defineStore("auth", {
  state: ()=>({
    userInfo: null as UserVO | null,
    token:""
  }),
  getters:{
    getUserInfo(): any{
      return this.userInfo
    }
  },
  actions:{
    setUserInfo(userInfo: UserVO, token: string){
      this.userInfo = userInfo
      this.token = token
      storage.set("otowUser",{userInfo: userInfo, token: token})
    },
    logout(){
      this.clearUserInfo()
    },
    clearUserInfo(){
      this.userInfo = null
      this.token = ""
      storage.remove("otowUser")
    },
    async fetchUserInfo(){
      await getUserInfo().then((res:any)=>{
        this.userInfo = res.data as UserVO
        const user:any = storage.get("otowUser")
        user.userInfo = this.userInfo
        storage.set("otowUser",user)
      }).catch((error: any)=>{
        this.clearUserInfo()
        const snackbarStore = useSnackbarStore();
        snackbarStore.showErrorMessage("登录过期，请重新登录!")
        router.push({path:'/login'})
      })
    }
  }
});
