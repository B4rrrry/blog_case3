import { FC } from "react";
import cls from "./UnSubscriptionButton.module.scss";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../core/store/store";
import {
  createSubscription,
  deleteSubscription,
} from "../../core/store/reducers/userReducers";

interface UnSubscriptionButtonProps {
  userId: string;
  subUserId: string;
}

const UnSubscriptionButton: FC<UnSubscriptionButtonProps> = ({
  userId,
  subUserId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const onClickHandler = async () => {
    const sub = dispatch(deleteSubscription({ userId }));
  };

  console.log(userId, "sub user id");
  console.log(subUserId, "subUserId user id");
  return (
    <button className={cn(cls["button__sub"])} onClick={() => onClickHandler()}>
      Отписаться
    </button>
  );
};

export default UnSubscriptionButton;
