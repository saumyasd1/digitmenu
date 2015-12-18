Ext.define('AOC.view.orderqueue.CancelOrderWindow',{
	extend:'Ext.window.Window',
	xtype:'cancelOrderWindow',
	controller:'cancelOrderController',
	width:370,
	closable:false,
	header:false,
	items:[{
		xtype:'displayfield',
		value:cancelOrderText,
		margin:'10 10 10 10'
	},{
		xtype:'textareafield',
		margin:'10 10 10 10',
		width:340,
		reference:'commentArea'
	}],
	buttons:[{
		text:'Yes',
		handler:'cancelOrder'
	},{
		text:'No',
		handler:'closeWindow'
	}]
});