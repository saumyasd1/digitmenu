Ext.define('AOC.view.orderqueue.OrderLineExpandableGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'orderlineexpandablegrid',
    cls:'orderline-expandable-grid',
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
			text: AOCLit.atoMandatory,
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
			text: AOCLit.bulkSample,
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
			text: AOCLit.custPO,
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
			text: AOCLit.dupPO,
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
			text: AOCLit.sizePage,
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
			text: AOCLit.moqRoundUp,
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
			text: AOCLit.coo,
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
			text: AOCLit.febricContent,
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
			text: AOCLit.reviseOrder,
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
			text: AOCLit.roundQty,
			dataIndex: 'roundQty',
			width: 50,
			align:'center',
			renderer:function(value, metadata, record){
				return Helper.qtyColumnRenderer(value, metadata, record);
			}
		},
		{
			text: AOCLit.MOQDiffQty,
			dataIndex: 'moqdiffQty',
			width: 55,
			align:'center',
			renderer:function(value, metadata, record){
				return Helper.qtyColumnRenderer(value, metadata, record);
			}
		},
		{
			text: AOCLit.custOrderedQty +'<font color=red>*</font>',
			dataIndex: 'customerOrderedQty',
			width: 130,
			editor: {
				xtype:'numberfield',
				minValue:0
			},
			renderer : function(value, metadata, record) {
				return Helper.onCustomerOrderQty(value, metadata, record);
			} 
		},
		{
			text: AOCLit.skuQtyDifference ,
			dataIndex: 'skuQtyDifference',
			width: 106
		},
		{
			text: AOCLit.updateQty,
			dataIndex: 'updateMOQ',
			width: 55,
			align:'center',
			renderer:function(value, metadata,rec){
            	return Helper.onUpdateMoqRenderer(value, metadata,rec);
            }
		},
		{
			text: AOCLit.waiveMOQ,
			dataIndex: 'waiveMOQ',
			width: 80,
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
			text: AOCLit.Status,
			dataIndex: 'status',
			width: 200,
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
			text: AOCLit.poNumber+'<font color=red>*</font>',
			dataIndex: 'poNumber',
			width: 120
		},
		{
			text: AOCLit.averyItem,
			dataIndex: 'averyItemNumber',
			width: 88,
			renderer : function(value, metadata,record) {
                return Helper.onAveryItemNumberColumnRenderer(value, metadata, record);
            }
		}, 
		{
			text: AOCLit.custItemNo,
			dataIndex: 'customerItemNumber',
			width: 88
			
		},
		{
			text: AOCLit.customerColorCode,
			dataIndex: 'customerColorCode',
			width: 102
		}, 
		{
			text: AOCLit.customerColorDescription,
			dataIndex: 'customerColorDescription',
			width: 102
		},
		{
			text: AOCLit.itemDescription,
			dataIndex: 'pageSize',
			width: 102,
			renderer:function(value, metadata,rec){
				return Helper.onPageSizeColumnRenderer(value, metadata,rec);
			}
		}, 
		{
			text: AOCLit.customerSize,
			dataIndex: 'customerSize',
			width: 72,
			editor: 'textfield',
			renderer:function(value, metadata,rec){
				return Helper.onPageSizeColumnRenderer(value, metadata,rec);
			},
			type:'address',
			hidden:true
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
			text: AOCLit.averyATO,
			dataIndex: 'averyATO',
			width: 93,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		}, 
		{
			text: AOCLit.bulkItem,
			dataIndex: 'averyBulk',
			width: 93,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		}, 
		{
			text: AOCLit.averyMOQ,
			dataIndex: 'averyMOQ',
			width: 93,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		}, 
		{
			text: AOCLit.averyProduction,
			dataIndex: 'averyProductLineType',
			width: 93,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		}, 
		{
			text: AOCLit.averyRegion,
			dataIndex: 'averyRegion',
			width: 93,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		},
		{
			text: AOCLit.averyRoundupQty,
			dataIndex: 'averyRoundupQty',
			width: 93,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		},
		{
			text: AOCLit.custName,
			dataIndex: 'partnerCustomerName',
			width: 130,
			editor: 'textfield'
		}, 
		{
			text: AOCLit.vendorName,
			dataIndex: 'partnerVendorName',
			width: 120,
			editor: 'textfield'
		}, 
		{
			text: AOCLit.shipToCustomer,
			dataIndex: 'shipToCustomer',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipContact,
			dataIndex: 'shipToContact',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToAddress1,
			dataIndex: 'shipToAddress1',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToAddress2,
			dataIndex: 'shipToAddress2',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToAddress3,
			dataIndex: 'shipToAddress3',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToCity,
			dataIndex: 'shipToCity',
			width: 112,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToCountry,
			dataIndex: 'shipToCountry',
			width: 112,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToState,
			dataIndex: 'shipToState',
			width: 112,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToZip,
			dataIndex: 'shipToZip',
			width: 85,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToEmail,
			dataIndex: 'shipToEmail',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToFax,
			dataIndex: 'shipToFax',
			width: 130,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToTelephone,
			dataIndex: 'shipToTelephone',
			width: 130,
			editor: 'textfield',
			type:'address',
			hidden:true
		},
		{
			text: AOCLit.billtoSite+'<font color=red>*</font>',
			dataIndex: 'oracleBillToSiteNumber',
			width: 100,
			editor: 'textfield',
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		}, 
		{
			text: AOCLit.billToCustomer,
			dataIndex: 'billToCustomer',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToContact,
			xtype:'gridcolumn',
			dataIndex: 'billToContact',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToAddress1,
			dataIndex: 'billToAddress1',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToAddress2,
			dataIndex: 'billToAddress2',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToAddress3,
			dataIndex: 'billToAddress3',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToCity,
			dataIndex: 'billToCity',
			width: 112,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToCountry,
			dataIndex: 'billToCountry',
			width: 112,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToState,
			dataIndex: 'billToState',
			width: 112,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToZip,
			dataIndex: 'billToZip',
			width: 85,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToEmail,
			dataIndex: 'billToEmail',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToFax,
			dataIndex: 'billToFax',
			width: 130,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToTelephone,
			dataIndex: 'billToTelephone',
			width: 130,
			editor: {
				xtype:'textfield'
			},
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.specialInstruction,
			dataIndex: 'specialInstruction',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.soldToRbo+'<font color=red>*</font>',
			dataIndex: 'soldToRBONumber',
			width: 100,
			editor: 'textfield',
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		},  
		{
			text: AOCLit.shipToSite+'<font color=red>*</font>',
			dataIndex: 'oracleShipToSiteNumber',
			width: 100,
			editor: 'textfield',
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		}, 
		{
			text: AOCLit.shippingMethod,
			dataIndex: 'shippingMethod',
			width: 170,
			editor: {
				xtype: 'combo',
				displayField: 'variableFieldName',
				valueField: 'variableFieldName',
				//editable:false,
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
			text: AOCLit.retailerPO_CustomerJob,
			dataIndex: 'retailerPO_CustomerJob',
			width: 115,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.contractNo,
			dataIndex: 'contractNumber',
			width: 130,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.styleNo,
			dataIndex: 'styleNo',
			width: 111,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.custSeason,
			dataIndex: 'customerSeason',
			width: 93,
			editor: 'textfield',
			type:'address',
			hidden:true
		},
		{
			text: AOCLit.orderedDate+'<font color=red>*</font>',
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
			text: AOCLit.requestedDeliveryDate,
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
			text: AOCLit.promiseDate,
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
			text: AOCLit.freightTerm,
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
			text: AOCLit.CSR,
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
			text: AOCLit.packagingInstruction,
			dataIndex: 'packingInstruction',
			width: 180,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shippingInstructions,
			dataIndex: 'shippingInstructions',
			width: 180,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.invoiceLineInstruction,
			dataIndex: 'invoicelineInstruction',
			width: 119,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.divisionforInterfaceERPORG,
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
			text: AOCLit.artworkHold,
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
			text: AOCLit.variableDataBreakdown,
			dataIndex: 'variableDataBreakdown',
			width: 110,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.manufacturingNotes,
			dataIndex: 'manufacturingNotes',
			width: 107,
			editor: 'textfield'
		}, 
		{
			text: AOCLit.orderType,
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
			text: AOCLit.orderBy,
			dataIndex: 'orderBy',
			width: 115,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.endCust,
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
			text: AOCLit.shipMark,
			dataIndex: 'shipMark',
			width: 150,
			editor: 'textfield',
			type:'address',
			hidden:true
		},
		{
			text: AOCLit.additionalLabel,
			dataIndex: 'additionalLabelInternalItem',
			width: 150,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.bankCharge,
			dataIndex: 'bankCharge',
			width: 90,
			editor: {
				xtype: 'numberfield',
				maxLength: 8,
				minValue: 0
			}
		}, 
		{
			text: AOCLit.freightCharge,
			dataIndex: 'freightCharge',
			width: 90,
			editor: {
				xtype: 'numberfield',
				maxLength: 8,
				minValue: 0
			}
		}, 
		{
			text: AOCLit.shippingHold,
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
			text: AOCLit.productionHold,
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
			text: AOCLit.splitShipset,
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
			text: AOCLit.agreement,
			dataIndex: 'agreement',
			width: 102,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.modelSerialNumber,
			dataIndex: 'modelSerialNumber',
			width: 180,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.apoType,
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
			text: AOCLit.sentToOracleDate,
			dataIndex: 'sentToOracleDate',
			width: 100,
			hidden:true,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.comment,
			dataIndex: 'comment',
			width: 100,
			editor: 'textfield',
			type:'address',
			hidden:true
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
	  	    	 text:'',
	  	    	 scale:'medium',
	  	    	 cls:'aoc-btn',
	  	    	 enableToggle:true,
	  	    	 tooltip:'<font color="blue">Expand Column</font>',
	  	    	 iconCls:'fa fa-expand aoc-icon',
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
//				celldblclick:function(){
//					var win = Ext.create('AOC.view.orderqueue.EditOrderLineWindow');
//					win.show();
//				},
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
    		    selectRowOnExpand:true,
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
    		                    	 rowExpanders.view.getRow(rowIndex).scrollIntoView();
    		                         //return rowExpanders.selectRowOnExpand;
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
    		    	this.grid.ownerGrid.editingPlugin ? this.grid.ownerGrid.editingPlugin.cancelEdit() : '';
    		    	
    		    	//(Amit Kumar)after refresh grid view need to create inner grid view again bcz after store load inner view destroyed
    		    	if(Ext.isEmpty(rowNode.querySelector('.nestedGrid'))){
    		            var view = this.grid.getView(),
    		                newComponent = this.createComponent(view, record, rowNode, view.indexOf(rowNode));
    		                targetRowbody = Ext.DomQuery.selectNode('div.row-expander-body', rowNode);
    		            
    		            newComponent.render(targetRowbody);
    		            me.lastTopScrollPosition = this.view.el.dom.scrollTop;
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
					data[i].skuno = parseInt(data[i].skuno);
					data[i].typeSetter = parseInt(data[i].typeSetter);
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
				  text: 'SKU #',
				  dataIndex: 'skuno',
				  flex:0.5,
				  renderer:function(v, metadata, record){
					  if(v){
						  return v;
					  }return '';
				  }
				}, 
				{
				  text:'TypeSetterCode',
				  dataIndex: 'typeSetter',
				  flex:0.8,
				  renderer:function(v, metadata, record){
					  if(v){
						  return v;
					  }return '';
				  }
				}, 
				{
					text: 'Variable Field Name',
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
					text: 'Variable Field Value',
					dataIndex: 'variableDataValue',
					flex:2,
					editor: {
							xtype:'textareafield',
							height:40,
							autoScroll:true,
							grow:true
						   },
					renderer:function(v, metadata,rec){
						var mandatory = rec.get('mandatory'),
						isContainsFibre = rec.get('level').toLowerCase(),
						variableDataValue = rec.get('variableDataValue'),
						fiberPercent = rec.get('fiberPercent');
						metadata.tdAttr = 'data-qtip="<font color=blue>' +  Ext.util.Format.htmlEncode(v) + '</font>"';
						if(Ext.isEmpty(v) && mandatory == 'Y'){
							metadata.style = AOCLit.cellColor;
						}
						else if(isContainsFibre.includes('fiber line') && (fiberPercent>0 && Ext.isEmpty(variableDataValue) ) ){
							metadata.style = AOCLit.cellColor;
						}
						else{
							return v;
						}
					}
				}, 
				{
				  text: 'Fiber Content Percentage',
				  dataIndex: 'fiberPercent',
				  xtype:'gridcolumn',
				  align:'center',
				  flex:1,
				  editor: {
					  xtype:'textfield'
				  },
				  renderer:function(v, metadata,rec){
						var isContainsFibre = rec.get('level').toLowerCase(),
						variableDataValue = rec.get('variableDataValue'),
						fiberPercent = rec.get('fiberPercent');
						if(isContainsFibre.includes('fiber line') && (!Ext.isEmpty(variableDataValue) && Ext.isEmpty(fiberPercent))){
							metadata.style = AOCLit.cellColor;
						}
						else{
							return v;
						}
					}
				},
				{
					text:'Help Message',
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
						var ctx = context,
							idx = ctx.rowIdx,
							currentRecord = ctx.store.getAt(idx),
							nestedGrid = editor.grid;
						
						var obj = currentRecord.getChanges();
						obj.id = currentRecord.id;
						fiberPercent = currentRecord.get('fiberPercent');
						
						if(fiberPercent.includes('.')==true || fiberPercent<0){
							Helper.showToast('failure','Please enter only positive integer value for Fiber percent');
						}
						else{
							Ext.getBody().mask('Saving....');
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