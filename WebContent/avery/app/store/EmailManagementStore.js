Ext.define('AOC.store.EmailManagementStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.EmailManagementModel',
	//autoLoad : true,
	remoteSort: true,
	totalCount:'total',
	pageSize:pageSize,
	storeId:'EmailManagementStoreId',

});

