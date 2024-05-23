import axios, {AxiosError, AxiosResponse} from "axios";
import Department from "../types/department";
import Staff from "../types/staff";
import Student from "../types/student.ts";
import Class from "../types/class.ts";

axios.defaults.headers.common['Content-Type'] = 'application/json';

export default class SpringAPI {
    // 后端 url
    private static readonly url: string = "/api";

    /**
     * 用户登录
     * @param loginForm 用户登录信息
     * @returns 返回用户登录凭证
     */
    public static login = async (loginForm: { username: string, password: string }): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map();
        // 向后端发送请求
        await axios.post(this.url + '/user/login', loginForm, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
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

        await axios.get(this.url + '/department/getAll', {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
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
     * 新建部门
     *
     * @param token             用户 jwt 登录凭证
     * @param id                用户 id
     * @param username          用户名
     * @param department        新的部门信息
     * @returns 返回新建部门的 id
     */
    public static createDepartment = async (token: string, id: number, username: string, department: Department): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map();

        await axios.post(this.url + '/department/create', JSON.stringify(department), {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
            }
        })
            .then((response: AxiosResponse<number>) => {
                resultMap.set("code", 0);
                resultMap.set("departmentId", response.data);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            })
        return resultMap;
    }

    /**
     * 更新部门信息
     *
     * @param token         用户 jwt 登录凭证
     * @param id            用户 id
     * @param username      用户名
     * @param department    新的部门信息
     * @returns 更新状态
     */
    public static editDepartment = async (token: string, id: number, username: string, department: Department): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map();

        await axios.post(this.url + '/department/edit', JSON.stringify(department), {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
            }
        })
            .then((_response: AxiosResponse<string>) => {
                resultMap.set("code", 0);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            })
        return resultMap;
    }

    /**
     * 删除部门信息
     *
     * @param token         用户 jwt 登录凭证
     * @param id            用户 id
     * @param username      用户名
     * @param department    待删除的部门信息
     * @returns 删除状态
     */
    public static deleteDepartment = async (token: string, id: number, username: string, department: Department): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map();

        await axios.post(this.url + '/department/delete', JSON.stringify(department), {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
            }
        })
            .then((_response: AxiosResponse<string>) => {
                resultMap.set("code", 0);
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
     * @returns 员工信息列表
     */
    public static getStaffList = async (token: string, id: number, username: string): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map();

        await axios.get(this.url + '/staff/getAll', {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
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

    /**
     * 获取班主任信息
     *
     * @param token     用户 jwt 登录凭证
     * @param id        用户 id
     * @param username  用户名
     * @returns 班主任信息列表
     */
    public static getHeadTeacher = async (token: string, id: number, username: string): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map();

        await axios.get(this.url + '/staff/getHeadTeacher', {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
            }
        })
            .then((response: AxiosResponse<Array<Staff>>) => {
                resultMap.set("code", 0);
                resultMap.set("headTeacherList", response.data);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            })
        return resultMap;
    }

    /**
     * 获取员工性别数据
     *
     * @param token     用户 jwt 登录凭证
     * @param id        用户 id
     * @param username  用户名
     * @returns 员工性别数据
     */
    public static getStaffGender = async (token: string, id: number, username: string): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map();

        await axios.get(this.url + '/staff/getGenderCount', {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
            }
        })
            .then((response: AxiosResponse<{ "male": number, "female": number }>) => {
                resultMap.set("code", 0);
                resultMap.set("maleCount", response.data.male);
                resultMap.set("femaleCount", response.data.female);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            })
        return resultMap;
    }

    /**
     * 获取职员职位的数量
     *
     * @param token     用户 jwt 登录凭证
     * @param id        用户 id
     * @param username  用户名
     * @param job       员工职位类型
     */
    public static getStaffJobCount = async (token: string, id: number, username: string, job: number): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map();

        await axios.post(this.url + 'staff/getJobCount', { job: job }, {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then((response: AxiosResponse<number>) => {
                resultMap.set("code", 0);
                resultMap.set("count", response.data);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            })
        return resultMap;
    }

    /**
     * 根据部分员工信息进行模糊查询
     *
     * @param token     用户 jwt 登录凭证
     * @param id        用户 id
     * @param username  用户名
     * @param staffLike 部分员工信息
     * @returns 符合条件的员工列表
     */
    public static searchStaffLikeList = async (token: string, id: number, username: string, staffLike: Staff): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map();

        await axios.post(this.url + '/staff/search', JSON.stringify(staffLike), {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
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

    /**
     * 新建员工信息
     *
     * @param token     用户 jwt 登录凭证
     * @param id        用户 id
     * @param username  用户名
     * @param staff     员工信息
     * @returns 新建员工的 id
     */
    public static createStaff = async (token: string, id: number, username: string, staff: Staff): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map();

        await axios.post(this.url + '/staff/create', JSON.stringify(staff), {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
            }
        })
            .then((response: AxiosResponse<number>) => {
                resultMap.set("code", 0);
                resultMap.set("staffId", response.data);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            })
        return resultMap;
    }

    /**
     * 更改员工信息
     *
     * @param token     用户 jwt 登录凭证
     * @param id        用户 id
     * @param username  用户名
     * @param staff     新的员工信息
     * @returns 更改状态
     */
    public static editStaff = async (token: string, id: number, username: string, staff: Staff): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map();

        await axios.post(this.url + '/staff/edit', JSON.stringify(staff), {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
            }
        })
            .then((_response: AxiosResponse<string>) => {
                resultMap.set("code", 0);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            })
        return resultMap;
    }

    /**
     * 删除员工信息列表
     *
     * @param token     用户 jwt 登录凭证
     * @param id        用户 id
     * @param username  用户名
     * @param staffList 待删除的员工信息列表
     * @returns 删除状态
     */
    public static deleteStaff = async (token: string, id: number, username: string, staffList: Array<Staff>): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map();

        await axios.post(this.url + '/staff/delete', JSON.stringify(staffList), {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
            }
        })
            .then((_response: AxiosResponse<string>) => {
                resultMap.set("code", 0);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            })
        return resultMap;
    }

    /**
     * 获取班级列表
     *
     * @param token     用户 jwt 登录凭证
     * @param id        用户 id
     * @param username  用户名
     */
    public static getClassList = async (token: string, id: number, username: string): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map();

        await axios.get(this.url + 'class/getAll', {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
            }
        })
            .then((response: AxiosResponse<Array<Student>>) => {
                resultMap.set("code", 0);
                resultMap.set("classes", response.data);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            })
        return resultMap;
    }

    /**
     * 根据部分班级信息进行模糊查询
     *
     * @param token     用户 jwt 登录凭证
     * @param id        用户 id
     * @param username  用户名
     * @param classLike 部分班级信息
     * @returns 符合条件的员工列表
     */
    public static searchClassLikeList = async (token: string, id: number, username: string, classLike: Class): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map();

        await axios.post(this.url + 'class/search', JSON.stringify(classLike), {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
            }
        })
            .then((response: AxiosResponse<Array<Class>>) => {
                resultMap.set("code", 0);
                resultMap.set("classes", response.data);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            })
        return resultMap;
    }

    /**
     * 创建班级信息
     *
     * @param token     用户 jwt 登录凭证
     * @param id        用户 id
     * @param username  用户名
     * @param class_    新的班级信息
     * @returns 新建班级的 id
     */
    public static createClass = async (token: string, id: number, username: string, class_: Class): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map<string, Object>();

        await axios.post(this.url + 'class/create', JSON.stringify(class_), {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
            }
        })
            .then((response: AxiosResponse<number>) => {
                resultMap.set("code", 0);
                resultMap.set("classId", response.data);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            })
        return resultMap;
    }

    /**
     * 删除班级信息
     *
     * @param token     用户 jwt 登录凭证
     * @param id        用户 id
     * @param username  用户名
     * @param class_    待删除的班级信息
     * @returns 删除状态
     */
    public static deleteClass = async (token: string, id: number, username: string, class_: Class): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map<string, Object>();

        await axios.post(this.url + 'class/delete', JSON.stringify(class_), {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
            }
        })
            .then((_response: AxiosResponse<string>) => {
                resultMap.set("code", 0);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            })
        return resultMap;
    }

    /**
     * 更新班级信息
     *
     * @param token     用户 jwt 登录凭证
     * @param id        用户 id
     * @param username  用户名
     * @param class_    新的班级信息
     * @returns 更新状态
     */
    public static updateClass = async (token: string, id: number, username: string, class_: Class): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map<string, Object>();

        await axios.post(this.url + 'class/update', JSON.stringify(class_), {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
            }
        })
            .then((_response: AxiosResponse<string>) => {
                resultMap.set("code", 0);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            })
        return resultMap;
    }

    /**
     * 获取学生信息
     *
     * @param token     用户 jwt 登录凭证
     * @param id        用户 id
     * @param username  用户名
     * @returns 学生信息列表
     */
    public static getStudentList = async (token: string, id: number, username: string): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map<string, Object>();

        await axios.get(this.url + '/student/getAll', {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
            }
        })
            .then((response: AxiosResponse<Array<Student>>) => {
                resultMap.set("code", 0);
                resultMap.set("studentList", response.data);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            });
        return resultMap;
    }

    /**
     * 根据部分学生信息模糊查询
     *
     * @param token         用户 jwt 登录凭证
     * @param id            用户 id
     * @param username      用户名
     * @param studentLike   部分学生信息
     * @returns 符合条件的学生信息列表
     */
    public static searchStudentLike = async (token: string, id: number, username:string, studentLike: Student): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map<string, Object>();

        await axios.post(this.url + '/student/search', JSON.stringify(studentLike), {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
            }
        })
            .then((response: AxiosResponse<Array<Student>>) => {
                resultMap.set("code", 0);
                resultMap.set("studentList", response.data);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            });
        return resultMap;
    }

    /**
     * 新建学生信息
     *
     * @param token     用户 jwt 登录凭证
     * @param id        用户 id
     * @param username  用户名
     * @param newStudent 新的学生信息
     * @returns 新数据的 id
     */
    public static createStudent = async (token: string, id: number, username: string, newStudent: Student): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map<string, Object>();

        await axios.post(this.url + '/student/create', JSON.stringify(newStudent), {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
            }
        })
            .then((response: AxiosResponse<number>) => {
                resultMap.set("code", 0);
                resultMap.set("studentId", response.data);
            }).catch((error: AxiosError) => {
                resultMap.set("coed", 1);
                resultMap.set("msg", error.response?.data!);
            });
        return resultMap;
    }

    /**
     * 更新学生信息
     *
     * @param token     用户 jwt 登录凭证
     * @param id        用户 id
     * @param username  用户名
     * @param newStudent 新的学生信息
     * @returns 更新状态
     */
    public static updateStudent = async (token: string, id: number, username: string, newStudent: Student): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map<string, Object>();

        await axios.post(this.url + '/student/update', JSON.stringify(newStudent), {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
            }
        })
            .then((_response: AxiosResponse<string>) => {
                resultMap.set("code", 0);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            });
        return resultMap;
    }

    /**
     * 删除学生信息
     *
     * @param token     用户 jwt 登录凭证
     * @param id        用户 id
     * @param username  用户名
     * @param studentList 待删除的学生列表
     * @returns 删除状态
     */
    public static deleteStudent = async (token: string, id: number, username: string, studentList: Array<Student>): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map<string, Object>();

        await axios.post(this.url + '/student/delete', JSON.stringify(studentList), {
            headers: {
                'Token': token,
                'User-Id': id,
                'Username': username
            }
        })
            .then((_response: AxiosResponse<string>) => {
                resultMap.set("code", 0);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            })
        return resultMap;
    }

    /**
     * 删除文件
     *
     * @param fileName 待删除的文件名
     * @returns 删除状态
     */
    public static deleteFile = async (fileName: string): Promise<Map<string, Object>> => {
        const resultMap: Map<string, Object> = new Map();

        await axios.post(this.url + '/upload/delete', {fileName: fileName}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then((_response: AxiosResponse<string>) => {
                resultMap.set("code", 0);
            }).catch((error: AxiosError) => {
                resultMap.set("code", 1);
                resultMap.set("msg", error.response?.data!);
            })
        return resultMap;
    }
}