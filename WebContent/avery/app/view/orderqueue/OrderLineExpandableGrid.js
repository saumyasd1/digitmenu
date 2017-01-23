Ext.define('AOC.view.orderqueue.OrderLineExpandableGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'orderlineexpandablegrid',
    itemId: 'orderlineexpandablegrid',
    requires: [
		'Ext.grid.Panel', 
		'AOC.view.ux.RowExpanderGrid', 
		'AOC.view.ux.CustomRowEditing', 
		'AOC.util.Helper',
		'Ext.grid.RowEditor',
		'Ext.grid.plugin.Clipboard'
	],
    controller: 'orderline',
    emptyText: AOCLit.emptyDataMsg,
    //reference:'orderLineExpandableGrid',
    dataPresent:false,
    autoHeight: true,
    nestedGridRefrence:'listOrderlineDetails',
    columnLines: true,
    reserveScrollbar:true,
    mandatoryFieldMissing:false,
    mandatoryValidationFieldMissing:false,
    showMandatoryValidationField:false,
    validationFieldMissing:false,
    invalidComboValid:false,
    showInvalidCombo:false,
    columnLines: false,
    viewConfig : {
    	stripeRows : true,
        forceFit:true,
        getRowClass:function(record, rowIndex, rowParams, store){
        	//hide rowexpander if perticular record has atovalidationFlag is False
        	if(record.get('atovalidationFlag') == 'F'){
    			return 'hide-row-expander';
    		}else{
	        	var data = record.get('listOrderlineDetails');
				//filter nested grid record for show those record which have typeSetter or level value exist
				function processData(data){
					var len = data.length,
						items = [];
					
					for(var i = 0; i < len; i++){
						if(!Ext.isEmpty(data[i].level) || !Ext.isEmpty(data[i].typeSetter)){
							items.push(data[i]);
						}
					}
					return items;
				}
				var recordsArray = processData(data);
				if(recordsArray.length == 0){
					return 'hide-row-expander';
				}
    		}
        }
    },
    store:Ext.create('AOC.store.OrderLineStore', {storeId:'OrderLineStoreId'}),
    columns: [
		{
			text: 'ATO Mandatory',
			dataIndex: 'mandatoryVariableDataFieldFlag',
			width: 65,
			renderer:function(value, metadata,rec){
				var mandatoryVariableDataFieldFlag= rec.data.mandatoryVariableDataFieldFlag,
					checkvalue = value ? value.trim()  :'',
					listOrderlineDetails = rec.get('listOrderlineDetails'),
					mandatoryVariableDataField = '';
				
				listOrderlineDetails.sort(function(a, b){
					return (a.variableFieldName - b.variableFieldName);
				});
				
				var len = listOrderlineDetails.length;
				
				for(var i = 0; i < len; i++){
					if(listOrderlineDetails[i].mandatory == 'Y' && listOrderlineDetails[i].variableDataValue == ''){
						mandatoryVariableDataField = listOrderlineDetails[i].variableFieldName +' are missing';
						break;
					}
				}
				if(mandatoryVariableDataField){
					metadata.tdAttr = 'data-qtip="<font color=blue>' + mandatoryVariableDataField + '<font>"';
				}
				
				if(checkvalue.substr(0,1) == 'T'){
					return '<img src="' + AOC.config.Settings.buttonIcons.tick + '" />';
				}
				else if(checkvalue.substr(0,1) == 'F'){
					if(rec.get('status')==AOCLit.waitingForCSRStatusOrderLine){
						this.mandatoryValidationFieldMissing = true;
					}
					return '<img src="' + AOC.config.Settings.buttonIcons.cross + '" />';
				}
				else{
					return '<img src="' + AOC.config.Settings.buttonIcons.warning + '" />';	
				}
			}
		}, 
		{
			text: 'Bulk Sample',
			dataIndex: 'bulkSampleValidationFlag',
			width: 65,
			renderer:function(value, metadata,rec){
				var bulkSampleValidationFlag=rec.data.bulkSampleValidationFlag;
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ bulkSampleValidationFlag +'"';
				
				if(checkvalue.substr(0,1) == 'T'){
					return '<img src="' + AOC.config.Settings.buttonIcons.tick + '" />';
				}
				else if (checkvalue.substr(0,1) == 'F'){
					if(rec.get('status') == AOCLit.waitingForCSRStatusOrderLine){
						this.mandatoryValidationFieldMissing = true;
					}
					return '<img src="' + AOC.config.Settings.buttonIcons.cross + '"/>';
				}
				else{
					return '<img src="' + AOC.config.Settings.buttonIcons.warning + '"/>';
				}
			}
		}, 
		{
			text: 'Cust. PO#',
			dataIndex: 'customerPOFlag',
			width: 60,
			renderer:function(value, metadata,rec){
				var customerPOFlag=rec.data.customerPOFlag;
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ customerPOFlag +'"';
				
				if(checkvalue.substr(0,1) == 'T'){
					return '<img src="' + AOC.config.Settings.buttonIcons.tick + '"/>';
				}
				else if(checkvalue.substr(0,1) == 'F'){
					if(rec.get('status')==AOCLit.waitingForCSRStatusOrderLine){
						this.validationFieldMissing=true;
					}
					return '<img src="' + AOC.config.Settings.buttonIcons.cross + '"/>';
				}
				else{
					return '<img src="' + AOC.config.Settings.buttonIcons.warning + '"/>';
				}
			}
		}, 
		{
			text: 'Dup. PO',
			dataIndex: 'duplicatePOFlag',
			width: 60,
			renderer:function(value, metadata,rec){
				var duplicatePOFlag=rec.data.duplicatePOFlag;
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ duplicatePOFlag +'"';
				
				if(checkvalue.substr(0,1)=='T'){
					return '<img src="' + AOC.config.Settings.buttonIcons.tick + '"/>';
				}
				else if(checkvalue.substr(0,1) == 'F'){
					if(rec.get('status') == AOCLit.waitingForCSRStatusOrderLine){
						this.validationFieldMissing=true; 
					}
					return '<img src="' + AOC.config.Settings.buttonIcons.cross + '"/>';
				}
				else{
					if(rec.get('status') == AOCLit.waitingForCSRStatusOrderLine){
						this.validationFieldMissing=true; 
					}
					return '<img src="' + AOC.config.Settings.buttonIcons.warning + '"/>';
				}
			}
		}, 
		{
			text: 'Size Page',
			dataIndex: 'htlsizePageValidationFlag',
			width: 60,
			renderer:function(value, metadata,rec){
				var htlSizePageValidationFlag=rec.get('htlsizePageValidationFlag');
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ htlSizePageValidationFlag +'"';
				
				if(checkvalue.substr(0,1)=='T'){
					return '<img src="' + AOC.config.Settings.buttonIcons.tick + '"/>';
				}
				else if(checkvalue.substr(0,1) == 'F'){
					if(rec.get('status') == AOCLit.waitingForCSRStatusOrderLine){
						this.mandatoryValidationFieldMissing=true;
					}
					return '<img src="' + AOC.config.Settings.buttonIcons.cross + '"/>';
					
				}
				else{
					return '<img src="' + AOC.config.Settings.buttonIcons.warning + '"/>';
				}
			}
		}, 
		{
			text: 'MOQ',
			dataIndex: 'moqvalidationFlag',
			width: 50,
			renderer:function(value, metadata,rec){
				var moqValidationFlag=rec.data.moqvalidationFlag;
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ moqValidationFlag +'"';
				
				if(checkvalue.substr(0,1)=='T'){
					return '<img src="' + AOC.config.Settings.buttonIcons.tick + '"/>';
				}
				else if(checkvalue.substr(0,1)=='F'){
					if(rec.get('status') == AOCLit.waitingForCSRStatusOrderLine && (rec.get('waiveMOQ')=='false' || rec.get('waiveMOQ')==false)){
						this.mandatoryValidationFieldMissing=true;
					}
					return '<img src="' + AOC.config.Settings.buttonIcons.cross + '"/>';

				}
				else{
					if(rec.get('status') == AOCLit.waitingForCSRStatusOrderLine && (rec.get('waiveMOQ')=='true' || rec.get('waiveMOQ')== true)){
						this.validationFieldMissing=true;
					}
					return '<img src="' + AOC.config.Settings.buttonIcons.warning + '"/>';
				}
			}
		},
		/*New Field-1*/
		//No need this column for now(Amit Kumar 8-1-2017)
		/*{
			text: 'Variable Data',
			dataIndex: 'mandatoryVariableDataFieldFlag',
			width: 65,
			renderer:function(value, metadata,rec){
				var mandatoryVariableDataFieldFlag= rec.data.mandatoryVariableDataFieldFlag;
				var checkvalue = value ? value.trim()  :'';
				if(checkvalue.substr(0,1) == 'T'){
					return '<div><img data-qtip=" '+mandatoryVariableDataFieldFlag+'" src="' + AOC.config.Settings.buttonIcons.tick + '" /></div>';
				}
				else{
					if(rec.get('status') == AOCLit.waitingForCSRStatusOrderLine){
						this.mandatoryValidationFieldMissing = true;
						return '<div><img data-qtip=" '+mandatoryVariableDataFieldFlag+'" src="' + AOC.config.Settings.buttonIcons.warning + '" /></div>';
					}
				}
			}
		}, */
		/*New Field-2*/
		{
			text: 'COO',
			dataIndex: 'cooTranslationFlag',
			width: 65,
			renderer:function(value, metadata,rec){
				var cooTranslationFlag= rec.data.cooTranslationFlag;
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ cooTranslationFlag +'"';
				
				if(checkvalue.substr(0,1) == 'T'){
					return '<img src="' + AOC.config.Settings.buttonIcons.tick + '"/>';
				}
				else if(checkvalue.substr(0,1) == 'F'){
					if(rec.get('status')==AOCLit.waitingForCSRStatusOrderLine){
						this.validationFieldMissing = true;
					}
					return '<img src="' + AOC.config.Settings.buttonIcons.cross + '"/>';
				}
				else{
					if(rec.get('status')==AOCLit.waitingForCSRStatusOrderLine){
						this.validationFieldMissing = true;
					}
					return '<img src="' + AOC.config.Settings.buttonIcons.warning + '"/>';
				}
			}
		},
		/*New Field-3*/    
		{
			text: 'Fabric Content',
			dataIndex: 'febricPercentageFlag',
			width: 65,
			renderer:function(value, metadata,rec){
				var febricPercentageFlag= rec.data.febricPercentageFlag;
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ febricPercentageFlag +'"';
				
				if(checkvalue.substr(0,1) == 'T'){
					return '<img src="' + AOC.config.Settings.buttonIcons.tick + '"/>';
				}
				else if(checkvalue.substr(0,1) == 'F'){
					if(rec.get('status') == AOCLit.waitingForCSRStatusOrderLine){
						this.mandatoryValidationFieldMissing = true;
					}
					return '<img src="' + AOC.config.Settings.buttonIcons.cross + '"/>';
				}
				else{
					return '<img src="' + AOC.config.Settings.buttonIcons.warning + '"/>';
				}
			}
		},
		/*New Field-4*/    
		{
			text: 'Revise Order',
			dataIndex: 'reviseOrderFlag',
			width: 65,
			renderer:function(value, metadata,rec){
				var reviseOrderFlag= rec.data.reviseOrderFlag;
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ reviseOrderFlag +'"';
				
				if(checkvalue.substr(0,1) == 'T'){
					return '<img src="' + AOC.config.Settings.buttonIcons.tick + '"/>';
				}
				else if(checkvalue.substr(0,1) == 'F'){
					if(rec.get('status')==AOCLit.waitingForCSRStatusOrderLine){
						this.validationFieldMissing = true;
					}
					return '<img src="' + AOC.config.Settings.buttonIcons.cross + '"/>';
					
				}
				else{
					if(rec.get('status')==AOCLit.waitingForCSRStatusOrderLine){
						this.validationFieldMissing = true;
					}
					return '<img src="' + AOC.config.Settings.buttonIcons.warning + '"/>';
				}
			}
		},
		{
			text: 'Round Qty',
			dataIndex: 'roundQty',
			width: 50,
			renderer:function(value, metadata, record){
				if(value){
					return Number(value)
				}
				return '';
			}
		},
		{
			text: 'MOQDiff Qty',
			dataIndex: 'moqdiffQty',
			width: 55,
			renderer:function(value, metadata, record){
				if(value){
					return Number(value)
				}
				return '';
			}
		},
		{
			text: 'Customer Ordered Qty.<font color=red>*</font>',
			dataIndex: 'customerOrderedQty',
			width: 106,
			editor: {
				xtype:'numberfield',
				minValue:0
			},
			renderer : function(value, metadata, record) {
				if(parseInt(value) > -1) {
					if(this.showMandatoryValidationField){
						if(record.get('status')==AOCLit.waitingForCSRStatusOrderLine && (record.get('waiveMOQ')=='false' || record.get('waiveMOQ')==false)){
							var moqValidationFlag = record.data.moqvalidationFlag  ? record.data.moqvalidationFlag : record.data.moqvalidationFlag.trim();
							
							if(moqValidationFlag.substr(0,1) == 'F'){
								metadata.style = AOCLit.mandatoryValidationCellColor;
							}
						}
					}
				   return value;
				} else {	
					if(record.get('status')==AOCLit.waitingForCSRStatusOrderLine){
						this.mandatoryFieldMissing=true;
					}
					metadata.style = AOCLit.cellColor;
					return value;
				}
			} 
		},
		{
			text: 'Update Qty',
			dataIndex: 'updateMOQ',
			width: 50,
			renderer:function(value, metadata,rec){
				var checkMOQ=rec.data.moqvalidationFlag.trim();
				var allowOrderLineEdit=AOC.config.Runtime.getAllowOrderLineEdit();
				if(rec.get('status')==AOCLit.waitingForCSRStatusOrderLine && allowOrderLineEdit==true && rec.data.waiveMOQ==false && checkMOQ.substr(0,1)=='F'){
					return '<div><img class="EnableUpdateMoq" src="' + AOC.config.Settings.buttonIcons.EnableUpdateMoqFlag + '" /></div>';
				}
				else{
					return '<div><img src="' + AOC.config.Settings.buttonIcons.DisableUpdateMoqFlag + '" /></div>';
				}
		   }
		},
		{
			text: 'Waive MOQ',
			dataIndex: 'waiveMOQ',
			width: 59,
			editor:{
				xtype:'combo',
				editable:false,
				store:[[true,'Y'],[false,'N']]
			},
			renderer:function(value, metadata,rec){
				var v = 'N';
				if(value){
					v ='Y';
				}
				return v;
			}
		},
		{
			text: 'Status',
			dataIndex: 'status',
			width: 180,
			editor: {
				xtype:'combo',
				editable:false,
				displayField:'value',
				valueField:'code',
				queryMode :'local',
				store:Ext.data.StoreManager.lookup('orderlineid') == null ? AOC.util.Helper.getCodeStore('orderline') : Ext.data.StoreManager.lookup('orderlineid'),
				 listeners:{
			        afterrender:function(combo){
				         var store = combo.store;
				         //(Amit Kumar 12-01-2017)only waitingfor cs verification and cancel status will visible in combo
				         store.filterBy(function(record){
				        	 return (record.get('code') == AOCLit.waitingForCSRStatusOrderLine || record.get('code') == AOCLit.cancelStatusOrderLine);
				         });
			        },
			        select:'onStatusSelect'
		       }
			},
			renderer:function(v, metadata,rec){
				return Helper.getSatus(rec);
			}
		},
		{
			text: 'PO #<font color=red>*</font>',
			dataIndex: 'poNumber',
			width: 120,
			//editor: 'textfield',
//			renderer : function(value, metadata, record) {
//				if(value == '') {
//					if(record.get('status') == AOCLit.waitingForCSRStatusOrderLine){
//						this.mandatoryFieldMissing = true;
//					}
//					metadata.style = AOCLit.cellColor;
//				} else {
//					 return value;
//				}
//			}
		},
		{
			text: 'Avery Item #<font color=red>*</font>',
			dataIndex: 'averyItemNumber',
			width: 88,
			renderer : function(value, metadata ,record) {
				if(value == '') {
					if(record.get('status') == AOCLit.waitingForCSRStatusOrderLine){
						this.mandatoryFieldMissing = true;
					}
					metadata.style = AOCLit.cellColor;
				} else {
					if(value == AOCLit.averyItemNotFoundText || value==duplicateMappingLabel){
						metadata.style = AOCLit.cellColor;
					}
				}
				return value;
			}
		}, 
		{
			text: 'Customer Item #',
			dataIndex: 'customerItemNumber',
			width: 88
			
		},
		{
			text: 'ATO Required',
			dataIndex: 'atovalidationFlag',
			width: 65,
			renderer:function(v, metaData){
				if(v == 'Y'){
					metaData.tdAttr = 'data-qtip="YES"';
				}else{ 
					metaData.tdAttr = 'data-qtip="No"';
				}
				return v;
			}
		},
		{
			text: 'Bulk Order',
			dataIndex: 'bulk',
			width: 60,
			editor:{
				xtype:'combo',
				editable:false,
				store:[['Y','Y'],['N','N']]
			},
			renderer:function(value, metadata,rec){
				var v='N';
				if(value){
					v='Y';
				}
				var bulkSampleValidationFlag=rec.data.bulkSampleValidationFlag;
				var checkvalue=bulkSampleValidationFlag ? bulkSampleValidationFlag.trim() :'';
				if(checkvalue.substr(0,1)=='T'){
					return value;
				}
				else{
					if(this.showMandatoryValidationField){
						metadata.style = AOCLit.mandatoryValidationCellColor;
					}
					return value;
				}
			}	
		},
		{
			text: 'Avery ATO',
			dataIndex: 'averyATO',
			width: 93,
			renderer : function(value, metadata,record) {
				if(value == '' || value == null) {
					metadata.style = AOCLit.cellColor;
					return value;
				}
				return value;
			} 
		}, 
		{
			text: 'Bulk Item',
			dataIndex: 'averyBulk',
			width: 93,
			renderer : function(value, metadata,record) {
				if(value == '' || value == null) {
					metadata.style = AOCLit.cellColor;
					return value;
				}
				return value;
			} 
		}, 
		{
			text: 'Avery MOQ',
			dataIndex: 'averyMOQ',
			width: 93,
			renderer : function(value, metadata,record) {
				if(value == '' || value == null) {
					metadata.style = AOCLit.cellColor;
					return value;
				}
				return value;
			} 
		}, 
		{
			text: 'Avery ProductLine Type',
			dataIndex: 'averyProductLineType',
			width: 93,
			renderer : function(value, metadata,record) {
				if(value == '' || value == null) {
					metadata.style = AOCLit.cellColor;
					return value;
				}
				return value;
			} 
		}, 
		{
			text: 'Avery Region',
			dataIndex: 'averyRegion',
			width: 93,
			renderer : function(value, metadata,record) {
				if(value == '' || value == null) {
					metadata.style = AOCLit.cellColor;
					return value;
				}
				return value;
			} 
		},
		{
			text: 'Avery Roundup Qty',
			dataIndex: 'averyRoundupQty',
			width: 93,
			renderer : function(value, metadata,record) {
				if(value == '' || value == null) {
					metadata.style = AOCLit.cellColor;
					return value;
				}
				return value;
			} 
		},
		{
			text: 'Customer Name',
			dataIndex: 'partnerCustomerName',
			width: 126,
			editor: 'textfield'
		}, 
		{
			text: 'Vendor Name',
			dataIndex: 'partnerVendorName',
			width: 111,
			editor: 'textfield'
		}, 
		{
			text: 'Ship To Customer',
			dataIndex: 'shipToCustomer',
			width: 170,
			editor: 'textfield'
		}, 
		{
			text: 'Ship To Contact',
			dataIndex: 'shipToContact',
			width: 170,
			editor: 'textfield'
		}, 
		{
			text: 'Ship To Address 1',
			dataIndex: 'shipToAddress1',
			width: 170,
			editor: 'textfield'
		}, 
		{
			text: 'Ship To Address 2',
			dataIndex: 'shipToAddress2',
			width: 170,
			editor: 'textfield'
		}, 
		{
			text: 'Ship To Address 3',
			dataIndex: 'shipToAddress3',
			width: 170,
			editor: 'textfield'
		}, 
		{
			text: 'Ship To City',
			dataIndex: 'shipToCity',
			width: 112,
			editor: 'textfield'
		}, 
		{
			text: 'Ship To Country',
			dataIndex: 'shipToCountry',
			width: 112,
			editor: 'textfield'
		}, 
		{
			text: 'Ship To State',
			dataIndex: 'shipToState',
			width: 112,
			editor: 'textfield'
		}, 
		{
			text: 'Ship To Zip',
			dataIndex: 'shipToZip',
			width: 85,
			editor: 'textfield'
		}, 
		{
			text: 'Ship To Email',
			dataIndex: 'shipToEmail',
			width: 170,
			editor: 'textfield'
		}, 
		{
			text: 'Ship To Fax',
			dataIndex: 'shipToFax',
			width: 130,
			editor: 'textfield'
		}, 
		{
			text: 'Ship To Telephone',
			dataIndex: 'shipToTelephone',
			width: 130,
			editor: 'textfield'
		},
		{
			text: 'Bill to Site #<font color=red>*</font>',
			dataIndex: 'oracleBillToSiteNumber',
			width: 100,
			editor: 'textfield',
			renderer : function(value, metadata, record) {
				if(value =='') {
					if(record.get('status')==AOCLit.waitingForCSRStatusOrderLine){
						this.mandatoryFieldMissing=true;
					}
					metadata.style = AOCLit.cellColor;
				} else {
					 return value;
				}
			}
		}, 
		{
			text: 'Bill To Customer',
			dataIndex: 'billToCustomer',
			width: 170,
			editor: 'textfield'
		}, 
		{
			text: 'Bill To Contact',
			xtype:'gridcolumn',
			dataIndex: 'billToContact',
			width: 170,
			editor: 'textfield'
		}, 
		{
			text: 'Bill To Address 1',
			dataIndex: 'billToAddress1',
			width: 170,
			editor: 'textfield'
		}, 
		{
			text: 'Bill To Address 2',
			dataIndex: 'billToAddress2',
			width: 170,
			editor: 'textfield'
		}, 
		{
			text: 'Bill To Address 3',
			dataIndex: 'billToAddress3',
			width: 170,
			editor: 'textfield'
		}, 
		{
			text: 'Bill To City',
			dataIndex: 'billToCity',
			width: 112,
			editor: 'textfield'
		}, 
		{
			text: 'Bill To Country',
			dataIndex: 'billToCountry',
			width: 112,
			editor: 'textfield'
		}, 
		{
			text: 'Bill To State',
			dataIndex: 'billToState',
			width: 112,
			editor: 'textfield'
		}, 
		{
			text: 'Bill To Zip',
			dataIndex: 'billToZip',
			width: 85,
			editor: 'textfield'
		}, 
		{
			text: 'Bill To Email',
			dataIndex: 'billToEmail',
			width: 170,
			editor: 'textfield'
		}, 
		{
			text: 'Bill To Fax',
			dataIndex: 'billToFax',
			width: 130,
			editor: 'textfield'
		}, 
		{
			text: 'Bill To Telephone',
			dataIndex: 'billToTelephone',
			width: 130,
			editor: {
				xtype:'textfield',
				readOnly:true
			},
			setEditor:function(record){}
		}, 
		{
			text: 'Special Instruction',
			dataIndex: 'specialInstruction',
			width: 170,
			editor: 'textfield'
		}, 
		{
			text: 'Order Received Date',
			dataIndex: 'orderReceivedDate',
			width: 93,
			hidden:true
		}, 
		{
			text: 'Sold To RBO#<font color=red>*</font>',
			dataIndex: 'soldToRBONumber',
			width: 100,
			editor: 'textfield',
			renderer : function(value, metadata, record) {
				if(value=='') {
					if(record.get('status') == AOCLit.waitingForCSRStatusOrderLine){
						this.mandatoryFieldMissing=true;
					}
					metadata.style = AOCLit.cellColor;
				} else {
					 return value;
				}
			}
		},  
		{
			text: 'Ship to Site #<font color=red>*</font>',
			dataIndex: 'oracleShipToSiteNumber',
			width: 100,
			editor: 'textfield',
			renderer : function(value, metadata,record) {
				if(value == '') {
					if(record.get('status') == AOCLit.waitingForCSRStatusOrderLine){
						this.mandatoryFieldMissing=true;
					}
					metadata.style = AOCLit.cellColor;
				} else {
					 return value;
				}
			}
		}, 
		{
			text: 'Shipping Method',
			dataIndex: 'shippingMethod',
			width: 170,
			editor: {
				xtype: 'combo',
				displayField: 'variableFieldName',
				valueField: 'variableFieldName',
				editable:false,
				queryMode :'local',
				reference:'shippingMethodCombo',
				store:Ext.data.StoreManager.lookup('ShippingMethodId') == null ? AOC.util.Helper.getVariableComboStore('ShippingMethod') : Ext.data.StoreManager.lookup('ShippingMethodId')
			},
			renderer:'comboColumnRenderer'
		}, 
		{
			text: 'Retailer PO/Customer Job',
			dataIndex: 'retailerPO_CustomerJob',
			width: 115,
			editor: 'textfield'
		}, 
		{
			text: 'ITEM Desc/Size Page',
			dataIndex: 'itemDescription',
			width: 102,
			editor: 'textfield',
			renderer:function(value, metadata,rec){
				var htlSizePageValidationFlag=rec.get('htlsizePageValidationFlag') ? rec.get('htlsizePageValidationFlag').trim() : '';
				if(htlSizePageValidationFlag.substr(0, 1) == 'T'){
					return value;
				}
				else{
					if(this.showMandatoryValidationField){
						metadata.style = AOCLit.mandatoryValidationCellColor;
					}
					return value;
				}
			}
		}, 
		{
			text: 'Customer Color Code',
			dataIndex: 'customerColorCode',
			width: 102,
			editor: 'textfield'
		}, 
		{
			text: 'Customer Color Description',
			dataIndex: 'customerColorDescription',
			width: 102,
			editor: 'textfield'
		}, 
		{
			text: 'Customer Size',
			dataIndex: 'customerSize',
			width: 72,
			editor: 'textfield',
			renderer:function(value, metadata,rec){
				var htlSizePageValidationFlag=rec.get('htlSizePageValidationFlag') ? rec.get('htlSizePageValidationFlag').trim():'';
				if(htlSizePageValidationFlag.substr(0,1) == 'T'){
					return value;
				}
				else{
					if(this.showMandatoryValidationField){
						metadata.style = mandatoryValidationCellColor;
					}
					return value;
				}
			}
		}, 
		{
			text: 'Contract #',
			dataIndex: 'contractNumber',
			width: 130,
			editor: 'textfield',
			renderer : function(value, metadata,record) {
				return value;
			}
		}, 
		{
			text: 'Style No',
			dataIndex: 'styleNo',
			width: 111,
			editor: 'textfield'
		}, 
		{
			text: 'Customer Season',
			dataIndex: 'customerSeason',
			width: 93,
			editor: 'textfield'
		},
		{
			text: 'Ordered Date<font color=red>*</font>',
			dataIndex: 'orderedDate',
			width: 90,
			xtype:'datecolumn',
			format:AOCLit.dateFormat,
			editor: 'datefield',
			renderer : function(value, metadata,record) {
				if(value=='' || value == null) {
					if(record.get('status')==AOCLit.waitingForCSRStatusOrderLine){
						this.mandatoryFieldMissing=true;
					}
					metadata.style = AOCLit.cellColor;
				}else{
					return Ext.Date.format(value,'Y-m-d');
				}
			} 
		}, 
		{
			text: 'Requested Delivery Date',
			dataIndex: 'requestedDevliveryDate',
			width: 102,
			format:AOCLit.dateFormat,
			xtype:'datecolumn',
			editor: 'datefield'
		}, 
		{
			text: 'Promise Date',
			dataIndex: 'promiseDate',
			xtype: 'datecolumn',   
			format:AOCLit.dateFormat,
			width: 88,
			editor:{
				xtype:'datefield'
			}
		}, 
		{
			text: 'Freight Terms',
			dataIndex: 'freightTerms',
			width: 130,
			editor: {
				xtype: 'combo',
				displayField: 'variableFieldName',
				valueField: 'variableFieldName',
				editable:false,
				queryMode :'local',
				reference:'freightTermscombo',
				store:Ext.data.StoreManager.lookup('FreightTermsId') == null ? AOC.util.Helper.getVariableComboStore('FreightTerms') : Ext.data.StoreManager.lookup('FreightTermsId')
			},
			renderer:'comboColumnRenderer'
		}, 
		{
			text: 'CSR',
			dataIndex: 'csr',
			width: 160,
			editor:{
				xtype:'combo',
				displayField:'variableFieldName',
				valueField:'variableFieldName',
				queryMode:'local',
				store:Ext.data.StoreManager.lookup('CSRId') == null ? AOC.util.Helper.getVariableComboStore('CSR') : Ext.data.StoreManager.lookup('CSRId')
			}
		}, 
		{
			text: 'Packing Instruction',
			dataIndex: 'packingInstruction',
			width: 180,
			editor: 'textfield'
		}, 
		{
			text: 'Shipping Instructions',
			dataIndex: 'shippingInstructions',
			width: 180,
			editor: 'textfield'
		}, 
		{
			text: 'Invoice line Instruction',
			dataIndex: 'invoicelineInstruction',
			width: 119,
			editor: 'textfield'
		}, 
		{
			text: 'Division For Interface ERPORG',
			dataIndex: 'divisionForInterfaceERPORG',
			width: 120,
			editor: {
				xtype:'combo',
				displayField:'name',
				valueField:'id',
				store:AOC.config.Runtime.getStoreERPORG(),
				listeners:{
					'select':'onerporgSelectChange'
				}
			},
			'renderer':'divisionForInterfaceERPORGColumnRenderer'
		}, 
		{
			text: 'Artwork Hold',
			dataIndex: 'artworkhold',
			width: 84,
			editor:{
				xtype:'combo',
				editable:false,
				store:[[true,'Y'],[false,'N']]
			},
			renderer:function(value, metadata,rec){
				var v ='N';
				if(value){
					v = 'Y';
				}
				return v;
			}
		}, 
		{
			text: 'Artwork For Reference',//'Artwork Work Attachment',
			dataIndex: 'artworkworkattachment',
			width: 110,
			editor:{
				xtype:'combo',
				editable:false,
				store:[[true,'Y'],[false,'N']]
			},
			renderer:function(value, metadata,rec){
				var v = 'N';
				if(value){
					v = 'Y';
				}
				return v;
			}
		}, 
		{
			text: 'Variable Data Breakdown',
			dataIndex: 'variableDataBreakdown',
			width: 110,
			editor: 'textfield'
		}, 
		{
			text: 'Manufacturing Notes',
			dataIndex: 'manufacturingNotes',
			width: 107,
			editor: 'textfield'
		}, 
		{
			text: 'Order Type',
			dataIndex: 'orderType',
			width: 115,
			editor: {
				xtype: 'combo',
				displayField: 'variableFieldName',
				valueField: 'variableFieldName',
				editable:false,
				queryMode :'local',
				reference:'OrdertypeCombo',
				store:Ext.data.StoreManager.lookup('OrderTypeId') == null ? AOC.util.Helper.getVariableComboStore('OrderType') : Ext.data.StoreManager.lookup('OrderTypeId')
			},
			renderer:'comboColumnRenderer'
		}, 
		{
			text: 'Order By',
			dataIndex: 'orderBy',
			width: 115,
			editor: 'textfield'
		}, 
		{
			text: 'End Customer',
			dataIndex: 'endCustomer',
			width: 115,
			editor: {
				xtype: 'combo',
				displayField: 'variableFieldName',
				valueField: 'variableFieldName',
				editable:false,
				queryMode :'local',
				reference:'EndCustomerCombo',
				store:Ext.data.StoreManager.lookup('EndCustomerId') == null ? AOC.util.Helper.getVariableComboStore('EndCustomer') : Ext.data.StoreManager.lookup('EndCustomerId')
			},
			renderer:'comboColumnRenderer'
		}, 
		{
			text: 'Ship Mark',
			dataIndex: 'shipmark',
			width: 150,
			editor: 'textfield'
		},
		{
			text: 'Additional Label Internal item #',
			dataIndex: 'additionallabelitemchange',
			width: 150,
			editor: 'textfield'
		}, 
		{
			text: 'Bank Charge',
			dataIndex: 'bankCharge',
			width: 90,
			editor: {
				xtype: 'numberfield',
				maxLength: 8,
				minValue: 0
			}
		}, 
		{
			text: 'Freight Charge',
			dataIndex: 'freightCharge',
			width: 90,
			editor: {
				xtype: 'numberfield',
				maxLength: 8,
				minValue: 0
			}
		}, 
		{
			text: 'Shipping Hold',
			dataIndex: 'shippingHold',
			width: 83,
			editor:{
				xtype:'combo',
				editable:false,
				store:[[true,'Y'],[false,'N']]
			},
			renderer:function(value, metadata,rec){
				var v ='N';
				if(value){
					v = 'Y';
				}
				return v;
			}
		}, 
		{
			text: 'Production Hold',
			dataIndex: 'productionHold',
			width: 77,
			editor:{
				xtype:'combo',
				editable:false,
				store:[[true,'Y'],[false,'N']]
			},
			renderer:function(value, metadata,rec){
				var v='N';
				if(value){
					v='Y';
				}
				return v;
			}
		}, 
		{
			text: 'Split Shipset',
			dataIndex: 'splitShipset',
			width: 81,
			editor: {
				xtype: 'combo',
				displayField: 'variableFieldName',
				valueField: 'variableFieldName',
				editable:false,
				queryMode :'local',
				reference:'splitShipsetCombo',
				store:Ext.data.StoreManager.lookup('SplitShipsetId') == null ? AOC.util.Helper.getVariableComboStore('SplitShipset') : Ext.data.StoreManager.lookup('SplitShipsetId')
			},
			renderer:'comboColumnRenderer'
		}, 
		{
			text: 'Agreement',
			dataIndex: 'agreement',
			width: 102,
			editor: 'textfield'
		}, 
		{
			text: 'Model Serial #',
			dataIndex: 'modelSerialNumber',
			width: 180,
			editor: 'textfield'
		}, 
		{
			text: 'APO Type',
			dataIndex: 'apoType',
			width: 47,
			editor: {
				xtype: 'combo',
				displayField: 'variableFieldName',
				valueField: 'variableFieldName',
				editable:false,
				queryMode :'local',
				reference:'APOTypeCombo',
				store:Ext.data.StoreManager.lookup('APOTypeId') == null ? AOC.util.Helper.getVariableComboStore('APOType') : Ext.data.StoreManager.lookup('APOTypeId')
			},
			renderer:'comboColumnRenderer'
		}, 
		{
			text: 'Sent To Oracle Date',
			dataIndex: 'sentToOracleDate',
			width: 100,
			hidden:true,
			editor: 'textfield'
		}, 
		{
			text: 'Comment',
			dataIndex: 'comment',
			width: 100,
			editor: 'textfield'
		},
		{
			text: AOCLit.productionLine,
			dataIndex: 'productionLine',
			width: 100,
			editor: 'textfield'
		}
	],
	editGrid:true,
    initComponent: function() {
        var me = this;
        this.fieldArray = [];
        Ext.apply(this, {
		    plugins: me.getOuterGridPlugin(),
	        listeners:{
				scope:this,
				cellclick:'onCellClickToView',
				'beforecelldblclick':function( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
					if(cellIndex==0){
						return false;
					}
				}
			}
		});
		
        me.store.on('beforeload',function(){
        	me.mandatoryFieldMissing=false;
        	me.mandatoryValidationFieldMissing=false;
        	me.validationFieldMissing=false;
        	me.invalidComboValid=false;
        });
        this.callParent(arguments);
    },
    getRowExpander:function(){
    	var me = this,
			rowExpander = new AOC.view.ux.RowExpanderGrid({
				createComponent: function(view, record, htmlnode, index) {
					return me.createInnerGrid(record);
    		    },
    		    onExpand: function(rowNode, record, expandRow) {
    		    	this.grid.editingPlugin ? this.grid.editingPlugin.cancelEdit() : '';
    		    	//(Amit Kumar)after refresh grid view need to create inner grid view again bc after store load inner view destroyed
    		    	if(Ext.isEmpty(expandRow.querySelector('.nestedGrid'))){
    		            var view = this.grid.getView(),
    		                newComponent = this.createComponent(view, record, rowNode, view.indexOf(rowNode)),
    		                targetRowbody = Ext.DomQuery.selectNode('div.x-grid-rowbody', expandRow);
    		            
    		            while(targetRowbody.hasChildNodes()) {
    		                targetRowbody.removeChild(targetRowbody.lastChild);
    		            }
    		            newComponent.render( targetRowbody ) ;
    		            newComponent.getEl().swallowEvent([
                            'mousedown', 'mouseup', 'click',
                            'contextmenu', 'mouseover', 'mouseout',
                            'dblclick', 'mousemove'
                        ]);
    		        }
    		    }
			});
    	return rowExpander;
    },
    createInnerGrid:function(record){
    	var me = this,
    		data = record.get('listOrderlineDetails');
		//filter nested grid record for show those record which have typeSetter or level value exist
		function processData(data){
			var len = data.length,
				items = [];
			
			for(var i = 0; i < len; i++){
				if(!Ext.isEmpty(data[i].level) || !Ext.isEmpty(data[i].typeSetter)){
					items.push(data[i]);
				}
			}
			
			return items;
		}
		var record = processData(data);
		
		var	store = Ext.create('AOC.store.VariableHeaderStore', {
				autoLoad: true,
				modal: 'AOC.model.VariableHeaderModel',
				data : record,
				proxy: {
					type: 'memory'
				},
				sorters: [
		          {
			   		  property:'skuno',
			   		  direction:'ASC'
		          }
		       ]
			}),
			sel = (me.editGrid) ? 'rowmodel' : 'spreadsheet';
			
		return Ext.create('Ext.grid.Panel',{
			modal: 'AOC.model.VariableHeaderModel',
			cls: 'nestedGrid',
			store:store,
			selModel: {
				type:sel,
				rowNumbererHeaderWidth:0
    	    },
			columns: [
				{
				  xtype: 'rownumberer',
				  text:'#',
				  width:50
				}, 
				{
				  text: 'Level',
				  dataIndex: 'level',
				  menuDisabled:true,
				  flex:0.5
				}, 
				{
				  text: "SKU #",
				  dataIndex: 'skuno',
				  flex:0.5
				}, 
				{
				  text: "TypeSetterCode",
				  dataIndex: 'typeSetter',
				  flex:0.8
				}, 
				{
					text: "Variable Field Name",
					dataIndex: 'variableFieldName',
					flex:2,
					renderer:function(v, metadata,rec){
						var mandatory = rec.get('mandatory');
						metadata.tdAttr = 'data-qtip="<font color=blue>' + Ext.util.Format.htmlEncode(v) + '<font>"';
						if(mandatory == 'Y'){
							return '<div>'+ v + ' <font size=2 color=red>*</font></div>';
						}
						else{
							return v;
						}
					}
				}, 
				{
					text: "Variable Field Value",
					dataIndex: 'variableDataValue',
					flex:2,
					editor: 'textfield',
					resizable:false,
					renderer:function(v, metadata,rec){
						if(v){
							var mandatory=rec.get('mandatory');
							metadata.tdAttr = 'data-qtip="<font color=blue>' +  Ext.util.Format.htmlEncode(v) + '<font>"';
							if(mandatory=='Y'){
								if(v == ''){
									if(me.showMandatoryValidationField)
										metadata.style = AOCLit.mandatoryValidationCellColor;
								}
								return v;
							}
							else{
									return v;
							}
						}
						else{
							var fieldName = rec.get('variableFieldName');
							var fieldValue = rec.get('variableDataValue');
							if((fieldName == 'SIZE' || fieldName == 'SIZE CHART' || fieldName == 'QTY') && fieldValue == ''){
								metadata.style = AOCLit.cellColor;
							}
						}
						return '';
					}
				}, 
				{
				  text: "Fiber Content Percentage",
				  dataIndex: 'fiberPercent',
				  xtype:'gridcolumn',
				  align:'center',
				  flex:1,
				  editor: {
					  xtype:'textfield',
					  disabled:true
				  }
				}
			],
			columnLines: false,
			width: 1250,
			border: true,
			style:'border:solid 1px #ccc;',
			plugins: me.getInnerGridPlugin(),
			autoHeight: true,
			frame: false,
			header: false
		});
    },
    getInnerGridPlugin:function(){
        var grid=this;
        var orderQueueStatus=AOC.config.Runtime.getOrderQueueStatus();
    	if(orderQueueStatus == AOCLit.waitingForCSRStatusOrderQueue && this.editGrid){
    		var rowEditor=Ext.create('AOC.view.ux.CustomRowEditing',{
    			clicksToEdit: 1,
                saveAndNextBtn: true,
                listeners:{
					edit:function(editor, context, eOpts){
						Ext.getBody().mask('Saving....');
						var ctx = context,
							idx = ctx.rowIdx,
							currentRecord = ctx.store.getAt(idx);
						
						var obj = currentRecord.getChanges();
						obj.id = currentRecord.id;
						
						var runTime = AOC.config.Runtime;
						
						var obj='{"data":'+Ext.encode(Ext.encode(obj))+',"orderQueueId":"'+runTime.getOrderQueueId()+'"}';
						
						Ext.Ajax.request({
							method:'PUT',
							jsonData:obj,
							url : applicationContext+'/rest/orderlinedetails/variablebulkupdate',
							success : function(response, opts) {
								//AOC.util.Helper.fadeoutMessage('Success',AOCLit.updateOrdLineDetailMsg);
								
								Ext.Msg.alert('Success','Order line Detail successfully updated');
								Helper.loadOrderLineGridStore(grid.store, runTime.getOrderQueueId());
								grid.view.refresh();
								Ext.getBody().unmask();
							},
							failure: function(response, opts) {
								Ext.getBody().unmask();
							}
						});
					}
                },
                'beforeEdit':function(editor, context){
            		return grid.getController().innerGridBeforeEditEvent(editor, context);
            	},
                bulKUpdate: function(editor, context) {
					Ext.getBody().mask('Saving....');
                    this.suspendEvent('edit');
                    this.completeEdit();
                    this.resumeEvent('edit');
                    
                    var me = this;
                    var ctx = me.context,
                        idx = ctx.rowIdx,
                        currentRecord = ctx.store.getAt(idx);
                    
                    var obj = currentRecord.getChanges();
                    var runTime = AOC.config.Runtime;
                    var obj = '{"data":' + Ext.encode(Ext.encode(obj)) + ',"updateAll":true,"orderQueueId":"' + runTime.getOrderQueueId() + '"}';
                    
                    Ext.Ajax.request({
                        method: 'PUT',
                        jsonData: obj,
                        url: applicationContext + '/rest/orderlinedetails/variablebulkupdate/'+currentRecord.get('variableFieldName'),
                        success: function(response, opts) {
                        	//AOC.util.Helper.fadeoutMessage('Success',AOCLit.updateOrdLineDetailMsg);
                            Ext.Msg.alert('Success', 'Order line Detail successfully updated');
                            Helper.loadOrderLineGridStore(grid.store, runTime.getOrderQueueId());
                            grid.view.refresh();
                            Ext.getBody().unmask();
                        },
                        failure: function(response, opts) {
                            Ext.getBody().unmask();
                        }
                    });
				 this;
                }
    		});
		return [rowEditor];
    	}else{
    		return [{ptype: 'clipboard'}];
		}
    	getRowExpander();
    },
    getOuterGridPlugin:function(){
    	var me = this,
    		orderQueueStatus = AOC.config.Runtime.getOrderQueueStatus();
    	
    	if(me.editGrid){
    	if(orderQueueStatus >= AOCLit.waitingForCSRStatusOrderQueue){
    		return [me.getRowExpander(), me.getOuterGridRowEditor()];
    	}else
    		return [me.getRowExpander(),{ptype: 'clipboard'}];
    	}else{
    		return [me.getRowExpander(),{ptype: 'clipboard'}];
    	}
    },
    getOuterGridRowEditor:function(){
		var rowEditor=Ext.create('AOC.view.ux.CustomRowEditing',{
			clicksToEdit: 2,
			autoCancel:false,
			controller: 'orderline',
			saveAndNextBtn: true,
			controller: 'orderline',
			listeners: {
				'edit': 'updateOrderLine',
				'beforeEdit':'outerGridBeforeEditEvent'
			},
			bulKUpdate: function(editor,context){
				this.getCmp().getController().outerGridBulkUpdate(this,editor,context);
			}
		});
		return rowEditor;
	},
	onCellClickToView:function( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
		var grid=obj;
		if(e.target.className=='EnableUpdateMoq'){
			var Id=record.get('id'),
				runTime = AOC.config.Runtime,
				MoqDiffQty=record.get('moqdiffQty'),
				roundQty=record.get('roundQty'),
				customerOrderedQty=record.get('customerOrderedQty');
			
			customerOrderedQty=parseInt(MoqDiffQty,10)+parseInt(roundQty,10)+parseInt(customerOrderedQty);
			
			var value={ "customerOrderedQty" : customerOrderedQty, "id" : Id };
			var insertBillAddress= false,
				insertShipAddress=false;
			
			var obj='{"insertBillAddress":'+insertBillAddress+',"insertShipAddress":'+insertShipAddress+',"data":'+Ext.encode(Ext.encode(value))+',"updateAll":false,"orderQueueId":"'+runTime.getOrderQueueId()+'"}';
			
			Ext.MessageBox.confirm('Confirm Action',AOCLit.updateCustQtyMsg , function(response) {
				if (response == 'yes') {
					Ext.getBody().mask('Updating....');
					Ext.Ajax.request({
						method:'PUT',
						jsonData:obj,
						url : applicationContext+'/rest/orderLines/bulkupdate',
						success : function(response, opts) {
							Ext.getBody().unmask();
							AOC.util.Helper.fadeoutMessage('Success',AOCLit.updatedCustomerQtyMsg);
							//Ext.Msg.alert('Alert Message','<b>Customer Qty. Updated Succesfully</b>');
							Helper.loadOrderLineGridStore(grid.store, AOC.config.Runtime.getOrderQueueId());
						},
						failure: function(response, opts) {
							 Ext.getBody().unmask();
						}
					});
				}else if(response == 'no'){
					return true;
				}
			});
		}
	}
});