Ext.define('AOC.store.OrgStore', {
	extend : 'Ext.data.Store',
	fields:['id','name','systemId'],
	//storeId:'siteId',
	autoLoad:false,
	proxy: {
        type: 'rest',
        url : applicationContext+'/rest/org',
        reader: {
            type: 'json',
            rootProperty : 'org'
        }
    }
});