export interface TagProps {
  title: string;
  tagId: string;
  id: string;
}

export interface CommentsProps {
  id: string;
  postId:string;
  text: string;
  createdAt: string;
  userId: string;
  user: {
    login: string;
  }
}

export interface TagsProps {
  id: string;
  tagId:string;
  postId: string;
  tag: TagProps;
}

export interface PostProps {
  id: string;
  title: string;
  description: string;
  preview: string;
  userId: string;
  type: string;
  createdAt: string;
  tags_posts: TagsProps[];
  comments: CommentsProps[];
}

export interface InitialStatePosts {
  posts: PostProps[];
  tags:TagProps[];
  post: PostProps | undefined;
}

export interface FormDataPost {
  title: string;
  description: string;
  userId: string;
  type: string;
  tags: string[];
  preview: File;
}
