Ext.define('AOC.store.OrgStore', {
	extend : 'Ext.data.Store',
	fields:['id','name','systemId'],
	autoLoad:true,
	proxy: {
        type: 'rest',
        limitParam:'',
        startParam:'',
        pageParam:'',
        url : applicationContext+'/rest/org',
        reader: {
            type: 'json'
        }
    }
});