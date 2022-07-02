import { api } from '../../api.js';
import { useState, useEffect  } from 'react';
import { toast } from 'react-toastify';
import { ProfileWrapper, ProfileInfo, ProfileImg, ProfileUsername, ProfileButtons, ProfileButton, ProfileContentWrapper, ProfileSettingButtons, ProfileSettingButton, ProfileUploadWrapper, ProfileUploadImg, ProfileUpload } from './profile-style.js';
import Post from '../../components/Post';
import SubmitButton from '../../components/SubmitButton';

function UploadImg({setSetting, setImg}) {
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
        const id = toast.loading('Uploading your profile image...');
        api.profileImg(image)
        .then(res => {
            toast.update(id, {type: toast.TYPE.SUCCESS, render: res, isLoading: false, autoClose: 5000, closeButton: true})
            setSetting(undefined);
            setImg(imgURL);
		})
		.catch(err => {
            console.log(err);
            if (err.code === 'ERR_BAD_RESPONSE')
                toast.update(id, {type: toast.TYPE.ERROR, render: 'Please upload an image. (jpg/jpeg/png)', isLoading: false, autoClose: 5000, closeButton: true})
			else toast.update(id, {type: toast.TYPE.ERROR, render: err.response.data.message, isLoading: false, autoClose: 5000, closeButton: true})
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

    useEffect(() => {}, [settings]);

    useEffect(() => {
        toast.loading('Loading your profile...', {toastId: 0});
        if (posts) toast.update(0, {type: toast.TYPE.SUCCESS, render: 'Done!', isLoading: false, autoClose: 5000, closeButton: true})
    }, [posts]);

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        if (username)
            api.getPersonalPosts()
            .then(res => {
                setPosts(res);
                getLikes();
            });
    }, [username]);

    function getUserInfo() {
        api.getUserInfo()
        .then(res => {
            setUsername(res.username);
            if (res.image) setImg('http://52.37.140.157:3000/' + res.image);
        });
    }

    function like(post_id) {
        // console.log('like', post_id);
        if (!likes.includes(post_id))
            setLikes([...likes, post_id]);
        else setLikes(likes.filter(post => post !== post_id));

        api.like(post_id);
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
                {settings && setting === 'upload' && <UploadImg setSetting={setSetting} setImg={setImg} />}
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