import React, { useState } from 'react';
import { SearchInput } from './components/SearchInput';
import people from './mock-data/people';
import widgets from './mock-data/widgets';
import genericSearch from './utils/genericSearch';


function App() {
  const [query, setQuery] = useState<string>("")
  console.log('i am firimg')

  return (
    <div className="App">
      <h1>Generic Reuseable for sorting data</h1>
      <SearchInput  setSearchQuery={(query) => 
       
        setQuery(query)} />
      <div>
        <h2>Widget</h2>
        {widgets.filter((w) => genericSearch(w, ['title', 'description'], query, false)).map((w) => {
          return <p key={w.id}>{w.title}</p>
        })}
      </div>
      <div>
        <h2>People</h2>
        {people.filter((p) => genericSearch(p, ['firstName', 'lastName', 'eyeColor'], query, false)).map((per) => {
          return <p key={per.firstName}>{per.firstName}</p>
        })}
      </div>
    </div>
  );
}

export default App;
