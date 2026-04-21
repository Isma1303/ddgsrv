const getFirstDayOfWeek = (date: Date) => {
    const day = date.getDay()
    const difference = date.getDate() - (day === 0 ? 0 : day)
    return new Date(date.setDate(difference))
}

const getLastDayOfWeek = (date: Date) => {
    const day = date.getDay()
    const difference = date.getDate() + (day === 6 ? 0 : 6 - day)
    return new Date(date.setDate(difference))
}

const getDateByWeekOfYear = (p: { year: number; week: number }): Date => {
    const simple = new Date(p.year, 0, 1 + (p.week - 1) * 7)
    const dayOfWeek = simple.getDay()
    const ISOweekStart = simple
    if (dayOfWeek <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1)
    else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay())
    return ISOweekStart
}

export { getFirstDayOfWeek, getLastDayOfWeek, getDateByWeekOfYear }
