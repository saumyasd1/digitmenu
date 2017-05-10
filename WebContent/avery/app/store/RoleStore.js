Ext.define('AOC.store.RoleStore', {
	extend : 'Ext.data.Store',
	storeId : 'RoleStoreId',
	model : 'AOC.model.RoleModel',

	autoLoad : true,
	proxy : {
		type : 'rest',
		url : applicationContext + '/rest/role',
		reader : {
			type : 'json'
		}
	}
});
