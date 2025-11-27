import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Star, Ticket, X } from 'lucide-react';
import Image from "next/image";
import { useEffect, useState } from "react";

interface Attraction {
    id: string;
    name: string;
    location: string;
    price: string;
    originalPrice?: string;
    rating: number;
    sold: string;
    image: string;
    openTime: string;
}

const attractions: Attraction[] = [
    { id: '1', name: 'Vịnh Hạ Long - Di sản UNESCO', location: 'Quảng Ninh', price: '290.000đ', originalPrice: '450.000đ', rating: 4.9, sold: '12.5k+', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800', openTime: '07:00 - 18:00' },
    { id: '2', name: 'Phố cổ Hội An - Đèn lồng lung linh', location: 'Quảng Nam', price: '120.000đ', originalPrice: '200.000đ', rating: 4.8, sold: '8.2k+', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800', openTime: 'Toàn thời gian' },
    { id: '3', name: 'Fansipan Legend - Cáp treo', location: 'Lào Cai', price: '850.000đ', rating: 4.7, sold: '5.6k+', image: '/images/cap.jpg', openTime: '07:30 - 17:00' },
    { id: '4', name: 'VinWonders Phú Quốc', location: 'Kiên Giang', price: '950.000đ', originalPrice: '1.200.000đ', rating: 4.8, sold: '15k+', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800', openTime: '09:00 - 20:00' },
];

interface TicketModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TicketModal({ isOpen, onClose }: TicketModalProps) {
    const [isDesktop, setIsDesktop] = useState<boolean>(false);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const mobileVariants = { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };
    const desktopVariants = { initial: { scale: 0.92, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.92, opacity: 0 } };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50" />

                    <motion.div
                        variants={isDesktop ? desktopVariants : mobileVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ type: "spring", damping: 32, stiffness: 350, mass: 0.8 }}
                        className="fixed inset-x-0 bottom-0 max-h-[92vh] rounded-t-3xl md:fixed md:inset-0 md:m-auto md:max-w-6xl md:max-h-[92vh] md:rounded-3xl bg-white shadow-3xl z-50 flex flex-col overflow-hidden"
                    >
                        <header className="sticky top-0 bg-white/95 backdrop-blur-2xl border-b border-gray-100 px-5 py-4 md:px-8 md:py-6 flex items-center justify-between z-10">
                            <div>
                                <h2 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-[#0B6EFD] to-[#3B82F6] bg-clip-text text-transparent">Vé Tham Quan Hot</h2>
                                <p className="text-sm md:text-lg text-gray-600 mt-1 font-medium">Ưu đãi cực sốc hôm nay • Giảm tới 50%</p>
                            </div>
                            <button onClick={onClose} className="p-3 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all hover:scale-110">
                                <X className="w-6 h-6 text-gray-700" />
                            </button>
                        </header>

                        <div className="flex-1 overflow-y-auto px-4 py-5 md:px-8 md:py-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 max-w-7xl mx-auto">
                                {attractions.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.6 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
                                    >
                                        <div className="flex flex-col">
                                            <div className="relative w-full h-56 md:h-64 overflow-hidden bg-gray-100">
                                                <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                                {item.originalPrice && (
                                                    <div className="absolute top-4 left-4 bg-gradient-to-br from-red-500 to-rose-600 text-white font-bold text-sm px-4 py-2 rounded-full shadow-lg">
                                                        -{Math.round(100 - (parseInt(item.price.replace(/\D/g, '')) / parseInt(item.originalPrice.replace(/\D/g, '')) * 100))}%
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-5 md:p-6 flex flex-col flex-grow">
                                                <h3 className="text-xl md:text-2xl font-black text-gray-900 line-clamp-2">{item.name}</h3>

                                                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                                                    <span className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-[#0B6EFD]" />
                                                        {item.location}
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-gray-500" />
                                                        {item.openTime}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-3 mt-4">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className={`w-5 h-5 ${i < Math.floor(item.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                                                        ))}
                                                    </div>
                                                    <span className="font-bold text-gray-800">{item.rating}</span>
                                                    <span className="text-sm text-gray-500">• {item.sold} đã bán</span>
                                                </div>

                                                <div className="mt-5 pt-4 border-t border-gray-100 flex items-end justify-between gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-baseline gap-3 flex-wrap">
                                                            <span className="text-3xl md:text-4xl font-black text-[#0B6EFD] whitespace-nowrap">
                                                                {item.price}
                                                            </span>
                                                            {item.originalPrice && (
                                                                <span className="text-lg md:text-xl text-gray-400 line-through whitespace-nowrap">
                                                                    {item.originalPrice}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-500 mt-1">/người lớn • Đã bao gồm thuế phí</p>
                                                    </div>

                                                    <button className="bg-gradient-to-r from-[#0B6EFD] to-[#2563EB] hover:from-[#0B5ED7] hover:to-[#1D4ED8] active:scale-95 text-white px-7 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 whitespace-nowrap">
                                                        <Ticket className="w-6 h-6" />
                                                        MUA NGAY
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}