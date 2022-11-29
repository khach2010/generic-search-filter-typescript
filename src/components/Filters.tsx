import React from 'react'
import IFilter from '../interfaces/IFilter'

export interface FiltersProps<T> {
  object: T
  properties: Array<IFilter<T>>
  onChangeFilter: (property: IFilter<T>) => void
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
              id={`${key}-true`}
              onChange={() =>
                onChangeFilter({ property: key as any, isTruthySelected: true })
              }
              checked={properties.some(
                (property) =>
                  property.property === key && property.isTruthySelected
              )}
              className="m-1 ml-3"
            />
            <label htmlFor={`${key}-true`}>{key} is truthy</label>
            <br />
            <input
              type="checkbox"
              value={key}
              id={`${key}-false`}
              onChange={() =>
                onChangeFilter({
                  property: key as any,
                  isTruthySelected: false,
                })
              }
              checked={properties.includes(key as any)}
              className="m-1 ml-3"
            />
            <label htmlFor={`${key}-false`}>{key} is falsy</label>
          </>
        )
      })}
    </div>
  )
}
