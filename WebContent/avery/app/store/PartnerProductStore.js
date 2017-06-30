Ext.define('AOC.store.PartnerProductStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.PartnerProductLineModel',
	autoLoad : false,
	totalCount:'total',
//	storeId:'PartnerProductLineStoreStoreId',
	proxy: {
        type: 'rest',
        url : applicationContext+'/rest/productLines',
        reader: {
            type: 'json',
            rootProperty: 'productlines'
        }
    }
});