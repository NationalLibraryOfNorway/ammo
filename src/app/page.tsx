'use client';

import ItemThumbnail from '@/components/ItemThumbnail';
import {Spinner} from '@nextui-org/spinner';
import {useEffect, useState} from 'react';
import {ItemImage} from '@/models/ItemImage';
import {getAllItems, getAllLocks, lockItem} from '@/services/item.data';
import {useAuth} from '@/app/AuthProvider';
import {useRouter} from 'next/navigation';
import {ItemLock} from '@prisma/client';

export default function Home() {
  const [items, setItems] = useState<ItemImage[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {user} = useAuth();

  const getItems = async () => {
    // const data = await getAllItems()
    //   .catch((e: Error) => {
    //     console.error(`Error when fetching items: ${e.message}`);
    //     return [];
    //   });
    // setItems(data);
    // setLoading(false);
    await getAllItems().then(async res => {
      const data = await res.json() as Item[];
      setItems(data);
      return data;
    })
      .then(async data => {
        await getAllLocks().then(async res => {
          const locks = await res.json() as {itemId: string; username: string}[];

          const newItems = data.map(item => {
            const lock = locks.find(l => l.itemId === item.id);
            return {...item, lock};
          });
          setItems(newItems);
        });
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    void getItems();
  }, []);

  const handleItemClicked = async (id: string) => {
    if (!user) {
      return Promise.reject(new Error('User not authenticated'));
    }
    await lockItem(id, user?.username).then(res => {
      if (res.status === 201) {
        router.push(`/${id}`);
      } else {
        alert('Could not lock item');
      }
    });
  };

  const isItemLockedForUser = (lock?: ItemLock): boolean => {
    return lock !== undefined && lock?.username !== user?.username;
  };

  return (
    <div className="thumbnail-container">
      { loading ?
        <Spinner /> :
        <>
          {items.map(item => (
            <ItemThumbnail
              key={item.id}
              item={item}
              onItemClick={id => void handleItemClicked(id)}
              locked={isItemLockedForUser(item.lock)}
            />
          ))}
        </>
      }
    </div>
  );
}
