Ext.define('AOC.store.WIBillShipMappingStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.WIBillShipMappingModel',
	autoLoad:false,
	proxy: {
        type: 'rest',
        url : applicationContext+ '/rest/wibillship',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
