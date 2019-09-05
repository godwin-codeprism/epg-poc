import { NativeModules, PlatformOSType, Platform } from "react-native";
export type DeviceTypes = "Mobile" | "Tablet" | "TV";
const SupporedOS = ["ios" , "android" , "macos" , "windows" ,"web"];
interface MediaFirstConfig {
    enableLogger: boolean;
    os: PlatformOSType;
    deviceType: DeviceTypes;
    enableTraceLogs?: boolean;
}
let isLibraryInitialized = false;
let mediaFirstConfig: MediaFirstConfig = { enableLogger: false, os: Platform.OS, deviceType: "TV" };
export class MediaFirst {
    static init(config: MediaFirstConfig) {
        if (!config.os && !SupporedOS.includes(config.os)) {
            throw new Error("E1008 os prop must be valid.");
        }
        isLibraryInitialized = true;
        mediaFirstConfig = { ...config };
        if (mediaFirstConfig.enableLogger) {
            console.log("Please make sure to disable the logs for release version");
        }
    }
    static enableLogger(enableLogger: boolean) {
        this.validateLibraryInit();
        mediaFirstConfig.enableLogger = enableLogger;
        if (NativeModules && NativeModules.MediaFirstModule && NativeModules.MediaFirstModule.buildType === "release") {
            console.log("Found, build type as release disabling the logger");
            mediaFirstConfig.enableLogger = false;
        }
    }
    static getMediaFirstConfig() {
        this.validateLibraryInit();
        return mediaFirstConfig;
    }
    static validateLibraryInit() {
        if (!isLibraryInitialized) {
            console.log("E1007 Ensure you are calling mediafirst init method");
            throw new Error("E1007 Ensure you are calling react-native-mediafirst init method");
        }
    }
}
