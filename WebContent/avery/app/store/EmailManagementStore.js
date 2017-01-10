Ext.define('AOC.store.EmailManagementStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.EmailManagementModel',
	pageSize:pageSize,
	storeId:'EmailManagementStoreId',
	proxy: {
        type: 'rest',
        url: applicationContext+'/rest/emailqueue',
        reader: {
            type: 'json',
            rootProperty: 'emailqueue',
            totalProperty: 'totalCount'
        }
	},
	sorters: [{
 		property:'lastModifiedDate',
 		direction:'DESC'
 	}]
     
});

