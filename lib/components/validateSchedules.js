const ERROR_TYPES = require('./errorTypes');

const validateSchedules = schedules => {
    if (!Array.isArray(schedules)) {
        return ERROR_TYPES.schedules_not_array;
    }

    for (let i = 0; i < schedules.length; i += 1) {
        const intervals = schedules[i];
        const intervalValidationResult = validateIntervals(intervals);

        if (intervalValidationResult !== true) {
            return intervalValidationResult;
        }
    }

    return true;
};

const validateIntervals = intervals => {
    if (!Array.isArray(intervals)) {
        return ERROR_TYPES.intervals_not_array;
    }

    for (let i = 0; i < intervals.length; i += 1) {
        const interval = intervals[i];
        const intervalValidationResult = validateInterval(interval);

        if (intervalValidationResult !== true) {
            return intervalValidationResult;
        }
    }

    return true;
};

const RE_INTERVAL_FORMAT = /^[0-2][0-9]:[0-9][0-9]$/;

const validateInterval = interval => {
    if (!Array.isArray(interval) || interval.length !== 2) {
        return ERROR_TYPES.interval_not_array;
    }

    const [from, to]    = interval;

    const isValidFrom   = (typeof from === 'string' && from.match(RE_INTERVAL_FORMAT));
    const isValidTo     = (typeof to === 'string' && to.match(RE_INTERVAL_FORMAT));

    if (!isValidFrom || !isValidTo) {
        return ERROR_TYPES.invalid_interval_time_format;
    }

    return true;
};

module.exports = validateSchedules;
