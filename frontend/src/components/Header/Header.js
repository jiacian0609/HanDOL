import './Header-style.js';
import { HeaderWrapper, HeaderTitle, HeaderButton } from './Header-style.js';

export default function Header({setShowSideBar}) {
    return (
       <HeaderWrapper onClick={() => setShowSideBar(true)}>
           <HeaderButton />
           <HeaderTitle>HanDOL</HeaderTitle>
        </HeaderWrapper>
    )
}