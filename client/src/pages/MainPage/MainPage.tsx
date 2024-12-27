import { FC, useEffect, useMemo, useState } from "react";
import cls from "./MainPage.module.scss";
import cn from "classnames";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import TagsList from "../../components/TagsList/TagsList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store/store";
import { getTags, getPosts } from "../../core/store/reducers/postReducers";

interface MainPageProps {}

enum PostTypesEnum {
  ALL = "all",
  SUBS = "subs",
}

const MainPage: FC<MainPageProps> = () => {
  const [sort, setSort] = useState<{ id: string }>({ id: "" });
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSort, setSelectedSort] = useState<{ name: string }>({
    name: "",
  });
  const { posts, tags } = useSelector((s: RootState) => s.postsSlice);
  const { login, subscriptions } = useSelector((s: RootState) => s.userSlice);
  const [typePosts, setTypePosts] = useState<PostTypesEnum>(PostTypesEnum.ALL);
  const updateSort = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const targetBtn = e.target as HTMLElement;
    const id = targetBtn.dataset.id;
    if (id && targetBtn.innerText) {
      setSelectedSort({ name: targetBtn.innerText });
      setSort({ id });
    }
  };
  const sortPosts = useMemo(() => {
    if (!sort || sort.id == "") {
      console.log(123);
      return posts;
    }
    const sorts = posts.filter((post) =>
      post.tags_posts.some((tag) => tag.tagId == sort.id)
    );
    return sorts;
  }, [posts, sort]);
  useEffect(() => {
    //sortPosts();
    dispatch(getPosts());
    dispatch(getTags());
    //postService.getPosts();
  }, []);
  console.log(selectedSort.name, "Nmam,e");
  return (
    <div className={cn(cls["post-wrap"])}>
      <h1 className={cn(cls["post-title"])}>Блог</h1>
      <div className={cn(cls["post__header"])}>
        <p className={cn(cls["post__text"])}>Сортировка:</p>
        <TagsList
          tags={tags}
          onClick={(e) => updateSort(e)}
          selectedValue={selectedSort.name}
        />
        {sort.id != "" ? (
          <button
            className={cn(cls["post__clear-tags"])}
            onClick={() => {
              setSort({ id: "" });
              setSelectedSort({ name: "" });
            }}
          >
            Сбросить
          </button>
        ) : (
          ""
        )}
        {login && (
          <Link className={cn(cls["post__create-btn"])} to="/post/create">
            Создать пост
          </Link>
        )}
      </div>
      <ul className={cn(cls["post-types__list"])}>
        <li className={cn(cls["post-types__item"])}>
          <button
            className={cn(cls["post-types__btn"], {
              [cls["post-types__btn--active"]]: typePosts == PostTypesEnum.ALL ? true : false,
            })}
            onClick={() => setTypePosts(PostTypesEnum.ALL)}
          >
            Все
          </button>
        </li>
        <li className={cn(cls["post-types__item"])}>
          <button
            className={cn(cls["post-types__btn"], {
              [cls["post-types__btn--active"]]: typePosts == PostTypesEnum.SUBS ? true : false,
            })}
            onClick={() => setTypePosts(PostTypesEnum.SUBS)}
          >
            Подписки
          </button>
        </li>
      </ul>
      {sortPosts && sortPosts.length == 0 ? (
        <p>Постов нет:(</p>
      ) : (
        <>
          {typePosts == PostTypesEnum.ALL
            ? sortPosts.map((post) => {
                return (
                  <PostCard
                    key={post.id}
                    className={cls["post-item"]}
                    post={post}
                  />
                );
              })
            : sortPosts
                .filter((post) =>
                  subscriptions.some((sub) => sub.userId === post.userId)
                )
                .map((post) => {
                  return (
                    <PostCard
                      key={post.id}
                      className={cls["post-item"]}
                      post={post}
                    />
                  );
                })}
        </>
      )}
    </div>
  );
};

export default MainPage;
