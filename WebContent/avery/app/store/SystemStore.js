Ext.define('AOC.store.SystemStore', {
	extend : 'Ext.data.Store',
	fields:['id','name','siteId'],
//	model:'AOC.model.PartnerManagementModel',
	//autoLoad : true,
	autoLoad:false,
	remoteSort: true,
	totalCount:'total',
	pageSize:pageSize,
	//storeId:'SystemId',
	proxy: {
        type: 'rest',
        //url : 'aoc/Partner/GET?action=getList',
        url         : applicationContext+'/rest/system',
        reader      : {
            type          : 'json',
            rootProperty          : 'system',
            totalProperty : 'totalCount'
        },
        headers     : {
            "Authorization" : "Basic YWRtaW46aW5kaWdvMQ=="
        }
        
    }
});

