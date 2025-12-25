export const HeroIllustration = ({ className }) => (
    <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#c084fc', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#db2777', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#818cf8', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        {/* Floating Balls - Modern 3D Effect */}
        <circle cx="200" cy="150" r="80" fill="url(#grad1)" opacity="0.2" />
        <circle cx="150" cy="120" r="40" fill="url(#grad1)" filter="url(#glow)" />
        <text x="150" y="130" fontSize="24" fill="white" textAnchor="middle" fontWeight="bold" fontFamily="monospace">95</text>

        <circle cx="250" cy="180" r="50" fill="url(#grad2)" filter="url(#glow)" />
        <text x="250" y="195" fontSize="30" fill="white" textAnchor="middle" fontWeight="bold" fontFamily="monospace">76</text>

        <circle cx="280" cy="100" r="25" fill="#fbbf24" opacity="0.9" />
        <circle cx="100" cy="200" r="15" fill="#34d399" opacity="0.8" />

        {/* Abstract Orbit Lines */}
        <path d="M 50 150 Q 200 50 350 150" stroke="white" strokeWidth="2" fill="none" opacity="0.2" strokeDasharray="10,5" />
        <path d="M 50 150 Q 200 250 350 150" stroke="white" strokeWidth="2" fill="none" opacity="0.2" strokeDasharray="10,5" />
    </svg>
);

export const CheckIllustration = ({ className }) => (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="40" width="120" height="140" rx="10" fill="white" stroke="#e2e8f0" strokeWidth="4" />
        <rect x="60" y="60" width="80" height="10" rx="2" fill="#cbd5e1" />
        <rect x="60" y="80" width="60" height="10" rx="2" fill="#e2e8f0" />
        <rect x="60" y="100" width="80" height="10" rx="2" fill="#e2e8f0" />

        {/* Magnifying Glass */}
        <circle cx="120" cy="120" r="40" fill="#eff6ff" stroke="#3b82f6" strokeWidth="6" />
        <line x1="148" y1="148" x2="180" y2="180" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" />
        <path d="M 100 120 L 115 135 L 140 105" stroke="#22c55e" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const StatsIllustration = ({ className }) => (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="100" width="30" height="80" rx="4" fill="#e9d5ff" />
        <rect x="60" y="70" width="30" height="110" rx="4" fill="#c084fc" />
        <rect x="100" y="40" width="30" height="140" rx="4" fill="#9333ea" />
        <rect x="140" y="80" width="30" height="100" rx="4" fill="#a855f7" />

        {/* Trend Line */}
        <polyline points="35,100 75,70 115,40 155,80" fill="none" stroke="#fbbf24" strokeWidth="4" />
        <circle cx="115" cy="40" r="6" fill="#fbbf24" />
    </svg>
);

export const WinnerIllustration = ({ className }) => (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Confetti */}
        <circle cx="40" cy="40" r="4" fill="#f472b6" />
        <circle cx="160" cy="50" r="4" fill="#60a5fa" />
        <rect x="30" y="80" width="6" height="6" fill="#fbbf24" transform="rotate(45 30 80)" />
        <rect x="170" y="90" width="6" height="6" fill="#34d399" transform="rotate(20 170 90)" />

        {/* Trophy */}
        <path d="M 60 40 L 140 40 L 130 110 C 130 140 90 140 70 110 Z" fill="#fbbf24" />
        <path d="M 60 40 L 40 60 C 30 70 40 85 55 75 L 62 50" fill="none" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
        <path d="M 140 40 L 160 60 C 170 70 160 85 145 75 L 138 50" fill="none" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />

        <rect x="80" y="140" width="40" height="10" fill="#f59e0b" />
        <rect x="70" y="150" width="60" height="10" fill="#b45309" rx="2" />

        {/* Star */}
        <path d="M 100 60 L 105 75 L 120 75 L 108 85 L 112 100 L 100 90 L 88 100 L 92 85 L 80 75 L 95 75 Z" fill="#fff" opacity="0.8" />
    </svg>
);

export const SecureIllustration = ({ className }) => (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M 100 20 L 160 50 V 100 C 160 150 100 180 100 180 C 100 180 40 150 40 100 V 50 Z" fill="#dcfce7" stroke="#22c55e" strokeWidth="4" />
        <path d="M 100 60 L 120 80 L 90 110 L 80 100" fill="none" stroke="#16a34a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
