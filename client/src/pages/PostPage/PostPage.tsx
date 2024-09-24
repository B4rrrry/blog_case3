import { FC } from "react";
import cls from "./PostPage.module.scss";
import cn from "classnames";
import CommentItem from "../../components/CommentItem/CommentItem";
import { Link } from "react-router-dom";
import TagsList from "../../components/TagsList/TagsList";
import CommentsForm from "../../components/CommentsForm/CommentsForm";

interface PostPageProps {}

const PostPage: FC<PostPageProps> = () => {
  return (
    <div className={cn(cls["post"])}>
      <div className={cn(cls["post-header"])}>
        <h1 className={cn(cls["post__title"])}>Заголовок</h1>
        <button className={cn(cls["post__delete"])}>Удалить</button>
        <Link to="/post/edit/1" className={cn(cls["post__edit-btn"])}>
          Редактировать
        </Link>
        <p className={cn(cls["post__count"])}>
          <img
            src="/comment.svg"
            alt="comments"
            className={cn(cls["post__img"])}
          />
          123
        </p>
      </div>
      <img
        src="/preview.jpg"
        alt="Preview"
        className={cn(cls["post__preview"])}
      />
      <p className={cn(cls["post__description"])}>Описание</p>
      <div className={cn(cls["post__footer"])}>
        <TagsList />
        <button className={cn(cls["post__sub"])}>Подписаться</button>
      </div>
      <h2 className={cn(cls["post-comments__title"])}>Комментарии</h2>
      <ul className={cn(cls["post-comments"])}>
        <li className={cn(cls["post-comments__item"])}>
          <CommentItem />
        </li>
        <li className={cn(cls["post-comments__item"])}>
          <CommentItem />
        </li>
      </ul>
      <CommentsForm />
    </div>
  );
};

export default PostPage;
