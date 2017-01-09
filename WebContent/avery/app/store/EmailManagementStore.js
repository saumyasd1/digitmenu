Ext.define('AOC.store.EmailManagementStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.EmailManagementModel',
	//autoLoad : true,
	totalCount:'totalCount',
	pageSize:pageSize,
	storeId:'EmailManagementStoreId',
	proxy: {
        type: 'rest',
        url: applicationContext+'/rest/emailqueue',
        reader: {
            type: 'json',
            rootProperty: 'emailqueue'
        }
	},
	sorters: [{
 		property:'lastModifiedDate',
 		direction:'DESC'
 	}]
     
});

