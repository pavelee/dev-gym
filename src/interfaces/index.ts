export interface IPost {
    id: string;
    title: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
    category: ICategory;
}

export interface ICategory {
    id: string;
    title: string;
}

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface ITechnology {
    id: number,
    name: string
}

export interface ITest {
    id: number,
    name: string,
    description: string,
    technology: ITechnology
}

export interface IQuestion {
    id: number,
    title: string,
    content: string,
    answers: IAnswer[]
}

export interface IAnswer {
    id: number,
    content: string,
    correct: boolean
}