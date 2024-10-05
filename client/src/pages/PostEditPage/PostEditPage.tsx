import { FC, useEffect, useState } from "react";
import cls from "./PostEditPage.module.scss";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store/store";
import { createPost, getPostById, getTags, updatePost } from "../../core/store/postsSlice";
import { useParams } from "react-router-dom";
import TagsList from "../../components/TagsList/TagsList";
import { TagProps } from "../../core/store/types/postsSliceTypes";

interface PostEditPageProps {}

interface PostState {
  title: string | "";
  description: string | "";
  tags: string[];
  tagsSelected: TagProps[];
}

const PostEditPage: FC<PostEditPageProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tags } = useSelector((s: RootState) => s.postsSlice);
  const { post } = useSelector((s: RootState) => s.postsSlice);
  const [info, setInfo] = useState<PostState>({
    title: post?.title || "",
    description: post?.description || "",
    tags: post?.tags_posts.map(tag => tag.tag.id) || [],
    tagsSelected: post?.tags_posts.map(tag => tag.tag) || [],
  });
  const params = useParams<{ id: string }>();

  const user = useSelector((s: RootState) => s.userSlice);
  useEffect(() => {
    if (params.id) {
      dispatch(getPostById(params.id));
    }
    //postService.getPosts();
  }, []);
  console.log(tags, "TAGSS");
  const onChangeInputDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onTagAdd = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const targetBtn = e.target as HTMLElement;
    const id = targetBtn.dataset.id;
    let newTags = info.tags;
    let newTag = info.tagsSelected;
    let tagsSelected = info.tagsSelected;

    if (newTags.length != 0) {
      const filterTag = info.tags.filter((item) => item == id);
      if (filterTag.length == 0 && id) {
        newTag = tags.filter((tag) => tag.id == id);
        tagsSelected.push(...newTag);
        newTags.push(id);
      }
      return setInfo((prev) => {
        return { ...prev, tags: newTags, tagsSelected };
      });
    }
    if (id) {
      newTags.push(id);
      newTag = tags.filter((tag) => tag.id == id);
      setInfo((prev) => {
        return { ...prev, tags: newTags, tagsSelected: newTag };
      });
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const clearTags = () => {
    setInfo((prev) => {
      return { ...prev, tagsSelected: [], tags: [] };
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user.id) {
      return;
    }
     dispatch(
      updatePost({
        title: info.title,
        description: info.description,
        tags: info.tags,
        postId: post!.id
      })
    );
  };
  return (
    <div>
      <h1 className={cn(cls["post-edit__title"])}>Редактирование поста</h1>
      <form
        className={cn(cls["post-edit__form"])}
        onSubmit={(e) => onSubmit(e)}
      >
        <img src="" alt="" className={cn(cls["post-edit__img"])} />
        <label htmlFor="" className={cn(cls["post-edit__label"])}>
          Заголовок:
          <input
            type="text"
            name="title"
            id=""
            value={info.title}
            onChange={(e) => onChangeInput(e)}
            className={cn(cls["post-edit__text-input"])}
          />
        </label>
        <p style={{ marginBottom: "10px" }}>Список тегов:</p>
        <TagsList
          className={cls["post-edit__tags"]}
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
            onTagAdd(e)
          }
          tags={tags}
        />
        <textarea
          name="description"
          id=""
          className={cn(cls["post-edit__area"])}
          value={info.description}
          onChange={(e) => onChangeInputDescription(e)}
        ></textarea>
        <input
          type="text"
          hidden
          name="tags"
          id=""
          value={info.tags}
          onChange={(e) => onChangeInput(e)}
        />
        {info.tagsSelected.length ? (
          <div className={cn(cls["post-edit__tags-footer"])}>
            <ul className={cn(cls["post-edit__tags-list"])}>
              {info.tagsSelected &&
                info.tagsSelected.map((tag) => (
                  <li className={cn(cls["post-edit__tags-item"])}>
                    <p className={cn(cls["post-edit__tags--selected"])}>
                      {tag.title}
                    </p>
                  </li>
                ))}
            </ul>
            <button
              className={cn(cls["post-edit__tags-remove"])}
              onClick={clearTags}
            >
              Сбросить
            </button>
          </div>
        ) : null}
        <button className={cn(cls["post-edit__sub"])}>Редактировать</button>
      </form>
    </div>
  );
};

export default PostEditPage;
