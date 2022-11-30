import React, { useState } from 'react'
import ISorter from '../interfaces/ISorter'
import { PropsWithChildrenFunction } from '../types/PropsWithChildrenFunction'
import genericSort from '../utils/genericSort'

export interface SortersProps<T> {
  dataSource: Array<T>
  initialSortProperty: keyof T
}

export function Sorters<T extends object>(
  props: PropsWithChildrenFunction<SortersProps<T>, T>
) {
  const { dataSource, initialSortProperty, children } = props
  const [sortProperty, setSortProperty] = useState<ISorter<T>>({
    property: initialSortProperty,
    isDescending: true,
  })
  const object = dataSource.length > 0 ? dataSource[0] : {}
  return (
    <>
      <label htmlFor="sorters">Sorters! try here</label>
      <select
        name="sorters"
        id="sorters"
        className="custom-select"
        onChange={(e) => {
          const values = e.target.value.split('-')
          if (values.length === 2) {
            setSortProperty({
              property: values[0] as any,
              isDescending: values[1] === 'true',
            })
          }
        }}
      >
        {Object.keys(object).map((key) => (
          <>
            <option key={`${key}-true`} value={`${key}-true`}>
              {' '}
              sort by: {`${key}-Descending`}{' '}
            </option>
            <option key={`${key}-false`} value={`${key}-false`}>
              {' '}
              sort by: {`${key}-Ascending`}{' '}
            </option>
          </>
        ))}
      </select>
      {children &&
        dataSource
          .sort((a, b) => genericSort(a, b, sortProperty))
          .map((widget) => children(widget))}
    </>
  )
}
