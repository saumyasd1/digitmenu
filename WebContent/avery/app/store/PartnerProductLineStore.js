Ext.define('AOC.store.PartnerProductLineStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.PartnerProductLineModel',
	autoLoad : true,
	remoteSort: true,
	totalCount:'total',
	storeId:'PartnerProductLineStoreStoreId'
});

