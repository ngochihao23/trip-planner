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
        { id: '1', title: 'Đặt tour thành công', message: 'Tour Hạ Long Bay đã được xác nhận', time: '2 giờ trước', read: false, type: 'booking' },
        { id: '2', title: 'Thanh toán hoàn tất', message: 'Đã thanh toán 5.000.000đ', time: '1 ngày trước', read: false, type: 'payment' },
    ]);

    const bookings: Booking[] = [];
    const userProfile: UserProfile = { name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', phone: '0901234567', bio: 'Yêu thích khám phá', avatar: 'User' };

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
