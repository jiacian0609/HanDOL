import styled from 'styled-components';

export const HeaderWrapper = styled.div `
    width: 100%;
    height: 80px;

    padding: 30px;

    position: fixed;
        top: 0;
        left: 0;
        // bottom: 0;
    
    background-color: #E9DBC7;

    display: none;
    align-items: center;

    @media screen and (max-width: 500px) {
        display: flex;
    }
`

export const HeaderTitle = styled.div `
    font-family: Overpass;
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 0em;
    text-align: left;
`

export const HeaderButton = styled.button `
    width: 30px;
    height: 30px;
    
    margin-right: 10px;

    background-color: inherit;
    background-image: url('/icons/bars.png');
    background-size: cover;
    border: none;
`