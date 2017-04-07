Ext.define('AOC.view.workinstruction.WIFormViewModel',{
	extend:'Ext.app.ViewModel',
	alias:'viewmodel.wiformviewmodel',
	
	data:{
		factoryName:'Adidas',
		rBOName:'Nike',
		shipToSiteNumber:'Test',
		schemaIdentification:{
			attachmentFileType:2,
			attachmentRequired:1,
			shipToSite:'Ship To Address'
		}
	}
});