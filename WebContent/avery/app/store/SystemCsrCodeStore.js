Ext.define('AOC.store.SystemCsrCodeStore', {
	extend : 'Ext.data.Store',
	fields:['id','csrCode'],
	autoLoad:false,
	remoteSort: true,
	totalCount:'total',
	pageSize:pageSize,
	proxy: {
        type: 'rest',
        url: applicationContext+'/rest/systemcsrcode/list',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        },
        headers: {
            "Authorization": "Basic YWRtaW46aW5kaWdvMQ=="
        }
    }
});

