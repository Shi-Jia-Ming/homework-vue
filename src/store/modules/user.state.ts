import { Module } from "vuex";
import CookieAPI from "../../utils/cookie";

export interface UserStateInterface {
  userId: number | null,
  token: string | null,
  username: string | null
}

export const userStore: Module<any, UserStateInterface> = {
  namespaced: true,
  state: {
    userId: null as number | null,
    token: null as string | null,
    username: null as string | null
  },
  mutations: {
    setUserId(state: UserStateInterface, userId: number) {
      state.userId = userId;
      CookieAPI.updateCookie('vuexState', this.state);
    },
    setToken(state: UserStateInterface, token: string) {
      state.token = token;
      CookieAPI.updateCookie('vuexState', this.state);
    },
    setUsername(state: UserStateInterface, username: string) {
      state.username = username;
      CookieAPI.updateCookie('vuexState', this.state);
    },
    clearUser(state: UserStateInterface) {
      state.userId = null;
      state.token = null;
      state.username = null;
      CookieAPI.updateCookie('vuexState', this.state);
    },
    setUserState(state: UserStateInterface, result: UserStateInterface) {
      state.userId = result.userId;
      state.token = result.token;
      state.username = result.username;
      CookieAPI.updateCookie('vuexState', this.state);
    }
  }
}