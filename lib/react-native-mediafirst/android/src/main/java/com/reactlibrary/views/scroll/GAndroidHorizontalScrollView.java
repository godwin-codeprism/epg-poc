package com.reactlibrary.views.scroll;

import android.content.Context;
import android.graphics.Rect;
import android.util.Log;
import android.view.ViewGroup;

import com.facebook.react.views.scroll.ReactHorizontalScrollView;

public class GAndroidHorizontalScrollView extends ReactHorizontalScrollView {

    public GAndroidHorizontalScrollView(Context context) {
        super(context);
        this.setHorizontalScrollBarEnabled(false);
        this.setVerticalScrollBarEnabled(false);
    }

    @Override
    public boolean arrowScroll(int direction) {
//        if(this.getFocusedChild() != null && this.getFocusedChild() instanceof ViewGroup){
//            ViewGroup viewGroup = (ViewGroup) this.getFocusedChild();
//            Log.i("Godwin Horizontal", "" + viewGroup.getId());
//            return super.arrowScroll(direction);
//        }else{
//            Log.i("Godwin Horizontal", "Empty Focus");
//            return false;
//        }

//        Log.i("Godwin", ""+ findFocus());
        return super.arrowScroll(direction);
    }
}
