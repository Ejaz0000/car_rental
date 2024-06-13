

export const CalculateDuration = (pickupDate, returnDate) => {
    const diffInMs = returnDate - pickupDate;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const weeks = Math.floor(diffInHours / (24 * 7));
    const days = Math.floor((diffInHours % (24 * 7)) / 24);
    const hours = diffInHours % 24;

    return {hour: hours, day: days, week: weeks};
}

 