import { FC } from "react";
import cls from "./CommentsForm.module.scss";
import cn from "classnames";

interface CommentsFormProps {}

const CommentsForm: FC<CommentsFormProps> = () => {
  return (
    <div className={cn(cls["comments-wrap"])}>
      <input
        type="text"
        name="comments"
        id="comments"
        className={cn(cls["comments__text"])}
      />
      <input
        type="submit"
        value="Отправить"
        className={cn(cls["comments__sub"])}
      />
    </div>
  );
};

export default CommentsForm;
