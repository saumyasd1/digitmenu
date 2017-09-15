Ext.define('AOC.view.productline.ProductLineController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.productlineMain',
    runTime : AOC.config.Runtime,
    active:false,
    requires:['AOC.view.advsearch.ProductLineAdvanceSearch'],
    
    onComboBlur:function(combo, e){
    	Helper.clearCombo(combo,e);
    },
    onActivateGrid:function(grid){
    	grid.down('pagingtoolbar').bindStore(grid.getStore());
    	
    	 var userInfo = AOCRuntime.getUser(),
	         siteId = userInfo.siteId;
    	 
    	 grid.getStore().proxy.extraParams = {
	         siteId: siteId
	     };
    },
    
    onCellClick:function(obj, td, cellIndex, record, tr, rowIndex, e){
    	if(cellIndex == 0){
    		this.createContextMenu(record, e);
    	}
    },
    onRowContextMenu:function(obj, record, tr, rowIndex, e, eOpts){
    	e.stopEvent();
    	this.createContextMenu(record, e);
    },
    
    createContextMenu:function(record, e){
    	var me = this;
    	AOCRuntime.setCurrentProductLineStatus(record.get('active'));
    	
    	if(me.contextMenu){
    		me.contextMenu.showAt(e.getXY());
    	}else{
    		me.contextMenu = Ext.create('AOC.view.ux.CustomMenu', {
    			items:[
    			    {
    			    	text:'Edit',
    			    	iconCls:'x-fa fa-pencil-square-o',
    			    	itemIndex:0,
    			    	itemId:'editPartnerDataStructureMenuItem'
    			    }, {
    			    	text:'View',
    			    	iconCls:'x-fa fa-eye',
    			    	itemIndex:1,
    			    	itemId:'viewPartnerDataStructureMenuItem'
    			    }, {
    			    	text:'Delete',
    			    	iconCls:'x-fa fa-trash-o',
    			    	itemIndex:2,
    			    	hidden:true,
    			    	itemId:'deletePartnerDataStructureMenuItem'
    			    },{
    			    	text:'Deactive',
    			    	iconCls:'x-fa fa-toggle-off',
    			    	itemIndex:3,
    			    	itemId:'activeDeactiveProductLineMenuItem'
    			    }
    			],
    			listeners:{
    				scope:me,
    				click:me.onMenuItemClick,
    				beforeshow:function(menu){
    					var editBtn = menu.queryById('editPartnerDataStructureMenuItem'),
	    					deleteBtn = menu.queryById('deletePartnerDataStructureMenuItem'),
	    					activeDeactiveBtn = menu.queryById('activeDeactiveProductLineMenuItem'),
	    					activeStatus = AOCRuntime.getCurrentProductLineStatus(record.get('active'));
    					
    					if (AOCRuntime.getUser().role == AOCLit.userRole.CSR) {
    						editBtn.setDisabled(true);
    						activeDeactiveBtn.setDisabled(true);
    						deleteBtn.setDisabled(true);
 	                    }else{
 	                    	if(activeStatus){
 	                    		editBtn.setDisabled(false);
 	                    	}else{
 	                    		editBtn.setDisabled(true);
 	                    	}
 	                    	activeDeactiveBtn.setDisabled(false);
    						deleteBtn.setDisabled(false);
 	                    }
    					if(activeStatus){
    						activeDeactiveBtn.setText('Deactive');
    						activeDeactiveBtn.setIconCls('x-fa fa-toggle-off');
    					}else{
    						activeDeactiveBtn.setText('Active');
    						activeDeactiveBtn.setIconCls('x-fa fa-toggle-on');
    					}
    				}
    			}
    		});
    		me.contextMenu.showAt(e.getXY());
    	}
    },
    onMenuItemClick:function(menu, item, e){
		var me = this;
		if(item){
			if (item.itemIndex == 0) {
		         me.onEditPartnerDataStructureItemClick();
			} else if (item.itemIndex == 1) {
		         me.onViewPartnerDataStructureItemClick();
			}else if (item.itemIndex == 2) {
		         me.onDeletePartnerDataStructureItemClick();
			}else if(item.itemIndex == 3){
				me.onActiveDeactiveItemClick();
			}
		}
    },
    onEditPartnerDataStructureItemClick:function(){
    	var me = this,
			grid = me.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0];
    	
    	me.openPartnerDatastructureWin(currentRecord, AOCLit.editPartProdLine, 'edit');
    },
    onViewPartnerDataStructureItemClick:function(){
    	var me = this,
			grid = me.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0];
    	
    	me.openPartnerDatastructureWin(currentRecord, 'View Partner Data Structure', 'view');
    },
    onDeletePartnerDataStructureItemClick:function(){
    	var me = this,
			grid = me.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0],
			id=currentRecord.get('id');
    	
	    Ext.MessageBox.confirm('Confirm Action', AOCLit.delPartProdLine, function(response) {
	    	if (response == 'yes') {
				Ext.Ajax.request({
					method:'DELETE',
					url:applicationContext+'/rest/productLines/'+id,
				    success : function(response, opts) {
				    	Helper.showToast('Success', AOCLit.deleteProdLineMsg);
				    	grid.store.load();
				    },
				    failure: function(response, opts) {}
				});
	    	}
	    });
    },
    onActiveDeactiveItemClick:function(){
    	var me = this,
			grid = me.getView(),
			currentRecord = grid.getSelectionModel().getSelection()[0],
			activeStatus = currentRecord.get('active'),
			status;
    	
    	if(activeStatus){
    		status = false;
    	}else{
    		status = true;
    	}
    	Ext.getBody().mask(AOCLit.pleaseWait);
    	Ext.Ajax.request({
    		method:'GET',
    		url:applicationContext+'/rest/productLines/status',
    		params:{id:currentRecord.get('id'), status:status},
    		success:function(response){
    			var data = JSON.parse(response.responseText);
    			Helper.showToast('success', data.message);
    			grid.store.load();
    			Ext.getBody().unmask();
    		},
    		failure:function(){
    			Ext.getBody().unmask();
    		}
    	});
    },
    
    openPartnerDatastructureWin:function(record, title, mode){
    	var data = this.processData(record);
    	var me =this;
		var win=Ext.create('AOC.view.partner.CreatePartnerProductLine',{
  			    mode:mode,
  			    contextView: me.getView(),
  			    title:title,
  			    rec:data,
  			    listeners: {
  			    	'close':function( panel, eOpts ) {
  			    		Ext.getBody().unmask();
  			    		win.destroy();
  			    	}
  			    }
  			});
			win.show();
    },
    processData:function(record){
    	var me = this;
    	record.data.rboId = record.data.rbo.id;
    	record.data.partnerId = record.data.varPartner.id;
    	
    	record.data.fileOrderCellNo = me.getCellNo(record.get('fileOrderMatch'));
    	
    	//record.data.fileOrderFileName = me.getFileName(record.get('fileOrderMatchLocation'));
    	record.data.fileOrderFileContent = me.getKeyword(record.get('fileOrderMatch'));
    	
    	record.data.attachmentFileKeyWording = me.getKeyword(record.get('attachmentFileOrderMatch'));
    	record.data.attachmentCellNo = me.getCellNo(record.get('attachmentFileOrderMatch'));
    	
    	record.data.emailSubjectRBOKeyword = record.get('emailSubjectRBOMatch');
    	record.data.emailBodyRBOKeyword = record.get('emailBodyRBOMatch');
    	record.data.emailSubjectProductLineKeyword = record.get('emailSubjectProductLineMatch');
    	record.data.emailBodyProductLineKeyword = record.get('emailBodyProductLineMatch');
    	record.data.emailSubjectPartnerFactoryKeyword = record.get('emailSubjectPartnerMatch');
    	record.data.emailBodyPartnerFactoryKeyword = record.get('emailBodyPartnerMatch');
    	
    	record.data.emailSubjectProductLineMatchRequired = record.get('emailSubjectProductlineMatchRequired');
    	record.data.emailBodyProductLineMatchRequired = record.get('emailBodyProductlineMatchRequired');
    	
    	record.data.fileOrderRBOMatchRequired = record.get('fileRBOMatchRequired');
    	record.data.fileOrderProductLineMatchRequired = record.get('fileProductLineMatchRequired');
    	record.data.fileOrderPartnerRequired = record.get('fileOrderPartnerRequired');
    	
    	record.data.fileOrderRBOKeyword = me.getKeyword(record.get('fileRBOMatch'));
    	record.data.fileOrderRBOCellNo = me.getCellNo(record.get('fileRBOMatch'));
    	record.data.fileOrderProductLineKeyword =me.getKeyword(record.get('fileProductlineMatch'));
    	record.data.fileOrderProductLineCellNo = me.getCellNo(record.get('fileProductlineMatch'));
    	record.data.fileOrderPartnerFactoryKeyword = me.getKeyword(record.get('fileOrderPartnerMatch'));
    	record.data.fileOrderPartnerFactoryCellNo = me.getCellNo(record.get('fileOrderPartnerMatch'));
    	
    	record.data.sizeValidationMultipleProductLine = me.getMultipleProductLine(record.get('sizeCheck'));
    	record.data.fiberContentValidationMultipleProductLine = me.getMultipleProductLine(record.get('fiberpercentagecheck'));
    	record.data.cooValidationMultipleProductLine = me.getMultipleProductLine(record.get('coocheck'));
    	record.data.factoryMoqValidationMultipleProductLine = me.getMultipleProductLine(record.get('factoryMOQCheck'));
    	
    	record.data.sizeCheck = me.getSKUValidationRadioValue(record.get('sizeCheck'));
    	record.data.fiberpercentagecheck = me.getSKUValidationRadioValue(record.get('fiberpercentagecheck'));
    	record.data.coocheck = me.getSKUValidationRadioValue(record.get('coocheck'));
    	record.data.factoryMOQCheck = me.getSKUValidationRadioValue(record.get('factoryMOQCheck'));
    	
    	delete record.get('attachmentFileOrderMatch');
    	
    	delete record.get('fileOrderMatchLocation');
    	delete record.get('fileOrderMatch');
    	
    	delete record.get('emailSubjectProductlineMatchRequired');
    	delete record.get('emailBodyProductlineMatchRequired');
    	
    	delete record.get('emailSubjectRBOMatch');
    	delete record.get('emailBodyRBOMatch');
    	delete record.get('emailSubjectProductlineMatch');
    	delete record.get('emailBodyProductlineMatch');
    	delete record.get('emailSubjectPartnerMatch');
    	delete record.get('emailBodyPartnerMatch');
    	
    	delete record.get('fileRBOMatchRequired');
    	delete record.get('fileProductlineMatchRequired');
    	delete record.get('fileOrderPartnerRequired');
    	
    	delete record.get('fileRBOMatch');
    	delete record.get('fileProductlineMatch');
    	delete record.get('fileOrderPartnerMatch');
    	
    	return record;
    },
    getOrderCellNo:function(str){
    	if(!Ext.isEmpty(str)){
	    	if(str.indexOf(';') > -1){
		    	var splitArray = str.split(';');
		    	return splitArray[1].split(':')[1];
	    	}
    	}
    	return '';
    },
    getFileName:function(value){
    	if(!Ext.isEmpty(value) && value.indexOf('|') > -1){
    		var splitArray = value.split('|');
	    	return splitArray[0];
    	}
    	return value;
    },
    getFileContent:function(value){
    	if(!Ext.isEmpty(value) && value.indexOf('|') > -1){
    		var splitArray = value.split('|');
	    	return this.getKeyword(splitArray[1]);
    	}
    	return value;
    },
    getSplitValue:function(str){
    	if(str.indexOf(';') > -1){
    		var strA = str.split(';');
    		return {keyword: strA[0].split(':')[1], cellNo:strA[1].split(':')[1]};
    	}
    	return {keyword:str.split(':')[1]};
    },
    getKeyword:function(str){
    	if(!Ext.isEmpty(str)){
    		if(str.indexOf('_&&_') > -1){
    			var strA = str.split('_&&_'),
    				leftStr = strA[0],
    				rightStr = strA[1],
    				leftObj = this.getSplitValue(leftStr),
    				rightObj = this.getSplitValue(rightStr);
    			
    			return leftObj.keyword + ' AND '+ rightObj.keyword;
    		}
    		else if(str.indexOf('_._') > -1){
    			var strA = str.split('_._'),
    				leftStr = strA[0],
    				rightStr = strA[1],
    				leftObj = this.getSplitValue(leftStr),
    				rightObj = this.getSplitValue(rightStr);
    			
    			return leftObj.keyword + ' OR '+ rightObj.keyword;
    		}
    		var obj = this.getSplitValue(str);
    		return obj.keyword;
    	}
    	return str;
    },
    getCellNo:function(str){
    	if(!Ext.isEmpty(str)){
    		if(str.indexOf('_&&_') > -1){
    			var strA = str.split('_&&_'),
    				leftStr = strA[0],
    				rightStr = strA[1],
    				leftObj = this.getSplitValue(leftStr),
    				rightObj = this.getSplitValue(rightStr);
    			
    			return leftObj.cellNo + ' AND '+ rightObj.cellNo;
    		}
    		else if(str.indexOf('_._') > -1){
    			var strA = str.split('_._'),
    				leftStr = strA[0],
    				rightStr = strA[1],
    				leftObj = this.getSplitValue(leftStr),
    				rightObj = this.getSplitValue(rightStr);
    			
    			return leftObj.cellNo + ' OR '+ rightObj.cellNo;
    		}
    		var obj = this.getSplitValue(str);
    		return obj.cellNo;
    	}
    	return str;
    },
    getSKUValidationRadioValue:function(value){
    	if(Ext.isEmpty(value)){
    		return '';
    	}
    	if(value.indexOf('|') > -1){
    		return '1';
    	}
    	return value;
    },
    getMultipleProductLine:function(value){
    	if(Ext.isEmpty(value)){
    		return '';
    	}
    	if(value.indexOf('|') > -1){
    		return value;
    	}
    	return '';
    },
    onWinAfterRender:function(win){
    	var me = this,
    		roleId = AOCRuntime.getUser().role,
    		view = me.getView(),
    		refs = me.getReferences(),
    		form = refs['partnerProfileForm'];
    	
    	if(view.mode != 'add'){
    		var detail = view.rec.data;
    		view.mask('Loading...');
    		detail.partnerId = detail.partnerId;
    		detail.rboId = detail.rboId;
    		detail = me.createGroupingField(detail);
    		form.loadRecord(new Ext.data.Record(detail));
    	}
    	if(view.mode == 'view'){
			me.setReadOnlyView(true);
		}
    },
    onComboBlur:function(field){
    	Helper.clearCombo(field);
    },
    createGroupingField:function(detail){
    	var me = this,
    		refs = me.getReferences(),
    		groupingField = refs['groupingFieldCont']
    		groupingFieldArray = [];
    	
    	for(var prop in detail){
    		if(prop.indexOf('groupingField') > -1){
    			if(detail[prop] != null){
    				groupingFieldArray.push({prop:detail[prop]});
    			}
    		}
    	}
    	
    	var len = groupingFieldArray.length;
    	for(var i = 0;i < len; i++){
    		if(i+1 == len ){
    			groupingField.add(Helper.getGroupingField(i+1, false, false));
    		}else{
    			groupingField.add(Helper.getGroupingField(i+1, false, true));
    		}
    	}
    	if(len == 0){
    		groupingField.add(Helper.getGroupingField(1, false, false));
    	}
    	return detail;
    },
    setReadOnlyView: function (readOnlyFlag) {
	    var me = this,
	        refs = me.getReferences(),
	        partnerProfileForm = refs.partnerProfileForm,

	        //Partner Profile section
	        partnerTextFieldArray = partnerProfileForm.query('[xtype = textfield]'),
	        numberFieldArray = partnerProfileForm.query('[xtype = numberfield]'),
	        partnerComboArray = partnerProfileForm.query('[xtype = combo]'),
	        partnerRadioArray = partnerProfileForm.query('[xtype = radiogroup]'),
	        partnerCheckboxArray = partnerProfileForm.query('[xtype = checkboxfield]'),
	        
	        tempArray = [].concat(partnerTextFieldArray)
	        			  .concat(partnerComboArray)
    					  .concat(partnerRadioArray)
    					  .concat(numberFieldArray)
    	                  .concat(partnerCheckboxArray);
	    
	    var len = tempArray.length;
	    for (var i = 0; i < len; i++) {
            tempArray[i].setReadOnly(readOnlyFlag);
	    }
	},
	onSaveBtnClick:function(btn){
		var me = this,
			refs = me.getReferences(),
			view = me.getView(),
			mode = view.mode,
			form = refs['partnerProfileForm'].getForm(),
			url,
			method;
		
		if(me.processSystemOrgGrid()){
			var listOrderSystemInfo = me.processSystemOrgGrid();
		}else{
			return;
		}
		
		if(mode == 'edit'){
			method = 'PUT';
			url = applicationContext+'/rest/productLines/update';
		}else{
			method = 'POST';
			url = applicationContext+'/rest/productLines';
		}
		
		if(form.isValid()){
			var values = form.getValues(),
				orderFileNameExtension = values.orderFileNameExtension;
			
			values.assignCSRName = me.assignCSRName;
				
			if(!Ext.isEmpty(orderFileNameExtension) && orderFileNameExtension.indexOf('.') == -1){
				Helper.showToast('validation', 'Order File Format is not correct,please fill correct format.');
				return;
			}
			
			var valueObj = me.processPostData(values);
			
			if(values.groupingLogic == 'true' && Ext.isEmpty(values.groupingField_1)){
				Helper.showToast('validation', 'Please fill groupingField1.');
				return;
			}
			
			if(!valueObj.waiveMOQ){
				valueObj.waiveMOQ = false;
			}
			
			if(mode == 'edit'){
				valueObj.id = view.rec.get('id');
			}
			//app default params need to post for identification process as: 11/07/2017
			Ext.apply(valueObj, Helper.getDefaultProuctLineFieldParams());
			
			if(valueObj.fileOrderFileContent){
				valueObj.fileOrderMatchRequired = true;
				delete valueObj.fileOrderFileContent;
			}
			
			valueObj.lastModifiedBy = AOCRuntime.getUser().firstName+' '+ (!Ext.isEmpty(AOCRuntime.getUser().lastName) ? AOCRuntime.getUser().lastName : '');
			Ext.apply(valueObj,{listOrderSystemInfo:listOrderSystemInfo});
			
			//if grouping field_1 is empty or groupinglogic false then default value of groupingField_1:'id'
			if(values.groupingLogic == 'false'){
				values.groupingField_1 = 'id';
				me.setEmptyGroupingField(values);
			}
			
			view.el.mask(AOCLit.pleaseWait);
			
			Ext.Ajax.request({
				url: url,
				method: method,
				jsonData:valueObj,
				success:function(response){
					Ext.getBody().unmask();
					var jsonData = JSON.parse(response.responseText);
					if(jsonData.valueExist){
						refs['dataStructureName'].focus();
						Helper.showToast('validation', jsonData.message);
						return
					}
					Helper.showToast('success', jsonData.message);
					view.el.unmask();
					view.contextView.store.load();
					view.close();
				},
				failure:function(){
					view.el.unmask();
				}
			});
		}else{
			Helper.showToast('validation', 'Please fill all mandatory(*) field');
		}
	},
	setEmptyGroupingField:function(values){
		for(var prop in values){
			if(prop != 'groupingField_1' && prop.indexOf('groupingField') > -1){
				values[prop] = '';
			}
		}
	},
	processSystemOrgGrid:function(){
		var me = this,
			refs = me.getReferences(),
			defaultSystemCombo = refs['defaultSystemCombo'],
			systemcontainer = refs['systemcontainer'],
			checkboArray = systemcontainer.checkboArray,
			len = checkboArray.length,
			currentcheckBox,
			systemGridStore,
			orgGridStore,
			currentOrgGrid = '',
			currentSystemGrid = '',
			defaultSystemComboVal = defaultSystemCombo.getRawValue();
		
		var listOrderSystemInfo = new Array(),
			isCheckBoxSelected = false;
		
		for(var i=0; i < len; i++){
			currentcheckBox = refs[checkboArray[i]];
			
			if(currentcheckBox){
				isCheckBoxSelected = true;
				currentSystemGrid = refs[checkboArray[i]+'systemGrid'];
				currentOrgGrid = refs[checkboArray[i]+'orgGrid'];
				
				if(currentSystemGrid.editingPlugin.editing){
					currentSystemGrid.focus();
				}
				if(currentOrgGrid.editingPlugin.editing){
					currentOrgGrid.focus();
				}
				
				systemGridStore = currentSystemGrid.getStore();
				
				currentSystemGrid.showValidationError = true;
				currentSystemGrid.getView().refresh();
				
//				if(currentSystemGrid.isSystemGridNotValid){
//					Helper.showToast('validation', AOCLit.fillMandatoryCellMsg);
//					return false;
//				}
				
				orgGridStore = currentOrgGrid.getStore();
				var listOrgInfo = new Array();
				
				currentOrgGrid.showValidationError = true;
				currentOrgGrid.getView().refresh();
				
				for(var j=0; j < orgGridStore.getCount(); j++){
					var currentRec = orgGridStore.getAt(j).data;
					delete currentRec.freightTermsData;
					delete currentRec.shippingMethodData;
					if(currentRec.newRecord){
						delete currentRec.id;
					}
					listOrgInfo.push(currentRec);
				}
				if(currentcheckBox.name == defaultSystemComboVal){
					this.assignCSRName = systemGridStore.getAt(0).data.csrName;
				}
				systemGridStore.getAt(0).data.listOrgInfo = listOrgInfo;
				
				if(currentcheckBox.getValue()){
					systemGridStore.getAt(0).data.defaultSelected = true;
				}else{
					systemGridStore.getAt(0).data.defaultSelected = false;
				}
				
				if(systemGridStore.getAt(0).data.newRecord){
					delete systemGridStore.getAt(0).data.id;
				}
				listOrderSystemInfo.push(systemGridStore.getAt(0).data);
			}
		}
		if(!isCheckBoxSelected){
			Helper.showToast('validation', AOCLit.checkSystemChechBoxMsg);
			return false;
		}
		return listOrderSystemInfo;
	},
	processPostData:function(values){
		var me = this,
			obj = {};
		
		values.partnerId = values.partnerId.toString();
		values.rboId = values.rboId.toString();
		
    	obj.emailSubjectProductlineMatchRequired = values.emailSubjectProductLineMatchRequired;
		obj.emailBodyProductlineMatchRequired = values.emailBodyProductLineMatchRequired;
		
		obj.emailSubjectRBOMatch = values.emailSubjectRBOKeyword;
		obj.emailBodyRBOMatch = values.emailBodyRBOKeyword;
		obj.emailSubjectProductLineMatch = values.emailSubjectProductLineKeyword;
		obj.emailBodyProductLineMatch = values.emailBodyProductLineKeyword;
		obj.emailSubjectPartnerMatch = values.emailSubjectPartnerFactoryKeyword;
		obj.emailBodyPartnerMatch = values.emailBodyPartnerFactoryKeyword;
		
		obj.fileRBOMatchRequired = values.fileOrderRBOMatchRequired;
		obj.fileProductLineMatchRequired = values.fileOrderProductLineMatchRequired;
		obj.fileOrderPartnerRequired = values.fileOrderPartnerRequired;
		
		obj.fileRBOMatch = me.getCombinedValue(values.fileOrderRBOKeyword, values.fileOrderRBOCellNo);
		obj.fileProductlineMatch = me.getCombinedValue(values.fileOrderProductLineKeyword, values.fileOrderProductLineCellNo);
		obj.fileOrderPartnerMatch = me.getCombinedValue(values.fileOrderPartnerFactoryKeyword, values.fileOrderPartnerFactoryCellNo);
		
		obj.sizeCheck = me.getSKUValidationValue(values.sizeValidationMultipleProductLine, values.sizeCheck);
		obj.fiberpercentagecheck = me.getSKUValidationValue(values.fiberContentValidationMultipleProductLine, values.fiberpercentagecheck);
		obj.coocheck = me.getSKUValidationValue(values.cooValidationMultipleProductLine, values.coocheck);
		obj.factoryMOQCheck = me.getSKUValidationValue(values.factoryMoqValidationMultipleProductLine, values.factoryMOQCheck);
		
		//order received in email body
		if(values.orderFileNamePattern && values.fileOrderFileContent){
			obj.fileOrderMatchLocation = 'FileName|FileContent';
		}
		if(!values.orderFileNamePattern && values.fileOrderFileContent){
			obj.fileOrderMatchLocation = 'FileContent';
		}
		
		if(values.fileOrderCellNo){
			obj.fileOrderMatch = me.getCombinedValue(values.fileOrderFileContent, values.fileOrderCellNo);
		}else{
			obj.fileOrderMatch = me.getCombinedValue(values.fileOrderFileContent, values.fileOrderCellNo);
		}
		
		obj.attachmentFileOrderMatch = me.getCombinedValue(values.attachmentFileKeyWording, values.attachmentCellNo);
    	
		delete values.attachmentFileKeyWording;
		delete values.attachmentCellNo;
		delete values.fileOrderFileName;
		//delete values.fileOrderFileContent;
		delete values.fileOrderCellNo;
		
		delete values.emailSubjectProductLineMatchRequired;
		delete values.emailBodyProductLineMatchRequired;
		
		delete values.emailSubjectRBOKeyword;
		delete values.emailBodyRBOKeyword;
		delete values.emailSubjectProductLineKeyword;
		delete values.emailBodyProductLineKeyword;
		delete values.emailSubjectPartnerFactoryKeyword;
		delete values.emailBodyPartnerFactoryKeyword;
		delete values.fileOrderRBOMatchRequired;
		delete values.fileOrderProductLineMatchRequired;
		delete values.fileOrderPartnerRequired;
		delete values.fileOrderRBOKeyword;
		
		delete values.fileOrderRBOCellNo;
		delete values.fileOrderProductLineKeyword;
		delete values.fileOrderProductLineCellNo;
		delete values.fileOrderPartnerFactoryKeyword;
		delete values.fileOrderPartnerFactoryCellNo;
		
		delete values.sizeValidationMultipleProductLine;
		delete values.fiberContentValidationMultipleProductLine;
		delete values.cooValidationMultipleProductLine;
		delete values.factoryMoqValidationMultipleProductLine;
		
		Ext.apply(values, obj);
		return values;
	},
	getCombinedValue:function(keyword, cellNo){
		var leftKeyword ='',
			rightKeyword = '',
			leftCellNo ='',
			rightCellNo = '';
		
		if(!Ext.isEmpty(keyword) && !Ext.isEmpty(cellNo)){
			var spliter = keyword.indexOf(' AND ') > -1 ? ' AND ' : (keyword.indexOf(' OR ') > -1 ? ' OR ' : '');
			if(spliter){
				if(keyword.indexOf(spliter) > -1){
					var strA = keyword.split(spliter);
					leftKeyword = strA[0].trim();
					rightKeyword = strA[1].trim();
				}
				if(cellNo.indexOf(spliter) > -1){
					var strA = cellNo.split(spliter);
					leftCellNo = strA[0].trim();
					rightCellNo = strA[1].trim();
				}
				var spliterFormat = spliter == ' AND ' ? '_&&_' : '_._';
				return 'Value:'+leftKeyword+';Cell:'+leftCellNo + spliterFormat + 'Value:'+rightKeyword+';Cell:'+rightCellNo;
			}
			return 'Value:'+keyword +';Cell:'+cellNo;
		}
		if(!Ext.isEmpty(keyword) && Ext.isEmpty(cellNo)){
			return 'Value:'+keyword;
		}
		return '';
	},
	getSKUValidationValue:function(multipleLine, check){
		if(!Ext.isEmpty(multipleLine)){
			return multipleLine;
		}
		if(check == '1'){
			return check
		}
		return '0';
	},
    onCancelDetails:function(){  
    	this.getView().contextView.store.load();
		this.getView().destroy();
	},
	createproductline:function(){
		var me = this;
		var win = Ext.create('AOC.view.partner.CreatePartnerProductLine',{
			title:AOCLit.addPartProdLine,
			contextView: me.getView()
		});
		win.show();
	},
	getProductLineBasedOnSearch:function() {
	 	var valueObj = this.getView().getForm().getValues(false,true),
	 		FromDate = this.lookupReference('fromDate').getValue(),
	 		ToDate = this.lookupReference('toDate').getValue();
	 	
	 	if(FromDate <= ToDate){
	    	if(!valueObj.hasOwnProperty('datecriteriavalue')){
	    		valueObj.datecriteriavalue='createdDate';
	    	}
    		
			var parameters = Ext.JSON.encode(valueObj);
	    	
	    	if(archievegrid != null){
	    		var currentView = Ext.ComponentQuery.query('#archivemanageitemId')[0];
	    		var valueObj=(currentView.lookupReference('cmbformArchive')).getForm().getValues(false,true);
				var grid = archievegrid;
			}
	    	var store=grid.store;
	        store.proxy.setFilterParam('query');
	        store.setRemoteFilter(true);
	        if (!store.proxy.hasOwnProperty('filterParam')) {
	            store.proxy.setFilterParam('query');
	        }
	        store.proxy.encodeFilters = function(filters) {
	            return filters[0].getValue();
	        };
	        store.filter({
	        	id: 'query',
	            property:'query',
	            value:parameters
	        });
        	grid.down('#clearadvanedsearch').show();
        	this.getView().up('window').hide();
 		}
 	 	else{
		    Helper.showToast('validation', AOCLit.setDateMsg);
 		 } 	
	},
    onSiteSelect:function(cmp){
    	var me = this,
    		value = cmp.getValue(),
    		view = me.getView(),
    		refs = me.getReferences(),
    		defaultSystemCombo = refs['defaultSystemCombo'];
    	
    	Ext.Ajax.request( {
			method: 'GET',
		    url : applicationContext+'/rest/system/site/'+value,
		    success : function(response, opts) {
		    	var systemContainer= refs['systemcontainer'],
		    		jsonString = Ext.JSON.decode(response.responseText);
		    	
		    	systemContainer.removeAll();
		    	
		    	defaultSystemCombo.setDisabled(false);
		    	defaultSystemCombo.store.loadData(jsonString);
		    	if(view.mode != 'add'){
		    		defaultSystemCombo.setValue(view.rec.get('defaultSystem'));
		    	}
		    	
	    		if(jsonString.length == 0){
	    			Helper.showToast('validation','No System Configured for the selected site. Please select another site');
	    			return false;
	    		}
	    		
	    		checkboArray = new Array();
	    		var len = jsonString.length;
	    		
	    		for(var i = 0; i < len; i++){
	    			systemContainer.add(me.getSystemContainer(jsonString[i]));
	    			systemContainer.checkboArray.push(jsonString[i].name);
	    		}
	    		if(me.getView().mode != 'add'){
		    		if(!cmp.changedBefore){
		    			cmp.changedBefore = true;
		    			me.getListOrderSystemInfo(view);
		    			
		    		}
	    		}
		    	view.unmask();
	        },
	        failure: function(response, opts) {
	        	view.unmask();
	        }
	    });
	},
	getListOrderSystemInfo:function(view){
		var refs = view.getReferences();
		
		Ext.Ajax.request({
			url:applicationContext+'/rest/ordersysteminfo/productline',
			method:'GET',
			params:{id: view.rec.get('id')},
			success:function(response){
				var jsonData = JSON.parse(response.responseText),
					listOrderSystemInfo = jsonData.listOrderSystemInfo;
			
	    		if(listOrderSystemInfo.length > 0){
	    			var listLen = listOrderSystemInfo.length;
	    			
	    			for(var i = 0; i < listLen; i++){
	    				var item = listOrderSystemInfo[i]
	    					system = item.varSystem,
	    					systemName = system.name,
	    					checkBox = refs[systemName],
	    					orgGrid = refs[systemName+'orgGrid'];
	    				
	    				if(item.defaultSelected){
	    					checkBox.setValue(true);
	    				}
	    				
	    				var systemStore = Ext.data.StoreManager.lookup('systemStore'+system.id),
	    					orgStore = Ext.data.StoreManager.lookup('orgInfoStore'+system.id);
	    				
	    				systemStore.removeAll();
	    				orgStore.removeAll();
	    				
	    				systemStore.add(listOrderSystemInfo[i]);
	    				orgStore.add(listOrderSystemInfo[i].listOrgInfo);
	    				
		  	    		var index = orgStore.find('defaultSelected',true);
		  	    		if(index!=-1){
		  	    			orgGrid.getSelectionModel().select(index);
		  	    		}
	    			}
	    		}
			},
			failure:function(){
			}
		});
	},
	getSystemContainer:function(selectedSystemArray){
		var me = this,
			response = Ext.Ajax.request({
	            async: false,
	            url: applicationContext+'/rest/org/system/'+selectedSystemArray.id
	        });
		
      	var jsonValue = Ext.decode(response.responseText),
      		totalOrgConfigured = jsonValue.length;
      	
      	var orgStore = Ext.create('Ext.data.Store',{
				fields:['id','name'],
				storeId:'orgStore'+selectedSystemArray.id,
				data:jsonValue
	      	}),
	      	
	      	systemStore = Ext.create('Ext.data.Store',{
				fields:['id','name',{
					name:'newRecord', defaultValue:false
				}],
				storeId:'systemStore'+selectedSystemArray.id,
				data:[{
					'csrname':'','systemId':selectedSystemArray.id, newRecord:true
				}]
			});
      	
		var index = orgStore.find('id','none','', false, false, true),
			obj = {id:'none', name:'None'};
	
		if(index == -1){
			orgStore.insert(0,new Ext.data.Record(obj));
		}
		
		var orgOrderStore,
			data='';
		
		if(totalOrgConfigured > 0){
			data={
				orgCodeId:jsonValue[0].id,
				defaultSelected:true,
				newRecord:true
			};
		}
		orgOrderStore=Ext.create('Ext.data.Store',{//isDefault
			fields:['id','name',{
				name:'newRecord', defaultValue:false
			},{
				name:'defaultSelected'
			}],
			storeId:'orgInfoStore'+selectedSystemArray.id,
			data:[data]
		});
		
		if(totalOrgConfigured == 0){
			orgOrderStore.removeAll();
		}
		
		return [{
			xtype:'checkbox',
			margin : '0 0 5 0',
			disabled:me.getView().mode == 'view',
			anchor:'100%',
			readOnly: AOCRuntime.getUser().role == 3 ? true : false,
			boxLabel: selectedSystemArray.name,
			reference: selectedSystemArray.name,
            name:selectedSystemArray.name,
            inputValue: selectedSystemArray.id,
            listeners:{
            	'change':function(cmp, newValue){
            		var refs = cmp.up('#createpartnerproductlineItemId').getReferences (),
            			systemGrid = refs[cmp.name+'systemGrid'],
            			orgGrid = refs[cmp.name+'orgGrid'];
            		
            		if(newValue){
            			orgGrid.show();
            			systemGrid.show();
            		}else{
            			orgGrid.hide();
            			systemGrid.hide();
            		}
            	}
            }
		},
		{
			xtype:'systemgrid',
			store:systemStore,
			frame:true,
			margin : '0 0 0 0',
			hidden:true,
			anchor:'100%',
			reference:selectedSystemArray.name+'systemGrid'
		},
		{
			xtype:'fieldcontainer',
			layout:'hbox',
			anchor:'100%',
			margin : '1 0 0 0',
			items:[
		       {
	    			xtype:'orggrid',
	    			flex:1,
	    			frame:true,
	    			store:orgOrderStore,
	    			orgStore:orgStore,
	    			uniqueName:selectedSystemArray.name,
	    			maxRecord:totalOrgConfigured,
	    			hidden:true,
	    			systemId:selectedSystemArray.id,
	    			reference:selectedSystemArray.name+'orgGrid'
		       }
	        ]
		}];
	 },
	 getFormInvalidFields: function(form) {
		 var invalidFields = [];
		 Ext.suspendLayouts();
		 form.getFields().filterBy(function(field) {
	        if (field.validate()) return;
	        invalidFields.push(field.getName());
		 });
		 Ext.resumeLayouts(true);
		 return invalidFields;
	 },
	 //Advance Search
	 openAdvancedSearchWindow:function(){
	    	var advanceSearchWin = Ext.create('AOC.view.advsearch.ProductLineAdvanceSearch',{contextGrid:this.getView()});
	    	if(!advanceSearchWin.isVisible()){
	    		advanceSearchWin.show();
	    	}
	 },
	 onSearchBtnClicked:function(btn){
    	  var view = this.getView(),
    	  	  refs = view.getReferences(),
    	  	  form = refs.productlineAdvanceSearchForm.getForm(),
    	  	  values = form.getValues();
    	  	  values.datecriteriavalue = 'createdDate';
    	  	  store = view.contextGrid.store;
              Helper.advancedSearch(view,values);
	 },
	 clearAdvancedSearch:function(btn){
        var grid = this.getView(),
        	store = grid.store;
        store.clearFilter();
        store.loadPage(1);
        btn.hide();
	 },
	 getQuickSearchResults: function(cmp) {
    	var view = this.getView(),
        	value = cmp.getValue();
        Helper.quickSearch(view,{partnerDataStructure: value}),
        cmp.orderedTriggers[0].show();
	 },
	 getSearchResults: function(cmp, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.getQuickSearchResults(cmp);
        }
	 },
	 clearSearchResults: function(cmp) {
        var grid = this.getView();
        var store = grid.store;
        store.clearFilter();
        store.loadPage(1);
        cmp.setValue('');
        cmp.orderedTriggers[0].hide();
	 },
			    
	//////////////////////////
	 onSKUValidationRadioChange:function(field, newValue, oldValue){
		var me = this,
			refs= me.getReferences(),
			cont = refs[field.type+'MultipleProductLine'];
		
		if(newValue[field.reference] == '1'){
			cont.setDisabled(false);
			if(refs['productLineTypeCombo'].getValue().indexOf('/') > -1){
				cont.allowBlank = false;
			}else{
				cont.allowBlank = true;
			}
			
		}else{
			cont.allowBlank = true;
			cont.setDisabled(true);
		}
	 },
	 onOrderWithAttachmentRadioChange:function(field, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
			cont1 = refs.additionalAttachmentFileCont,
			cont2 = refs.additionalAttachmentFileCont2,
			cont3 = refs['attchmentSchemaCont1'],
			cont4 = refs['attchmentSchemaCont2'],
			attachmentFileNameExtension_1 = refs['attachmentFileNameExtension_1'],
			attachmentFileNamePattern_1 = refs['attachmentFileNamePattern_1'],
			attachmentIdentifier_1 = refs['attachmentIdentifier_1'];
			
		
		if(newValue.attachmentRequired == 'true'){
			attachmentFileNameExtension_1.allowBlank = false;
			attachmentFileNamePattern_1.allowBlank = false;
			attachmentIdentifier_1.allowBlank = false;
			
			cont1.setDisabled(false);
			cont2.setDisabled(false);
			cont3.setDisabled(false);
			cont4.setDisabled(false);
		}else{
			attachmentFileNameExtension_1.allowBlank = true;
			attachmentFileNamePattern_1.allowBlank = true;
			attachmentIdentifier_1.allowBlank = true;
			
			cont1.setDisabled(true);
			cont2.setDisabled(true);
			cont3.setDisabled(true);
			cont4.setDisabled(true);
		}
	 },
	 onComboSelect:function(field, e){
		Helper.selectCombo(field);
	 },
	 onWIComboBlur:function(field, e){
		Helper.clearCombo(field, e);
	 },
	 onAttachmentRequiredRadioChange:function(field, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
			attachmentFieldCont = refs.attachmentFieldCont;
		
		if(newValue.attachmentFileMatchRequired == 'true'){
			attachmentFieldCont.setDisabled(false);
		}else{
			attachmentFieldCont.setDisabled(true);
		}
	 },
	 onOrderReceivedEmailBodyRadioChange:function(field, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
			fileNameField = refs['fileOrderFileName'],
			fileContentField = refs['fileOrderFileContent'],
			cellNo = refs['fileOrderMatch'],
			emailSubject = refs['fileOrderEmailSubject'],
			emailBody = refs['fileOrderEmailBody'];
	
		if(newValue['orderInMailBody'] == 'true'){
			fileNameField.setDisabled(true);
			fileContentField.setDisabled(true);
			cellNo.setDisabled(true);
			
			emailSubject.setDisabled(false);
			emailBody.setDisabled(false);
			emailBody.allowBlank = false;
			fileContentField.allowBlank = true; 
			
		}else{
			fileNameField.setDisabled(false);
			fileContentField.setDisabled(false);
			cellNo.setDisabled(false);
			
			emailBody.allowBlank = true;
			fileContentField.allowBlank = false; 
			
			emailSubject.setDisabled(true);
			emailBody.setDisabled(true);
		}
	 },
	 onRequiredRadioChange:function(field, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
			name = field.fieldName,
			cont1 = refs[field.childCont1],
			cont2 = refs[field.childCont2];
		
		if(newValue[name] == 'true'){
			//cont1.setDisabled(false);
			//cont2 ? cont2.setDisabled(false) : '';
			if(cont1.xtype == 'textfield'){
				cont1.allowBlank = false;
			}
		}else{
			//cont1.setDisabled(true);
			//cont2 ? cont2.setDisabled(true)  :'';
			if(cont1.xtype == 'textfield'){
				cont1.allowBlank = true;
			}
		}
	 },
	 
	 getAdvancedSearchResults: function(cmp, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onSearchBtnClicked();
        }
	 },
	 
	 onCellNoBlur:function(field){
		var me = this,
		  	refs = me.getReferences(),
		  	prevItemRefs = refs[field.prevItemRefs],
		  	value = field.getValue(),
		  	andFlag = false,
		  	orFlag = false;
		
		if(prevItemRefs.getValue().indexOf(' AND ') > -1){
			andFlag = true;
		}
		if(prevItemRefs.getValue().indexOf(' OR ') > -1){
			orFlag = true;
		}
		if((andFlag && value.indexOf(' AND ') == -1) || (orFlag && value.indexOf(' OR ') == -1)){
			field.setValue('');
			field.allowBlank =false;
			Helper.showToast('validation', 'Cell No should be followed same format as Keyword contains');
			return;
		}
		field.allowBlank = true;
	 },
	 
	 onKeywordFieldBlur:function(field){
		 var value = field.getValue();
		 if(field.fileOrderType){
			 if(value.indexOf(' and ') > -1 || value.indexOf(' or ') > -1){
				 field.setValue('');
				 field.focus();
				 Helper.showToast('validation', 'Please enter value with "AND" or "OR".');
			 }
		 }
	 },
	 
	 onAddGroupingFieldBtnClick:function(btn){
		 var me = this,
		 	 refs = me.getReferences(),
		 	 groupingLogic = refs['groupingLogic'],
		 	 groupingFieldCont = refs['groupingFieldCont'],
		 	 count = btn.fieldIndex,
		 	 removeGroupingFieldBtn = refs['removeGroupingFieldBtn'+count];
		 
		 if(groupingLogic.getValue().groupingLogic == 'false'){
			 Helper.showToast('validation', 'If value of Need Grouping Logic is No.You can not add more grouping field.');
			 return;
		 }
		 if(count > AOCLit.maxGroupingFieldCount){
			 Helper.showToast('validation', 'You can not add more grouping field');
			 return;
		 }
		 
		 groupingFieldCont.add(Helper.getGroupingField(++count, true));
		 removeGroupingFieldBtn.hide();
		 btn.hide();
	 },
	 
	 onRemoveGroupingFieldBtnClick:function(btn){
		 if(btn.newFlag){
			 var me = this,
		 		 refs = me.getReferences(),
		 		 count = btn.fieldIndex,
		 		 groupingFieldCont = refs['groupingFieldCont'],
		 		 groupingFieldsetCont = refs['groupingFieldCont'+count],
		 		 prevCount = --count,
		 		 removeGroupingFieldBtn = refs['removeGroupingFieldBtn'+prevCount],
		 		 addGroupingFieldBtn = refs['addGroupingFieldBtn'+prevCount]
			 
			 groupingFieldCont.remove(groupingFieldsetCont);
			 
			 if(prevCount != 1){
				 removeGroupingFieldBtn.show();
			 }
			 addGroupingFieldBtn.show();
		 }
	 },
	 
	 onGroupingComboSelect:function(field){
		 if(field.getValue() == 'None'){
			 field.setValue('');
		 }
	 },
	 
	 onBillShipMappingBtnClick:function(btn){
		var me = this,
		 	refs = me.getReferences(),
		 	view = me.getView(),
		 	win = Ext.create('AOC.view.base.NewBaseWindow',{
		 		title:'Bill/Ship Mapping Table',
		 		width:Ext.getBody().getWidth()-100,
		 		height:Ext.getBody().getHeight()-100,
		 		resizable:false,
		 		draggable:false,
		 		layout:'border',
		 		items:[
		 		    {
		 		    	xtype:'billshipmappinggrid',
		 		    	region:'center',
		 		    	refs:'billShipMappingGrid',
		 		    	listeners:{
		 		    		afterrender:function(grid){
		 		    			grid.store.load({
		 		    				params:{id:view.rec.get('id')}
		 		    			});
		 		    		}
		 		    	}
		 		    }
		 		],
		 		buttons:[
		 		     '->',
		 		    {
		 		    	text:'Close',
		 		    	iconCls:'x-fa fa-times',
		 		    	handler:function(){
		 		    		win.close();
		 		    	}
		 		    }
		 		]
		 	});
		
		win.show();
	 },
	 
	 onFileFormatFieldBlur:function(field){
		var me = this,
		 	value = field.getValue();
		 
		 if(value && value.indexOf('.') == -1){
			 field.setValue('');
			 field.allowBlank = false;
			 Helper.showToast('validation', 'Please follow format to fill file format.');
		 }
	 },
	 
	 onGroupingLogicChange:function(cb, newValue, oldValue){
		 var me = this,
		 	 refs = me.getReferences(),
		 	 groupingFieldCont = refs['groupingFieldCont'];
		 
		 if(newValue.groupingLogic == 'true'){
			// groupingFieldCont.setDisabled(false);
		 }else{
			// groupingFieldCont.setDisabled(true);
		 }
	 }
});