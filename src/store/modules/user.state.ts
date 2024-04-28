import { Module } from "vuex";

export interface UserStateInterface {
  userId: number | null,
  token: string | null
}

export const userStore: Module<any, UserStateInterface> = {
  namespaced: true,
  state: {
    userId: null as number | null,
    token: null as string | null
  },
  mutations: {
    setUserId(state: UserStateInterface, userId: number) {
      state.userId = userId;
    },
    setToken(state: UserStateInterface, token: string) {
      state.token = token;
    },
    clearUser(state: UserStateInterface) {
      state.userId = null;
      state.token = null;
    },
    setUserState(state: UserStateInterface, result: UserStateInterface) {
      state.userId = result.userId;
      state.token = result.token;
    }
  }
}