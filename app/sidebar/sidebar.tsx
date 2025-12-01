"use client";

import { useState } from "react";
import Navigation from "../../components/BottomNav";
import Header from "../../components/Header";

export default function SidebarPage() {
    const [activeTab, setActiveTab] = useState<"home" | "itinerary" | "notifications" | "settings">("home");

    return (
        <>
            <Header />

            <Navigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                unreadCount={3}
            />
        </>
    );
}
