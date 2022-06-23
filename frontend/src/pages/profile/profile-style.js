import styled from 'styled-components';

export const ProfileWrapper = styled.div `
    height: 100%;
    padding: 80px 0;
`

export const ProfileInfo = styled.div `
    margin-bottom: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const ProfileImg = styled.img `
    width: 100px;
    height: 100px;

    margin-right: 20px;

    border-radius: 50%;
    border: solid 10px #FFFFFF;
    background-color: #F2F2F2;
    background-size: cover;
`

export const ProfileUsername = styled.div `
    width: 200px;
    font-family: Overpass;
    font-size: 25px;
    font-weight: 900;
    text-align: left;
    line-height: 16px;
`

export const ProfileButtons = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 15px;
`

export const ProfileButton = styled.button `
    width: 130px;
    height: 30px;
    // padding: 8px 30px;

    border: none;
    border-radius: 20px;
    background-color: #E9DBC7;

    font-family: Overpass;
    font-size: 16px;
    text-align: center;
    line-height: 16px;

    cursor: pointer;

    &:hover {
        background-color: #8B775A;
        color: #FFFFFF;
    }

    ${props => props.active && `
        background-color: #8B775A;
        color: #FFFFFF;
    `}
`

export const ProfileContentWrapper = styled.div `
    width: 100%;
    padding: 20px 0;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 50px;

    overflow-y: scroll;
`