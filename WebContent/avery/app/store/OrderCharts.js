Ext.define('AOC.store.OrderCharts', {
    extend : 'Ext.data.Store',
    requires:['AOC.model.OrderChart'],
    model  : 'AOC.model.OrderChart',
    autoLoad:true,
    proxy : {
	//	timeout:parseInt(requestTimeoutforStore, 10),
		type : 'ajax',
		url : applicationContext+'/rest/ordertrend/chart/1',
		reader:{
	        type:'json'
	     }
    }
});