export interface IPost {
    body: string;
    comments: any[];
    created_at: Date;
    file: string;
    id: string;
    postLikes: IPostLike[];
    userId: string;
    user: IUser;
}

export interface IPostLike {
    created_at: Date;
    id: string;
    postId: string;
    userId: string;
}

export interface IUser {
    landmark: string | null;
    village: string | null;
    city: string | null;
    state: string | null;
    bio: string | null;
    created_at: Date;
    email: string | null;
    id: string;
    image: string | null;
    name: string | null;
    phonenumber: string | null;
    user_type: string;
}

export interface INotification {
    create_at: Date;
    data: string;
    id: string;
    receiverId: string;
    sender?: IUser;
    senderId: string;
    title: string;
}
