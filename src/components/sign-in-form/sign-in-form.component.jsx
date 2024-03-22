
import { useState } from "react";

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.style.scss';

const defaultFormFields = {
    email: '',
    password: '',
};

const handleSubmit = async (event, formFields, setFormFields) => {
    event.preventDefault();
    const {email, password } = formFields;
    if(email.length && password.length){
        try {
            const user = await signInAuthUserWithEmailAndPassword({email, password});
            alert("User Signed In successfuly");
            console.log(user);
            resetFormFields(setFormFields) 
        } catch (error) {
            if(error.code === 'auth/invalid-credential'){
                alert("Wrong Email or Password");
            }
            console.log('sign with email and password', error.code, error.message);
        }
    }  
}

const resetFormFields = (setFormFields) => {
    setFormFields(defaultFormFields);
}

const SigninForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const { email, password } = formFields;

    const handleChange = (event)=> {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});

    }

    const handleFormSubmit = async (event) => {
        return await handleSubmit(event, formFields, setFormFields);
    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleFormSubmit}>
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
                <div className='buttons-container'>
                    <Button
                    type='submit'
                    >
                    Sign In
                    </Button>
                    <Button
                    type='button'
                    buttonType='google'
                    onClick={signInWithGooglePopup}
                    >
                    Google Sign In
                    </Button>
                </div>
                
            </form>
        </div>
    )
}

export default SigninForm;
