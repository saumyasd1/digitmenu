Ext.define('AOC.store.MenuStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.MenuModel',
	autoLoad : true,
	proxy : {
	//	timeout:parseInt(requestTimeoutforStore, 10),
		// load using HTTP
		
		type : 'ajax',
		//url : 'powerpay/MenuItems/GET',
		url : 'avery/app/data/menu.json',
		reader:{
	        type:'json', 
	        rootProperty: 'services.service',
	        record:'item'
	    }
}
});
