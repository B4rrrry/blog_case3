import { FC, FormEvent, useState } from "react";
import cls from "./RegisterPage.module.scss";
import cn from "classnames";

interface RegisterPageProps {}

interface RegisterForm {
  login: string;
  password: string;
  fName: string;
  sName: string;
  lName: string;
}

const RegisterPage: FC<RegisterPageProps> = () => {
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    login: "",
    password: "",
    fName: "",
    sName: "",
    lName: ""
  });

  const onUpdateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setRegisterForm((prev) => {
      const newForm = { ...prev, [e.target.name]: e.target.value };
      return newForm;
    });
  };

  const onSendFormHandler = (e : FormEvent) => {
    e.preventDefault();
    console.log(registerForm)
  }

  return (
    <div>
      <h1 className={cn(cls["register__title"])}>Регистрация</h1>
      <form className={cn(cls["register__form"])} onSubmit={(e) => onSendFormHandler(e)}>
        <input
          type="text"
          name="login"
          id="login"
          value={registerForm.login}
          placeholder="Логин"
          className={cn(cls["register__input"])}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateForm(e)}
        />
        <input
          type="text"
          name="password"
          id="password"
          value={registerForm.password}
          placeholder="Пароль"
          className={cn(cls["register__input"])}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateForm(e)}
        />
        <input
          type="text"
          name="fName"
          id="fName"
          value={registerForm.fName}
          placeholder="Фамилия"
          className={cn(cls["register__input"])}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateForm(e)}
        />
        <input
          type="text"
          name="sName"
          id="sName"
          value={registerForm.sName}
          placeholder="Имя"
          className={cn(cls["register__input"])}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateForm(e)}
        />
        <input
          type="text"
          name="lName"
          id="lName"
          value={registerForm.lName}
          placeholder="Отчество"
          className={cn(cls["register__input"])}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateForm(e)}
        />
        <input type="submit" value="Войти" className={cn(cls["register__sub"])} />
      </form>
    </div>
  );
};

export default RegisterPage;
