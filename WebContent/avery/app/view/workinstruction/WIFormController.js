Ext.define('AOC.view.workinstruction.WIFormController',{
	extend:'Ext.app.ViewController',
	alias:'controller.wiformcontroller',
	
	//Back button click
	onBackBtnClick:function(btn){
		var view = this.getView();
		var parentCont = view.up('wicontainer');
		parentCont.getLayout().setActiveItem(0);
	},
	
	//Order File section
	onOrderRadioChange:function(field, newValue, oldValue){
		var me = this;
		if(newValue.order == 2){
			me.showHideOrderTextExcelField(true);
		}else{
			me.showHideOrderTextExcelField(false);
		}
	},
	showHideOrderTextExcelField:function(showFlag){
		var me = this,
			refs = this.getReferences(),
			orderTextFirstLastPage = refs.orderTextFirstLastPage,
			orderTextPosition = refs.orderTextPosition,
			orderExcelCell = refs.orderExcelCell,
			orderExcelSheet = refs.orderExcelSheet;
		
		orderTextFirstLastPage[showFlag ? 'hide' : 'show']();
		orderTextPosition[showFlag ? 'hide' : 'show']();
		orderExcelCell[showFlag ? 'show' : 'hide']();
		orderExcelSheet[showFlag ? 'show' : 'hide']();
	},
	//End of Order File section
	
	//Attachment section
	onAttachmentRadioChange:function(field, newValue, oldValue){
		var me = this;
		if(newValue.attach == 2){
			me.showHideAttachmentTextExcelField(true);
		}else{
			me.showHideAttachmentTextExcelField(false);
		}
	},
	showHideAttachmentTextExcelField:function(showFlag){
		var me = this,
			refs = this.getReferences(),
			attachmentTextFirstLastPage = refs.attachmentTextFirstLastPage,
			attachmentTextPosition = refs.attachmentTextPosition,
			attachmentExcelCell = refs.attachmentExcelCell,
			attachmentExcelSheet = refs.attachmentExcelSheet;
		
		attachmentTextFirstLastPage[showFlag ? 'hide' : 'show']();
		attachmentTextPosition[showFlag ? 'hide' : 'show']();
		attachmentExcelCell[showFlag ? 'show' : 'hide']();
		attachmentExcelSheet[showFlag ? 'show' : 'hide']();
	},
	
	//End of Attachment section
	
	//Save btn click
	onSaveBtnClick:function(btn){
		var me = this,
			refs = me.getReferences(),
			wiFormPanel = refs.wIForm,
			form = wiFormPanel.getForm(),
			values = form.getValues();
		
		Ext.apply(values, {listWiSchemaIdentification:me.getSchemaIdentificationParams(values)});
		Ext.apply(values, {listWiSystem:me.processGridData(refs.wiSystemGrid)});
		Ext.apply(values, {listWiOrg:me.processGridData(refs.wiOrgGrid)});
		Ext.apply(values, {listWiAocField:me.processGridData(refs.wiaocfieldgrid)});
		Ext.apply(values, {listWiSystemLevel:me.processGridData(refs.wiorderfiberlinegrid, true)});
		
		Ext.Ajax.request({
			url:applicationContext+'/rest/wi',
			jsonData:values,
			success:function(response){
				Helper.showToast('success','Record has been suuccessfully saved');
			},
			failure:function(){
				
			}
		});
		
		console.log(values);
	},
	getSchemaIdentificationParams:function(values){
		 var obj ={
			 emailSubjectRequired : values.emailSubjectRequired,
			 emailFileNameContent : values.emailFileNameContent,
			 emailSubjectKeyWording : values.emailSubjectKeyWording,
			 emailSubjectDataStructureRule: values.emailSubjectDataStructureRule,
			 emailSubjectDataStructureOtherRule:values.emailSubjectDataStructureOtherRule,
			 orderFileRequired:values.orderFileRequired,
			 orderFileNameContent:values.orderFileNameContent,
			 orderFileKeyWording:values.orderFileKeyWording,
			 orderFileFormat:values.orderFileTypeFormat,
			 orderFileType:values.orderFileType,
			 orderTextFirstLastPage:values.orderTextFirstLastPage,
			 orderTextPosition:values.orderTextPosition,
			 orderExcelCell:values.orderExcelCell,
			 orderExcelSheet:values.orderExcelSheet,
			 attachmentRequired:values.attachmentRequired,
			 attachmentFileNameContent:values.attachmentFileNameContent,
			 attachmentFileKeyWording:values.attachmentFileKeyWording,
			 attachmentFormat:values.attachmentFormat,
			 attachmentFileType:values.attachmentFileType,
			 attachmentTextFirstLastPage:values.attachmentTextFirstLastPage,
			 attachmentTextPosition:values.attachmentTextPosition,
			 attachmentExcelCell:values.attachmentExcelCell,
			 attachmentExcelSheet:values.attachmentExcelSheet
		 }
		 delete values.emailSubjectRequired;
		 delete values.emailFileNameContent;
		 delete values.emailSubjectKeyWording;
		 delete values.emailSubjectDataStructureRule;
		 delete values.emailSubjectDataStructureOtherRule;
		 delete values.orderFileRequired;
		 delete values.orderFileNameContent;
		 delete values.orderFileKeyWording;
		 delete values.orderFileTypeFormat;
		 delete values.orderFileType;
		 delete values.orderTextFirstLastPage;
		 delete values.orderTextPosition;
		 delete values.orderExcelCell;
		 delete values.orderExcelSheet;
		 delete values.attachmentRequired;
		 delete values.attachmentFileNameContent;
		 delete values.attachmentFileKeyWording;
		 delete values.attachmentFormat;
		 delete values.attachmentFileType;
		 delete values.attachmentTextFirstLastPage;
		 delete values.attachmentTextPosition;
		 delete values.attachmentExcelCell;
		 delete values.attachmentExcelSheet;
		 
		 return obj;
	},
	processGridData:function(grid, addRecordIdFlag){
		var store = grid.store,
			records = [];
	
		store.each(function(rec){
			var modifiedRecords = rec.getChanges();
			Ext.apply(rec.data, modifiedRecords);
			if(rec.data.id){
				rec.data.listId = !addRecordIdFlag ? (rec.data.id).toString() : '';
				delete rec.data.id;
			}
			records.push(rec.data);
		});
		return records;
	},
	
	//SChema Identification
	onEmailSubjectRequiredRadioChange:function(field, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
			emailFileNameContent = refs.emailFileNameContent,
			emailSubjectKeyWording = refs.emailSubjectKeyWording,
			emailSubjectDataStructureRule = refs.emailSubjectDataStructureRule;
		
		if(newValue.emailSubjectRequired == 1){
			emailFileNameContent.setDisabled(false);
			emailSubjectKeyWording.setDisabled(false);
			emailSubjectDataStructureRule.setDisabled(false);
		}else{
			emailFileNameContent.setDisabled(true);
			emailSubjectKeyWording.setDisabled(true);
			emailSubjectDataStructureRule.setDisabled(true);
		}
	},
	onEmailBodyRequiredRadioChange:function(field, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
			emailBodyIdentificationType = refs.emailBodyIdentificationType,
			emailBodyKeyWording = refs.emailBodyKeyWording;
		
		if(newValue.emailBodyRequired == 1){
			emailBodyIdentificationType.setDisabled(false);
			emailBodyKeyWording.setDisabled(false);
		}else{
			emailBodyIdentificationType.setDisabled(true);
			emailBodyKeyWording.setDisabled(true);
		}
	},
	onAttachmentRequiredRadioChange:function(field, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
			attachmentFileNameContent = refs.attachmentFileNameContent,
			attachmentFileKeyWording = refs.attachmentFileKeyWording,
			attachmentFormat = refs.attachmentFormat;
		
		if(newValue.attachmentRequired == 1){
			attachmentFileNameContent.setDisabled(false);
			attachmentFileKeyWording.setDisabled(false);
			attachmentFormat.setDisabled(false);
		}else{
			attachmentFileNameContent.setDisabled(true);
			attachmentFileKeyWording.setDisabled(true);
			attachmentFormat.setDisabled(true);
		}
	},
	onOrderRequiredRadioChange:function(field, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
			orderFileNameContent = refs.orderFileNameContent,
			orderFileKeyWording = refs.orderFileKeyWording,
			orderFileTypeFormat = refs.orderFileTypeFormat;
		
		if(newValue.orderFileRequired == 1){
			orderFileNameContent.setDisabled(false);
			orderFileKeyWording.setDisabled(false);
			orderFileTypeFormat.setDisabled(false);
		}else{
			orderFileNameContent.setDisabled(true);
			orderFileKeyWording.setDisabled(true);
			orderFileTypeFormat.setDisabled(true);
		}
	},
	
	//System Grid
	onSystemGridBeforeEdit:function(e, editor){
		var me = this,
			currentRecord = editor.record,
			systemName = currentRecord.get('systemName'),
			dataIndex = editor.column.dataIndex,
			defaultOrg = currentRecord.get('defaultOrg');
		
		if((systemName == 'Sparrow' ||(systemName == 'VIPS' && defaultOrg == 10)) 
				&& (dataIndex == AOCLit.variableDataBreakdown || dataIndex == AOCLit.splitByShipSet || dataIndex == AOCLit.shipMark)){
			return false;
		}
		else if((systemName == 'VIPS' && (defaultOrg == 6 || defaultOrg == 7 || defaultOrg == 8)) 
				&& (dataIndex == AOCLit.variableDataBreakdown || dataIndex == AOCLit.splitByShipSet || dataIndex == AOCLit.manufacturing
					|| dataIndex == AOCLit.invoiceLineInstruction)){
			return false;
		}
		else if((systemName == 'VIPS' && (defaultOrg == 4 || defaultOrg == 5 || defaultOrg == 9)) 
				&& (dataIndex == AOCLit.variableDataBreakdown || dataIndex == AOCLit.shipMark)){
			return false;
		}
	},
	onSystemDefaultOrgExpand:function(field){
		field.store.clearFilter();
		var grid = field.up('grid'),
			context = grid.editingPlugin.context,
			rowIdx = context.rowIdx,
			record = grid.store.getAt(rowIdx),
			system = record.get('systemName'),
			comboStore = field.store;
		
		switch(system){
		case 'Oracle':
			comboStore.filter('systemId', 31);
			break;
		case 'VIPS':
			comboStore.filter('systemId', 32);
			break;
		case 'Sparrow':
			comboStore.filter('systemId', 33);
			break;
		}
	},
	
	onSiteSelect:function(field){
		var me = this;
		me.showHideOrgView(field);
	},
	onSystemSelect:function(field){
		var me = this;
		me.showHideOrgView(field);
	},
	showHideOrgView:function(field){
		var me = this,
			refs = me.getReferences(),
			siteField = refs.site,
			wiOrgGrid = refs.wiOrgGrid,
			systemCombo = refs.sysetemField;
		
		if(siteField.getValue() && systemCombo.getValue()){
			wiOrgGrid.show();
		}else{
			wiOrgGrid.hide();
		}
	}
});