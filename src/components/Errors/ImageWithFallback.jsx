import { useState } from 'react';

function ImageWithFallback({ fallback, src, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const onError = () => setImgSrc(fallback);
  return <img src={imgSrc ? imgSrc : fallback} onError={onError} {...props} />;
}
export default ImageWithFallback;


// contoh penggunaan 
// <ImageWithFallback
// src={data?.results?.profile_picture}  ini adalah source gambar utama
// fallback={doctorMale} ini adalah source gambar alternatif jika broken image
// className='avatar object-fit-cover'
// alt="Profile Picture" 
// width={100}
// height={100}
// />