import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function UserAvatar({ src, name }: { src?: string; name: string }) {
    return (
        <Avatar className="w-10 h-10">
            <AvatarImage src={src} alt={name} />
            <AvatarFallback>
                {name.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
}
