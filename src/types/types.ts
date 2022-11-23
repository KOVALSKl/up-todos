
export class Task {
    public title: string;
    public description: string;
    public date: string;
    public complete: boolean;
    public files: string[];

    constructor();
    constructor(task?: Task) {
        this.title = task?.title ?? '';
        this.description = task?.description ?? '';
        this.date = task?.date ?? new Date().toLocaleDateString('en-En', { hour: '2-digit', minute: '2-digit' });
        this.complete = task?.complete ?? false;
        this.files = task?.files ?? [];
    }
}

export enum ActionTypes {
    ADD,
    DELETE,
    UPDATE,
}

export type State = {
    value: Task[];
}

export type Action = {
    type: ActionTypes;
    payload: {
        value: Task,
        updateValue?: Task
    }
}