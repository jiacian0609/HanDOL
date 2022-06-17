import styled from 'styled-components';

export const IndexWrapper = styled.div `
    width: 100%;
    height: 100%;

    position: absolute;

    background-color: #FFFBEF;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const IndexTitle = styled.div `
    font-family: Overpass;
    font-size: 50px;
`

export const IndexDivider = styled.div `
    width: 500px;
    height: 3px;
    background-color: #313538;
    border-radius: 50px;
`

export const IndexForm = styled.div `
    width: 450px;
    margin-top: 30px;
`

export const IndexButtons = styled.div `
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    gap: 20px;
`

export const IndexButton = styled.button `
    font-family: Overpass;
    font-size: 20px;
    text-align: left;
    color: #8B775A;

    background-color: #FFFFFF;
    border: solid 2px #8B775A;
    border-radius: 10px;

    cursor: pointer;

    &:hover {
        color: #FFFFFF;
        background-color: #8B775A;
    }

    ${(props) => props.active && `
        color: #FFFFFF;
        background-color: #8B775A;
    `}
`

export const IndexFormField = styled.div `
    margin-bottom: 20px;

    display: flex;
    align-items: center;
`

export const IndexText = styled.div `
    width: 50%;
    font-family: Overpass;
    font-size: 20px;
    text-align: left;
`

export const IndexInput = styled.input `
    width: 60%;

    padding: 5px 10px;

    font-family: Overpass;
    font-size: 16px;
    text-align: left;

    background-color: #FFFFFF;
    border: solid 1px #F2F2F2;
    border-radius: 10px;
    box-shadow: 2px 2px 1px 1px rgba(0, 0, 0, 0.2);
`