Ext.define('AOC.store.PartnerManagementStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.PartnerManagementModel',
	storeId:'PartnerManagementStoreId',
	autoLoad:true,
	remoteSort:false,
	proxy: {
        type: 'rest',
        limitParam:'',
        startParam:'',
        pageParam:'',
        url: applicationContext+'/rest/partners/all',
        reader: {
            type: 'json',
            rootProperty: 'partners'
        }
    }
});

