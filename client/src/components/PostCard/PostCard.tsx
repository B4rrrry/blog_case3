import { FC } from "react";
import cls from "./PostCard.module.scss";
import cn from "classnames";
import { Link } from "react-router-dom";
import { PostProps, TagsProps } from "../../core/store/types/postsSliceTypes";
import { reverseDate } from "../../helpers/reverseDate";
import TagsList from "../TagsList/TagsList";
import CardTagsList from "../CardTagsList/CardTagsList";

interface PostCardProps {
  className?: string;
  post: PostProps;
}

const PostCard: FC<PostCardProps> = ({ className, post }) => {
  const {
    id,
    title,
    description,
    preview,
    userId,
    type,
    tags_posts,
    createdAt,
    comments,
  } = post;
  const date = reverseDate(createdAt.slice(0, 10).replaceAll("-", "."));
  const tags = tags_posts.map((tag) => tag.tag).flat();
  return (
    <div className={cn(cls["post-item"], className)}>
      <div className={cn(cls["post-header"])}>
        <Link to={`/post/${id}`} className={cn(cls["post-name"])}>
          {title}
        </Link>
        <p className={cn(cls["post-date"])}>{date}</p>
      </div>
      <img
        src={`${process.env.REACT_APP_SERVER_URL}posts_preview/${preview}`}
        alt="preview"
        className={cn(cls["post-preview"])}
      />
      <p className={cn(cls["post-description"])}>{description}</p>
      <div className={cn(cls["post-footer"])}>
        <CardTagsList
          tags={tags}
          onClick={(e) => console.log("")}
          className={cls["post__tags"]}
        />
        {/* <TagsList tags={tags} onClick={(e) => console.log('')} className={cls["post__tags"]} /> */}
        <p className={cn(cls["post-comments"])}>
          <img
            src="/comment.svg"
            alt="comments"
            className={cn(cls["post-comments__img"])}
          />
          <span>{comments.length}</span>
        </p>
      </div>
    </div>
  );
};

export default PostCard;
