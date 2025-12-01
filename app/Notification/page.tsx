"use client";

import { useState } from "react";
import NotificationTab from "@/components/NotificationTab/NotificationTab";
import Navigation from "@/components/BottomNav";
import Header from "@/components/Header";
import { Notification } from "@/app/types";

export default function NotificationPage() {
    const [activeTab, setActiveTab] = useState<"home" | "itinerary" | "notifications" | "settings">("notifications");

    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "1",
            title: "Ưu đãi mùa lễ hội",
            message: "Giảm giá 20% cho tất cả tour trong tháng này!",
            time: "2 giờ trước",
            read: false,
            type: "booking"
        },
        {
            id: "2",
            title: "Xác nhận đặt tour",
            message: "Bạn đã đặt thành công tour Đà Lạt 3N2Đ.",
            time: "Hôm qua",
            read: true,
            type: "booking"
        },
    ]);

    const handleReadAll = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const handleNotificationClick = (id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    return (
        <>
            <Header />

            <NotificationTab
                notifications={notifications}
                onReadAll={handleReadAll}
                onNotificationClick={handleNotificationClick}
            />

            <Navigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                unreadCount={notifications.filter(n => !n.read).length}
            />
        </>
    );
}
