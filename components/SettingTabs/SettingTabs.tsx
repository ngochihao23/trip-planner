"use client";

import { motion } from "framer-motion";
import {
    User, Globe, MessageSquare, Lock,
    FileText, HelpCircle, Info, LogOut, ChevronRight
} from "lucide-react";
import { UserProfile } from "@/app/types";
import ProfileEditor from "@/components/profile/profileeditor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import LanguageSelector from "../profile/language";

export default function SettingsTab({ user }: { user: UserProfile }) {
    const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
        if (typeof window === "undefined") return user;
        const saved = localStorage.getItem("user-profile");
        return saved ? JSON.parse(saved) : user;
    });

    const [language, setLanguage] = useState<string>(() => {
        if (typeof window === "undefined") return "vi";
        const savedLang = localStorage.getItem("app_language");
        return savedLang ?? "vi";
    });

    const [openLanguage, setOpenLanguage] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleSave = async (updated: UserProfile) => {
        localStorage.setItem("user-profile", JSON.stringify(updated));
        setCurrentUser(updated);
        try {
            await fetch("/api/user/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updated),
            });
        } catch (err) { console.error(err); }
    };

    const accountItems = [
        { icon: User, label: "Thông tin cá nhân", color: "text-blue-600" },
        { icon: Globe, label: "Ngôn ngữ", color: "text-green-600", badge: language.toUpperCase(), onClick: () => setOpenLanguage(true) },
        { icon: MessageSquare, label: "Lịch sử đặt vé", color: "text-purple-600" },
        { icon: Lock, label: "Đổi mật khẩu", color: "text-orange-600" },
    ];

    const infoItems = [
        { icon: FileText, label: "Điều khoản dịch vụ", color: "text-gray-600" },
        { icon: HelpCircle, label: "Hỗ trợ 24/7", color: "text-gray-600" },
        { icon: Info, label: "Về Lịch VN", color: "text-gray-600" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50"
        >
            {/* Mobile: Layout dọc đẹp */}
            <div className="lg:hidden">
                <div className="px-4 pt-6 pb-20">
                    <h1 className="text-3xl font-black text-blue-900 mb-8">Cài đặt</h1>

                    {/* Profile Card */}
                    <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border border-blue-100">
                        <div className="flex items-center gap-5">
                            <Avatar className="w-24 h-24 ring-4 ring-blue-100">
                                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                                <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                                    {currentUser.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}</h2>
                                <p className="text-blue-600 font-medium">{currentUser.email}</p>
                            </div>
                        </div>
                        <ProfileEditor profile={currentUser} onSave={handleSave} />
                    </div>

                    {/* Menu */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
                            {accountItems.map((item, i) => (
                                <button
                                    key={i}
                                    onClick={item.onClick}
                                    className="w-full px-6 py-5 flex items-center gap-4 hover:bg-blue-50 transition-all border-b border-gray-100 last:border-0"
                                >
                                    <item.icon className={`w-6 h-6 ${item.color}`} />
                                    <span className="flex-1 text-left font-semibold text-gray-800">{item.label}</span>
                                    {item.badge && <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">{item.badge}</span>}
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </button>
                            ))}
                        </div>

                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
                            {infoItems.map((item, i) => (
                                <button
                                    key={i}
                                    className="w-full px-6 py-5 flex items-center gap-4 hover:bg-gray-50 transition-all border-b border-gray-100 last:border-0"
                                >
                                    <item.icon className={`w-6 h-6 ${item.color}`} />
                                    <span className="flex-1 text-left font-semibold text-gray-700">{item.label}</span>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </button>
                            ))}
                        </div>

                        <button className="w-full bg-gradient-to-r from-red-500 to-rose-600 text-white py-5 rounded-3xl font-bold text-lg shadow-xl hover:shadow-red-500/50 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
                            <LogOut className="w-6 h-6" />
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop: Layout 2 cột chuyên nghiệp – KHÔNG CANH GIỮA */}
            {isDesktop && (
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <h1 className="text-4xl font-black text-blue-900 mb-10">Cài đặt tài khoản</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cột trái: Thông tin người dùng */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100 sticky top-6">
                                <div className="flex flex-col items-center text-center">
                                    <Avatar className="w-32 h-32 ring-8 ring-blue-100 mb-6">
                                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                                        <AvatarFallback className="text-5xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                                            {currentUser.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-3xl font-bold text-gray-900">{currentUser.name}</h2>
                                    <p className="text-lg text-blue-600 font-medium mt-2">{currentUser.email}</p>
                                </div>
                                <div className="mt-8">
                                    <ProfileEditor profile={currentUser} onSave={handleSave} />
                                </div>
                            </div>
                        </div>

                        {/* Cột phải: Menu cài đặt */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-5">
                                    <h3 className="text-xl font-bold">Tài khoản & Bảo mật</h3>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {accountItems.map((item, i) => (
                                        <button
                                            key={i}
                                            onClick={item.onClick}
                                            className="w-full px-8 py-6 flex items-center gap-5 hover:bg-blue-50 transition-all"
                                        >
                                            <item.icon className={`w-7 h-7 ${item.color}`} />
                                            <span className="flex-1 text-left text-lg font-semibold text-gray-800">{item.label}</span>
                                            {item.badge && <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-bold">{item.badge}</span>}
                                            <ChevronRight className="w-6 h-6 text-gray-400" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                                <div className="bg-gray-800 text-white px-8 py-5">
                                    <h3 className="text-xl font-bold">Thông tin & Hỗ trợ</h3>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {infoItems.map((item, i) => (
                                        <button
                                            key={i}
                                            className="w-full px-8 py-6 flex items-center gap-5 hover:bg-gray-50 transition-all"
                                        >
                                            <item.icon className={`w-7 h-7 ${item.color}`} />
                                            <span className="flex-1 text-left text-lg font-medium text-gray-700">{item.label}</span>
                                            <ChevronRight className="w-6 h-6 text-gray-400" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full bg-gradient-to-r from-red-600 to-rose-700 text-white py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-red-600/50 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-4">
                                <LogOut className="w-7 h-7" />
                                Đăng xuất khỏi tài khoản
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <LanguageSelector
                open={openLanguage}
                onClose={() => setOpenLanguage(false)}
                language={language}
                onChange={(lang: string) => {
                    setLanguage(lang);
                    localStorage.setItem("app_language", lang);
                }}
            />
        </motion.div>
    );
}