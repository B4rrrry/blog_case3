import { FC, useEffect } from "react";
import cls from "./PostPage.module.scss";
import cn from "classnames";
import CommentItem from "../../components/CommentItem/CommentItem";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import TagsList from "../../components/TagsList/TagsList";
import CommentsForm from "../../components/CommentsForm/CommentsForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store/store";
import { getPostById } from "../../core/store/postsSlice";
import postService from "../../core/services/postService";

interface PostPageProps {}

const PostPage: FC<PostPageProps> = () => {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { post } = useSelector((s: RootState) => s.postsSlice);
  const { id } = useSelector((s: RootState) => s.userSlice);
  const navigate = useNavigate();
  const tags = post ? post?.tags_posts.map((tag) => tag.tag) : [];
  useEffect(() => {
    redirect("/");
    if (params.id) {
      dispatch(getPostById(params.id));
    }
  }, []);
  const deletePostById = async (id: string) => {
    try {
      const post = await postService.deletePost(id);
      if (post.status == 200) {
        alert("Пост успешно удален");
        return navigate("/");
      }
      console.log(post, "Deleted");
    } catch (e) {
      console.log(e, "ERORR");
    }
  };

  return (
    <div className={cn(cls["post"])}>
      <div className={cn(cls["post-header"])}>
        <h1 className={cn(cls["post__title"])}>{post?.title}</h1>
        {id == post?.userId ? (
          <>
            <button
              className={cn(cls["post__delete"])}
              onClick={() => (post ? deletePostById(post.id) : "")}
            >
              Удалить
            </button>
            <Link
              to={`/post/edit/${post?.id}`}
              className={cn(cls["post__edit-btn"])}
            >
              Редактировать
            </Link>{" "}
          </>
        ) : (
          ""
        )}
        <p className={cn(cls["post__count"])}>
          <img
            src="/comment.svg"
            alt="comments"
            className={cn(cls["post__img"])}
          />
          {post?.comments.length}
        </p>
      </div>
      <img
        src={`${process.env.REACT_APP_SERVER_URL}posts_preview/${post?.preview}`}
        alt="Preview"
        className={cn(cls["post__preview"])}
      />
      <p className={cn(cls["post__description"])}>{post?.description}</p>
      <div className={cn(cls["post__footer"])}>
        <TagsList tags={tags} onClick={(e) => console.log()} />
        {post?.userId == id ? (
          ""
        ) : (
          <>
            {id && (
              <button className={cn(cls["post__sub"])}>Подписаться</button>
            )}
          </>
        )}
      </div>
      <h2 className={cn(cls["post-comments__title"])}>Комментарии</h2>
      {post?.comments.length == 0 ? (
        <p>Комментариев нет</p>
      ) : (
        <ul className={cn(cls["post-comments"])}>
          {post?.comments.map((comment) => (
            <li className={cn(cls["post-comments__item"])} key={comment.id}>
              <CommentItem
                name={comment.user.login}
                date={comment.createdAt}
                text={comment.text}
              />
            </li>
          ))}
          {/* <li className={cn(cls["post-comments__item"])}>
            <CommentItem />
          </li> */}
        </ul>
      )}
      {id && <CommentsForm />}
    </div>
  );
};

export default PostPage;
