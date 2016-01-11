Ext.define('AOC.store.PartnerManagementStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.PartnerManagementModel',
	autoLoad : true,
	remoteSort: true,
	totalCount:'total',
	pageSize:pageSize,
	storeId:'PartnerManagementStoreId'
});

