import { Module } from "vuex";

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
    },
    setToken(state: UserStateInterface, token: string) {
      state.token = token;
    },
    setUsername(state: UserStateInterface, username: string) {
      state.username = username;
    },
    clearUser(state: UserStateInterface) {
      state.userId = null;
      state.token = null;
      state.username = null;
    },
    setUserState(state: UserStateInterface, result: UserStateInterface) {
      state.userId = result.userId;
      state.token = result.token;
      state.username = result.username;
    }
  }
}