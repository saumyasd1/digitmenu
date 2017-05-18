Ext.define('AOC.store.UniquePartnerStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.PartnerManagementModel',
	remoteSort: true,
	totalCount:'total',
	pageSize:pageSize,
	storeId:'uniquePartnerStoreId',
	proxy: {
        type: 'rest',
        url         : applicationContext+'/rest/productLines/uniquepartners',
        reader      : {
            type          : 'json',
            rootProperty          : 'data',
            totalProperty : 'totalCount'
        },
        headers     : {
            "Authorization" : "Basic YWRtaW46aW5kaWdvMQ=="
        }
        
    },
    sorters: [{
 		property:'lastModifiedDate',
 		direction:'ASC'
 			}]
});

