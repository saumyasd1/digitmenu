Ext.define('AOC.store.PartnerManagementStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.PartnerManagementModel',
	//remoteSort: true,
	totalCount:'total',
	pageSize:pageSize,
	storeId:'PartnerManagementStoreId',
	proxy: {
        type: 'rest',
        url: applicationContext+'/rest/partners',
        reader: {
            type: 'json',
            rootProperty: 'partners',
            totalProperty: 'totalCount'
        },
        headers: {
            "Authorization" : "Basic YWRtaW46aW5kaWdvMQ=="
        }
    },
    sorters: [{
 		property:'lastModifiedDate',
 		direction:'DESC'
	}]
});

