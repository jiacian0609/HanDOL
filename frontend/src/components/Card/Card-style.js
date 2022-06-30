import styled from 'styled-components';

export const CardImage = styled.img `
    width: 100px;
    height: 150px;

    border-radius: 10px;
    border: solid 3px #FFFFFF;
    box-shadow: 2px 2px 1px 1px rgba(0, 0, 0, 0.2);

    cursor: pointer;

    ${props => props.active && `
        border: solid 3px #000000;
    `}

    @media screen and (max-width: 500px) {
        width: 70px;
        height: 105px;
    }
`