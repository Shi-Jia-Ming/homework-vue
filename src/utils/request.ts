import axios, { AxiosError, AxiosResponse } from "axios";
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

export default class SpringAPI {
    // 后端 url
    private static readonly url: string = "/api";

    /**
     * 用户登录
     * 
     * @param username 用户名
     * @param password 密码
     * @returns 返回用户登录凭证
     */
    public static login = async (loginForm: { username: string, password: string }): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map();
        // 向后端发送请求
        await axios.post(this.url + '/user/login', loginForm)
        .then((response: AxiosResponse<{ id: number, token: string }>) => {
            resultMap.set("code", 0);
            resultMap.set("id", response.data.id);
            resultMap.set("token", response.data.token);
        }).catch((error: AxiosError) => {
            resultMap.set("code", 1);
            resultMap.set("msg", error.response?.data!);
        })
        return resultMap;
    }
}