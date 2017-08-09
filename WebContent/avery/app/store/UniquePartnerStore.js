Ext.define('AOC.store.UniquePartnerStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.UniquePartnerModel',
	remoteSort: true,
	storeId:'uniquePartnerStoreId',
	proxy: {
        type: 'rest',
        limitParam:'',
        startParam:'',
        pageParam:'',
        url: applicationContext+'/rest/productLines/uniquepartners',
        reader: {
            type: 'json'
        }
    }
});

