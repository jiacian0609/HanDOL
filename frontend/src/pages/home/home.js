import { useState, useEffect } from 'react';
import axios from 'axios';
import { HomeWrapper, HomeButton } from './home-style';
import Post from '../../components/Post';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState([]);

    // console.log(likes);

    /* get posts */
    useEffect(() => {
        axios.get('http://localhost:3000/posts')
        .then(res => {
            // console.log('res:', res.data.posts);
            setPosts(res.data.posts);
            getLikes()
        })
		.catch(err => {
			console.log(err);
		})
    }, []);

    /* create post */
    function handleClick() {
        window.location.href = '/post';
    }

    /* like a post */
    function like(post_id) {
        // console.log('like', post_id);

        axios.post('http://localhost:3000/users/like', { post_id: post_id }, {
            headers: {
                'Authorization': localStorage.getItem('JWT')
            }
        })
        .then(res => {
            // console.log('res:', res.data);
            // window.alert(res.data.message);
            getLikes();
        })
        .catch(err => {
            console.log(err);
        })
    }

    /* get likes */
    async function getLikes() {
        axios.get('http://localhost:3000/users/like', {
			headers: {
			  'Authorization': localStorage.getItem('JWT')
			}
		})
        .then(res => {
            // console.log('records:', res.data.records);
            setLikes(res.data.likes);
        })
		.catch(err => {
			console.log(err);
		})
    }
    
    return (
        <HomeWrapper>
            {posts?.map(post => 
                <Post
                    key={post._id}
                    id={post._id}
                    post={post}
                    like={() => like(post._id)}
                    liked={likes.includes(post._id)}
                />
            )}
            <HomeButton onClick={() => handleClick()}>+</HomeButton>
        </HomeWrapper>
    )
}