const mergeSchedules    = require('./components/mergeSchedules');
const validateSchedules = require('./components/validateSchedules');
const {
    busyToFree,
    filterByDuration,
} = require('./components/intervalHelpers');


const meetingTimeFinder = (schedulesWithBusyIntervals, duration = 60) => {
    const validationResult = validateSchedules(schedulesWithBusyIntervals);
    
    if (validationResult !== true) {
        throw new Error(validationResult);
    }

    const schedulesWithFreeIntervals = schedulesWithBusyIntervals
        .map(busyIntervals => busyToFree(busyIntervals))
        .map(freeIntervals => filterByDuration(freeIntervals, duration));
    
    const mergedFreeIntervals = mergeSchedules(schedulesWithFreeIntervals, duration);

    return mergedFreeIntervals;
};

const getFirstFreeSharedStartTime = (schedulesWithBusyIntervals, duration) => {
    const mergedFreeIntervals = meetingTimeFinder(schedulesWithBusyIntervals, duration);

    if (mergedFreeIntervals.length === 0) {
        return null;
    }
    else {
        return mergedFreeIntervals[0].from;
    }
}

module.exports = {
    getFirstFreeSharedStartTime,
};
