Ext.define('AOC.store.ConfigurationCSRStore', {
	extend : 'Ext.data.Store',
	remoteSort: false,
	autoLoad:true,
	storeId:'configCSRStoreId',
	fields : ['name','systemId', 'orgId'],
	proxy:{
		type: 'rest',
        limitParam:'',
        startParam:'',
        pageParam:'',
		url:applicationContext+'/rest/orderconfigurations/variable/all',
		method:'GET',
		extraParams:{variableName:'CSR'}
	}
});