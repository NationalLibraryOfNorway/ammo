import {CalendarDate, DatePicker} from '@heroui/react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Input} from '@heroui/input';
import {parseDate, today} from '@internationalized/date';
import {Button} from '@heroui/button';
import {Spinner} from '@heroui/spinner';
import {useEffect, useState} from 'react';
import {NewspaperMetadata} from '@/models/NewspaperMetadata';
import {useRouter} from 'next/navigation';
import {CatalogTitle} from '@/models/CatalogTitle';
import {TitleSearchAutocomplete} from '@/components/ui/TitleSearchAutocomplete';
import {approveItem} from '@/actions/items';
import {unlockItem} from '@/actions/locks';

interface NewspaperFormInput {
  title: string;
  titleId: string;
  date: CalendarDate;
  editionNumber: string;
  volume: string;
}

interface MetadataFormProps {
  id: string;
  extractedMetadata: NewspaperMetadata;
}

export const MetadataForm = (props: MetadataFormProps) => {

  const { register, handleSubmit, control, setValue, formState: {errors}, } = useForm<NewspaperFormInput>({
    mode: 'onChange'
  });
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
    void approveItem(props.id, metadata).then(() => {
      router.push('/');
    })
      .then(async () => {
        await handleUnlockItem();
      })
      .then(() => {
        router.push('/');
      }).catch(e => {
        if (e instanceof Error) {
          alert(e.message);
        }
      });
  };

  useEffect(() => {
    setValue('title', props.extractedMetadata.title);
    setValue('titleId', props.extractedMetadata.titleId);
  }, [props.extractedMetadata.title, props.extractedMetadata.titleId, setValue]);

  const dateValue = (date: Date): CalendarDate => {
    return parseDate(date.toISOString()?.substring(0, 10));
  };

  const onSelectionChange = (title: CatalogTitle | null) => {
    if (title) {
      setValue('title', title.name);
      setValue('titleId', title.catalogueId);
    }
  };

  const handleUnlockItem = async () => {
    await unlockItem(props.id).then(() => {
      router.push('/');
      // if (res.ok) {
      //   router.push('/');
      // } else {
      //   alert('Kunne ikke slette lås.');
      // }
    });
  };

  return (
    <div className="px-2.5 max-w-full">
      <TitleSearchAutocomplete onSelectionChange={onSelectionChange}/>
      <form onSubmit={() => void handleSubmit(onSubmit)()} className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <Controller
            name="title"
            control={control}
            rules={{required: 'Tittel er påkrevd'}}
            render={({field}) =>
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
            render={({field}) =>
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
          defaultValue={dateValue(new Date(props.extractedMetadata.date))}
          render={({field}) => (
            <DatePicker
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
            defaultValue={props.extractedMetadata.editionNumber}
          />
          <Input
            type="text"
            label="Årgang"
            variant={'bordered'}
            {...register('volume')}
            defaultValue={props.extractedMetadata.volume}
          />
        </div>
        <Button
          color={!isSubmitting ? 'primary' : 'default'} onClick={() => void handleSubmit(onSubmit)()}
          isDisabled={isSubmitting}
          startContent={isSubmitting && <Spinner className='ml-1' size='sm'/>}
        >Godkjenn</Button>
        <Button
          variant="light"
          color="secondary"
          onClick={() => void handleUnlockItem()}
        >Avbryt</Button>
      </form>
    </div>
  )
  ;
};