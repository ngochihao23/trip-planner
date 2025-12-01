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
                        transition={{ type: "spring", damping: 32, stiffness: 400 }}
                        className="
              fixed inset-x-0 bottom-0 max-h-[90vh] rounded-t-3xl bg-white shadow-2xl z-50 flex flex-col
              md:fixed md:inset-0 md:m-auto md:max-w-4xl md:max-h-[90vh] md:rounded-3xl
            "
                    >
                        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-gray-100 px-5 py-4 md:px-8 md:py-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl md:text-2xl font-black text-emerald-600">Vé Tàu Hỏa</h2>
                                <p className="text-xs md:text-sm text-gray-600 mt-1">Giá tốt • Chỗ đẹp • Đặt ngay</p>
                            </div>
                            <button onClick={onClose} className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition">
                                <X className="w-5 h-5 text-gray-700" />
                            </button>
                        </header>

                        <div className="flex-1 overflow-y-auto px-4 py-5 md:px-8 md:py-7">
                            <div className="space-y-5">
                                {routes.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 overflow-hidden"
                                    >
                                        <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-3 items-center gap-5">
                                            {/* Thông tin tuyến */}
                                            <div className="md:col-span-1">
                                                <h3 className="text-lg md:text-xl font-black text-gray-900 flex items-center gap-3">
                                                    <MapPin className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                                    <span className="truncate">{item.route}</span>
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="w-4.5 h-4.5 text-gray-500" />
                                                        <span className="font-medium">{item.duration}</span>
                                                    </div>
                                                    <span className="hidden md:inline">•</span>
                                                    <span className="text-emerald-700 font-semibold md:inline">{item.type}</span>
                                                </div>
                                            </div>

                                            {/* Giá */}
                                            <div className="md:col-span-1 flex justify-start md:justify-center">
                                                <div className="text-left md:text-center">
                                                    <div className="text-2xl md:text-3xl font-black text-emerald-600 leading-tight">
                                                        {item.price}
                                                    </div>
                                                    <p className="text-xs md:text-sm text-gray-500 mt-1">Đã gồm thuế phí</p>
                                                </div>
                                            </div>

                                            {/* Nút Đặt ngay - luôn cùng chiều cao và căn đều */}
                                            <div className="md:col-span-1 flex justify-end">
                                                <button className="
                          relative overflow-hidden w-full md:w-auto
                          bg-gradient-to-r from-emerald-600 to-teal-600
                          hover:from-emerald-700 hover:to-teal-700
                          text-white font-black text-sm md:text-base
                          px-8 py-4 rounded-2xl
                          shadow-lg hover:shadow-emerald-500/50
                          transition-all duration-300 hover:scale-105 active:scale-95
                          flex items-center justify-center gap-2.5 whitespace-nowrap
                        ">
                                                    <Train className="w-5 h-5 md:w-6 md:h-6" />
                                                    <span className="relative z-10">Đặt ngay</span>
                                                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 text-center">
                                <p className="text-emerald-900 font-bold text-sm md:text-base">
                                    Giá thay đổi theo giờ • Còn chỗ đẹp • Đặt ngay để giữ giá tốt nhất!
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}