import { Post } from "./post"
import { User } from "./user"

export type Comment = {
    user:User,
    post:Post,
    comments:Comment[]
}