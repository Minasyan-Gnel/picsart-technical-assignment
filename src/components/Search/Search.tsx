import React from 'react';

import { debounce } from '../../utils';
import { SearchContainer, SearchInput } from './styles';

type SearchProps = {
    onSearch: (search: string) => void;
}

export const Search = ({onSearch}: SearchProps) => {
    const debouncedSearch = debounce(onSearch, 500);

    return <SearchContainer>
        <SearchInput type="text" placeholder="Search photos" onChange={(e) => debouncedSearch(e.target.value)} />
    </SearchContainer>;
};

