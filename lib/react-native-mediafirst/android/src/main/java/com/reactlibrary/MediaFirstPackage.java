
package com.reactlibrary;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.reactlibrary.GHorizontalLayout.GHorizontalLayout;
import com.reactlibrary.GHorizontalLayout.GHorizontalLayoutManager;
import com.reactlibrary.GScrollView.GScrollView;
import com.reactlibrary.GScrollView.GScrollViewManager;
import com.reactlibrary.epg.cell.EPGCellManager;
import com.reactlibrary.views.scroll.GAndroidHorizontalScrollViewManager;
import com.reactlibrary.views.scroll.GAndroidVerticalScrollViewManager;
import com.reactlibrary.views.scroll.ReactHorizontalScrollContainerViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class MediaFirstPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(new MediaFirstModule(reactContext));
    }

    // Deprecated from RN 0.47
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        ReactHorizontalScrollContainerViewManager reactHorizontalScrollContainerViewManager = new ReactHorizontalScrollContainerViewManager();
        GAndroidHorizontalScrollViewManager gAndroidHorizontalScrollViewManager = new GAndroidHorizontalScrollViewManager();
        GAndroidVerticalScrollViewManager gAndroidVerticalScrollViewManager = new GAndroidVerticalScrollViewManager();
        EPGCellManager epgCellManager = new EPGCellManager();
        GScrollViewManager gScrollViewManager = new GScrollViewManager();
        GHorizontalLayoutManager gHorizontalLayoutManager = new GHorizontalLayoutManager();
        return Arrays.<ViewManager>asList(
                reactHorizontalScrollContainerViewManager,
                gAndroidHorizontalScrollViewManager,
                gAndroidVerticalScrollViewManager,
                epgCellManager,
                gScrollViewManager,
                gHorizontalLayoutManager
        );
    }
}

