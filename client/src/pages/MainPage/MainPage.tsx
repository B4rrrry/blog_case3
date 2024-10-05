import { FC, useCallback, useEffect, useMemo, useState } from "react";
import cls from "./MainPage.module.scss";
import cn from "classnames";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import TagsList from "../../components/TagsList/TagsList";
import userService from "../../core/services/userService";
import postService from "../../core/services/postService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store/store";
import postsSlice, { getTags } from "../../core/store/postsSlice";
import { getPosts } from "./../../core/store/postsSlice";
import { PostProps } from "../../core/store/types/postsSliceTypes";

interface MainPageProps {}

const MainPage: FC<MainPageProps> = () => {
  const [sort, setSort] = useState<{ id: string }>({ id: "" });
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSort, setSelectedSort] = useState<{ name: string }>({
    name: "",
  });
  const { posts, tags } = useSelector((s: RootState) => s.postsSlice);
  const { login } = useSelector((s: RootState) => s.userSlice);

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

    console.log(sorts, "|||");
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
        {sort.id != '' ? (
          <button
            className={cn(cls["post__clear-tags"])}
            onClick={() => {
              setSort({ id: "" });
              setSelectedSort({ name: "" });
            }}
          >
            Сбросить
          </button>
        ) : ""}
        {login && (
          <Link className={cn(cls["post__create-btn"])} to="/post/create">
            Создать пост
          </Link>
        )}
      </div>
      {sortPosts &&
        sortPosts.map((post) => {
          return (
            <PostCard key={post.id} className={cls["post-item"]} post={post} />
          );
        })}
    </div>
  );
};

export default MainPage;
