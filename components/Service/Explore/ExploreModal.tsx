import { ModalWrapper } from '../ModalWrapper';
interface ExploreModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function ExploreModal({ isOpen, onClose }: ExploreModalProps) {
    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} title="Khám phá Việt Nam">
            <div className="grid grid-cols-2 gap-4">
                {['Hạ Long', 'Phong Nha', 'Phú Quốc', 'Đà Lạt', 'Hội An', 'Hà Giang'].map((place) => (
                    <div key={place} className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-6 text-center">
                        <div className="bg-gray-300 border-2 border-dashed rounded-xl w-20 h-20 mx-auto mb-3" />
                        <p className="font-bold text-lg">{place}</p>
                        <p className="text-sm text-gray-600">Tour hot</p>
                    </div>
                ))}
            </div>
        </ModalWrapper>
    );
}