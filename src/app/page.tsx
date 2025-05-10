'use client';

import ItemThumbnail from '@/components/ui/ItemThumbnail';
import {Spinner} from '@heroui/spinner';
import {useEffect, useState} from 'react';
import {ItemImage} from '@/models/ItemImage';
import {useAuth} from '@/providers/AuthProvider';
import {useRouter} from 'next/navigation';
import {ItemLock} from '@prisma/client';
import {getAllLocks, lockItem} from '@/actions/locks';
import {getAllItemThumbnails} from '@/actions/items';

export default function Home() {
  const [items, setItems] = useState<ItemImage[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {user} = useAuth();

  const getItems = async () => {
    await getAllItemThumbnails()
      .then((res: ItemImage[]) => {
        setItems(res);
        return res;
      })
      .then(async fetchedItems => {
        await getAllLocks().then(locks => {
          const newItems = fetchedItems.map(item => {
            const lock = locks.find(l => l.itemId === item.id);
            return {...item, lock};
          });
          setItems(newItems);
        });
      })
      .catch((e: Error) => {
        console.error(`Error when fetching items: ${e.message}`);
        return [];
      });
    setLoading(false);
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    void getItems();
  }, [user]);

  const handleItemClicked = async (id: string) => {
    if (!user) {
      return Promise.reject(new Error('User not authenticated'));
    }
    await lockItem(id).then(() => {
      router.push(`/${id}`);
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
