'use client'
import React, { useState } from 'react';

import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import HomeTab from '../components/HomeTab/HomeTab';
import ItineraryTab from '../components/ItineraryTab/ItineraryTab';
import NotificationTab from '../components/NotificationTab/NotificationTab';
import SettingsTab from '../components/SettingTabs/SettingTabs';

import { Booking, Notification, UserProfile } from './types';

export default function VietnamTravelApp() {
    const [activeTab, setActiveTab] = useState<'home' | 'itinerary' | 'notifications' | 'settings'>('home');
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 'welcome-1',
            title: 'Xin chào!',
            message: 'Chào mừng bạn đã đến với ứng dụng của chúng tôi. Rất vui được đồng hành trong hành trình khám phá và trải nghiệm của bạn.',
            time: 'Vừa xong',
            read: false,
            type: 'review',
        },
        {
            id: 'welcome-2',
            title: 'Thông báo thanh toán',
            message: 'Tất cả các thông báo về đặt tour, thanh toán và cập nhật hành trình sẽ được hiển thị tại đây.',
            time: 'Vừa xong',
            read: false,
            type: 'review',
        }
    ]);


    const bookings: Booking[] = [];
    const userProfile: UserProfile = { name: 'Ngô Chí Hào', email: 'chihao@email.com', phone: '0901234567', bio: 'Yêu thích khám phá', avatar: 'User' };

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleReadAll = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const handleNotificationClick = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    return (
        <div className="min-h-screen bg-[#F7FBFF]">
            <Header />
            <main className="max-w-7xl mx-auto">
                {activeTab === 'home' && <HomeTab />}
                {activeTab === 'itinerary' && <ItineraryTab bookings={bookings} />}
                {activeTab === 'notifications' && (
                    <NotificationTab
                        notifications={notifications}
                        onReadAll={handleReadAll}
                        onNotificationClick={handleNotificationClick}
                    />
                )}
                {activeTab === 'settings' && <SettingsTab user={userProfile} />}
            </main>
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} unreadCount={unreadCount} />
        </div>
    );
}
