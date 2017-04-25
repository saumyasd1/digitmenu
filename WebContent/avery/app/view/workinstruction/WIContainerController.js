Ext.define('AOC.view.workinstruction.WIContainerController',{
	extend:'Ext.app.ViewController',
	alias:'controller.wicontainercontroller',
	
	onWiGridRefreshBtnClick : function(){
		var me = this,
			refs = me.getReferences(),
			wiGrid = refs.wiGrid;
		
		wiGrid.store.load();
	},
	createNewWI:function(btn){
		var me = this,
			view = me.getView();
		
		AOCRuntime.setCurrentWiMode('add');
		me.loadDefaultGrid();
		me.setReadOnlyView(false);
		me.showHideSaveSubmitBtn(true);
		
		me.loadAssigneeCombo();
		me.loadStatusCombo();
		me.resetFileCont();
		view.getLayout().setActiveItem(1);
	},
	getFormReference:function(){
		var me = this,
			refs = me.getReferences(),
			wiFormPanel = refs.wiFormPanel;
		
		return wiFormPanel.getReferences();
	},
	loadStatusCombo:function(){
		var me = this,
			formRefs = me.getFormReference(),
			statusCombo = formRefs.statusCombo;
		
		statusCombo.store.load({params:{roleId:Helper.getUserRole()}});
	},
	loadAssigneeCombo:function(){
		var me = this,
			formRefs = me.getFormReference(),
			assigneeCombo = formRefs.assigneeCombo;
	
		assigneeCombo.store.load({
			params:{roleId:Helper.getUserRole()},
			scope:assigneeCombo,
			callback:function(records, operation, success){
				this.setValue(Helper.getUserRole());
			}
		});
	},
	resetFileCont:function(){
		var me = this,
			refs = me.getReferences(),
			wiFormPanel = refs.wiFormPanel,
			formRefs = wiFormPanel.getReferences(),
			orderFileImageContainer = formRefs.orderFileImageContainer,
			attchmentContainer = formRefs.attchmentContainer,
			sampleFileContainer = formRefs.sampleFileContainer;
		
		orderFileImageContainer.removeAll();
		attchmentContainer.removeAll();
		sampleFileContainer.removeAll();
	},
	loadDefaultGrid:function(){
		var me = this,
			refs = me.getReferences(),
			wiFormPanel = refs.wiFormPanel,
			formRefs = wiFormPanel.getReferences(),
			wiorderfiberlinegrid = formRefs.wiorderfiberlinegrid,
			billShipMappingGrid = formRefs.billShipMappingGrid;
		
		var form = formRefs.wIForm.getForm();
		form.reset();
		me.loadDefaultSystemInfo();
		me.loadDefaultOrgInfo();
		me.loadDefaultAOCFieldName();
		me.loadDefaultBillShipMappingGrid(billShipMappingGrid);
		
		wiorderfiberlinegrid.store.loadData(this.loadDefaultSystemLevelGridData());
		
	},
	loadDefaultBillShipMappingGrid:function(billShipMappingGrid){
		var data = [
			    {
			    	'addressEmailSubject':'','beginendwith':'','keywording':'', 'orgCode':'', 'billToCode':'',
			        'shipToCode':'','shippingMethod':'','freightTerm':'','packingInstruction':'','shippingInstruction':'',
			        'endCustomer':'','manufacturingNote':'','csr':''
			    },
			    {
			    	'addressEmailSubject':'','beginendwith':'','keywording':'', 'orgCode':'', 'billToCode':'',
			        'shipToCode':'','shippingMethod':'','freightTerm':'','packingInstruction':'','shippingInstruction':'',
			        'endCustomer':'','manufacturingNote':'','csr':''
			    },
			    {
			    	'addressEmailSubject':'','beginendwith':'','keywording':'', 'orgCode':'', 'billToCode':'',
			        'shipToCode':'','shippingMethod':'','freightTerm':'','packingInstruction':'','shippingInstruction':'',
			        'endCustomer':'','manufacturingNote':'','csr':''
			    },
			    {
			    	'addressEmailSubject':'','beginendwith':'','keywording':'', 'orgCode':'', 'billToCode':'',
			        'shipToCode':'','shippingMethod':'','freightTerm':'','packingInstruction':'','shippingInstruction':'',
			        'endCustomer':'','manufacturingNote':'','csr':''
			    },
			    {
			    	'addressEmailSubject':'','beginendwith':'','keywording':'', 'orgCode':'', 'billToCode':'',
			        'shipToCode':'','shippingMethod':'','freightTerm':'','packingInstruction':'','shippingInstruction':'',
			        'endCustomer':'','manufacturingNote':'','csr':''
			    },
			    {
			    	'addressEmailSubject':'','beginendwith':'','keywording':'', 'orgCode':'', 'billToCode':'',
			        'shipToCode':'','shippingMethod':'','freightTerm':'','packingInstruction':'','shippingInstruction':'',
			        'endCustomer':'','manufacturingNote':'','csr':''
			    },
			    {
			    	'addressEmailSubject':'','beginendwith':'','keywording':'', 'orgCode':'', 'billToCode':'',
			        'shipToCode':'','shippingMethod':'','freightTerm':'','packingInstruction':'','shippingInstruction':'',
			        'endCustomer':'','manufacturingNote':'','csr':''
			    },
			    {
			    	'addressEmailSubject':'','beginendwith':'','keywording':'', 'orgCode':'', 'billToCode':'',
			        'shipToCode':'','shippingMethod':'','freightTerm':'','packingInstruction':'','shippingInstruction':'',
			        'endCustomer':'','manufacturingNote':'','csr':''
			    },
			    {
			    	'addressEmailSubject':'','beginendwith':'','keywording':'', 'orgCode':'', 'billToCode':'',
			        'shipToCode':'','shippingMethod':'','freightTerm':'','packingInstruction':'','shippingInstruction':'',
			        'endCustomer':'','manufacturingNote':'','csr':''
			    },
			    {
			    	'addressEmailSubject':'','beginendwith':'','keywording':'', 'orgCode':'', 'billToCode':'',
			        'shipToCode':'','shippingMethod':'','freightTerm':'','packingInstruction':'','shippingInstruction':'',
			        'endCustomer':'','manufacturingNote':'','csr':''
			    }
			];
		billShipMappingGrid.store.loadData(data);
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
				wiSystemGrid.getSelectionModel().select(wiSystemGrid.store.getAt(0));
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
				wiOrgGrid.getSelectionModel().select(wiOrgGrid.store.getAt(0));
			}
		});
	},
	loadDefaultSystemLevelGridData:function(){
		return [
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':'','defaultId':1
		    },
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':'','defaultId':2
		    },
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':'','defaultId':3
		    },
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':'','defaultId':4
		    },
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':'','defaultId':5
		    },
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':'','defaultId':6
		    },
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':'','defaultId':7
		    },
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':'','defaultId':8
		    },
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':'','defaultId':9
		    },
		    {
		    	'additionalLogicValidation':'','defaultValueFieldLocation':'','fieldName':'', 'productLine':'', 'rboFactStrucSpecific':'',
		        'systemOrderLineFiberLevel':'','defaultId':10
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
				    	itemId:'viewWIMenuItem',
				    	scope:me,
				    	handler:me.onViewWIFormMenuItemClick
				    },
				    {
				    	text:'Edit WI Form',
				    	iconCls:'fa fa-pencil-square-o',
				    	itemId:'editWIMenuItem',
				    	scope:me,
				    	handler:me.onEditWIFormMenuItemClick
				    },
				    {
				    	text:'Clone WI Form',
				    	iconCls:'fa fa-pencil-square-o',
				    	itemId:'cloneWIMenuItem',
				    	scope:me,
				    	handler:me.onCloneWIFormMenuItemClick
				    }
				],
				listeners:{
					scope:me,
					beforeshow:me.onActionMenuBeforeShow
				}
			});
			me.contextMenu.showAt(e.getXY());
		}
	},
	onActionMenuBeforeShow:function(menu){
		var me = this,
			wiGrid = me.getReferences().wiGrid,
			record = wiGrid.getSelectionModel().getSelection()[0],
//			viewWIMenuItem = menu.queryById('viewWIMenuItem'),
			editWIMenuItem = menu.queryById('editWIMenuItem'),
			status = record.get('status');
		
		if((status == AOCLit.wiInitializedStatus || status == AOCLit.wiBAQueryAskedStatus
				|| status == AOCLit.wiCSManagerDisapprovedStatus) && AOCRuntime.getUser().role == AOCLit.csRoleId){
			editWIMenuItem.setDisabled(false);
		}else{
			editWIMenuItem.setDisabled(true);
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
		if(AOCRuntime.getCurrentWiMode() == 'add'){
			wiSubmitBtn.setDisabled(true);
		}else {
			wiSubmitBtn.setDisabled(false);
		}
	},
	onCloneWIFormMenuItemClick:function(){
		var me = this;
		
		AOCRuntime.setCurrentWiMode('add');
		me.setReadOnlyView(false);
		me.loadWIForm();
		
		me.loadAssigneeCombo();
		me.loadStatusCombo();
		me.showHideSaveSubmitBtn(true);
	},
	onEditWIFormMenuItemClick:function(menuItem, e){
		var me = this;
		
		AOCRuntime.setCurrentWiMode('edit');
		me.setReadOnlyView(false);
		me.loadWIForm();
		
		me.loadAssigneeCombo();
		me.loadStatusCombo();
		me.showHideSaveSubmitBtn(true);
	},
	loadWIForm:function(){
		var me = this,
			view = me.getView(),
			wiGrid = me.getReferences().wiGrid,
			record = wiGrid.getSelectionModel().getSelection()[0],
			wId = record.get('id');
		
		AOCRuntime.setWiId(wId);
		me.loadGridInEditMode(wId, 'wiOrgGrid');
		me.loadGridInEditMode(wId, 'wiSystemGrid');
		me.loadGridInEditMode(wId, 'wiaocfieldgrid');
		me.loadGridInEditMode(wId, 'wiorderfiberlinegrid');
		me.loadGridInEditMode(wId, 'billShipMappingGrid');
		me.getAttachmentList(wId);
		me.loadWiFormData(wId);
		view.getLayout().setActiveItem(1);
	},
	getAttachmentList:function(wId){
		var me = this;
		Ext.Ajax.request({
			method:'GET',
			url:applicationContext+'/rest/wifiles/list',
			params:{ id: wId },
			success:function(response){
				var data = JSON.parse(response.responseText);
				var fileList = data.files;
				me.loadAttachment(fileList);
			}
		});
	},
	loadAttachment:function(fileList){
		var me = this,
			refs = me.getReferences(),
			wiFormPanel = refs.wiFormPanel,
			formRefs = wiFormPanel.getReferences(),
			orderFileImageContainer = formRefs.orderFileImageContainer,
    		attchmentContainer = formRefs.attchmentContainer,
    		sampleFileContainer = formRefs.sampleFileContainer,
    		len = fileList.length;
		
		for(var i=0;i<len;i++){
			if(fileList[i].fileType == 'Order'){
				me.setImagePreview(orderFileImageContainer,fileList[i] );
    		}
			else if(fileList[i].fileType == 'Attachment'){
				me.setImagePreview(attchmentContainer,fileList[i] );
    		}
			else if(fileList[i].fileType == 'Sample'){
				me.setImagePreview(sampleFileContainer,fileList[i] );
    		}
		}
	},
	setImagePreview:function(imageContainer, file){
		var name = file.fileName;
		imageContainer.add(
             {
            	 xtype:'box',
            	 style:'float:left;border:solid 1px #ccc;padding:5px;margin-right:5px;',
            	 width:150,
            	 cls:'file-box',
            	 html:[
           	       '<a class="download-attachment-link" style="letter-spacing:.15px;color:#2c3e50;margin-right:5px;" data-qtip="<font color=#3892d3>'+name+'</font>">'+Ext.util.Format.ellipsis(name,20)+'</a>'
//	           	       '<i class="fa fa-times delete-file"style="font-size:16px;color#2c3e50;cursor:pointer; float:right;" fileName="'+file.name+'" fileType="'+file.fileType+'"></i>',
//	           	       '<div style="clear:both"></div>'
           	     ]
             }
        );
	},
	onViewWIFormMenuItemClick:function(menuItem, e){
		var me = this;
	
		AOCRuntime.setCurrentWiMode('view');
		me.setReadOnlyView(true);
		me.loadWIForm();
		
		me.loadAssigneeCombo();
		me.loadStatusCombo();
		me.showHideSaveSubmitBtn(false);
	},
	setReadOnlyView:function(readOnlyFlag){
		var me = this,
			refs = me.getReferences(),
			wiFormPanel = refs.wiFormPanel,
			wIForm = wiFormPanel.getReferences().wIForm,
			textBoxArray = wIForm.query('[xtype = textfield]'),
			textAreaArray = wIForm.query('[xtype = textarea]'),
			comboArray = wIForm.query('[xtype = combo]'),
			radioGroupArray = wIForm.query('[xtype = radiogroup]'),
			tempArray = [].concat(textBoxArray)
						  .concat(comboArray)
						  .concat(radioGroupArray)
						  .concat(textAreaArray);
		
		var len = tempArray.length;
		for(var i = 0; i < len; i++){
			if(tempArray[i].name == 'assignee' || tempArray[i].name == 'status'){
				return;
			}
			tempArray[i].setReadOnly(readOnlyFlag);
		}
	},
	loadWiFormData:function(wId){
		var me = this,
			refs = me.getReferences(),
			wiFormPanel = refs.wiFormPanel;
		
		Ext.getBody().mask('Loading...');
		Ext.Ajax.request({
			url:applicationContext+'/rest/wi/wiorderdetail',
			params:{ id: wId },
			method: 'GET',
			success:function(response){
				var detail = JSON.parse(response.responseText),
					schemaIdentification = detail.formdata.listWiSchemaIdentification;
				
				delete detail.formdata.listWiSchemaIdentification;
				AOCRuntime.setSchemaIdentificationId(schemaIdentification.id);
				delete schemaIdentification.id;
				Ext.apply(detail.formdata,schemaIdentification);
				var form = wiFormPanel.getReferences().wIForm;
				detail.formdata.status='';
				form.getForm().loadRecord(new Ext.data.Record(detail.formdata));
				Ext.getBody().unmask();
			},
			failure:function(){
				Ext.getBody().unmask();
			}
		});
	},
	loadGridInEditMode:function(wId, gridType){
		var me = this,
			refs = me.getReferences(),
			wiFormPanel = refs.wiFormPanel,
			formRefs = wiFormPanel.getReferences(),
			grid = formRefs[gridType];
	
		if(gridType == 'wiOrgGrid'){
			grid.show(); 
		}
		grid.store.load({
			params:{id:wId},
			callback:function(records, operation, success){
				//To Do after store load
			}
		});
	}
	
});