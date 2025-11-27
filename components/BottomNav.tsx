import { Home, Calendar, Bell, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavProps {
    activeTab: string;
    setActiveTab: (tab: 'home' | 'itinerary' | 'notifications' | 'settings') => void;
    unreadCount: number;
}

export default function Navigation({ activeTab, setActiveTab, unreadCount }: NavProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const tabs = [
        { id: 'home', icon: Home, label: 'Trang chủ' },
        { id: 'itinerary', icon: Calendar, label: 'Hành trình' },
        { id: 'notifications', icon: Bell, label: 'Thông báo', badge: unreadCount },
        { id: 'settings', icon: Settings, label: 'Cài đặt' },
    ];

    return (
        <>
            {/* --- DESKTOP SIDEBAR --- */}
            <aside
                className={`
                    fixed left-0 top-0 bottom-0 z-50 bg-white border-r border-gray-200
                    hidden md:flex flex-col
                    transition-all duration-300 ease-in-out
                    ${sidebarOpen ? 'w-64' : 'w-20'}
                `}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <h1
                        className={`
                            font-bold text-xl text-[#0B6EFD] whitespace-nowrap
                            transition-opacity duration-300
                            ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                        `}
                    >
                        Du Lịch VN
                    </h1>

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* NAV MENU */}
                <nav className="mt-6 flex-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as never)}
                            className={`
                                w-full flex items-center gap-4 px-5 py-4 hover:bg-blue-50 transition
                                ${activeTab === tab.id
                                ? 'bg-blue-50 text-[#0B6EFD] border-r-4 border-[#0B6EFD]'
                                : 'text-gray-600'
                            }
                            `}
                        >
                            <div className="relative">
                                <tab.icon className="w-6 h-6" />

                                {/* Badge */}
                                {tab.badge ? (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                                        {tab.badge > 99 ? '99+' : tab.badge}
                                    </span>
                                ) : null}
                            </div>

                            {/* LABEL (ẨN KHI THU GỌN) */}
                            <span
                                className={`
                                    font-medium whitespace-nowrap
                                    transition-opacity duration-300
                                    ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                                `}
                            >
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* SPACE for content shifting */}
            <div className={`hidden md:block transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`} />

            {/* --- MOBILE NAVIGATION BAR --- */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-50 md:hidden">
                <div className="flex justify-around items-center py-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as never)}
                            className="relative flex flex-col items-center gap-1 px-4 py-2"
                        >
                            <tab.icon
                                className={`
                                    w-6 h-6 transition-all
                                    ${activeTab === tab.id ? 'text-[#0B6EFD] scale-110' : 'text-gray-500'}
                                `}
                            />
                            <span
                                className={`
                                    text-xs font-medium
                                    ${activeTab === tab.id ? 'text-[#0B6EFD]' : 'text-gray-500'}
                                `}
                            >
                                {tab.label}
                            </span>

                            {tab.badge ? (
                                <span className="absolute top-0 right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                                    {tab.badge > 99 ? '99+' : tab.badge}
                                </span>
                            ) : null}
                        </button>
                    ))}
                </div>
            </nav>

            {/* SPACE FIX for bottom nav */}
            <div className="h-20 md:hidden" />
        </>
    );
}
