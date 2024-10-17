'use client';

import {useEffect, useState} from 'react';
import {Item} from '@/models/Item';
import {approveItem, getItem as getSingleItem, getItemMetadata} from '@/services/item.data';
import {Spinner} from '@nextui-org/spinner';
import NextImage from 'next/image';
import {CalendarDate, DateInput, Image} from '@nextui-org/react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Input} from '@nextui-org/input';
import {Button} from '@nextui-org/button';
import {NewspaperMetadata} from '@/models/NewspaperMetadata';
import {parseDate, today} from '@internationalized/date';
import {useRouter} from 'next/navigation';

interface NewspaperFormInput {
  title: string;
  date: CalendarDate;
  editionNumber: string;
  volume: string;
}

export default function Page({params}: { params: { id: string } }) {
  const { register, handleSubmit, control, formState: {errors} } = useForm<NewspaperFormInput>();
  const [item, setItem] = useState<Item>();
  const [generatedMetadata, setGeneratedMetadata] = useState<NewspaperMetadata>();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<NewspaperFormInput> = data => {
    setIsSubmitting(true);
    const metadata: NewspaperMetadata = {
      title: data.title,
      date: data.date.toString().substring(0, 10),
      editionNumber: data.editionNumber,
      volume: data.volume
    };
    void approveItem(params.id, metadata).then(res => {
      if (res.ok) {
        router.push('/');
      } else {
        throw new Error(`Noe gikk galt ved godkjenning: ${res.status}`);
      }
    }).then(() => {
      router.push('/');
    }).catch(e => {
      if (e instanceof Error) {
        alert(e.message);
      }
    });
  };

  useEffect(() => {
    const getItem = async () => {
      await getSingleItem(params.id).then(async res => {
        const data = await res.json() as Item;
        setItem(data);
      });
      await getItemMetadata(params.id).then(async res => {
        const data = await res.json() as NewspaperMetadata;
        setGeneratedMetadata(data);
        setLoading(false);
      });
    };
    void getItem();
  }, [params.id]);


  const dateValue = (date: Date): CalendarDate => {
    return parseDate(date.toISOString()?.substring(0, 10));
  };

  return (
    <div>
      { loading ?
        <Spinner /> :
        <>
          { item && generatedMetadata &&
            <div className="flex items-center">
              <div className="image-container">
                <Image as={NextImage} layout="fill" className="image" src={item.image} alt="Bilde"/>
              </div>
              <div className="px-2.5">
                <h1>{item.id}</h1>
                <form onSubmit={() => void handleSubmit(onSubmit)()} className="flex flex-col gap-4">
                  <Input
                    type="text"
                    label="Tittel"
                    variant={'bordered'}
                    {...register('title', { required: 'Tittel er et påkrevd felt' })}
                    placeholder="Skriv inn tittel på avisen"
                    defaultValue={generatedMetadata.title}
                    isInvalid={!!errors.title}
                    errorMessage={errors.title?.message}
                  />
                  <Controller
                    name="date"
                    control={control}
                    rules={{ required: true, validate: { futureDate: value => {
                      return value >= today('Europe/Oslo')
                        ? 'Datoen kan ikke være i fremtiden'
                        : true;
                    } } }}
                    defaultValue={dateValue(new Date(generatedMetadata.date))}
                    render={({ field }) => (
                      <DateInput
                        {...field}
                        value={field.value}
                        onChange={e => field.onChange(e)}
                        label="Utgivelsesdato"
                        variant={'bordered'}
                        isInvalid={!!errors.date}
                        errorMessage={errors.date?.message}
                      />
                    )}
                  />
                  <Input
                    type="text"
                    label="Nummer"
                    variant={'bordered'}
                    {...register('editionNumber')}
                    defaultValue={generatedMetadata.editionNumber}
                  />
                  <Input
                    type="text"
                    label="Årgang"
                    variant={'bordered'}
                    {...register('volume')}
                    defaultValue={generatedMetadata.volume}
                  />
                  <Button
                    color={!isSubmitting ? 'primary' : 'default'} onClick={() => void handleSubmit(onSubmit)()}
                    isDisabled={isSubmitting}
                    startContent={isSubmitting && <Spinner className='ml-1' size='sm'/>}
                  >Godkjenn</Button>
                </form>
              </div>
            </div>
          }
        </>
      }
    </div>
  );
}