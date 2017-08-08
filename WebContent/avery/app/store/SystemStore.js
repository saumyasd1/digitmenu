Ext.define('AOC.store.SystemStore', {
	extend : 'Ext.data.Store',
	fields:['id','name','siteId'],
	autoLoad:true,
	proxy: {
        type: 'rest',
        limitParam:'',
        startParam:'',
        pageParam:'',
        url: applicationContext+'/rest/system',
        reader: {
            type: 'json'
        }
    }
});

