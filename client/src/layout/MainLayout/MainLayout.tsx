import { FC } from "react";
import cls from "./MainLayout.module.scss";
import cn from "classnames";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

interface MainLayoutProps {}

const MainLayout: FC<MainLayoutProps> = () => {
  return (
    <div>
      <Navbar />
      <div className={cn(cls.content)}>
      <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
