import React from 'react'
import ISorter from '../interfaces/ISorter'


export interface SortersProps<T> {
  dataSource: Array<T>;
  setSortProperty(sortProperty: ISorter<T>): void;
}

export function Sorters<T extends object>(
  props: SortersProps<T>
) {
  const { dataSource, setSortProperty } = props
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
          <React.Fragment key={key}>
            <option key={`${key}-true`} value={`${key}-true`}>
              {' '}
              sort by: {`${key}-Descending`}{' '}
            </option>
            <option key={`${key}-false`} value={`${key}-false`}>
              {' '}
              sort by: {`${key}-Ascending`}{' '}
            </option>
          </React.Fragment>
        ))}
      </select>
    </>
  )
}
