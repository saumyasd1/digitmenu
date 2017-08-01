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
        return [
            {
            	xtype: 'rownumberer',
                width: 46,
                tdCls: me.rowNumbererTdCls,
                cls: me.rowNumbererHeaderCls,
                locked: true,
                text:'#',
                align:'center'
            },{
                header: Settings.config.defaultIcons.commentColumnIcon,
                width: 40,
                dataIndex: 'Comments',
                tooltip: 'Comments',
                align:'center',
                menuDisabled:true,
                sortable:false,
                resizable:false,
                renderer: function (value, metadata, rec) {
                   var comment = Ext.String.htmlEncode(rec.data.comment);
                	if(comment){
                        metadata.tdAttr = 'data-qtip="<font color=blue>' + comment + '</font>"';
                        return Settings.config.defaultIcons.commentColumnIcon;
                	}else{
                		return '';
                	}
                }
    		},{
	            text: AOCLit.Status,
	            dataIndex: 'status',
                align:'left',
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
				        	Helper.onStatusComboAfterRender(combo);
				        },
				        focus:function(combo){
				        	Helper.onStatusComboFocus(combo);
				        },
				        select:'onSelectStatusBulk'
			       }		
	            },
				renderer:function(v, metadata, rec){
					return Helper.getSatus(rec);
				}
            },{
                text: AOCLit.roundQty,
                dataIndex: 'roundQty',
                align:'left',
                width: 50,
                renderer:function(value, metadata, record){
    				return Helper.qtyColumnRenderer(value, metadata, record);
    			}
            },
            {
                text: AOCLit.MOQDiffQty,
                dataIndex: 'moqdiffQty',
                align:'left',
                width: 55,
                renderer:function(value, metadata, record){
    				return Helper.qtyColumnRenderer(value, metadata, record);
    			}
            },
            {
                text: AOCLit.custOrderedQty+'<font color=red>*</font>',
                dataIndex: 'customerOrderedQty',
                align:'left',
                width: 106,
                editor: 'numberfield',
                renderer : function(value, metadata, record) {
    				return Helper.onCustomerOrderQty(value, metadata, record);
    			} 
            },
            {
                text: AOCLit.updateQty,
                dataIndex: 'updateMOQ',
                align:'left',
                width: 50,
                renderer:function(value, metadata,rec){
                	return Helper.onUpdateMoqRenderer(value, metadata,rec);
                }
            },
            {
                text: AOCLit.waiveMOQ,
                dataIndex: 'waiveMOQ',
                align:'left',
                width: 59,
                editor:{
                	xtype:'combo',
                	editable:false,
                	store:[[true,'Y'],[false,'N']]
                },
                renderer:function(value, metadata, record){
    				return Helper.onWaveMoqColumnRenderer(value, metadata, record);
    			}
            }, {
	            text: AOCLit.Bulk,
	            dataIndex: 'bulk',
	            align:'left',
	            width: 50,
	            editor:{
	            	xtype:'combo',
	            	editable:false,
	            	store:[['Y','Y'],['N','N']]
	            },
	            renderer:function(value, metadata,rec){
					return Helper.onBulkOrderColumnRenderer(value, metadata,rec);
				}
	        }, {
				text: AOCLit.bulkItem,
				dataIndex: 'averyBulk',
		        align:'left',
				width: 93,
				renderer:function(value, metadata, record){
					return Helper.onAtoColumnRenderer(value, metadata, record);
				}
			}, 
			{
				text: AOCLit.averyMOQ,
				dataIndex: 'averyMOQ',
		        align:'left',
				width: 93,
				renderer:function(value, metadata, record){
					return Helper.onAtoColumnRenderer(value, metadata, record);
				}
			}, {
    			text: AOCLit.CSR+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>Oracle: CSR</br>Phx: Dept No</font>" class="fa fa-info-circle"></i>',
    			dataIndex: 'csr',
    			align:'left',
    			width: 160,
    			menuDisabled:true,
                sortable:false,
    			editor:{
    				xtype:'combo',
    				displayField:'name',
    				valueField:'name',
    				queryMode:'local',
    				store:Ext.data.StoreManager.lookup('configCSRStoreId') != null ? Ext.data.StoreManager.lookup('configCSRStoreId') : Ext.create('AOC.store.ConfigurationCSRStore'),
    				listeners:{
    					focus:'onVariableComboFocus',
    					select:'onVariableComboBlur',
    					blur:'onVariableComboBlur'
    			    }
    			},
    			renderer:'variableComboColumnRenderer'
    		}, {
    			text: AOCLit.targetSystem,
    			dataIndex: 'targetSystemName',
    			align:'left',
    			menuDisabled:true,
                sortable:false,
    			width: 140
    		},{
                text: AOCLit.divisionforInterfaceERPORG,
                dataIndex: 'divisionForInterfaceERPORG',
                width: 120,
                align:'left',
                editor:{
                   xtype:'combo',
                   displayField:'name',
   				   valueField:'id',
       			   editable:false,
       			   store:AOCRuntime.getStoreERPORG(),
       			   queryMode:'local',
                   listeners:{
                	   select:'onERPORGSelect',
                	   expand:'onDivisionEPORGExpand'
                   }
                },
                renderer:'divisionForInterfaceERPORGColumnRenderer'
            }, {
    			text: AOCLit.orderType,
    			dataIndex: 'orderType',
    			align:'left',
    			menuDisabled:true,
                sortable:false,
    			width: 115,
    			editor: {
    				xtype: 'combo',
    				displayField: 'name',
    				valueField: 'name',
    				queryMode :'local',
    				matchFieldWidth:false,
    				listConfig:{
    					width:180
    				},
    				reference:'OrdertypeCombo',
    				variableName:'OrderType',
    				store:Ext.data.StoreManager.lookup('OrderTypeId1') != null ? Ext.data.StoreManager.lookup('OrderTypeId1') : Helper.getAllVariableComboStore('OrderType', true),
    				listeners:{
    					focus:'onVariableComboFocus',
    					select:'onVariableComboBlur',
    					blur:'onVariableComboBlur'
    			    }
    			},
    			renderer:'variableComboColumnRenderer'
    		}, {
                text: AOCLit.soldToRbo+'<font color=red>*</font>',
                dataIndex: 'soldToRBONumber',
                align:'left',
                width: 100,
                editor: 'textfield',
                renderer:function(value, metadata, record){
    				return Helper.onAtoColumnRenderer(value, metadata, record);
    			}
            }, {
                text: AOCLit.custName,
                dataIndex: 'partnerCustomerName',
                align:'left',
                width: 126,
                editor: 'textfield'
            }, {
	            text: AOCLit.PONumber+'<font color=red>*</font>',
	            dataIndex: 'poNumber',
	            align:'left',
	            width: 120
	        }, {
	            text: AOCLit.averyItem,
	            dataIndex: 'averyItemNumber',
	            align:'left',
	            width: 88,
	            renderer : function(value, meta,record) {
	                return Helper.onAveryItemNumberColumnRenderer(value, meta,record);
	            }
	        },{
				text: AOCLit.averyProduction,
				dataIndex: 'averyProductLineType',
	            align:'left',
				width: 93,
				renderer:function(value, metadata, record){
					return Helper.onAtoColumnRenderer(value, metadata, record);
				}
			}, {
				text: AOCLit.averyATO,
				dataIndex: 'averyATO',
	            align:'left',
				width: 93,
				renderer:function(value, metadata, record){
					return Helper.onAtoColumnRenderer(value, metadata, record);
				}
			}, {
				text: AOCLit.averyRegion,
				dataIndex: 'averyRegion',
	            align:'left',
				width: 93,
				renderer:function(value, metadata, record){
					return Helper.onAtoColumnRenderer(value, metadata, record);
				}
			}, {
				text: AOCLit.additionalLabel,
				dataIndex: 'additionalLabelInternalItem',
				width: 150,
	            align:'left',
				editor: 'textfield'
			}, {
	            text: AOCLit.custItemNo,
	            dataIndex: 'customerItemNumber',
	            align:'left',
	            width: 88
	        }, {
	            text: AOCLit.customerColorCode,
	            dataIndex: 'customerColorCode',
	            align:'left',
	            width: 102
	        }, {
	            text: AOCLit.customerColorDescription,
	            dataIndex: 'customerColorDescription',
	            align:'left',
	            width: 102
	        }, {
	            text:AOCLit.customerSize,
	            dataIndex: 'customerSize',
	            align:'left',
	            width: 72,
	            editor: 'textfield',
	            renderer:function(value, metadata,rec){
	            	return Helper.onPageSizeColumnRenderer(value, metadata,rec);
				}
	        }, {
	            text: AOCLit.itemDescription,
	            dataIndex: 'pageSize',
	            width: 102,
	            align:'left',
	            editor: 'textfield',
	            renderer:function(value, metadata,rec){
	            	return Helper.onPageSizeColumnRenderer(value, metadata,rec);
				}
	        }, {
	            text: AOCLit.styleNo,
	            dataIndex: 'styleNo',
	            align:'left',
	            width: 111,
	            editor: 'textfield'
	        }, {
	            text: AOCLit.custSeason,
	            dataIndex: 'customerSeason',
	            align:'left',
	            width: 93,
	            editor: 'textfield'
	        }, 
		{
			text: AOCLit.averyRoundupQty,
			dataIndex: 'averyRoundupQty',
            align:'left',
			width: 93,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		},
       {
            text: AOCLit.vendorName,
            dataIndex: 'partnerVendorName',
            align:'left',
            width: 111,
            editor: 'textfield'
        },  {
            text: AOCLit.shipToCustomer,
            dataIndex: 'shipToCustomer',
            align:'left',
            width: 170,
            editor: 'textfield'
        },{
            text: AOCLit.shipContact,
            dataIndex: 'shipToContact',
            align:'left',
            width: 170,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToAddress1,
            dataIndex: 'shipToAddress1',
            align:'left',
            width: 170,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToAddress2,
            dataIndex: 'shipToAddress2',
            align:'left',
            width: 170,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToAddress3,
            dataIndex: 'shipToAddress3',
            align:'left',
            width: 170,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToCity,
            dataIndex: 'shipToCity',
            align:'left',
            width: 112,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToCountry,
            dataIndex: 'shipToCountry',
            width: 112,
            align:'left',
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToState,
            dataIndex: 'shipToState',
            align:'left',
            width: 112,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToZip,
            dataIndex: 'shipToZip',
            align:'left',
            width: 85,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToEmail,
            dataIndex: 'shipToEmail',
            align:'left',
            width: 170,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToFax,
            dataIndex: 'shipToFax',
            align:'left',
            width: 130,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        }, {
            text: AOCLit.shipToTelephone,
            dataIndex: 'shipToTelephone',
            align:'left',
            width: 130,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleShiptoSiteNumber');
            }
        },{
        	xtype:'gridcolumn',
            text: 'Bill to Site #<font color=red>*</font>',
            dataIndex: 'oracleBillToSiteNumber',
            align:'left',
            width: 100,
            editor:'textfield',
            renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
        }, {
            text: AOCLit.billToCustomer,
            dataIndex: 'billToCustomer',
            align:'left',
            width: 170,
            editor: 'textfield'
        },{
            text: AOCLit.billContact,
            dataIndex: 'billToContact',
            align:'left',
            width: 170,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.billToAddress1,
            dataIndex: 'billToAddress1',
            align:'left',
            width: 170,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.billToAddress2,
            dataIndex: 'billToAddress2',
            align:'left',
            width: 170,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.billToAddress3,
            dataIndex: 'billToAddress3',
            align:'left',
            width: 170,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.billToCity,
            dataIndex: 'billToCity',
            align:'left',
            width: 112,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text:AOCLit.billToCountry,
            dataIndex: 'billToCountry',
            align:'left',
            width: 112,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.billToState,
            dataIndex: 'billToState',
            align:'left',
            width: 112,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.billToZip,
            dataIndex: 'billToZip',
            align:'left',
            width: 85,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.billToEmail,
            dataIndex: 'billToEmail',
            align:'left',
            width: 170,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.billToFax,
            dataIndex: 'billToFax',
            align:'left',
            width: 130,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.billToTelephone,
            dataIndex: 'billToTelephone',
            align:'left',
            width: 130,
            getEditor: function(record) {
            	return Helper.getOrderLineEditor(record,'oracleBilltoSiteNumber');
            }
        }, {
            text: AOCLit.specialInstruction,
            dataIndex: 'specialInstruction',
            align:'left',
            width: 170,
            editor: 'textfield'
        }, {
            text: AOCLit.orderReceivedDate,
            dataIndex: 'orderReceivedDate',
            align:'left',
            width: 93,
            hidden:true
        }, {
            text: AOCLit.shipToSite+'<font color=red>*</font>',
            dataIndex: 'oracleShipToSiteNumber',
            align:'left',
            width: 100,
            editor:'textfield',
            renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
        }, {
			text: AOCLit.shippingMethod,
			dataIndex: 'shippingMethod',
			align:'left',
			width: 170,
			editor: {
				xtype: 'combo',
				displayField: 'name',
				valueField: 'name',
				queryMode :'local',
				reference:'shippingMethodCombo',
				variableName:'ShippingMethod',
				matchFieldWidth:false,
				listConfig:{
					width:250
				},
				store:Ext.data.StoreManager.lookup('ShippingMethodId1') != null ? Ext.data.StoreManager.lookup('ShippingMethodId1') : Helper.getAllVariableComboStore('ShippingMethod', true),
				listeners:{
					focus:'onVariableComboFocus',
					select:'onVariableComboBlur',
					blur:'onVariableComboBlur'
			    }
			},
			renderer:'variableComboColumnRenderer'
		}, {
            text: AOCLit.retailerPO_CustomerJob,
            dataIndex: 'retailerPO_CustomerJob',
            width: 115,
            align:'left',
            editor: 'textfield'
        },   {
            text: AOCLit.contractNo,
            dataIndex: 'contractNumber',
            align:'left',
            width: 130,
            editor: 'textfield'
        }, {
            text: AOCLit.orderedDate+'<font color=red>*</font>',
            dataIndex: 'orderedDate',
            align:'left',
            width: 90,
            xtype:'datecolumn',
            format:AOCLit.dateFormat,
            editor: 'datefield',
            renderer : function(value, meta,record) {
            	return Helper.onOrdererDateRenderer(value, meta,record);
            }
        }, {
            text:AOCLit.requestedDeliveryDate,
            dataIndex: 'requestedDeliveryDate',
            width: 102,
            format:AOCLit.dateFormat,
            align:'left',
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
        }, {
            text: AOCLit.promiseDate,
            dataIndex: 'promiseDate',
            align:'left',
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
        }, {
			text: AOCLit.freightTerm,
			dataIndex: 'freightTerms',
			align:'left',
			width: 130,
			editor: {
				xtype: 'combo',
				displayField: 'name',
				valueField: 'name',
				queryMode :'local',
				reference:'freightTermscombo',
				variableName:'FreightTerms',
				matchFieldWidth:false,
				listConfig:{
					width:180
				},
				store:Ext.data.StoreManager.lookup('FreightTermsId1') != null ? Ext.data.StoreManager.lookup('FreightTermsId1') : Helper.getAllVariableComboStore('FreightTerms', true),
				listeners:{
					focus:'onVariableComboFocus',
					select:'onVariableComboBlur',
					blur:'onVariableComboBlur'
			    }
			},
			renderer:'variableComboColumnRenderer'
		},{
            text: AOCLit.packingInstruction,
            dataIndex: 'packingInstruction',
            width: 180,
            align:'left',
            editor: 'textfield'
        }, {
            text: AOCLit.shippingInstructions,
            dataIndex: 'shippingInstructions',
            width: 180,
            align:'left',
            editor: 'textfield'
        }, {
            text: AOCLit.invoiceLineInstruction,
            dataIndex: 'invoicelineInstruction',
            width: 119,
            align:'left',
            editor: 'textfield'
        }, {
            text: AOCLit.artworkHold,
            dataIndex: 'artWorkhold',
            width: 84,
            align:'left',
            editor:{
            	xtype:'combo',
            	editable:false,
            	store:[['Y','Y'],['N','N']]
            }
        }, {
            text: AOCLit.artworkWorkAttachment,
            dataIndex: 'artworkAttachment',
            width: 110,
            align:'left',
            editor:{
            	xtype:'combo',
            	editable:false,
            	store:[[true,'Y'],[false,'N']]
            },
            renderer:function(value, metadata, record){
				return Helper.onWaveMoqColumnRenderer(value, metadata, record);
			}
        }, {
            text: AOCLit.variableDataBreakdown,
            dataIndex: 'variableDataBreakdown',
            width: 110,
            align:'left',
            editor: 'textfield'
        }, {
            text: AOCLit.manufacturingNotes,
            dataIndex: 'manufacturingNotes',
            width: 107,
            align:'left',
            editor: 'textfield'
        }, {
            text: AOCLit.orderBy,
            dataIndex: 'orderBy',
            width: 115,
            align:'left',
            editor: 'textfield'
        }, {
			text: AOCLit.endCust,
			dataIndex: 'endCustomer',
			align:'left',
			width: 120,
			editor: {
				xtype: 'combo',
				displayField: 'name',
				valueField: 'name',
				queryMode :'local',
				reference:'EndCustomerCombo',
				variableName:'EndCustomer',
				matchFieldWidth:false,
				listConfig:{
					width:200
				},
				store:Ext.data.StoreManager.lookup('EndCustomerId1') != null ? Ext.data.StoreManager.lookup('EndCustomerId1') : Helper.getAllVariableComboStore('EndCustomer', true),
				listeners:{
					focus:'onVariableComboFocus',
					select:'onVariableComboBlur',
					blur:'onVariableComboBlur'
			    }
			},
			renderer:'variableComboColumnRenderer'
		},{
			text: AOCLit.shipMark,
			dataIndex: 'shipMark',
			width: 150,
            align:'left',
			editor: 'textfield'
		},
		 {
            text: AOCLit.bankCharge,
            dataIndex: 'bankCharge',
            width: 90,
            align:'left',
            editor: {
                xtype: 'numberfield',
                maxLength: 8,
                minValue: 0
            }
        }, {
            text: AOCLit.freightCharge,
            dataIndex: 'freightCharge',
            width: 90,
            align:'left',
            editor: {
                xtype: 'numberfield',
                maxLength: 8,
                minValue: 0
            }
        }, {
            text: AOCLit.shippingHold,
            dataIndex: 'shippingHold',
            width: 83,
            align:'left',
            editor:{
            	xtype:'combo',
            	editable:false,
            	store:[['Y','Y'],['N','N']]
            },
            renderer:function(value, metadata, record){
				return Helper.onWaveMoqColumnRenderer(value, metadata, record);
			}
        }, {
            text: AOCLit.productionHold,
            dataIndex: 'productionHold',
            width: 77,
            align:'left',
            editor:{
            	xtype:'combo',
            	editable:false,
            	store:[['Y','Y'],['N','N']]
            },
            renderer:function(value, metadata, record){
				return Helper.onWaveMoqColumnRenderer(value, metadata, record);
			}
        }, {
			text: AOCLit.splitShipset,
			dataIndex: 'splitShipset',
			align:'left',
			width: 120,
			editor: {
				xtype: 'combo',
				displayField: 'name',
				valueField: 'name',
				queryMode :'local',
				reference:'splitShipsetCombo',
				variableName:'SplitShipset',
				store:Ext.data.StoreManager.lookup('SplitShipsetId1') != null ? Ext.data.StoreManager.lookup('SplitShipsetId1') : Helper.getAllVariableComboStore('SplitShipset', true),
				listeners:{
					focus:'onVariableComboFocus',
					select:'onVariableComboBlur',
					blur:'onVariableComboBlur'
			    }
			},
			renderer:'variableComboColumnRenderer'
		},{
            text: AOCLit.agreement,
            dataIndex: 'agreement',
            width: 102,
            align:'left',
            editor: 'textfield'
        }, {
            text: AOCLit.modelSerialNumber,
            dataIndex: 'modelSerialNumber',
            width: 180,
            editor: 'textfield'
        }, {
			text: AOCLit.apoType,
			dataIndex: 'apoType',
			align:'left',
			width: 100,
			editor: {
				xtype: 'combo',
				displayField: 'name',
				valueField: 'name',
				queryMode :'local',
				reference:'APOTypeCombo',
				variableName:'APOType',
				store:Ext.data.StoreManager.lookup('APOTypeId1') != null ? Ext.data.StoreManager.lookup('APOTypeId1') : Helper.getAllVariableComboStore('APOType', true),
				listeners:{
					focus:'onVariableComboFocus',
					select:'onVariableComboBlur',
					blur:'onVariableComboBlur'
			    }
			},
			renderer:'variableComboColumnRenderer'
		}, {
            text: AOCLit.sentToOracleDate,
            dataIndex: 'sentToOracleDate',
            width: 100,
            align:'left',
            hidden:true,
            editor: 'textfield'
        },
        {
            text: AOCLit.comment,
            dataIndex: 'comment',
            width: 100,
            align:'left',
            editor: 'textfield'
        },
        {
			text: AOCLit.productionLine,
			dataIndex: 'productionLine',
			width: 100,
            align:'left',
			editor: 'textfield'
		}];
    },
    buttons: [ 
      {
		  text:AOCLit.undoChangesText,
		  iconCls:'x-fa fa-undo',
		  handler:'cancelChanges'
      },
      {
		  text:'Save',
		  iconCls:'x-fa fa-save',
		  handler:'saveOrderLine'
      }
  ],
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
