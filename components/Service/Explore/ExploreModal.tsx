import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ExploreModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const places = [
    { name: "Vịnh Hạ Long", desc: "Kỳ quan thiên nhiên thế giới", image: "/images/ha-long.png" },
    { name: "Phong Nha - Kẻ Bàng", desc: "Thiên đường hang động", image: "/images/phong-nha.jpg" },
    { name: "Phú Quốc", desc: "Đảo ngọc Việt Nam", image: "/images/phu-quoc.jpg" },
    { name: "Đà Lạt", desc: "Thành phố ngàn hoa", image: "/images/da-lat.jpg" },
    { name: "Hội An", desc: "Phố cổ di sản UNESCO", image: "/images/hoi-an.jpg" },
    { name: "Hà Giang", desc: "Cung đường đèo hùng vĩ", image: "/images/ha-giang.jpg" },
];

export default function ExploreModal({ isOpen, onClose }: ExploreModalProps) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal – VIBE XANH DƯƠNG DU LỊCH */}
                    <motion.div
                        variants={isDesktop ? desktopVariants : mobileVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ type: "spring", damping: 35, stiffness: 400 }}
                        className="
                            fixed inset-x-0 bottom-0 max-h-[92vh] rounded-t-3xl
                            md:fixed md:inset-0 md:m-auto
                            md:max-w-4xl md:max-h-[90vh] md:rounded-3xl
                            bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50
                            shadow-2xl z-50 flex flex-col overflow-hidden
                            border border-white/50
                        "
                    >
                        {/* Header – Xanh dương tươi mát */}
                        <header className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg px-5 py-4 md:px-7 md:py-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                    Khám Phá Việt Nam
                                </h2>
                                <p className="text-sm md:text-base text-white/90 mt-1">
                                    63 tỉnh thành – Hàng ngàn điểm đến tuyệt đẹp
                                </p>
                            </div>
                            <button onClick={onClose} className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl backdrop-blur transition">
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </header>

                        {/* Grid ảnh – Siêu đẹp */}
                        <div className="flex-1 overflow-y-auto p-5 md:p-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-7">
                                {places.map((place, i) => (
                                    <motion.div
                                        key={place.name}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1, duration: 0.6 }}
                                        whileHover={{ y: -10 }}
                                        whileTap={{ scale: 0.96 }}
                                        className="group relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-xl cursor-pointer bg-white/80 backdrop-blur-sm border border-white/50"
                                    >
                                        <Image
                                            src={place.image}
                                            alt={place.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                            priority={i < 4}
                                        />

                                        {/* Overlay xanh nhẹ + text trắng */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/30 to-transparent" />

                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                            <h3 className="text-2xl md:text-3xl font-black tracking-tight drop-shadow-2xl">
                                                {place.name}
                                            </h3>
                                            <p className="text-sm md:text-base opacity-95 font-medium mt-1.5 flex items-center gap-2">
                                                <MapPin className="w-5 h-5" />
                                                {place.desc}
                                            </p>
                                        </div>

                                        {/* Viền phát sáng xanh ngọc khi hover */}
                                        <div className="absolute inset-0 rounded-3xl ring-4 ring-transparent group-hover:ring-cyan-400/60 transition-all duration-500 pointer-events-none" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer truyền cảm hứng */}
                            <div className="mt-10 text-center bg-white/70 backdrop-blur rounded-3xl py-6 px-8 shadow-lg">
                                <p className="text-2xl font-bold text-blue-700">
                                    Việt Nam – Đi để yêu!
                                </p>
                                <p className="text-blue-600 mt-3">
                                    Hành trình bắt đầu từ một cú click – Đặt vé ngay hôm nay!
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}