import styled from 'styled-components';

export const CardListWrapper = styled.div `
    width: 100%;
    height: 100%;
    // padding: 50px 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

export const CardListSelectors = styled.div `
    // width: 300px;
    // height: 100%;

    // position: fixed;
    // top: 60px;

    display: flex;
    // flex-direction: column;
    align-items: center;
`

export const CardListSelectorField = styled.div `
    // margin-bottom: 15px;
    display: flex;
    align-items: center;
`

export const CardListSelectorName = styled.div `
    width: 80px;
    font-family: Overpass;
    font-size: 20px;
    text-align: left;
    color: #000000;
`

export const CardListSelector = styled.select `
    width: 200px;
    margin-right: 20px;
    padding: 3px 2px;

    font-family: Overpass;
    font-size: 15px;
    text-align: left;
    color: #000000;

    border-radius: 10px;
`

export const CardListListWrapper = styled.div `
    width: 850px;

    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
`