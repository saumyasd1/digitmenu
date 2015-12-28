Ext.define('AOC.store.OrderCharts', {
    extend : 'Ext.data.Store',
    model  : 'AOC.model.OrderChart',
//    proxy : {
//	//	timeout:parseInt(requestTimeoutforStore, 10),
//		type : 'ajax',
//		url : 'avery/app/data/menu.json',
//		reader:{
//	        type:'json', 
//	        rootProperty: 'services.service',
//	        record:'item'
//	    }
	 data: [{"received":4,"waitingCR":6,"waitingSR":1,"success":1,"failed":0,"day":'1 DEC'},
                {"received":5,"waitingCR":10,"waitingSR":6,"success":4,"failed":3,"day":'2 DEC'},
                {"received":6,"waitingCR":8,"waitingSR":4,"success":8,"failed":5,"day":'3 DEC'},
                {"received":3,"waitingCR":5,"waitingSR":7,"success":3,"failed":2,"day":'4 DEC'},
                {"received":2,"waitingCR":2,"waitingSR":3,"success":4,"failed":2,"day":'5 DEC'},
                {"received":1,"waitingCR":4,"waitingSR":12,"success":5,"failed":8,"day":'6 DEC'},
                {"received":1,"waitingCR":7,"waitingSR":18,"success":6,"failed":2,"day":'7 DEC'}]
});