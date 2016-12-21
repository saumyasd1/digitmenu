Ext.define('AOC.store.TaskManagerStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.TaskManagerModel',
	autoLoad : true,
	remoteSort: true,
	totalCount:'total',
	pageSize:pageSize,
	storeId:'TaskManagerStoreId',
		proxy:{
			type:'rest',
			url: applicationContext+'/rest/emailqueue/unidentified',
			reader:{
		        type:'json', 
		        rootProperty:'emailqueue'
		    },
		    writer:{
		    	type:'json'
		    }
		}
});

