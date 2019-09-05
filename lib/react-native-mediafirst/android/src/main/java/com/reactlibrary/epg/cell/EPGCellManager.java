package com.reactlibrary.epg.cell;


import android.util.Log;
import android.view.View;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import javax.annotation.Nonnull;

public class EPGCellManager extends ViewGroupManager<EPGCell> {

    protected static final String REACT_CLASS = "EPGCell";
    private EPGCell epgCell;

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Nonnull
    @Override
    protected EPGCell createViewInstance(@Nonnull ThemedReactContext reactContext) {
        epgCell = new EPGCell(reactContext);
        return epgCell;

    }

    @ReactProp(name = "showName")
    public void setShowName(View view, String prop){
        epgCell.setShowName(prop);
    }

    @ReactProp(name = "customId")
    public void setId(View view, Integer prop){
        epgCell.setId(prop);
    }
}
