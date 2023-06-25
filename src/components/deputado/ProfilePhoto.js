import React from "react";
import styles from './ProfilePhoto.module.scss'

function ProfilePhoto({foto, alt, size = 'lg', name = null}) {
  return (
    <div className={styles.profileFeature}>
      <div className={`${styles.profilePicture} ${styles[`${size}`]}`}>
        <img src={foto} alt={alt} />
      </div>
      {name !== null && <h3 className="text-center">{name}</h3>}
    </div>
  )
}

export default ProfilePhoto