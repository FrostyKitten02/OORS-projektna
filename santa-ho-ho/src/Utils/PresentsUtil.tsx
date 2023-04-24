

export default class PresentsUtil {
    private constructor() {}

    static getShowOnlyAvaliable(storage: boolean, delivery: boolean) {
        if ((storage && delivery) || (!storage && !delivery)) {
            return undefined;
        } else if (!storage) {
            return false;
        }
        return true;
    }

}