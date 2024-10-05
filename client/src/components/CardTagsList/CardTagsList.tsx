import { FC } from "react";
import cls from "./CardTagsList.module.scss";
import cn from "classnames";
import { TagProps } from "../../core/store/types/postsSliceTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../core/store/store";

interface CardTagsListProps {
  className?: string;
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  tags: TagProps[];
}

const CardTagsList: FC<CardTagsListProps> = ({ className, onClick, tags }) => {
  const selector = useSelector((s: RootState) => s.postsSlice);
  return (
    <ul className={cn(cls["tags__list"], className)}>
      {tags.map((tag) => {
        return (
          <li
            key={tag.id}
            data-id={tag.id}
            className={cn(cls["tags__list-item"])}
            onClick={(e) => onClick(e)}
          >
            {tag.title}
          </li>
        );
      })}
      {/*    <li className={cn(cls["tags__list-item"])}>Путешествие</li> */}
    </ul>
  );
};

export default CardTagsList;
