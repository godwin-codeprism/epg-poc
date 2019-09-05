package com.reactlibrary.views.scroll;

import android.util.Log;
import android.view.FocusFinder;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.views.scroll.ReactScrollView;
import com.reactlibrary.epg.cell.EPGCell;

public class GAndroidVerticalScrollView extends ReactScrollView{
    private ViewGroup previouslyFocused;
    public GAndroidVerticalScrollView(ReactContext context) {
        super(context);
        this.setHorizontalScrollBarEnabled(false);
        this.setVerticalScrollBarEnabled(false);

    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        // Call with the present values in order to re-epgcell if necessary
        ViewGroup parentFlatList = (ViewGroup) getChildAt(0);
        ViewGroup childFlatList = (ViewGroup) parentFlatList.getChildAt(0);
        parentFlatList.setFocusable(false);
        childFlatList.setFocusable(false);
        if(childFlatList instanceof GAndroidHorizontalScrollView){
            ViewGroup childViewGroup = (ViewGroup) childFlatList.getChildAt(0);
            for(int i = 0; i < childViewGroup.getChildCount(); i++){
                if(childViewGroup.getChildAt(i) instanceof EPGCell){
                    View currentCell = childViewGroup.getChildAt(i);
                    if(childViewGroup.getChildAt(i + 1) != null){
                        currentCell.setNextFocusDownId(childViewGroup.getChildAt(i + 1).getId());
                    }else{
                        currentCell.setNextFocusDownId(childViewGroup.getChildAt(i).getId());
                        Log.i("Godwin:: ", ""+ childViewGroup.getChildAt(i).getId());
                    }
                }

            }

        }
    }

    @Override
    public boolean arrowScroll(int direction) {
//        if(this.getFocusedChild() != null && this.getFocusedChild() instanceof ViewGroup){
//            ViewGroup viewGroup = (ViewGroup) this.getFocusedChild();
//            ViewGroup viewGroup1 = (ViewGroup) viewGroup.getFocusedChild();
//            ViewGroup viewGroup2 = (ViewGroup) viewGroup1.getFocusedChild();
//            ViewGroup viewGroup3 = (ViewGroup) viewGroup2.getFocusedChild();
//            if(previouslyFocused != null && previouslyFocused.equals(viewGroup3)){
//                Log.i("Godwin Vertical", "Focus didn't Change " + viewGroup3.indexOfChild(viewGroup2));
//                previouslyFocused.requestFocus();
//                return false;
//
//            }else{
//                previouslyFocused = viewGroup3;
//                Log.i("Godwin Vertical", "" + viewGroup3.getId());
//                return super.arrowScroll(direction);
//            }
//
//        }else{
//            Log.i("Godwin Vertical", "Empty Focus Vertical");
//            return false;
//        }
        return super.arrowScroll(direction);
    }

}
