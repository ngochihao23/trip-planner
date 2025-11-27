import { ModalWrapper } from "../ModalWrapper";
import { Plane, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface FlightModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FlightModal({ isOpen, onClose }: FlightModalProps) {
    const flights = [
        { from: "SGN", to: "HAN", city: "TP.HCM → Hà Nội", airline: "Vietnam Airlines", time: "2h 05m", price: "799.000đ" },
        { from: "DAD", to: "PQC", city: "Đà Nẵng → Phú Quốc", airline: "Vietjet Air", time: "1h 45m", price: "699.000đ" },
        { from: "HAN", to: "CXR", city: "Hà Nội → Nha Trang", airline: "Bamboo Airways", time: "1h 50m", price: "899.000đ" },
    ];

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} title="Vé máy bay giá tốt nhất">
            <div className="space-y-5">

                {flights.map((flight) => (
                    <motion.div
                        key={flight.from + flight.to}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.015 }}
                        className="
                            bg-white rounded-2xl p-5 shadow-sm border border-gray-100
                            hover:shadow-xl transition-all cursor-pointer
                            flex flex-col sm:flex-row sm:items-center sm:justify-between
                        "
                    >
                        {/* LEFT */}
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="bg-blue-600 p-3 rounded-xl shadow-md">
                                <Plane className="w-7 h-7 text-white" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lg text-gray-900 truncate">
                                    {flight.city}
                                </h3>

                                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 flex-wrap">
                                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md text-xs">
                                        {flight.airline}
                                    </span>

                                    <span className="flex items-center gap-1 text-gray-700">
                                        <Clock className="w-3.5 h-3.5" /> {flight.time}
                                    </span>

                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-xs">
                                        Bay thẳng
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="text-right sm:text-left mt-4 sm:mt-0 sm:ml-6 flex flex-col items-end sm:items-start">
                            <p className="text-2xl font-bold text-red-600">
                                Từ {flight.price}
                            </p>
                            <p className="text-xs text-gray-500 mb-2">Đã gồm thuế phí</p>

                            <button
                                className="
                                    bg-red-500 hover:bg-red-600 active:bg-red-700
                                    text-white font-semibold
                                    px-6 py-3 rounded-xl
                                    flex items-center gap-2
                                    transition-all hover:shadow-lg hover:shadow-red-400/30
                                "
                            >
                                Chọn chuyến
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* FOOTER */}
            <div className="mt-6 p-4 bg-gradient-to-r from-amber-100 to-yellow-50 rounded-xl border border-amber-200 text-center shadow-sm">
                <p className="text-amber-800 font-semibold text-sm">
                    🎉 Giảm thêm tới <span className="text-red-600 font-bold">300.000đ</span> khi thanh toán bằng Momo / VNPay / Thẻ tín dụng
                </p>
            </div>
        </ModalWrapper>
    );
}
