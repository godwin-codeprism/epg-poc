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
public class GAndroidHorizontalScrollViewManager extends ViewGroupManager<GAndroidHorizontalScrollView> {
    protected static final String REACT_CLASS = "GAndroidHorizontalScrollView";

    public String getName(){return REACT_CLASS;}

    @Nonnull
    @Override
    protected GAndroidHorizontalScrollView createViewInstance(@Nonnull ThemedReactContext reactContext) {
        return new GAndroidHorizontalScrollView(reactContext);
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return super.getConstants();
    }
}
