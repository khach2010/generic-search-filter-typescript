import React, { useState } from 'react'
import Filters from './components/Filters'
import PersonRenderer from './components/rendereres/PersonRenderer'
import WidgetRenderer from './components/rendereres/WidgetRenderer'
import { SearchInput } from './components/SearchInput'
import { Sorters } from './components/Sorters'
import Person from './interfaces/Person'
import ISorter from './interfaces/ISorter'
import Widget from './interfaces/Widget'
import people from './mock-data/people'
import widgets from './mock-data/widgets'
import genericFilter from './utils/genericFilter'
import genericSearch from './utils/genericSearch'
import genericSort from './utils/genericSort'
import IFilter from './interfaces/IFilter'

function App() {
  const [query, setQuery] = useState<string>('')
 
  const [widgetFilterProperties, setWidgetFilterProperties] = useState<
    Array<IFilter<Widget>>
  >([])

  const [personProperty, setPersonProperty] = useState<ISorter<Person>>({
    property: 'firstName',
    isDescending: true,
  })

  const [showPeople, setShowPeople] = useState<boolean>(false)
  const [peopleFilterProperties, setPeopleFilterProperties] = useState<
    Array<IFilter<Person>>
  >([])
  const buttonText = showPeople ? 'show widget' : 'show people'

  return (
    <div className="App">
      <h1>Generic Reuseable for sorting data</h1>
      <button
        className="btn btn-primary"
        onClick={() => setShowPeople(!showPeople)}
      >
        {buttonText}
      </button>

      <SearchInput setSearchQuery={(query) => setQuery(query)} />

      {!showPeople && (
        <div>
          <h2>Widget</h2>
          <Sorters
            dataSource={widgets}
            initialSortProperty="title"
          >
          {
            (widget) => <WidgetRenderer {...widget} />
          }
         </Sorters>
          <Filters
            object={widgets[0]}
            properties={widgetFilterProperties}
            onChangeFilter={(property) => {
              const propertyMatched = widgetFilterProperties.some(
                (widgetFilterProperty) =>
                  widgetFilterProperty.property === property.property
              )
              const fullMatched = widgetFilterProperties.some(
                (widgetFilterProperty) =>
                  widgetFilterProperty.property === property.property &&
                  widgetFilterProperty.isTruthySelected ===
                    property.isTruthySelected
              )

              if (fullMatched) {
                setWidgetFilterProperties(
                  widgetFilterProperties.filter(
                    (widgetFilterProperty) =>
                      widgetFilterProperty.property !== property.property
                  )
                )
              } else if (propertyMatched) {
                setWidgetFilterProperties([
                  ...widgetFilterProperties.filter(
                    (widgetFilterProperty) =>
                      widgetFilterProperty.property !== property.property
                  ),
                  property,
                ])
              } else {
                setWidgetFilterProperties([...widgetFilterProperties, property])
              }
            }}
          />
          {widgets
            .filter((widget) =>
              genericSearch(widget, ['title', 'description'], query, false)
            )
            .filter((widget) => genericFilter(widget, widgetFilterProperties))
            .map((widget) => {
              return <WidgetRenderer {...widget} />
            })}
        </div>
      )}

      {showPeople && (
        <div>
          <h2>People</h2>
          <Sorters
            dataSource={people}
            initialSortProperty="firstName"
          >
            {
              person => <PersonRenderer {...person} />
            }
          </Sorters>
          <Filters
            object={people[0]}
            properties={peopleFilterProperties}
            onChangeFilter={(property) => {
              peopleFilterProperties.includes(property)
                ? setPeopleFilterProperties(
                    peopleFilterProperties.filter(
                      (personProperty) => personProperty !== property
                    )
                  )
                : setPeopleFilterProperties([
                    ...peopleFilterProperties,
                    property,
                  ])
            }}
          />

          {people
            .filter((person) =>
              genericSearch(
                person,
                ['firstName', 'lastName', 'eyeColor'],
                query,
                false
              )
            )
            .filter((person) => genericFilter(person, peopleFilterProperties))
            .sort((a, b) => genericSort(a, b, personProperty))
            .map((person) => {
              return <PersonRenderer {...person} />
            })}
        </div>
      )}
    </div>
  )
}

export default App
