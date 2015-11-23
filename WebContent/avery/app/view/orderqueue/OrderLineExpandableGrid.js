Ext.define('AOC.view.orderqueue.OrderLineExpandableGrid',{
	extend:'Ext.grid.Panel',
	xtype:'orderlineexpandablegrid',
	requires:['Ext.grid.Panel','AOC.ux.RowExpanderGrid'],
	controller:'orderline',
	emptyText:'<div align=center>No data to display</div>',
    autoHeight:true,
    columnLines:true,
    columns: [
       { text: 'Customer PO Number',  dataIndex: 'customerPONumber', width:250  },
{ text: 'Ordered Date ', dataIndex: 'orderedDate',width:100 },
{ text: 'Partner Customer Name', dataIndex: 'partnerCustomerName',width:170  },
{ text: 'Customer Request Date', dataIndex: 'customerRequestDate',width:170   },
{ text: 'Partner Vendor Name', dataIndex: 'partnerVendorName',width:170  },
{ text: 'Ship To Customer', dataIndex: 'shipToCustomer',width:170 },
{ text: 'Ship To Contact', dataIndex: 'shipToContact',width:170  },
{ text: 'Ship To Address', dataIndex: 'shipToAddress',width:170  },
{ text: 'Bill To Customer', dataIndex: 'billToCustomer',width:170 },
{ text: 'Bill To Contact', dataIndex: 'billToContact',width:170  },
{ text: 'Bill To Address', dataIndex: 'BillToAddress',width:170  },
{ text: 'Requested Devlivery Date', dataIndex: 'requestedDevliveryDate',width:180  },
{ text: 'Special Instruction', dataIndex: 'specialInstruction',width:170  },
{ text: 'Order Received Date', dataIndex: 'orderReceivedDate',width:170  },
{ text: 'Sold To RBONumber', dataIndex: 'soldTORBONumber' ,width:180 },
{ text: 'Oracle Bill to SiteNumber', dataIndex: 'oracleBilltoSiteNumber',width:190  },
{ text: 'Oracle Ship to Site Number', dataIndex: 'oracleShiptoSiteNumber' ,width:180 },
{ text: 'Shipping Method', dataIndex: 'shippingMethod',width:170 },
{ text: 'Retailer PO/Customer Job', dataIndex: 'retailerPO_CustomerJob',width:180  },
{ text: 'Avery Item Number', dataIndex: 'averyItemNumber',width:180  },
{ text: 'Customer Item Number', dataIndex: 'customerItemNumber' ,width:180 },
{ text: 'Item Description', dataIndex: 'itemDescription',width:150  },
{ text: 'Customer Color Code', dataIndex: 'customerColorCode',width:180  },
{ text: 'Customer Color Description', dataIndex: 'customerColorDescription',width:200  },
{ text: 'Customer Size', dataIndex: 'customerSize',width:160  },
{ text: 'Customer Unit Price', dataIndex: 'customerUnitPrice',width:180 },
{ text: 'Customer Cost', dataIndex: 'customerCost',width:180  },
{ text: 'Contract Number', dataIndex: 'contractNumber',width:180  },
{ text: 'Style No', dataIndex: 'styleNo',width:180 },
{ text: 'Customer Item Number 1', dataIndex: 'customerItemNumber1',width:180},
{ text: 'Customer Item Number 2', dataIndex: 'customerItemNumber2',width:180},
{ text: 'Customer Season', dataIndex: 'customerSeason' ,width:180 },
{ text: 'Customer UOM', dataIndex: 'customerUOM',width:180  },
{ text: 'Customer Ordered Qty', dataIndex: 'customerOrderedQty',width:180  },
{ text: 'Calculated Orderded Qty', dataIndex: 'calculatedOrderdedQty',width:180  },
{ text: 'Order Date', dataIndex: 'orderDate',width:160  },
{ text: 'Promise Date', dataIndex: 'promiseDate',width:160  },
{ text: 'Freight Terms', dataIndex: 'freightTerms',width:160  },
{ text: 'CSR', dataIndex: 'csr',width:160 },
{ text: 'Packing Instruction', dataIndex: 'packingInstruction',width:180 },
{ text: 'Shipping Instructions', dataIndex: 'shippingInstructions',width:180  },
{ text: 'Invoice line Instruction', dataIndex: 'invoicelineInstruction' ,width:180  },
{ text: 'Division for Interface ERPORG', dataIndex: 'divisionforInterfaceERPORG' ,width:180  },
{ text: 'Artwork hold', dataIndex: 'artworkhold',width:180 },
{ text: 'Artwork work attachment', dataIndex: 'artworkworkattachment' ,width:180 },
{ text: 'Variable Data Breakdown', dataIndex: 'variableDataBreakdown' ,width:180 },
{ text: 'Manufacturing notes', dataIndex: 'manufacturingnotes' ,width:180 },
{ text: 'Order type', dataIndex: 'ordertype' ,width:180 },
{ text: 'Order by', dataIndex: 'orderby' ,width:180 },
{ text: 'End customer', dataIndex: 'endcustomer' ,width:180 },
{ text: 'Shipping only notes', dataIndex: 'shippingonlynotes' ,width:180 },
{ text: 'Bank Charge', dataIndex: 'bankCharge' ,width:180 },
{ text: 'Freight Charge', dataIndex: 'freightCharge' ,width:180 },
{ text: 'Shipping hold', dataIndex: 'shippinghold' ,width:180 },
{ text: 'Production hold', dataIndex: 'productionhold' ,width:180 },
{ text: 'Split shipset', dataIndex: 'splitshipset' ,width:180 },
{ text: 'Agreement', dataIndex: 'agreement' ,width:180 },
{ text: 'Model Serial Number', dataIndex: 'modelSerialNumber' ,width:180 },
{ text: 'Waive MOQ', dataIndex: 'waiveMOQ' ,width:180 },
{ text: 'APO Type', dataIndex: 'apoType' ,width:180 },
{ text: 'Sent To Oracle Date', dataIndex: 'sentToOracleDate' ,width:180 },
{ text: 'Status', dataIndex: 'status' ,width:180 }
    ],
    plugins:[{
		ptype:'rowexpandergrid',
		gridConfig:{
			nestedGridRefrence:'orderLineDetail',
			modal:'AOC.model.VariableHeaderModel', 
            columns: [
                {xtype: 'rownumberer'},
                { text: 'Level', dataIndex: 'level' ,width:100},
                { text: "SKU Number", dataIndex: 'skuno',width:100},
                { text: "TypeSetterCode", dataIndex: 'typesetter' ,width:130},	
                { text: "Variable Field Name", dataIndex: 'variablefieldname' ,width:140},
                { text: "Variable Field Value", dataIndex: 'variabledatavalue' ,width:140},
                { text: "Fiber Content Percentage", dataIndex: 'fiberPercent' ,width:155}
            ],
            columnLines: false,
            border:true,
            plugins:['rowediting'],
            width:790,
            autoHeight: true,
            frame: false,
            header:false
		}
    }
            ],
            tbar: { 
    			height: 50,
    		    items : 
    		    	[
					 {
			              icon: BackIcon, //back button functionality added
						  text:backText,
						  handler:'backButton'
			         },
			         {
		                	xtype :'tbspacer',
		                	width :30
		        	 },
			         {
			        	 xtype: 'radiogroup',
			             items: [
			                 { boxLabel: 'Order Line Update', name: 'rb', inputValue: '1' , checked: true},
			                 {
			                 	xtype :'tbspacer',
			                 	width :15
			         		 },
			                 { boxLabel: 'Variable Order Update', name: 'rb', inputValue: '2'}
			             ],
			             listeners:{
			            	 change:'radioButtonClick'
			             }
			         },
			         {
			        	 xtype: 'combo',
			             hidden:true,
			             displayField :'variableFieldName',
			             valueField :'variableFieldName',
			             reference :'variableFieldCombo'
			         },
			         {
		                	xtype :'tbspacer',
		                	width :30
		        	 },
			         {
			              xtype: 'button',
						  text:'<b>Submit</b>',
						  handler:'getUpdateScreen'
			         },
					 ]
}
});