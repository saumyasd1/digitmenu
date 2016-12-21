
Ext.define('AOC.store.ViewMailformStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.ViewMailModel',
	autoLoad : true,
	remoteSort: true,
	totalCount:'total',
	storeId:'ViewMailformStoreId'
});

