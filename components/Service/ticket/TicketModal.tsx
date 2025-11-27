// src/components/Tickets/TicketModal.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, MapPin, Clock, Users, Ticket, X, ChevronRight } from 'lucide-react';

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
    {
        id: '1',
        name: 'Vịnh Hạ Long - Di sản UNESCO',
        location: 'Quảng Ninh',
        price: '290.000đ',
        originalPrice: '450.000đ',
        rating: 4.9,
        sold: '12.5k+',
        image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800',
        openTime: '07:00 - 18:00',
    },
    {
        id: '2',
        name: 'Phố cổ Hội An',
        location: 'Quảng Nam',
        price: '120.000đ',
        originalPrice: '200.000đ',
        rating: 4.8,
        sold: '8.2k+',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
        openTime: 'Toàn thời gian',
    },
    {
        id: '3',
        name: 'Fansipan Legend - Cáp treo',
        location: 'Lào Cai',
        price: '850.000đ',
        rating: 4.7,
        sold: '5.6k+',
        image: 'https://images.unsplash.com/photo-1540979388269-2aed1643e0d0?w=800',
        openTime: '07:30 - 17:00',
    },
    {
        id: '4',
        name: 'VinWonders Phú Quốc',
        location: 'Kiên Giang',
        price: '950.000đ',
        originalPrice: '1.200.000đ',
        rating: 4.8,
        sold: '15k+',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
        openTime: '09:00 - 20:00',
    },
];

interface TicketModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TicketModal({ isOpen, onClose }: TicketModalProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal - fullscreen trên mobile, center trên tablet+ */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                        className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[90vh] overflow-hidden
                       md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
                       md:w-full md:max-w-2xl md:rounded-3xl"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[#0f172a]">Vé tham quan</h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl hover:bg-gray-100 transition"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Danh sách */}
                        <div className="overflow-y-auto max-h-[calc(90vh-80px)] pb-8">
                            <div className="px-4 pt-4">
                                {attractions.map((attraction) => (
                                    <motion.div
                                        key={attraction.id}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedId(attraction.id)}
                                        className="bg-white rounded-2xl shadow-md overflow-hidden mb-4 border border-gray-100 cursor-pointer"
                                    >
                                        <div className="flex">
                                            <div className="w-32 h-32 flex-shrink-0">
                                                <img
                                                    src={attraction.image}
                                                    alt={attraction.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                {attraction.originalPrice && (
                                                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                        -35%
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 p-4">
                                                <h3 className="font-bold text-[#0f172a] line-clamp-2">
                                                    {attraction.name}
                                                </h3>
                                                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {attraction.location}
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {attraction.openTime}
                                                </div>

                                                <div className="flex items-end justify-between mt-4">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-[#0B6EFD]">
                                {attraction.price}
                              </span>
                                                            {attraction.originalPrice && (
                                                                <span className="text-sm text-gray-400 line-through">
                                  {attraction.originalPrice}
                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                                            <Users className="w-4 h-4" />
                                                            {attraction.sold} đã mua
                                                        </div>
                                                    </div>

                                                    <button className="bg-[#0B6EFD] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#0654C6] transition flex items-center gap-2">
                                                        <Ticket className="w-5 h-5" />
                                                        Mua ngay
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