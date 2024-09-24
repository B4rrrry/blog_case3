import { FC } from "react";
import cls from "./TagsList.module.scss";
import cn from "classnames";

interface TagsListProps {}

const TagsList: FC<TagsListProps> = () => {
  return (
    <ul className={cn(cls["tags__list"])}>
      <li className={cn(cls["tags__list-item"])}>Путешествие</li>
    </ul>
  );
};

export default TagsList;
