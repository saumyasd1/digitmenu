Ext.define('AOC.store.BillShipMappingStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.BillShipMappingModel',
	autoLoad:false,
	pageSize:pageSize,
	proxy: {
        type: 'rest',
        method:'GET',
        url : applicationContext+ '/rest/billship/productline',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
