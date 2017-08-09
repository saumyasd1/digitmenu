Ext.define('AOC.store.PartnerComboStore', {
	extend : 'Ext.data.Store',
//	model:'AOC.model.PartnerManagementModel',
	fields:['name','id','site'],
	storeId:'partnerStoreId',
	remoteSort:false,
	proxy: {
        type: 'rest',
        limitParam:'',
        startParam:'',
        pageParam:'',
        url: applicationContext+'/rest/partners',
        reader: {
            type: 'json',
            rootProperty: 'partners'
        }
    }
});

