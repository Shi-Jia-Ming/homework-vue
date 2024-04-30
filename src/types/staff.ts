import Department from "./department";

export default class Staff {
    // 员工 id
    id!: number;
    // 用户名
    username!: string;
    // 密码
    password!: string;
    // 姓名
    name!: string | undefined;
    // 性别
    gender!: number | undefined;
    // 图像
    image!: string;
    // 职务
    job!: number;
    // 入职时间
    entryDate!: Date | undefined;
    // 所属部门
    department!: Department;
    // 创建时间
    createAt!: Date;
    // 更新时间
    updateAt!: Date;
}