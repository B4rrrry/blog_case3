import { FC } from "react";
import cls from "./CommentItem.module.scss";
import cn from "classnames";

interface CommentItemProps {}

const CommentItem: FC<CommentItemProps> = () => {
  return (
    <div className={cn(cls["comment"])}>
      <div className={cn(cls["comment-header"])}>
        <p className={cn(cls["comment__name"])}>Имя</p>
        <p className={cn(cls["comment__date"])}>11.11.1111</p>
      </div>
      <p className={cn(cls["comment__text"])}>Комментарий</p>
    </div>
  );
};

export default CommentItem;
