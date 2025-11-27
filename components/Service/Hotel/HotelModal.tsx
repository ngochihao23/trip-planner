import { ModalWrapper } from '../ModalWrapper';
interface HotelModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function HotelModal({ isOpen, onClose }: HotelModalProps) {    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} title="Khách sạn & Resort">
            <div className="grid grid-cols-1 gap-4">
                {['Vinpearl Nha Trang', 'InterContinental Phu Quoc', 'FLC Sầm Sơn'].map((name) => (
                    <div key={name} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 flex gap-4">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24" />
                        <div>
                            <h4 className="font-bold text-lg">{name}</h4>
                            <p className="text-sm text-gray-600">5 sao • Hồ bơi vô cực</p>
                            <p className="text-2xl font-bold text-purple-600 mt-2">Từ 1.850.000đ</p>
                        </div>
                    </div>
                ))}
            </div>
        </ModalWrapper>
    );
}