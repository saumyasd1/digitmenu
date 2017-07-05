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
    autoHeight: true,
    frame:true,
    nestedGridRefrence:'listOrderlineDetails',
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
    dockedItems:[
        {
        	xtype:'toolbar',
        	dock:'top',
        	items:[
				{
					xtype: 'form',
					reference:'form',
					layout: 'hbox',
					defaults:{
						labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
						labelSeparator:''
					},
					items: [
						{
							xtype: 'radiogroup',
							reference: 'radioGroup',
							flex:1,
							layout:'hbox',
							items: [
								{
									boxLabel: 'Order Line Update',
									name: 'rb',
									inputValue: '1',
									checked: true,
									width:150
								}, 
								{
									boxLabel: 'Variable Order Update',
									name: 'rb',
									inputValue: '2',
									width:150
								}
							],
							listeners: {
								change: 'radioButtonClick'
							}
						},
						{
							xtype: 'combo',
							hidden: true,
							editable:false,
							hideLabel:true,
							margin:'0 0 0 20',
							displayField: 'variableFieldName',
							valueField: 'variableFieldName',
							reference: 'variableFieldCombo',
							width:180
						}, 
						{
							xtype: 'button',
							text: AOCLit.bulkUpdateButtonText,
							margin:'0 0 0 10',
							cls:'blue-btn',
							reference:'bulkUpdateButton',
							handler: 'getUpdateScreen'
						}
					]
				}
        	]
        }
    ],
    store:Ext.create('AOC.store.OrderLineStore', {storeId:'OrderLineStoreId'}),
    columns: [
		{
			  xtype: 'rownumberer',
			  text:'#',
			  width:35,
			  align:'center',
			  menuDisabled:true,
			  sortable:false,
			  resizable:false,
			  locked:true
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
		},
		{
			text: AOCLit.Status,
			dataIndex: 'status',
			align:'left',
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
			text: AOCLit.CSR+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>Oracle: CSR</br>Phx: Dept No</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'csr',
			align:'left',
			width: 160,
			menuDisabled:true,
            sortable:false,
            resizable:false,
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
			text: AOCLit.atoMandatory+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>Mandatory variable field checking</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'mandatoryVariableDataFieldFlag',
			width: 100,
			align:'center',
			menuDisabled:true,
            sortable:false,
            resizable:false,
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
			text: AOCLit.bulkSample+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>Sample item bulk order fail - cross</br>Others - tick</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'bulkSampleValidationFlag',
			width: 100,
			align:'center',
			menuDisabled:true,
            sortable:false,
            resizable:false,
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
			align:'center',
			width: 100,
			menuDisabled:true,
            sortable:false,
            resizable:false,
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
			width: 100,
			align:'center',
			menuDisabled:true,
            sortable:false,
            resizable:false,
			renderer:function(value, metadata,rec){
				var duplicatePOFlag=rec.data.duplicatePOFlag;
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ duplicatePOFlag +'"';
				
				return Helper.getIconClass(checkvalue);
			}
		}, 
		{
			text: AOCLit.sizePage+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>Size logic validation per RBO</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'htlsizePageValidationFlag',
			width: 100,
			align:'center',
			menuDisabled:true,
            sortable:false,
            resizable:false,
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
			align:'center',
			menuDisabled:true,
            sortable:false,
            resizable:false,
			width: 100,
			renderer:function(value, metadata,rec){
				var moqValidationFlag=rec.data.moqvalidationFlag;
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ moqValidationFlag +'"';
				
				return Helper.getIconClass(checkvalue);
			}
		},
		
		/*New Field-2*/
		{
			text: AOCLit.coo+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>COO logic validation</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'cooTranslationFlag',
			width: 100,
			align:'center',
			menuDisabled:true,
            sortable:false,
            resizable:false,
			renderer:function(value, metadata,rec){
				var cooTranslationFlag= rec.data.cooTranslationFlag;
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ cooTranslationFlag +'"';
				
				return Helper.getIconClass(checkvalue);
			}
		},
		/*New Field-3*/    
		{
			text: AOCLit.febricContent+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>Sum of the Fabric Content = Multiple of 100%</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'febricPercentageFlag',
			width: 100,
			align:'center',
			menuDisabled:true,
            sortable:false,
            resizable:false,
			renderer:function(value, metadata,rec){
				var febricPercentageFlag= rec.data.febricPercentageFlag;
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ febricPercentageFlag +'"';
				
				return Helper.getIconClass(checkvalue);
			}
		},
		/*New Field-4*/    
		{
			text: AOCLit.reviseOrder+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>alert warning message if it is revise order</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'reviseOrderFlag',
			width: 100,
			align:'center',
			menuDisabled:true,
            sortable:false,
            resizable:false,
			renderer:function(value, metadata,rec){
				var reviseOrderFlag= rec.data.reviseOrderFlag;
				var checkvalue = value ? value.trim()  :'';
				metadata.tdAttr = 'data-qtip="'+ reviseOrderFlag +'"';
				
				return Helper.getIconClass(checkvalue);
			}
		},
		{
			text: AOCLit.targetSystem,
			dataIndex: 'targetSystemName',
			align:'left',
			menuDisabled:true,
            sortable:false,
            resizable:false,
			width: 100
		},
		{
			text: AOCLit.divisionforInterfaceERPORG+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>PY/NS - PYT/PYL/POHK/ADNS/ADNL</br>SZ - SZ/PXSH</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'divisionForInterfaceERPORG',
			align:'left',
			menuDisabled:true,
            sortable:false,
            resizable:false,
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
			text: AOCLit.orderType,
			dataIndex: 'orderType',
			align:'left',
			menuDisabled:true,
            sortable:false,
            resizable:false,
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
			text: AOCLit.soldToRbo+'<font color=red>*</font> '+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>Oracle: Customer Number</br>Vips: Store Group</br>Phx: BO CODE</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'soldToRBONumber',
			align:'left',
			width: 100,
			editor: 'textfield',
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		},
		{
			text: AOCLit.custName,
			dataIndex: 'partnerCustomerName',
			align:'left',
			width: 130,
			editor: 'textfield'
		}, 
		{
			text: AOCLit.poNumber+'<font color=red>*</font>',
			dataIndex: 'poNumber',
			align:'left',
			width: 120
		},
		{
			text: AOCLit.averyItem+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>GLID</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'averyItemNumber',
			align:'left',
			width: 120,
			renderer : function(value, metadata,record) {
                return Helper.onAveryItemNumberColumnRenderer(value, metadata, record);
            }
		}, 
		{
			text: AOCLit.averyProduction,
			dataIndex: 'averyProductLineType',
			align:'left',
			width: 120,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		},
		{
			text: AOCLit.averyATO+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>Y - SBS</br>N - MSS / FGS</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'averyATO',
			align:'left',
			width: 93,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		}, 
		{
			text: AOCLit.averyRegion+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>Adidas Region</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'averyRegion',
			align:'left',
			width: 120,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		},
		{
			text: AOCLit.additionalLabel,
			dataIndex: 'additionalLabelInternalItem',
			align:'left',
			width: 150,
			editor: 'textfield'
		}, 
		{
			text: AOCLit.custItemNo,
			dataIndex: 'customerItemNumber',
			align:'left',
			width: 100
			
		},
		{
			text: AOCLit.customerColorCode,
			dataIndex: 'customerColorCode',
			align:'left',
			width: 120
		}, 
		{
			text: AOCLit.customerColorDescription,
			dataIndex: 'customerColorDescription',
			align:'left',
			width: 120
		},
		{
			text: AOCLit.customerSize,
			dataIndex: 'customerSize',
			align:'left',
			width: 120,
			editor: 'textfield',
			renderer:function(value, metadata,rec){
				return Helper.onPageSizeColumnRenderer(value, metadata,rec);
			}
		},
		{
			text: AOCLit.itemDescription+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>Size Chart</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'pageSize',
			align:'left',
			width: 120,
			renderer:function(value, metadata,rec){
				return Helper.onPageSizeColumnRenderer(value, metadata,rec);
			}
		}, 
		{
			text: AOCLit.styleNo,
			dataIndex: 'styleNo',
			align:'left',
			width: 120,
			editor: 'textfield'
		}, 
		{
			text: AOCLit.custSeason,
			dataIndex: 'customerSeason',
			align:'left',
			width: 100,
			editor: 'textfield'
		},
		{
			text: AOCLit.Bulk+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>Bulk order/Sample order</font>" class="fa fa-info-circle"></i>',
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
			text: AOCLit.bulkItem+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>Bulk item/Sample item</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'averyBulk',
			width: 100,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
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
			text: AOCLit.averyMOQ+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>Legacy MOQ on SKU level</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'averyMOQ',
			width: 100,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		}, 
		{
			text: AOCLit.averyRoundupQty,
			dataIndex: 'averyRoundupQty',
			width: 100,
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			},
			type:'address',
			hidden:true
		},
		{
			text: AOCLit.MOQDiffQty,
			dataIndex: 'moqdiffQty',
			width: 100,
			align:'center',
			renderer:function(value, metadata, record){
				return Helper.qtyColumnRenderer(value, metadata, record);
			},
			type:'address',
			hidden:true
		},
		{
			text: AOCLit.roundQty,
			dataIndex: 'roundQty',
			width: 100,
			align:'center',
			renderer:function(value, metadata, record){
				return Helper.qtyColumnRenderer(value, metadata, record);
			},
			type:'address',
			hidden:true
		},
		{
			text: AOCLit.updateQty,
			dataIndex: 'updateMOQ',
			align:'left',
			width: 100,
			align:'center',
			renderer:function(value, metadata,rec){
            	return Helper.onUpdateMoqRenderer(value, metadata,rec);
            },
            type:'address',
			hidden:true
		},
		{
			text: AOCLit.waiveMOQ,
			dataIndex: 'waiveMOQ',
			align:'left',
			width: 100,
			editor:{
				xtype:'combo',
				editable:false,
				store:[[true,'Y'],[false,'N']]
			},
			renderer:function(value, metadata, record){
				return Helper.onWaveMoqColumnRenderer(value, metadata, record);
			},
			type:'address',
			hidden:true
		},
		{
			text: AOCLit.orderedDate+'<font color=red>*</font>',
			dataIndex: 'orderedDate',
			width: 120,
			xtype:'datecolumn',
			editor: 'datefield',
			renderer : function(value, meta,record) {
            	return Helper.onOrdererDateRenderer(value, meta,record);
        	}
		}, 
		{
			text: AOCLit.requestedDeliveryDate,
			dataIndex: 'requestedDeliveryDate',
			width: 120,
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
			width: 120,
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
			text: AOCLit.skuQtyDifference ,
			dataIndex: 'skuQtyDifference',
			width: 110
		},
		{
			text: AOCLit.apoType,
			dataIndex: 'apoType',
			align:'left',
			width: 100,
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
			text: AOCLit.billToCustomer,
			dataIndex: 'billToCustomer',
			align:'left',
			width: 170,
			editor: 'textfield'
		}, 
		{
			text: AOCLit.billtoSite+'<font color=red>*</font>',
			dataIndex: 'oracleBillToSiteNumber',
			align:'left',
			width: 100,
			editor: 'textfield',
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		}, 
		{
			text: AOCLit.billToContact,
			xtype:'gridcolumn',
			dataIndex: 'billToContact',
			align:'left',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToAddress1,
			dataIndex: 'billToAddress1',
			align:'left',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToAddress2,
			dataIndex: 'billToAddress2',
			align:'left',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToAddress3,
			dataIndex: 'billToAddress3',
			align:'left',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToCity,
			dataIndex: 'billToCity',
			align:'left',
			width: 120,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToCountry,
			dataIndex: 'billToCountry',
			width: 120,
			align:'left',
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToState,
			dataIndex: 'billToState',
			align:'left',
			width: 120,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToZip,
			dataIndex: 'billToZip',
			width: 100,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToEmail,
			dataIndex: 'billToEmail',
			align:'left',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToFax,
			dataIndex: 'billToFax',
			align:'left',
			width: 130,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.billToTelephone,
			dataIndex: 'billToTelephone',
			align:'left',
			width: 130,
			editor: {
				xtype:'textfield'
			},
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToCustomer,
			dataIndex: 'shipToCustomer',
			align:'left',
			width: 170,
			editor: 'textfield'
		}, 
		{
			text: AOCLit.shipToSite+'<font color=red>*</font>',
			dataIndex: 'oracleShipToSiteNumber',
			align:'left',
			width: 120,
			editor: 'textfield',
			renderer:function(value, metadata, record){
				return Helper.onAtoColumnRenderer(value, metadata, record);
			}
		}, 
		{
			text: AOCLit.shipContact,
			dataIndex: 'shipToContact',
			align:'left',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToAddress1,
			dataIndex: 'shipToAddress1',
			align:'left',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToAddress2,
			dataIndex: 'shipToAddress2',
			align:'left',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToAddress3,
			dataIndex: 'shipToAddress3',
			align:'left',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToCity,
			dataIndex: 'shipToCity',
			align:'left',
			width: 120,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToCountry,
			dataIndex: 'shipToCountry',
			align:'left',
			width: 120,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToState,
			dataIndex: 'shipToState',
			align:'left',
			width: 120,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToZip,
			dataIndex: 'shipToZip',
			width: 100,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToEmail,
			dataIndex: 'shipToEmail',
			align:'left',
			width: 170,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToFax,
			dataIndex: 'shipToFax',
			align:'left',
			width: 130,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.shipToTelephone,
			dataIndex: 'shipToTelephone',
			align:'left',
			width: 130,
			editor: 'textfield',
			type:'address',
			hidden:true
		},
		
		{
			text: AOCLit.specialInstruction+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>For Adidas - Ningbo reference only</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'specialInstruction',
			align:'left',
			width: 170,
			editor: 'textfield'
		},
		{
			text: AOCLit.manufacturingNotes+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>Oracle: Manufacturing Notes</br>VIPS to Oracle/SPW: Vendor Note</br>VIPS to PHX: NA</br>Use ^ as an indicator to return a new line. e.g TAIWAN^1 TO UP</br>it will be imported as</br>TAIWAN</br>1 TO UP</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'manufacturingNotes',
			align:'left',
			width: 170,
			editor: 'textfield'
		}, 
		{
			text: AOCLit.invoiceLineInstruction+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>Oracle: Invoice Line Instruction</br>VIPS to Oracle/SPW: Order Line instruction</br>VIPS to PHX: NA</br>Use ^ as an indicator to return a new line. e.g TAIWAN^1 TO UP</br>it will be imported as</br>TAIWAN</br>1 TO UP</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'invoicelineInstruction',
			align:'left',
			width: 120,
			editor: 'textfield'
		}, 
		{
			text: AOCLit.packagingInstruction+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>Oracle: Packing Instruction</br>VIPS to Oracle/SPW: Vendor Notes</br>VIPS to PHX: Printer Notes</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'packingInstruction',
			align:'left',
			width: 180,
			editor: 'textfield'
		}, 
		{
			text: AOCLit.shippingInstructions+ ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>Oracle: Shipping Instruction</br>VIPS to Oracle/SPW: Shipping instruction</br>VIPS to PHX: Special Instruction</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'shippingInstructions',
			align:'left',
			width: 180,
			editor: 'textfield'
		}, 
		{
			text: AOCLit.shippingMethod,
			dataIndex: 'shippingMethod',
			align:'left',
			width: 170,
			editor: {
				xtype: 'combo',
				displayField: 'variableFieldName',
				valueField: 'variableFieldName',
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
			text: AOCLit.freightTerm,
			dataIndex: 'freightTerms',
			align:'left',
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
			text: AOCLit.shipMark + ' <i style="color:#2c3e50;" data-qtip="<font color= #3892d3>Use ^ as an indicator to return a new line. e.g TAIWAN^1 TO UP</br>it will be imported as</br>TAIWAN</br>1 TO UP</font>" class="fa fa-info-circle"></i>',
			dataIndex: 'shipMark',
			width: 150,
			editor: 'textfield',
			type:'address',
			hidden:true
		},
		{
			text: AOCLit.variableDataBreakdown,
			dataIndex: 'variableDataBreakdown',
			align:'left',
			width: 110,
			editor: 'textfield',
			type:'address',
			hidden:true
		},
		{
			text: AOCLit.retailerPO_CustomerJob,
			dataIndex: 'retailerPO_CustomerJob',
			align:'left',
			width: 120,
			editor: 'textfield',
			type:'address',
			hidden:true
		},
		{
			text: AOCLit.modelSerialNumber,
			dataIndex: 'modelSerialNumber',
			align:'left',
			width: 180,
			editor: 'textfield',
			type:'address',
			hidden:true
		},
		{
			text: AOCLit.productionLine,
			dataIndex: 'productionLine',
			align:'left',
			width: 100,
			editor: 'textfield',
			type:'address',
			hidden:true
		},
		{
			text: AOCLit.agreement,
			dataIndex: 'agreement',
			align:'left',
			width: 120,
			editor: 'textfield',
			type:'address',
			hidden:true
		},
		{
			text: AOCLit.contractNo,
			dataIndex: 'contractNumber',
			align:'left',
			width: 130,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.artworkHold,
			dataIndex: 'artWorkhold',
			align:'left',
			width: 100,
			editor:{
				xtype:'combo',
				editable:false,
				store:[['Y','Y'],['N','N']]
			}
		},
		{
			text: AOCLit.artworkWorkAttachment,//'Artwork Work Attachment',
			dataIndex: 'artworkAttachment',
			align:'left',
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
			text: AOCLit.productionHold,
			dataIndex: 'productionHold',
			align:'left',
			width: 100,
			editor:{
				xtype:'combo',
				editable:false,
				store:[[true,'Y'],[false,'N']]
			},
			renderer:function(value, metadata, record){
				return Helper.onWaveMoqColumnRenderer(value, metadata, record);
			},
			type:'address',
			hidden:true
		},
		{
			text: AOCLit.shippingHold,
			dataIndex: 'shippingHold',
			align:'left',
			width: 100,
			editor:{
				xtype:'combo',
				editable:false,
				store:[[true,'Y'],[false,'N']]
			},
			renderer:function(value, metadata, record){
				return Helper.onWaveMoqColumnRenderer(value, metadata, record);
			},
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.splitShipset,
			dataIndex: 'splitShipset',
			align:'left',
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
			renderer:'comboColumnRenderer',
			type:'address',
			hidden:true
		},
		{
			text: AOCLit.bankCharge,
			dataIndex: 'bankCharge',
			align:'left',
			width: 100,
			editor: {
				xtype: 'numberfield',
				maxLength: 8,
				minValue: 0
			},
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.freightCharge,
			dataIndex: 'freightCharge',
			align:'left',
			width: 100,
			editor: {
				xtype: 'numberfield',
				maxLength: 8,
				minValue: 0
			},
			type:'address',
			hidden:true
		},
		{
			text: AOCLit.endCust,
			dataIndex: 'endCustomer',
			align:'left',
			width: 120,
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
			renderer:'comboColumnRenderer',
			type:'address',
			hidden:true
		},
		{
			text: AOCLit.orderBy,
			dataIndex: 'orderBy',
			align:'left',
			width: 120,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.comment,
			dataIndex: 'comment',
			align:'left',
			width: 150,
			editor: 'textfield',
			type:'address',
			hidden:true,
			renderer: function (value, metadata, rec) {
	               var comment = Ext.String.htmlEncode(rec.data.comment);
	            	if(comment){
	            		metadata.style = AOCLit.cellColor;
	            	}
	            	return value;
	            }
		},
		{
			text: AOCLit.vendorName,
			dataIndex: 'partnerVendorName',
			align:'left',
			width: 120,
			editor: 'textfield',
			type:'address',
			hidden:true
		}, 
		{
			text: AOCLit.sentToOracleDate,
			dataIndex: 'sentToOracleDate',
			align:'left',
			width: 120,
			hidden:true,
			editor: 'textfield',
			type:'address',
			hidden:true
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
    		            
    		            var childNodes = targetRowbody.childNodes;
    		            var len =childNodes.length;
    		            
    		            for(var i =0; i<len;i++){
    		            	targetRowbody.removeChild(childNodes[i]);
    		            }
    		            
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
				  menuDisabled:true,
				  sortable:false,
				  resizable:false,
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
						else if(isContainsFibre.includes('fibre') && (fiberPercent>0 && Ext.isEmpty(variableDataValue) ) ){
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
						if(isContainsFibre.includes('fibre') && (!Ext.isEmpty(variableDataValue) && Ext.isEmpty(fiberPercent))){
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
			plugins: me.getInnerGridPlugin(),
			autoHeight: true,
			frame: true,
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
						 var fiberPercent = currentRecord.get('fiberPercent');
						var isContainsFibre = currentRecord.get('level').toLowerCase();
						if(isContainsFibre=='fibre'){
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
		var rowEditor={
			ptype:'rowediting',
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
		};
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