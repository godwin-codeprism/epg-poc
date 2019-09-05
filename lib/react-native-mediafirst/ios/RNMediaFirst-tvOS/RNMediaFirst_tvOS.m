//
//  RNMediaFirst_tvOS.m
//  RNMediaFirst-tvOS
//
//  Created by Godwin Vinny Carole on 22/05/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNMediaFirst.h"

@implementation RNMediaFirst

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

@end
