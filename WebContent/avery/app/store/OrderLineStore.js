Ext.define('AOC.store.OrderLineStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.OrderLineModel',
	autoLoad : true,
	pageSize:pageSize
});
