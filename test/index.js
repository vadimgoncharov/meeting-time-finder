const test              = require('tape');
const {
    getFirstFreeSharedStartTime,
} = require('../');

const schedulesNotArraySchedules = null;
const intervalsNotArraySchedules = [{}, ''];
const intervalNotArraySchedules = [[{}, {}], ['', '']];
const notStrTimeSchedules = [[[10, 20]]];
const invalidTimeSchedules = [[['09s10', 'sd1031']]];

const schedules = [
    [['09:00', '11:30'], ['13:30', '16:00'], ['17:45', '19:00']],
    [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
    [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']],
];

const schedulesMorning = [
    [['09:15', '19:00']],
    [['09:10', '10:00']]
];

test('meetingTimeFinder', t => {

    test('validation', t => {
        t.throws(() => {
            getFirstFreeSharedStartTime(schedulesNotArraySchedules, 60);
        }, 'Should throw "schedules_not_array" error');

        t.throws(() => {
            getFirstFreeSharedStartTime(intervalsNotArraySchedules, 60);
        }, 'Should throw "intervals_not_array" error');

        t.throws(() => {
            getFirstFreeSharedStartTime(intervalNotArraySchedules, 60);
        }, 'Should throw "interval_not_array" error');

        t.throws(() => {
            getFirstFreeSharedStartTime(notStrTimeSchedules, 60);
        }, 'Should throw "invalid_interval_time_format" error');

        t.throws(() => {
            getFirstFreeSharedStartTime(invalidTimeSchedules, 60);
        }, 'Should throw "invalid_interval_time_format" error');

        t.end();
    });
    
    test('process', t => {
        t.equal(getFirstFreeSharedStartTime(schedules, 60), '12:15');
        t.equal(getFirstFreeSharedStartTime(schedules, 1000), null);
        
        t.equal(getFirstFreeSharedStartTime(schedulesMorning, 10), '09:00');

        t.end();
    });
    
    t.end();
});
