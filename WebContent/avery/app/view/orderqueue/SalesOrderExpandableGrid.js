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
{ text: 'Division',  dataIndex: 'division',editor:'textfield' },
{ text: 'OrderSource', dataIndex: 'orderSource', editor:'textfield' },
{ text: 'SOLD TO RBO #', dataIndex: 'soldTORBONumber',editor:'textfield' },
{ text: 'Oracle Bill to Site #', dataIndex: 'oracleBilltoSiteNumber',editor:'textfield' },
{ text: 'Oracle Ship to Site #', dataIndex: 'oracleShiptoSiteNumber',editor:'textfield' },
{ text: 'Shipping method', dataIndex: 'shippingMethod',editor:{xtype:'combo',store:[['ACS','ACS'],['ADP GLOBAL EXPRESS','ADP GLOBAL EXPRESS'],['AIRTRANS LOG - BY AIR','AIRTRANS LOG - BY AIR'],['A-LINK','A-LINK']]} },
{ text: 'Customer PO #', dataIndex: 'customerPONumber',editor:'textfield' },
{ text: 'Retailer poCustomer job', dataIndex: 'retailerPO_CustomerJob',editor:'textfield' },
{ text: 'Oracle Item #', dataIndex: 'oracleItemNumber',editor:'textfield' },
{ text: 'Customer Item #', dataIndex: 'customerItemNumber',editor:'textfield' },
{ text: 'Item Description', dataIndex: 'itemDescription',editor:'textfield' },
{ text: 'Orderded Qty', dataIndex: 'orderdedQty',editor:'textfield' },
{ text: 'Date Ordered', dataIndex: 'dateOrdered',editor:'textfield' },
{ text: 'Request date', dataIndex: 'ustomerRequestDate',editor:'textfield' },
{ text: 'promise date', dataIndex: 'promiseDate',editor:'textfield' },
{ text: 'Freight term', dataIndex: 'freightTerms',editor:'textfield' },
{ text: 'CSR', dataIndex: 'csr',editor:'textfield' },
{ text: 'packing instruction', dataIndex: 'packinginstruction',editor:'textfield' },
{ text: 'Shipping instruction', dataIndex: 'shippingInstructions',editor:'textfield' },
{ text: 'Invoice line instruction', dataIndex: 'invoicelineInstruction',editor:'textfield' },
{ text: 'Division for Interface ERP ORG', dataIndex: 'divisionforInterfaceERPORG',editor:'textfield' },
{ text: 'Bill to contact', dataIndex: 'billToContact',editor:'textfield' },
{ text: 'Bill to tel', dataIndex: 'billToTEL',editor:'textfield' },
{ text: 'Bill to EMAIL', dataIndex: 'billToEMAIL',editor:'textfield' },
{ text: 'Ship to contact', dataIndex: 'shipTOContact',editor:'textfield' },
{ text: 'Ship to tel', dataIndex: 'shipTOTEL',editor:'textfield' },
{ text: 'Ship to FAX', dataIndex: 'shipTOFAX',editor:'textfield' },
{ text: 'Ship to EMAIL', dataIndex: 'shipTOEMAIL',editor:'textfield' },
{ text: 'Artwork hold', dataIndex: 'artworkhold',editor:'checkbox' },
{ text: 'Artwork work attachment', dataIndex: 'artworkworkattachment',editor:'checkbox' },
{ text: 'Variable data Breakdown', dataIndex: 'variableDataBreakdown',editor:'textfield' },
{ text: 'Manu. Note', dataIndex: 'manufacturingnotes',editor:'textfield' },
{ text: 'Order type', dataIndex: 'ordertype',editor:'textfield' },
{ text: 'Order by', dataIndex: 'orderby',editor:'textfield' },
{ text: 'End customer', dataIndex: 'endcustomer',editor:'textfield' },
{ text: 'Shipping only note', dataIndex: 'shippingonlynotes',editor:'textfield' },
{ text: 'Bank charge', dataIndex: 'bankCharge',editor:'textfield' },
{ text: 'Freight charge', dataIndex: 'freightCharge',editor:'textfield' },
{ text: 'Shipping hold', dataIndex: 'shippinghold',editor:'checkbox' },
{ text: 'Production hold', dataIndex: 'productionhold',editor:'checkbox' },
{ text: 'Split ship set by', dataIndex: 'splitshipset',editor:'textfield' },
{ text: 'Agreement', dataIndex: 'agreement',editor:'textfield' },
{ text: 'Model serial #', dataIndex: 'modelSerialNumber',editor:'textfield' },
{ text: 'Waive MOQ', dataIndex: 'waiveMOQ',editor:'checkbox' },
{ text: 'APO type', dataIndex: 'apoType',editor:'textfield' }
    ],
    plugins:[{
		ptype:'rowexpandergrid',
		requires:['AOC.model.VariableHeaderModel'],
		gridConfig:{
			nestedGridRefrence:'salesOrderDetail',
    		//store:'nestedStore1', 
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