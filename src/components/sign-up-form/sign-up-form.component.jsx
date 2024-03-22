
import { useState } from "react";

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {createAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils';

import './sign-up-form.style.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const handleSubmit = async (event, formFields, setFormFields) => {
    event.preventDefault();
    const {displayName, email, password, confirmPassword} = formFields;
    if(displayName.length && email.length && password.length){
        if(password !== confirmPassword){
            alert("passwords do not match")
        } else {
            try {
                const user = await createAuthUserWithEmailAndPassword({email, password, displayName});
                alert("User Created successfuly");
                console.log(user);
                resetFormFields(setFormFields) 
            } catch (error) {
                if(error.code === 'auth/email-already-in-use'){
                    alert("Email address already in use");
                }
                console.log('signup with email and password', error.message);
            }
            
        }
    }  
}

const resetFormFields = (setFormFields) => {
    setFormFields(defaultFormFields);

}

const SignupForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const {displayName, email, password, confirmPassword} = formFields;

    const handleChange = (event)=> {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});

    }

    const handleFormSubmit = async (event) => {
        return await handleSubmit(event, formFields, setFormFields);
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleFormSubmit}>
                <FormInput
                    label='Display Name'
                    inputOptions= {{
                    type:'text',
                    name:'displayName',
                    value: displayName,
                    onChange: handleChange,
                    required: true}}
                />
                <FormInput
                    label='Email'
                    inputOptions= {{
                        type:'email',
                        name:'email',
                        value: email,
                        onChange:handleChange,
                        required: true}}
                />
                <FormInput
                    label='Password'
                    inputOptions= {{
                        type:'password',
                        name:'password',
                        value: password,
                        onChange:handleChange,
                        required: true}}
                />
                <FormInput
                    label='Confirm Password'
                    type='password'
                    inputOptions= {{
                        type:'password',
                        name:'confirmPassword',
                        value: confirmPassword,
                        onChange: handleChange,
                        required: true}}
                />
                <Button
                type='submit'
                >
                Sign Up
                </Button>
            </form>
        </div>
    )
}

export default SignupForm;
