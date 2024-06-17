"use client";
import Image from 'next/image';
import { useState } from 'react';

const PartidoImage = ({src, alt, width = 350, height = 100}) => {
  const [imgDefault, setImgDefault] = useState(false)
  const onError = () => {
    setImgDefault("/logos/partidos/default.png")
  }
  return <Image onError={onError} className='self-center' src={imgDefault ? imgDefault : src} alt='logo partido' width={width} height={height} />
}
export default PartidoImage;