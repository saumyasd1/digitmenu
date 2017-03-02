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
			renderer:function(v, metadata,rec){
				return Helper.getSatus(rec);
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
			dataIndex: 'division'
		}, 
		{
			text: AOCLit.orderSource,
			dataIndex: 'orderSource'
		}, 
		{
			text: AOCLit.soldToRboNumber,
			dataIndex: 'soldToRboNumber',
			align:'right'
		}, 
		{
			text: AOCLit.oracleBilltoSiteNumber,
			dataIndex: 'oracleBillToSiteNumber',
			align:'right'
		}, 
		{
			text: AOCLit.oracleShiptoSiteNumber,
			dataIndex: 'oracleShipToSiteNumber'
		}, 
		{
			text: AOCLit.shippingMethod,
			dataIndex: 'shippingMethod',
			width: 170
		}, 
		{
			text: AOCLit.custPO,
			dataIndex: 'customerPoNumber'
		}, 
		{
			text:  AOCLit.retailerPO_CustomerJob,
			dataIndex: 'retailerPo_CustomerJob'
		}, 
		{
			text: AOCLit.oracleItemNo,
			dataIndex: 'oracleItemNumber'
		}, 
		{
			text: AOCLit.custItemNo,
			dataIndex: 'customerItemNumber',
			align:'right'
		}, 
		{
			text: AOCLit.itemDesc,
			dataIndex: 'itemDescription'
		}, 
		{
			text:AOCLit.orderdedQty,
			dataIndex: 'customerOrderedQty'
		}, 
		{
			text: AOCLit.dateOrdered,
			dataIndex: 'dateOrdered'
		}, 
		{
			text: AOCLit.custRequestDate,
			dataIndex: 'customerRequestDate'
		}, 
		{
			text: AOCLit.promiseDate,
			dataIndex: 'promiseDate',
			align:'right'
		}, 
		{
			text: AOCLit.freightTerm,
			dataIndex: 'freightTerms'
		}, 
		{
			text: AOCLit.CSR,
			dataIndex: 'csr',
			width: 160
		}, 
		{
			text: AOCLit.packingInstruction,
			dataIndex: 'packingInstruction'
		}, 
		{
			text: AOCLit.shippingInstructions,
			dataIndex: 'shippingInstructions'
		}, 
		{
			text: AOCLit.invoiceLineInstruction,
			dataIndex: 'invoiceLineInstruction'
		}, 
		{
			text: AOCLit.divisionforInterfaceERPORG,
			dataIndex: 'divisionForInterfaceErporg'
		}, 
		{
			text: AOCLit.billContact,
			dataIndex: 'billToContact'
		}, 
		{
			text: AOCLit.billToTelephone,
			dataIndex: 'billToTel'
		}, 
		{
			text: AOCLit.billToFax,
			dataIndex: 'billToFax'
		}, 
		{
			text: AOCLit.billToEmail,
			dataIndex: 'billToEmail'
		}, 
		{
			text: AOCLit.shipContact,
			dataIndex: 'shipToContact'
		}, 
		{
			text: AOCLit.shipToTelephone,
			dataIndex: 'shipToTel'
		}, 
		{
			text: AOCLit.shipToFax,
			dataIndex: 'shipToFax'
		}, 
		{
			text: AOCLit.shipToEmail,
			dataIndex: 'shipToEmail'
		}, 
		{
			text: AOCLit.artworkHold,
			dataIndex: 'artworkHold'
		}, 
		{
			text:AOCLit.artworkWorkAttachment,
			dataIndex: 'artworkAttachment'
		}, 
		{
			text:AOCLit.variableDataBreakdown,
			dataIndex: 'variableDataBreakdown'
		}, 
		{
			text: AOCLit.manufacturingNotes,
			dataIndex: 'manufacturingNotes'
		}, 
		{
			text: AOCLit.orderType,
			dataIndex: 'orderType',
			width: 180
		}, 
		{
			text: AOCLit.orderBy,
			dataIndex: 'orderBy'
		}, 
		{
			text: AOCLit.endCust,
			dataIndex: 'endCustomer',
			width: 180
		}, 
		{
			text: 'Ship Mark',
			dataIndex: 'shipMark',
			width: 150
		},
		{
			text: AOCLit.additionalLabel,
			dataIndex: 'additionalLabelInternalItem',
			width: 150
		}, 
		{
			text: AOCLit.bankCharge,
			dataIndex: 'bankCharge'
		}, 
		{
			text:AOCLit.freightCharge,
			dataIndex: 'freightCharge',
			width: 160
		}, 
		{
			text: AOCLit.shippingHold,
			dataIndex: 'shippingHold'
		}, 
		{
			text: AOCLit.productionHold,
			dataIndex: 'productionHold'
		}, 
		{
			text: AOCLit.splitShipset,
			dataIndex: 'splitShipSet',
			width: 180
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
			dataIndex: 'waiveMOQ'
		}, 
		{
			text: AOCLit.apoType,
			dataIndex: 'apoType',
			width: 180
		},
		{
			text: AOCLit.productionLine,
			dataIndex: 'productionLine',
			width: 100
		},
		{
			text: AOCLit.targetSystem,
			dataIndex: 'targetSystemName',
			width: 100
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
    buttonAlign:'left',
    buttons:[
		{
			//xtype:'button',
			text:'Back',
			handler:'backButton'
		}
	]
});