import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Container, Form, Field, Heading, ErrorField, StyledLink } from './loginStyle'
import { fetchBear } from 'services/bear'
import { useCurrentBear } from 'hooks'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState()
  const [, setCurrentBear] = useCurrentBear()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit = ({ gamecode, name }) => {
    fetchBear({ gamecode, name })
      .then(bear => setCurrentBear({ gamecode, bear }))
      .then(() => navigate('/game'))
      .catch(err => setErrorMessage(err.response.data.error))
  }

  return <Container>
    <Heading>Bear Login</Heading>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <label htmlFor='name'>Name</label>
        <p>Whats the name of your existing bear?</p>
        <input placeholder='Bear McSmith' type='text' name='name' {...register('name', { required: true })} />
        <ErrorField>{errors.name && <span>You have to provide a name!</span>}</ErrorField>
      </Field>

      <Field>
        <label htmlFor='gamecode'>Game Code</label>
        <p>The <i>Game Master</i> will send you this.</p>
        <input placeholder='000' type='number' name='gamecode' {...register('gamecode', { required: true, pattern: /^\d{3}$/ })} />
        <ErrorField>{errors.code && <span>You need a 3 digit gamecode to create a bear</span>}</ErrorField>
      </Field>

      {errorMessage && <ErrorField>{errorMessage}</ErrorField>}
      <input type='submit' value='Login' />
      <StyledLink to='/signup'>I don&apos;t have a bear yet!</StyledLink>
    </Form>
  </Container>
}

export default Login
