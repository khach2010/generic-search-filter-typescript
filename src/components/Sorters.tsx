import React from 'react'
import Property from '../interfaces/ISorter'

export interface SortersProps<T> {
  object: T
  setProperty: (propertyType: Property<T>) => void
}

export function Sorters<T extends object>(props: SortersProps<T>) {
  const { object, setProperty } = props

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
            setProperty({
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
    </>
  )
}
