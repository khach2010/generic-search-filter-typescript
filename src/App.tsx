import React, { useState } from 'react';
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

  return (
    <div className="App">
      <h1>Generic Reuseable for sorting data</h1>

      <SearchInput  setSearchQuery={(query) => 
        setQuery(query)} />


      <div>
        <h2>Widget</h2>
        <Sorters object={widgets[0]} setProperty={(property) => setWidgetProperty({property})} />

        {widgets
        .filter((w) => genericSearch(w, ['title', 'description'], query, false))
        .sort((a,b) => genericSort(a,b, widgetProperty.property))
        .map((w) => {
          return <p key={w.id}>{w.title}</p>
        })}
      </div>


      <div>
        <h2>People</h2>
        <Sorters object={people[0]} setProperty={(property) => setPersonProperty({property})} />

        {people
        .filter((p) => genericSearch(p, ['firstName', 'lastName', 'eyeColor'], query, false))
        .sort((a,b) => genericSort(a,b, personProperty.property))
        .map((per) => {
          return <p key={per.firstName}>{per.firstName}</p>
        })}
      </div>

    </div>
  );
}

export default App;
