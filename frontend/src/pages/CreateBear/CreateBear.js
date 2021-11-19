import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { fetchRoles, createBear } from 'services/bear'
import { useCurrentBear } from 'hooks'

import { Container, Form, Roles, Role, Field, Heading, ErrorField, StyledLink } from './createBearStyle'

const CreateBear = () => {
  const [errorMessage, setErrorMessage] = useState()
  const [roles, setRoles] = useState()
  const [isLoadingRoles, setIsLoadingRoles] = useState(false)
  const [, setCurrentBear] = useCurrentBear()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const watchCode = watch('gamecode')
  const navigate = useNavigate()

  // Get roles
  useEffect(() => {
    if (watchCode && watchCode.match(/\d{3}/)) {
      setIsLoadingRoles(true)
      fetchRoles(watchCode)
        .then(roles => setRoles(roles))
        .then(() => setIsLoadingRoles(false))
    }
  }, [watchCode])

  const onSubmit = ({ gamecode, bear_name, player_name, role }) => {
    setErrorMessage('')
    createBear({ gamecode, player_name, bear_name, role })
      .then(bear => setCurrentBear({ gamecode, bear }))
      .then(() => navigate('/game'))
      .catch(err => setErrorMessage(err.response.data.error))
  }

  return <Container>
    <Heading>Create a Bear</Heading>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <label htmlFor='player_name'>Player Name</label>
        <p>Whats your name? For other players to identify you by.</p>
        <input placeholder='Player McPlayer' type='text' name='player_name' {...register('player_name', { required: true })} />
        <ErrorField>{errors.player_name && <span>You have to provide a name!</span>}</ErrorField>
      </Field>
      <Field>
        <label htmlFor='bear_name'>Name</label>
        <p>Give your bear a cool name!</p>
        <input placeholder='Bear McSmith' type='text' name='bear_name' {...register('bear_name', { required: true })} />
        <ErrorField>{errors.bear_name && <span>You have to name your bear!</span>}</ErrorField>
      </Field>
      <Field>
        <label htmlFor='gamecode'>Game Code</label>
        <p>The <i>Game Master</i> will send you this.</p>
        <input placeholder='000' type='number' name='gamecode' {...register('gamecode', { required: true, pattern: /^\d{3}$/ })} />
        <ErrorField>{errors.code && <span>You need a 3 digit gamecode to create a bear</span>}</ErrorField>
      </Field>

      {(roles || isLoadingRoles) && <Field>
        <label>Role</label>
        <p>How will your bear assist the party?</p>
        <Roles>
          {isLoadingRoles ? <span> Loading Roles... </span>: roles.map(({ name, available }, i) => <Role key={name} className={available ? 'enabled' : 'disabled'}>
            <input type='radio' name='role' value={name} id={`role-${i}`} disabled={!available} {...register('role', { required: true })} />
            <label htmlFor={`role-${i}`}>{name}</label>
          </Role>)}
        </Roles>
        <ErrorField>{errors.role && <span>Make sure to choose a role!</span>}</ErrorField>
      </Field>}


      {errorMessage && <ErrorField>{errorMessage}</ErrorField>}
      <input type='submit' value='Create Bear' />
      <StyledLink to='/login'>I already have a bear!</StyledLink>
    </Form>
  </Container>
}

export default CreateBear
