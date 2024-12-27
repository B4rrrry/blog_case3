import { FC } from "react";
import cls from "./SubscriptionButton.module.scss";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../core/store/store";
import { createSubscription } from "../../core/store/reducers/userReducers";

interface SubscriptionButtonProps {
  userId: string;
  subUserId: string;
}

const SubscriptionButton: FC<SubscriptionButtonProps> = ({
  userId,
  subUserId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const onClickHandler = async () => {
    const sub = dispatch(createSubscription({ subUserId, userId }));
    /* dispatch(getSubscriptionById(subUserId)); */
  };

  console.log(userId, "sub user id");
  console.log(subUserId, "subUserId user id");
  return (
    <button className={cn(cls["button__sub"])} onClick={() => onClickHandler()}>
      Подписаться
    </button>
  );
};

export default SubscriptionButton;
