Ext.define('AOC.store.PartnerProductStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.PartnerProductLineModel',
	autoLoad : false,
	totalCount:'total',
	pageSize:pageSize,
	proxy: {
        type: 'rest',
        url : applicationContext+'/rest/productLines',
        reader: {
            type: 'json',
            rootProperty: 'productlines',
            totalProperty: 'totalCount'
        }
    }
});