import { api } from '../../api.js';
import { useState } from 'react';
import { PostWrapper, PostImg, PostUpload, PostContent } from './createPost-style.js';
import SubmitButton from '../../components/SubmitButton';

export default function PostPage() {
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
        const content = document.getElementById('content').value;
        // console.log(image);
        
        api.post(content, image)
        .then(res => {
            window.alert(res);
            window.location.href = '/home';
		})
		.catch(err => {
            // console.log(err);
            if (err.code === 'ERR_BAD_RESPONSE')
                window.alert('Please upload an image. (jpg/jpeg/png)');
			else window.alert(err.response.data.message);
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