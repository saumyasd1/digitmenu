Ext.define('AOC.store.VariableHeaderStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.VariableHeaderModel',
	autoLoad : true,
	storeId:'OrderHeaderId',
	proxy : {
		type : 'ajax',
		url : 'avery/app/data/variableheader.json',
		reader:{
	        type:'json', 
	        rootProperty: 'items'
	    }
}
});
