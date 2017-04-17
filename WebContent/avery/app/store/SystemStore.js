Ext.define('AOC.store.SystemStore', {
	extend : 'Ext.data.Store',
	fields:['id','name','siteId'],
	autoLoad:false,
	remoteSort: true,
	totalCount:'total',
	pageSize:pageSize,
	proxy: {
        type: 'rest',
        url: applicationContext+'/rest/system',
        reader: {
            type: 'json',
            rootProperty: 'system',
            totalProperty: 'totalCount'
        },
        headers: {
            "Authorization": "Basic YWRtaW46aW5kaWdvMQ=="
        }
    }
});

