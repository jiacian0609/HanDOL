import axios from 'axios';
import { useState } from 'react';
import { PostWrapper, PostImg, PostUpload, PostContent } from './createPost-style.js';
import SubmitButton from '../../components/SubmitButton';

export default function PostPage() {
    const [image, setImage] = useState();
    const [imgURL, setImgURL] = useState();

    console.log(imgURL);

    function handleUpload(e) {
        console.log(e);
        if(e.target.files && e.target.files[0]){
            setImage(e.target.files[0]);
            setImgURL(URL.createObjectURL(e.target.files[0]));
        }
    }

    function handleSubmit() {
        const content = document.getElementById('content').value;
        
        axios.post('http://localhost:3000/users/post', {
            content: content,
            image: image
        }, {
			headers: {
			  'Authorization': localStorage.getItem('JWT'),
              'Content-Type': 'multipart/form-data'
			}
		})
        .then(res => {
            // console.log(res.data);
            window.alert(res.data.message);
            window.location.href = '/home';
		})
		.catch(err => {
			window.alert(err.response.data.message);
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