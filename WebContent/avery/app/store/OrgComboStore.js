Ext.define('AOC.store.OrgComboStore', {
	extend : 'Ext.data.Store',
	fields:['id','name'],
	storeId:'orgComboStoreId',
	proxy: {
        type: 'rest',
        url : applicationContext+'/rest/org',
        reader: {
            type: 'json'
        }
    }
});