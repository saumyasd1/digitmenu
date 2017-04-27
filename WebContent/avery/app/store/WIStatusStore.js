Ext.define('AOC.store.WIStatusStore', {
	extend : 'Ext.data.Store',
    model:'AOC.model.WIStatusModel',
	proxy:{
		type: 'rest',
		url:applicationContext+'/rest/wistatus/status',
        reader: {
            type: 'json',
            rootProperty:'status'
        }
	}
});

