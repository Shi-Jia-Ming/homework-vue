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

    // 设置值
    setValue(staff: Staff): void {
        this.id = staff.id;
        this.username = staff.username;
        this.password = staff.password;
        this.name = staff.name;
        this.gender = staff.gender;
        this.image = staff.image;
        this.job = staff.job;
        this.entryDate = staff.entryDate;
        this.department = staff.department;
        this.createAt = staff.createAt;
        this.updateAt = staff.updateAt;
    }

    // 设置为初始值
    setUndefined(): void {
        this.id = undefined;
        this.username = undefined;
        this.password = undefined;
        this.name = undefined;
        this.gender = undefined;
        this.image = undefined;
        this.job = undefined;
        this.entryDate = undefined;
        this.department = undefined;
        this.createAt = undefined;
        this.updateAt = undefined;
    }
}