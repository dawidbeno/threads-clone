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

export type User = {
    id: number;
    username: string;
    avatarUrl?: string;
    bio?: string;
    website?: string;
    followersCount: number;
}