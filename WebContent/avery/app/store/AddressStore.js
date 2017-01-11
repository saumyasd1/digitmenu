Ext.define('AOC.store.AddressStore', {
	extend : 'Ext.data.Store',
	requires:['AOC.model.AddressModel'],
	model:'AOC.model.AddressModel',
	remoteFilter: true,
	remoteSort: true,
	totalProperty:'total',
	totalCount:'total',
	storeId:'AddressStoreId',
	pageSize:pageSize,
	proxy: {
        type: 'rest',
        url         : applicationContext+'/rest/address',
        reader      : {
            type          : 'json',
            rootProperty          : 'address',
            totalProperty : 'totalCount'
        },
        headers     : {
            "Authorization" : "Basic YWRtaW46aW5kaWdvMQ=="
        }
        
    }
});

