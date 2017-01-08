Ext.define('AOC.store.OrderConfiguration', {
	extend : 'Ext.data.Store',
	fields:['variableFieldName'],
	//storeId:'siteId',
	autoLoad:true,
	proxy: {
        type: 'rest',
        url : applicationContext+'/rest/orderconfigurations',
        reader: {
            type: 'json',
            rootProperty : 'variable'
        }
    }
});