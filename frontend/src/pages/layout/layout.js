import './index-style.js';
import { Outlet } from 'react-router-dom';
import { LayoutWrapper } from './index-style.js';

export default function Layout() {
    return (
        <LayoutWrapper>
            <Outlet />
        </LayoutWrapper>
    )
}