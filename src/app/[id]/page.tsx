'use client';

import {Key, useEffect, useState} from 'react';
import {approveItem, getItemImage, getItemMetadata} from '@/services/item.data';
import {Spinner} from '@nextui-org/spinner';
import NextImage from 'next/image';
import {CalendarDate, DateInput, Image} from '@nextui-org/react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Input} from '@nextui-org/input';
import {Button} from '@nextui-org/button';
import {NewspaperMetadata} from '@/models/NewspaperMetadata';
import {parseDate, today} from '@internationalized/date';
import {useRouter} from 'next/navigation';
import {useAsyncList} from '@react-stately/data';
import {CatalogTitle} from '@/models/CatalogTitle';
import {searchNewspaperTitlesInCatalog} from '@/services/catalog.data';
import {Autocomplete, AutocompleteItem} from '@nextui-org/autocomplete';

interface NewspaperFormInput {
  title: string;
  titleId: string;
  date: CalendarDate;
  editionNumber: string;
  volume: string;
}

export default function Page({params}: { params: { id: string } }) {
  const { register, handleSubmit, control, setValue, formState: {errors}, } = useForm<NewspaperFormInput>({
    mode: 'onChange'
  });
  const [imageSrc, setImageSrc] = useState<string>();
  const [extractedMetadata, setExtractedMetadata] = useState<NewspaperMetadata>();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<NewspaperFormInput> = data => {
    setIsSubmitting(true);
    const metadata: NewspaperMetadata = {
      title: data.title,
      titleId: data.titleId,
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
      await getItemImage(params.id).then(async res => {
        const data = await res.json() as string;
        setImageSrc(data);
      });
      await getItemMetadata(params.id).then(async res => {
        const data = await res.json() as NewspaperMetadata;
        setExtractedMetadata(data);
        setValue('title', data.title);
        setValue('titleId', data.titleId);
        setLoading(false);
      });
    };
    void getItem();
  }, [params.id, setValue]);

  const titles = useAsyncList<CatalogTitle>({
    async load({signal, filterText}) {
      if (!filterText) {
        return {items: []};
      }
      const data = await searchNewspaperTitlesInCatalog(filterText, signal);
      return { items: data };
    }
  });

  const dateValue = (date: Date): CalendarDate => {
    return parseDate(date.toISOString()?.substring(0, 10));
  };

  const onSelectionChange = (key: Key | null) => {
    const selectedTitle = titles.items.find(title => title.catalogueId === key);
    if (selectedTitle) {
      setValue('title', selectedTitle.name);
      setValue('titleId', selectedTitle.catalogueId);
    }
  };

  return (
    <div>
      { loading ?
        <Spinner /> :
        <>
          { imageSrc && extractedMetadata &&
            <div className="flex items-center">
              <div className="image-container">
                <Image as={NextImage} layout="fill" className="image" src={imageSrc} alt="Bilde"/>
              </div>
              <div className="px-2.5 max-w-full">
                <div className="min-w-full">
                  <Autocomplete
                    label="Finn avistittel"
                    variant="bordered"
                    className="min-w-full"
                    placeholder="Søk etter avistittel"
                    description="Bruk søkefeltet for å finne tittel og id"
                    autoFocus
                    menuTrigger="input"
                    isLoading={titles.isLoading}
                    items={titles.items}
                    onSelectionChange={key => onSelectionChange(key)}
                    onInputChange={value => titles.setFilterText(value)}
                    allowsEmptyCollection={false}
                    allowsCustomValue={true}
                  >
                    {item => (
                      <AutocompleteItem
                        key={item.catalogueId}
                        textValue={item.name}
                        endContent={
                          <div className="text-xs text-gray-500">
                            {item.catalogueId}
                          </div>
                        }
                      >
                        <div>
                          {item.name}
                          <div>
                            {item.startDate && (
                              <span className="text-xs text-gray-500">Fra {item.startDate}</span>
                            )}
                            {item.endDate && (
                              <span className="text-xs text-gray-500"> til {item.endDate}</span>
                            )}
                          </div>
                        </div>
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </div>

                <form onSubmit={() => void handleSubmit(onSubmit)()} className="flex flex-col gap-4">
                  <div className="flex flex-row gap-4">
                    <Controller
                      name="title"
                      control={control}
                      rules={{required: 'Tittel er påkrevd'}}
                      render={({ field }) =>
                        <Input
                          {...field}
                          className="w-2/3"
                          type="text"
                          label="Tittel"
                          isDisabled
                        />
                      }
                    />
                    <Controller
                      name="titleId"
                      control={control}
                      rules={{required: 'ID er påkrevd'}}
                      render={({ field }) =>
                        <Input
                          {...field}
                          className="w-1/3"
                          type="text"
                          label="ID"
                          isDisabled
                        />
                      }
                    />
                  </div>
                  <Controller
                    name="date"
                    control={control}
                    rules={{
                      required: 'Dato er påkrevd',
                      validate: {
                        futureDate: value => {
                          return value >= today('Europe/Oslo')
                            ? 'Datoen kan ikke være i fremtiden'
                            : true;
                        }
                      }
                    }}
                    defaultValue={dateValue(new Date(extractedMetadata.date))}
                    render={({field}) => (
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
                  <div className="flex flex-row gap-4">
                    <Input
                      type="text"
                      label="Nummer"
                      variant={'bordered'}
                      {...register('editionNumber')}
                      defaultValue={extractedMetadata.editionNumber}
                    />
                    <Input
                      type="text"
                      label="Årgang"
                      variant={'bordered'}
                      {...register('volume')}
                      defaultValue={extractedMetadata.volume}
                    />
                  </div>
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