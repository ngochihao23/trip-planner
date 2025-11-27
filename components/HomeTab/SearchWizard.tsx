// --- IMPORTS --- //
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, X } from 'lucide-react';
import Image from "next/image";

interface TourResult {
    id: string;
    name: string;
    location: string;
    duration: string;
    price: string;
    rating: number;
    image: string;
    people: number;
}
const mockTours: TourResult[] = [
    {
        id: '1',
        name: 'Khám phá Vịnh Hạ Long 2N1Đ',
        location: 'Hạ Long',
        duration: '2 ngày 1 đêm',
        price: '3.990.000đ',
        rating: 4.9,
        image: '/images/ha-long.png',
        people: 12
    },
    {
        id: '2',
        name: 'Hội An - Phố cổ đèn lồng',
        location: 'Hội An',
        duration: '3 ngày 2 đêm',
        price: '4.500.000đ',
        rating: 4.8,
        image: '/images/hoi-an.jpg',
        people: 8
    },
    {
        id: '3',
        name: 'Du lịch Phú Quốc 4N3Đ',
        location: 'Phú Quốc',
        duration: '4 ngày 3 đêm',
        price: '5.990.000đ',
        rating: 4.7,
        image: '/images/phu-quoc.jpg',
        people: 16
    },
    {
        id: '4',
        name: 'Khám phá Đà Lạt mộng mơ',
        location: 'Đà Lạt',
        duration: '3 ngày 2 đêm',
        price: '3.500.000đ',
        rating: 4.8,
        image: '/images/da-lat.jpg',
        people: 10
    },
    {
        id: '5',
        name: 'Tour Hà Giang - Mã Pí Lèng',
        location: 'Hà Giang',
        duration: '3 ngày 2 đêm',
        price: '4.200.000đ',
        rating: 4.9,
        image: '/images/ha-giang.jpg',
        people: 15
    },
    {
        id: '6',
        name: 'Thủ đô Hà Nội 3N2Đ',
        location: 'Hà Nội',
        duration: '3 ngày 2 đêm',
        price: '2.990.000đ',
        rating: 4.6,
        image: '/images/ha-noi.jpg',
        people: 12
    },
    {
        id: '7',
        name: 'Khám phá Sapa - Fansipan',
        location: 'Sapa',
        duration: '3 ngày 2 đêm',
        price: '4.800.000đ',
        rating: 4.8,
        image: '/images/sapa.jpg',
        people: 20
    },
    {
        id: '8',
        name: 'Du lịch Mộc Châu mùa hoa',
        location: 'Mộc Châu',
        duration: '2 ngày 1 đêm',
        price: '2.700.000đ',
        rating: 4.7,
        image: '/images/moc-chau.jpg',
        people: 14
    },
    {
        id: '9',
        name: 'Khám Phá Tam Đảo',
        location: 'Tam Đảo',
        duration: '2 ngày 1 đêm',
        price: '2.600.000đ',
        rating: 4.6,
        image: '/images/tam-dao.jpg',
        people: 10
    },
    {
        id: '10',
        name: 'Chinh phục đảo Cô Tô',
        location: 'Cô Tô',
        duration: '2 ngày 1 đêm',
        price: '2.800.000đ',
        rating: 4.6,
        image: '/images/co-to.jpg',
        people: 8
    },
    {
        id: '12',
        name: 'Du Thuyền Vịnh Lan Hạ',
        location: 'Cát Bà',
        duration: '2 ngày 1 đêm',
        price: '3.100.000đ',
        rating: 4.7,
        image: '/images/catba.jpg',
        people: 18
    },

    // ===== MIỀN TRUNG =====
    {
        id: '13',
        name: 'Huế - Đà Nẵng - Hội An',
        location: 'Đà Nẵng',
        duration: '4 ngày 3 đêm',
        price: '5.100.000đ',
        rating: 4.7,
        image: '/images/danang.jpg',
        people: 14
    },
    {
        id: '14',
        name: 'Kinh thành Huế cổ kính',
        location: 'Huế',
        duration: '3 ngày 2 đêm',
        price: '3.900.000đ',
        rating: 4.8,
        image: '/images/hue.jpg',
        people: 16
    },
    {
        id: '16',
        name: 'Du lịch Thanh Hóa – Sầm Sơn',
        location: 'Thanh Hóa',
        duration: '2 ngày 1 đêm',
        price: '2.200.000đ',
        rating: 4.5,
        image: '/images/samson.jpg',
        people: 25
    },
    {
        id: '17',
        name: 'Khám phá Nghệ An – Cửa Lò',
        location: 'Nghệ An',
        duration: '2 ngày 1 đêm',
        price: '2.400.000đ',
        rating: 4.5,
        image: '/images/cualo.jpg',
        people: 30
    },
    {
        id: '18',
        name: 'Phượt đèo Hải Vân – Lăng Cô',
        location: 'Lăng Cô',
        duration: '1 ngày',
        price: '1.500.000đ',
        rating: 4.8,
        image: '/images/lango.jpg',
        people: 15
    },
    {
        id: '19',
        name: 'Tour Cù Lao Chàm',
        location: 'Quảng Nam',
        duration: '1 ngày',
        price: '1.300.000đ',
        rating: 4.7,
        image: '/images/culaoham.jpg',
        people: 28
    },
    {
        id: '20',
        name: 'Phong Nha - Kẻ Bàng khám phá động',
        location: 'Quảng Bình',
        duration: '3 ngày 2 đêm',
        price: '4.800.000đ',
        rating: 4.9,
        image: '/images/phongnha.jpg',
        people: 12
    },
    {
        id: '21',
        name: 'Nha Trang biển xanh cát trắng',
        location: 'Nha Trang',
        duration: '3 ngày 2 đêm',
        price: '4.300.000đ',
        rating: 4.7,
        image: '/images/nha-trang.jpg',
        people: 18
    },
    {
        id: '22',
        name: 'Du lịch Bình Định cổ kính',
        location: 'Bình Định',
        duration: '3 ngày 2 đêm',
        price: '4.200.000đ',
        rating: 4.6,
        image: '/images/binhdinh.jpg',
        people: 16
    },
    {
        id: '23',
        name: 'Tour Tuy Hòa – Gành Đá Đĩa',
        location: 'Phú Yên',
        duration: '2 ngày 1 đêm',
        price: '3.100.000đ',
        rating: 4.8,
        image: '/images/phuyen.jpg',
        people: 14
    },
    {
        id: '24',
        name: 'Du lịch Buôn Mê Thuột',
        location: 'Đắk Lắk',
        duration: '3 ngày 2 đêm',
        price: '4.700.000đ',
        rating: 4.7,
        image: '/images/bmt.jpg',
        people: 20
    },

    // ===== MIỀN NAM =====
    {
        id: '25',
        name: 'Khám phá Sài Gòn năng động',
        location: 'TP. Hồ Chí Minh',
        duration: '3 ngày 2 đêm',
        price: '3.200.000đ',
        rating: 4.6,
        image: '/images/saigon.jpg',
        people: 22
    },
    {
        id: '26',
        name: 'Cần Thơ – Chợ nổi Cái Răng',
        location: 'Cần Thơ',
        duration: '2 ngày 1 đêm',
        price: '2.300.000đ',
        rating: 4.7,
        image: '/images/cantho.jpg',
        people: 18
    },
    {
        id: '27',
        name: 'Tour Vũng Tàu biển đẹp',
        location: 'Vũng Tàu',
        duration: '2 ngày 1 đêm',
        price: '2.400.000đ',
        rating: 4.6,
        image: '/images/vungtau.jpg',
        people: 25
    },
    {
        id: '28',
        name: 'Khám phá Phan Thiết – Mũi Né',
        location: 'Mũi Né',
        duration: '2 ngày 1 đêm',
        price: '2.700.000đ',
        rating: 4.7,
        image: '/images/muine.jpg',
        people: 14
    },
    {
        id: '29',
        name: 'Đảo Nam Du hoang sơ',
        location: 'Kiên Giang',
        duration: '3 ngày 2 đêm',
        price: '3.900.000đ',
        rating: 4.8,
        image: '/images/namdu.jpg',
        people: 12
    },
    {
        id: '30',
        name: 'Miền Tây sông nước 2N1Đ',
        location: 'Bến Tre',
        duration: '2 ngày 1 đêm',
        price: '2.200.000đ',
        rating: 4.7,
        image: '/images/bentre.jpg',
        people: 20
    },
    {
        id: '31',
        name: 'Tour An Giang – Núi Sam – Châu Đốc',
        location: 'An Giang',
        duration: '2 ngày 1 đêm',
        price: '2.600.000đ',
        rating: 4.6,
        image: '/images/angiang.jpg',
        people: 16
    },
    {
        id: '32',
        name: 'Du lịch Côn Đảo linh thiêng',
        location: 'Côn Đảo',
        duration: '3 ngày 2 đêm',
        price: '5.200.000đ',
        rating: 4.8,
        image: '/images/condao.jpg',
        people: 10
    },
    {
        id: '33',
        name: 'Khám phá Tây Ninh – Núi Bà Đen',
        location: 'Tây Ninh',
        duration: '1 ngày',
        price: '1.100.000đ',
        rating: 4.7,
        image: '/images/tayninh.jpg',
        people: 30
    },
    {
        id: '34',
        name: 'Long An – Làng nổi Tân Lập',
        location: 'Long An',
        duration: '1 ngày',
        price: '950.000đ',
        rating: 4.5,
        image: '/images/longan.jpg',
        people: 25
    },
    {
        id: '35',
        name: 'Tour Bình Thuận – Biển Đồi Dương',
        location: 'Bình Thuận',
        duration: '2 ngày 1 đêm',
        price: '2.500.000đ',
        rating: 4.6,
        image: '/images/binhthuan.jpg',
        people: 18
    },
    {
        id: '36',
        name: 'Khám phá Đồng Tháp – Tràm Chim',
        location: 'Đồng Tháp',
        duration: '2 ngày 1 đêm',
        price: '2.200.000đ',
        rating: 4.7,
        image: '/images/dongthap.jpg',
        people: 20
    },
];
// --- COMPONENT --- //
export default function SearchWizard() {
    const [step, setStep] = useState(1);
    const [searching, setSearching] = useState(false);
    const [results, setResults] = useState<TourResult[] | null>(null);

    const [searchData, setSearchData] = useState({
        destination: '',
        date: '',
        budget: '',
    });

    // --- BẮT BUỘC NHẬP ĐỦ MỚI CHO TÌM KIẾM --- //
    const canSearch =
        searchData.destination.trim() !== '' &&
        searchData.date.trim() !== '' &&
        searchData.budget.trim() !== '';

    // --- SEARCH LOGIC --- //
    const handleSearch = () => {
        if (!canSearch) return;

        setSearching(true);

        setTimeout(() => {
            const filtered = mockTours.filter((tour) => {
                const keyword = searchData.destination.toLowerCase();
                return (
                    tour.name.toLowerCase().includes(keyword) ||
                    tour.location.toLowerCase().includes(keyword)
                );
            });

            setResults(filtered);
            setSearching(false);
        }, 1200);
    };

    const resetSearch = () => {
        setResults(null);
        setStep(1);
        setSearchData({ destination: '', date: '', budget: '' });
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-4">

            {/* -------------------------
                STEP HEADER (CHỈ HIỆN KHI CHƯA SEARCH)
            ------------------------- */}
            {!results && (
                <div className="flex gap-2 mb-4">
                    {[1, 2, 3].map((s) => (
                        <button
                            key={s}
                            onClick={() => !searching && setStep(s)}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
                                step === s
                                    ? 'bg-[#0B6EFD] text-white'
                                    : 'bg-[#F7FBFF] text-gray-600'
                            }`}
                        >
                            {s === 1 && 'Địa điểm'}
                            {s === 2 && 'Thời gian'}
                            {s === 3 && 'Giá cả'}
                        </button>
                    ))}
                </div>
            )}

            <AnimatePresence mode="wait">
                {!results && !searching && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {step === 1 && (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Bạn muốn đi đâu?"
                                    value={searchData.destination}
                                    onChange={(e) =>
                                        setSearchData({ ...searchData, destination: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B6EFD]"
                                />
                                <button
                                    onClick={() => setStep(2)}
                                    disabled={!searchData.destination}
                                    className="w-full bg-[#0B6EFD] text-white py-3 rounded-lg font-medium disabled:bg-gray-300"
                                >
                                    Tiếp theo
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <input
                                    type="date"
                                    value={searchData.date}
                                    min={new Date().toISOString().split("T")[0]}   // ⬅️ NGĂN CHỌN NGÀY TRƯỚC HÔM NAY
                                    onChange={(e) =>
                                        setSearchData({ ...searchData, date: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B6EFD]"
                                />

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="flex-1 border py-3 rounded-lg"
                                    >
                                        Quay lại
                                    </button>

                                    <button
                                        onClick={() => setStep(3)}
                                        disabled={!searchData.date}
                                        className="flex-1 bg-[#0B6EFD] text-white py-3 rounded-lg disabled:bg-gray-300"
                                    >
                                        Tiếp theo
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3 - GIÁ */}
                        {step === 3 && (
                            <div className="space-y-4">
                                <select
                                    value={searchData.budget}
                                    onChange={(e) =>
                                        setSearchData({ ...searchData, budget: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border rounded-lg"
                                >
                                    <option value="">Chọn mức giá</option>
                                    <option>Dưới 2 triệu</option>
                                    <option>2-5 triệu</option>
                                    <option>5-10 triệu</option>
                                    <option>Trên 10 triệu</option>
                                </select>

                                <button
                                    onClick={handleSearch}
                                    disabled={!canSearch}
                                    className="w-full bg-[#0B6EFD] text-white py-3 rounded-lg font-medium disabled:bg-gray-300 flex items-center justify-center gap-2"
                                >
                                    <Search className="w-5 h-5" />
                                    Tìm kiếm tour
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* -------------------------
                    LOADING
                ------------------------- */}
                {searching && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-12 text-center"
                    >
                        <div className="animate-spin w-10 h-10 border-4 border-[#0B6EFD] border-t-transparent rounded-full mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">
                            Đang tìm tour phù hợp cho bạn...
                        </p>
                    </motion.div>
                )}

                {/* -------------------------
                    KẾT QUẢ SEARCH
                ------------------------- */}
                {results !== null && !searching && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 -mx-4 sm:mx-0"
                    >
                        <div className="flex items-center justify-between px-4 sm:px-0">
                            <h3 className="text-lg font-bold">
                                {results.length > 0
                                    ? `Tìm thấy ${results.length} tour`
                                    : 'Không tìm thấy tour phù hợp'}
                            </h3>

                            <button
                                onClick={resetSearch}
                                className="text-[#0B6EFD] text-sm font-medium flex items-center gap-1"
                            >
                                <X className="w-4 h-4" /> Tìm lại
                            </button>
                        </div>

                        {/* Không có kết quả */}
                        {results.length === 0 && (
                            <div className="text-center py-12">
                                <div className="bg-gray-100 border-2 border-dashed rounded-2xl w-28 h-28 mx-auto mb-5" />
                                <p className="text-gray-600 font-medium text-lg">
                                    Không có tour phù hợp
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Hãy thử đổi tên địa điểm hoặc mức giá
                                </p>
                            </div>
                        )}

                        {/* Danh sách tour */}
                        <div className="space-y-4 pb-4">
                            {results.map((tour) => (
                                <motion.div
                                    key={tour.id}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg border mx-4 sm:mx-0"
                                >
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="w-full sm:w-40 h-48 sm:h-auto relative">
                                            <Image
                                                src={tour.image}
                                                alt={tour.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="p-5 flex-1">
                                            <h4 className="font-bold text-lg line-clamp-2">
                                                {tour.name}
                                            </h4>

                                            <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-2">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {tour.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {tour.duration}
                                                </span>
                                            </div>

                                            <div className="flex items-end justify-between mt-4">
                                                <div>
                                                    <p className="text-2xl font-bold text-[#0B6EFD]">
                                                        {tour.price}
                                                    </p>
                                                    <p className="text-xs text-gray-500">/khách</p>
                                                </div>

                                                <button className="bg-[#0B6EFD] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0654C6] transition">
                                                    Xem chi tiết
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
