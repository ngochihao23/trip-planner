"use client";

import { motion } from "framer-motion";
import {
    User, Globe, MessageSquare, Lock,
    FileText, HelpCircle, Info, LogOut, ChevronRight
} from "lucide-react";
import { UserProfile } from "@/app/types";
import ProfileEditor from "@/components/profile/profileeditor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
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

    const handleSave = async (updated: UserProfile) => {
        localStorage.setItem("user-profile", JSON.stringify(updated));
        setCurrentUser(updated);
        try {
            await fetch("/api/user/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updated),
            });
        } catch {}
    };

    const accountItems = [
        { icon: User, label: "Thông tin cá nhân", color: "text-blue-600" },
        {
            icon: Globe,
            label: "Ngôn ngữ",
            color: "text-green-600",
            badge: language.toUpperCase(),
            onClick: () => setOpenLanguage(true),
        },
        { icon: MessageSquare, label: "Lịch sử chat", color: "text-purple-600" },
        { icon: Lock, label: "Đổi mật khẩu", color: "text-orange-600" },
    ];

    const infoItems = [
        { icon: FileText, label: "Chính sách", color: "text-gray-600" },
        { icon: HelpCircle, label: "Hỗ trợ", color: "text-gray-600" },
        { icon: Info, label: "Về chúng tôi", color: "text-gray-600" },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20 px-4">
            <h1 className="text-2xl font-bold text-[#0f172a] mb-6 mt-4">Cài đặt</h1>

            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
                <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                        <AvatarFallback className="text-3xl">
                            {currentUser.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                        <h2 className="font-bold text-lg text-[#0f172a]">{currentUser.name}</h2>
                        <p className="text-sm text-gray-500">{currentUser.email}</p>
                    </div>
                </div>

                <ProfileEditor profile={currentUser} onSave={handleSave} />
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
                {accountItems.map((item, i) => (
                    <button
                        key={i}
                        onClick={item.onClick}
                        className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                    >
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <span className="flex-1 font-medium text-[#0f172a]">{item.label}</span>
                        {item.badge && <span className="px-2 py-1 bg-gray-100 rounded text-xs">{item.badge}</span>}
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
                {infoItems.map((item, i) => (
                    <button
                        key={i}
                        className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                    >
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <span className="flex-1 font-medium text-[#0f172a]">{item.label}</span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                ))}
            </div>

            <button className="w-full bg-red-50 text-red-600 py-4 rounded-xl font-medium hover:bg-red-100 flex items-center justify-center gap-2">
                <LogOut className="w-5 h-5" />
                Đăng xuất
            </button>

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
