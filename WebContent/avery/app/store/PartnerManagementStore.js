Ext.define('AOC.store.PartnerManagementStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.PartnerManagementModel',
	autoLoad : true,
	remoteSort: true,
	totalCount:'total',
	pageSize:pageSize,
	storeId:'PartnerManagementStoreId',
	proxy: {
        type: 'rest',
        //url : 'aoc/Partner/GET?action=getList',
        url         : applicationContext+'/rest/partners',
        reader      : {
            type          : 'json',
            rootProperty          : 'partners',
            totalProperty : 'totalCount'
        },
        headers     : {
            "Authorization" : "Basic YWRtaW46aW5kaWdvMQ=="
        }
        
    }
});

