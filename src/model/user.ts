import { Member } from "./member"
export interface User {

    userName: string,
    password: string,
    userId: string,
    member: Member[],
    email: string,
    gKey: string,
    age: string,
    birthday: string,
    gender: string,
    createdTimestamp: string,

    purchaseRecord: string[]
}