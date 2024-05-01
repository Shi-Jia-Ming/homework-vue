export default class Department {
    // 部门 id
    id: number | undefined;
    // 部门名称
    name: string | undefined;
    // 创建时间
    createAt: Date | undefined;
    // 更新时间
    updateAt: Date | undefined;

    // 设置值
    setValue(department: Department): void {
        this.id = department.id;
        this.name = department.name;
        this.createAt = department.createAt;
        this.updateAt = department.updateAt;
    }

    // 设置为初始值
    setUndefined(): void {
        this.id = undefined;
        this.name = undefined;
        this.createAt = undefined;
        this.updateAt = undefined;
    }
}