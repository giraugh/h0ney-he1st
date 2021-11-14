import React from 'react'
import { useForm } from 'react-hook-form'

import { Container, Form, Roles, Role, Field, Heading, ErrorField, StyledLink } from './createBearStyle'

const CreateBear = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    // TODO: get from BE
    const roles = [
        { name: 'muscle', enabled: true },
        { name: 'brains', enabled: true },
        { name: 'driver', enabled: true },
        { name: 'hacker', enabled: false },
        { name: 'thief', enabled: true },
        { name: 'face', enabled: true },
    ]

    const onSubmit = () => {
        console.log('submitted!')
    }

    return <Container>
        <Heading> Create a Bear </Heading>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Field>
                <label htmlFor='name'>Name</label>
                <p>Give your bear a cool name!</p>
                <input placeholder='Bear McSmith' type='text' name='name' {...register('name', { required: true })} />
                <ErrorField>{errors.name && <span>You have to name your bear!</span>}</ErrorField>
            </Field>

            <Field>
                <label>Role</label>
                <p> How will your bear assist the party? </p>
                <Roles>
                    {roles.map(({ name, enabled }, i) => <Role key={name} className={enabled ? 'enabled' : 'disabled'}>
                        <input type='radio' name='role' value={i} id={`role-${i}`} disabled={!enabled} {...register('role', { required: true })} />
                        <label htmlFor={`role-${i}`}>{name}</label>
                    </Role>)}
                </Roles>
                <ErrorField>{errors.role && <span>Make sure to choose a role!</span>}</ErrorField>
            </Field>

            <input type='submit' value='Create Bear' />
            <StyledLink to='/login'>I already have a bear!</StyledLink>
        </Form>
    </Container>
}

export default CreateBear