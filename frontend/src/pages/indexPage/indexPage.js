import { api } from '../../api.js';
import { useState } from 'react';
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
        const account = username ? username : email;
        api.signIn(account, password);
	}

    function handleSignUp (username, email, password) {
        api.signUp(username, email, password);
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