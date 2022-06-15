import { Link } from 'react-router-dom';
import { SideBarWrapper, SideBarTopButtons, SideBarDownButtons, SideBarField, SideBarButton, SideBarTitle, SideBarText } from './SideBar-style.js';

export default function SideBar({showSideBar, setShowSideBar}) {
    return (
        <SideBarWrapper show={showSideBar}>
            <SideBarTopButtons>
                <SideBarField onClick={() => setShowSideBar(!showSideBar)}>
                    <SideBarButton src='bars'/>
                    <SideBarTitle show={showSideBar}>HanDOL</SideBarTitle>
                </SideBarField>
                <SideBarField>
                    <SideBarButton src='home' />
                    <SideBarText show={showSideBar}>Home</SideBarText>
                </SideBarField>
                <SideBarField>
                    <SideBarButton src='list' />
                    <SideBarText show={showSideBar}>Card List</SideBarText>
                </SideBarField>
                <SideBarField>
                    <SideBarButton src='template' />
                    <SideBarText show={showSideBar}>Template</SideBarText>
                </SideBarField>
                <SideBarField>
                    <SideBarButton src='profile' />
                    <SideBarText show={showSideBar}>Profile</SideBarText>
                </SideBarField>
            </SideBarTopButtons>
            <SideBarDownButtons>
                <SideBarField>
                    <SideBarButton src='feedback' />
                    <SideBarText show={showSideBar}>Feedback</SideBarText>
                </SideBarField>
                <SideBarField>
                    <SideBarButton src='signout' />
                    <SideBarText show={showSideBar}>Sign Out</SideBarText>
                </SideBarField>
            </SideBarDownButtons>
        </SideBarWrapper>
    )
}