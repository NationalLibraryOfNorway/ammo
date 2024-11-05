import {ItemImage} from '@/models/ItemImage';
import Image from 'next/image';
import Link from 'next/link';

export default function ItemThumbnail(props: {item: ItemImage}) {
  return (
    <Link href={`/${props.item.id}`} key={props.item.id}>
      <div className="thumbnail-item" >
        <Image src={props.item.thumbnail} alt="Forhåndsvisning av objekt" width={100} height={100} priority={true}/>
        <p className="thumbnail-text">{props.item.id}</p>
      </div>
    </Link>
  );
}