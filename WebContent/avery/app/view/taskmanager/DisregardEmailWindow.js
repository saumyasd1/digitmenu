Ext.define('AOC.view.taskmanager.DisregardEmailWindow',{
	extend:'Ext.window.Window',
	xtype:'disregardEmailWindow',
	width:370,
	controller:'disregardEmail',
	closable:false,
	header:false,
	items:[{
		xtype:'displayfield',
		value:AOCLit.disregardEmailText,
		margin:'10 10 10 10'
	},{
		xtype:'textareafield',
		margin:'10 10 10 10',
		width:340,
		reference:'commentArea'
	}],
	buttons:[{
		text:'Yes',
		handler:'disregardEmail'
	},{
		text:'No',
		handler:'closeWindow'
	}]
	
});