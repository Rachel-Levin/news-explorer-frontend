import React from 'react';
import './SignInPopup.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useForm } from "react-hook-form";

function SignInPopup(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleAddEmail(e) {
        setEmail(e.target.value);
    }

    function handleAddPassword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit(email, password);
    }

    React.useEffect(() => {
        setEmail('');
        setPassword('');
    }, [props.isOpen])

    return (
        <PopupWithForm name="__signIn" title="Sign In" buttonName="Sign In" buttonAltName="Sign Up" type="submit"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            onClick={props.onSignUpClick}
        >
            <label className='input__label'>Email</label>
            <input id="email-input" type="email" value={email} onChange={handleAddEmail} placeholder="Enter email" className="form__input form__input-email" name="email" autoComplete="off" required />
            <span className='input__error' id="email-input-error">Invalid email address</span>
            <label className='input__label'>Password</label>
            <input id="password-input" type="password" value={password} onChange={handleAddPassword} placeholder="Enter password" className="form__input form__input-password" name="password" autoComplete="off" required />
            <span className='input__error' id="password-input-error">Password is required</span>
        </PopupWithForm>
    )
};

export default SignInPopup;