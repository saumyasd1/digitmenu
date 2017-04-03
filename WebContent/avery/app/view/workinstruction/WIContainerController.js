Ext.define('AOC.view.workinstruction.WIContainerController',{
	extend:'Ext.app.ViewController',
	alias:'controller.wicontainercontroller',
	
	createNewWI:function(btn){
		var view = this.getView()
			refs = this.getReferences(),
			wiFormPanel = refs.wiFormPanel,
			formRefs = wiFormPanel.getReferences(),
			wiOrgGrid = formRefs.wiOrgGrid,
			wiSystemGrid = formRefs.wiSystemGrid;
		
		wiFormPanel.mode = 'add';
		wiSystemGrid.store.loadData(this.getSystemDefaultData());
		wiOrgGrid.store.loadData(this.getOrgDefaultData());
		
		view.getLayout().setActiveItem(1);
	},
	getSystemDefaultData:function(){
		return [
			{
				createdBy:'', createdDate:'',lastModifiedBy:'',lastModifiedDate:'',artWorkHold:'',csrName:'',defaultOrg:'',
				invoiceLineInstruction:'',	manufacturing:'',packingInstruction:'',	shipMark:'',splitByShipSet:'',
				systemName:'Oracle', variableDataBreakdown:''
			},
			{
				createdBy:'', createdDate:'',lastModifiedBy:'',lastModifiedDate:'',artWorkHold:'',csrName:'',defaultOrg:'',
				invoiceLineInstruction:'',	manufacturing:'',packingInstruction:'',	shipMark:'',splitByShipSet:'',
				systemName:'VIPS', variableDataBreakdown:''
			},
			{
				createdBy:'', createdDate:'',lastModifiedBy:'',lastModifiedDate:'',artWorkHold:'',csrName:'',defaultOrg:'',
				invoiceLineInstruction:'',	manufacturing:'',packingInstruction:'',	shipMark:'',splitByShipSet:'',
				systemName:'Sparrow', variableDataBreakdown:''
			}
		]    
		
	},
	getOrgDefaultData:function(){
		return [
	        {
	        	createdBy:'',createdDate:'',lastModifiedBy:'',lastModifiedDate:'',billToCode:'',freightTerm:'',
				orgName:'PYT',shipToCode:'',shippingInstruction:'',	shippingMethod:'',siteName:'Panyu',systemName:'Oracle'
	        },
	        {
	        	createdBy:'',createdDate:'',lastModifiedBy:'',lastModifiedDate:'',billToCode:'',freightTerm:'',
				orgName:'PYL',shipToCode:'',shippingInstruction:'',	shippingMethod:'',siteName:'Panyu',systemName:'Oracle'
	        },
	        {
	        	createdBy:'',createdDate:'',lastModifiedBy:'',lastModifiedDate:'',billToCode:'',freightTerm:'',
				orgName:'POHKT',shipToCode:'',shippingInstruction:'',	shippingMethod:'',siteName:'Panyu',systemName:'VIPS'
	        },
	        {
	        	createdBy:'',createdDate:'',lastModifiedBy:'',lastModifiedDate:'',billToCode:'',freightTerm:'',
				orgName:'POHKL',shipToCode:'',shippingInstruction:'',	shippingMethod:'',siteName:'Panyu',systemName:'VIPS'
	        },
	        {
	        	createdBy:'',createdDate:'',lastModifiedBy:'',lastModifiedDate:'',billToCode:'',freightTerm:'',
				orgName:'ADNS',shipToCode:'',shippingInstruction:'',	shippingMethod:'',siteName:'Nansha',systemName:'VIPS'
	        },
	        {
	        	createdBy:'',createdDate:'',lastModifiedBy:'',lastModifiedDate:'',billToCode:'',freightTerm:'',
				orgName:'ADNL',shipToCode:'',shippingInstruction:'',	shippingMethod:'',siteName:'Nansha',systemName:'VIPS'
	        },
	        {
	        	createdBy:'',createdDate:'',lastModifiedBy:'',lastModifiedDate:'',billToCode:'',freightTerm:'',
				orgName:'ADHK',shipToCode:'',shippingInstruction:'',	shippingMethod:'',siteName:'Nansha',systemName:'VIPS'
	        },
	        {
	        	createdBy:'',createdDate:'',lastModifiedBy:'',lastModifiedDate:'',billToCode:'',freightTerm:'',
				orgName:'VN',shipToCode:'',shippingInstruction:'',	shippingMethod:'',siteName:'Vietnam',systemName:'Oracle'
	        },
	        {
	        	createdBy:'',createdDate:'',lastModifiedBy:'',lastModifiedDate:'',billToCode:'',freightTerm:'',
				orgName:'PXVN',shipToCode:'',shippingInstruction:'',	shippingMethod:'',siteName:'Vietnam',systemName:'VIPS'
	        },
	        {
	        	createdBy:'',createdDate:'',lastModifiedBy:'',lastModifiedDate:'',billToCode:'',freightTerm:'',
				orgName:'SZ',shipToCode:'',shippingInstruction:'',	shippingMethod:'',siteName:'Suzhou',systemName:'Sparrow'
	        },
	        {
	        	createdBy:'',createdDate:'',lastModifiedBy:'',lastModifiedDate:'',billToCode:'',freightTerm:'',
				orgName:'PXSH',shipToCode:'',shippingInstruction:'',	shippingMethod:'',siteName:'Suzhou',systemName:'Oracle'
	        }
		];    
	}
	
});