Ext.define('AOC.store.HomePageOders', {
    extend : 'Ext.data.Store',
    requires:['AOC.model.HomePageOder'],
    model  : 'AOC.model.HomePageOder',
    autoLoad:true,
    proxy : {
	//	timeout:parseInt(requestTimeoutforStore, 10),
		type : 'ajax',
		url : applicationContext+'/rest/ordertrend/homelist',
		reader:{
	        type:'json'
	     }
    }
    
});