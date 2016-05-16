Ext.define('AOC.view.orderqueue.SalesOrderExpandableGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'salesrrderexpandablegrid',
    itemId: 'salesrrderexpandablegrid',
    requires: ['Ext.grid.Panel', 'AOC.view.ux.RowExpanderGrid', 'AOC.util.Helper','Ext.grid.plugin.Clipboard'],
    controller: 'salesorder',
    emptyText: AOCLit.emptyDataMsg,
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
        text: AOCLit.Status,
        dataIndex: 'status',
        width: 150,
        renderer:function(v){
    			return AOC.util.Helper.getSatus(v);
		}
    },
    {
  	  text: AOCLit.systemStatus,
        dataIndex: 'systemstatus',
        width: 85,
    	renderer:function(v){
			if(v){
				return '<div><span data-qtip="'+v+'" />'+v+'</span></div>';
			}else 
				return '';
    }
  },{
        text: AOCLit.Division,
        dataIndex: 'division',
        editor: 'textfield'
    }, {
        text: AOCLit.orderSource,
        dataIndex: 'orderSource',
        editor: 'textfield'
    }, {
        text: AOCLit.SOLDTORBONumber,
        dataIndex: 'soldTORBONumber',
        editor: 'textfield'
    }, {
        text: AOCLit.oracleBilltoSiteNumber,
        dataIndex: 'oracleBilltoSiteNumber',
        editor: 'textfield'
    }, {
        text: AOCLit.oracleShiptoSiteNumber,
        dataIndex: 'oracleShiptoSiteNumber',
        editor: 'textfield'
    }, {
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
    }, {
        text: 'Customer PO #',
        dataIndex: 'customerPONumber',
        editor: 'textfield'
    }, {
        text: 'Retailer PoCustomer job',
        dataIndex: 'retailerPO_CustomerJob',
        editor: 'textfield'
    }, {
        text: AOCLit.oracleItemNo,
        dataIndex: 'oracleItemNumber',
        editor: 'textfield'
    }, {
        text: AOCLit.custItemNo,
        dataIndex: 'customerItemNumber',
        editor: 'textfield'
    }, {
        text: AOCLit.itemDesc,
        dataIndex: 'itemDescription',
        editor: 'textfield'
    }, {
        text:AOCLit.orderdedQty,
        dataIndex: 'customerOrderedQty',
        editor: 'textfield'
    }, {
        text: AOCLit.dateOrdered,
        dataIndex: 'dateOrdered',
        editor: 'textfield'
    }, {
        text: AOCLit.custRequestDate,
        dataIndex: 'ustomerRequestDate',
        editor: 'textfield'
    }, {
        text: AOCLit.promiseDate,
        dataIndex: 'promiseDate',
        editor: 'textfield'
    }, {
        text: AOCLit.freightTerm,
        dataIndex: 'freightTerms',
        editor: 'textfield'
    }, {
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
    }, {
        text: AOCLit.packingInstruction,
        dataIndex: 'packinginstruction',
        editor: 'textfield'
    }, {
        text: AOCLit.shippingInstructions,
        dataIndex: 'shippingInstructions',
        editor: 'textfield'
    }, {
        text: AOCLit.invoiceLineInstruction,
        dataIndex: 'invoicelineInstruction',
        editor: 'textfield'
    }, {
        text: AOCLit.divisionforInterfaceERPORG,
        dataIndex: 'divisionforInterfaceERPORG',
        editor: 'textfield'
    }, {
        text: AOCLit.billContact,
        dataIndex: 'billToContact',
        editor: 'textfield'
    }, {
        text: AOCLit.billToTelephone,
        dataIndex: 'billToTEL',
        editor: 'textfield'
    }, {
        text: AOCLit.billToFax,
        dataIndex: 'billToFAX',
        editor: 'textfield'
    }, {
        text: AOCLit.billToEmail,
        dataIndex: 'billToEMAIL',
        editor: 'textfield'
    }, {
        text: AOCLit.shipContact,
        dataIndex: 'shipTOContact',
        editor: 'textfield'
    }, {
        text: AOCLit.shipToTelephone,
        dataIndex: 'shipTOTEL',
        editor: 'textfield'
    }, {
        text: AOCLit.shipToFax,
        dataIndex: 'shipTOFAX',
        editor: 'textfield'
    }, {
        text: AOCLit.shipToEmail,
        dataIndex: 'shipTOEMAIL',
        editor: 'textfield'
    }, {
        text: AOCLit.artworkHold,
        dataIndex: 'artworkhold',
        editor: 'checkbox'
    }, {
        text:AOCLit.artworkWorkAttachment,
        dataIndex: 'artworkworkattachment',
        editor: 'checkbox'
    }, {
        text:AOCLit.variableDataBreakdown,
        dataIndex: 'variableDataBreakdown',
        editor: 'textfield'
    }, {
        text: AOCLit.manufacturingNotes,
        dataIndex: 'manufacturingnotes',
        editor: 'textfield'
    }, {
        text: AOCLit.orderType,
        dataIndex: 'ordertype',
        width: 180,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            queryMode :'local',
            store: Ext.data.StoreManager.lookup('OrderTypeId') == null ? AOC.util.Helper.getVariableComboStore('OrderType') : Ext.data.StoreManager.lookup('OrderTypeId')
        }
    }, {
        text: AOCLit.orderBy,
        dataIndex: 'orderby',
        editor: 'textfield'
    }, {
        text: AOCLit.endCust,
        dataIndex: 'endcustomer',
        width: 180,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            queryMode :'local',
            store: Ext.data.StoreManager.lookup('EndCustomerId') == null ? AOC.util.Helper.getVariableComboStore('EndCustomer') : Ext.data.StoreManager.lookup('EndCustomerId')
        }
    }, {
        text: AOCLit.shippingOnlyNotes,
        dataIndex: 'shippingonlynotes',
        editor: 'textfield'
    }, {
        text: AOCLit.bankCharge,
        dataIndex: 'bankCharge',
        editor: 'textfield'
    }, {
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
    }, {
        text: AOCLit.shippingHold,
        dataIndex: 'shippinghold',
        editor: 'checkbox'
    }, {
        text: AOCLit.productionHold,
        dataIndex: 'productionhold',
        editor: 'checkbox'
    }, {
        text: AOCLit.splitShipset,
        dataIndex: 'splitshipset',
        width: 180,
        editor: {
            xtype: 'combo',
            displayField: 'variableFieldName',
            valueField: 'variableFieldName',
            queryMode :'local',
            store: Ext.data.StoreManager.lookup('SplitShipsetId') == null ? AOC.util.Helper.getVariableComboStore('SplitShipset') : Ext.data.StoreManager.lookup('SplitShipsetId')
        }
    }, {
        text: AOCLit.agreement,
        dataIndex: 'agreement',
        editor: 'textfield'
    }, {
        text: AOCLit.modelSerialNumber,
        dataIndex: 'modelSerialNumber',
        editor: 'textfield'
    }, {
        text: AOCLit.waiveMOQ,
        dataIndex: 'waiveMOQ',
        editor: 'checkbox'
    }, {
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
		          selModel: {
		   	       type: 'spreadsheet'
		   	    },
		   	  plugins: [{
		   	        	ptype: 'clipboard'
		   	        }],
		          columns: [{
		              xtype: 'rownumberer',
	            	  text:'#'
		          }, {
		              text: AOCLit.Level,
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
		              text: AOCLit.variableFieldName,
		              dataIndex: 'variablefieldname',
		              width: 140
		          }, {
		              text: "Variable Field Value",
		              dataIndex: 'variabledatavalue',
		              width: 140
		          }, {
		              text: AOCLit.fiberContentPercent,
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