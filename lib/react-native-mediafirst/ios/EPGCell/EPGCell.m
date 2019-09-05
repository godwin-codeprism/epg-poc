//
//  EPGCell.m
//  mediaFirstUser
//
//  Created by Godwin Vinny Carole on 22/05/19.
//  Copyright © 2019 Godwin VC. All rights reserved.
//

#import "EPGCell.h"
#import <React/RCTConvert.h>

@implementation EPGCell: UIView {
    RCTEventDispatcher *_eventDispatcher;
    UIButton *EPGCellButton;
    NSNumber *_activeBackgroundColor;
    NSString *_text;
}

-(instancetype) initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
  if((self = [super init])){
      _eventDispatcher = eventDispatcher;
      _text = @"NA";
      _activeBackgroundColor = 0;
    
  }
  
  return self;
}

-(void)didUpdateFocusInContext:(UIFocusUpdateContext *)context withAnimationCoordinator:(UIFocusAnimationCoordinator *)coordinator{
    EPGCellButton.isFocused ? [EPGCellButton setBackgroundColor:[RCTConvert UIColor:_activeBackgroundColor]] : [EPGCellButton setBackgroundColor:[UIColor blueColor]];
}

-(void)layoutSubviews
{
  [super layoutSubviews];
  EPGCellButton = [UIButton buttonWithType:UIButtonTypeCustom];
  EPGCellButton.frame = self.bounds;
  [EPGCellButton setTitle:_text forState:UIControlStateNormal];
  [EPGCellButton  setBackgroundColor:[UIColor blueColor]];
  [self addSubview:EPGCellButton];
}

-(void)setActiveBackgroundColor:(NSNumber *)activeBackgroundColor{
    _activeBackgroundColor = activeBackgroundColor;
}

-(void)setText:(NSString *)text{
    _text = text;
}

@end

@implementation EPGCellManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

-(UIView *)view
{
  return [[EPGCell alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

RCT_EXPORT_VIEW_PROPERTY(activeBackgroundColor, NSNumber);
RCT_EXPORT_VIEW_PROPERTY(text, NSString);

@end
