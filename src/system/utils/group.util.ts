export const groupDataByFiled = <T>(data: T[], field: string) => {
    const groupedData = data.reduce((acc: { [key: string]: T[] }, curr: T) => {
        const key = (curr as any)[field]
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push(curr)
        return acc
    }, {})
    return groupedData
}
