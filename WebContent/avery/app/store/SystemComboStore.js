Ext.define('AOC.store.SystemComboStore', {
	extend : 'Ext.data.Store',
	fields:['id','name'],
	autoLoad:false,
	proxy: {
        type: 'rest',
        url: applicationContext+'/rest/system/systemlist',
        reader: {
            type: 'json'
        }
    }
});
