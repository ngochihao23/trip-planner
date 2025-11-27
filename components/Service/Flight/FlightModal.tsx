import { ModalWrapper } from '../ModalWrapper';
import { Plane, Clock } from 'lucide-react';

interface FlightModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FlightModal({ isOpen, onClose }: FlightModalProps) {
    const flights = [
        { from: 'SGN', to: 'HAN', city: 'TP.HCM → Hà Nội', airline: 'Vietnam Airlines', time: '2h 05m', price: '799.000đ' },
        { from: 'DAD', to: 'PQC', city: 'Đà Nẵng → Phú Quốc', airline: 'Vietjet Air', time: '1h 45m', price: '699.000đ' },
        { from: 'HAN', to: 'CXR', city: 'Hà Nội → Nha Trang', airline: 'Bamboo Airways', time: '1h 50m', price: '899.000đ' },
    ];

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} title="Vé máy bay giá tốt nhất">
            <div className="space-y-4">
                {flights.map((flight) => (
                    <div
                        key={flight.from + flight.to}
                        className="
              bg-gradient-to-r from-blue-50 to-indigo-50
              rounded-2xl p-5 border border-blue-100
              flex flex-col gap-4
              sm:flex-row sm:items-center sm:justify-between
              transition-all hover:shadow-lg hover:from-blue-100 hover:to-indigo-100
            "
                    >
                        {/* Left: Thông tin chuyến bay */}
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="bg-blue-600 p-3 rounded-xl">
                                <Plane className="w-7 h-7 text-white" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lg text-gray-900 truncate">
                                    {flight.city}
                                </h3>
                                <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                                    <span className="font-medium">{flight.airline}</span>
                                    <span className="hidden xs:inline">•</span>
                                    <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                                        {flight.time}
                  </span>
                                    <span className="text-green-600 font-medium">Bay thẳng</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Giá + Nút */}
                        <div className="sm:ml-6">
                            <div className="text-right sm:text-left mb-2 sm:mb-0">
                                <p className="text-2xl font-bold text-red-600">
                                    Từ {flight.price}
                                </p>
                                <p className="text-xs text-gray-500">Đã gồm thuế phí</p>
                            </div>

                            <button
                                className="
                  w-full sm:w-auto
                  bg-red-500 hover:bg-red-600 active:bg-red-700
                  text-white font-bold
                  px-7 py-3.5 rounded-xl text-base
                  transition-all transform hover:scale-105 active:scale-100
                  shadow-lg hover:shadow-red-500/25
                "
                            >
                                Chọn chuyến
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer khuyến mãi */}
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200 text-center">
                <p className="text-amber-800 font-semibold">
                    Giảm thêm tới 300k khi thanh toán qua Momo / VNPay / Thẻ tín dụng
                </p>
            </div>
        </ModalWrapper>
    );
}