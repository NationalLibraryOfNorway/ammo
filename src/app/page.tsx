'use client';

import ItemThumbnail from '@/components/ItemThumbnail';
import {Spinner} from '@nextui-org/spinner';
import {useEffect, useState} from 'react';
import {ItemImage} from '@/models/ItemImage';
import {getAllItems} from '@/services/item.data';

export default function Home() {
  const [items, setItems] = useState<ItemImage[]>([]);
  const [loading, setLoading] = useState(true);

  const getItems = async () => {
    const data = await getAllItems()
      .catch((e: Error) => {
        console.error(`Error when fetching items: ${e.message}`);
        return [];
      });
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    void getItems();
  }, []);

  return (
    <div className="thumbnail-container">
      { loading ?
        <Spinner /> :
        <>
          {items.map(item => (
            <ItemThumbnail key={item.id} item={item} />
          ))}
        </>
      }
    </div>
  );
}
