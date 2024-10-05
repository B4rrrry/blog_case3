import { FC, useEffect, useState } from "react";
import cls from "./PostCreatePage.module.scss";
import cn from "classnames";
import TagsList from "../../components/TagsList/TagsList";
import { createPost, getTags } from "../../core/store/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store/store";
import {
  TagProps,
} from "../../core/store/types/postsSliceTypes";

interface PostState {
  title: string | "";
  description: string | "";
  tags: string[];
  tagsSelected: TagProps[];
}

interface PostCreatePageProps {}

const PostCreatePage: FC<PostCreatePageProps> = () => {
  const [post, setPost] = useState<PostState>({
    title: "",
    description: "",
    tags: [],
    tagsSelected: [],
  });
  const [preview, setPreview] = useState<File>();
  const dispatch = useDispatch<AppDispatch>();
  const { tags } = useSelector((s: RootState) => s.postsSlice);
  const user = useSelector((s: RootState) => s.userSlice);
  useEffect(() => {
    dispatch(getTags());
    //postService.getPosts();
  }, []);
  console.log(tags,'TAGSS')
  const onChangeInputDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPost((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onTagAdd = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const targetBtn = e.target as HTMLElement;
    const id = targetBtn.dataset.id;
    let newTags = post.tags;
    let newTag = post.tagsSelected;
    let tagsSelected = post.tagsSelected;

    if (newTags.length != 0) {
      const filterTag = post.tags.filter((item) => item == id);
      if (filterTag.length == 0 && id) {
        newTag = tags.filter((tag) => tag.id == id);
        tagsSelected.push(...newTag);
        newTags.push(id);
      }
      return setPost((prev) => {
        return { ...prev, tags: newTags, tagsSelected };
      });
    }
    if (id) {
      newTags.push(id);
      newTag = tags.filter((tag) => tag.id == id);
      setPost((prev) => {
        return { ...prev, tags: newTags, tagsSelected: newTag };
      });
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file") {
      console.log(e.target.files![0]);
      const file = e.target.files![0];
      setPreview(file);
      setPost((prev) => {
        return { ...prev, preview: file };
      });
    }
    setPost((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const clearTags = () => {
    setPost((prev) => {
      return { ...prev, tagsSelected: [], tags: [] };
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user.id || !preview) {
      return;
    }
    dispatch(
      createPost({
        title: post.title,
        description: post.description,
        preview: preview,
        userId: user.id,
        tags: post.tags,
        type: "public",
      })
    );
  };
  return (
    <div>
      <h1 className={cn(cls["post-create__title"])}>Создание поста</h1>
      <form
        className={cn(cls["post-create__form"])}
        onSubmit={(e) => onSubmit(e)}
      >
        <label htmlFor="" className={cn(cls["post-create__label"])}>
          Превью:
          <input
            type="file"
            name="preview"
            id="img"
            className={cn(cls["post-create__file-input"])}
            onChange={(e) => onChangeInput(e)}
          
          />
        </label>

        <img src="" alt="" className={cn(cls["post-create__img"])} />
        <label htmlFor="" className={cn(cls["post-create__label"])}>
          Заголовок:
          <input
            type="text"
            name="title"
            id=""
            value={post.title}
            onChange={(e) => onChangeInput(e)}
            className={cn(cls["post-create__text-input"])}
          />
        </label>
        <p style={{ marginBottom: "10px" }}>Список тегов:</p>
        <TagsList
          className={cls["post-create__tags"]}
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
            onTagAdd(e)
          }
          tags={tags}
        />
        <textarea
          name="description"
          id=""
          className={cn(cls["post-create__area"])}
          value={post.description}
          onChange={(e) => onChangeInputDescription(e)}
        ></textarea>
        <input
          type="text"
          hidden
          name="tags"
          id=""
          value={post.tags}
          onChange={(e) => onChangeInput(e)}
        />
        {post.tagsSelected.length ? (
          <div className={cn(cls["post-create__tags-footer"])}>
            <ul className={cn(cls["post-create__tags-list"])}>
              {post.tagsSelected &&
                post.tagsSelected.map((tag) => (
                  <li className={cn(cls["post-create__tags-item"])}>
                    <p className={cn(cls["post-create__tags--selected"])}>
                      {tag.title}
                    </p>
                  </li>
                ))}
            </ul>
            <button
              className={cn(cls["post-create__tags-remove"])}
              onClick={clearTags}
            >
              Сбросить
            </button>
          </div>
        ) : null}
        <button className={cn(cls["post-create__sub"])}>Создать</button>
      </form>
    </div>
  );
};

export default PostCreatePage;
