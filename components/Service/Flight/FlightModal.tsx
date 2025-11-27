import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Clock, ArrowRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FlightModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FlightModal({ isOpen, onClose }: FlightModalProps) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const flights = [
        { from: "SGN", to: "HAN", city: "TP.HCM → Hà Nội", airline: "Vietnam Airlines", time: "2h 05m", price: "799.000đ" },
        { from: "DAD", to: "PQC", city: "Đà Nẵng → Phú Quốc", airline: "Vietjet Air", time: "1h 45m", price: "699.000đ" },
        { from: "HAN", to: "CXR", city: "Hà Nội → Nha Trang", airline: "Bamboo Airways", time: "1h 50m", price: "899.000đ" },
        { from: "SGN", to: "DAD", city: "TP.HCM → Đà Nẵng", airline: "Vietravel Airlines", time: "1h 25m", price: "599.000đ" },
    ];

    const mobileVariants = { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };
    const desktopVariants = { initial: { scale: 0.94, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.94, opacity: 0 } };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                    />

                    {/* Modal chính */}
                    <motion.div
                        variants={isDesktop ? desktopVariants : mobileVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ type: "spring", damping: 35, stiffness: 400 }}
                        className="
                            fixed inset-x-0 bottom-0 max-h-[90vh] rounded-t-3xl
                            md:fixed md:inset-0 md:m-auto
                            md:max-w-4xl md:max-h-[88vh] md:rounded-3xl
                            bg-white shadow-2xl z-50 flex flex-col overflow-hidden
                        "
                    >
                        {/* Header */}
                        <header className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 px-5 py-4 md:px-7 md:py-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl md:text-2xl font-black text-blue-600">Vé Máy Bay Giá Tốt</h2>
                                <p className="text-xs md:text-sm text-gray-600 mt-0.5">Bay thẳng • Giá rẻ nhất hôm nay</p>
                            </div>
                            <button onClick={onClose} className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition">
                                <X className="w-5 h-5 text-gray-700" />
                            </button>
                        </header>

                        {/* Danh sách chuyến bay */}
                        <div className="flex-1 overflow-y-auto px-4 py-5 md:px-6 md:py-6">
                            <div className="space-y-4">
                                {flights.map((flight, i) => (
                                    <motion.div
                                        key={flight.from + flight.to}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        className="group bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
                                    >
                                        <div className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            {/* LEFT */}
                                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                                <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
                                                    <Plane className="w-7 h-7 text-white" />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 truncate">
                                                        {flight.city}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600">
                                                        <span className="bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-lg">
                                                            {flight.airline}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" /> {flight.time}
                                                        </span>
                                                        <span className="bg-green-100 text-green-700 font-medium px-2 py-1 rounded-md text-xs">
                                                            Bay thẳng
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* RIGHT */}
                                            <div className="flex items-end gap-5">
                                                <div className="text-right">
                                                    <div className="text-2xl md:text-3xl font-black text-red-600">
                                                        Từ {flight.price}
                                                    </div>
                                                    <p className="text-xs text-gray-500">Đã gồm thuế phí</p>
                                                </div>

                                                <button className="
                                                    relative overflow-hidden
                                                    bg-gradient-to-r from-red-600 to-rose-600
                                                    hover:from-red-700 hover:to-rose-700
                                                    active:scale-95 text-white font-bold
                                                    text-base md:text-lg px-6 py-3.5 rounded-2xl
                                                    shadow-lg hover:shadow-red-500/40
                                                    transition-all duration-300
                                                    flex items-center gap-2 whitespace-nowrap
                                                ">
                                                    <span className="relative z-10">Chọn chuyến</span>
                                                    <ArrowRight className="w-5 h-5 relative z-10" />
                                                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer khuyến mãi */}
                            <div className="mt-6 p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 text-center">
                                <p className="text-amber-900 font-bold text-sm md:text-base">
                                    Giảm thêm tới <span className="text-red-600 text-xl">300.000đ</span> khi thanh toán Momo / VNPay / Thẻ tín dụng
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}