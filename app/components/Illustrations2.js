export const HowToIllustration = ({ className }) => (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#f8fafc', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#e2e8f0', stopOpacity: 1 }} />
            </linearGradient>
        </defs>

        {/* Book Base */}
        <path d="M 40 50 L 160 50 L 160 160 L 40 160 Z" fill="url(#bookGrad)" />
        <path d="M 40 50 C 20 50 20 160 40 160" fill="#cbd5e1" />
        <path d="M 160 50 C 180 50 180 160 160 160" fill="#94a3b8" />

        {/* Pages Effect */}
        <path d="M 45 155 L 155 155" stroke="#94a3b8" strokeWidth="2" />
        <path d="M 45 150 L 155 150" stroke="#94a3b8" strokeWidth="2" />

        {/* Content Elements */}
        <rect x="60" y="70" width="80" height="10" rx="2" fill="#3b82f6" opacity="0.8" />
        <rect x="60" y="90" width="60" height="6" rx="2" fill="#cbd5e1" />
        <rect x="60" y="105" width="70" height="6" rx="2" fill="#cbd5e1" />
        <rect x="60" y="120" width="50" height="6" rx="2" fill="#cbd5e1" />

        {/* Numbers/Lottery Ball on page */}
        <circle cx="130" cy="110" r="15" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
        <text x="130" y="115" fontSize="12" textAnchor="middle" fill="#fff" fontWeight="bold">?</text>
    </svg>
);

export const CalendarIllustration = ({ className }) => (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Calendar Page */}
        <rect x="40" y="40" width="120" height="130" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="4" />

        {/* Header Red */}
        <path d="M 40 48 C 40 44 44 40 48 40 H 152 C 156 40 160 44 160 48 V 70 H 40 V 48 Z" fill="#ef4444" />

        {/* Rings */}
        <rect x="60" y="30" width="8" height="20" rx="4" fill="#64748b" />
        <rect x="132" y="30" width="8" height="20" rx="4" fill="#64748b" />

        {/* Grid */}
        <circle cx="70" cy="95" r="4" fill="#cbd5e1" />
        <circle cx="100" cy="95" r="4" fill="#cbd5e1" />
        <circle cx="130" cy="95" r="4" fill="#cbd5e1" />

        <circle cx="70" cy="120" r="4" fill="#cbd5e1" />
        <circle cx="100" cy="120" r="4" fill="#cbd5e1" />
        <circle cx="130" cy="120" r="4" fill="#cbd5e1" />

        {/* Highlighted Date */}
        <circle cx="100" cy="145" r="12" fill="#ef4444" />
        <text x="100" y="149" fontSize="10" textAnchor="middle" fill="white" fontWeight="bold">16</text>
    </svg>
);

export const FAQIllustration = ({ className }) => (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Main Bubble */}
        <path d="M 30 50 H 170 C 180 50 190 60 190 70 V 130 C 190 140 180 150 170 150 H 80 L 40 180 V 150 H 30 C 20 150 10 140 10 130 V 70 C 10 60 20 50 30 50 Z" fill="#f0f9ff" stroke="#38bdf8" strokeWidth="4" />

        {/* Question Mark */}
        <text x="100" y="125" fontSize="80" textAnchor="middle" fill="#0ea5e9" fontWeight="bold">?</text>

        {/* Small Floating Bubbles */}
        <circle cx="180" cy="40" r="8" fill="#bae6fd" opacity="0.6" />
        <circle cx="20" cy="80" r="5" fill="#bae6fd" opacity="0.6" />
    </svg>
);

export const LiveIllustration = ({ className }) => (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="signalGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#b91c1c', stopOpacity: 0 }} />
            </radialGradient>
        </defs>

        {/* Tower */}
        <path d="M 95 60 L 105 60 L 120 160 L 80 160 Z" fill="#475569" />
        <line x1="100" y1="60" x2="100" y2="30" stroke="#475569" strokeWidth="4" />
        <circle cx="100" cy="30" r="6" fill="#ef4444" />

        {/* Signals */}
        <circle cx="100" cy="30" r="15" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.8">
            <animate attributeName="r" from="15" to="30" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="30" r="25" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.6">
            <animate attributeName="r" from="25" to="50" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
        </circle>

        {/* "LIVE" Text */}
        <rect x="70" y="170" width="60" height="20" rx="4" fill="#ef4444" />
        <text x="100" y="184" fontSize="12" textAnchor="middle" fill="white" fontWeight="bold">LIVE</text>
    </svg>
);

export const AnalyticsIllustration = ({ className }) => (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Screen/Board */}
        <rect x="20" y="30" width="160" height="110" rx="8" fill="#1e293b" />
        <rect x="20" y="140" width="160" height="10" fill="#334155" />
        <path d="M 80 150 L 70 170 H 130 L 120 150 Z" fill="#334155" />
        <rect x="50" y="170" width="100" height="4" rx="2" fill="#334155" />

        {/* Chart Lines */}
        <polyline points="35,120 60,90 90,110 120,60 165,50" fill="none" stroke="#22c55e" strokeWidth="3" />

        {/* Dots */}
        <circle cx="60" cy="90" r="3" fill="#fff" />
        <circle cx="120" cy="60" r="3" fill="#fff" />
        <circle cx="165" cy="50" r="3" fill="#fff" />

        {/* Bars */}
        <rect x="35" y="125" width="10" height="0" fill="#3b82f6" opacity="0.5">
            <animate attributeName="height" from="0" to="10" dur="1s" fill="freeze" />
        </rect>
        <rect x="60" y="125" width="10" height="0" fill="#3b82f6" opacity="0.5">
            <animate attributeName="height" from="0" to="30" dur="1s" fill="freeze" />
        </rect>
    </svg>
);
