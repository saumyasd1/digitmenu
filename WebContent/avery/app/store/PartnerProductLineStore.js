Ext.define('AOC.store.PartnerProductLineStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.PartnerProductLineModel',
	autoLoad : true,
	remoteSort: true,
	totalCount:'total',
	storeId:'PartnerProductLineStoreStoreId',
	proxy: {
        type: 'ajax',
       //   url : 'custom/AOC/app/data/PartnerProductLine.json',
      
        reader: {
            type: 'json',
            rootProperty: 'partnerproductline'
        }
    }
});

