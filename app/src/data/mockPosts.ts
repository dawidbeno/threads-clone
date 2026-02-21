import { Post } from "../types";

export const mockPosts: Post[] = [
    {id: 1, username: 'john_doe', content: 'Hello world! This is my first post on this platform.', createdAt: '2024-06-01T12:00:00Z', likesCount: 120, commentsCount: 15, repostsCount: 5, avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg'},
    { id: 2, username: 'julli.ik', content: 'Saturday morning ☕ no work notifications. Just coffee and deciding what to do with the day. How do you spend your Saturdays?', createdAt: '2024-06-01T10:27:00Z', likesCount: 77600, commentsCount: 567, repostsCount: 2200, avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, username: 'aisforaberration', content: 'Cernak for punching a Tkachuk you will be reincarnated as a lotus flower.', createdAt: '2024-06-01T00:00:00Z', likesCount: 967, commentsCount: 6, repostsCount: 21, avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: 4, username: 'nickveronica', content: 'I just cannot get over the USA-Slovakia jersey matchup. Who did this to us. We need names.', createdAt: '2024-05-31T23:00:00Z', likesCount: 689, commentsCount: 25, repostsCount: 14, avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg'},
    { id: 5, username: 'techbro42', content: 'Just shipped a new feature. Feels good. What are you building today?', createdAt: '2024-05-31T20:00:00Z', likesCount: 342, commentsCount: 89, repostsCount: 12, avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg' },
];