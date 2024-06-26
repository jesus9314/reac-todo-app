export type Task = {
    id: string;
    name: string;
    state: boolean;
    limitDate: Date;
}

export type DraftTask = Omit<Task, 'id'>