'use server';

import {TextItem} from '@/models/TextItem';
import {getUserToken} from '@/utils/cookieUtils';
import {ItemImage} from '@/models/ItemImage';
import {NewspaperMetadata} from '@/models/NewspaperMetadata';

const itemList: string[] = [
  'dagbladet_null_null_20240827_156_198_1',
  'dagbladet_null_null_20240826_156_197_1',
  'bergensavisen_null_null_20241012_0_277_1',
  'tffolkebladet_null_null_20241009_60_235_1',
  'listertjuefjorten_null_null_20241012_134_121_1',
  'finansavisen_null_null_20241012_33_238_1',
  'aftenposten_null_null_20241013_165_278_1',
  'fjordenestidende_null_null_20241010_114_39_1',
  'bergensavisen_null_null_20241013_0_278_1',
  'harstadtidende_null_null_20241010_138_236_1',
  'gjengangeren_null_null_20241012_0_0_1',
  'haldenarbeiderblad_null_null_20241012_95_121_1',
  'eidsvollullensakerbl_null_null_20241012_121_161_1',
  'rjukanarbeiderblad_null_null_20241012_101_121_1',
  'klassekampen_null_null_20241012_56_238_1'
];

const baseUrl = process.env.NEXT_PUBLIC_IMAGE_API_PATH;

export async function getAllItemThumbnails(): Promise<ItemImage[]> {
  const data: ItemImage[] = [];
  itemList.forEach(id => {
    data.push({
      id,
      thumbnail: `${baseUrl}${id}-1_001_hovedavis/full/0,200/0/native.jpg`,
      image: `${baseUrl}${id}-1_001_hovedavis/full/full/0/native.jpg`
    });
  });
  return Promise.resolve(data);
}

export async function getItemImage(id: string): Promise<string> {
  return Promise.resolve(`${baseUrl}${id}-1_001_hovedavis/full/full/0/native.jpg`);
}

export async function getItem(id: string): Promise<TextItem> {
  const userToken = await getUserToken();
  if (!userToken) {
    throw new Error('Unauthorized');
  }

  // TODO: Replace with actual data once in place
  return {
    id,
    extractedMetadata: {
      title: 'Dagbladet (Oslo: 1869-)',
      titleId: '1600000882',
      date: '2024-08-27',
      editionNumber: '195',
      volume: '154'
    }
  };
}

export async function approveItem(id: string, item: NewspaperMetadata): Promise<void> {
  const userToken = await getUserToken();
  if (!userToken) {
    throw new Error('Unauthorized');
  }
  console.log(`Approving item ${id} for user ${userToken.username} with metadata: ${JSON.stringify(item)}`);
  return Promise.resolve();
}
