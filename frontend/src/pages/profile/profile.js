import { api } from '../../api.js';
import { useState, useEffect  } from 'react';
import { ProfileWrapper, ProfileInfo, ProfileImg, ProfileUsername, ProfileButtons, ProfileButton, ProfileContentWrapper, ProfileSettingButtons, ProfileSettingButton, ProfileUploadWrapper, ProfileUploadImg, ProfileUpload } from './profile-style.js';
import Post from '../../components/Post';
import SubmitButton from '../../components/SubmitButton';

function UploadImg({setSetting}) {
    const [image, setImage] = useState();
    const [imgURL, setImgURL] = useState();

    function handleUpload(e) {
        // console.log(e);
        if(e.target.files && e.target.files[0]){
            setImage(e.target.files[0]);
            setImgURL(URL.createObjectURL(e.target.files[0]));
        }
    }

    function handleSubmit() {
        // console.log(image.type === 'image/*');
        api.profileImg(image)
        .then(res => {
            window.alert(res);
            setSetting(undefined);
            window.location.reload();
		})
		.catch(err => {
            console.log(err);
            if (err.code === 'ERR_BAD_RESPONSE')
                window.alert('Please upload an image. (jpg/jpeg/png)');
			else window.alert(err.response.data.message);
		})
    }

    return (
        <ProfileUploadWrapper>
            <ProfileUploadImg id='img' src={imgURL} />
            <ProfileUpload
                type='file'
                name='image'
                accept='image/*'
                onChange={e => handleUpload(e)}
            />
            <SubmitButton handleSubmit={handleSubmit} />
        </ProfileUploadWrapper>
    )
}

export default function Profile() {
    const [username, setUsername] = useState();
    const [img, setImg] = useState(undefined);

    const [post, setPost] = useState(true);
    const [template, setTemplate] = useState(false);
    const [settings, setSettings] = useState(false);
    const [setting, setSetting] = useState();

    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        api.getUserInfo()
        .then(res => {
            setUsername(res.username);
            if (res.image) setImg('http://52.37.140.157:3000/' + res.image);
        });
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
                <ProfileImg src={img} />
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
                    onClick={() => {setSettings(true); setPost(false); setTemplate(false); setSetting(undefined)}}
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
                {settings && setting === 'upload' && <UploadImg setSetting={setSetting} />}
                {settings && setting === undefined &&
                    <ProfileSettingButtons>
                        <ProfileSettingButton onClick={() => setSetting('upload')}>
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