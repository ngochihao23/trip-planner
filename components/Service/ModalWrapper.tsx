import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface ModalWrapperProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export function ModalWrapper({ isOpen, onClose, title, children }: ModalWrapperProps) {
    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />

            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                className="
          fixed bottom-0 left-0 right-0
          bg-white rounded-t-3xl
          max-h-[90vh] overflow-y-auto z-50

          /* ← Đây là dòng quan trọng nhất, chỉ sửa đúng 1 chỗ này thôi! */
          w-full
          max-w-md            /* mobile & tablet nhỏ */
          lg:max-w-3xl        /* desktop rộng 768px → đẹp lung linh */
          xl:max-w-4xl        /* màn to hơn thì rộng thêm tí nữa */

          /* Desktop: chuyển thành modal giữa màn hình */
          md:fixed md:inset-auto md:top-1/2 md:left-1/2
          md:-translate-x-1/2 md:-translate-y-1/2
          md:rounded-3xl md:bottom-auto
        "
            >
                <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-xl transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 pb-8">
                    {children}
                </div>
            </motion.div>
        </>
    );
}