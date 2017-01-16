Ext.define('AOC.store.OrderLineStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.OrderLineModel',
	//storeId:'orderLineStoreId',
	autoLoad : true,
	pageSize:pageSize,
	proxy: {
		type: 'rest',
		url: applicationContext + '/rest/orderLines/order',
		reader: {
			type: 'json',
			rootProperty: 'orderLine'
		}
	}
});
