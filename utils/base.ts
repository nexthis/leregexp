

export function difficultyInfo(value: number): {color: string, name: string}
{
    if (value <= 20) return { color: "#32a852", name: "low" };
    if (value <= 40) return { color: "#9ca832", name: "medium" };
    if (value <= 60) return { color: "#a83232", name: "hard" };
    
    return { color: "#000", name: "extreme" };
}

export function safeRegExp(pattern: RegExp | string, flags?: string){
    try {
        return  new RegExp(pattern, flags);
    } catch {
        return undefined;
    }
}

export function groupColors(value: number, opacity: number = 1) {
    const values = [
      `rgba(34, 197, 94, ${opacity})`,   // Green
      `rgba(14, 165, 233, ${opacity})`,  // Blue
      `rgba(217, 70, 239, ${opacity})`,  // Purple
      `rgba(217, 119, 6, ${opacity})`,   // Orange
      `rgba(239, 68, 68, ${opacity})`,   // Red
      `rgba(168, 85, 247, ${opacity})`,  // Indigo
      `rgba(45, 212, 191, ${opacity})`,  // Teal
      `rgba(245, 158, 11, ${opacity})`,  // Amber
      `rgba(99, 102, 241, ${opacity})`,  // Indigo (another shade)
      `rgba(236, 72, 153, ${opacity})`,  // Pink
      `rgba(16, 185, 129, ${opacity})`,  // Emerald
      `rgba(139, 92, 246, ${opacity})`   // Violet
    ];
    
    return values?.[value] ?? values[0];
}
  