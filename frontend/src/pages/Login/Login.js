import React from 'react'
import { useForm } from 'react-hook-form'

import { Container, Form, Field, Heading, ErrorField, StyledLink } from './loginStyle'

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = () => {
        console.log('submitted!')
    }

    return <Container>
        <Heading> Bear Login </Heading>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Field>
                <label htmlFor='name'>Name</label>
                <p>Whats the name of your existing bear?</p>
                <input placeholder='Bear McSmith' type='text' name='name' {...register('name', { required: true })} />
                <ErrorField>{errors.name && <span>You have to provide a name!</span>}</ErrorField>
            </Field>

            <input type='submit' value='Login' />
            <StyledLink to='/'>I don't have a bear yet!</StyledLink>
        </Form>
    </Container>
}

export default Login