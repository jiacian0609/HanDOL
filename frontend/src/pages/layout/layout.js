import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutWrapper } from './layout-style.js';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';

export default function Layout() {
    const [showSideBar, setShowSideBar] = useState(false);
    return (
        <LayoutWrapper>
            <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
            <Header setShowSideBar={setShowSideBar} />
            <Outlet />
        </LayoutWrapper>
    )
}