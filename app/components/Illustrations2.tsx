export const LiveIllustration = ({ className }) => (
    <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="neon-glow" filterUnits="userSpaceOnUse">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Background Elements */}
        <circle cx="200" cy="150" r="120" fill="#fee2e2" opacity="0.1" />
        <circle cx="200" cy="150" r="90" fill="#fecaca" opacity="0.1" />

        {/* Live Pulse Rings */}
        <circle cx="200" cy="150" r="60" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.5">
            <animate attributeName="r" from="60" to="100" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Central Live Badge */}
        <rect x="140" y="125" width="120" height="50" rx="25" fill="#dc2626" />
        <text x="200" y="158" fontSize="24" fill="white" textAnchor="middle" fontWeight="bold" fontFamily="sans-serif" filter="url(#neon-glow)">LIVE</text>

        {/* Satellite/Broadcast Icons */}
        <path d="M 120 180 Q 140 220 100 240" stroke="#f87171" strokeWidth="3" fill="none" strokeDasharray="5,5" />
        <path d="M 280 120 Q 320 80 340 120" stroke="#f87171" strokeWidth="3" fill="none" strokeDasharray="5,5" />
        <circle cx="340" cy="120" r="5" fill="#ef4444" />

        {/* Signal Waves */}
        <path d="M 270 140 Q 280 150 270 160" stroke="white" strokeWidth="2" fill="none" opacity="0.8">
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
        </path>
        <path d="M 280 130 Q 300 150 280 170" stroke="white" strokeWidth="2" fill="none" opacity="0.6">
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.2s" repeatCount="indefinite" />
        </path>
    </svg>
);
