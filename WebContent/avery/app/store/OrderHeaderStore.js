Ext.define('AOC.store.OrderHeaderStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.OrderHeaderModel',
	autoLoad : true,
	storeId:'OrderHeaderId',
	proxy : {
	//	timeout:parseInt(requestTimeoutforStore, 10),
		// load using HTTP
		
		type : 'ajax',
		//url : 'powerpay/MenuItems/GET',
		url : 'avery/app/data/orderheader.json',
		reader:{
	        type:'json', 
	        rootProperty: 'order1'
	    }
}
});
