Ext.define('AOC.store.HomePageOders', {
    extend : 'Ext.data.Store',
    requires:['AOC.model.HomePageOder'],
    model  : 'AOC.model.HomePageOder',
    proxy : {
		type : 'ajax',
		url : applicationContext+'/rest/ordertrend/homelist',
		reader:{
	        type:'json'
	     }
    }
    
});