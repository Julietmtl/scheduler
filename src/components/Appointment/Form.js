import React, { useState } from 'react'
import Button from '../Button.js'
import InterviewerList from '../InterviewerList.js'

export default function Form (props) {
  const [error, setError] = useState('')
  const [name, setName] = useState(props.name || '')
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  // to reset the page after the cancel button.
  const reset = () => {
    setName('')
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }

  function validate () {
    if (name === '') {
      setError('Student name cannot be blank')
      return
    } else if (interviewer === null) {
      setError('Please choose an interviewer')
      return
    }
    else {
    setError('')
    props.onSave(name, interviewer)
  }}

  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form autoComplete='off'>
          <input
            className='appointment__create-input text--semi-bold'
            value={name}
            onChange={event => setName(event.target.value)}
            type='text'
            placeholder='Enter Student Name'
            data-testid='student-name-input'
          />
        </form>
        <section className='appointment__validation'>{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  )
}

