import React from 'react'
import IFilter from '../interfaces/IFilter'

export interface FiltersProps<T> {
  dataSource: Array<T>
  filterProperties: Array<IFilter<T>>
  setFilterProperties(filterProperties: Array<IFilter<T>>): void
}

export default function Filters<T extends {}>(props: FiltersProps<T>) {
  const { dataSource, filterProperties, setFilterProperties } = props
  const object = dataSource.length > 0 ? dataSource[0] : {}

  const onChangeFilter = (property: IFilter<T>) => {
    const propertyMatched = filterProperties.some(
      (filterProperty) => filterProperty.property === property.property
    )

    const fullMatched = filterProperties.some(
      (filterProperty) =>
        filterProperty.property === property.property &&
        filterProperty.isTruthySelected === property.isTruthySelected
    )

    if (fullMatched) {
      setFilterProperties(
        filterProperties.filter(
          (filterProperty) => filterProperty.property !== property.property
        )
      )
    } else if (propertyMatched) {
      setFilterProperties([
        ...filterProperties.filter(
          (filterProperty) => filterProperty.property !== property.property
        ),
        property,
      ])
    } else {
      setFilterProperties([...filterProperties, property])
    }
  }

  return (
    <>
      <div className="p-1 my-2">
        {Object.keys(object).map((key) => {
          return (
            <React.Fragment key={key}>
              <input
                type="checkbox"
                value={key}
                id={`${key}-true`}
                onChange={() =>
                  onChangeFilter({
                    property: key as any,
                    isTruthySelected: true,
                  })
                }
                checked={filterProperties.some(
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
                checked={filterProperties.includes(key as any)}
                className="m-1 ml-3"
              />
              <label htmlFor={`${key}-false`}>{key} is falsy</label>
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
}
