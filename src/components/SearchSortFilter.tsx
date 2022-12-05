import React, { useState } from 'react'
import IFilter from '../interfaces/IFilter'
import ISorter from '../interfaces/ISorter'
import PropsWithChildrenFunction from '../types/PropsWithChildrenFunction'
import genericFilter from '../utils/genericFilter'
import genericSearch from '../utils/genericSearch'
import genericSort from '../utils/genericSort'
import Filters from './Filters'
import { SearchInput } from './SearchInput'
import { Sorters } from './Sorters'

export interface ISearchSortFilterProps<T> {
  title: string;
  dataSource: Array<T>;
  initialSearchQuery: string;
  searchProperties: Array<keyof T>;
  initialSortProperty:  ISorter<T> ;
  initialFilterProperties: Array< IFilter<T> >  
}
export interface ISearchSortFilterState<T> {
  searchQuery: string;
  sortProperty: ISorter<T>;
  filterProperties: Array<IFilter<T>>;

}


export function SearchSortFilter<T extends object>(props: 
  PropsWithChildrenFunction<ISearchSortFilterProps<T>, T>
  ) {

  const {title, dataSource, initialSearchQuery, searchProperties, initialSortProperty, initialFilterProperties, children } = props

  const [searchSortFilterState, setSearchSortFilterState] = useState<ISearchSortFilterState<T>>({
      searchQuery: initialSearchQuery,
      sortProperty: initialSortProperty,
      filterProperties: initialFilterProperties
  })

  const { searchQuery, sortProperty, filterProperties } = searchSortFilterState

  return (
    <>
      <h2>{title}</h2>
      <SearchInput searchQuery={searchQuery} setSearchQuery={(searchQuery) => setSearchSortFilterState({
        ...searchSortFilterState,
        searchQuery: searchQuery
        // update searchQuery in searchSortFilterState
       })} />

      <Sorters dataSource={dataSource} setSortProperty={(sortProperty) => setSearchSortFilterState({
        ...searchSortFilterState,
        sortProperty: sortProperty
        // update sortProperty in searchSortFilterState
      })} />

      <Filters dataSource={dataSource} filterProperties={filterProperties} setFilterProperties={(filterProperty) => setSearchSortFilterState({
         ...searchSortFilterState,
         filterProperties: filterProperties
         // update filterProperty in searchSortFilterState
      })} />
      {
        children && dataSource   
        .filter((a) => genericSearch(a, searchProperties, searchQuery,false))
        .sort((a, b) => genericSort(a, b, sortProperty))
          .filter((a) => genericFilter(a, filterProperties))
          .map((a) => children(a))
      }
    </>
  )
}
