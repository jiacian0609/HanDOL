import { api } from '../../api.js';
import { useState, useEffect  } from 'react';
import { ProfileWrapper, ProfileInfo, ProfileImg, ProfileUsername, ProfileButtons, ProfileButton, ProfileContentWrapper, ProfileSettingButtons, ProfileSettingButton } from './profile-style.js';
import Post from '../../components/Post';

export default function Profile() {
    const [username, setUsername] = useState();

    const [post, setPost] = useState(true);
    const [template, setTemplate] = useState(false);
    const [settings, setSettings] = useState(false);

    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        api.getUsername()
        .then(res => setUsername(res));
    }, []);

    useEffect(() => {
        if (username)
            api.getPersonalPosts()
            .then(res => {
                setPosts(res);
                getLikes();
            });
    }, [username]);

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
        <ProfileWrapper>
            <ProfileInfo>
                <ProfileImg />
                <ProfileUsername>{username}</ProfileUsername>
            </ProfileInfo>
            <ProfileButtons>
                <ProfileButton
                    active={post}
                    onClick={() => {setPost(true); setTemplate(false); setSettings(false)}}
                >
                    Post
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
                {settings && 
                    <ProfileSettingButtons>
                        <ProfileSettingButton>
                            Upload Profile Image
                        </ProfileSettingButton>
                    </ProfileSettingButtons>
                }
            </ProfileContentWrapper>
        </ProfileWrapper>
    )
}

/* <ProfileButton
    active={template}
    onClick={() => {setTemplate(true); setPost(false); setSettings(false)}}
>
    Template
</ProfileButton> */