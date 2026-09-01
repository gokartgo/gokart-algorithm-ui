import React from 'react'
import Sort from '@/assets/icon/sort.svg?react'
import './Card.scss'

interface CardProps {
  title: string
  detail: string
  onclick: () => void
  btnType?: string
}

const card = (props: CardProps) => {
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

export default card
