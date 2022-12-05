import { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce'

interface SearchInputProps{
  setSearchQuery(searchQuery: string): void
  searchQuery: string;
}

export function SearchInput(
  props: SearchInputProps
) {
  const { setSearchQuery, searchQuery } = props
  const [query, setQuery] = useState<string>(searchQuery)
  const debouncedQuery = useDebounce(query, 150)

  useEffect(() => {
    setSearchQuery(debouncedQuery)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery])

  return (
    <>
      <div>
        <label htmlFor="search" className="mt-3">
          Search ...
        </label>
        <input
          value={searchQuery}
          type="search"
          id="search"
          className="form-control full-width"
          placeholder="search ..."
          aria-label="search"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
    </>
  )
}
