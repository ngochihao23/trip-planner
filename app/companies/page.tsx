"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/BottomNav";
import CompaniesSection from "@/components/companies/CompaniesSection"; // bạn tạo component hiển thị danh sách công ty

export default function CompaniesPage() {
    const [activeTab, setActiveTab] = useState<"home" | "itinerary" | "notifications" | "settings" | "companies">("companies");

    return (
        <div className="min-h-screen flex flex-col pb-20">
            {/* Header */}
            <Header />

            {/* Nội dung chính */}
            <div className="p-4">
                <CompaniesSection />
            </div>

            {/* Bottom Navigation */}
            <Navigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                unreadCount={0} // nếu có thông báo thì truyền số lượng
            />
        </div>
    );
}
