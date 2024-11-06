import {ItemLock} from '@prisma/client';

export interface ItemImage {
  id: string;
  thumbnail: string;
  image: string;
  lock?: ItemLock;
}
