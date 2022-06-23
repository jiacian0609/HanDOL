import axios from 'axios';
import { useState, useEffect  } from 'react';
import { ProfileWrapper, ProfileInfo, ProfileImg, ProfileUsername, ProfileButtons, ProfileButton, ProfileContentWrapper } from './profile-style.js';
import SubmitButton from '../../components/SubmitButton';

export default function Profile() {
    const [post, setPost] = useState(true);
    const [template, setTemplate] = useState(false);
    const [settings, setSettings] = useState(false);

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
                
            </ProfileContentWrapper>
        </ProfileWrapper>
    )
}