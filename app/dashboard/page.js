import React from "react";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

const Dashboard = async () => {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('zoiko_token');
    const token = tokenCookie ? tokenCookie.value : null;
    const origin = process.env.NEXT_PUBLIC_BASE_URL || '';

    if (!token) {
        // Redirect to absolute login URL
        redirect((origin || '') + '/login');
    }
    // Server validated presence of zoiko_token. The client will fetch the user via /api/auth/me.
    return <DashboardClient />;
};

export default Dashboard;
