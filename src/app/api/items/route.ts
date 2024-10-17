import {NextResponse} from 'next/server';
import {ItemImage} from '@/models/ItemImage';

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

const baseLink = process.env.NEXT_PUBLIC_IMAGE_API_URL;

// GET /api/items
// eslint-disable-next-line
export async function GET(): Promise<NextResponse> {
  // TODO: Replace with actual data once in place
  const data: ItemImage[] = [];
  itemList.forEach(id => {
    data.push({
      id,
      thumbnail: `${baseLink}${id}-1_001_hovedavis/full/0,200/0/native.jpg`,
      image: `${baseLink}${id}-1_001_hovedavis/full/full/0/native.jpg`
    });
  });

  return NextResponse.json(data, {status: 200});
}