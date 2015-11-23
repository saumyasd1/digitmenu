Ext.define('AOC.store.AddressStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.AddressModel',
	remoteFilter: true,
	remoteSort: true,
	totalProperty:'total',
	totalCount:'total',
	storeId:'AddressStoreId',
	proxy: {
        type: 'rest',
        //url : 'aoc/Partner/GET?action=getList',
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

