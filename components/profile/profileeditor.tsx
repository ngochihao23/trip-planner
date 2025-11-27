"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { UserProfile } from "@/app/types";

interface ProfileEditorProps {
    profile: UserProfile;
    onSave: (data: UserProfile) => void;
}

export default function ProfileEditor({ profile, onSave }: ProfileEditorProps) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<UserProfile>(profile);

    const handleChange = (key: keyof UserProfile, value: string) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };

    const handleAvatarChange = (file: File) => {
        const preview = URL.createObjectURL(file);

        setData(prev => ({
            ...prev,
            avatar: preview,
            avatarFile: file
        }));
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="w-full py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
                Chỉnh sửa hồ sơ
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    className="max-w-lg bg-white border border-gray-200 shadow-lg rounded-xl"
                >
                    <DialogHeader>
                        <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col items-center gap-3 mt-2">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={data.avatar} alt="avatar" />
                            <AvatarFallback className="text-xl font-semibold">
                                {data.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <input
                            type="file"
                            accept="image/*"
                            className="text-sm"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleAvatarChange(file);
                            }}
                        />
                    </div>

                    <div className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Họ và tên</label>
                            <Input
                                value={data.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                            <Input
                                value={data.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Giới thiệu</label>
                            <Textarea
                                rows={4}
                                value={data.bio}
                                onChange={(e) => handleChange("bio", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button
                            onClick={() => {
                                onSave(data);
                                setOpen(false);
                            }}
                        >
                            Lưu thay đổi
                        </Button>

                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
