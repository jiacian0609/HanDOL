import axios from 'axios';
import { useState, useEffect  } from 'react';
import { FeedbackWrapper, FeedbackTitleField, FeedbackTitle, FeedbackType, FeedbackContent } from './feedback-style.js';
import SubmitButton from '../../components/SubmitButton';

export default function Feedback() {
    return (
        <FeedbackWrapper>
            <FeedbackTitleField>
                <FeedbackTitle placeholder='Title'/>
                <FeedbackType>
                    <option value="update">Update Request</option>
                    <option value="problem">Problem</option>
                    <option value="others">Others</option>
                </FeedbackType>
            </FeedbackTitleField>
            <FeedbackContent placeholder='Content'/>
            <SubmitButton />
        </FeedbackWrapper>
    )
}