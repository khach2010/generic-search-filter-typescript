import React, { useState } from 'react'
import Filters from './components/Filters'
import PersonRenderer from './components/rendereres/PersonRenderer'
import WidgetRenderer from './components/rendereres/WidgetRenderer'
import { SearchInput } from './components/SearchInput'
import { Sorters } from './components/Sorters'
import people from './mock-data/people'
import widgets from './mock-data/widgets'


function App() {
  const [showPeople, setShowPeople] = useState<boolean>(false)
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

      {!showPeople && (
        <div>
          <h2>Widget</h2>
          <SearchInput
            dataSource={widgets}
            searchKeys={['title', 'description']}
          >
            {(widget) => <WidgetRenderer {...widget} />}
          </SearchInput>

          <Sorters dataSource={widgets} initialSortProperty="title">
          {(widget) => <WidgetRenderer {...widget} />}
          </Sorters>

          <Filters dataSource={widgets}>
          {(widget) => <WidgetRenderer {...widget} />}
          </Filters>
        </div>
      )}

      {showPeople && (
        <div>
          <h2>People</h2>
          <SearchInput
            dataSource={people}
            searchKeys={['firstName', 'lastName', 'eyeColor']}
          >
            {(person) => <PersonRenderer {...person} />}
          </SearchInput>

          <Sorters dataSource={people} initialSortProperty="firstName">
            {(person) => <PersonRenderer {...person} />}
          </Sorters>

          <Filters dataSource={people}>
            {(person) => <PersonRenderer {...person} />}
          </Filters>
        </div>
      )}
    </div>
  )
}

export default App
