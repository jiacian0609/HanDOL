import { api } from '../../api';
import { useState, useEffect } from 'react';
import { HomeWrapper, HomeButton } from './home-style';
import Post from '../../components/Post';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState([]);

    /* get posts */
    useEffect(() => {
        api.getPost()
        .then(res => {
            setPosts(res);
            getLikes();
        })
    }, []);

    /* create post */
    function handleClick() {
        window.location.href = '/post';
    }

    function like(post_id) {
        // console.log('like', post_id);
        api.like(post_id)
        .then(res => {
            // console.log('res:', res.data);
            // window.alert(res.data.message);
            getLikes();
        })
    }

    function getLikes() {
        api.getLikes()
        .then(res => setLikes(res));
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