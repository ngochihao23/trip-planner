"use client";

import { useState } from "react";

import Header from "@/components/Header";
import Navigation from "@/components/BottomNav";

import SettingsTab from "@/components/SettingTabs/SettingTabs";
import ProfileEditor from "@/components/profile/profileeditor";
import LanguageSelector from "@/components/profile/language";

import { UserProfile } from "../types";

export default function ProfilePage() {

    const defaultUser: UserProfile = {
        name: "Chí Hào ",
        email: "example@email.com",
        phone: "",
        bio: "",
        avatar: "",
    };

    const [activeTab, setActiveTab] = useState("settings");
    const [language, setLanguage] = useState("vi");
    const [openLanguage, setOpenLanguage] = useState(false);

    const handleSaveProfile = (data: UserProfile) => {
        console.log("Saved:", data);
        localStorage.setItem("user-profile", JSON.stringify(data));
    };

    return (
        <div className="min-h-screen flex flex-col pb-20">

            <Header />

            <div className="p-4 space-y-6">

                <SettingsTab user={defaultUser} />

                <LanguageSelector
                    open={openLanguage}
                    onClose={() => setOpenLanguage(false)}
                    language={language}
                    onChange={(lang) => {
                        setLanguage(lang);
                        localStorage.setItem("app_language", lang);
                    }}
                />

                <ProfileEditor
                    profile={defaultUser}
                    onSave={handleSaveProfile}
                />
            </div>

            <Navigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                unreadCount={3}
            />
        </div>
    );
}
