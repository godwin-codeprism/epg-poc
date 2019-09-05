// Copyright (c) 2004-present, Facebook, Inc.

// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

package com.reactlibrary.views.scroll;

import android.content.Context;
import android.util.Log;
import android.widget.HorizontalScrollView;

import com.facebook.react.modules.i18nmanager.I18nUtil;
import com.facebook.react.views.view.ReactViewGroup;

/** Container of Horizontal scrollViews that supports RTL scrolling. */
public class ReactHorizontalScrollContainerView extends ReactViewGroup {

  private int mLayoutDirection;
  private int mCurrentWidth;

  public ReactHorizontalScrollContainerView(Context context) {
    super(context);
    mLayoutDirection =
        I18nUtil.getInstance().isRTL(context) ? LAYOUT_DIRECTION_RTL : LAYOUT_DIRECTION_LTR;
    mCurrentWidth = 0;
    this.setFocusable(false);
  }

  @Override
  protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
    if (mLayoutDirection == LAYOUT_DIRECTION_RTL) {
      // When the epgcell direction is RTL, we expect Yoga to give us a epgcell
      // that extends off the screen to the left so we re-center it with left=0
      int newLeft = 0;
      int width = right - left;
      int newRight = newLeft + width;
      setLeft(newLeft);
      setRight(newRight);

      // Call with the present values in order to re-epgcell if necessary
      HorizontalScrollView parent = (HorizontalScrollView) getParent();
      // Fix the ScrollX position when using RTL language
      int offsetX = parent.getScrollX() + getWidth() - mCurrentWidth;
      parent.scrollTo(offsetX, parent.getScrollY());
    }
    mCurrentWidth = getWidth();
  }
}
