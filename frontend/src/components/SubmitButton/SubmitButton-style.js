import styled from 'styled-components';

export const SubmitButtonWrapper = styled.div `
    width: 30px;
    height: 30px;
    background-image: url('/icons/check.png');
    background-color: inherit;
    background-size: cover;
    border: none;
    cursor: pointer;

    &:hover {
        background-image: url('/icons/check-hover.png');
    }
`