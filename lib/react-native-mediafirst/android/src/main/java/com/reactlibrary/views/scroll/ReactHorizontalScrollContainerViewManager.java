//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.reactlibrary.views.scroll;

import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

import java.util.Map;

import javax.annotation.Nullable;

import static com.reactlibrary.views.scroll.ReactHorizontalScrollContainerViewManager.REACT_CLASS;

@ReactModule(
    name = REACT_CLASS
)
public class ReactHorizontalScrollContainerViewManager extends ViewGroupManager<ReactHorizontalScrollContainerView> {
    protected static final String REACT_CLASS = "CustomAndroidHorizontalScrollContentView";

    public String getName() {
        return REACT_CLASS;
    }

    public ReactHorizontalScrollContainerView createViewInstance(ThemedReactContext context) {
        return new ReactHorizontalScrollContainerView(context);
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return super.getConstants();
    }
}
