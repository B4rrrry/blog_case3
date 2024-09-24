import { FC } from "react";
import cls from "./PostCreatePage.module.scss";
import cn from "classnames";

interface PostCreatePageProps {}

const PostCreatePage: FC<PostCreatePageProps> = () => {
  return (
    <div>
      <h1 className={cn(cls["post-create__title"])}>Создание поста</h1>
      <form className={cn(cls["post-create__form"])}>
        <label htmlFor="">
          Превью:
          <input
            type="file"
            name="img"
            id="img"
            className={cn(cls["post-create__file-input"])}
          />
        </label>

        <img src="" alt="" className={cn(cls["post-create__img"])} />
        <textarea
          name=""
          id=""
          className={cn(cls["post-create__area"])}
        ></textarea>
        <input
          type="submit"
          value="Создать"
          className={cn(cls["post-create__sub"])}
        />
      </form>
    </div>
  );
};

export default PostCreatePage;
