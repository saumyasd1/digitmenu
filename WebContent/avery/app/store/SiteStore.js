Ext.define('AOC.store.SiteStore', {
	extend : 'Ext.data.Store',
	fields:['id','name'],
	autoLoad:true,
	proxy: {
        type: 'rest',
        url : applicationContext+'/rest/site',
        reader: {
            type: 'json',
            rootProperty : 'ArrayList'
        }
    }
});

