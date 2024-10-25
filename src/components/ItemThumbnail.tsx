import {ItemImage} from '@/models/ItemImage';
import Image from 'next/image';
import {LuLock} from 'react-icons/lu';

export default function ItemThumbnail(props: {item: ItemImage; onItemClick: (id: string) => void; locked: boolean}) {
  return (
    <div
      className={`thumbnail-item ${props.locked ? 'cursor-default' : 'cursor-pointer hover:bg-gray-200'}`}
      key={props.item.id}
      onClick={() => !props.locked && props.onItemClick(props.item.id)}>
      <div className="relative">
        <Image src={props.item.thumbnail} alt="Forhåndsvisning av objekt" width={100} height={100} priority={true}/>
        {props.locked && (
          <div
            className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-60 cursor-default">
            <LuLock size={64} className="text-white"/>
          </div>)}
      </div>
    </div>
  );
}
