Ext.define('AOC.store.PartnerProductLineStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.PartnerProductLineModel',
	remoteSort: true,
	totalCount:'total',
	autoLoad:true,
	storeId:'PartnerProductLineStoreStoreId',
	proxy: {
        type: 'rest',
        url : applicationContext+'/rest/productLines/productLineType',
        reader: {
            type: 'json',
            rootProperty: 'ArrayList'
        }
    }
});

