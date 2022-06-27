import { api } from '../../api.js';
import { useState } from 'react';
import { FeedbackWrapper, FeedbackTitleField, FeedbackTitle, FeedbackType, FeedbackContent, FeedbackUpload } from './feedback-style.js';
import SubmitButton from '../../components/SubmitButton';

export default function Feedback() {
    const [image, setImage] = useState();
    // console.log('image: ', image);

    function handleSubmit() {
        const title = document.getElementById('title').value;
        const type = document.getElementById('type').value;
        const content = document.getElementById('content').value;
        
        api.feedback(title, type, content, image)
        .then(res => {
            window.alert(res);
            window.location.reload();
		})
		.catch(err => {
			window.alert(err.response.data.message);
		})
    }

    return (
        <FeedbackWrapper>
            <FeedbackTitleField>
                <FeedbackTitle placeholder='Title' id='title' />
                <FeedbackType id='type'>
                    <option value="update">Update Request</option>
                    <option value="problem">Problem</option>
                    <option value="others">Others</option>
                </FeedbackType>
            </FeedbackTitleField>
            <FeedbackContent placeholder='Content' id='content' />
            <FeedbackUpload
                type="file"
                name="image"
                accept="image/*"
                onChange={e => setImage(e.target.files[0])}
            />
            <SubmitButton handleSubmit={handleSubmit} />
        </FeedbackWrapper>
    )
}