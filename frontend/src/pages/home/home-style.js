import styled from 'styled-components';

export const HomeWrapper = styled.div `
    width: 80%;
    // height: auto;

    padding: 50px 0;

    display: flex;
    flex-wrap: wrap;
    gap: 50px;
`

export const HomeButton = styled.button `
    width: 40px;
    height: 40px;

    position: fixed;
    right: 50px;
    bottom: 70px;

    font-family: Overpass;
    font-size: 30px;
    text-align: center;

    border: solid 1px #000000;
    border-radius: 50%;
    background-color: #FFFFFF;
    box-shadow: 2px 2px 1px 1px rgba(0, 0, 0, 0.2);

    cursor: pointer;

    &:hover {
        width: 42px;
        height: 42px;
        box-shadow: 2px 2px 1px 1px rgba(0, 0, 0, 0.8);
    }
`