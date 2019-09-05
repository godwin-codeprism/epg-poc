
package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.Map;
import javax.annotation.Nullable;

public class MediaFirstModule extends ReactContextBaseJavaModule {

    private static final String APPLICATION_ID = "applicationId";
    private static final String BUILD_TYPE = "buildType";
    private static final String DEBUG = "isDebug";
    private static final String FLAVOR = "flavor";
    private static final String VERSION_CODE = "versionCode";
    private static final String VERSION_NAME = "versionName";
    private final ReactApplicationContext reactContext;

    public MediaFirstModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(APPLICATION_ID, BuildConfig.APPLICATION_ID);
        constants.put(BUILD_TYPE, BuildConfig.BUILD_TYPE);
        constants.put(DEBUG, BuildConfig.DEBUG);
        constants.put(FLAVOR, BuildConfig.FLAVOR);
        constants.put(VERSION_CODE, BuildConfig.VERSION_CODE);
        constants.put(VERSION_NAME, BuildConfig.VERSION_NAME);
        return constants;
    }

    @Override
    public String getName() {
        return "MediaFirstModule";
    }
}