import React from 'react'
import { useForm } from 'react-hook-form'

import { Container, Form } from './createBearStyle'

// name, <role>

const CreateBear = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const onSubmit = () => {
        console.log('submitted!')
    }

    return <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='name'>Name</label>
            <input type='text' {...register('name', { required: true })} />
            {errors.name && <span>You have to name your bear!</span>}

            <input type='submit' value='Create Bear' />
        </Form>
    </Container>
}

export default CreateBear