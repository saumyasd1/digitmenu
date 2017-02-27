Ext.define('AOC.view.orderqueue.OrderLineExpandableGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'orderlineexpandablegrid',
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
    dataPresent:false,
    autoHeight: true,
    nestedGridRefrence:'listOrderlineDetails',
    columnLines: true,
    reserveScrollbar:true,
    showInvalidCombo:false,
    columnLines: false,
    viewConfig : {
    	stripeRows : true,
    	preserveScrollOnRefresh: true,
    	preserveScrollOnReload: true,
		enableTextSelection: true,
        forceFit:true,
        getRowClass:function(record, rowIndex, rowParams, store){
        	//hide rowexpander if perticular record has atovalidationFlag is False
        	if(record.get('averyATO') == 'N'){
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
			  xtype: 'rownumberer',
			  text:'#',
			  width:30,
			  align:'center',
			  locked:true
		},
		{
			text: 'ATO Mandatory',
			dataIndex: 'mandatoryVariableDataFieldFlag',
			width: 65,
			align:'center',
			renderer:function(value, metadata,rec){
				var checkvalue = value ? value.trim()  :'',
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
					metadata.tdAttr = 'data-qtip="<font color=blue>' + mandatoryVariableDataField + '</font>"';
				}
				return Helper.getIconClass(checkvalue);
			}
		}, 
		{
			text: 'Bulk Sample',
			dataIndex: 'bulkSampleValidationFlag',
			width: 65,
			align:'center',
			renderer:function(value, metadata,rec){
				var bulkSampleValidationFlag=rec.data.bulkSampleValidationFlag;
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ bulkSampleValidationFlag +'"';
				return Helper.getIconClass(checkvalue);
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
				
				return Helper.getIconClass(checkvalue);
			}
		}, 
		{
			text: 'Dup. PO',
			dataIndex: 'duplicatePOFlag',
			width: 60,
			align:'center',
			renderer:function(value, metadata,rec){
				var duplicatePOFlag=rec.data.duplicatePOFlag;
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ duplicatePOFlag +'"';
				
				return Helper.getIconClass(checkvalue);
			}
		}, 
		{
			text: 'Size Page',
			dataIndex: 'htlsizePageValidationFlag',
			width: 60,
			align:'center',
			renderer:function(value, metadata,rec){
				var htlSizePageValidationFlag=rec.get('htlsizePageValidationFlag');
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ htlSizePageValidationFlag +'"';
				
				return Helper.getIconClass(checkvalue);
			}
		}, 
		{
			text: 'MOQ/Round up',
			dataIndex: 'moqvalidationFlag',
			width: 50,
			renderer:function(value, metadata,rec){
				var moqValidationFlag=rec.data.moqvalidationFlag;
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ moqValidationFlag +'"';
				
				return Helper.getIconClass(checkvalue);
			}
		},
		
		/*New Field-2*/
		{
			text: 'COO',
			dataIndex: 'cooTranslationFlag',
			width: 65,
			align:'center',
			renderer:function(value, metadata,rec){
				var cooTranslationFlag= rec.data.cooTranslationFlag;
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ cooTranslationFlag +'"';
				
				return Helper.getIconClass(checkvalue);
			}
		},
		/*New Field-3*/    
		{
			text: 'Fabric Content',
			dataIndex: 'febricPercentageFlag',
			width: 65,
			align:'center',
			renderer:function(value, metadata,rec){
				var febricPercentageFlag= rec.data.febricPercentageFlag;
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ febricPercentageFlag +'"';
				
				return Helper.getIconClass(checkvalue);
			}
		},
		/*New Field-4*/    
		{
			text: 'Revise Order',
			dataIndex: 'reviseOrderFlag',
			width: 65,
			align:'center',
			renderer:function(value, metadata,rec){
				var reviseOrderFlag= rec.data.reviseOrderFlag;
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ reviseOrderFlag +'"';
				
				return Helper.getIconClass(checkvalue);
			}
		},
		{
			text: 'Round Qty',
			dataIndex: 'roundQty',
			width: 50,
			align:'center',
			renderer:function(value, metadata, record){
				return Helper.qtyColumnRenderer(value, metadata, record);
			}
		},
		{
			text: 'MOQDiff Qty',
			dataIndex: 'moqdiffQty',
			width: 55,
			align:'center',
			renderer:function(value, metadata, record){
				return Helper.qtyColumnRenderer(value, metadata, record);
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
				return Helper.onCustomerOrderQty(value, metadata, record);
			} 
		},
		{
			text: 'Update Qty',
			dataIndex: 'updateMOQ',
			width: 50,
			align:'center',
			renderer:function(value, metadata,rec){
            	return Helper.onUpdateMoqRenderer(value, metadata,rec);
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
			renderer:function(value, metadata, record){
				return Helper.onWaveMoqColumnRenderer(value, metadata, record);
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
			        	Helper.onStatusComboAfterRender(combo);
			        },
			        focus:function(combo){
			        	Helper.onStatusComboFocus(combo);
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
			width: 120
		},
		{
			text: 'Avery Item #<font color=red>*</font>',
			dataIndex: 'averyItemNumber',
			width: 88,
			renderer : function(value, metadata,record) {
                return Helper.onAveryItemNumberColumnRenderer(value, metadata, record);
            }
		}, 
		{
			text: 'Customer Item #',
			dataIndex: 'customerItemNumber',
			width: 88
			
		},
		{
			text: 'Customer Color Code',
			dataIndex: 'customerColorCode',
			width: 102
		}, 
		{
			text: 'Customer Color Description',
			dataIndex: 'customerColorDescription',
			width: 102
		},
		{
			text: AOCLit.Bulk,
			dataIndex: 'bulk',
			width: 60,
			editor:{
				xtype:'combo',
				editable:false,
				store:[['Y','Y'],['N','N']]
			},
			renderer:function(value, metadata,rec){
				return Helper.onBulkOrderColumnRenderer(value, metadata,rec);
			}
		},
		{
			text: 'Avery ATO',
			dataIndex: 'averyATO',
			width: 93,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		}, 
		{
			text: 'Bulk Item',
			dataIndex: 'averyBulk',
			width: 93,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		}, 
		{
			text: 'Avery MOQ',
			dataIndex: 'averyMOQ',
			width: 93,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		}, 
		{
			text: 'Avery ProductLine Type',
			dataIndex: 'averyProductLineType',
			width: 93,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		}, 
		{
			text: 'Avery Region',
			dataIndex: 'averyRegion',
			width: 93,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		},
		{
			text: 'Avery Roundup Qty',
			dataIndex: 'averyRoundupQty',
			width: 93,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		},
		{
			text: AOCLit.custName,
			dataIndex: 'partnerCustomerName',
			width: 126,
			editor: 'textfield'
		}, 
		{
			text: AOCLit.vendorName,
			dataIndex: 'partnerVendorName',
			width: 111,
			editor: 'textfield'
		}, 
		{
			text: AOCLit.shipToCustomer,
			dataIndex: 'shipToCustomer',
			width: 170,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: AOCLit.shipContact,
			dataIndex: 'shipToContact',
			width: 170,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: AOCLit.shipToAddress1,
			dataIndex: 'shipToAddress1',
			width: 170,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Ship To Address 2',
			dataIndex: 'shipToAddress2',
			width: 170,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Ship To Address 3',
			dataIndex: 'shipToAddress3',
			width: 170,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Ship To City',
			dataIndex: 'shipToCity',
			width: 112,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Ship To Country',
			dataIndex: 'shipToCountry',
			width: 112,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Ship To State',
			dataIndex: 'shipToState',
			width: 112,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Ship To Zip',
			dataIndex: 'shipToZip',
			width: 85,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Ship To Email',
			dataIndex: 'shipToEmail',
			width: 170,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Ship To Fax',
			dataIndex: 'shipToFax',
			width: 130,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Ship To Telephone',
			dataIndex: 'shipToTelephone',
			width: 130,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		},
		{
			text: 'Bill to Site #<font color=red>*</font>',
			dataIndex: 'oracleBillToSiteNumber',
			width: 100,
			editor: 'textfield',
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		}, 
		{
			text: 'Bill To Customer',
			dataIndex: 'billToCustomer',
			width: 170,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Bill To Contact',
			xtype:'gridcolumn',
			dataIndex: 'billToContact',
			width: 170,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Bill To Address 1',
			dataIndex: 'billToAddress1',
			width: 170,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Bill To Address 2',
			dataIndex: 'billToAddress2',
			width: 170,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Bill To Address 3',
			dataIndex: 'billToAddress3',
			width: 170,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Bill To City',
			dataIndex: 'billToCity',
			width: 112,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Bill To Country',
			dataIndex: 'billToCountry',
			width: 112,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Bill To State',
			dataIndex: 'billToState',
			width: 112,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Bill To Zip',
			dataIndex: 'billToZip',
			width: 85,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Bill To Email',
			dataIndex: 'billToEmail',
			width: 170,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Bill To Fax',
			dataIndex: 'billToFax',
			width: 130,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Bill To Telephone',
			dataIndex: 'billToTelephone',
			width: 130,
			editor: {
				xtype:'textfield'
			}
//			type:'address',
//			hidden:true
		}, 
		{
			text: 'Special Instruction',
			dataIndex: 'specialInstruction',
			width: 170,
			editor: 'textfield'
//			type:'address',
//			hidden:true
		}, 
//		{
//			text: 'Order Received Date',
//			dataIndex: 'orderReceivedDate',
//			width: 93,
//			hidden:true
//		}, 
		{
			text: 'Sold To RBO#<font color=red>*</font>',
			dataIndex: 'soldToRBONumber',
			width: 100,
			editor: 'textfield',
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		},  
		{
			text: 'Ship to Site #<font color=red>*</font>',
			dataIndex: 'oracleShipToSiteNumber',
			width: 100,
			editor: 'textfield',
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
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
				store:Ext.data.StoreManager.lookup('ShippingMethodId') == null ? AOC.util.Helper.getVariableComboStore('ShippingMethod') : Ext.data.StoreManager.lookup('ShippingMethodId'),
				listeners:{
			    	focus:'onComboFocus',
			    	afterrender:function(combo){
			    		Helper.onComboAfterRender(combo);
					},
					select:function(combo){
						Helper.onComboSelect(combo);
					}
			    }
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
			dataIndex: 'pageSize',
			width: 102,
			editor: 'textfield',
			renderer:function(value, metadata,rec){
				return Helper.onPageSizeColumnRenderer(value, metadata,rec);
			}
		}, 
		{
			text: 'Customer Size',
			dataIndex: 'customerSize',
			width: 72,
			editor: 'textfield',
			renderer:function(value, metadata,rec){
				return Helper.onPageSizeColumnRenderer(value, metadata,rec);
			}
		}, 
		{
			text: 'Contract #',
			dataIndex: 'contractNumber',
			width: 130,
			editor: 'textfield'
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
			renderer : function(value, meta,record) {
            	return Helper.onOrdererDateRenderer(value, meta,record);
        	}
		}, 
		{
			text: 'Requested Delivery Date',
			dataIndex: 'requestedDeliveryDate',
			width: 102,
			format:AOCLit.dateFormat,
			xtype:'datecolumn',
			editor: {
				xtype:'datefield',
				editable:false,
				listeners:{
					'select':'onSelectDate'
				}
			},
			renderer:function(v, metadata, record){
				return Helper.onOrderLineDateRenderer(v, metadata, record);
			}
		}, 
		{
			text: 'Promise Date',
			dataIndex: 'promiseDate',
			xtype: 'datecolumn',   
			format:AOCLit.dateFormat,
			width: 88,
			editor: {
				xtype:'datefield',
				editable:false,
				listeners:{
					'select':'onSelectDate'
				}
			},
			renderer:function(v, metadata, record){
				return Helper.onOrderLineDateRenderer(v, metadata, record);
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
				store:Ext.data.StoreManager.lookup('FreightTermsId') == null ? AOC.util.Helper.getVariableComboStore('FreightTerms') : Ext.data.StoreManager.lookup('FreightTermsId'),
				listeners:{
					focus:'onComboFocus',
					afterrender:function(combo){
						Helper.onComboAfterRender(combo);
					},
					select:function(combo){
						Helper.onComboSelect(combo);
					}
			    }
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
				store:Ext.data.StoreManager.lookup('CSRId') == null ? AOC.util.Helper.getVariableComboStore('CSR') : Ext.data.StoreManager.lookup('CSRId'),
			    listeners:{
					focus:'onComboFocus',
					afterrender:function(combo){
						Helper.onComboAfterRender(combo);
					},
					select:function(combo){
						Helper.onComboSelect(combo);
					}
			    }
			},
			renderer:'comboColumnRenderer'
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
				store:AOCRuntime.getStoreERPORG(),
				listeners:{
					'select':'onerporgSelectChange'
				}
			},
			renderer:'divisionForInterfaceERPORGColumnRenderer'
		}, 
		{
			text: 'Artwork Hold',
			dataIndex: 'artWorkhold',
			width: 84,
			editor:{
				xtype:'combo',
				editable:false,
				store:[['Y','Y'],['N','N']]
			}
		}, 
		{
			text: AOCLit.artworkWorkAttachment,//'Artwork Work Attachment',
			dataIndex: 'artworkAttachment',
			width: 110,
			editor:{
				xtype:'combo',
				editable:false,
				store:[[true,'Y'],[false,'N']]
			},
			renderer:function(value, metadata, record){
				return Helper.onWaveMoqColumnRenderer(value, metadata, record);
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
				store:Ext.data.StoreManager.lookup('OrderTypeId') == null ? AOC.util.Helper.getVariableComboStore('OrderType') : Ext.data.StoreManager.lookup('OrderTypeId'),
				listeners:{
					focus:'onComboFocus',
					afterrender:function(combo){
						Helper.onComboAfterRender(combo);
					},
					select:function(combo){
						Helper.onComboSelect(combo);
					}
			    }
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
				store:Ext.data.StoreManager.lookup('EndCustomerId') == null ? AOC.util.Helper.getVariableComboStore('EndCustomer') : Ext.data.StoreManager.lookup('EndCustomerId'),
				listeners:{
					focus:'onComboFocus',
					afterrender:function(combo){
						Helper.onComboAfterRender(combo);
					},
					select:function(combo){
						Helper.onComboSelect(combo);
					}
			    }
			},
			renderer:'comboColumnRenderer'
		}, 
		{
			text: 'Ship Mark',
			dataIndex: 'shipMark',
			width: 150,
			editor: 'textfield'
		},
		{
			text: AOCLit.additionalLabel,
			dataIndex: 'additionalLabelInternalItem',
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
			renderer:function(value, metadata, record){
				return Helper.onWaveMoqColumnRenderer(value, metadata, record);
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
			renderer:function(value, metadata, record){
				return Helper.onWaveMoqColumnRenderer(value, metadata, record);
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
				store:Ext.data.StoreManager.lookup('SplitShipsetId') == null ? AOC.util.Helper.getVariableComboStore('SplitShipset') : Ext.data.StoreManager.lookup('SplitShipsetId'),
				listeners:{
					focus:'onComboFocus',
					afterrender:function(combo){
						Helper.onComboAfterRender(combo);
					},
					select:function(combo){
						Helper.onComboSelect(combo);
					}
			    }
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
			width: 55,
			editor: {
				xtype: 'combo',
				displayField: 'variableFieldName',
				valueField: 'variableFieldName',
				editable:false,
				queryMode :'local',
				reference:'APOTypeCombo',
				store:Ext.data.StoreManager.lookup('APOTypeId') == null ? AOC.util.Helper.getVariableComboStore('APOType') : Ext.data.StoreManager.lookup('APOTypeId'),
				listeners:{
					focus:'onComboFocus',
					afterrender:function(combo){
						Helper.onComboAfterRender(combo);
				     },
				     select:function(combo){
						Helper.onComboSelect(combo);
				     }
			    }
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
		},
		{
			text: AOCLit.targetSystem,
			dataIndex: 'targetSystemName',
			width: 100
		}
	],
	editGrid:true,
	buildTbar:function(){
		return [
		   {
			   xtype:'button',
			   text:'Show Column',
			   ui:'blue',
			   scale:'small',
			   enableToggle:true,
			   handler:'onShowColumnBtnClick'
		   }
		]
	},
    initComponent: function() {
        var me = this;
        this.fieldArray = [];
        Ext.apply(this, {
		    plugins: me.getOuterGridPlugin(),
		    //tbar:me.buildTbar(),
	        listeners:{
				scope:this,
				beforecellclick:function(view, td, cellIndex, record, tr, rowIdx, e){
				     me.lastScrollLeftPosition = view.el.dom.scrollLeft;
			    },
				cellclick:'onCellClickToView',
				'beforecelldblclick':function(view, td, cellIndex, record, tr, rowIndex, e, eOpts ){
					me.lastScrollLeftPosition = view.el.dom.scrollLeft;
					if(cellIndex==0){
						return false;
					}
				}
			}
		});
        this.callParent(arguments);
    },
    getRowExpander:function(){
    	var me = this,
    		viewRenderer = false,
			rowExpander = new AOC.view.ux.RowExpanderGrid({
				createComponent: function(view, record, htmlnode, index) {
					return me.createInnerGrid(record);
    		    },
    		    rowBodyTpl : ['<div class="row-expander-body"></div>'],
    		    pluginId: 'orderLineRowExpander',
    		    getHeaderConfig: function() {
    		         var  rowExpanders = this,
    		         	  lockable = this.grid.ownerLockable;

    		         return {
    		             width: rowExpanders.headerWidth,
    		             lockable: false,
    		             autoLock: true,
    		             sortable: false,
    		             resizable: false,
    		             draggable: false,
    		             hideable: false,
    		             menuDisabled: true,
    		             tdCls: Ext.baseCSSPrefix+'grid-cell-special',
    		             innerCls: Ext.baseCSSPrefix + 'grid-cell-inner-row-expander',
    		             renderer: function(type, config, cell, rowIndex, cellIndex, e, view) {
    		             	var record=config.record;
    		             	var nestedGridRefrence=me.nestedGridRefrence;
    		             	var length=record.get(nestedGridRefrence).length;
    		             	
    		             	if(!viewRenderer){
	    		             	me.view.on('expandbody', function(rowNode, record, expandRow, eOpts){
	    		    	            rowExpander.onExpand(rowNode, record, expandRow);
	    			        	});
	    		             	viewRenderer = true;
    		             	}
    		             	if(length!=0)
    		             		return '<div class="custom-row-expander" role="presentation"></div>';
    		             	else
    		             		return '<div class="hiderowexpander" role="presentation"></div>';
    		             },
    		             processEvent: function(type, view, cell, rowIndex, cellIndex, e, record) {
    		                 if (e.getTarget('.custom-row-expander')) {
    		                     if (type === "click") {
    		                    	 rowExpanders.toggleRow(rowIndex, record);
    		                         return rowExpanders.selectRowOnExpand;
    		                     }
    		                 }
    		             },

    		             // This column always migrates to the locked side if the locked side is visible.
    		             // It has to report this correctly so that editors can position things correctly
    		             isLocked: function() {
    		                 return lockable && (lockable.lockedGrid.isVisible() || this.locked);
    		             },

    		             // In an editor, this shows nothing.
    		             editRenderer: function() {
    		                 return '&#160;';
    		             }
    		         };
    		    },
    		    onExpand: function(rowNode, record, expandRow) {
    		    	this.grid.editingPlugin ? this.grid.editingPlugin.cancelEdit() : '';
    		    	//(Amit Kumar)after refresh grid view need to create inner grid view again bcz after store load inner view destroyed
    		    	if(Ext.isEmpty(rowNode.querySelector('.nestedGrid'))){
    		            var view = this.grid.getView(),
    		                newComponent = this.createComponent(view, record, rowNode, view.indexOf(rowNode));
    		                targetRowbody = Ext.DomQuery.selectNode('div.row-expander-body', rowNode);
    		            
    		            newComponent.render(targetRowbody);
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
    		data = record.get('listOrderlineDetails'),
    		recordId = record.get('id');
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
				model: 'AOC.model.VariableHeaderModel',
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
			recordId:recordId,
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
					flex:1.8,
					renderer:function(v, metadata,rec){
						var mandatory = rec.get('mandatory');
						metadata.tdAttr = 'data-qtip="<font color=blue>' + Ext.util.Format.htmlEncode(v) + '</font>"';
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
					renderer:function(v, metadata,rec){
						var mandatory = rec.get('mandatory');
						metadata.tdAttr = 'data-qtip="<font color=blue>' +  Ext.util.Format.htmlEncode(v) + '</font>"';
						if(Ext.isEmpty(v) && mandatory == 'Y'){
							metadata.style = AOCLit.cellColor;
						}
						return v;
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
				},
				{
					text:"Help Message",
					dataIndex:'helpMessage',
					flex:1
				}
			],
			columnLines: false,
			width: 1250,
			border: true,
			style:'border:solid 1px #ccc;',
			plugins: me.getInnerGridPlugin(),
			autoHeight: true,
			//frame: false,
			//header: false
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
							currentRecord = ctx.store.getAt(idx),
							nestedGrid = editor.grid;
						
						var obj = currentRecord.getChanges();
						obj.id = currentRecord.id;
						
						var runTime = AOC.config.Runtime;
						
						var obj='{"data":'+Ext.encode(Ext.encode(obj))+',"orderQueueId":"'+runTime.getOrderQueueId()+'"}';
						
						Ext.Ajax.request({
							method:'PUT',
							jsonData:obj,
							url : applicationContext+'/rest/orderlinedetails/variablebulkupdate',
							success : function(response, opts) {
								Helper.showToast('success','Order line Detail successfully updated');
								grid.openedRecordIndex = grid.store.find('id', nestedGrid.recordId);
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
                        currentRecord = ctx.store.getAt(idx),
						nestedGrid = ctx.grid;
                    
                    var obj = currentRecord.getChanges();
                    var runTime = AOC.config.Runtime;
                    var obj = '{"data":' + Ext.encode(Ext.encode(obj)) + ',"updateAll":true,"orderQueueId":"' + runTime.getOrderQueueId() + '"}';
                    
                    Ext.Ajax.request({
                        method: 'PUT',
                        jsonData: obj,
                        params:{variablename:currentRecord.get('variableFieldName')},
                        url: applicationContext + '/rest/orderlinedetails/bulkupdate/variable',
                        success: function(response, opts) {
                            Helper.showToast('success', 'Order line Detail successfully updated');
                            grid.openedRecordIndex = grid.store.find('id', nestedGrid.recordId);
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
			saveAndNextBtn: true,
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
		var el = Ext.get(e.target);
		if(el.hasCls('EnableUpdateMoq')){
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
							Helper.showToast('validation','<b>Customer Qty. Updated Succesfully</b>');
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