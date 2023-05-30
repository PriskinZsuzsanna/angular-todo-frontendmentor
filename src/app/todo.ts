import { Guid } from "guid-typescript";

export class Todo {
    text: string = "";
    completed:boolean = false;
    id:string = Guid.create().toString();
}
