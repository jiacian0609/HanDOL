import { api } from '../../api.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PostWrapper, PostImg, PostUpload, PostContent } from './createPost-style.js';
import SubmitButton from '../../components/SubmitButton';

export default function PostPage() {
    const navigate = useNavigate();
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
        const id = toast.loading('Submitting your post...');

        const content = document.getElementById('content').value;
        
        api.post(content, image)
        .then(res => {
            toast.update(id, {type: toast.TYPE.SUCCESS, render: res, isLoading: false, autoClose: 5000, closeButton: true})
            navigate('/home');
		})
		.catch(err => {
            // console.log(err);
            if (err.code === 'ERR_BAD_RESPONSE')
                toast.update(id, {type: toast.TYPE.ERROR, render: 'Please upload an image. (jpg/jpeg/png)', isLoading: false, autoClose: 5000, closeButton: true})
            else toast.update(id, {type: toast.TYPE.ERROR, render: err.response.data.message, isLoading: false, autoClose: 5000, closeButton: true})
		})
    }

    return (
        <PostWrapper>
            <PostImg id='img' src={imgURL} />
            <PostUpload
                type="file"
                name="image"
                accept="image/*"
                onChange={e => handleUpload(e)}
            />
            <PostContent placeholder='Content' id='content' />
            <SubmitButton handleSubmit={handleSubmit} />
        </PostWrapper>
    )
}