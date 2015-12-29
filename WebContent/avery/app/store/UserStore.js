Ext.define('AOC.store.UserStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.UserModel',
	autoLoad : true,
	remoteSort: true,
	totalCount:'total',
	pageSize:pageSize,
	storeId:'UserStoreId'
});

