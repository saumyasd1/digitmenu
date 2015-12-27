Ext.define('AOC.store.OrderQueueStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.OrderQueueModel',
	autoLoad : true,
	pageSize:pageSize
});
