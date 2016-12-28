Ext.define('AOC.store.PartnerProductLineStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.PartnerProductLineModel',
	autoLoad : true,
	remoteSort: true,
	totalCount:'total',
	storeId:'PartnerProductLineStoreStoreId',
	proxy: {
        type: 'rest',
        url         : applicationContext+'/rest/productLines/productLineType',
        reader      : {
            type          : 'json',
            rootProperty  : 'ArrayList'
        }
        
    }
});

