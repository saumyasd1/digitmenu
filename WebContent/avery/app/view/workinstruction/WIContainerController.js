Ext.define('AOC.view.workinstruction.WIContainerController',{
	extend:'Ext.app.ViewController',
	alias:'controller.wicontainercontroller',
	
	createNewWI:function(btn){
		var view = this.getView()
			refs = this.getReferences(),
			wiFormPanel = refs.wiFormPanel,
			formRefs = wiFormPanel.getReferences(),
			wiorderfiberlinegrid = formRefs.wiorderfiberlinegrid;
		
		wiFormPanel.mode = 'add';
		
		this.loadDefaultSystemInfo();
		this.loadDefaultOrgInfo();
		this.loadDefaultAOCFieldName();
		wiorderfiberlinegrid.store.loadData(this.loadDefaultSystemLevelGridData());
		view.getLayout().setActiveItem(1);
	},
	loadDefaultAOCFieldName:function(){
		var refs = this.getReferences(),
			wiFormPanel = refs.wiFormPanel,
			formRefs = wiFormPanel.getReferences(),
			wiaocfieldgrid = formRefs.wiaocfieldgrid;
	
	Ext.Ajax.request({
		url:applicationContext+'/rest/wiaocfieldinfo',
		success:function(response){
			var data = JSON.parse(response.responseText);
			var list = data.wiAocFieldInfo;
			wiaocfieldgrid.store.loadData(list);
		}
	});
	},
	loadDefaultSystemInfo:function(){
		var refs = this.getReferences(),
			wiFormPanel = refs.wiFormPanel,
			formRefs = wiFormPanel.getReferences(),
			wiSystemGrid = formRefs.wiSystemGrid;
		
		Ext.Ajax.request({
			url:applicationContext+'/rest/wisysteminfo',
			success:function(response){
				var data = JSON.parse(response.responseText);
				var list = data.wiSystemInfo;
				wiSystemGrid.store.loadData(list);
			}
		});
		
	},
	loadDefaultOrgInfo:function(){
		var refs = this.getReferences(),
			wiFormPanel = refs.wiFormPanel,
			formRefs = wiFormPanel.getReferences(),
			wiOrgGrid = formRefs.wiOrgGrid;
		
		Ext.Ajax.request({
			url:applicationContext+'/rest/wiorginfo',
			success:function(response){
				var data = JSON.parse(response.responseText);
				var list = data.wiOrgInfo;
				wiOrgGrid.store.loadData(list);
			}
		});
	},
	loadDefaultSystemLevelGridData:function(){
		return [
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':''
		    },
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':''
		    },
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':''
		    },
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':''
		    },
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':''
		    },
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':''
		    },
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':''
		    },
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':''
		    },
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':''
		    },
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':''
		    }
		]
	}
	
});