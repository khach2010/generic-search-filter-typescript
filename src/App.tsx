import React, { useState } from 'react'
import PersonRenderer from './components/rendereres/PersonRenderer'
import WidgetRenderer from './components/rendereres/WidgetRenderer'
import { SearchSortFilter } from './components/SearchSortFilter'
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
       <SearchSortFilter title='widgets' dataSource={widgets} searchProperties={['title', 'description']} initialFilterProperties={[]} initialSortProperty={{property: 'title', isDescending: true}} initialSearchQuery="type" >
        {(widget) => <WidgetRenderer {...widget} key={widget.id} />}
       </SearchSortFilter>
      )}

      {showPeople && (
        <SearchSortFilter title='people' dataSource={people} searchProperties={["firstName", "lastName", "eyeColor"]} initialFilterProperties={[]} initialSortProperty={{property: 'firstName', isDescending: true}} initialSearchQuery="" >
        {(person) => <PersonRenderer {...person} key={person.firstName} />}
       </SearchSortFilter>
      )}
    </div>
  )
}

export default App
