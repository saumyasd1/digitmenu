Ext.define('AOC.store.SalesOrderStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.SalesOrderModel',
	autoLoad : true,
	sorters: [{
		property: 'sortingId',
		direction: 'ASC'
	}]
});
