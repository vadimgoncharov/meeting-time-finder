const hhmmToMins = hhmm => {
    const [hh, mm] = hhmm.split(':');
    const mins = parseInt(hh) * 60 + parseInt(mm);

    return mins;
};

const minsToHhmm = mins => {
    let hh = parseInt(mins / 60);
    let mm = mins % 60;

    if (hh < 10) {
        hh = `0${hh}`;
    }

    if (mm < 10) {
        mm = `0${mm}`;
    }

    return `${hh}:${mm}`
};

const minsToHhmmInInterval = interval => {
    return {
        from: minsToHhmm(interval.from),
        to: minsToHhmm(interval.to),
    };
};

const hhmmToMinsInInterval = interval => {
    return {
        from: hhmmToMins(interval.from),
        to: hhmmToMins(interval.to),
    };
};

module.exports = {
    hhmmToMins,
    minsToHhmm,
    minsToHhmmInInterval,
    hhmmToMinsInInterval,
};
