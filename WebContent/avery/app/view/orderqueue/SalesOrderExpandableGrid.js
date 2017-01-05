Ext.define('AOC.view.orderqueue.SalesOrderExpandableGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'salesrrderexpandablegrid',
    itemId: 'salesrrderexpandablegrid',
    requires: ['Ext.grid.Panel', 'AOC.view.ux.RowExpanderGrid', 'AOC.util.Helper','Ext.grid.plugin.Clipboard'],
    controller: 'salesorder',
    emptyText: AOCLit.emptyDataMsg,
    autoHeight: true,
    columnLines: true,
    nestedGridRefrence: 'listSalesOrderDetails',
    columnLines: false,
    viewConfig: {
        stripeRows: true
    },
    selModel: {
       type: 'spreadsheet',
       rowNumbererHeaderWidth:0
    },
    columns: [
		{
			text: AOCLit.Status,
			dataIndex: 'status',
			width: 150,
			renderer:function(v){
				return AOC.util.Helper.getSatus(v);
			}
	    },
		{
			text: AOCLit.systemStatus,
			dataIndex: 'system_Status',
			width: 85,
			renderer:function(v, metaData){
				if(v){
					metaData.tdAttr = 'data-qtip="<font color=blue>' + v + '</font>"';
					return v;
				}else 
					return '';
			}
		},
		{
			text: AOCLit.Division,
			dataIndex: 'division',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.orderSource,
			dataIndex: 'orderSource',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.SOLDTORBONumber,
			dataIndex: 'soldToRboNumber',
			editor: 'textfield',
			align:'right'
		}, 
		{
			text: AOCLit.oracleBilltoSiteNumber,
			dataIndex: 'oracleBillToSiteNumber',
			editor: 'textfield',
			align:'right'
		}, 
		{
			text: AOCLit.oracleShiptoSiteNumber,
			dataIndex: 'oracleShipToSiteNumber',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.shippingMethod,
			dataIndex: 'shippingMethod',
			width: 170,
			editor: {
				xtype: 'combo',
				displayField: 'variableFieldName',
				valueField: 'variableFieldName',
				queryMode :'local',
				store: Ext.data.StoreManager.lookup('ShippingMethodId') == null ? AOC.util.Helper.getVariableComboStore('ShippingMethod') : Ext.data.StoreManager.lookup('ShippingMethodId')
			}
		}, 
		{
			text: 'Customer PO #',
			dataIndex: 'customerPoNumber',
			editor: 'textfield'
		}, 
		{
			text: 'Retailer PoCustomer job',
			dataIndex: 'retailerPo_CustomerJob',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.oracleItemNo,
			dataIndex: 'oracleItemNumber',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.custItemNo,
			dataIndex: 'customerItemNumber',
			align:'right',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.itemDesc,
			dataIndex: 'itemDescription',
			editor: 'textfield'
		}, 
		{
			text:AOCLit.orderdedQty,
			dataIndex: 'customerOrderedQty',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.dateOrdered,
			dataIndex: 'dateOrdered',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.custRequestDate,
			dataIndex: 'customerRequestDate',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.promiseDate,
			dataIndex: 'promiseDate',
			align:'right',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.freightTerm,
			dataIndex: 'freightTerms',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.CSR,
			dataIndex: 'csr',
			width: 160,
			editor: {
				xtype: 'combo',
				displayField: 'variableFieldName',
				valueField: 'variableFieldName',
				queryMode :'local',
				store: Ext.data.StoreManager.lookup('CSRId') == null ? AOC.util.Helper.getVariableComboStore('CSR') : Ext.data.StoreManager.lookup('CSRId')
			}
		}, 
		{
			text: AOCLit.packingInstruction,
			dataIndex: 'packingInstruction',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.shippingInstructions,
			dataIndex: 'shippingInstructions',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.invoiceLineInstruction,
			dataIndex: 'invoiceLineInstruction',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.divisionforInterfaceERPORG,
			dataIndex: 'divisionForInterfaceErporg',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.billContact,
			dataIndex: 'billToContact',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.billToTelephone,
			dataIndex: 'billToTel',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.billToFax,
			dataIndex: 'billToFax',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.billToEmail,
			dataIndex: 'billToEmail',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.shipContact,
			dataIndex: 'shipToContact',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.shipToTelephone,
			dataIndex: 'shipToTel',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.shipToFax,
			dataIndex: 'shipToFax',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.shipToEmail,
			dataIndex: 'shipToEmail',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.artworkHold,
			dataIndex: 'artworkHold',
			editor: 'checkbox'
		}, 
		{
			text:AOCLit.artworkWorkAttachment,
			dataIndex: 'artworkAttachment',
			editor: 'checkbox'
		}, 
		{
			text:AOCLit.variableDataBreakdown,
			dataIndex: 'variableDataBreakdown',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.manufacturingNotes,
			dataIndex: 'manufacturingNotes',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.orderType,
			dataIndex: 'orderType',
			width: 180,
			editor: {
				xtype: 'combo',
				displayField: 'variableFieldName',
				valueField: 'variableFieldName',
				queryMode :'local',
				store: Ext.data.StoreManager.lookup('OrderTypeId') == null ? AOC.util.Helper.getVariableComboStore('OrderType') : Ext.data.StoreManager.lookup('OrderTypeId')
			}
		}, 
		{
			text: AOCLit.orderBy,
			dataIndex: 'orderBy',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.endCust,
			dataIndex: 'endCustomer',
			width: 180,
			editor: {
				xtype: 'combo',
				displayField: 'variableFieldName',
				valueField: 'variableFieldName',
				queryMode :'local',
				store: Ext.data.StoreManager.lookup('EndCustomerId') == null ? AOC.util.Helper.getVariableComboStore('EndCustomer') : Ext.data.StoreManager.lookup('EndCustomerId')
			}
		}, 
		{
			text: AOCLit.shippingOnlyNotes,
			dataIndex: 'shippingOnlyNotes',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.bankCharge,
			dataIndex: 'bankCharge',
			editor: 'textfield'
		}, 
		{
			text:AOCLit.freightCharge,
			dataIndex: 'freightCharge',
			width: 160,
			editor: {
				xtype: 'combo',
				displayField: 'variableFieldName',
				valueField: 'variableFieldName',
				queryMode :'local',
				store: Ext.data.StoreManager.lookup('FreightTermsId') == null ? AOC.util.Helper.getVariableComboStore('FreightTerms') : Ext.data.StoreManager.lookup('FreightTermsId')
			}
		}, 
		{
			text: AOCLit.shippingHold,
			dataIndex: 'shippingHold',
			editor: 'checkbox'
		}, 
		{
			text: AOCLit.productionHold,
			dataIndex: 'productionHold',
			editor: 'checkbox'
		}, 
		{
			text: AOCLit.splitShipset,
			dataIndex: 'splitShipSet',
			width: 180,
			editor: {
				xtype: 'combo',
				displayField: 'variableFieldName',
				valueField: 'variableFieldName',
				queryMode :'local',
				store: Ext.data.StoreManager.lookup('SplitShipsetId') == null ? AOC.util.Helper.getVariableComboStore('SplitShipset') : Ext.data.StoreManager.lookup('SplitShipsetId')
			}
		}, 
		{
			text: AOCLit.agreement,
			dataIndex: 'agreement',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.modelSerialNumber,
			dataIndex: 'modelSerialNumber',
			editor: 'textfield'
		}, 
		{
			text: AOCLit.waiveMOQ,
			dataIndex: 'waiveMOQ',
			editor: 'checkbox'
		}, 
		{
			text: AOCLit.apoType,
			dataIndex: 'apoType',
			width: 180,
			editor: {
				xtype: 'combo',
				displayField: 'variableFieldName',
				valueField: 'variableFieldName',
				queryMode :'local',
				store: Ext.data.StoreManager.lookup('APOTypeId') == null ? AOC.util.Helper.getVariableComboStore('APOType') : Ext.data.StoreManager.lookup('APOTypeId')
			}
		}
	],
	plugins: [
		{
			ptype: 'cmprowexpander',
			createComponent: function(view,record,htmlnode,index) {
				var data=record.get('listSalesOrderDetails');
				var store = Ext.create('AOC.store.VariableHeaderStore', {
	    		    autoLoad: true,
	    		    modal: 'AOC.model.VariableHeaderModel',
	    		    data : data,
	    		    proxy: {
	    		        type: 'memory'
	    		    }
	    		});
				return Ext.create('Ext.grid.Panel',{
					modal: 'AOC.model.VariableHeaderModel',
					cls: 'nestedGrid',
					store:store,
					columnLines: false,
					selModel: {
						type: 'spreadsheet'
					},
					plugins: [{
		   	        	ptype: 'clipboard'
		   	        }],
					columns: [
						{
							xtype: 'rownumberer',
							text:'#'
						}, 
						{
							text: AOCLit.Level,
							dataIndex: 'level',
							width: 100
						}, 
						{
							text: "SKU #",
							dataIndex: 'skuno',
							width: 100
						}, 
						{
							text: "TypeSetterCode",
							dataIndex: 'typeSetter',
							align:'right',
							width: 130
						}, 
						{
							text: AOCLit.variableFieldName,
							dataIndex: 'variableFieldName',
							width: 140
						}, 
						{
							text: "Variable Field Value",
							dataIndex: 'variableDataValue',
							width: 140
						}, 
						{
							text: AOCLit.fiberContentPercent,
							dataIndex: 'fiberPercent',
							align:'right',
							xtype:'gridcolumn',
							width: 155
						},
						{
						  text:'',
						  flex:1
						}
					],
					border: true,
					autoHeight: true,
					frame: false,
					header: false
				});
		    }
		},
		{
			ptype: 'clipboard'
		}
//    , {
//        ptype: 'rowediting',
//        clicksToEdit: 1,
//        saveAndNextBtn: true,
//        controller: 'salesorder',
//        listeners: {
//            'edit': 'updateSalesOrder'
//        },
//        bulKUpdate: function(editor, context) {
//            this.suspendEvent('edit');
//            this.completeEdit();
//            this.resumeEvent('edit');
//            var me = this;
//            var ctx = this.context,
//                idx = ctx.rowIdx,
//                currentRecord = ctx.store.getAt(idx);
//            var obj = currentRecord.getChanges();
//            var runTime = AOC.config.Runtime;
//            var obj = '{"data":' + Ext.encode(Ext.encode(obj)) + ',"updateAll":true,"orderQueueId":"' + runTime.getOrderQueueId() + '"}';
//            Ext.Ajax.request({
//                method: 'PUT',
//                jsonData: obj,
//                url: applicationContext + '/rest/salesorders/bulkupdate',
//                success: function(response, opts) {
//                    Ext.Msg.alert('', 'Sales Order successfully updated');
//                    Ext.getBody().unmask();
//                    me.getView().store.load();
//                },
//                failure: function(response, opts) {
//                    Ext.getBody().unmask();
//                }
//            });
//
//        }
//
//    }
    ],
   
    tbar: {
        height: AOC.config.Settings.config.defaultTbarHeight,
        items: [
			{
				xtype:'tbtext',
				text:'Sales Order',
				style:AOC.config.Settings.config.tabHeaderTitleStyle
			}
		]
    },
    bbar:{
    	items:[
			{
				xtype:'whitebutton',
				text:'Back',
				handler:'backButton'
			}
    	]
    }
});