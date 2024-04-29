import Department from "./department";

export default class Staff {
    // 员工 id
    id!: number;
    // 用户名
    username!: string;
    // 密码
    password!: string;
    // 姓名
    name!: string;
    // 性别
    gender!: number | string;
    // 图像
    image!: string;
    // 职务
    job!: number | string;
    // 入职时间
    entryDate!: Date | string;
    // 所属部门
    department!: Department;
    // 创建时间
    createAt!: Date | string;
    // 更新时间
    updateAt!: Date | string;
}