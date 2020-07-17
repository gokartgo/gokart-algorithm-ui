import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as Sort } from '/assets/icon/sort.svg'
import './Card.scss'

const card = props => {
  const {
    title,
    detail,
    onclick,
  } = props
  return <section className='card-container' onClick={() => onclick()}>
    <header>
      <Sort className='card-icon' />
      <h3 className='card-title'>{title}</h3>
      <p className='card-detail' dangerouslySetInnerHTML={{ __html: detail }} />
    </header>
  </section>
}

card.propTypes = {
  btnType: PropTypes.string,
}

card.defaultProps = {
  btnType: '',
}

export default card
