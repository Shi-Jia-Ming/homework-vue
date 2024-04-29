import axios, { AxiosError, AxiosResponse } from "axios";
import Department from "../types/department";
import Staff from "../types/staff";
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

    /**
     * 获取所有部门信息
     * 
     * @param token     用户 jwt 登录凭证
     * @param id        用户 id
     * @param username  用户名
     * @returns 返回部门信息列表
     */
    public static getDepartmentList = async (token: string, id: number, username: string): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map();

        await axios.post(this.url + '/department/getAll', { username: username }, {
            headers: {
                'Token': token,
                'User-Id': id
            }
        })
            .then((response: AxiosResponse<Array<Department>>) => {
                resultMap.set("code", 0);
                resultMap.set("departmentList", response.data);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            })
        return resultMap;
    }

    /**
     * 获取所有员工信息
     * 
     * @param token     用户 jwt 登录凭证
     * @param id        用户 id
     * @param username  用户名
     * @returns 返回员工信息列表
     */
    public static getStaffList = async (token: string, id: number, username: string): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map();

        await axios.post(this.url + '/staff/getAll', { username: username }, {
            headers: {
                'Token': token,
                'User-Id': id
            }
        })
            .then((response: AxiosResponse<Array<Staff>>) => {
                resultMap.set("code", 0);
                resultMap.set("staff", response.data);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            })
        return resultMap;
    }
}