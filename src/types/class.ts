import Staff from "./staff";

export default class Class {
    // id
    id!: number;
    // 班级名称
    name!: string;
    // 班级教室
    classroom!: string;
    // 开课时间
    startDate!: Date;
    // 结课时间
    endDate!: Date;
    // 班主任
    headTeahcer!: Staff;
    // 创建时间
    createAt!: Date;
    // 修改时间
    updateAt!: Date;
}