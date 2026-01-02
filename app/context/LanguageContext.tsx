'use client';
import { createContext, useContext, useState, useEffect } from 'react';
export const translations = {
    en: {
        title: "Thai Lottery Check Today",
        nav: {
            today: "Today Results",
            latest: "Latest Draw",
            history: "History",
            check: "Check Number"
        },
        home: {
            loading: "Loading latest updates...",
            error: "Unable to load data.",
            retry: "Retry",
            firstPrize: "First Prize Winner",
            front3: "Front 3 Numbers",
            back3: "Back 3 Numbers",
            last2: "Last 2 Numbers",
            popular: "Winning Numbers",
            source: "Source",
            live: "Live Draw",
            heroTitleSuffix: "Results Today",
            heroUpdate: "Thai Lottery Results Today - Updated:",
            heroDesc: "The most reliable source for Thai lottery results today. Check the official Thai lottery winning numbers, see the latest draw updates live, and verify your tickets instantly.",
            checkBtn: "Check Thai Lottery Number",
            howToBtn: "How it Works",
            verified: "Verified Official Source"
        },
        homeContent: {
            aboutTitle: "Official Thai Lottery Results & Information",
            aboutText: [
                "Stay updated with the latest Thai lottery results today. Our platform provides real-time information on the Thai lottery draw announcement, ensuring you get the current Thailand lottery results as soon as they air.",
                "Whether you are looking for specific Thailand lottery today numbers, the Thai national lottery results, or exploring the complete Thailand lottery result history archive, we offer a comprehensive database. We are your trusted source for Thai government lottery results (GLO data) and newly announced Thai lottery winning numbers."
            ],
            scheduleTitle: "Draw Schedule: Today's Thai Lottery Draw",
            scheduleText: "The Thailand lottery draw results are broadcast live twice a month, usually on the 1st and 16th. Tune in between 2:30 PM and 4:00 PM to catch the live Thai lottery numbers today."
        },
        tools: {
            title: "Quick Lottery Tools",
            checkTitle: "Number Checker",
            checkDesc: "Check Thailand lottery results instantly",
            historyTitle: "Results History",
            historyDesc: "View Thai lottery past draw results",
            statsTitle: "Number Stats",
            statsDesc: "Analysis of Thailand lottery numbers",
            howToTitle: "How to Play",
            howToDesc: "Rules & Prizes guide"
        },
        historyDetail: {
            verified: "Official Verified Result",
            title: "Thai Lottery Results",
            allHistory: "All History",
            firstPrize: "First Prize",
            neighbor: "Neighbor",
            front3: "Front 3 Digits",
            back3: "Back 3 Digits",
            last2: "Last 2 Digits",
            draw: "Draw",
            source: "Source: Official GLO",
            breakdownTitle: "Full Prize Breakdown",
            breakdownDesc: "The results for the Thai Government Lottery draw on",
            breakdownDescSuffix: "are officially announced. Below is the detailed list of major winning numbers.",
            secondPrizes: "Second Prizes",
            verifyWarning: "* Please verify your ticket at an official GLO distribution center. This digital list is for informational purposes only.",
            prevDraw: "Previous Draw",
            nextDraw: "Next Draw",
            exploreOld: "Explore Older Results",
            checkNew: "Check Newer Results",
            faqTitle: "Frequently Asked Questions",
            q1: "When is the next draw after",
            a1: "Thai Lottery draws usually occur twice a month, on the 1st and 16th. The next scheduled draw would be approximately 15 days from this date.",
            q2: "How much is the First Prize?",
            a2: "The standard First Prize for the Thai Government Lottery is 6,000,000 Baht per ticket."
        },
        table: {
            title: "Previous Draws",
            date: "Draw Date",
            first: "First Prize",
            last2: "Last 2 Digits",
            action: "Action",
            fullResult: "Full Result"
        },
        latest: {
            title: "Latest Draw Results",
            liveUpdate: "Live Update",
            drawDate: "Draw Date",
            serviceUnavailable: "Service Unavailable",
            returnHome: "Return Home",
            checkTicket: "Check Your Ticket"
        },
        check: {
            title: "Check Number",
            subtitle: "Verify your ticket against",
            subtitleHighlight: "Latest Results",
            placeholder: "Enter 6-digit number",
            checkBtn: "Check Status",
            checkingBtn: "Checking...",
            winTitle: "Status: Match Found",
            winMatch: "Your number matches one or more prize categories:",
            loseTitle: "Status: No Match Found",
            loseDesc: "This number does not match any winning category for the official draw date",
            error: "An error occurred. Please try again.",
            disclaimer: "Enter at least 2 digits to check (Last 2, Front 3, Back 3, or Full 6)."
        },
        statsContent: {
            title: "Thai Lottery Statistical Analysis & Trends",
            intro: "Our **Thai Lottery Statistics** module provides a deep dive into historical data to reveal patterns. While lottery draws are random, analyzing **number frequency** can provide insights into past outcomes.",
            methodologyTitle: "How we analyze the data",
            methodologyText: "We aggregate official **Government Lottery Office (GLO)** results dating back several years. Our algorithms calculate the total frequency of every 2-digit and 3-digit combination to identify 'Hot Numbers' (frequently drawn) and 'Cold Numbers' (rarely drawn).",
            disclaimerTitle: "Understanding Probability",
            disclaimerText: "It is crucial to understand that **past results do not guarantee future outcomes**. Each draw is an independent event. These statistics are provided for **informational and entertainment purposes only**."
        },
        checkContent: {
            guideTitle: "How to Check Thai Lottery Results Online",
            guideSteps: [
                "Enter your **6-digit lottery number** into the search box above.",
                "Click the **Check Status** button to verify against the official GLO database.",
                "Our system instantly scans for **First Prize**, **Last 2 Digits**, **Front 3**, and **Back 3** matches.",
                "View your detailed result status immediately."
            ],
            benefitsTitle: "Why use our Thai Lottery Checker?",
            benefitsText: "We provide the fastest and most secure way to **check Thai government lottery** tickets. Our data is synchronized directly with official announcements, ensuring you never miss a winning number."
        },
        historyPage: {
            title: "Thai Lottery Results History",
            subtitle: "Explore the comprehensive **Thai lottery results archive**. Search **Thai lottery past results**, view **previous Thai lottery draw results**, and check **old Thai lottery results** in our complete database.",
            allYears: "Browse All Years",
            page: "Page",
            noResults: "No Thai lottery past results found for this period.",
            aboutTitle: "About Thailand Lottery Result Archive",
            aboutDesc: "Our database allows you to **browse Thai lottery results** from the past. Whether you need to **view previous Thai lottery results** or check the **Thailand lottery past draw results**, this **Thai lottery results record** is sourced directly from official announcements for accuracy.",
            faqs: [
                { q: "How to check previous Thai lottery results?", a: "You can easily check **previous Thai lottery results** by viewing our yearly archive. Simply select a year to filter the **Thai lottery historical results**." },
                { q: "Where can I find old Thai lottery results?", a: "This page acts as a digital **Thai lottery results archive**, providing access to **old Thai lottery results** and **past Thai lottery draw results** from authorized sources." },
                { q: "Are past Thai lottery results available online?", a: "Yes, all **Thailand lottery result history** data is available here freely for informational verification purposes." }
            ]
        },
        howTo: {
            title: "How to Play & Claim",
            sections: [
                { title: "How to Play", desc: "Thai Lottery tickets are sold in pairs. Each ticket costs 80 Baht (official price). You can verify the authenticity by checking the watermark and paper texture." },
                { title: "Prize Categories", desc: "There are several prize categories including the First Prize (6 million Baht), Front 3 Digits, Back 3 Digits, and Last 2 Digits." },
                { title: "Claiming Prizes", desc: "Prizes under 20,000 Baht can be claimed at authorized retail agents (with a 1-2% deduction). Larger prizes must be claimed at the GLO office in Nonthaburi." }
            ]
        },
        faq: {
            title: "Frequently Asked Questions",
            items: [
                { q: "What time are the results announced?", a: "Results are typically announced around 2:30 PM to 4:00 PM (GMT+7) on the 1st and 16th of every month." },
                { q: "Where can I claim my prize?", a: "Prizes can be claimed at the Government Lottery Office in Nonthaburi, or at authorized banks for smaller amounts." },
                { q: "How do I spot a fake lottery ticket?", a: "Official tickets have a specific watermark and texture. Check for the GLO stamp and verify with authorized sellers." },
                { q: "Is this website official?", a: "No, this is an informational website. We aggregate public data from GLO for easy checking." }
            ]
        },
        footer: {
            aboutTitle: "Thai Lottery Check Today",
            aboutText: "Your fast, reliable, and secure source for the latest Government Lottery Office (GLO) results. We provide real-time updates and historical data checking services.",
            disclaimerTitle: "Important Disclaimer",
            disclaimerText: "This website is for informational purposes only. We do not sell lottery tickets, provide predictions, or facilitate gambling in any form. Information is collected from public sources for reference only.",
            quickLinks: "Quick Links",
            legal: "Legal & Sources",
            privacy: "Privacy Policy",
            terms: "Terms of Service",
            contact: "Contact Us",
            attribution: "Data provided by public news sources: Sanook, Thairath, Kapook.",
            copyright: "Thai Lottery Check Today. All rights reserved.",
            status: "System Status: Operational",
            archive: "Past Results Archive",
            stats: "Number Statistics",
            howTo: "How to Claim Prizes"
        },
        notFound: {
            title: "Page Not Found",
            desc: "Sorry, the page you are looking for doesn't exist or has been moved.",
            homeBtn: "Back to Home",
            checkBtn: "Check Latest Draw"
        }
    },
    th: {
        title: "ผลสลากกินแบ่งรัฐบาล",
        nav: {
            today: "ผลวันนี้",
            latest: "งวดล่าสุด",
            history: "ประวัติย้อนหลัง",
            check: "ตรวจหวย"
        },
        home: {
            loading: "กำลังโหลดข้อมูล...",
            error: "ไม่สามารถโหลดข้อมูลได้",
            retry: "ลองใหม่",
            firstPrize: "รางวัลที่ 1",
            front3: "เลขหน้า 3 ตัว",
            back3: "เลขท้าย 3 ตัว",
            last2: "เลขท้าย 2 ตัว",
            popular: "รางวัลยอดนิยม",
            source: "ที่มา",
            live: "ข้อมูลสด",
            heroTitleSuffix: "อัปเดตล่าสุด",
            heroUpdate: "อัปเดต:",
            heroDesc: "ผลสลากกินแบ่งรัฐบาลแบบเรียลไทม์ รวดเร็ว แม่นยำ และเชื่อถือได้จากแหล่งข้อมูลโดยตรง",
            checkBtn: "ตรวจหวยงวดล่าสุด",
            howToBtn: "วิธีเล่น/กติกา",
            verified: "แหล่งข้อมูลยืนยันแล้ว"
        },
        homeContent: {
            aboutTitle: "เกี่ยวกับผลสลากกินแบ่งรัฐบาล",
            aboutText: [
                "สลากกินแบ่งรัฐบาล คือการออกรางวัลอย่างเป็นทางการโดยสำนักงานสลากกินแบ่งรัฐบาล (GLO) ซึ่งจะมีการออกรางวัลเดือนละ 2 ครั้ง โดยปกติคือทุกวันที่ 1 และ 16 ของเดือน เป็นหนึ่งในรูปแบบการเสี่ยงโชคที่ถูกกฎหมายและได้รับความนิยมสูงสุดในประเทศไทย",
                "เว็บไซต์ของเรานำเสนอผลการออกรางวัลที่รวดเร็วและแม่นยำที่สุดสำหรับทุกรางวัล รวมถึงรางวัลที่ 1 (6 ล้านบาท) เลขหน้า 3 ตัว เลขท้าย 3 ตัว และเลขท้าย 2 ตัวที่ทุกคนรอคอย"
            ],
            scheduleTitle: "ตารางการออกรางวัล",
            scheduleText: "การออกรางวัลจะเริ่มถ่ายทอดสดตั้งแต่เวลา 14:30 น. เป็นต้นไป และจะสิ้นสุดประมาณ 16:00 น. คุณสามารถติดตามผลสดๆ ได้ที่นี่ทันทีที่เลขถูกประกาศออกมา"
        },
        tools: {
            title: "เครื่องมือด่วน",
            checkTitle: "ตรวจหวย",
            checkDesc: "เช็คผลรางวัลของคุณทันที",
            historyTitle: "ดูย้อนหลัง",
            historyDesc: "ดูผลสลากงวดที่ผ่านมา",
            statsTitle: "สถิติหวย",
            statsDesc: "วิเคราะห์เลขเด็ด",
            howToTitle: "วิธีเล่น",
            howToDesc: "กติกาและรางวัล"
        },
        historyDetail: {
            verified: "ผลการออกรางวัลอย่างเป็นทางการ",
            title: "ผลสลากกินแบ่งรัฐบาล",
            allHistory: "ดูย้อนหลังทั้งหมด",
            firstPrize: "รางวัลที่ 1",
            neighbor: "รางวัลข้างเคียง",
            front3: "เลขหน้า 3 ตัว",
            back3: "เลขท้าย 3 ตัว",
            last2: "เลขท้าย 2 ตัว",
            draw: "งวดวันที่",
            source: "แหล่งที่มา: สนง.สลากกินแบ่งฯ",
            breakdownTitle: "ตรวจรางวัลอื่นๆ",
            breakdownDesc: "ผลสลากกินแบ่งรัฐบาลประจำงวดวันที่",
            breakdownDescSuffix: "ได้ประกาศอย่างเป็นทางการแล้ว รายละเอียดรางวัลต่างๆ มีดังนี้",
            secondPrizes: "รางวัลที่ 2",
            verifyWarning: "* โปรดตรวจสอบความถูกต้องที่สำนักงานสนามบินน้ำ หรือตัวแทนจำหน่ายอีกครั้ง ข้อมูลนี้เพื่อเป็นวิทยาทานเท่านั้น",
            prevDraw: "งวดก่อนหน้า",
            nextDraw: "งวดถัดไป",
            exploreOld: "ดูผลย้อนหลัง",
            checkNew: "ดูผลล่าสุด",
            faqTitle: "คำถามที่พบบ่อย (FAQ)",
            q1: "การออกรางวัลครั้งถัดไปคือเมื่อไหร่?",
            a1: "โดยปกติหวยจะออกเดือนละ 2 ครั้ง คือวันที่ 1 และ 16 ของทุกเดือน งวดถัดไปจะห่างจากงวดนี้ประมาณ 15 วัน",
            q2: "รางวัลที่ 1 เงินรางวัลเท่าไหร่?",
            a2: "รางวัลที่ 1 มีมูลค่า 6,000,000 บาทต่อใบ"
        },
        table: {
            title: "ผลหวยย้อนหลัง",
            date: "วันที่",
            first: "รางวัลที่ 1",
            last2: "เลขท้าย 2 ตัว",
            action: "ดูเพิ่มเติม",
            fullResult: "ดูฉบับเต็ม"
        },
        latest: {
            title: "ผลสลากล่าสุด",
            liveUpdate: "อัปเดตสด",
            drawDate: "วันที่",
            serviceUnavailable: "ไม่สามารถให้บริการได้",
            returnHome: "กลับหน้าหลัก",
            checkTicket: "ตรวจสลากของคุณ"
        },
        check: {
            title: "ตรวจสอบสลาก",
            subtitle: "ตรวจสอบหมายเลขสลากของท่านกับ",
            subtitleHighlight: "ผลรางวัลล่าสุด",
            placeholder: "กรอกเลขสลาก 6 หลัก",
            checkBtn: "ตรวจสอบสถานะ",
            checkingBtn: "กำลังตรวจสอบ...",
            winTitle: "สถานะ: พบข้อมูลรางวัล",
            winMatch: "หมายเลขของท่านตรงกับรางวัลดังนี้:",
            loseTitle: "สถานะ: ไม่พบข้อมูลการถูกรางวัล",
            loseDesc: "หมายเลขนี้ไม่ตรงกับรางวัลใดๆ ในงวดล่าสุดที่ออกประกาศ",
            error: "เกิดข้อผิดพลาด โปรดลองอีกครั้ง",
            disclaimer: "กรอกอย่างน้อย 2 หลัก (เลขท้าย 2 ตัว, 3 ตัวหน้า/หลัง, หรือครบ 6 หลัก)"
        },
        statsContent: {
            title: "วิเคราะห์สถิติหวยรัฐบาลย้อนหลัง",
            intro: "ระบบ **สถิติหวย** ของเรารวบรวมข้อมูลผลรางวัลย้อนหลังเพื่อแสดงแนวโน้มและรูปแบบของตัวเลขที่ออกรางวัลบ่อย",
            methodologyTitle: "หลักการวิเคราะห์ข้อมูล",
            methodologyText: "เราใช้ข้อมูลจาก **ผลสลากกินแบ่งรัฐบาล** อย่างเป็นทางการย้อนหลังหลายปี เพื่อคำนวณความถี่ของตัวเลข 2 ตัว และ 3 ตัว เพื่อหา 'เลขเด็ด' (ออกบ่อย) และเลขที่ออกน้อย",
            disclaimerTitle: "ความน่าจะเป็น",
            disclaimerText: "โปรดทราบว่า **สถิติในอดีตไม่สามารถการันตีผลในอนาคตได้** การออกรางวัลแต่ละงวดเป็นเหตุการณ์สุ่ม ข้อมูลนี้มีไว้เพื่อ **การวิเคราะห์และความบันเทิงเท่านั้น**"
        },
        checkContent: {
            guideTitle: "วิธีตรวจหวยออนไลน์",
            guideSteps: [
                "กรอก **เลขสลาก 6 หลัก** ของท่านลงในช่องค้นหาด้านบน",
                "กดปุ่ม **ตรวจสอบสถานะ** เพื่อเช็คข้อมูลกับฐานข้อมูลกองสลากฯ",
                "ระบบจะตรวจสอบรางวัลที่ 1, เลขท้าย 2 ตัว, เลขหน้า 3 ตัว และเลขท้าย 3 ตัว ทันที",
                "ดูผลสถานะการถูกรางวัลได้ทันที"
            ],
            benefitsTitle: "ทำไมต้องตรวจหวยกับเรา?",
            benefitsText: "เราให้บริการตรวจหวยที่รวดเร็วและแม่นยำที่สุด ข้อมูลเชื่อมต่อโดยตรงกับการประกาศผลรางวัลสลากกินแบ่งรัฐบาล"
        },
        historyPage: {
            title: "ประวัติผลสลากกินแบ่ง",
            subtitle: "คลังข้อมูลผลสลากกินแบ่งรัฐบาลย้อนหลังครบถ้วน ค้นหาและตรวจสอบเลขที่ออกในอดีตได้ที่นี่",
            allYears: "ทุกปี",
            page: "หน้า",
            noResults: "ไม่พบข้อมูลในช่วงเวลานี้",
            aboutTitle: "เกี่ยวกับคลังข้อมูล",
            aboutDesc: "ฐานข้อมูลของเราอัปเดตทันทีหลังการออกรางวัลอย่างเป็นทางการ อย่างไรก็ตาม เราแนะนำให้คุณตรวจสอบสลากที่ถูกรางวัลที่เคาน์เตอร์กองสลากฯ หรือตัวแทนที่ได้รับอนุญาตก่อนทิ้งสลาก"
        },
        howTo: {
            title: "วิธีเล่นและการขึ้นเงิน",
            sections: [
                { title: "วิธีเล่น", desc: "สลากกินแบ่งรัฐบาลจำหน่ายเป็นคู่ (ปัจจุบันใบเดียว 80 บาท) สามารถตรวจสอบความถูกต้องได้จากลายน้ำและเนื้อกระดาษ" },
                { title: "ประเภทรางวัล", desc: "มีหลายรางวัล ได้แก่ รางวัลที่ 1 (6 ล้านบาท), เลขหน้า 3 ตัว, เลขท้าย 3 ตัว และเลขท้าย 2 ตัว" },
                { title: "การขึ้นเงินรางวัล", desc: "รางวัลมูลค่าไม่เกิน 20,000 บาท สามารถขึ้นเงินได้ที่ตัวแทนจำหน่าย (หัก 1-2%) รางวัลใหญ่ต้องขึ้นเงินที่กองสลาก (สนามบินน้ำ)" }
            ]
        },
        faq: {
            title: "คำถามที่พบบ่อย (FAQ)",
            items: [
                { q: "ผลหวยออกกี่โมง?", a: "โดยปกติผลรางวัลจะเริ่มออกเวลาประมาณ 14:30 น. ถึง 16:00 น. ในวันที่ 1 และ 16 ของทุกเดือน" },
                { q: "ขึ้นเงินรางวัลได้ที่ไหน?", a: "สามารถขึ้นเงินได้ที่สำนักงานสลากกินแบ่งรัฐบาล (สนามบินน้ำ) หรือร้านรับขึ้นเงินที่เชื่อถือได้ (อาจมีค่าธรรมเนียม)" },
                { q: "วิธีดูสลากปลอม?", a: "สลากจริงจะมีลายน้้าวในเนื้อกระดาษ และผิวสัมผัสแตกต่าง ควรตรวจสอบตราประทับและซื้อจากผู้ค้าที่มีใบอนุญาต" },
                { q: "เว็บนี้เป็นเว็บทางการหรือไม่?", a: "ไม่ เว็บไซต์นี้เป็นแหล่งข้อมูลสำหรับตรวจสอบผลเท่านั้น เรานำเสนอข้อมูลสาธารณะเพื่อความสะดวก ไม่มีการขายสลาก" }
            ]
        },
        footer: {
            aboutTitle: "ผลสลากกินแบ่งรัฐบาล",
            aboutText: "แหล่งข้อมูลผลรางวัลสลากกินแบ่งรัฐบาลที่รวดเร็ว เชื่อถือได้ และปลอดภัย เราให้บริการอัปเดตแบบเรียลไทม์และตรวจสอบข้อมูลย้อนหลัง",
            disclaimerTitle: "คำเตือน",
            disclaimerText: "เว็บไซต์นี้ให้ข้อมูลเพื่อเป็นวิทยาทานเท่านั้น เราไม่มีการจำหน่ายสลากหรือให้บริการพนัน โปรดตรวจสอบผลกับเว็บไซต์กองสลากฯ อีกครั้ง",
            quickLinks: "เมนูลัด",
            legal: "กฎหมาย & แหล่งที่มา",
            privacy: "นโยบายความเป็นส่วนตัว",
            terms: "เงื่อนไขการใช้บริการ",
            contact: "ติดต่อเรา",
            attribution: "ข้อมูลจากแหล่งข่าวน่าเชื่อถือ: Sanook, Thairath, Kapook",
            copyright: "Thai Lottery Check Today. สงวนลิขสิทธิ์",
            status: "สถานะระบบ: ปกติ",
            archive: "คลังผลย้อนหลัง",
            stats: "สถิติเลข",
            howTo: "วิธีขึ้นเงินรางวัล"
        },
        notFound: {
            title: "ไม่พบหน้านี้",
            desc: "ขออภัย ไม่พบหน้าที่คุณต้องการ หรือหน้าดังกล่าวถูกย้ายไปแล้ว",
            homeBtn: "กลับหน้าหลัก",
            checkBtn: "ตรวจหวยงวดล่าสุด"
        }
    }
};

const LanguageContext = createContext({
    lang: 'en',
    setLang: (lang: string) => { },
    toggleLanguage: () => { },
    t: translations['en'],
    getPath: (path: string) => path
});

export function LanguageProvider({ children, initialLang = 'en' }) {
    // Initialize with server-provided language (for SSR/SEO) or default to 'en'
    const [lang, setLang] = useState(initialLang);

    // Load from localStorage (client-side override)
    useEffect(() => {
        const saved = localStorage.getItem('preference_lang');
        if (saved) {
            setLang(saved);
        } else if (initialLang === 'en' && typeof navigator !== 'undefined' && navigator.language && navigator.language.startsWith('th')) {
            // Only auto-detect if server didn't force a specific language (like /th route)
            setLang('th');
        }
    }, [initialLang]);

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem('preference_lang', lang);
    }, [lang]);

    // Simple toggle function
    const toggleLanguage = () => {
        setLang(prev => prev === 'en' ? 'th' : 'en');
    };

    const t = translations[lang];

    // Helper to generate localized paths
    const getPath = (path: string) => {
        if (lang === 'th') {
            return `/th${path === '/' ? '' : path}`;
        }
        // Default to clean path for 'en' or others
        return path;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t, getPath }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
