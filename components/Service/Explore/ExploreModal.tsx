import { ModalWrapper } from '../ModalWrapper';
import Image from 'next/image';
import { motion } from "framer-motion";

interface ExploreModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const places = [
    {
        name: "Hạ Long",
        desc: "Kỳ quan thiên nhiên",
        image: "/images/ha-long.png"
    },
    {
        name: "Phong Nha",
        desc: "Thiên đường hang động",
        image: "/images/phong-nha.jpg"
    },
    {
        name: "Phú Quốc",
        desc: "Đảo ngọc Việt Nam",
        image: "/images/phu-quoc.jpg"
    },
    {
        name: "Đà Lạt",
        desc: "Thành phố ngàn hoa",
        image: "/images/da-lat.jpg"
    },
    {
        name: "Hội An",
        desc: "Phố cổ di sản",
        image: "/images/hoi-an.jpg"
    },
    {
        name: "Hà Giang",
        desc: "Cung đường hùng vĩ",
        image: "/images/ha-giang.jpg"
    },
];
export default function ExploreModal({ isOpen, onClose }: ExploreModalProps) {
    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} title="Khám phá Việt Nam">

            <motion.div
                className="space-y-5 max-h-[70vh] overflow-y-auto pr-2"
                layout
            >

            {places.map((p, index) => (
                    <motion.div
                        key={p.name}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.5 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative w-full h-44 rounded-3xl overflow-hidden shadow-lg group"
                    >
                        <motion.div
                            className="absolute inset-0"
                            whileHover={{ scale: 1.15 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Image
                                src={p.image}
                                alt={p.name}
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />
                        </motion.div>

                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />

                        <div className="absolute bottom-4 left-4 text-white drop-shadow-2xl">
                            <h3 className="text-xl font-extrabold">{p.name}</h3>
                            <p className="text-sm opacity-90">{p.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </ModalWrapper>
    );
}
