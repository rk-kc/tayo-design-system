interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <p className="text-xs uppercase tracking-widest text-leaf font-medium mb-2">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      {description && (
        <p className="text-sm text-white/60 max-w-2xl">{description}</p>
      )}
    </div>
  )
}
