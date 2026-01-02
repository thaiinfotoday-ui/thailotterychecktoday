import CheckClient from './CheckClient';

export const metadata = {
    title: "ตรวจหวย - ตรวจสลากกินแบ่งรัฐบาล ตรวจหวยวันนี้ | Thai Lottery Check Tool",
    description: "ตรวจหวย ตรวจสลากกินแบ่งรัฐบาล ตรวจหวยวันนี้ ตรวจสลากกินแบ่ง รางวัลที่1 Check Thai Lottery numbers instantly. Verify all prize categories including First Prize, 3-Up, and 2-Down.",
    keywords: "ตรวจหวย, ตรวจสลากกินแบ่งรัฐบาล, ตรวจหวยวันนี้, ตรวจสลากกินแบ่ง, ตรวจหวยรัฐบาล, รางวัลที่1, check thai lottery, verify lottery ticket, lottery checker",
    openGraph: {
        title: "ตรวจหวย - ตรวจสลากกินแบ่งรัฐบาล ตรวจหวยวันนี้",
        description: "ตรวจหวย ตรวจสลากกินแบ่งรัฐบาล ตรวจหวยวันนี้ ตรวจสลากกินแบ่ง รวดเร็ว แม่นยำ",
        type: "website",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com'}/check`,
    }
};

export default function CheckPage() {
    return <CheckClient />;
}
