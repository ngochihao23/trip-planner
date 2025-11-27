import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Star, Ticket, X } from 'lucide-react';
import Image from "next/image";


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
        name: 'Phố cổ Hội An - Đèn lồng lung linh',
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
        image: '/images/cap.jpg',
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
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                        className="fixed inset-x-0 bottom-0 top-16 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-3xl md:max-h-[88vh] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden z-50 flex flex-col"
                    >
                        <header className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 px-5 py-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-black text-gray-900">Vé tham quan</h2>
                                <p className="text-xs text-gray-500 mt-0.5">Ưu đãi hôm nay</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                                <X className="w-6 h-6" />
                            </button>
                        </header>

                        <div className="flex-1 overflow-y-auto px-4 py-4">
                            <div className="space-y-4">
                                {attractions.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        whileTap={{ scale: 0.98 }}
                                        className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
                                    >
                                        <div className="flex flex-col sm:flex-row">
                                            <div className="relative w-full sm:w-44 h-48 sm:h-auto overflow-hidden">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    sizes="100vw"
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />

                                                {item.originalPrice && (
                                                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                                        -{Math.round(100 - (parseInt(item.price.replace(/\D/g, '')) / parseInt(item.originalPrice.replace(/\D/g, '')) * 100))}%
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 p-4 flex flex-col justify-between min-h-0">
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{item.name}</h3>

                                                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                                {item.location}
                            </span>
                                                        <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                                                            {item.openTime}
                            </span>
                                                    </div>

                                                    <div className="flex items-center gap-2 mt-2">
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                                                            ))}
                                                        </div>
                                                        <span className="text-sm font-bold">{item.rating}</span>
                                                        <span className="text-xs text-gray-500">• {item.sold}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-end justify-between mt-4 pt-3 border-t border-gray-100">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-2xl font-black text-[#0B6EFD]">{item.price}</span>
                                                            {item.originalPrice && (
                                                                <span className="text-sm text-gray-400 line-through">{item.originalPrice}</span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-500">/người</p>
                                                    </div>

                                                    <button className="bg-gradient-to-r from-[#0B6EFD] to-[#2563EB] hover:from-[#0654C6] hover:to-[#1D4ED8] text-white px-7 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2">
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