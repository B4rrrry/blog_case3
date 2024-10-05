import { FC } from "react";
import cls from "./TagsList.module.scss";
import cn from "classnames";
import { TagProps } from "../../core/store/types/postsSliceTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../core/store/store";

interface TagsListProps {
  className?: string;
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  tags: TagProps[];
  selectedValue?: string;
}

const TagsList: FC<TagsListProps> = ({
  className,
  onClick,
  tags,
  selectedValue,
}) => {
  const selector = useSelector((s: RootState) => s.postsSlice);
  return (
    <ul className={cn(cls["tags__list"], className)}>
      {tags.map((tag) => {
        return (
          <li
            key={tag.id}
            data-id={tag.id}
            className={cn(cls["tags__list-item"], {
              [cls["tags__list-item--active"]]:
                selectedValue  != "" && selectedValue == tag.title ? true : false,
            })}
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

export default TagsList;
