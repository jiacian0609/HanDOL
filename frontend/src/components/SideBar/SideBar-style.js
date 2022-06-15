import styled from 'styled-components';

export const SideBarWrapper = styled.div `
    width: ${props => props.show ? '200px' : '80px'} ;
    height: 100%;

    position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    
    background-color: #E9DBC7;

    transition: 0.5s ease;
`

export const SideBarTopButtons = styled.div `
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`

export const SideBarDownButtons = styled.div `
    position: fixed;
        bottom: 30px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`

export const SideBarField = styled.div `
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 5px;
`

export const SideBarButton = styled.div `
    width: 30px;
    height: 30px;
    padding: 0;

    color: #FFFFFF;

    background-image: url('/icons/${props => props.src}.png');
    background-size: cover;
    border: none;

    &:hover {
        background-image: url('/icons/${props => props.src}-hover.png');
    }
`

export const SideBarTitle = styled.div `
    display: ${props => props.show ? '' : 'none'};
    font-family: Overpass;
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 0em;
    text-align: left;

    transition: 2s ease;
`

export const SideBarText = styled.div `
    display: ${props => props.show ? '' : 'none'};
    font-family: Overpass;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0em;
    text-align: left;

    transition: 2s ease;
`