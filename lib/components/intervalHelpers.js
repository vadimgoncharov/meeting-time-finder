const {
    hhmmToMins,
} = require('./timeHelpers');

const busyToFree = busyIntervalsWithoutEdges => {
    const busyIntervals = addEdges(busyIntervalsWithoutEdges);
    
    const freeIntervals = busyIntervals.reduce((freeIntervals, currBusyInterval, index) => {
        const reachEnd = index === busyIntervals.length - 1;

        if (reachEnd) {
            return freeIntervals;
        }

        const nextBusyInterval          = busyIntervals[index + 1];
        const nextBusyIntervalFrom      = nextBusyInterval[0];
        const currBusyIntervalTo        = currBusyInterval[1];

        freeIntervals.push({
            from:   currBusyIntervalTo,
            to:     nextBusyIntervalFrom,
        });

        return freeIntervals;
    }, []);
    
    return freeIntervals;
};

const addEdges = busyIntervals => {
      return [['09:00', '09:00']].concat(busyIntervals).concat([['19:00', '19:00']]);
};

const filterByDuration = (intervals, duration) => {
    return intervals.filter(freeInterval => {
        return hhmmToMins(freeInterval.to) - hhmmToMins(freeInterval.from) >= duration;
    });
};

module.exports = {
    busyToFree,
    filterByDuration,
};
