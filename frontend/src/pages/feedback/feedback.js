import { api } from '../../api.js';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FeedbackWrapper, FeedbackTitleField, FeedbackTitle, FeedbackType, FeedbackContent, FeedbackUpload } from './feedback-style.js';
import SubmitButton from '../../components/SubmitButton';

export default function Feedback() {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('update');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    function handleSubmit() {
        const id = toast.loading('Submitting your feedback...');
        
        api.feedback(title, type, content, image)
        .then(res => {
            toast.update(id, {type: toast.TYPE.SUCCESS, render: res, isLoading: false, autoClose: 5000, closeButton: true})
            setTitle('');
            setType('update');
            setContent('');
            setImage(undefined);
            document.getElementById('image').value = '';
        })
        .catch(err => {
            console.log(err);
                if (err.code === 'ERR_BAD_RESPONSE')
                    toast.update(id, {type: toast.TYPE.ERROR, render: 'Please upload an image. (jpg/jpeg/png)', isLoading: false, autoClose: 5000, closeButton: true})
            else toast.update(id, {type: toast.TYPE.ERROR, render: err.response.data.message, isLoading: false, autoClose: 5000, closeButton: true})
        })
    }

    return (
        <FeedbackWrapper>
            <FeedbackTitleField>
                <FeedbackTitle placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
                <FeedbackType id='type' value={type} onChange={e => setType(e.target.value)}>
                    <option value="update">Update Request</option>
                    <option value="problem">Problem</option>
                    <option value="others">Others</option>
                </FeedbackType>
            </FeedbackTitleField>
            <FeedbackContent placeholder='Content' value={content} onChange={e => setContent(e.target.value)}/>
            <FeedbackUpload
                type='file'
                id='image'
                name='image'
                accept='image/*'
                onChange={e => setImage(e.target.files[0])}
            />
            <SubmitButton handleSubmit={handleSubmit} />
        </FeedbackWrapper>
    )
}