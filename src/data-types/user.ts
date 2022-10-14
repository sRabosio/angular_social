import { Comment } from "./comments";
import { Post } from "./post";

export type User = {
    nickname:string,
    email:string,
    image?:string,
    password:string,
    following:string[],//nickname
    likedPosts:string[],//id
    likedComments:string[]//id
}