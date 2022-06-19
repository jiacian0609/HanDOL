import styled from 'styled-components';

export const FeedbackWrapper = styled.div `
    width: 600px;

    padding: 30px;

    background-color: #FFFFFF;
    border-radius: 20px;
    box-shadow: 2px 2px 1px 1px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const FeedbackTitleField = styled.div `
    width: 100%;
    margin-bottom: 15px;
`

export const FeedbackTitle = styled.input `
    width: calc(100% - 160px);
    padding: 5px;

    margin-right: 10px;

    font-family: Overpass;
    font-size: 16px;
    text-align: left;
    line-height: 16px;

    background-color: #F2F2F2;
    border: none;
`

export const FeedbackType = styled.select `
    width: 150px;
    padding: 4px;

    font-family: Overpass;
    font-size: 16px;
    text-align: left;
    line-height: 16px;

    background-color: #F2F2F2;
    border: none;
`

export const FeedbackContent = styled.textarea `
    width: 100%;
    height: 300px;

    padding: 10px 5px;

    font-family: Overpass;
    font-size: 16px;
    text-align: left;
    line-height: 16px;

    background-color: #F2F2F2;
    border: none;

    resize: none;
`

export const FeedbackUpload = styled.input `
    width: 100%;
    margin: 10px 0;

    font-family: Overpass;
    font-size: 16px;
    text-align: left;
    line-height: 16px;
`