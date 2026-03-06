export type Post = {
    id: number;
    username: string;
    content: string;
    avatarUrl?: string;
    createdAt: string;
    likesCount: number;
    commentsCount: number;
    repostsCount: number;
    images?: string[];
}

export type Activity = {
    id: number;
    username: string;
    content: string;
    avatarUrl?: string;
    createdAt: string;
    likesCount: number;
    commentsCount: number;
    repostsCount: number;
    imageUrls?: string[];
}

export type User = {
    id: number;
    username: string;
    avatarUrl?: string;
    bio?: string;
    website?: string;
    followersCount: number;
}

export type SuggestedProfile = {
    id: number;
    username: string;
    subtitle: string;
    avatarUrl: string;
}
