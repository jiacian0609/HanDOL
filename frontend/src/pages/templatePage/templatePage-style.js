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
    height: 500px;

    margin-top: 30px;

    overflow-x: scroll;
    overflow-y: scroll;
`

export const TemplateListContainer = styled.div `
    width: 850px;
    
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
    min-height: 680px;
    max-height: 1280px;

    padding: 20px;

    overflow-y: scroll;

    background-color: #FFFFFF;
`

export const TemplateEditTitle = styled.div `
    font-family: Overpass;
    font-size: 30px;
    text-align: center;
`

export const TemplateEditSubtitle = styled.div `
    margin-top: 20px;
    font-family: Overpass;
    font-size: 24px;
    text-align: left;
`

export const TemplateEditList = styled.div `
    width: 100%;
    min-height: 300px;
    // height: 100%;

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
    background-color: #F2F2F2;
`