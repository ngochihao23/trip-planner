"use client";

import Header from "@/components/Header";
import Navigation from "@/components/BottomNav";
import { Home, MapPin, Search, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    const dummySetTab = () => {};

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100 overflow-hidden">
            <Header />

            <div className="flex-1 relative flex flex-col items-center justify-center px-6 py-12 md:py-16 lg:py-20">

                <div className="absolute inset-0 pointer-events-none hidden md:block">
                    <Sparkles className="absolute top-20 left-10 w-12 h-12 text-yellow-400 animate-pulse" />
                    <Sparkles className="absolute top-32 right-16 w-10 h-10 text-pink-400 animate-ping" />
                    <Sparkles className="absolute bottom-32 left-20 w-14 h-14 text-purple-400 animate-pulse delay-300" />
                    <Sparkles className="absolute bottom-24 right-32 w-12 h-12 text-blue-400 animate-ping delay-700" />
                </div>

                <div className="relative mb-8 md:mb-12">
                    <div className="relative">
                        <div className="w-32 h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                            <Search className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-white" />
                        </div>
                        <div className="absolute top-8 left-8 md:top-10 md:left-10 lg:top-12 lg:left-14 w-5 h-9 md:w-7 md:h-11 bg-white rounded-full animate-ping delay-1000" />
                        <div className="absolute top-8 right-8 md:top-10 md:right-10 lg:top-12 lg:right-14 w-5 h-9 md:w-7 md:h-11 bg-white rounded-full animate-ping delay-1300" />
                    </div>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 bg-clip-text text-transparent text-center leading-tight mb-4 animate-pulse">
                    404 – LẠC ĐƯỜNG RỒI!
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 text-center mb-10 max-w-2xl font-medium px-4">
                    HDV đang cầm bản đồ ngược, đoàn khách mất tích, còn bạn thì… lạc vào đây
                </p>

                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 z-10 w-full max-w-md px-4">
                    <Link
                        href="/"
                        className="group flex-1 inline-flex items-center justify-center gap-3 px-8 py-5 md:py-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-base md:text-lg rounded-3xl shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
                    >
                        <Home className="w-6 h-6 md:w-8 md:h-8 group-hover:animate-bounce" />
                        Về nhà ăn cơm thôi nào!
                    </Link>

                    <Link
                        href="/Itinerary"
                        className="group flex-1 inline-flex items-center justify-center gap-3 px-8 py-5 md:py-6 bg-white text-purple-600 font-bold text-base md:text-lg rounded-3xl border-4 border-purple-300 shadow-xl hover:shadow-purple-300/50 transform hover:scale-105 transition-all duration-300"
                    >
                        <MapPin className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-12 transition-transform" />
                        Tìm lại lịch trình tour
                    </Link>
                </div>

                <div className="mt-12 md:mt-16 flex flex-col items-center gap-4 text-center px-4">
                </div>
            </div>

            <Navigation activeTab="home" setActiveTab={dummySetTab} unreadCount={0} />
        </div>
    );
}