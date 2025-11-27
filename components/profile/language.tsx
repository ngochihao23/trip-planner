"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface LanguageSelectorProps {
    open: boolean;
    onClose: () => void;
    language: string;
    onChange: (lang: string) => void;
}

export default function LanguageSelector({
                                             open,
                                             onClose,
                                             language,
                                             onChange,
                                         }: LanguageSelectorProps) {

    const languages = [
        { code: "vi", label: "Tiếng Việt" },
        { code: "en", label: "English" },
        { code: "ko", label: "한국어" },
        { code: "ja", label: "日本語" },
    ];

    return (
        <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-lg bg-white border border-gray-200 shadow-lg rounded-xl">
                <DialogHeader>
                    <DialogTitle>Chọn ngôn ngữ</DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                    {languages.map((item) => (
                        <button
                            key={item.code}
                            onClick={() => {
                                onChange(item.code);
                                onClose();
                            }}
                            className={`w-full p-3 text-left rounded-xl border ${
                                language === item.code ? "bg-green-100 border-green-500" : "border-gray-200"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
