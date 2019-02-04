export enum EItemTypes {
    story = "story",
    comment = "comment",
    job = "job",
    poll = "poll",
    pollopt = "pollopt"
}

export interface IItem {
    id: number;
    deleted: boolean;
    type: EItemTypes;
    by: string;
    time: number;
    text: string;
    dead: boolean;
    parent: number;
    poll: number; // pollopt only
    kids: number[];
    url: string;
    score: number;
    title: string;
    parts: number[]; // poll only
    descendants: number;
    comments: IItem[];
    index: number;
}

export interface IUser {
    id: string;
    delay: number;
    created: number;
    karma: number;
    about: string;
    submitted: number[];
}
