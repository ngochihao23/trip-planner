import { ModalWrapper } from '../ModalWrapper';

interface TrainModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TrainModal({ isOpen, onClose }: TrainModalProps) {
    const routes = [
        { route: 'Hà Nội → Sài Gòn', duration: '28h', price: '1.200.000đ' },
        { route: 'Đà Nẵng → Huế', duration: '2h30', price: '250.000đ' },
        { route: 'Sapa → Hà Nội', duration: '8h', price: '650.000đ' },
    ];

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} title="Vé tàu hỏa">
            <div className="space-y-4">
                {routes.map(({ route, duration, price }) => (
                    <div
                        key={route}
                        className="
              bg-gray-50 rounded-2xl p-5 border border-gray-200
              flex flex-col gap-4
              sm:flex-row sm:items-center sm:justify-between   /* quan trọng */
              transition-all hover:shadow-md hover:bg-gray-100
            "
                    >
                        {/* Thông tin tuyến */}
                        <div className="flex-1 min-w-0"> {/* thêm min-w-0 để tránh tràn text */}
                            <h3 className="font-bold text-lg text-gray-900 truncate">{route}</h3>
                            <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1 shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                    {duration}
                </span>
                                <span className="hidden sm:inline">• Ghế mềm điều hòa</span>
                            </div>
                        </div>

                        {/* Nút giá - ĐÃ FIX HOÀN HẢO */}
                        <div className="sm:ml-6"> {/* tạo khoảng cách cố định trên desktop */}
                            <button
                                className="
                  w-full sm:w-auto                    /* mobile full width, desktop vừa đủ */
                  bg-green-600 hover:bg-green-700 active:bg-green-800
                  text-white font-bold text-base sm:text-lg
                  px-6 py-3.5 rounded-xl
                  transition-all transform hover:scale-105 active:scale-100
                  shadow-md
                "
                            >
                                Từ {price}
                            </button>
                            <p className="text-xs text-gray-500 mt-2 text-center sm:hidden">
                                Ghế mềm điều hòa
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500">
                    Giá có thể thay đổi theo thời điểm • Đặt vé ngay để giữ chỗ tốt nhất
                </p>
            </div>
        </ModalWrapper>
    );
}