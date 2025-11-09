interface BilingualTextProps {
  english: string;
  telugu: string;
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
  inline?: boolean;
}

export function BilingualText({ 
  english, 
  telugu, 
  className = '',
  primaryClassName = '',
  secondaryClassName = 'text-xs opacity-70',
  inline = false
}: BilingualTextProps) {
  if (inline) {
    return (
      <span className={className}>
        {english}
        <span className={`ml-1 ${secondaryClassName}`}>/ {telugu}</span>
      </span>
    );
  }

  return (
    <div className={className}>
      <div className={primaryClassName}>{english}</div>
      <div className={secondaryClassName}>{telugu}</div>
    </div>
  );
}
