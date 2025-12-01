import Link from "next/link";
import { motion } from 'framer-motion';
import { Newspaper, Building2, Users, ChevronRight } from 'lucide-react';

const utilities = [
    { icon: Newspaper, label: "Tin tức du lịch", desc: "Cập nhật tin mới nhất", href: "/news" },
    { icon: Building2, label: 'Công ty lữ hành', desc: 'Danh sách đối tác uy tín', href: "/companies" },
    { icon: Users, label: 'Hướng dẫn viên', desc: 'Tìm HDV chuyên nghiệp', href: "/guides" },
];

export default function UtilityList() {
    return (
        <>
            <h2 className="text-lg font-bold text-[#0f172a] mb-4">Tiện ích</h2>
            <div className="space-y-3">
                {utilities.map((item, i) => (
                    <Link href={item.href || "#"} key={i}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition flex items-center gap-4"
                        >
                            <div className="bg-[#F7FBFF] p-3 rounded-xl">
                                <item.icon className="w-6 h-6 text-[#0B6EFD]" />
                            </div>
                            <div className="flex-1 text-left">
                                <div className="font-medium text-[#0f172a]">{item.label}</div>
                                <div className="text-sm text-gray-500">{item.desc}</div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </motion.div>
                    </Link>
                ))}
            </div>
        </>
    );
}
