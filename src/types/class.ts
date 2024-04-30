import Staff from "./staff";

export default class Class {
    // id
    id: number | undefined;
    // 班级名称
    name: string | undefined;
    // 班级教室
    classroom: string | undefined;
    // 开课时间
    startDate: Date | undefined;
    // 结课时间
    endDate: Date | undefined;
    // 班主任
    headTeacher: Staff | undefined;
    // 创建时间
    createAt: Date | undefined;
    // 修改时间
    updateAt: Date | undefined;
}