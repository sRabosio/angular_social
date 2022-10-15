import { User } from "./user"

export type Post={
  id?:number,
    user:string, //nickname
    title:string,
    text:string,
    date:Date
}
