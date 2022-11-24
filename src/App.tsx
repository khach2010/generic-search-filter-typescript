import React from 'react';
import people from './mock-data/people';
import widgets from './mock-data/widgets';
import genericSearch from './utils/genericSearch';


function App() {

  const query = ''

  return (
    <div className="App">
      <h1>Generic Reuseable for sorting data</h1>
      <div>
        <h2>Widget</h2>
        {widgets.filter((w) => genericSearch(w, ['title', 'description'], query, false)).map((w) => {
          return <p>{w.title}</p>
        })}
      </div>
      <div>
        <h2>People</h2>
        {people.filter((p) => genericSearch(p, ['firstName', 'lastName', 'eyeColor'], query, false)).map((per) => {
          return <p>{per.firstName}</p>
        })}
      </div>
    </div>
  );
}

export default App;
