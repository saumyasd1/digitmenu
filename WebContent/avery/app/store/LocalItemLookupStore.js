Ext.define('AOC.store.LocalItemLookupStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.LocalItemLookupModel',
	pageSize:pageSize,
	storeId:'localItemLookupStoreId',
	pageSize:pageSize,
	proxy:{
		type:'rest',
		url: applicationContext+'/rest/localitem',
		reader:{
	        type:'json', 
	        rootProperty:'localitem',
            totalProperty: 'totalCount'
	    }
	},
	sorters: [{
 		property:'lastModifiedDate',
 		direction:'DESC'
	}]
});

