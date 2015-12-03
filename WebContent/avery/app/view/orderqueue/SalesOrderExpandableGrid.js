Ext.define('AOC.view.orderqueue.SalesOrderExpandableGrid',{
	extend:'Ext.grid.Panel',
	xtype:'salesrrderexpandablegrid',
	itemId:'salesrrderexpandablegrid',
	requires:['Ext.grid.Panel','AOC.ux.RowExpanderGrid'],
	controller:'salesorder',
	emptyText:'<div align=center>No data to display</div>',
    autoHeight:true,
    columnLines:true,
    columns: [
{ text: 'Division',  dataIndex: 'division'},
{ text: 'OrderSource', dataIndex: 'orderSource'},
{ text: 'SOLD TO RBO #', dataIndex: 'soldTORBONumber',width:100},
{ text: 'Oracle Bill To Site #', dataIndex: 'oracleBilltoSiteNumber',width:100},
{ text: 'Oracle Ship To Site #', dataIndex: 'oracleShiptoSiteNumber',width:100},
{ text: 'Shipping Method', dataIndex: 'shippingMethod',width:170},
{ text: 'Customer PO #', dataIndex: 'customerPONumber', width:250},
{ text: 'Retailer PoCustomer job', dataIndex: 'retailerPO_CustomerJob',width:115},
{ text: 'Oracle Item #', dataIndex: 'oracleItemNumber',width:100},
{ text: 'Customer Item #', dataIndex: 'customerItemNumber',width:88},
{ text: 'Item Description', dataIndex: 'itemDescription',width:150},
{ text: 'Orderded Qty', dataIndex: 'orderdedQty',width:180},
{ text: 'Date Ordered', dataIndex: 'dateOrdered',width:160 },
{ text: 'Request Date', dataIndex: 'ustomerRequestDate',width:160 },
{ text: 'promise Date', dataIndex: 'promiseDate',width:160 },
{ text: 'Freight Term', dataIndex: 'freightTerms',width:160 },
{ text: 'CSR', dataIndex: 'csr',width:160},
{ text: 'Packing Instruction', dataIndex: 'packinginstruction',width:180 },
{ text: 'Shipping Instruction', dataIndex: 'shippingInstructions',width:180 },
{ text: 'Invoice Line Instruction', dataIndex: 'invoicelineInstruction',width:180 },
{ text: 'Division For Interface ERP ORG', dataIndex: 'divisionforInterfaceERPORG',width:180 },
{ text: 'Bill To Contact', dataIndex: 'billToContact',width:170},
{ text: 'Bill To Tel', dataIndex: 'billToTEL',width:130 },
{ text: 'Bill To EMAIL', dataIndex: 'billToEMAIL',width:170},
{ text: 'Ship To Contact', dataIndex: 'shipTOContact',width:170 },
{ text: 'Ship To Tel', dataIndex: 'shipTOTEL',width:130  },
{ text: 'Ship To FAX', dataIndex: 'shipTOFAX',width:130 },
{ text: 'Ship To EMAIL', dataIndex: 'shipTOEMAIL',width:170 },
{ text: 'Artwork Hold', dataIndex: 'artworkhold',width:180},
{ text: 'Artwork Work Attachment', dataIndex: 'artworkworkattachment',width:180},
{ text: 'Variable Data Breakdown', dataIndex: 'variableDataBreakdown',width:180},
{ text: 'Manu. Note', dataIndex: 'manufacturingnotes',width:180},
{ text: 'Order Type', dataIndex: 'ordertype',width:180},
{ text: 'Order By', dataIndex: 'orderby',width:180},
{ text: 'End Customer', dataIndex: 'endcustomer',width:180},
{ text: 'Shipping Only Note', dataIndex: 'shippingonlynotes',width:180},
{ text: 'Bank Charge', dataIndex: 'bankCharge',width:180 },
{ text: 'Freight Charge', dataIndex: 'freightCharge',width:180 },
{ text: 'Shipping Hold', dataIndex: 'shippinghold' ,width:83},
{ text: 'Production Hold', dataIndex: 'productionhold',width:77},
{ text: 'Split Ship Set By', dataIndex: 'splitshipset',width:180},
{ text: 'Agreement', dataIndex: 'agreement',width:180},
{ text: 'Model Serial #', dataIndex: 'modelSerialNumber',width:180},
{ text: 'Waive MOQ', dataIndex: 'waiveMOQ',width:59},
{ text: 'APO Type', dataIndex: 'apoType',width:47}
    ],
    plugins:[{
		ptype:'rowexpandergrid',
		requires:['AOC.model.VariableHeaderModel'],
		gridConfig:{
			nestedGridRefrence:'salesOrderDetail',
			cls:'nestedGrid',
			modal:'AOC.model.VariableHeaderModel',
			 columns: [
		                {xtype: 'rownumberer'},
		                { text: 'Level', dataIndex: 'level' ,width:100},
		                { text: "SKU #", dataIndex: 'skuno',width:100},
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
			        	 reference:'radioGroup',
			             items: [
			                 { boxLabel: 'Sales Order Update', name: 'rb', inputValue: '1' , checked: true},
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
		                	xtype :'tbspacer',
		                	width :30
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
			         }
					 ]
}
});
