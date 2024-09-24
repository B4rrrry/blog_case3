import { FC } from "react";
import cls from "./PostEditPage.module.scss";
import cn from "classnames";

interface PostEditPageProps {}

const PostEditPage: FC<PostEditPageProps> = () => {
  return (
    <div>
      <h1 className={cn(cls["post-edit__title"])}>Редактирование поста</h1>
      <form className={cn(cls["post-edit__form"])}>
        <label htmlFor="">
          Превью:
          <input
            type="file"
            name="img"
            id="img"
            className={cn(cls["post-edit__file-input"])}
          />
        </label>

        <img src="" alt="" className={cn(cls["post-edit__img"])} />
        <textarea
          name=""
          id=""
          className={cn(cls["post-edit__area"])}
        ></textarea>
        <input
          type="submit"
          value="Обновить"
          className={cn(cls["post-edit__sub"])}
        />
      </form>
    </div>
  );
};

export default PostEditPage;
