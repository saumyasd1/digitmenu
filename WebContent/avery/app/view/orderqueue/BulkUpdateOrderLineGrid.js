Ext.define('AOC.view.orderqueue.BulkUpdateOrderLineGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.bulkupdateorderlinegrid',
    itemId:'BulkUpdateOrderlineGrid',
    requires:['AOC.util.Helper','Ext.grid.selection.SpreadsheetModel','AOC.view.orderqueue.BulkUpdateController','Ext.grid.plugin.Clipboard'],
    controller:'orderlinebulkupdate',
	emptyText: AOCLit.noContentTypeDispMsg,
	runTime : AOC.config.Runtime,
	reserveScrollbar:true,
    initComponent: function(){
    	var me=this;
    	
        Ext.apply(me,{
            columns : me.buildColumns(),
			columnLines:false,
			selModel: {
		       type: 'spreadsheet'
		    },
		    plugins: [
	            {
			        ptype: 'cellediting',
			        clicksToEdit: 2,
			        beforeEdit:function(editor){
			        	var me = this,
				    		currentRecord = editor.record,
				    		currentRecordStatus = currentRecord.get('status');
			        	
			        	if(currentRecordStatus != AOCLit.cancelStatusOrderLine){
			        		editor.column.getEditor(currentRecord).enable();
			        		return true;
			        	}else{
			        		if(editor.field == 'status'){
			        			editor.column.getEditor(currentRecord).enable();
			        			return true;
			        		}
			        	}
			        	return false;
			        }
			    },
			    {
			    	ptype: 'clipboard'
			    }
		    ],
		    listeners:{
		    	scope:this,
            	cellclick:'onCellClickToView',
		    	 'selectionchange':function( grid, selection, eOpts ){
		    		 AOC.util.Helper.BulkUpdate( grid, selection, eOpts);
		    	 }
        	}
        });
        me.callParent(arguments);
    },
    buildColumns : function(){
    	var me=this;
    	helper = AOC.util.Helper;
        return [
                {
                	xtype: 'rownumberer',
                    width: 46,
                    editRenderer:  '&#160;',
                    tdCls: me.rowNumbererTdCls,
                    cls: me.rowNumbererHeaderCls,
                    locked: me.hasLockedHeader,
                    text:'#'
                },
                {
                    text: AOCLit.roundQty,
                    dataIndex: 'roundQty',
                    width: 50,
                    editor: 'numberfield',
                    renderer:function(value, metadata, record){
        				if(value){
        					return Number(value)
        				}
        				return '';
        			}
                },
                {
                    text: AOCLit.MOQDiffQty,
                    dataIndex: 'moqdiffQty',
                    width: 55,
                    editor: 'numberfield',
                    renderer:function(value, metadata, record){
        				if(value){
        					return Number(value);
        				}
        				return '';
        			}
                },
                {
                    text: 'Customer Ordered Qty.<font color=red>*</font>',
                    dataIndex: 'customerOrderedQty',
                    width: 106,
                    editor: 'numberfield',
                    renderer : function(value, metadata, record) {
                    	if(parseInt(value) > -1) {
	    					if(value == '0'){
	    						metadata.style = AOCLit.cellColor;
	    					}
    						if(record.get('status')==AOCLit.waitingForCSRStatusOrderLine && (record.get('waiveMOQ')=='false' || record.get('waiveMOQ')==false)){
    							var moqValidationFlag = record.data.moqvalidationFlag  ? record.data.moqvalidationFlag : record.data.moqvalidationFlag.trim();
    							
    							if(moqValidationFlag.substr(0,1) == 'F'){
    								metadata.style = AOCLit.mandatoryValidationCellColor;
    							}
    						}
	    					if(record.get('status')==AOCLit.customerQtyMismatchStatusOrderline || record.get('status')==AOCLit.errorInCustomerOrderQtyStatusOrderLine){
	    						metadata.style = AOCLit.cellColor;
	    					}
	    					return value;
                    	} else {	
	    					metadata.style = AOCLit.cellColor;
	    					return value;
	    				}
                    } 
                },
                {
                    text: AOCLit.updateQty,
                    dataIndex: 'updateMOQ',
                    width: 50,
                    renderer:function(value, metadata,rec){
                    	var checkMOQ = rec.data.moqValidationFlag ? rec.data.moqValidationFlag.trim()  :'';
                    	
                   	 if(rec.data.waiveMOQ==false && (checkMOQ && checkMOQ.substr(0,1)=='F'))
                   		return '<div><img class="EnableUpdateMoq" src="' + AOC.config.Settings.buttonIcons.EnableUpdateMoqFlag + '" /></div>';
                   	 else
                   		return '<div><img src="' + AOC.config.Settings.buttonIcons.DisableUpdateMoqFlag + '" /></div>';
                   }

                },
                {
                    text: AOCLit.waiveMOQ,
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
                    		v = 'Y';
                    	}
        				return v;
                }
                },
                {
            text: AOCLit.Status,
            dataIndex: 'status',
            width: 180,
            editor: {
            	xtype:'combo',
            	editable:false,
            	displayField:'value',
            	editable:false,
				valueField:'code',
				queryMode :'local',
				store:Ext.data.StoreManager.lookup('orderlineid') == null ? AOC.util.Helper.getCodeStore('orderline') : Ext.data.StoreManager.lookup('orderlineid'),
				listeners:{
			        afterrender:function(combo){
				         var store = combo.store;
				         store.filterBy(function(record){
				        	 return (record.get('code') == AOCLit.waitingForCSRStatusOrderLine || record.get('code') == AOCLit.cancelStatusOrderLine);
				         });
			        },
			        focus:function(combo){
			        	var store = combo.store;
			        	var index = store.find('code',combo.getValue());
			        	if(index == -1){
			        		combo.setValue('');
			        	}
			        },
			        select:'onSelectStatusBulk'
		       }		
            },
			renderer:function(v, metadata, rec){
				return Helper.getSatus(rec);
			}
        },{
            text: 'PO#<font color=red>*</font>',
            dataIndex: 'poNumber',
            width: 120
        },
        {
            text: 'Avery Item#<font color=red>*</font>',
            dataIndex: 'averyItemNumber',
            width: 88,
            renderer : function(value, meta,record) {
                if(value=='') {
                	if(record.get('status')==AOCLit.waitingForCSRStatusOrderLine)
                		meta.style = AOCLit.cellColor;
                } else {
                	if(value==AOCLit.averyItemNotFoundText || value==AOCLit.duplicateMappingLabel)
                		meta.style = AOCLit.cellColor;
                	 return value;
                }
            }
        }, {
            text: AOCLit.custItemNo,
            dataIndex: 'customerItemNumber',
            width: 88
        },{
            text: AOCLit.customerColorCode,
            dataIndex: 'customerColorCode',
            width: 102
        }, {
            text: AOCLit.customerColorDescription,
            dataIndex: 'customerColorDescription',
            width: 102
        },{
            text: AOCLit.Bulk,
            dataIndex: 'bulk',
            width: 50,
            editor:{
            	xtype:'combo',
            	editable:false,
            	store:[['Y','Y'],['N','N']]
            },
            renderer:function(value, metadata,rec){
				
				var bulkSampleValidationFlag=rec.data.bulkSampleValidationFlag;
				var checkvalue=bulkSampleValidationFlag ? bulkSampleValidationFlag.trim() :'';
				if(checkvalue.substr(0,1)=='T'){
					return value;
				}
				else{
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
            text: AOCLit.custName,
            dataIndex: 'partnerCustomerName',
            width: 126,
            editor: 'textfield'
        }, {
            text: AOCLit.vendorName,
            dataIndex: 'partnerVendorName',
            width: 111,
            editor: 'textfield'
        },  {
            text: AOCLit.shipToCustomer,
            dataIndex: 'shipToCustomer',
            width: 170,
            editor: 'textfield'
        },{
            text: AOCLit.shipContact,
            dataIndex: 'shipToContact',
            width: 170,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToAddress1,
            dataIndex: 'shipToAddress1',
            width: 170,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToAddress2,
            dataIndex: 'shipToAddress2',
            width: 170,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToAddress3,
            dataIndex: 'shipToAddress3',
            width: 170,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToCity,
            dataIndex: 'shipToCity',
            width: 112,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToCountry,
            dataIndex: 'shipToCountry',
            width: 112,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToState,
            dataIndex: 'shipToState',
            width: 112,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToZip,
            dataIndex: 'shipToZip',
            width: 85,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToEmail,
            dataIndex: 'shipToEmail',
            width: 170,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToFax,
            dataIndex: 'shipToFax',
            width: 130,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToTelephone,
            dataIndex: 'shipToTelephone',
            width: 130,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        },{
        	xtype:'gridcolumn',
            text: 'Bill to Site #<font color=red>*</font>',
            dataIndex: 'oracleBillToSiteNumber',
            width: 100,
            editor:'textfield',
            renderer : function(value, meta,record) {
                if(value=='') {
                	if(record.get('status')==AOCLit.waitingForCSRStatusOrderLine)
                		meta.style = AOCLit.cellColor;
                } else {
                	 return value;
                }
            }
        }, {
            text: AOCLit.billToCustomer,
            dataIndex: 'billToCustomer',
            width: 170,
            editor: 'textfield'
        },{
            text: AOCLit.billContact,
            dataIndex: 'billToContact',
            width: 170,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.billToAddress1,
            dataIndex: 'billToAddress1',
            width: 170,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.billToAddress2,
            dataIndex: 'billToAddress2',
            width: 170,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.billToAddress3,
            dataIndex: 'billToAddress3',
            width: 170,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.billToCity,
            dataIndex: 'billToCity',
            width: 112,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text:AOCLit.billToCountry,
            dataIndex: 'billToCountry',
            width: 112,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.billToState,
            dataIndex: 'billToState',
            width: 112,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.billToZip,
            dataIndex: 'billToZip',
            width: 85,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.billToEmail,
            dataIndex: 'billToEmail',
            width: 170,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.billToFax,
            dataIndex: 'billToFax',
            width: 130,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.billToTelephone,
            dataIndex: 'billToTelephone',
            width: 130,
            getEditor: function(record) {
            	return AOC.util.Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.specialInstruction,
            dataIndex: 'specialInstruction',
            width: 170,
            editor: 'textfield'
        }, {
            text: AOCLit.orderReceivedDate,
            dataIndex: 'orderReceivedDate',
            width: 93,
            hidden:true
        }, {
            text: 'Sold To RBO#<font color=red>*</font>',
            dataIndex: 'soldToRBONumber',
            width: 100,
            editor: 'textfield',
            renderer : function(value, meta,record) {
                if(value=='') {
                	if(record.get('status')==AOCLit.waitingForCSRStatusOrderLine)
                		meta.style = AOCLit.cellColor;
                } else {
                	 return value;
                }
            }
        },  {
            text: 'Ship to Site #<font color=red>*</font>',
            dataIndex: 'oracleShipToSiteNumber',
            width: 100,
            editor:'textfield',
            renderer : function(value, meta,record) {
                if(value=='') {
                	if(record.get('status')==AOCLit.waitingForCSRStatusOrderLine)
                		meta.style = AOCLit.cellColor;
                } else {
                	 return value;
                }
            }
        }, {
            text: AOCLit.shippingMethod,
            dataIndex: 'shippingMethod',
            width: 170,
            editor: {
                xtype: 'combo',
                displayField: 'variableFieldName',
                valueField: 'variableFieldName',
                queryMode :'local',
                editable:false,
                store: Ext.data.StoreManager.lookup('ShippingMethodId') == null ? AOC.util.Helper.getVariableComboStore('ShippingMethod') : Ext.data.StoreManager.lookup('ShippingMethodId'),
        		listeners:{
					focus:'onComboFocus'
			    }
            },
            renderer:'comboColumnRenderer'
        }, {
            text: AOCLit.retailerPO_CustomerJob,
            dataIndex: 'retailerPO_CustomerJob',
            width: 115,
            editor: 'textfield'
        }, {
            text: AOCLit.itemDescription,
            dataIndex: 'itemDescription',
            width: 102,
            editor: 'textfield',
            renderer:function(value, metadata,rec){
				var htlSizePageValidationFlag=rec.get('htlsizePageValidationFlag') ? rec.get('htlsizePageValidationFlag').trim() : '';
				if(htlSizePageValidationFlag.substr(0, 1) == 'T'){
					return value;
				}
				else{
					//if(this.showMandatoryValidationField){
						metadata.style = AOCLit.mandatoryValidationCellColor;
					//}
					return value;
				}
			}
        }, {
            text:AOCLit.customerSize,
            dataIndex: 'customerSize',
            width: 72,
            editor: 'textfield',
            renderer:function(value, metadata,rec){
				var htlSizePageValidationFlag=rec.get('htlSizePageValidationFlag') ? rec.get('htlSizePageValidationFlag').trim():'';
				if(htlSizePageValidationFlag.substr(0,1) == 'T'){
					return value;
				}
				else{
					//if(this.showMandatoryValidationField){
						metadata.style = mandatoryValidationCellColor;
					//}
					return value;
				}
			}
        }, {
            text: 'Contract #',
            dataIndex: 'contractNumber',
            width: 130,
            editor: 'textfield'
        }, {
            text: AOCLit.styleNo,
            dataIndex: 'styleNo',
            width: 111,
            editor: 'textfield'
        }, {
            text: AOCLit.custSeason,
            dataIndex: 'customerSeason',
            width: 93,
            editor: 'textfield'
        }, {
            text: 'Ordered Date<font color=red>*</font>',
            dataIndex: 'orderedDate',
            width: 90,
            xtype:'datecolumn',
            format:AOCLit.dateFormat,
            editor: 'datefield',
            renderer : function(value, meta,record) {
                if(value=='' || value == null) {
                	meta.style = AOCLit.cellColor;
                }
                else{
                	return Ext.Date.format(value,'Y-m-d');
                }
            }
        }, {
            text:AOCLit.requestedDeliveryDate,
            dataIndex: 'requestedDeliveryDate',
            width: 102,
            format:AOCLit.dateFormat,
            xtype:'datecolumn',
            editor: {
				xtype:'datefield',
				listeners:{
					'select':'onSelectDate'
				}
			}
        }, {
            text: AOCLit.promiseDate,
            dataIndex: 'promiseDate',
            xtype: 'datecolumn',   
            format:AOCLit.dateFormat,
            width: 88,
            editor: {
				xtype:'datefield',
				listeners:{
					'select':'onSelectDate'
				}
			}
        }, {
            text: AOCLit.freightTerm,
            dataIndex: 'freightTerms',
            width: 130,
            editor: {
                xtype: 'combo',
                displayField: 'variableFieldName',
                valueField: 'variableFieldName',
                editable:false,
                queryMode :'local',
                store: Ext.data.StoreManager.lookup('FreightTermsId') == null ? AOC.util.Helper.getVariableComboStore('FreightTerms') : Ext.data.StoreManager.lookup('FreightTermsId'),
        		listeners:{
					focus:'onComboFocus'
			    }
            },
            renderer:'comboColumnRenderer'
        }, {
            text: 'CSR',
            dataIndex: 'csr',
            width: 160,
            editor: {
                xtype: 'combo',
                displayField: 'variableFieldName',
                valueField: 'variableFieldName',
                editable:false,
                queryMode :'local',
                store: Ext.data.StoreManager.lookup('CSRId') == null ? AOC.util.Helper.getVariableComboStore('CSR') : Ext.data.StoreManager.lookup('CSRId'),
        		listeners:{
					focus:'onComboFocus'
			    }
            },
            renderer:'comboColumnRenderer'
        }, {
            text: AOCLit.packingInstruction,
            dataIndex: 'packingInstruction',
            width: 180,
            editor: 'textfield'
        }, {
            text: AOCLit.shippingInstructions,
            dataIndex: 'shippingInstructions',
            width: 180,
            editor: 'textfield'
        }, {
            text: AOCLit.invoiceLineInstruction,
            dataIndex: 'invoicelineInstruction',
            width: 119,
            editor: 'textfield'
        }, {
            text: AOCLit.divisionforInterfaceERPORG,
            dataIndex: 'divisionForInterfaceERPORG',
            width: 120,
            editor:{
                   xtype:'combo',
   				   displayField:'name',
   				   valueField:'id',
                   store:AOC.config.Runtime.getStoreERPORG()
            },
            renderer:'divisionForInterfaceERPORGColumnRenderer'
        }, {
            text: AOCLit.artworkHold,
            dataIndex: 'artWorkhold',
            width: 84,
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
        }, {
            text: AOCLit.artworkWorkAttachment,
            dataIndex: 'artworkAttachment',
            width: 110,
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
        }, {
            text: AOCLit.variableDataBreakdown,
            dataIndex: 'variableDataBreakdown',
            width: 110,
            editor: 'textfield'
        }, {
            text: AOCLit.manufacturingNotes,
            dataIndex: 'manufacturingNotes',
            width: 107,
            editor: 'textfield'
        }, {
            text: AOCLit.orderType,
            dataIndex: 'orderType',
            width: 115,
            editor: {
                xtype: 'combo',
                displayField: 'variableFieldName',
                valueField: 'variableFieldName',
                editable:false,
                queryMode :'local',
                store: Ext.data.StoreManager.lookup('OrderTypeId') == null ? AOC.util.Helper.getVariableComboStore('OrderType') : Ext.data.StoreManager.lookup('OrderTypeId'),
        		listeners:{
					focus:'onComboFocus'
			    }
            },
            renderer:'comboColumnRenderer'
        }, {
            text: AOCLit.orderBy,
            dataIndex: 'orderBy',
            width: 115,
            editor: 'textfield'
        }, {
            text: AOCLit.endCust,
            dataIndex: 'endCustomer',
            width: 115,
            editor: {
                xtype: 'combo',
                displayField: 'variableFieldName',
                valueField: 'variableFieldName',
                editable:false,
                queryMode :'local',
                store: Ext.data.StoreManager.lookup('EndCustomerId') == null ? AOC.util.Helper.getVariableComboStore('EndCustomer') : Ext.data.StoreManager.lookup('EndCustomerId'),
        		listeners:{
					focus:'onComboFocus'
			    }
            },
            renderer:'comboColumnRenderer'
        },{
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
		}, {
            text: AOCLit.bankCharge,
            dataIndex: 'bankCharge',
            width: 90,
            editor: {
                xtype: 'numberfield',
                maxLength: 8,
                minValue: 0
            }
        }, {
            text: AOCLit.freightCharge,
            dataIndex: 'freightCharge',
            width: 90,
            editor: {
                xtype: 'numberfield',
                maxLength: 8,
                minValue: 0
            }
        }, {
            text: AOCLit.shippingHold,
            dataIndex: 'shippingHold',
            width: 83,
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
        }, {
            text: AOCLit.productionHold,
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
        }, {
            text: AOCLit.splitShipset,
            dataIndex: 'splitShipset',
            width: 81,
            editor: {
                xtype: 'combo',
                displayField: 'variableFieldName',
                valueField: 'variableFieldName',
                editable:false,
                queryMode :'local',
                store: Ext.data.StoreManager.lookup('SplitShipsetId') == null ? AOC.util.Helper.getVariableComboStore('SplitShipset') : Ext.data.StoreManager.lookup('SplitShipsetId'),
        		listeners:{
					focus:'onComboFocus'
			    }
            },
            renderer:'comboColumnRenderer'
        }, {
            text: AOCLit.agreement,
            dataIndex: 'agreement',
            width: 102,
            editor: 'textfield'
        }, {
            text: AOCLit.modelSerialNumber,
            dataIndex: 'modelSerialNumber',
            width: 180,
            editor: 'textfield'
        }, {
            text: AOCLit.apoType,
            dataIndex: 'apoType',
            width: 55,
            editor: {
                xtype: 'combo',
                displayField: 'variableFieldName',
                valueField: 'variableFieldName',
                editable:false,
                queryMode :'local',
                store: Ext.data.StoreManager.lookup('APOTypeId') == null ? AOC.util.Helper.getVariableComboStore('APOType') : Ext.data.StoreManager.lookup('APOTypeId'),
        		listeners:{
					focus:'onComboFocus',
					afterrender:function(combo){
						var store = combo.store,
							obj = {variableFieldName:'None'};
						store.insert(0,new Ext.data.Record(obj));
					},
					select:function(combo){
						var value = combo.getValue();
						if(value == 'None'){
							combo.setValue('');
						}
					}
			    }
            },
            renderer:'comboColumnRenderer'
        }, {
            text: AOCLit.sentToOracleDate,
            dataIndex: 'sentToOracleDate',
            width: 100,
            hidden:true,
            editor: 'textfield'
        },
        {
            text: AOCLit.comment,
            dataIndex: 'comment',
            width: 100,
            editor: 'textfield'
        },
        {
			text: 'Production Line',
			dataIndex: 'productionLine',
			width: 100,
			editor: 'textfield'
		},
		{
			text: AOCLit.targetSystem,
			dataIndex: 'targetSystemName',
			width: 100
		}
		];
    },
    dockedItems: [ 
{
        xtype: 'toolbar',
        dock: 'bottom', 
		height: 50,
		style: 'background-color: #FBFBFB;',
	    items : 
	    	['->',
	    	 {
	              xtype:'button',
				  text:AOCLit.undoChangesText,
				  handler:'cancelChanges',
				 // width:65,
				  ui:'grey-plain'
	         },
			 {
	              xtype:'button',
				  text:'Save',
				  handler:'saveOrderLine',
				  margin:'0 10 10 0',
				 // width:65,
				  ui:'blue'
	         }
			 ]
}],
onCellClickToView:function( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
	var grid=obj;
	 if(e.target.className=='EnableUpdateMoq'){
		 var Id=record.get('id');
		 var runTime = AOC.config.Runtime;
		 var MoqDiffQty=record.get('moqDiffQty');
		 var roundQty=record.get('roundQty');
		 var customerOrderedQty=record.get('customerOrderedQty');
		 customerOrderedQty=parseInt(MoqDiffQty,10)+parseInt(roundQty,10)+parseInt(customerOrderedQty);
		 var value={"customerOrderedQty":customerOrderedQty,"id":Id};
	     var insertBillAddress=false,insertShipAddress=false;
		 var obj='{"insertBillAddress":'+insertBillAddress+',"insertShipAddress":'+insertShipAddress+',"data":'+Ext.encode(Ext.encode(value))+',"updateAll":false,"orderQueueId":"'+runTime.getOrderQueueId()+'"}';
			   Ext.MessageBox.confirm('Confirm Action', AOCLit.updateCustQtyMsg, function(response) {
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
							grid.store.load();
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
