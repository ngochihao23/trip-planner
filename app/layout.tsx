import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
    title: 'Du Lịch Việt Nam - Khám phá vẻ đẹp non nước',
    description: 'Ứng dụng đặt tour du lịch hàng đầu Việt Nam. Vé tham quan, vé tàu, vé máy bay, khách sạn và nhiều hơn nữa.',
    keywords: 'du lịch việt nam, tour, vé tham quan, khách sạn, vé máy bay',
    authors: [{ name: 'Du Lịch Việt Nam' }],
    openGraph: {
        title: 'Du Lịch Việt Nam',
        description: 'Khám phá vẻ đẹp non nước Việt Nam',
        type: 'website',
        locale: 'vi_VN',
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi" suppressHydrationWarning>
        <body className={inter.className}>
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}