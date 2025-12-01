import { motion, AnimatePresence } from 'framer-motion';
import { Bed, MapPin, Star, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface HotelModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const hotels = [
    {
        name: "Vinpearl Resort & Spa Nha Trang",
        price: "1.850.000đ",
        desc: "5 sao • Hồ bơi vô cực • Biển riêng",
        rating: 4.9,
        location: "Nha Trang",
        image: "/images/ks1.jpg",
    },
    {
        name: "InterContinental Phu Quoc Long Beach",
        price: "3.200.000đ",
        desc: "5 sao • Private Beach • Villa trên nước",
        rating: 4.9,
        location: "Phú Quốc",
        image: "/images/ks22.jpg",
    },
    {
        name: "FLC Luxury Resort Sầm Sơn",
        price: "1.650.000đ",
        desc: "5 sao • Sân golf • View biển",
        rating: 4.7,
        location: "Thanh Hóa",
        image: "/images/ks3.jpg",
    },
];

export default function HotelModal({ isOpen, onClose }: HotelModalProps) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const mobileVariants = { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };
    const desktopVariants = { initial: { scale: 0.95, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.95, opacity: 0 } };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                    />

                    <motion.div
                        variants={isDesktop ? desktopVariants : mobileVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        className="
              fixed inset-x-0 bottom-0 max-h-[90vh] rounded-t-3xl bg-white shadow-2xl z-50 flex flex-col
              md:fixed md:inset-0 md:m-auto md:max-w-4xl md:max-h-[90vh] md:rounded-3xl
            "
                    >
                        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-gray-100 px-5 py-4 md:px-8 md:py-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl md:text-2xl font-black text-purple-600">Khách Sạn & Resort</h2>
                                <p className="text-xs md:text-sm text-gray-600 mt-1">Ưu đãi cực sốc • Giảm tới 60%</p>
                            </div>
                            <button onClick={onClose} className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition">
                                <X className="w-5 h-5 text-gray-700" />
                            </button>
                        </header>

                        <div className="flex-1 overflow-y-auto px-4 py-5 md:px-8 md:py-6">
                            <div className="space-y-6 md:space-y-8">
                                {hotels.map((hotel, i) => (
                                    <motion.div
                                        key={hotel.name}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        whileTap={{ scale: 0.985 }}
                                        className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-purple-200 transition-all duration-300"
                                    >
                                        <div className="relative h-56 md:h-72">
                                            <Image
                                                src={hotel.image}
                                                alt={hotel.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                priority={i < 2}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                            <div className="absolute top-4 left-4 bg-red-500 text-white font-black text-sm px-4 py-2 rounded-full shadow-lg animate-pulse">
                                                -60%
                                            </div>

                                            <div className="absolute bottom-4 left-4 text-white">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, idx) => (
                                                            <Star
                                                                key={idx}
                                                                className={`w-5 h-5 ${idx < Math.floor(hotel.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="font-bold text-lg">{hotel.rating}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    <MapPin className="w-4 h-4" />
                                                    <span className="text-sm font-medium">{hotel.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-5 md:p-7">
                                            <h3 className="text-lg md:text-2xl font-black text-gray-900 line-clamp-2">
                                                {hotel.name}
                                            </h3>
                                            <p className="text-sm md:text-base text-gray-600 mt-2 font-medium">
                                                {hotel.desc}
                                            </p>

                                            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col md:flex-row md:items-end justify-between gap-5">
                                                <div>
                                                    <p className="text-xs md:text-sm text-gray-500">Chỉ từ</p>
                                                    <div className="text-2xl md:text-4xl font-black text-purple-600 leading-tight">
                                                        {hotel.price}
                                                    </div>
                                                    <p className="text-xs md:text-sm text-gray-500 mt-1">/đêm • Đã bao gồm thuế phí</p>
                                                </div>

                                                <button className="
                          relative overflow-hidden
                          bg-gradient-to-r from-purple-600 to-indigo-600
                          hover:from-purple-700 hover:to-indigo-700
                          text-white font-black
                          text-sm md:text-lg px-7 py-3.5 md:px-9 md:py-4
                          rounded-2xl shadow-xl hover:shadow-purple-500/50
                          transition-all duration-300 hover:scale-105 active:scale-95
                          flex items-center justify-center gap-3 whitespace-nowrap
                        ">
                                                    <Bed className="w-5 h-5 md:w-6 md:h-6" />
                                                    <span className="relative z-10">Đặt ngay</span>
                                                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 md:mt-10 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 text-center">
                                <p className="text-purple-900 font-bold text-sm md:text-base">
                                    Miễn phí hủy phòng • Đặt trước trả sau • Tích điểm đổi quà
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}