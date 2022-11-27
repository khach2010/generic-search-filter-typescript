import React, { useEffect, useState} from 'react'

export interface SortersProps<T> {
  object: T;
  setProperty: (property: keyof T) => void;
}

export function Sorters<T extends object>(props: SortersProps<T>) {
  const { object, setProperty } = props

  return (
    <>
     <label htmlFor="sorters">Sorters! try here</label>
     <select
     name="sorters" 
     id="sorters" 
     className='custom-select' 
     onChange={(e) => setProperty(e.target.value as any) }
     >

      {Object.keys(object).map((key) => (
        <option key={key} value={key}> sort by: {key} </option>
      )) }

     </select>
    </>
  )
}

