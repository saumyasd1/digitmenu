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
		
		wiOrgGrid.store.load();
		wiSystemGrid.store.load();
		view.getLayout().setActiveItem(1);
	}
	
});