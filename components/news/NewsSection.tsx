import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const news = [
    {
        id: 1,
        slug: "flash-sale-da-lat-2025",
        title: "🔥 Flash Sale Tour Đà Lạt giảm 40% – Chỉ trong tháng này!",
        desc: "Ưu đãi khủng dành cho mùa du lịch cuối năm, số lượng có hạn.",
        image: "/images/da-lat.jpg",
    },
    {
        id: 2,
        slug: "meo-san-ve-may-bay-gia-re",
        title: "Mẹo săn vé máy bay giá rẻ 2025",
        desc: "Hướng dẫn A-Z để đặt vé rẻ mùa cao điểm.",
        image: "/images/plantip.jpg",
    },
    {
        id: 3,
        slug: "review-phu-quoc-2025",
        title: "Review Phú Quốc 2025 – Có gì mới?",
        desc: "Tổng hợp điểm check-in, ăn uống và lịch trình chuẩn nhất.",
        image: "/images/phu-quoc.jpg",
    },
];

export default function NewsSection() {
    return (
        <section className="px-5 py-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Tin tức du lịch</h2>

                <Link
                    href="/news"
                    className="text-blue-600 font-medium flex items-center gap-1 hover:underline"
                >
                    Xem tất cả
                    <ArrowRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {news.map((item) => (
                    <Link
                        key={item.id}
                        href={`/news/${item.slug}`}
                        className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                    >
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={600}
                            height={400}
                            className="w-full h-48 object-cover"
                        />

                        <div className="p-4">
                            <h3 className="font-semibold text-lg line-clamp-2">
                                {item.title}
                            </h3>

                            <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                                {item.desc}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
