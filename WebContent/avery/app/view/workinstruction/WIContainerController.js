Ext.define('AOC.view.workinstruction.WIContainerController',{
	extend:'Ext.app.ViewController',
	alias:'controller.wicontainercontroller',
	
	createNewWI:function(btn){
		var me = this,
			view = me.getView()
			refs = me.getReferences(),
			wiFormPanel = refs.wiFormPanel,
			formRefs = wiFormPanel.getReferences(),
			wiorderfiberlinegrid = formRefs.wiorderfiberlinegrid;
		
		wiFormPanel.mode = 'add';
		
		me.loadDefaultSystemInfo();
		me.loadDefaultOrgInfo();
		me.loadDefaultAOCFieldName();
		
		wiorderfiberlinegrid.store.loadData(this.loadDefaultSystemLevelGridData());
		
		me.setReadOnlyView(false);
		me.showHideSaveSubmitBtn(true);
		
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
			wiaocfieldgrid.store.loadData(data);
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
				wiSystemGrid.store.loadData(data);
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
				wiOrgGrid.store.loadData(data);
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
	},
	
	//WI GRID section
	onWICellClick:function(view , td , cellIndex , record , tr , rowIndex , e , eOpts){
		var me = this;
		if(cellIndex > 0){return;}
		
		if(me.contextMenu){
			me.contextMenu.showAt(e.getXY());
		}else{
			me.contextMenu = new Ext.menu.Menu({
				cls:'aoc-action-menu',
				items:[
				    {
				    	text:'View WI Form',
				    	iconCls:'fa fa-eye',
				    	scope:me,
				    	handler:me.onViewWIFormMenuItemClick
				    },
				    {
				    	text:'Edit WI Form',
				    	iconCls:'fa fa-pencil-square-o',
				    	scope:me,
				    	handler:me.onEditWIFormMenuItemClick
				    }
				]
			});
			me.contextMenu.showAt(e.getXY());
		}
	},
	showHideSaveSubmitBtn:function(showFlag){
		var me = this,
			refs = me.getReferences(),
			wiFormPanel = refs.wiFormPanel,
			formPanelRefs = wiFormPanel.getReferences(),
			wiSaveBtn = formPanelRefs.wiSaveBtn,
			wiSubmitBtn = formPanelRefs.wiSubmitBtn;
		
		wiSaveBtn[showFlag ? 'show':'hide']();
		wiSubmitBtn[showFlag ? 'show':'hide']();
	},
	onEditWIFormMenuItemClick:function(menuItem, e){
		var me = this;
		me.setReadOnlyView(false);
		me.loadWIForm();
		me.showHideSaveSubmitBtn(true);
	},
	loadWIForm:function(){
		var me = this,
			view = me.getView(),
			wiGrid = me.getReferences().wiGrid,
			record = wiGrid.getSelectionModel().getSelection()[0],
			wId = record.get('id');
		
		me.loadOrgGrid(wId);
		me.loadSystemGrid(wId);
		me.loadAOCFieldGrid(wId);
//		//me.loadSystemLevelGrid(wId);
		me.loadWiFormData(wId);
		view.getLayout().setActiveItem(1);
	},
	
	onViewWIFormMenuItemClick:function(menuItem, e){
		var me = this;
		me.setReadOnlyView(true);
		me.loadWIForm();
		me.showHideSaveSubmitBtn(false);
	},
	setReadOnlyView:function(readOnlyFlag){
		var me = this,
			refs = me.getReferences(),
			wiFormPanel = refs.wiFormPanel,
			wIForm = wiFormPanel.getReferences().wIForm,
			textBoxArray = wIForm.query('[xtype = textfield]'),
			comboArray = wIForm.query('[xtype = combo]'),
			radioGroupArray = wIForm.query('[xtype = radiogroup]'),
			tempArray = [].concat(textBoxArray)
						  .concat(comboArray)
						  .concat(radioGroupArray);
		
		var len = tempArray.length;
		for(var i = 0; i < len; i++){
			tempArray[i].setReadOnly(readOnlyFlag);
		}
		
	},
	loadWiFormData:function(wId){
		var me = this,
			refs = me.getReferences(),
			wiFormPanel = refs.wiFormPanel;
		
		wiFormPanel.mask('Loading...');
		Ext.Ajax.request({
			url:applicationContext+'/rest/wi/wiorderdetail',
			params:{ id: wId },
			method: 'GET',
			success:function(response){
				var detail = JSON.parse(response.responseText),
					schemaIdentification = detail.formdata.listWiSchemaIdentification;
				
				delete detail.formdata.listWiSchemaIdentification;
				Ext.apply(detail.formdata,schemaIdentification);
				var form = wiFormPanel.getReferences().wIForm;
				form.getForm().loadRecord(new Ext.data.Record(detail.formdata));
				wiFormPanel.unmask();
			},
			failure:function(){
				wiFormPanel.unmask();
			}
		});
	},
	loadOrgGrid:function(wId){
		var me = this,
			refs = me.getReferences(),
			wiFormPanel = refs.wiFormPanel,
			formRefs = wiFormPanel.getReferences(),
			wiOrgGrid = formRefs.wiOrgGrid;
		
		wiOrgGrid.store.load({params:{id:wId}});
	},
	loadSystemGrid:function(wId){
		var me = this,
			refs = me.getReferences(),
			wiFormPanel = refs.wiFormPanel,
			formRefs = wiFormPanel.getReferences(),
			wiSystemGrid = formRefs.wiSystemGrid;
		
		wiSystemGrid.store.load({params:{id:wId}});
	},
	loadAOCFieldGrid:function(wId){
		var me = this,
			refs = me.getReferences(),
			wiFormPanel = refs.wiFormPanel,
			formRefs = wiFormPanel.getReferences(),
			wiaocfieldgrid = formRefs.wiaocfieldgrid;
		
		wiaocfieldgrid.store.load({params:{id:wId}});
	}
	
});