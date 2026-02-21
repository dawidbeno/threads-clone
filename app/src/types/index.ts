export type Post = {
    id: number;
    username: string;
    content: string;
    avatarUrl?: string;
    createdAt: string;
    likesCount: number;
    commentsCount: number;
    repostsCount: number;
    imageUrl?: string;
}