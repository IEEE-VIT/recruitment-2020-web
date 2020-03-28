import React from 'react';

import './SearchBox.css'

const SearchBox = ({searchField, searchChange}) => {
    return (
        <div className='pa2'>
            <input
                className='searchbox'
                type='search'
                placeholder='Search Candidate' 
                onChange={searchChange}
                />
        </div>
    );
}

export default SearchBox;