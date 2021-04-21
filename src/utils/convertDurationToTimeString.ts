export function convertDurationToTimeString(durationInSeconds: number): string {
    const hour = Math.floor(durationInSeconds / (60 * 60))
    const minutes = Math.floor((durationInSeconds % (60 * 60)) / 60)
    const seconds = durationInSeconds % 60

    const result = [hour, minutes, seconds]
        .map(unit => String(unit).padStart(2, '0'))
        .join(':')

    return result
}