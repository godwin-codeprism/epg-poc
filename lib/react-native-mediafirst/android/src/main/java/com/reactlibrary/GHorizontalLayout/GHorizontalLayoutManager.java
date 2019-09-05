package com.reactlibrary.GHorizontalLayout;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

import javax.annotation.Nonnull;

public class GHorizontalLayoutManager extends ViewGroupManager<GHorizontalLayout> {
    protected static final String REACT_CLASS = "GHorizontalLayout";

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Nonnull
    @Override
    protected GHorizontalLayout createViewInstance(@Nonnull ThemedReactContext reactContext) {
        return new GHorizontalLayout(reactContext);
    }

    @Override
    public boolean needsCustomLayoutForChildren() {
        return true;
    }
}
