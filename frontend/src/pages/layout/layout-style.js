import styled from 'styled-components';

export const LayoutWrapper = styled.div `
    width: 100%;
    height: 100%;

    padding-left: 80px;

    position: absolute;

    background-color: #FFFBEF;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    overflow-x: scroll;
    overflow-y: scroll;

    @media screen and (max-width: 500px) {
        padding-top: 80px;
        padding-left: 0;
    }
`