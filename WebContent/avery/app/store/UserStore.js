Ext.define('AOC.store.UserStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.UserModel',
	totalCount:'total',
	pageSize:pageSize,
	storeId:'UserStoreId',
	proxy: {
        type: 'rest',
        url: applicationContext+'/rest/users',
        reader: {
            type: 'json',
            rootProperty: 'users',
            totalProperty: 'totalCount'
        }
    },
    sorters: [{
 		property:'lastModifiedDate',
 		direction:'DESC'
	}]
});

