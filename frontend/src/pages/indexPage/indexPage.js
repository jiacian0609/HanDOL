import axios from 'axios';
import './indexPage-style.js';
import { IndexWrapper, IndexTitle, IndexDivider, IndexForm, IndexFormField, IndexText, IndexInput, IndexSubmit } from './indexPage-style.js';

export default function Layout() {
    function handleSignIn (account, password) {
        axios.post("http://localhost:3000/users/signin", {
            "account": account,
            "password": password
        })
        .then( (res) => {
            // console.log(res.data);
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
                <IndexFormField>
                    <IndexText>Username / Email</IndexText>
                    <IndexInput id='account' />
                </IndexFormField>
                <IndexFormField>
                    <IndexText>Password</IndexText>
                    <IndexInput id='password' type='password' />
                </IndexFormField>
            </IndexForm>
            <IndexSubmit 
                onClick={()=> handleSignIn(
                    document.getElementById('account').value,
                    document.getElementById('password').value
                )}
            />
        </IndexWrapper>
    )
}