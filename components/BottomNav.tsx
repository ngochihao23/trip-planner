"use client";

import Link from "next/link";
import { Home, Calendar, Bell, Settings, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavProps {
    activeTab: string;
    setActiveTab: (tab: 'home' | 'itinerary' | 'notifications' | 'settings') => void;
    unreadCount: number;
}

export default function Navigation({ activeTab, setActiveTab, unreadCount }: NavProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const tabs = [
        { id: "home", icon: Home, label: "Trang chủ", href: "/" },
        { id: "itinerary", icon: Calendar, label: "Hành trình", href: "/Itinerary" },
        { id: "notifications", icon: Bell, label: "Thông báo", href: "/Notification", badge: unreadCount },
        { id: "settings", icon: Settings, label: "Cài đặt", href: "/Profile" },
    ];

    return (
        <>
            {/* Desktop Top Navigation */}
            <header className="hidden md:block fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-xl border-b border-gray-200 z-50 shadow-sm">
                <div className="flex items-center h-full px-6">
                    <h1 className="font-bold text-2xl text-[#0B6EFD] flex-1">Du Lịch VN</h1>

                    <nav className="flex items-center gap-1">
                        {tabs.map((tab) => (
                            <Link
                                href={tab.href}
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as never)}
                                className={`
                                    relative flex items-center gap-3 px-5 py-3 rounded-xl font-medium text-sm transition-all
                                    ${activeTab === tab.id
                                    ? "bg-[#0B6EFD] text-white shadow-md"
                                    : "text-gray-600 hover:bg-gray-100"
                                }
                                `}
                            >
                                <tab.icon className="w-5 h-5" />

                                <span
                                    className={`
                                        transition-all duration-300 overflow-hidden
                                        ${sidebarOpen ? "w-auto opacity-100" : "w-0 opacity-0"}
                                    `}
                                >
                                    {tab.label}
                                </span>

                                {tab.badge ? (
                                    <span className="
                                        absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold 
                                        min-w-5 h-5 rounded-full flex items-center justify-center animate-pulse
                                    ">
                                        {tab.badge > 99 ? "99+" : tab.badge}
                                    </span>
                                ) : null}
                            </Link>
                        ))}

                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="ml-4 p-3 hover:bg-gray-100 rounded-xl transition-all"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </nav>
                </div>
            </header>

            <div className="hidden md:block h-16" />

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-50 md:hidden shadow-lg">
                <div className="flex justify-around items-center py-3">
                    {tabs.map((tab) => (
                        <Link
                            href={tab.href}
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as never)}
                            className="relative flex flex-col items-center gap-1 px-4 py-2"
                        >
                            <tab.icon
                                className={`
                                    w-6 h-6 transition-all duration-200
                                    ${activeTab === tab.id ? "text-[#0B6EFD] scale-110" : "text-gray-500"}
                                `}
                            />

                            <span
                                className={`
                                    text-xs font-medium
                                    ${activeTab === tab.id ? "text-[#0B6EFD]" : "text-gray-500"}
                                `}
                            >
                                {tab.label}
                            </span>

                            {tab.badge ? (
                                <span className="
                                    absolute -top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 
                                    rounded-full flex items-center justify-center animate-pulse shadow-md
                                ">
                                    {tab.badge > 99 ? "99+" : tab.badge}
                                </span>
                            ) : null}
                        </Link>
                    ))}
                </div>
            </nav>

            <div className="h-20 md:hidden" />
        </>
    );
}
