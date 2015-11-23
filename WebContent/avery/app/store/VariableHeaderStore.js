Ext.define('AOC.store.VariableHeaderStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.VariableHeaderModel',
	autoLoad : true,
	storeId:'OrderHeaderId',
	proxy : {
	//	timeout:parseInt(requestTimeoutforStore, 10),
		// load using HTTP
		
		type : 'ajax',
		//url : 'powerpay/MenuItems/GET',
		url : 'avery/app/data/variableheader.json',
		reader:{
	        type:'json', 
	        rootProperty: 'items'
	    }
}
});
