import React, { useState } from 'react';
import PersonRenderer from './components/rendereres/PeopleRenderer';
import WidgetRenderer from './components/rendereres/WidgetRenderer';
import { SearchInput } from './components/SearchInput';
import { Sorters } from './components/Sorters';
import Person from './interfaces/Person';
import Property from './interfaces/Property';
import Widget from './interfaces/Widget';
import people from './mock-data/people';
import widgets from './mock-data/widgets';
import genericSearch from './utils/genericSearch';
import genericSort from './utils/genericSort';


function App() {
  const [query, setQuery] = useState<string>("")
  const [widgetProperty, setWidgetProperty] = useState<Property<Widget>>({property: 'title'})
  const [personProperty, setPersonProperty] = useState<Property<Person>>({property: 'firstName'})
  console.log(widgets[0])
  const [showPeople, setShowPeople] = useState<boolean>(false)
  const buttonText = showPeople ? 'show widget' : 'show people'

  return (
    <div className="App">
      <h1>Generic Reuseable for sorting data</h1>
      <button className='btn btn-primary' onClick={() => setShowPeople(!showPeople)}>{buttonText}</button>

      <SearchInput  setSearchQuery={(query) => 
        setQuery(query)} />

        {!showPeople && (
          <div>
          <h2>Widget</h2>
          <Sorters object={widgets[0]} setProperty={(property) => setWidgetProperty({property})} />

          {widgets
          .filter((w) => genericSearch(w, ['title', 'description'], query, false))
          .sort((a,b) => genericSort(a,b, widgetProperty.property))
          .map((w) => {
            return <WidgetRenderer {...w} />
          
          })}
        </div>
        )}
    

        {showPeople && (
            <div>
            <h2>People</h2>
            <Sorters object={people[0]} setProperty={(property) => setPersonProperty({property})} />
    
            {people
            .filter((p) => genericSearch(p, ['firstName', 'lastName', 'eyeColor'], query, false))
            .sort((a,b) => genericSort(a,b, personProperty.property))
            .map((per) => {
              return <PersonRenderer {...per} />
            })}
          </div>
        )}
      

    </div>
  );
}

export default App;
