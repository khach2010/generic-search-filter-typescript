import React from 'react'
import Moment from 'react-moment'
import Widget from '../../interfaces/Widget'

export default function WidgetRenderer(props: Widget) {
  const {title, isSpecialCard, rating, updated, created, description} = props

  return (
    <div className='col-12 p-3'>
      <div className={isSpecialCard ? 'card specialCard' : 'card'}>
        <div className="card-body">
          <h1 className='card-title'>title: {title}</h1>
          <p className='card-text'>rating: {rating} / 10</p>
          <p className='card-text'>description: {description}</p>
          <p className='cart-text'>
            updated: {<Moment fromNow date={updated} />} &nbsp;&nbsp;&nbsp;
            created: {<Moment fromNow date={created} />}
          </p>
        </div>
      </div>
    </div>
  )
}