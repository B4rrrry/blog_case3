import { FC, FormEvent, useState } from "react";
import cls from "./CommentsForm.module.scss";
import cn from "classnames";
import commentService from "../../core/services/commentService";
import { useSelector } from "react-redux";
import { RootState } from "../../core/store/store";

interface CommentsFormProps {}

const CommentsForm: FC<CommentsFormProps> = () => {
  const [text, setText] = useState("");
  const { post } = useSelector((s: RootState) => s.postsSlice);
  const { id } = useSelector((s: RootState) => s.userSlice);
  const sendComment = async (e : FormEvent) => {
    e.preventDefault();
    const newComments = await commentService.create(id!,post!.id,text);
    return newComments;
  };
  return (
    <form onSubmit={(e) => sendComment(e)} className={cn(cls["comments-wrap"])}>
      <input
        type="text"
        name="comments"
        id="comments"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={cn(cls["comments__text"])}
      />
      <input
        type="submit"
        value="Отправить"
        className={cn(cls["comments__sub"])}
      />
    </form>
  );
};

export default CommentsForm;
