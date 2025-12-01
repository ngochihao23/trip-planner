"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/BottomNav";
import GuideSection from "@/components/guides/guidessection";
import { Search, X } from "lucide-react";

interface Guide {
    id: string;
    name: string;
    code: string;
    activeTours: number;
    completedTours: number;
}

const mockGuides: Guide[] = [
    { id: "1",  name: "Nguyễn Thị Minh Anh",      code: "HDV001", activeTours: 3, completedTours: 48 },
    { id: "2",  name: "Trần Quốc Bảo",           code: "HDV002", activeTours: 1, completedTours: 92 },
    { id: "3",  name: "Lê Hoàng Nam",            code: "HDV003", activeTours: 2, completedTours: 67 },
    { id: "4",  name: "Phạm Ngọc Lan",           code: "HDV004", activeTours: 0, completedTours: 105 },
    { id: "5",  name: "Đoàn Thúy Quyên",           code: "HDV005", activeTours: 4, completedTours: 33 },
    { id: "6",  name: "Đỗ Thị Hồng Nhung",       code: "HDV006", activeTours: 2, completedTours: 81 },
    { id: "7",  name: "Hoàng Minh Tuấn",         code: "HDV007", activeTours: 1, completedTours: 59 },
    { id: "8",  name: "Bùi Thu Huyền",           code: "HDV008", activeTours: 0, completedTours: 128 },
    { id: "9",  name: "Đặng Văn Hùng",           code: "HDV009", activeTours: 3, completedTours: 44 },
    { id: "10", name: "Mai Anh Thư",             code: "HDV010", activeTours: 2, completedTours: 76 },
];

type FilterType = "all" | "current" | "completed";

// Kiểu chính xác của Bottom Navigation
type BottomTab = "home" | "itinerary" | "notifications" | "settings" | "companies";

export default function GuidePage() {
    const [filter, setFilter] = useState<FilterType>("all");
    const [search, setSearch] = useState("");

    const activeTab = "home" as BottomTab;
    const setActiveTab = () => {};

    const filteredGuides = mockGuides.filter((guide) => {
        const matchesSearch =
            guide.name.toLowerCase().includes(search.toLowerCase()) ||
            guide.code.toLowerCase().includes(search.toLowerCase());

        if (filter === "all") return matchesSearch;
        if (filter === "current") return matchesSearch && guide.activeTours > 0;
        if (filter === "completed") return matchesSearch && guide.completedTours > 0;
        return matchesSearch;
    });

    const clearSearch = () => setSearch("");

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900">Hướng dẫn viên</h1>
                    <p className="mt-2 text-gray-600">Quản lý đội ngũ • Theo dõi hoạt động tour</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 pb-24">
                {/* Filter */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                    {[
                        { key: "all" as const, label: "Tất cả", count: mockGuides.length },
                        { key: "current" as const, label: "Đang dẫn tour", count: mockGuides.filter(g => g.activeTours > 0).length },
                        { key: "completed" as const, label: "Đã từng dẫn", count: mockGuides.filter(g => g.completedTours > 0).length },
                    ].map((item) => (
                        <button
                            key={item.key}
                            onClick={() => setFilter(item.key)}
                            className={`px-6 py-3 rounded-full font-medium text-sm transition-all flex items-center gap-2 shadow-sm ${
                                filter === item.key
                                    ? "bg-blue-600 text-white shadow-blue-600/20"
                                    : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                            }`}
                        >
                            {item.label}
                            <span className="font-bold text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {item.count}
              </span>
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative mb-10">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm tên hoặc mã HDV..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow"
                    />
                    {search && (
                        <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2">
                            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        </button>
                    )}
                </div>

                {/* Results */}
                {filteredGuides.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-28 h-28 mx-auto mb-6 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <Search className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700">Không tìm thấy HDV</h3>
                        <p className="mt-2 text-gray-500">
                            {search ? `Không có kết quả cho "${search}"` : "Thử thay đổi bộ lọc"}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredGuides.map((guide) => (
                            <GuideSection key={guide.id} guide={guide} />
                        ))}
                    </div>
                )}
            </div>

            <Navigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                unreadCount={3}
            />
        </div>
    );
}