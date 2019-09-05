package com.reactlibrary.GScrollView;

import android.util.Log;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

import javax.annotation.Nonnull;

public class GScrollViewManager extends ViewGroupManager<GScrollView> {
    protected static final String REACT_CLASS = "GScrollView";

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Nonnull
    @Override
    protected GScrollView createViewInstance(@Nonnull ThemedReactContext reactContext) {
        return new GScrollView(reactContext);
    }

    @Override
    public boolean needsCustomLayoutForChildren() {
        return true;
    }
}
