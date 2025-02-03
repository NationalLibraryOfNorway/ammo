import {Autocomplete, AutocompleteItem} from '@heroui/autocomplete';
import {CatalogTitle} from '@/models/CatalogTitle';
import {Key} from 'react';
import {useAsyncList} from '@react-stately/data';
import {searchNewspaperTitlesInCatalog} from '@/services/catalog.data';

interface TitleSearchAutocompleteProps {
  onSelectionChange: (key: CatalogTitle | null) => void;
}

export const TitleSearchAutocomplete = (props: TitleSearchAutocompleteProps) => {

  const titles = useAsyncList<CatalogTitle>({
    async load({signal, filterText}) {
      if (!filterText) {
        return {items: []};
      }
      const data = await searchNewspaperTitlesInCatalog(filterText, signal);
      return { items: data };
    }
  });

  const handleSelectionChanged = (key: Key | null) => {
    const selectedTitle = titles.items.find(title => title.catalogueId === key);
    if (selectedTitle) {
      props.onSelectionChange(selectedTitle);
    }
  };

  return (
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
        onSelectionChange={key => handleSelectionChanged(key)}
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
  );
};