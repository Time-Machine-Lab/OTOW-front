import { defineStore } from "pinia";
type IconType = 'info' | 'success' | 'error' | 'warning';
export const useSnackbarStore = defineStore({
  id: "snackbarStore",
  state: () => ({
    isShow: false,
    message: "",
    type: "info" as IconType,
  }),
  getters: {},
  actions: {
    showMessage(message: string) {
      this.isShow = true;
      this.message = message;
      this.type = "info";
    },

    showErrorMessage(message: string) {
      this.isShow = true;
      this.message = message;
      this.type = "error";
    },
    showSuccessMessage(message: string) {
      this.isShow = true;
      this.message = message;
      this.type = "success";
    },
    showWarningMessage(message: string) {
      this.isShow = true;
      this.message = message;
      this.type = "warning";
    },
  },
});
