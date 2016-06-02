const {
    minsToHhmmInInterval,
    hhmmToMinsInInterval,
} = require('./timeHelpers');

const mergeSchedules = (schedules, duration) => {
    return schedules.reduce((finalIntervals, intervals, index) => {
        const nextIntervals = schedules[index + 1];

        if (typeof nextIntervals === 'undefined') {
            return finalIntervals;
        }

        return mergeIntervals(finalIntervals, nextIntervals, duration);
    }, schedules[0]);
};

const getIntervalsIntersectionByDuration = (intervalA, intervalB, duration) => {
    const intervalsIntersection = getIntervalsIntersection(intervalA, intervalB);
    const isValidIntervalsIntersection = (
        intervalsIntersection !== null &&
        (intervalsIntersection.to - intervalsIntersection.from >= duration)
    );
    

    if (isValidIntervalsIntersection) {
        return intervalsIntersection;
    }
    else {
        return null;
    }
};

const getIntervalsIntersection = (intervalA, intervalB) => {
    let maxFrom = Math.max(intervalA.from, intervalB.from);
    let minTo   =  Math.min(intervalA.to, intervalB.to);

    const isIntersect = minTo - maxFrom > 0;

    if (isIntersect) {
        return {
            from:   maxFrom,
            to:     minTo,
        };
    }
    else {
        return null;
    }
};

const mergeIntervals = (intervalsA, intervalsB, duration) => {
    const mergedIntervals = [];

    for (let i = 0; i < intervalsA.length; i += 1) {
        for (let j = 0; j < intervalsB.length; j += 1) {
            const intervalsIntersection = getIntervalsIntersectionByDuration(
                hhmmToMinsInInterval(intervalsA[i]),
                hhmmToMinsInInterval(intervalsB[j]),
                duration
            );
            
            if (intervalsIntersection !== null) {
                mergedIntervals.push(minsToHhmmInInterval(intervalsIntersection));
            }
        }
    }
    
    return mergedIntervals;
};

module.exports = mergeSchedules;
