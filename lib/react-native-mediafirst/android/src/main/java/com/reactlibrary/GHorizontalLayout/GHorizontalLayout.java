package com.reactlibrary.GHorizontalLayout;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.widget.LinearLayout;

import androidx.annotation.Nullable;

public class GHorizontalLayout extends LinearLayout {
    public GHorizontalLayout(Context context) {
        super(context);
    }

    public GHorizontalLayout(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public GHorizontalLayout(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        super.onLayout(changed, l, t, r, b);
        setBackgroundColor(Color.GREEN);
    }
}
