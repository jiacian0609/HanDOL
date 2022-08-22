import styled from 'styled-components';

export const ProfileWrapper = styled.div `
    width: 100%;
    height: 100%;
    padding: 80px 0;

    @media screen and (max-width: 500px) {
        padding: 20px 0;
    }
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
    background-size: contain;

    @media screen and (max-width: 500px) {
        width: 80px;
        height: 80px;
    }
`

export const ProfileUsername = styled.div `
    width: 200px;
    font-family: Overpass;
    font-size: 25px;
    font-weight: 900;
    text-align: left;
    line-height: 16px;

    @media screen and (max-width: 500px) {
        width: 150px;
        font-size: 20px;
        font-weight: 800;
    }
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
    min-height: 500px;
    padding: 20px 0;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 50px;

    overflow-y: scroll;
`

export const ProfileSettingButtons = styled.div `
    width: 25%;
    padding: 50px 0;

    display: flex;
    flex-direction: column;
    gap: 15px;

    @media screen and (max-width: 500px) {
        width: 60%;
    }
`

export const ProfileSettingButton = styled.button `
    width: 100%;    
    height: 40px;

    font-family: Overpass;
    font-size: 16px;
    text-align: center;
    line-height: 16px;

    background-color: #FFFFFF;
    border: solid 3px #E9DBC7;
    border-radius: 20px;

    cursor: pointer;

    &:hover {
        border: solid 3px #8B775A;
    }
`

export const ProfileUploadWrapper = styled.div `
    // width: 500px;
    height: fit-content;

    padding: 30px;

    background-color: #FFFFFF;
    border-radius: 20px;
    box-shadow: 2px 2px 1px 1px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 500px) {
        width: 80%;
    }
`

export const ProfileUploadImg = styled.img `
    max-width: 300px;
    max-height: 300px;

    background-color: #F2F2F2;
    backgroune-size: contain;

    @media screen and (max-width: 500px) {
        max-width: 200px;
        max-height: 200px;
    }
`

export const ProfileUpload = styled.input `
    width: 100%;
    margin: 10px 0;

    font-family: Overpass;
    font-size: 16px;
    text-align: left;
    line-height: 16px;
`