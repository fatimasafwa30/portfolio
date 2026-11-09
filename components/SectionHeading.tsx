interface SectionHeadingProps {
  readonly id: string;
  readonly title: string;
}

export default function SectionHeading({ id, title }: SectionHeadingProps) {
  return (
    <div className="mb-8 sm:mb-12 border-b border-zinc-800/80 pb-6">
      <h2
        id={id}
        className="font-display text-3xl sm:text-4xl uppercase tracking-wider text-zinc-100"
      >
        {title}
      </h2>
    </div>
  );
}
