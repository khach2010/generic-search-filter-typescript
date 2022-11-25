import React, { useEffect, useState} from 'react'
import useDebounce from '../hooks/useDebounce'

interface SearchInputProps {
  setSearchQuery: (searchQuery: string) => void;

}

export function SearchInput(props: SearchInputProps) {

  const {setSearchQuery} = props
  const [query, setQuery] = useState<string>('')
  const debouncedQuery = useDebounce( query, 500);

  useEffect(() => {
    setSearchQuery(debouncedQuery)
  }, [ debouncedQuery , setSearchQuery ])

  return (
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
  )
}

