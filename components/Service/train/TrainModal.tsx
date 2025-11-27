import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Train, MapPin, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TrainModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TrainModal({ isOpen, onClose }: TrainModalProps) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const routes = [
        { route: 'Hà Nội → Sài Gòn', duration: '32h', price: '1.200.000đ', type: 'Giường nằm điều hòa' },
        { route: 'Đà Nẵng → Huế', duration: '2h30', price: '250.000đ', type: 'Ghế mềm điều hòa' },
        { route: 'Sapa → Hà Nội', duration: '8h', price: '650.000đ', type: 'Giường nằm cao cấp' },
        { route: 'Nha Trang → Sài Gòn', duration: '7h30', price: '780.000đ', type: 'Ghế mềm điều hòa' },
    ];

    const mobileVariants = { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };
    const desktopVariants = { initial: { scale: 0.94, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.94, opacity: 0 } };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />

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
                                <h2 className="text-xl md:text-2xl font-black text-emerald-600">Vé Tàu Hỏa</h2>
                                <p className="text-xs md:text-sm text-gray-600 mt-0.5">Giá tốt • Chỗ đẹp • Đặt ngay</p>
                            </div>
                            <button onClick={onClose} className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition">
                                <X className="w-5 h-5 text-gray-700" />
                            </button>
                        </header>

                        {/* Danh sách */}
                        <div className="flex-1 overflow-y-auto px-4 py-5 md:px-6 md:py-6">
                            <div className="space-y-4">
                                {routes.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.08 }}
                                        className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
                                    >
                                        <div className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            {/* Thông tin */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg md:text-xl font-bold text-gray-900 truncate flex items-center gap-2">
                                                    <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                                    {item.route}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock className="w-4 h-4" />
                                                        {item.duration}
                                                    </span>
                                                    <span className="hidden sm:inline">•</span>
                                                    <span className="text-emerald-700 font-medium">{item.type}</span>
                                                </div>
                                            </div>

                                            {/* Giá + Nút */}
                                            <div className="flex items-end gap-4">
                                                <div className="text-right">
                                                    <div className="text-2xl md:text-3xl font-black text-emerald-600">
                                                        {item.price}
                                                    </div>
                                                    <p className="text-xs text-gray-500">Đã gồm thuế phí</p>
                                                </div>

                                                <button className="
                                                    bg-gradient-to-r from-emerald-600 to-green-600
                                                    hover:from-emerald-700 hover:to-green-700
                                                    active:scale-95 text-white font-bold
                                                    text-base md:text-lg px-6 py-3.5 rounded-2xl
                                                    shadow-lg hover:shadow-xl transition-all duration-300
                                                    flex items-center gap-2 whitespace-nowrap
                                                ">
                                                    <Train className="w-5 h-5" />
                                                    Đặt ngay
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                                <p className="text-xs md:text-sm text-gray-600">
                                    Giá thay đổi theo giờ • Còn chỗ đẹp • Đặt ngay để giữ giá tốt!
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}