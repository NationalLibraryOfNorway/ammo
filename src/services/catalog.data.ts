import {CatalogTitle} from '@/models/CatalogTitle';

export async function searchNewspaperTitlesInCatalog(searchTerm: string, signal: AbortSignal): Promise<CatalogTitle[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/catalog/title/search?searchTerm=${searchTerm}&materialType=NEWSPAPER`,
    {signal}
  )
    .then(response => {
      if (response.ok || response.status === 404) {
        return response.json() as Promise<CatalogTitle[]>;
      } else {
        return Promise.reject(new Error('Failed to fetch titles'));
      }
    })
    .catch(() => {
      return Promise.reject(new Error('Failed to fetch titles'));
    });
}