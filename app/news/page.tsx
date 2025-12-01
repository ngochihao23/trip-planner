"use client";

import Header from "@/components/Header";
import Navigation from "@/components/BottomNav";
import NewsSection from "@/components/news/NewsSection";

import { useState } from "react";

export default function Newspage() {
    const [activeTab, setActiveTab] = useState("news");

    return (
        <div className="min-h-screen flex flex-col pb-20">
            <Header />

            <div className="p-4">
                <NewsSection />
            </div>

            <Navigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                unreadCount={3}
            />
        </div>
    );
}
