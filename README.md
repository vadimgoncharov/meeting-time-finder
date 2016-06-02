# Meeting Time Finder

[![Build Status](https://img.shields.io/travis/vadimgoncharov/meeting-time-finder/master.svg)](https://travis-ci.org/vadimgoncharov/meeting-time-finder)
[![Coverage Status](https://img.shields.io/coveralls/vadimgoncharov/meeting-time-finder/master.svg)](https://coveralls.io/r/vadimgoncharov/meeting-time-finder)

The businessmen among you will know that it's often not easy to find an appointment. In this task we want to find such an appointment automatically. You will be given the calendars of our businessmen and a duration for the meeting. Your task is to find the earliest time, when every businessman is free for at least that duration.
     
## Requirements

* All times in the calendars will be given in 24h format "hh:mm", the result must also be in that format
* A meeting is represented by its start time (inclusively) and end time (exclusively) -> if a meeting takes place from 09:00 - 11:00, the next possible start time would be 11:00
* The businessmen work from 09:00 (inclusively) - 19:00 (exclusively), the appointment must start and end within that range
* If the meeting does not fit into the schedules, return `null`
* The duration of the meeting will be provided as an integer in minutes

Following these rules and looking at the example below the earliest time for a 60 minutes meeting would be 12:15.

## Example Schedule

Person | Meetings
-------|-----------------------------------------------------------
     A | 09:00 - 11:30, 13:30 - 16:00, 16:00 - 17:30, 17:45 - 19:00
     B | 09:15 - 12:00, 14:00 - 16:30, 17:00 - 17:30
     C | 11:30 - 12:15, 15:00 - 16:30, 17:45 - 19:00

## Data Format

The schedule will be provided as 3-dimensional array. The schedule above would be encoded this way:

```js
let schedules = [
  [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
  [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
  [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
];
```