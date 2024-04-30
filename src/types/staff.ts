import Department from "./department";

export default class Staff {
    // 员工 id
    id: number | undefined;
    // 用户名
    username: string | undefined;
    // 密码
    password: string | undefined;
    // 姓名
    name: string | undefined;
    // 性别
    gender: number | undefined;
    // 图像
    image: string | undefined;
    // 职务
    job: number | undefined;
    // 入职时间
    entryDate: Date | undefined;
    // 所属部门
    department: Department | undefined;
    // 创建时间
    createAt: Date | undefined;
    // 更新时间
    updateAt: Date | undefined;
}