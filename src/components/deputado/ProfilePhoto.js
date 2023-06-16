import React from "react";
import styles from './ProfilePhoto.module.scss'

function ProfilePhoto({foto, alt}) {
  return (
    <div className={styles.profileFeature}>
      <div className={styles.profilePicture}>
        <img src={foto} alt={alt} />
      </div>
    </div>
  )
}

export default ProfilePhoto