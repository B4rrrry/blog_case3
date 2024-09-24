import { FC } from "react";
import cls from "./PostCard.module.scss";
import cn from "classnames";
import { Link } from "react-router-dom";

interface PostCardProps {
  className?: string;
}

const PostCard: FC<PostCardProps> = ({className}) => {
  return (
    <div className={cn(cls["post-item"], className)}>
      <div className={cn(cls["post-header"])}>
        <Link to="/post/1" className={cn(cls["post-name"])}>
          Заголовок
        </Link>
        <p className={cn(cls["post-date"])}>15.09.2024</p>
      </div>
      <img src="/preview.jpg" alt="" className={cn(cls["post-preview"])} />
      <p className={cn(cls["post-description"])}>Описание</p>
      <p className={cn(cls["post-comments"])}>
        <img
          src="/comment.svg"
          alt="comments"
          className={cn(cls["post-comments__img"])}
        />
        <span>30</span>
      </p>
    </div>
  );
};

export default PostCard;
