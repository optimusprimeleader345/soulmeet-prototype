import React from 'react';

export interface LogoProps {
  /**
   * - `full`: Circular emblem + SOULMEET wordmark + Safe Space Companion™ tagline (vertical/stacked or horizontal depending on orientation)
   * - `compact`: Circular emblem + SOULMEET wordmark
   * - `mark`: Circular emblem only
   * - `hero`: Large centerpiece emblem + stacked wordmark & tagline
   */
  variant?: 'full' | 'compact' | 'mark' | 'hero';
  /**
   * Layout orientation when showing mark + text
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Preset sizes ('sm' | 'md' | 'lg' | 'xl') or pixel size for the circular emblem
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  /**
   * Color theme override
   */
  color?: 'primary' | 'gold' | 'white' | 'dark';
  /**
   * Whether to display the Safe Space Companion™ tagline
   */
  showTagline?: boolean;
  /**
   * Whether to flip the silhouette face to look towards the right
   */
  flipEmblem?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const SIZE_MAP = {
  sm: { mark: 30, title: '1.35rem', subtitle: '0.8rem', gap: '0.85rem' },
  md: { mark: 48, title: '1.85rem', subtitle: '0.98rem', gap: '1.25rem' },
  lg: { mark: 78, title: '2.75rem', subtitle: '1.35rem', gap: '1.75rem' },
  xl: { mark: 120, title: '3.8rem', subtitle: '1.65rem', gap: '2.25rem' },
};

export default function Logo({
  variant = 'compact',
  orientation = 'horizontal',
  size = 'md',
  color = 'primary',
  showTagline = true,
  flipEmblem = true,
  className = '',
  style = {},
}: LogoProps) {
  const dimensions = typeof size === 'number'
    ? {
        mark: size,
        title: `${Math.max(1.1, size * 0.042)}rem`,
        subtitle: `${Math.max(0.75, size * 0.022)}rem`,
        gap: `${Math.max(0.6, size * 0.025)}rem`,
      }
    : SIZE_MAP[size];

  const getColors = () => {
    switch (color) {
      case 'white':
        return {
          emblemGold: '#DFC28E',
          emblemDark: '#FFFFFF',
          wordmark: '#FFFFFF',
          tagline: 'rgba(255, 255, 255, 0.85)',
        };
      case 'gold':
        return {
          emblemGold: '#C9A86A',
          emblemDark: '#DFC28E',
          wordmark: '#C9A86A',
          tagline: '#DFC28E',
        };
      case 'dark':
        return {
          emblemGold: '#C9A86A',
          emblemDark: '#2D2D2D',
          wordmark: '#2D2D2D',
          tagline: '#8A7968',
        };
      case 'primary':
      default:
        return {
          emblemGold: '#C9A86A',
          emblemDark: 'var(--color-soul-primary, #4A3428)',
          wordmark: 'var(--color-soul-primary, #4A3428)',
          tagline: 'var(--color-soul-text-muted, #8A7968)',
        };
    }
  };

  const colors = getColors();

  // The circular vector SVG emblem capturing the serene woman profile and concentric rings
  const renderEmblem = (svgSize: number) => (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: 'block' }}
    >
      {/* Outer Concentric Ring 1 */}
      <circle
        cx="50"
        cy="50"
        r="47"
        stroke={colors.emblemGold}
        strokeWidth="1.8"
        strokeOpacity="0.9"
      />
      {/* Middle Ring 2 */}
      <circle
        cx="50"
        cy="50"
        r="43.5"
        stroke={colors.emblemGold}
        strokeWidth="1.2"
        strokeOpacity="0.6"
      />
      {/* Inner Ring 3 */}
      <circle
        cx="50"
        cy="50"
        r="39.5"
        stroke={colors.emblemGold}
        strokeWidth="1.6"
        strokeOpacity="0.85"
      />

      {/* Profile & Flowing Hair Group (Flipped around center x=50 if flipEmblem is true) */}
      <g transform={flipEmblem ? 'scale(-1, 1) translate(-100, 0)' : undefined}>
        {/* Profile Forehead, Nose, Lips, Chin & Neck Silhouette */}
        <path
          d="M 44.5 16 C 41 20 38 25 36.5 30 C 35.5 33 34.5 35 33 36 C 32.5 36.5 31.8 37 32 37.8 C 32.3 38.5 34 39.5 35 40 C 33.8 40.8 33 41.5 33.2 42.5 C 33.5 43.5 35 44 35.8 44.2 C 34.2 45.2 33.8 46.5 34.2 47.5 C 34.8 48.8 36.5 49.5 38 49.5 C 36 51 35.5 53 36.5 55 C 37.5 56.8 40.5 58.2 43.5 58 C 46 57.8 48 59 49.5 63 C 51 67 51 72 48 78 C 45 84 41.5 86.5 39 88.5 C 42.5 89.2 46 89.5 50 89.5"
          stroke={colors.emblemGold}
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Eye & Brow Detail */}
        <path
          d="M 37.5 31 C 39.5 30.5 42 31 43.5 32"
          stroke={colors.emblemGold}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M 38 33.5 C 39.5 34 41 33.5 42 33"
          stroke={colors.emblemGold}
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        {/* Flowing Organic Hair Waves sweeping across right side */}
        <path
          d="M 44.5 16 C 48 16.5 53 18.5 57 23 C 62 28.5 65.5 36 65.5 44 C 65.5 53 63.5 62 59 70 C 56 75.5 52.5 80.5 48 84 C 55 81.5 61 76 66 69 C 71.5 61 74.5 51 74 41 C 73.5 30 68 21.5 61 16.5 C 56 13 50.5 11 44.5 11"
          stroke={colors.emblemGold}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 48 18 C 52 21 56 26 58.5 32 C 61.5 39 61.5 48 59 56 C 56.5 64 52 71 46 76"
          stroke={colors.emblemGold}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeOpacity="0.8"
        />
        <path
          d="M 57 23 C 62 26 66.5 31 69 37 C 72 44 71.5 53 68 61 C 65.5 66.5 61.5 72 56 76.5"
          stroke={colors.emblemGold}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.65"
        />
      </g>
    </svg>
  );

  if (variant === 'mark') {
    return (
      <div className={`soulmeet-logo ${className}`} style={{ display: 'inline-flex', ...style }}>
        {renderEmblem(dimensions.mark)}
      </div>
    );
  }

  const isVertical = orientation === 'vertical' || variant === 'hero' || variant === 'full';

  const verticalGap = typeof size === 'number'
    ? `${size * 0.3}px`
    : size === 'xl' ? '1.8rem' : size === 'lg' ? '1.4rem' : size === 'md' ? '1.1rem' : '0.8rem';

  return (
    <div
      className={`soulmeet-logo ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: isVertical ? 'center' : 'center',
        textAlign: isVertical ? 'center' : 'left',
        gap: isVertical ? verticalGap : dimensions.gap,
        ...style,
      }}
    >
      {renderEmblem(dimensions.mark)}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: isVertical ? 'center' : 'flex-start' }}>
        <span
          style={{
            fontFamily: "var(--font-heading, 'Cormorant Garamond', Georgia, serif)",
            fontSize: dimensions.title,
            fontWeight: 600,
            letterSpacing: '0.11em',
            lineHeight: 1.1,
            color: colors.wordmark,
            textTransform: 'uppercase',
          }}
        >
          SOULMEET
        </span>

        {(variant === 'full' || variant === 'hero' || showTagline) && (
          <span
            style={{
              fontFamily: "var(--font-heading, 'Cormorant Garamond', Georgia, serif)",
              fontSize: dimensions.subtitle,
              fontWeight: 450,
              letterSpacing: '0.07em',
              lineHeight: 1.35,
              color: colors.tagline,
              marginTop: isVertical ? '0.55rem' : '0.28rem',
            }}
          >
            Safe Space Companion™
          </span>
        )}
      </div>
    </div>
  );
}

export { Logo as SoulMeetLogo };
