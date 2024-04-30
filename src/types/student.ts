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
}