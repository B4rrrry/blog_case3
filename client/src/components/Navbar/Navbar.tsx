import { FC } from "react";
import cls from "./Navbar.module.scss";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store/store";
import { Button } from "@mui/material";
import { userActions } from "../../core/store/userSlice";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const selector = useSelector((s: RootState) => s.userSlice);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <nav className={cn(cls.navbar)}>
      <Link to="/" className={cn(cls.profileLink)}>
        Блог
      </Link>
      <Link to="/profile" className={cn(cls.profileLink, cls.profile)}>
        Профиль
      </Link>
      {!selector.login && (
        <>
          {" "}
          <Link to="/auth" className={cn(cls.profileLink)}>
            Войти
          </Link>
          <Link to="/register" className={cn(cls.profileLink)}>
            Регистрация
          </Link>
        </>
      )}
      {selector.login && (
        <button
          className={cn(cls.exit)}
          onClick={() => {
            dispatch(userActions.exitUser());
          }}
        >
          Выход
        </button>
      )}
    </nav>
  );
};

export default Navbar;
