export const unique = <T>(arr: T[], key: (item: T) => string): T[] => {
    const seen = new Set<string>()
    return arr.filter((item) => {
        const k = key(item)
        if (seen.has(k)) return false
        seen.add(k)
        return true
    })
  }