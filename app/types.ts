export interface Booking {
    id: string;
    tourName: string;
    date: string;
    qrCode: string;
    status: 'upcoming' | 'completed' | 'cancelled';
    itinerary: ItineraryItem[];
}

export interface ItineraryItem {
    id: string;
    time: string;
    location: string;
    description: string;
    image: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: 'booking' | 'payment' | 'review' | 'cancellation';
}

export interface UserProfile {
    name: string;
    email: string;
    phone: string;
    bio: string;
    avatar: string;
    avatarFile?: File;
}