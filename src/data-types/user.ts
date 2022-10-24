
export type User = {
    nickname:string,
    email:string,
    image?:string,
    password:string,
    following:string[],//nickname
    followers:string[],//nickname
    likedPosts:string[],//id
    likedComments:string[]//id
}
