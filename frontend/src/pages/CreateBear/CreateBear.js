import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Container, Form, Roles, Role, Field, Heading, ErrorField, StyledLink } from './createBearStyle'

// TODO: use API
const fetchRoles = async () => {
    await new Promise((a, r) => setTimeout(a, 500))
    return [
        { name: 'muscle', enabled: true },
        { name: 'brains', enabled: true },
        { name: 'driver', enabled: true },
        { name: 'hacker', enabled: false },
        { name: 'thief', enabled: true },
        { name: 'face', enabled: true },
    ].map(x => Math.random() < .5 ? x : null).filter(x => x)
}

const CreateBear = () => {
    const [roles, setRoles] = useState()
    const [isLoadingRoles, setIsLoadingRoles] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const watchCode = watch('code')

    // Get roles
    useEffect(() => {
        if (watchCode && watchCode.match(/\d{3}/)) {
            setIsLoadingRoles(true)
            fetchRoles(watchCode)
                .then(roles => setRoles(roles))
                .then(() => setIsLoadingRoles(false))
        }
    }, [watchCode])

    const onSubmit = () => {
        console.log('submitted!')
    }

    return <Container>
        <Heading>Create a Bear</Heading>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Field>
                <label htmlFor='name'>Name</label>
                <p>Give your bear a cool name!</p>
                <input placeholder='Bear McSmith' type='text' name='name' {...register('name', { required: true })} />
                <ErrorField>{errors.name && <span>You have to name your bear!</span>}</ErrorField>
            </Field>
            <Field>
                <label htmlFor='code'>Game Code</label>
                <p>The <i>Game Master</i> will send you this.</p>
                <input placeholder='000' type='number' name='code' {...register('code', { required: true, pattern: /^\d{3}$/ })} />
                <ErrorField>{errors.code && <span>You need a 3 digit gamecode to create a bear</span>}</ErrorField>
            </Field>

            {(roles || isLoadingRoles) && <Field>
                <label>Role</label>
                <p>How will your bear assist the party?</p>
                <Roles>
                    {isLoadingRoles ? <span> Loading Roles... </span>: roles.map(({ name, enabled }, i) => <Role key={name} className={enabled ? 'enabled' : 'disabled'}>
                        <input type='radio' name='role' value={i} id={`role-${i}`} disabled={!enabled} {...register('role', { required: true })} />
                        <label htmlFor={`role-${i}`}>{name}</label>
                    </Role>)}
                </Roles>
                <ErrorField>{errors.role && <span>Make sure to choose a role!</span>}</ErrorField>
            </Field>}

            <input type='submit' value='Create Bear' />
            <StyledLink to='/login'>I already have a bear!</StyledLink>
        </Form>
    </Container>
}

export default CreateBear