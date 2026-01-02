// Date and Number Formatting Utilities for Thai Lottery

// Thai month names
const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

// Thai day names
const thaiDays = [
    'อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'
];

// Thai numerals
const thaiNumerals = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];

/**
 * Convert Arabic numerals to Thai numerals
 * @param num - Number or string to convert
 * @returns Thai numeral string
 */
export function toThaiNumerals(num: string | number): string {
    return String(num).split('').map(digit => {
        const d = parseInt(digit);
        return isNaN(d) ? digit : thaiNumerals[d];
    }).join('');
}

/**
 * Convert Thai numerals to Arabic numerals
 * @param thaiNum - Thai numeral string
 * @returns Arabic numeral string
 */
export function toArabicNumerals(thaiNum: string): string {
    return thaiNum.split('').map(char => {
        const index = thaiNumerals.indexOf(char);
        return index !== -1 ? String(index) : char;
    }).join('');
}

/**
 * Format date in Thai Buddhist calendar
 * @param date - Date string (YYYY-MM-DD) or Date object
 * @param lang - Language ('th' or 'en')
 * @param format - Format type ('full', 'short', 'numeric')
 * @returns Formatted date string
 */
export function formatThaiDate(
    date: string | Date,
    lang: 'th' | 'en' = 'th',
    format: 'full' | 'short' | 'numeric' = 'full'
): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
        return date.toString();
    }

    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const buddhistYear = year + 543; // Convert to Buddhist Era
    const dayOfWeek = dateObj.getDay();

    if (lang === 'th') {
        if (format === 'numeric') {
            // Format: ๑๖/๐๙/๒๕๖๘
            const thaiDay = toThaiNumerals(day.toString().padStart(2, '0'));
            const thaiMonth = toThaiNumerals((month + 1).toString().padStart(2, '0'));
            const thaiYear = toThaiNumerals(buddhistYear);
            return `${thaiDay}/${thaiMonth}/${thaiYear}`;
        } else if (format === 'short') {
            // Format: ๑๖ ก.ย. ๒๕๖๘
            const thaiDay = toThaiNumerals(day);
            const monthAbbr = thaiMonths[month].substring(0, 3);
            const thaiYear = toThaiNumerals(buddhistYear);
            return `${thaiDay} ${monthAbbr} ${thaiYear}`;
        } else {
            // Format: วันจันทร์ที่ ๑๖ กันยายน พ.ศ. ๒๕๖๘
            const thaiDay = toThaiNumerals(day);
            const thaiYear = toThaiNumerals(buddhistYear);
            return `วัน${thaiDays[dayOfWeek]}ที่ ${thaiDay} ${thaiMonths[month]} พ.ศ. ${thaiYear}`;
        }
    } else {
        // English format
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        if (format === 'numeric') {
            return `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
        } else if (format === 'short') {
            return `${day} ${monthNames[month].substring(0, 3)} ${year}`;
        } else {
            return `${monthNames[month]} ${day}, ${year}`;
        }
    }
}

/**
 * Parse date from various formats (YYYY-MM-DD, DD/MM/YYYY, etc.)
 * @param dateStr - Date string
 * @returns Date object or null
 */
export function parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;

    // Try YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return new Date(dateStr);
    }

    // Try DD/MM/YYYY format
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    }

    // Try DDMMYYYY format (common in Thai lottery)
    if (/^\d{8}$/.test(dateStr)) {
        const day = parseInt(dateStr.substring(0, 2));
        const month = parseInt(dateStr.substring(2, 4)) - 1;
        const year = parseInt(dateStr.substring(4, 8));
        return new Date(year, month, day);
    }

    return null;
}

/**
 * Format currency in Thai Baht
 * @param amount - Amount in THB
 * @param lang - Language ('th' or 'en')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, lang: 'th' | 'en' = 'th'): string {
    const formatted = amount.toLocaleString('th-TH');

    if (lang === 'th') {
        return `${toThaiNumerals(formatted)} บาท`;
    } else {
        return `${formatted} THB`;
    }
}

/**
 * Format lottery number with proper spacing
 * @param number - Lottery number (6 digits)
 * @param lang - Language ('th' or 'en')
 * @returns Formatted number
 */
export function formatLotteryNumber(number: string | number, lang: 'th' | 'en' = 'th'): string {
    const numStr = String(number).padStart(6, '0');

    if (lang === 'th') {
        return toThaiNumerals(numStr);
    } else {
        return numStr;
    }
}

/**
 * Get draw date description
 * @param date - Date string or Date object
 * @param lang - Language ('th' or 'en')
 * @returns Description like "งวดวันที่ 16 กันยายน 2568"
 */
export function getDrawDescription(date: string | Date, lang: 'th' | 'en' = 'th'): string {
    if (lang === 'th') {
        return `งวด${formatThaiDate(date, 'th', 'full')}`;
    } else {
        return `Draw on ${formatThaiDate(date, 'en', 'full')}`;
    }
}

/**
 * Check if date is a lottery draw date (1st or 16th of month)
 * @param date - Date to check
 * @returns boolean
 */
export function isDrawDate(date: Date): boolean {
    const day = date.getDate();
    return day === 1 || day === 16;
}

/**
 * Get next draw date from a given date
 * @param fromDate - Starting date
 * @returns Next draw date
 */
export function getNextDrawDate(fromDate: Date = new Date()): Date {
    const day = fromDate.getDate();
    const month = fromDate.getMonth();
    const year = fromDate.getFullYear();

    if (day < 1) {
        return new Date(year, month, 1);
    } else if (day < 16) {
        return new Date(year, month, 16);
    } else {
        // Next month, 1st
        return new Date(year, month + 1, 1);
    }
}

/**
 * Get previous draw date from a given date
 * @param fromDate - Starting date
 * @returns Previous draw date
 */
export function getPreviousDrawDate(fromDate: Date = new Date()): Date {
    const day = fromDate.getDate();
    const month = fromDate.getMonth();
    const year = fromDate.getFullYear();

    if (day > 16) {
        return new Date(year, month, 16);
    } else if (day > 1) {
        return new Date(year, month, 1);
    } else {
        // Previous month, 16th
        return new Date(year, month - 1, 16);
    }
}

/**
 * Format relative time (e.g., "2 days ago")
 * @param date - Date string or Date object
 * @param lang - Language ('th' or 'en')
 * @returns Relative time string
 */
export function formatRelativeTime(date: string | Date, lang: 'th' | 'en' = 'th'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (lang === 'th') {
        if (diffDays === 0) return 'วันนี้';
        if (diffDays === 1) return 'เมื่อวาน';
        if (diffDays < 7) return `${toThaiNumerals(diffDays)} วันที่แล้ว`;
        if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            return `${toThaiNumerals(weeks)} สัปดาห์ที่แล้ว`;
        }
        if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `${toThaiNumerals(months)} เดือนที่แล้ว`;
        }
        const years = Math.floor(diffDays / 365);
        return `${toThaiNumerals(years)} ปีที่แล้ว`;
    } else {
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        }
        if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `${months} month${months > 1 ? 's' : ''} ago`;
        }
        const years = Math.floor(diffDays / 365);
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }
}
