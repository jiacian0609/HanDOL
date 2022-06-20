import { useState, useEffect } from 'react';
import axios from 'axios';
import { HomeWrapper, HomeButton } from './home-style';
import Post from '../../components/Post';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/posts/')
        .then(res => {
            console.log('res:', res.data.posts);
            setPosts(res.data.posts);
        })
		.catch(err => {
			console.log(err);
		})
    }, []);

    function handleClick() {
        window.location.href = '/post';
    }
    
    return (
        <HomeWrapper>
            {posts?.map(post => <Post id={post._id} post={post} />)}
            <HomeButton onClick={() => handleClick()}>+</HomeButton>
        </HomeWrapper>
    )
}