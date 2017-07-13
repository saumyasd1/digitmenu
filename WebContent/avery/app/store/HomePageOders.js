Ext.define('AOC.store.HomePageOders', {
    extend : 'Ext.data.Store',
    requires:['AOC.model.HomePageOder'],
    model  : 'AOC.model.HomePageOder',
    autoLoad:false,
    proxy : {
		type : 'rest',
		limitParam:'',
        startParam:'',
        pageParam:'',
		url : applicationContext+'/rest/ordertrend/homelist',
		reader:{
	        type:'json'
	     }
    }
    
});