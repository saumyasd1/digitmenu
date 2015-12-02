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
{ text: 'SOLD TO RBO #', dataIndex: 'soldTORBONumber'},
{ text: 'Oracle Bill To Site #', dataIndex: 'oracleBilltoSiteNumber'},
{ text: 'Oracle Ship To Site #', dataIndex: 'oracleShiptoSiteNumber'},
{ text: 'Shipping Method', dataIndex: 'shippingMethod'},
{ text: 'Customer PO #', dataIndex: 'customerPONumber'},
{ text: 'Retailer PoCustomer job', dataIndex: 'retailerPO_CustomerJob'},
{ text: 'Oracle Item #', dataIndex: 'oracleItemNumber'},
{ text: 'Customer Item #', dataIndex: 'customerItemNumber'},
{ text: 'Item Description', dataIndex: 'itemDescription'},
{ text: 'Orderded Qty', dataIndex: 'orderdedQty'},
{ text: 'Date Ordered', dataIndex: 'dateOrdered'},
{ text: 'Request Date', dataIndex: 'ustomerRequestDate'},
{ text: 'promise Date', dataIndex: 'promiseDate'},
{ text: 'Freight Term', dataIndex: 'freightTerms'},
{ text: 'CSR', dataIndex: 'csr'},
{ text: 'Packing Instruction', dataIndex: 'packinginstruction'},
{ text: 'Shipping Instruction', dataIndex: 'shippingInstructions'},
{ text: 'Invoice Line Instruction', dataIndex: 'invoicelineInstruction'},
{ text: 'Division For Interface ERP ORG', dataIndex: 'divisionforInterfaceERPORG'},
{ text: 'Bill To Contact', dataIndex: 'billToContact'},
{ text: 'Bill To Tel', dataIndex: 'billToTEL' },
{ text: 'Bill To EMAIL', dataIndex: 'billToEMAIL'},
{ text: 'Ship To Contact', dataIndex: 'shipTOContact'},
{ text: 'Ship To Tel', dataIndex: 'shipTOTEL' },
{ text: 'Ship To FAX', dataIndex: 'shipTOFAX'},
{ text: 'Ship To EMAIL', dataIndex: 'shipTOEMAIL'},
{ text: 'Artwork Hold', dataIndex: 'artworkhold'},
{ text: 'Artwork Work Attachment', dataIndex: 'artworkworkattachment'},
{ text: 'Variable Data Breakdown', dataIndex: 'variableDataBreakdown'},
{ text: 'Manu. Note', dataIndex: 'manufacturingnotes'},
{ text: 'Order Type', dataIndex: 'ordertype'},
{ text: 'Order By', dataIndex: 'orderby'},
{ text: 'End Customer', dataIndex: 'endcustomer'},
{ text: 'Shipping Only Note', dataIndex: 'shippingonlynotes'},
{ text: 'Bank Charge', dataIndex: 'bankCharge'},
{ text: 'Freight Charge', dataIndex: 'freightCharge' },
{ text: 'Shipping Hold', dataIndex: 'shippinghold'},
{ text: 'Production Hold', dataIndex: 'productionhold'},
{ text: 'Split Ship Set By', dataIndex: 'splitshipset'},
{ text: 'Agreement', dataIndex: 'agreement'},
{ text: 'Model Serial #', dataIndex: 'modelSerialNumber'},
{ text: 'Waive MOQ', dataIndex: 'waiveMOQ'},
{ text: 'APO Type', dataIndex: 'apoType' }
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