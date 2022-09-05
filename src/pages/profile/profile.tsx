//страница с настройками профиля пользователя
import styles from "./profile.module.css";

import ProfileMenu from "../../components/profile-menu/profile-menu";
import ProfileForm from "../../components/profile-form/profile-form";

const Profile = () => {
  return (
    <div className={styles.content}>
      <ProfileMenu />
      <ProfileForm />
    </div>
  );
};

export default Profile;
