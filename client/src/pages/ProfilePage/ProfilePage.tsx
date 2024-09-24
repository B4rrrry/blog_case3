import { FC } from 'react'
//import cls from './ProfilePage.module.scss' 
import cn from 'classnames' 

interface ProfilePageProps {} 


const ProfilePage : FC<ProfilePageProps> = () => {
return(
  <div>
    <h1>Профиль</h1>
    <p className="profile__name">Имя, Фамилия, Отчество</p>
    
  </div> )
} 

export default ProfilePage;