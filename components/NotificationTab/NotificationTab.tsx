"use client"
import { motion } from 'framer-motion';
import NotificationItem from './NotificationItem';
import { Notification } from '@/app/types';

interface NotificationTabProps {
    notifications: Notification[];
    onReadAll: () => void;
    onNotificationClick: (id: string) => void;
}

export default function NotificationTab({ notifications, onReadAll, onNotificationClick }: NotificationTabProps) {
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20 px-4">
            <div className="flex justify-between items-center mb-6 mt-4">
                <h1 className="text-2xl font-bold text-[#0f172a]">Thông báo</h1>
                {unreadCount > 0 && (
                    <button onClick={onReadAll} className="text-sm text-[#0B6EFD] font-medium hover:underline">
                        Đánh dấu đã đọc
                    </button>
                )}
            </div>
            <div className="space-y-3">
                {notifications.map((notif) => (
                    <NotificationItem
                        key={notif.id}
                        notif={notif}
                        onClick={() => onNotificationClick(notif.id)}
                    />
                ))}
            </div>
        </motion.div>
    );
}