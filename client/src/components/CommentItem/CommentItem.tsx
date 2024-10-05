import { FC } from "react";
import cls from "./CommentItem.module.scss";
import cn from "classnames";
import { reverseDate } from "../../helpers/reverseDate";

interface CommentItemProps {
  name: string;
  date: string;
  text: string;
}

const CommentItem: FC<CommentItemProps> = ({name, date,text},props) => {
  const dateTransform = reverseDate(date.slice(0, 10).replaceAll("-", "."));
  return (
    <div className={cn(cls["comment"])} {...props}>
      <div className={cn(cls["comment-header"])}>
        <p className={cn(cls["comment__name"])}>{name}</p>
        <p className={cn(cls["comment__date"])}>{dateTransform}</p>
      </div>
      <p className={cn(cls["comment__text"])}>{text}</p>
    </div>
  );
};

export default CommentItem;
