Ext.define('AOC.view.orderqueue.CancelOrderWindow',{
	extend:'Ext.window.Window',
	xtype:'cancelOrderWindow',
	requires:['AOC.view.orderqueue.CancelOrderWindowController'],
	controller:'cancelOrder',
	width:370,
	closable:false,
	header:false,
	modal:true,
	items:[{
		xtype:'displayfield',
		value:cancelOrderText,
		margin:'10 10 10 10'
	},
	{
		xtype:'combo',
		reference:'cancelOrderCombo',
		store:[['AOC issue - Data mismatch','AOC issue - Data mismatch'],['AOC issue - Others','AOC issue - Others'],['AOC issue - System issue','AOC issue - System issue'],
		       ['AOC issue - Wrong data structure identification','AOC issue - Wrong data structure identification'],['AOC Testing','AOC Testing'],
		       ['Customer issue - Non-standard order form','Customer issue - Non-standard order form'],['Customer issue - Order revise/cancellation','Customer issue - Order revise/cancellation'],
		       ['Customer issue - Others','Customer issue - Others'],['GPD issue - Item missing/mismatch','GPD issue - Item missing/mismatch'],
		       ['GPD issue - Others','GPD issue - Others'],['GPD issue - Typesetter code issue','GPD issue - Typesetter code issue'],['Internal issue - Others','Internal issue - Others'],
		       ['Internal issue - Wrong data structure assigned','Internal issue - Wrong data structure assigned'],['Others - (Please specify)','Others - (Please specify)']],
		emptyText:'Select reason for cancelling order',
		width:340,
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