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

    // 设置值
    setValue(class_: Class): void {
        this.id = class_.id;
        this.name = class_.name;
        this.classroom = class_.classroom;
        this.startDate = class_.startDate;
        this.endDate = class_.endDate;
        this.headTeacher = class_.headTeacher;
        this.createAt = class_.createAt;
        this.updateAt = class_.updateAt;
    }

    // 设置为初始值
    setUndefined(): void {
        this.id = undefined;
        this.name = undefined;
        this.classroom = undefined;
        this.startDate = undefined;
        this.endDate = undefined;
        this.headTeacher = undefined;
        this.createAt = undefined;
        this.updateAt = undefined;
    }
}