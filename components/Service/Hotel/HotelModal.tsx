import { ModalWrapper } from "../ModalWrapper";
import Image from "next/image";
import { motion } from "framer-motion";

interface HotelModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const hotels = [
    {
        name: "Vinpearl Nha Trang",
        price: "1.850.000đ",
        desc: "5 sao • Hồ bơi vô cực",
        image: "/images/ks1.jpg",
    },
    {
        name: "InterContinental Phu Quoc",
        price: "3.200.000đ",
        desc: "5 sao • Private Beach",
        image: "/images/ks22.jpg",
    },
    {
        name: "FLC Sầm Sơn",
        price: "1.650.000đ",
        desc: "4 sao • View biển",
        image: "/images/ks3.jpg",
    },
];
export default function HotelModal({ isOpen, onClose }: HotelModalProps) {
    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} title="Khách sạn & Resort">
            <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-5">
                {hotels.map((item) => (
                    <motion.div
                        key={item.name}
                        whileTap={{ scale: 0.98 }}
                        className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all hover:shadow-xl"
                    >
                        <div className="relative w-full h-48">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                unoptimized
                                sizes="100vw"
                                priority
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-2xl" />
                            <div className="absolute right-3 bottom-3">
                            </div>
                        </div>

                        <div className="p-4">
                            <h3 className="font-bold text-xl text-gray-900 leading-snug">{item.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{item.desc}</p>

                            <div className="mt-3 flex items-end justify-between">
                                <div>
                                    <p className="text-xs text-gray-500">Giá chỉ từ</p>
                                    <p className="text-2xl font-extrabold text-purple-600 mt-1">{item.price}</p>
                                </div>

                                <button
                                    onClick={() => console.log("Đặt ngay:", item.name)}
                                    className="ml-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-[#0B6EFD] to-[#2563EB] hover:from-[#0654C6] hover:to-[#1D4ED8] shadow"
                                >
                                    Đặt ngay
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </ModalWrapper>
    );
}
