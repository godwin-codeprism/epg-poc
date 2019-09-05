//
//  EPGCell.h
//  mediaFirstUser
//
//  Created by Godwin Vinny Carole on 22/05/19.
//  Copyright © 2019 Godwin VC. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTViewManager.h>

@class RCTEventDispatcher;

@interface EPGCell : UIView

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

@end

@interface EPGCellManager : RCTViewManager

@end
