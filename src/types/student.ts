import Class from "./class";

export default class Student {
    // id
    id: number | undefined;
    // 姓名
    name: string | undefined;
    // 学号
    stuNumber: string | undefined;
    // 所属班级
    class_: Class | undefined;
    // 性别
    gender: number | undefined;
    // 手机号
    phone: string | undefined;
    // 最高学历
    degree: number | undefined;
    // 违纪次数
    breakCount: number | undefined;
    // 违纪扣分
    minus: number | undefined;
    // 创建时间
    createAt: Date | undefined;
    // 修改时间
    updateAt: Date | undefined;

    // 设置值
    setValue(student: Student): void {
        this.id = student.id;
        this.name = student.name;
        this.stuNumber = student.stuNumber;
        this.class_ = student.class_;
        this.gender = student.gender;
        this.phone = student.phone;
        this.breakCount = student.breakCount;
        this.minus = student.minus;
        this.createAt = student.createAt;
        this.updateAt = student.updateAt;
    }

    setUndefined(): void {
        this.id = undefined;
        this.name = undefined;
        this.stuNumber = undefined;
        this.class_ = undefined;
        this.gender = undefined;
        this.phone = undefined;
        this.breakCount = undefined;
        this.minus = undefined;
        this.createAt = undefined;
        this.updateAt = undefined;
    }
}