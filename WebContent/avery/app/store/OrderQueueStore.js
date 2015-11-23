Ext.define('AOC.store.OrderQueueStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.OrderQueueModel',
	autoLoad : true,
	pageSize:pageSize,
	storeId:'OrderQueueId',
	proxy : {
		type : 'rest',
		url : applicationContext+'/rest/orders',
//		url:'avery/app/data/orderheader.json',
		reader:{
	        type:'json', 
	        rootProperty: 'orders',
	        totalProperty: 'totalCount'
	    }
}
});
