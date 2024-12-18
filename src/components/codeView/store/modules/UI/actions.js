import { types } from "./mutations";
import { PANELS } from "./initialState";

export default {

  showExplorerPanel: async ({ commit }) => {
    commit(types.SET_ACTIVE_PANEL_ID, PANELS.explorer.id);
  },
  showSearchPanel: async ({ commit }) => {
    commit(types.SET_ACTIVE_PANEL_ID, PANELS.search.id);
  },
  setActivePanelId: async ({ commit }, { id }) => {
    commit(types.SET_ACTIVE_PANEL_ID, id);
  },
  setShowCommandCenter: async ({ commit }, flag) => {
    commit(types.SET_SHOW_COMMAND_CENTER, flag);
  },
  setActiveTheme: async ({ commit }, { theme }) => {
    if (theme) {
      commit(types.SET_ACTIVE_THEME, theme);
      localStorage.setItem("appTheme", theme);
    }
  },
  createExportPayload: async ({ state }) => {
    return {
      settings: {},
    };
  },
  setShowCreateFileModal: async ({ commit }, { flag, filename }) => {
    if (filename) {
      commit(types.SET_BOOTSTRAPPED_FILE_NAME, filename);
    }
    commit(types.SET_SHOW_CREATE_FILE_MODAL, flag);
  }
};
