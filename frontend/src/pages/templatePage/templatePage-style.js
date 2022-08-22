import styled from 'styled-components';

export const TemplateWrapper = styled.div `
    width: 100%;
    height: 100%;
    padding: 50px 0;
    display: flex;
    justify-content: center;

    @media screen and (max-width: 500px) {
        // width: fit-content;
        // height: fit-content;
        padding: 20px 0;
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
        // overflow-x: scroll;
        overflow-y: scroll;
    }
`

export const TemplateSelectors = styled.div `
    // width: 100%;
    // height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`

export const TemplateSelectorField = styled.div `
    margin-bottom: 15px;
    display: flex;
    align-items: center;
`

export const TemplateSelectorName = styled.div `
    width: 100px;
    font-family: Overpass;
    font-size: 20px;
    text-align: left;
    color: #000000;
`

export const TemplateSelector = styled.select `
    width: 200px;
    padding: 3px 2px;

    font-family: Overpass;
    font-size: 15px;
    text-align: left;
    color: #000000;

    border-radius: 10px;
`

export const TemplateListWrapper = styled.div `
    width: 300px;
    height: 500px;

    margin-top: 30px;

    overflow-x: scroll;
    overflow-y: scroll;

    @media screen and (max-width: 500px) {
        margin: 10px 0;
        width: 330px;
        height: 500px;
    }
`

export const TemplateListContainer = styled.div `
    width: 850px;
    
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;

    @media screen and (max-width: 500px) {
        width: 580px;
        gap: 8px;
    }
`

export const TemplateEditor = styled.div `
    width: 850px;
    // height: 300px;

    margin-left: 50px;
    
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 500px) {
        width: 90%;
        height: 550px;
        // height: fit-content;
        margin-top: 5px;
        margin-left: 0;
        // overflow-x: scroll;
        // overflow-y: scroll;
    }
`

export const TemplateEditHeader = styled.div `
    display: flex;
    gap: 10px;
`

export const TemplateEditContainer = styled.div `
    overflow-x: scroll;
    overflow-y: scroll;


    @media screen and (max-width: 500px) {
        width: 100%;
        height: fit-content;
        margin-top: 5px;
        margin-left: 0;  
    }
`

export const TemplateEditField = styled.div `
    width: 720px;
    min-height: 680px;
    max-height: 1280px;

    padding: 20px;

    background-color: #FFFFFF;
`

export const TemplateEditTitle = styled.div `
    font-family: Overpass;
    font-size: 30px;
    text-align: center;
`

export const TemplateEditSubtitle = styled.div `
    // margin-top: 20px;
    font-family: Overpass;
    font-size: 24px;
    text-align: center;
`

export const TemplateEditList = styled.div `
    width: 100%;
    min-height: 300px;
    // height: 100%;
    margin-bottom: 20px;

    display: flex;
    flex-wrap: wrap;
    gap: 15px;
`

export const TemplateEditSellField = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const TemplateEditPrice = styled.input `
    width: 100px;
    margin-top: 10px;
    padding: 1px;

    font-family: Overpass;
    font-size: 24px;
    text-align: center;
    line-height: 24px;

    border: none;
    // background-color: #F2F2F2;
`