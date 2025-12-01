"use client";

import ItineraryTab from "../../components/ItineraryTab/ItineraryTab";
import Navigation from "../../components/BottomNav";
import Header from "../../components/Header";
import { useState } from "react";

export default function ItineraryPage() {
    const [activeTab, setActiveTab] = useState("itinerary");

    return (
        <>
            {/* Header */}
            <Header />

            {/* Nội dung chính */}
            <div className="mt-16 mb-20">
                <ItineraryTab bookings={[]} />
            </div>

            {/* Bottom Navigation */}
            <Navigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                unreadCount={0}
            />
        </>
    );
}
