import { FC, FormEvent, useState } from "react";
import cls from "./AuthPage.module.scss";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store/store";
import { loginUser } from "../../core/store/userSlice";
import { Navigate } from "react-router-dom";

interface AuthPageProps {}

interface AuthForm {
  login: string;
  password: string;
}

const AuthPage: FC<AuthPageProps> = () => {
  const [authForm, setAuthForm] = useState<AuthForm>({
    login: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector((s: RootState) => s.userSlice);
  const onUpdateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setAuthForm((prev) => {
      const newForm = { ...prev, [e.target.name]: e.target.value };
      return newForm;
    });
  };

  const onSendFormHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ login: authForm.login, password: authForm.password }));
  };
  console.log(selector.login,'login')
  return (
    <div>
      {selector.login && <Navigate to="/" />}
      <h1 className={cn(cls["auth__title"])}>Авторизация</h1>
      <form
        className={cn(cls["auth__form"])}
        onSubmit={(e) => onSendFormHandler(e)}
      >
        <input
          type="text"
          name="login"
          id="login"
          value={authForm.login}
          placeholder="Логин"
          className={cn(cls["auth__input"])}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateForm(e)}
        />
        <input
          type="text"
          name="password"
          id="password"
          value={authForm.password}
          placeholder="Пароль"
          className={cn(cls["auth__input"])}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateForm(e)}
        />
        <input type="submit" value="Войти" className={cn(cls["auth__sub"])} />
      </form>
    </div>
  );
};

export default AuthPage;
