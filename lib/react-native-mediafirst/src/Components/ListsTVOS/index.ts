const SmartFlatList = process.env.NODE_ENV === 'web' ? require('./FlatListTVOS.web').default : require('./FlatListTVOS').default;
export { SmartFlatList };
