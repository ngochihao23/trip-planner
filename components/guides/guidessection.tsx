"use client";

import { CheckCircle, Calendar } from "lucide-react";

interface Guide {
    id: string;
    name: string;
    code: string;
    activeTours: number;
    completedTours: number;
}

interface GuideSectionProps {
    guide: Guide;
}

export default function GuideSection({ guide }: GuideSectionProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-3 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700">
                    {guide.name.charAt(0)}
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{guide.name}</h3>
                    <p className="text-sm text-gray-500">{guide.code}</p>
                </div>
            </div>

            <div className="flex justify-between mt-2">
                <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-700">{guide.activeTours} tour hiện tại</span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700">{guide.completedTours} tour đã dẫn</span>
                </div>
            </div>

            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition">
                Xem chi tiết
            </button>
        </div>
    );
}
