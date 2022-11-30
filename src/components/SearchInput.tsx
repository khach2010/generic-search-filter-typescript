import React, { useEffect, useState} from 'react'
import useDebounce from '../hooks/useDebounce'
import { PropsWithChildrenFunction } from '../types/PropsWithChildrenFunction'
import genericSearch from '../utils/genericSearch'

interface SearchInputProps<T> {
  dataSource: Array<T>
  searchKeys: Array< keyof T>
}

export function SearchInput<T>(props: PropsWithChildrenFunction<SearchInputProps<T>, T> ) {

  const {searchKeys, dataSource, children} = props
  const [query, setQuery] = useState<string>('')
  const [searchQuery , setSearchQuery] = useState<string>('')
  const debouncedQuery = useDebounce( query, 500);

  useEffect(() => {
    setSearchQuery(debouncedQuery)
  }, [ debouncedQuery , setSearchQuery ])

  return (
    <>
   
    <div>
      <label htmlFor="search" className='mt-3'>Search ...</label>
      <input 
      type="search" 
      id='search' 
      className='form-control full-width' 
      placeholder='search ...' 
      aria-label='search' 
      onChange={event => setQuery(event.target.value)} />
    </div>
    
     {children &&
        dataSource
          .filter((person) => genericSearch(person, searchKeys, searchQuery,false))
          .map((widget) => children(widget))}

    </>

  )
}

