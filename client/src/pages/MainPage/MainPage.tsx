import { FC, useEffect } from "react";
import cls from "./MainPage.module.scss";
import cn from "classnames";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import TagsList from "../../components/TagsList/TagsList";
import userService from "../../core/services/userService";

interface MainPageProps {}

const MainPage: FC<MainPageProps> = () => {
  useEffect(() => {
    console.log('login')
    userService.getUsers();
  }, []);

  return (
    <div className={cn(cls["post-wrap"])}>
      <h1 className={cn(cls["post-title"])}>Блог</h1>
      <div className={cn(cls["post__header"])}>
        <p className={cn(cls["post__text"])}>Сортировка:</p>
        <TagsList />
      </div>
      <PostCard className={cls["post-item"]} />
      <PostCard className={cls["post-item"]} />
    </div>
  );
};

export default MainPage;
