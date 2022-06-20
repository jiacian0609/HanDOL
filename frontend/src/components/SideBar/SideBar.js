import { Link } from 'react-router-dom';
import { SideBarWrapper, SideBarTopButtons, SideBarDownButtons, SideBarField, SideBarButton, SideBarTitle, SideBarText } from './SideBar-style.js';

export default function SideBar({showSideBar, setShowSideBar}) {
    function handleSignOut() {
        window.localStorage.clear();
        window.location.href = '/';
    }

    return (
        <SideBarWrapper show={showSideBar}>
            <SideBarTopButtons>
                <SideBarField onClick={() => setShowSideBar(!showSideBar)} src='bars'>
                    <SideBarButton src='bars'/>
                    <SideBarTitle show={showSideBar}>HanDOL</SideBarTitle>
                </SideBarField>
                <Link to='home' style={{ textDecoration: 'none', color: 'inherit'}}>
                    <SideBarField src='home'>
                        <SideBarButton src='home' />
                        <SideBarText show={showSideBar}>Home</SideBarText>
                    </SideBarField>
                </Link>
                <Link to='/cardlist' style={{ textDecoration: 'none', color: 'inherit'}}>
                    <SideBarField src='list'>
                        <SideBarButton src='list' />
                        <SideBarText show={showSideBar}>Card List</SideBarText>
                    </SideBarField>
                </Link>
                <Link to='/template' style={{ textDecoration: 'none', color: 'inherit'}}>
                    <SideBarField src='template'>
                        <SideBarButton src='template' />
                        <SideBarText show={showSideBar}>Template</SideBarText>
                    </SideBarField>
                </Link>
                <Link to='/profile' style={{ textDecoration: 'none', color: 'inherit'}}>
                    <SideBarField src='profile'>
                        <SideBarButton src='profile' />
                        <SideBarText show={showSideBar}>Profile</SideBarText>
                    </SideBarField>
                </Link>
            </SideBarTopButtons>
            <SideBarDownButtons>
                <Link to='/feedback' style={{ textDecoration: 'none', color: 'inherit'}}>
                    <SideBarField src='feedback'>
                        <SideBarButton src='feedback' />
                        <SideBarText show={showSideBar}>Feedback</SideBarText>
                    </SideBarField>
                </Link>
                <SideBarField onClick={() => handleSignOut()} src='signout'>
                    <SideBarButton src='signout' />
                    <SideBarText show={showSideBar}>Sign Out</SideBarText>
                </SideBarField>
            </SideBarDownButtons>
        </SideBarWrapper>
    )
}