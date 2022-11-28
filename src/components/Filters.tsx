import React from 'react'

export interface FiltersProps<T> {
  object: T
  properties: Array<keyof T>
  onChangeFilter: (property: keyof T) => void
}

export default function Filters<T extends object>(props: FiltersProps<T>) {
  const { object, properties, onChangeFilter } = props

  return (
    <div className="p-1 my-2">
    
      {Object.keys(object).map((key) => {
        return (
          <>
            <input
              type="checkbox"
              value={key}
              id={key}
              onChange={() => onChangeFilter(key as any)}
              checked={properties.some(property => property === key)}
              className='m-1 ml-3'
            />
            <label htmlFor="key" >{key}</label>
          </>
        )
      })}
    </div>
  )
}
