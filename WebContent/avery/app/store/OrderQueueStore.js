Ext.define('AOC.store.OrderQueueStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.OrderQueueModel',
	pageSize:pageSize,
		proxy : {
			type : 'rest',
			url : applicationContext+'/rest/orders',
			reader:{
		        type:'json', 
		        rootProperty: 'orders',
		        totalProperty: 'totalCount'
		    }
		}
});
