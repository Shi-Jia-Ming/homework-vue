import Class from "./class";

export default class Student {
    // id
    id!: number;
    // 姓名
    name!: string;
    // 学号
    stuNumber!: string;
    // 所属班级
    class_!: Class;
    // 性别
    gender!: number;
    // 手机号
    phone!: string;
    // 最高学历
    degree!: number;
    // 违纪次数
    breakCount!: number;
    // 违纪扣分
    minus!: number;
    // 创建时间
    createAt!: Date;
    // 修改时间
    updateAt!: Date;
}