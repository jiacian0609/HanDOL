import styled from 'styled-components';

export const PostWrapper = styled.div `
    width: 500px;
    height: fit-content;

    padding: 30px;

    background-color: #FFFFFF;
    border-radius: 20px;
    box-shadow: 2px 2px 1px 1px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const PostImg = styled.img `
    max-width: 300px;
    max-height: 300px;

    margin-bottom: 10px;

    background-color: #F2F2F2;
    backgroune-size: contain;
    border-radius: 10px;
`

export const PostButtons = styled.div `
    width: 100%;
    display: flex;
    gap: 7px;
`

export const PostButton = styled.button `
    width: 30px;
    height: 30px;

    background-image: url('/icons/${props => props.src}.png');
    background-size: cover;
    background-color: inherit;
    border: none;

    cursor: pointer;

    ${props => props.active && `
        background-image: url('/icons/${props.src}-active.png');
    `}
`

export const PostContentField = styled.div `
    width: 100%;
    padding: 10px 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const PostUsername = styled.div `
    // margin: 10px 0;

    font-family: Overpass;
    font-size: 16px;
    font-weight: 900;
    text-align: left;
    line-height: 16px;
`

export const PostContent = styled.div `
    max-height: 100px;

    overflow-y: scroll;

    font-family: Overpass;
    font-size: 16px;
    text-align: left;
    line-height: 16px;

    border: none;
`

export const PostDate = styled.div `
    // margin: 10px 0; 

    font-family: Overpass;
    font-size: 16px;
    text-align: left;
    line-height: 16px;

    color: #BBBBBB;
`

export const PostCommentField = styled.div `
    width: 100%;
`

export const PostComment = styled.div `
    width: 100%;
    padding: 10px 5px;
    display: flex;
    gap: 10px;
`

export const PostCommentInput = styled.input `
    width: 100%;
    padding: 5px;

    font-family: Overpass;
    font-size: 16px;
    text-align: left;
    line-height: 16px;

    background-color: #F2F2F2;
    border: none;
`