

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

export function groupColors(value: number, opacity: number = 1){
    const values = [`rgba(34, 197, 94, ${opacity})`, `rgba(14, 165, 233, ${opacity})`, `rgba(217, 70, 239, ${opacity})`, `rgba(217, 119, 6, ${opacity})`];

    return values?.[value] ?? values[0]
}