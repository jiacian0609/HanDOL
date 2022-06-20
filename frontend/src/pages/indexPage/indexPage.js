import axios from 'axios';
import { useState } from 'react';
import './indexPage-style.js';
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

        axios.post('http://localhost:3000/users/signin', {
            'account': account,
            'password': password
        })
        .then( (res) => {
            // console.log(res.data);
            // window.alert(res.data.message);
			window.localStorage.setItem('JWT', res.data.token);
            window.location.href = "/home";
		})
		.catch( (err) => {
			window.alert(err.response.data.message);
		})
	}

    function handleSignUp (username, email, password) {
        axios.post('http://localhost:3000/users/signup', {
            'username': username,
            'email': email,
            'password': password
        })
        .then( (res) => {
            console.log(res.data);
            window.alert(res.data.message);
			window.localStorage.setItem('JWT', res.data.JWT)
            // window.location.href = "/home"
		})
		.catch( (err) => {
			window.alert(err.response.data.message);
		})
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