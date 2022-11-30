import React from 'react'
import Moment from 'react-moment'
import Person from '../../interfaces/Person'

export default function PersonRenderer(props: Person) {
  const { firstName, lastName, birthday, eyeColor } = props

  return (
    <div className="col-12 p-3">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">
            {firstName} - {lastName}
          </h1>
          <ul>
            <li className="card-text">👀 eye color: {eyeColor}</li>
            <li className="card-text">
              🎂 birthday: {<Moment date={birthday} />}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
