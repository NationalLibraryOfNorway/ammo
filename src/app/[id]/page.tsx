'use client';

import {useEffect, useState} from 'react';
import {Spinner} from '@nextui-org/spinner';
import {NewspaperMetadata} from '@/models/NewspaperMetadata';
import {MetadataForm} from '@/features/metadata-form';
import {getItemImage, getItemMetadata} from '@/services/item.data';
import {ImageContainer} from '@/components/ui/ImageContainer';

export default function Page({params}: { params: { id: string } }) {
  const [imageSrc, setImageSrc] = useState<string>();
  const [extractedMetadata, setExtractedMetadata] = useState<NewspaperMetadata>();

  useEffect(() => {
    const getItem = async () => {
      await getItemImage(params.id).then(async res => {
        const data = await res.json() as string;
        setImageSrc(data);
      });
      await getItemMetadata(params.id).then(async res => {
        const data = await res.json() as NewspaperMetadata;
        setExtractedMetadata(data);
      });
    };
    void getItem();
  }, [params.id]);

  return (
    <div>
      { !extractedMetadata ?
        <Spinner /> :
        <>
          {imageSrc &&
              <div className="flex items-center">
                <ImageContainer src={imageSrc} />
                <MetadataForm id={params.id} extractedMetadata={extractedMetadata}/>
              </div>
          }
        </>
      }
    </div>
  )
  ;
}