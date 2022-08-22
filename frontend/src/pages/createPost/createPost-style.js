import styled from 'styled-components';

export const PostWrapper = styled.div `
    width: 500px;

    padding: 30px;

    background-color: #FFFFFF;
    border-radius: 20px;
    box-shadow: 2px 2px 1px 1px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 500px) {
        width: 90%;
    }
`

export const PostImg = styled.img `
    max-width: 300px;
    max-height: 300px;

    background-color: #F2F2F2;
    backgroune-size: contain;

    @media screen and (max-width: 500px) {
        max-width: 200px;
        max-height: 200px;
    }
`

export const PostUpload = styled.input `
    width: 100%;
    margin: 10px 0;

    font-family: Overpass;
    font-size: 16px;
    text-align: left;
    line-height: 16px;
`

export const PostContent = styled.textarea `
    width: 100%;
    height: 100px;

    overflow-y: scroll;

    margin-bottom: 10px;
    padding: 10px 5px;

    font-family: Overpass;
    font-size: 16px;
    text-align: left;
    line-height: 16px;

    background-color: #F2F2F2;
    border: none;

    resize: none;
`