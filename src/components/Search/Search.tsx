import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { debounce } from '../../utils';
import { SearchContainer, SearchInput } from './styles';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams(); 

  const onSearch = useCallback((search: string) => {
    setSearchParams({q: search});
  }, [setSearchParams]); 

  const debouncedSearch = debounce(onSearch, 600);

  return <SearchContainer>
    <SearchInput type="text" defaultValue={searchParams.get('q') || ''} placeholder="Search photos" onChange={(e) => debouncedSearch(e.target.value)} />
  </SearchContainer>;
};

