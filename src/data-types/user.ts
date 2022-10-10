import { Comment } from "./comments";
import { Post } from "./post";

export type User = {
    nickname:string,
    email:string,
    image?:string,
    password:string,
    followed?:User[],
    likedPosts?:Post[],
    comments?:Comment[],
    likedComments?:Comment[]
}