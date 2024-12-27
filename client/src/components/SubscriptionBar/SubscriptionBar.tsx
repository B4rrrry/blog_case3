import { FC, useMemo } from "react";
/* import cls from "./SubscriptionBar.module.css"; */
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store/store";
import SubscriptionButton from "../SubscriptionButton/SubscriptionButton";
import UnSubscriptionButton from "../UnSubscriptionButton/UnSubscriptionButton";

interface SubscriptionBarProps {}

const SubscriptionBar: FC<SubscriptionBarProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { post } = useSelector((s: RootState) => s.postsSlice);
  const { id, subUserId, subscriptions } = useSelector(
    (s: RootState) => s.userSlice
  );

  const subBtnShow = useMemo(() => {
    if (subscriptions && post) {
      return subscriptions?.filter((sub) => sub.userId == post.userId).length;
    }
  }, [subscriptions]);

  return (
    <>
      {subUserId && post && !subBtnShow ? (
        <SubscriptionButton userId={post.userId} subUserId={subUserId} />
      ) : (
        subUserId &&
        post &&
        subBtnShow && (
          <UnSubscriptionButton userId={post.userId} subUserId={subUserId} />
        )
      )}
    </>
  );
};

export default SubscriptionBar;
