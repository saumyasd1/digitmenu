Ext.define('AOC.store.OrderHeaderStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.OrderHeaderModel',
	autoLoad : true,
	storeId:'OrderHeaderId',
	proxy : {
		type : 'ajax',
		url : 'avery/app/data/orderheader.json',
		reader:{
	        type:'json', 
	        rootProperty: 'order1'
	    }
}
});
