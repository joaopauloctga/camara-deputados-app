import React from "react";
import styles from './ProfilePhoto.module.scss'
import Image from "next/image";

function ProfilePhoto({foto, alt, size = 'lg', name = null}) {
  return (
    <div className={styles.profileFeature}>
      <div className={`${styles.profilePicture} ${styles[`${size}`]}`}>
        <Image src={foto} width={100} height={100} alt={alt} />
      </div>
      {name !== null && <h3 className="text-center">{name}</h3>}
    </div>
  )
}

export default ProfilePhoto