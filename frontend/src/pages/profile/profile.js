import axios from 'axios';
import { useState, useEffect  } from 'react';
import { ProfileWrapper, ProfileInfo, ProfileImg, ProfileUsername, ProfileButtons, ProfileButton, ProfileContentWrapper } from './profile-style.js';
import Post from '../../components/Post';
import SubmitButton from '../../components/SubmitButton';

export default function Profile() {
    const [post, setPost] = useState(true);
    const [template, setTemplate] = useState(false);
    const [settings, setSettings] = useState(false);

    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState([]);

    /* get personal posts */
    useEffect(() => {
        axios.get('http://localhost:3000/posts/personal', {
            headers: {
                'Authorization': localStorage.getItem('JWT')
            }
        })
        .then(res => {
            // console.log('res:', res.data.posts);
            setPosts(res.data.posts);
            getLikes()
        })
		.catch(err => {
			console.log(err);
		})
    }, []);

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

    return (
        <ProfileWrapper>
            <ProfileInfo>
                <ProfileImg />
                <ProfileUsername>Username</ProfileUsername>
            </ProfileInfo>
            <ProfileButtons>
                <ProfileButton
                    active={post}
                    onClick={() => {setPost(true); setTemplate(false); setSettings(false)}}
                >
                    Post
                </ProfileButton>
                <ProfileButton
                    active={template}
                    onClick={() => {setTemplate(true); setPost(false); setSettings(false)}}
                >
                    Template
                </ProfileButton>
                <ProfileButton
                    active={settings}
                    onClick={() => {setSettings(true); setPost(false); setTemplate(false)}}
                >
                    Settings
                </ProfileButton>
            </ProfileButtons>
            <ProfileContentWrapper>
                {post && posts?.map(post => 
                    <Post
                        key={post._id}
                        id={post._id}
                        post={post}
                        like={() => like(post._id)}
                        liked={likes.includes(post._id)}
                    />
                )}
            </ProfileContentWrapper>
        </ProfileWrapper>
    )
}