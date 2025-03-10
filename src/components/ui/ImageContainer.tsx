import NextImage from 'next/image';
import {Image} from '@heroui/react';

export const ImageContainer = (props: {src: string}) => {
  return (
    <div className="image-container">
      <Image as={NextImage} layout="fill" className="image" src={props.src} alt="Bilde"/>
    </div>
  );
};