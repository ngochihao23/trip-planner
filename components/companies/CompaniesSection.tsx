"use client";

import Image from "next/image";

interface Company {
    id: string;
    name: string;
    image : string;
    description: string;
    website?: string;
}

const mockCompanies: Company[] = [
    {
        id: "1",
        name: "Công ty Du Lịch Việt",
        image: "/images/vietravel.jpg",
        description: "Chuyên tổ chức tour trong nước và quốc tế, uy tín, chất lượng.",
        website: "https://dulichviet.example.com",
    },
    {
        id: "2",
        name: "Saigon Travel",
        image: "/images/sg-travel.jpg",
        description: "Tour khám phá miền Nam, dịch vụ chuyên nghiệp, giá tốt.",
        website: "https://saigontravel.example.com",
    },
    {
        id: "3",
        name: "Hanoi Explorer",
        image: "/images/hanoi-travel.png",
        description: "Khám phá thủ đô và miền Bắc với các gói tour độc đáo.",
        website: "https://hanoiexplorer.example.com",
    },
];

export default function CompaniesSection() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCompanies.map((company) => (
                <div
                    key={company.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
                >
                    <div className="relative w-full h-40">
                        <Image
                            src={company.image}
                            alt={company.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-4 flex flex-col gap-2">
                        <h3 className="text-lg font-bold text-gray-900">{company.name}</h3>
                        <p className="text-gray-600 text-sm">{company.description}</p>
                        {company.website && (
                            <a
                                href={company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 text-sm text-blue-600 font-medium hover:underline"
                            >
                                Xem chi tiết
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
