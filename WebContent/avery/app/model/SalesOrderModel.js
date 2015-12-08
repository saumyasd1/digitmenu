Ext.define('AOC.model.SalesOrderModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
	fields: [
	         // set up the fields mapping into the xml doc
	         {name: 'division', mapping:'division',type: 'string'},
	 		{name: 'orderSource', mapping:'orderSource',type: 'string'},
	 		{name: 'soldTORBONumber', mapping:'soldTORBONumber',type: 'string'},
	 		{name: 'oracleBilltoSiteNumber', mapping:'oracleBilltoSiteNumber',type: 'string'},
	 		{name: 'oracleShiptoSiteNumber', mapping:'oracleShiptoSiteNumber',type: 'string'},
	 		{name: 'shippingMethod', mapping:'shippingMethod',type: 'string'},
	 		{name: 'customerPONumber', mapping:'customerPONumber',type: 'string'},
	 		{name: 'retailerPO_CustomerJob', mapping:'retailerPO_CustomerJob',type: 'string'},
	 		{name: 'oracleItemNumber', mapping:'oracleItemNumber',type: 'string'},
	 		{name: 'customerItemNumber', mapping:'customerItemNumber',type: 'string'},
	 		{name: 'itemDescription', mapping:'itemDescription',type: 'string'},
	 		{name: 'orderdedQty', mapping:'orderdedQty',type: 'string'},
	 		{name: 'customerOrderedQty', mapping:'customerOrderedQty',type: 'string'},
	 		{name: 'dateOrdered', mapping:'dateOrdered',type: 'string'},
	 		{name: 'ustomerRequestDate', mapping:'ustomerRequestDate',type: 'string'},
	 		{name: 'promiseDate', mapping:'promiseDate',type: 'string'},
	 		{name: 'freightTerms', mapping:'freightTerms',type: 'string'},
	 		{name: 'csr', mapping:'csr',type: 'string'},
	 		{name: 'packinginstruction', mapping:'packingInstruction',type: 'string'},
	 		{name: 'shippingInstructions', mapping:'shippingInstructions',type: 'string'},
	 		{name: 'invoicelineInstruction', mapping:'invoicelineInstruction',type: 'string'},
	 		{name: 'divisionforInterfaceERPORG', mapping:'divisionforInterfaceERPORG',type: 'string'},
	 		{name: 'billToContact', mapping:'billToContact',type: 'string'},
	 		{name: 'billToTEL', mapping:'billToTEL',type: 'string'},
	 		{name: 'billToFAX', mapping:'billToFAX',type: 'string'},
	 		{name: 'billToEMAIL', mapping:'billToEMAIL',type: 'string'},
	 		{name: 'shipTOContact', mapping:'shipTOContact',type: 'string'},
	 		{name: 'shipTOTEL', mapping:'shipTOTEL',type: 'string'},
	 		{name: 'shipTOFAX', mapping:'shipTOFAX',type: 'string'},
	 		{name: 'shipTOEMAIL', mapping:'shipTOEMAIL',type: 'string'},
	 		{name: 'artworkhold', mapping:'artworkhold',type: 'string'},
	 		{name: 'artworkworkattachment', mapping:'artworkworkattachment',type: 'string'},
	 		{name: 'variableDataBreakdown', mapping:'variableDataBreakdown',type: 'string'},
	 		{name: 'manufacturingnotes', mapping:'manufacturingnotes',type: 'string'},
	 		{name: 'ordertype', mapping:'ordertype',type: 'string'},
	 		{name: 'orderby', mapping:'orderby',type: 'string'},
	 		{name: 'endcustomer', mapping:'endcustomer',type: 'string'},
	 		{name: 'shippingonlynotes', mapping:'shippingonlynotes',type: 'string'},
	 		{name: 'bankCharge', mapping:'bankCharge',type: 'string'},
	 		{name: 'freightCharge', mapping:'freightCharge',type: 'string'},
	 		{name: 'shippinghold', mapping:'shippinghold',type: 'string'},
	 		{name: 'productionhold', mapping:'productionhold',type: 'string'},
	 		{name: 'splitshipset', mapping:'splitshipset',type: 'string'},
	 		{name: 'agreement', mapping:'agreement',type: 'string'},
	 		{name: 'modelSerialNumber', mapping:'modelSerialNumber',type: 'string'},
	 		{name: 'waiveMOQ', mapping:'waiveMOQ',type: 'string'},
	 		{name: 'apoType', mapping:'apoType',type: 'string'}
	     ]
});