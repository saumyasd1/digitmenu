Ext.define('AOC.store.WebformStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.WebformModel',
	remoteFilter: true,
	remoteSort: true,
	totalProperty:'total',
	totalCount:'total',
	storeId:'WebformStoreId'
});

