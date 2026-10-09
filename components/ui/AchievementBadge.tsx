type AchievementBadgeProps = {
  category: string;
  value: string;
  detail: string;
  edge: "one" | "two" | "three" | "four";
  className?: string;
};

export default function AchievementBadge({
  category,
  value,
  detail,
  edge,
  className = "",
}: AchievementBadgeProps) {
  return (
    <article
      className={`act1-badge paper-clipping paper-edge-${edge} absolute w-[min(64.5vw,322px)] px-[18px] py-[18px] text-[#37291e] sm:px-6 sm:py-6 ${className}`}
    >
      <p className="font-display text-base italic leading-tight text-[#765a41] sm:text-lg">
        {category}
      </p>
      <p className="mt-1.5 font-display text-[21px] font-semibold leading-tight sm:mt-1.5 sm:text-2xl">
        {value}
      </p>
      <p className="mt-1.5 font-display text-[15px] leading-snug text-[#594431] sm:text-base">
        {detail}
      </p>
    </article>
  );
}