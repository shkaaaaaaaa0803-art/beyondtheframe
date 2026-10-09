export default function GrainOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="global-grain-overlay pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.14]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="grain-texture">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.82"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0.18" />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-texture)" />
    </svg>
  );
}