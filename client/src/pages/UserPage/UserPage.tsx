import { FC } from 'react'
import cls from './UserPage.module.scss' 
import cn from 'classnames' 

interface UserPage {} 


const UserPage : FC<UserPage> = () => {
return(
  <div>
    <h1>Username</h1>
    <p className="user__name">Имя, Фамилия, Отчество</p>
    <button className={cn(cls["user__sub"])}>Подписаться</button>
    
  </div> )
} 

export default UserPage;