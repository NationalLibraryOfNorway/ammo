'use client';

import { useEffect, useState, use } from 'react';
import {Spinner} from '@heroui/spinner';
import {NewspaperMetadata} from '@/models/NewspaperMetadata';
import {MetadataForm} from '@/features/metadata-form';
import {ImageContainer} from '@/components/ui/ImageContainer';
import {getItem, getItemImage} from '@/actions/items';

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [imageSrc, setImageSrc] = useState<string>();
  const [extractedMetadata, setExtractedMetadata] = useState<NewspaperMetadata>();

  useEffect(() => {
    const getItemMetadata = async () => {
      await getItemImage(params.id).then(imageUrl => {
        setImageSrc(imageUrl);
      });
      await getItem(params.id).then(item => {
        setExtractedMetadata(item.extractedMetadata);
      });
    };
    void getItemMetadata();
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