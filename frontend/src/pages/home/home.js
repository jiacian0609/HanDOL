import { useState, useEffect } from 'react';
import axios from 'axios';
import { HomeWrapper, HomeButton } from './home-style';

export default function Home() {
    function handleClick() {
        window.location.href = '/post';
    }
    
    return (
        <HomeWrapper>
            <HomeButton onClick={() => handleClick()}>+</HomeButton>
        </HomeWrapper>
    )
}