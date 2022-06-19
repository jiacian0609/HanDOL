import styled from 'styled-components';

export const TemplateWrapper = styled.div `
    height: 100%;
    padding: 50px 0;
    display: flex;
`

export const TemplateSelectors = styled.div `
    width: 300px;
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

    margin-top: 30px;

    overflow-x: scroll;
    overflow-y: scroll;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
`

export const TemplateEditor = styled.div `
    width: 850px;
    height: 100%;

    margin-left: 50px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const TemplateEditHeader = styled.div `
    display: flex;
    gap: 10px;
`

export const TemplateEditField = styled.div `
    width: 720px;
    height: 1280px;

    padding: 20px;

    overflow-y: scroll;

    background-color: #FFFFFF;
`

export const TemplateEditList = styled.div `
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
`