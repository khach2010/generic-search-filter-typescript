import React, { useState } from 'react'
import Filters from './components/Filters'
import PersonRenderer from './components/rendereres/PeopleRenderer'
import WidgetRenderer from './components/rendereres/WidgetRenderer'
import { SearchInput } from './components/SearchInput'
import { Sorters } from './components/Sorters'
import Person from './interfaces/Person'
import Property from './interfaces/Property'
import Widget from './interfaces/Widget'
import people from './mock-data/people'
import widgets from './mock-data/widgets'
import genericFilter from './utils/genericFilter'
import genericSearch from './utils/genericSearch'
import genericSort from './utils/genericSort'

function App() {
  const [query, setQuery] = useState<string>('')
  const [widgetProperty, setWidgetProperty] = useState<Property<Widget>>({
    property: 'title',
    isDescending: true,
  })
  const [widgetFilterProperties, setWidgetFilterProperties] = useState<
    Array<keyof Widget>
  >([])

  const [personProperty, setPersonProperty] = useState<Property<Person>>({
    property: 'firstName',
    isDescending: true,
  })

  const [showPeople, setShowPeople] = useState<boolean>(false)
  const [peopleFilterProperties, setPeopleFilterProperties] = useState<
    Array<keyof Person>
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
            object={widgets[0]}
            setProperty={(propertyType) => setWidgetProperty(propertyType)}
          />
          <Filters
            object={widgets[0]}
            properties={widgetFilterProperties}
            onChangeFilter={(property) => {
              widgetFilterProperties.includes(property)
                ? setWidgetFilterProperties(widgetFilterProperties.filter(widgetProperty => widgetProperty !== property))
                : setWidgetFilterProperties([
                    ...widgetFilterProperties,
                    property,
                  ])
            }}
          />
          {widgets
            .filter((widget) =>
              genericSearch(widget, ['title', 'description'], query, false)
            )
            .filter((widget) => genericFilter(widget, widgetFilterProperties))
            .sort((a, b) => genericSort(a, b, widgetProperty))
            .map((widget) => {
              return <WidgetRenderer {...widget} />
            })}
        </div>
      )}

      {showPeople && (
        <div>
          <h2>People</h2>
          <Sorters
            object={people[0]}
            setProperty={(propertyType) => setPersonProperty(propertyType)}
          />

          <Filters
            object={people[0]}
            properties={peopleFilterProperties}
            onChangeFilter={(property) => {
              peopleFilterProperties.includes(property)
                ? setPeopleFilterProperties(peopleFilterProperties.filter(personProperty => personProperty !== property))
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
