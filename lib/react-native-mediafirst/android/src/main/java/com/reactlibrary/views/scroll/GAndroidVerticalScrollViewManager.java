package com.reactlibrary.views.scroll;

import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import static com.reactlibrary.views.scroll.ReactHorizontalScrollContainerViewManager.REACT_CLASS;

@ReactModule(
        name = REACT_CLASS
)
public class GAndroidVerticalScrollViewManager extends ViewGroupManager<GAndroidVerticalScrollView> {
    protected static final String REACT_CLASS = "GAndroidVerticalScrollView";

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Nonnull
    @Override
    protected GAndroidVerticalScrollView createViewInstance(@Nonnull ThemedReactContext reactContext) {
        return new GAndroidVerticalScrollView(reactContext);
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return super.getConstants();
    }
}
