import { Post } from "./post"
import { User } from "./user"

export type Comment = {
    user:string, //nickname
    post:string, //id
    comments:Comment[]
}
