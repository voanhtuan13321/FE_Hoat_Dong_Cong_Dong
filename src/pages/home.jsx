import React from 'react'
import InputText from '../components/InputText'

export default function Home() {
  const [text, setText] = React.useState('')

  return (
    <div className='mt-5'>
      Home{' '}
      <InputText
        label='label'
        name='name'
        value={text}
        onChange={event => setText(event.target.value)}
      />
    </div>
  )
}
