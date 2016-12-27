Ext.define('AOC.view.email.CancelEmailWindow',{
	extend:'Ext.window.Window',
	xtype:'cancelEmailWindow',
	width:370,
	controller:'cancelEmail',
	closable:false,
	header:false,
	items:[{
		xtype:'displayfield',
		value:AOCLit.cancelEmailText,
		margin:'10 10 10 10'
	},{
		xtype:'textareafield',
		margin:'10 10 10 10',
		width:340,
		reference:'commentArea'
	}],
	buttons:[{
		text:'Yes',
		handler:'cancelEmail'
	},{
		text:'No',
		handler:'closeWindow'
	}]
	
});