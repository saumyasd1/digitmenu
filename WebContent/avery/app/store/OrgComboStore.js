Ext.define('AOC.store.OrgComboStore', {
	extend : 'Ext.data.Store',
	fields:['id','name'],
	autoLoad:false,
	proxy: {
        type: 'rest',
        url : applicationContext+'/rest/org',
        reader: {
            type: 'json'
        }
    }
});