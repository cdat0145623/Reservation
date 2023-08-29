export const dayDifference = (dayStart, dayEnd) => {
    const MILISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
    const timeDiff = Math.abs(dayEnd?.getTime() - dayStart?.getTime());
    const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
    return diffDays;
};
