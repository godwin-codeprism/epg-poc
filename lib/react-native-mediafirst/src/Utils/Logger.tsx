import { MediaFirst } from "../MediaFirst";
export class Logger {
    static error(message?: any, ...optionalParams: any[]) {
        if (!MediaFirst.getMediaFirstConfig().enableLogger) {
            return;
        }
        console.error(message, ...optionalParams);
    }
    static log(message?: any, ...optionalParams: any[]) {
        if (!MediaFirst.getMediaFirstConfig().enableLogger) {
            return;
        }
        if (MediaFirst.getMediaFirstConfig().enableTraceLogs) {
            Logger.trace(message, ...optionalParams);
            return;
        }
        console.log(message, ...optionalParams);
    }
    static warn(message?: any, ...optionalParams: any[]) {
        if (!MediaFirst.getMediaFirstConfig().enableLogger) {
            return;
        }
        console.warn(message, ...optionalParams);
    }
    static trace(message?: any, ...optionalParams: any[]) {
        if (!MediaFirst.getMediaFirstConfig().enableLogger) {
            return;
        }
        console.trace(message, ...optionalParams);
    }
    static debug(message?: any, ...optionalParams: any[]) {
        if (!MediaFirst.getMediaFirstConfig().enableLogger) {
            return;
        }
        console.debug(message, ...optionalParams);
    }
    static table(message?: any, ...optionalParams: any[]) {
        if (!MediaFirst.getMediaFirstConfig().enableLogger) {
            return;
        }
        console.table(message, ...optionalParams);
    }
}
