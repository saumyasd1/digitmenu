Ext.define('AOC.view.orderqueue.SalesOrderExpandableGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'salesrrderexpandablegrid',
    itemId: 'salesrrderexpandablegrid',
    requires: ['Ext.grid.Panel', 'AOC.view.ux.RowExpanderGrid', 'AOC.view.ux.CustomRowEditing', 'AOC.util.Helper'],
    controller: 'salesorder',
    emptyText: '<div align=center>No data to display</div>',
    autoHeight: true,
    columnLines: true,
    nestedGridRefrence: 'salesOrderDetail',
    columnLines: false,
    viewConfig    : {
        stripeRows    : true
    },
    selModel: {
	       type: 'spreadsheet',
	       rowNumbererHeaderWidth:0
	    },
    columns: [
               {
        text: 'Status',
        dataIndex: 'status',
        width: 150,
        renderer:function(v){
    			return AOC.util.Helper.getSatus(v);
		}
    },
    {
  	  text: 'System Status',
        dataIndex: 'systemstatus',
        width: 85,
    	renderer:function(v){
			if(v){
				return '<div><span data-qtip="'+v+'" />'+v+'</span></div>';
			}else 
				return '';
    }
  },{
        text: 'Division',
        dataIndex: 'division',
        editor: 'textfield'
    }, {
        text: 'OrderSource',
        dataIndex: 'orderSource',
        editor: 'textfield'
    }, {
        text: 'SOLD TO RBO #',
        dataIndex: 'soldTORBONumber',
        editor: 'textfield'
    }, {
        text: 'Oracle Bill To Site #',
        dataIndex: 'oracleBilltoSiteNumber',
        editor: 'textfield'
    }, {
        text: 'Oracle Ship To Site #',
        dataIndex: 'oracleShiptoSiteNumber',
        editor: 'textfield'
    }, {
        text: 'Shipping Method',
        dataIndex: 'shippingMethod',
        width: 170,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            store: Ext.data.StoreManager.lookup('ShippingMethodId') == null ? AOC.util.Helper.getVariableComboStore('ShippingMethod') : Ext.data.StoreManager.lookup('ShippingMethodId')
        }
    }, {
        text: 'Customer PO #',
        dataIndex: 'customerPONumber',
        editor: 'textfield'
    }, {
        text: 'Retailer PoCustomer job',
        dataIndex: 'retailerPO_CustomerJob',
        editor: 'textfield'
    }, {
        text: 'Oracle Item #',
        dataIndex: 'oracleItemNumber',
        editor: 'textfield'
    }, {
        text: 'Customer Item #',
        dataIndex: 'customerItemNumber',
        editor: 'textfield'
    }, {
        text: 'Item Description',
        dataIndex: 'itemDescription',
        editor: 'textfield'
    }, {
        text: 'Orderded Qty',
        dataIndex: 'customerOrderedQty',
        editor: 'textfield'
    }, {
        text: 'Date Ordered',
        dataIndex: 'dateOrdered',
        editor: 'textfield'
    }, {
        text: 'Customer Request Date',
        dataIndex: 'ustomerRequestDate',
        editor: 'textfield'
    }, {
        text: 'Promise Date',
        dataIndex: 'promiseDate',
        editor: 'textfield'
    }, {
        text: 'Freight Terms',
        dataIndex: 'freightTerms',
        editor: 'textfield'
    }, {
        text: 'CSR',
        dataIndex: 'csr',
        width: 160,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            store: Ext.data.StoreManager.lookup('CSRId') == null ? AOC.util.Helper.getVariableComboStore('CSR') : Ext.data.StoreManager.lookup('CSRId')
        }
    }, {
        text: 'Packing Instruction',
        dataIndex: 'packinginstruction',
        editor: 'textfield'
    }, {
        text: 'Shipping Instruction',
        dataIndex: 'shippingInstructions',
        editor: 'textfield'
    }, {
        text: 'Invoice Line Instruction',
        dataIndex: 'invoicelineInstruction',
        editor: 'textfield'
    }, {
        text: 'Division For Interface ERP ORG',
        dataIndex: 'divisionforInterfaceERPORG',
        editor: 'textfield'
    }, {
        text: 'Bill To Contact',
        dataIndex: 'billToContact',
        editor: 'textfield'
    }, {
        text: 'Bill To Telephone',
        dataIndex: 'billToTEL',
        editor: 'textfield'
    }, {
        text: 'Bill To FAX',
        dataIndex: 'billToFAX',
        editor: 'textfield'
    }, {
        text: 'Bill To EMAIL',
        dataIndex: 'billToEMAIL',
        editor: 'textfield'
    }, {
        text: 'Ship To Contact',
        dataIndex: 'shipTOContact',
        editor: 'textfield'
    }, {
        text: 'Ship To Telephone',
        dataIndex: 'shipTOTEL',
        editor: 'textfield'
    }, {
        text: 'Ship To FAX',
        dataIndex: 'shipTOFAX',
        editor: 'textfield'
    }, {
        text: 'Ship To EMAIL',
        dataIndex: 'shipTOEMAIL',
        editor: 'textfield'
    }, {
        text: 'Artwork Hold',
        dataIndex: 'artworkhold',
        editor: 'checkbox'
    }, {
        text: 'Artwork Work Attachment',
        dataIndex: 'artworkworkattachment',
        editor: 'checkbox'
    }, {
        text: 'Variable Data Breakdown',
        dataIndex: 'variableDataBreakdown',
        editor: 'textfield'
    }, {
        text: 'Manu. Note',
        dataIndex: 'manufacturingnotes',
        editor: 'textfield'
    }, {
        text: 'Order Type',
        dataIndex: 'ordertype',
        width: 180,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            store: Ext.data.StoreManager.lookup('OrderTypeId') == null ? AOC.util.Helper.getVariableComboStore('OrderType') : Ext.data.StoreManager.lookup('OrderTypeId')
        }
    }, {
        text: 'Order By',
        dataIndex: 'orderby',
        editor: 'textfield'
    }, {
        text: 'End Customer',
        dataIndex: 'endcustomer',
        width: 180,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            store: Ext.data.StoreManager.lookup('EndCustomerId') == null ? AOC.util.Helper.getVariableComboStore('EndCustomer') : Ext.data.StoreManager.lookup('EndCustomerId')
        }
    }, {
        text: 'Shipping Only Notes',
        dataIndex: 'shippingonlynotes',
        editor: 'textfield'
    }, {
        text: 'Bank Charge',
        dataIndex: 'bankCharge',
        editor: 'textfield'
    }, {
        text: 'Freight Charges',
        dataIndex: 'freightCharge',
        width: 160,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            store: Ext.data.StoreManager.lookup('FreightTermsId') == null ? AOC.util.Helper.getVariableComboStore('FreightTerms') : Ext.data.StoreManager.lookup('FreightTermsId')
        }
    }, {
        text: 'Shipping Hold',
        dataIndex: 'shippinghold',
        editor: 'checkbox'
    }, {
        text: 'Production Hold',
        dataIndex: 'productionhold',
        editor: 'checkbox'
    }, {
        text: 'Split Shipset',
        dataIndex: 'splitshipset',
        width: 180,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            store: Ext.data.StoreManager.lookup('SplitShipsetId') == null ? AOC.util.Helper.getVariableComboStore('SplitShipset') : Ext.data.StoreManager.lookup('SplitShipsetId')
        }
    }, {
        text: 'Agreement',
        dataIndex: 'agreement',
        editor: 'textfield'
    }, {
        text: 'Model serial #',
        dataIndex: 'modelSerialNumber',
        editor: 'textfield'
    }, {
        text: 'Waive MOQ',
        dataIndex: 'waiveMOQ',
        editor: 'checkbox'
    }, {
        text: 'APO Type',
        dataIndex: 'apoType',
        width: 180,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            store: Ext.data.StoreManager.lookup('APOTypeId') == null ? AOC.util.Helper.getVariableComboStore('APOType') : Ext.data.StoreManager.lookup('APOTypeId')
        }
    }
   ],
    plugins: [{
        ptype: 'cmprowexpander',
		 createComponent: function(view,record,htmlnode,index) {
			 var data=record.get('salesOrderDetail');
			 var store = Ext.create('AOC.store.VariableHeaderStore', {
	    		    autoLoad: true,
	    		    modal: 'AOC.model.VariableHeaderModel',
	    		    data : data,
	    		    proxy: {
	    		        type: 'memory'
	    		    }
	    		});
		      return Ext.create('Ext.grid.Panel',{
		    	  nestedGridRefrence: 'salesOrderDetail',
		          modal: 'AOC.model.VariableHeaderModel',
		          cls: 'nestedGrid',
		          store:store,
		          columnLines: false,
		          columns: [{
		              xtype: 'rownumberer',
	            	  text:'#'
		          }, {
		              text: 'Level',
		              dataIndex: 'level',
		              width: 100
		          }, {
		              text: "SKU #",
		              dataIndex: 'skuno',
		              width: 100
		          }, {
		              text: "TypeSetterCode",
		              dataIndex: 'typesetter',
		              width: 130
		          }, {
		              text: "Variable Field Name",
		              dataIndex: 'variablefieldname',
		              width: 140
		          }, {
		              text: "Variable Field Value",
		              dataIndex: 'variabledatavalue',
		              width: 140
		          }, {
		              text: "Fiber Content Percentage",
		              dataIndex: 'fiberPercent',
		              xtype:'gridcolumn',
		              width: 155
		          },{
		        	  text:'',
		        	  flex:1
		          }],
		          border: true,
		          autoHeight: true,
		          frame: false,
		          header: false
		      }) ;
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
        height: 50,
        items: [{
				xtype:'image',
				width:40,
				src:AOC.config.Settings.buttonIcons.backIcon,
				autoEl: 'div',
				cls:'orderline-back-button',
				listeners:{
					el:{
						'click':'backButton'
					}
				}
			},
			{
		    	xtype : 'displayfield',
		    	style :{
		    		font:'10px'
		    	},
		    	encodeHtml:true,
		    	value : 'Sales Order'
			}
			]
    }
});