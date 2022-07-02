import { api } from '../../api.js';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { IndexWrapper, IndexTitle, IndexDivider, IndexForm, IndexButtons, IndexButton, IndexFormField, IndexText, IndexInput } from './indexPage-style.js';
import SubmitButton from '../../components/SubmitButton';

export default function Index() {
    const [signIn, setSignIn] = useState(true);

    function handleSubmit() {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (signIn) handleSignIn(username, email, password);
        else handleSignUp(username, email, password);
    }

    function handleSignIn (username, email, password) {
        const id = toast.loading('Signing in...');
        const account = username ? username : email;
        api.signIn(account, password)
        .catch(err => {
            toast.update(id, {type: toast.TYPE.ERROR, render: err.response.data.message, isLoading: false, autoClose: 5000})
        });
	}

    function handleSignUp (username, email, password) {
        const id = toast.loading('Signing up...');
        api.signUp(username, email, password)
        .then(res => {
            toast.update(id, {type: toast.TYPE.SUCCESS, render: res.message, isLoading: false, autoClose: 5000});
            window.localStorage.setItem('JWT', res.JWT);
        })
        .catch(err =>
            toast.update(id, {type: toast.TYPE.ERROR, render: err.response.data.message, isLoading: false, autoClose: 5000})
        );
	}

    return (
        <IndexWrapper>
            <IndexTitle>HanDOL</IndexTitle>
            <IndexDivider />
            <IndexForm>
                <IndexButtons>
                    <IndexButton
                        active={signIn}
                        onClick={() => setSignIn(true)}
                    >
                        Sign In
                    </IndexButton>
                    <IndexButton
                        active={!signIn}
                        onClick={() => setSignIn(false)}
                    >
                        Sign Up
                    </IndexButton>
                </IndexButtons>
                <IndexFormField>
                    <IndexText>Username</IndexText>
                    <IndexInput id='username' />
                </IndexFormField>
                <IndexFormField>
                    <IndexText>Email</IndexText>
                    <IndexInput id='email' />
                </IndexFormField>
                <IndexFormField>
                    <IndexText>Password</IndexText>
                    <IndexInput id='password' type='password' />
                </IndexFormField>
            </IndexForm>
            <SubmitButton handleSubmit={handleSubmit} />
        </IndexWrapper>
    )
}