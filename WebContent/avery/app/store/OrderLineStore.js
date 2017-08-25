Ext.define('AOC.store.OrderLineStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.OrderLineModel',
	pageSize:pageSize,
	sorters: [{
		property: 'sortingId',
		direction: 'ASC'
	}],
	proxy: {
		type: 'rest',
		url: applicationContext + '/rest/orderLines/order',
		reader: {
			type: 'json',
			rootProperty: 'orderLine'
		}
	}
});
