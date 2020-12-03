import * as moment from 'moment';

export abstract class DateUtils {
    static isBetween(dateToCheck, start, end) {
        return moment(dateToCheck).isBetween(start, end);
    }

    static isValidDate(date): boolean {
        const momentDate = moment(new Date(date));
        return momentDate.isValid();
    }

    static isBefore(endDate, startDate = new Date()): boolean {
        return moment(endDate).isBefore(startDate);
    }

    static isAfter(startDate, endDate): boolean {
        return moment(startDate).isAfter(endDate);
    }

    static fromNow(date: Date) {
        return moment(date).fromNow();
    }
}