// NotificationItem.tsx
import { Calendar, CheckCircle, Star, X } from 'lucide-react';
import { Notification } from '@/app/types';
import { motion } from 'framer-motion';

interface NotificationItemProps {
    notif: Notification;
    onClick: () => void;
}

export default function NotificationItem({ notif, onClick }: NotificationItemProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`bg-white rounded-xl p-4 shadow-sm cursor-pointer transition ${!notif.read ? 'border-l-4 border-[#0B6EFD]' : ''}`}
            onClick={onClick}
        >
            <div className="flex gap-3">
                <div className={`p-2 rounded-lg ${
                    notif.type === 'booking' ? 'bg-blue-100' :
                        notif.type === 'payment' ? 'bg-green-100' :
                            notif.type === 'review' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                    {notif.type === 'booking' && <Calendar className="w-5 h-5 text-blue-600" />}
                    {notif.type === 'payment' && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {notif.type === 'review' && <Star className="w-5 h-5 text-yellow-600" />}
                    {notif.type === 'cancellation' && <X className="w-5 h-5 text-red-600" />}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-[#0f172a]">{notif.title}</h3>
                        {!notif.read && <div className="w-2 h-2 bg-[#0B6EFD] rounded-full" />}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                    <p className="text-xs text-gray-400">{notif.time}</p>
                </div>
            </div>
        </motion.div>
    );
}