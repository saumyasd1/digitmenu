Ext.define('AOC.model.SalesOrderModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
	fields: [
	         // set up the fields mapping into the xml doc
	         {name: 'division', mapping:'division',type: 'string'},
	 		{name: 'orderSource', mapping:'orderSource',type: 'string'},
	 		{name: 'soldTORBONumber', mapping:'soldTORBONumber',type: 'string'},
	 		{name: 'oracleBilltoSiteNumber', mapping:'oracleBilltoSiteNumber',type: 'string'},
	 		{name: 'oracleShipToSiteNumber', mapping:'oracleShipToSiteNumber',type: 'string'},
	 		{name: 'shippingMethod', mapping:'shippingMethod',type: 'string'},
	 		{name: 'customerPoNumber', mapping:'customerPoNumber',type: 'string'},
	 		{name: 'retailerPo_CustomerJob', mapping:'retailerPo_CustomerJob',type: 'string'},
	 		{name: 'oracleItemNumber', mapping:'oracleItemNumber',type: 'string'},
	 		{name: 'customerItemNumber', mapping:'customerItemNumber',type: 'string'},
	 		{name: 'itemDescription', mapping:'itemDescription',type: 'string'},
	 		{name: 'orderdedQty', mapping:'orderdedQty',type: 'string'},
	 		{name: 'customerOrderedQty', mapping:'customerOrderedQty',type: 'string'},
	 		{name: 'dateOrdered', mapping:'dateOrdered',type: 'string'},
	 		{name: 'customerRequestDate', mapping:'customerRequestDate',type: 'string'},
	 		{name: 'promiseDate', mapping:'promiseDate',type: 'string'},
	 		{name: 'freightTerms', mapping:'freightTerms',type: 'string'},
	 		{name: 'csr', mapping:'csr',type: 'string'},
	 		{name: 'packingInstruction', mapping:'packingInstruction',type: 'string'},
	 		{name: 'shippingInstructions', mapping:'shippingInstructions',type: 'string'},
	 		{name: 'invoiceLineInstruction', type: 'string'},
	 		{name: 'divisionForInterfaceErporg',type: 'string'},
	 		{name: 'billToContact', mapping:'billToContact',type: 'string'},
	 		{name: 'billToTel', mapping:'billToTel',type: 'string'},
	 		{name: 'billToFax', type: 'string'},
	 		{name: 'billToEmail',type: 'string'},
	 		{name: 'shipToContact',type: 'string'},
	 		{name: 'shipToTel',type: 'string'},
	 		{name: 'shipToFax', type: 'string'},
	 		{name: 'shipToEmail', type: 'string'},
	 		{name: 'artworkHold', type: 'string'},
	 		{name: 'artworkAttachment',type: 'string'},
	 		{name: 'variableDataBreakdown', type: 'string'},
	 		{name: 'manufacturingNotes', mapping:'manufacturingNotes',type: 'string'},
	 		{name: 'orderType', mapping:'orderType',type: 'string'},
	 		{name: 'orderBy', mapping:'orderBy',type: 'string'},
	 		{name: 'endCustomer', mapping:'endCustomer',type: 'string'},
	 		{name: 'shippingOnlyNotes', mapping:'shippingOnlyNotes',type: 'string'},
	 		{name: 'bankCharge', mapping:'bankCharge',type: 'string'},
	 		{name: 'freightCharge', mapping:'freightCharge',type: 'string'},
	 		{name: 'shippingHold', mapping:'shippingHold',type: 'string'},
	 		{name: 'productionHold', mapping:'productionHold',type: 'string'},
	 		{name: 'splitShipSet', mapping:'splitShipSet',type: 'string'},
	 		{name: 'agreement', mapping:'agreement',type: 'string'},
	 		{name: 'modelSerialNumber', mapping:'modelSerialNumber',type: 'string'},
	 		{name: 'waiveMOQ', mapping:'waiveMOQ',type: 'string'},
	 		{name: 'apoType', mapping:'apoType',type: 'string'},
	 		{name: 'system_Status', mapping:'system_Status',type: 'string'},
	 		{name:'listSalesOrderDetails'},{name:'iconName'},{name:'colorCode'},
	 		{name: 'productionLine',mapping:'productionLine',type:'string'},
	 		{name: 'targetSystemName',mapping:'targetSystemName',type:'string'},
	 		{name: 'shipMark', mapping:'shipMark', type:'string'},
	 		{name: 'additionalLabelInternalItem',mapping:'additionalLabelInternalItem', type:'string'},
	 		{name: 'sortingId', type: 'int'}
	     ]
});