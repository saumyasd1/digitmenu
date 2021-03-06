Ext.define('AOC.model.OrderLineModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
	fields: [
	         // set up the fields mapping into the xml doc
        {name: 'createdDate', type: 'string'},
 		{name: 'createdBy', type: 'string'},
 		{name: 'lastModifiedDate', type: 'string'},
 		{name: 'lastModifiedBy',type: 'string'},
 		{name: 'orderFileAttchmentID', type: 'string'},
 		{name: 'partnerID', type: 'string'},
 		{name: 'fiberPercent', type: 'string'},
 		{name: 'rboID', type: 'string'},
 		{name: 'productLineType', type: 'string'},
 		{name: 'customerPONumber', type: 'string'},
 		{name: 'poNumber', type: 'string'},
 		{name: 'orderedDate', type: 'date'},
 		{name: 'partnerCustomerName', mapping:'partnerCustomerName',type: 'string'},
 		{name: 'partnerVendorName', mapping:'partnerVendorName',type: 'string'},
 		{name: 'shipToCustomer', mapping:'shipToCustomer',type: 'string'},
 		{name: 'shipToContact', mapping:'shipToContact',type: 'string'},
 		{name: 'shipToAddress1',type: 'string'},
 		{name: 'shipToAddress2', mapping:'shipToAddress2',type: 'string'},
 		{name: 'shipToAddress3', mapping:'shipToAddress3',type: 'string'},
 		{name: 'shipToCity', mapping:'shipToCity',type: 'string'},
 		{name: 'shipToState', mapping:'shipToState',type: 'string'},
 		{name: 'shipToZip', mapping:'shipToZip',type: 'string'},
 		{name: 'shipToCountry', mapping:'shipToCountry',type: 'string'},
 		{name: 'shipToTelephone', mapping:'shipToTelephone',type: 'string'},
 		{name: 'shipToFax', mapping:'shipToFax',type: 'string'},
 		{name: 'shipToEmail', mapping:'shipToEmail',type: 'string'},
 		{name: 'billToCustomer', mapping:'billToCustomer',type: 'string'},
 		{name: 'billToContact', mapping:'billToContact',type: 'string'},
 		{name: 'billToAddress1', mapping:'billToAddress1',type: 'string'},
 		{name: 'billToAddress2', mapping:'billToAddress2',type: 'string'},
 		{name: 'billToAddress3', mapping:'billToAddress3',type: 'string'},
 		{name: 'billToCity', mapping:'billToCity',type: 'string'},
 		{name: 'billToState', mapping:'billToState',type: 'string'},
 		{name: 'billToZip', mapping:'billToZip',type: 'string'},
 		{name: 'billToCountry', mapping:'billToCountry',type: 'string'},
 		{name: 'billToTelephone', mapping:'billToTelephone',type: 'string'},
 		{name: 'billToFax', mapping:'billToFax',type: 'string'},
 		{name: 'requestedDeliveryDate',type: 'date'},
 		{name: 'shippingMethod', mapping:'shippingMethod',type: 'string'},
 		{name: 'specialInstruction', mapping:'specialInstruction',type: 'string'},
 		{name: 'orderReceivedDate', mapping:'orderReceivedDate',type: 'string'},
 		{name: 'soldTORBONumber', mapping:'soldTORBONumber',type: 'string'},
 		{name: 'oracleBillToSiteNumber', mapping:'oracleBillToSiteNumber',type: 'string'},
 		{name: 'oracleShipToSiteNumber', mapping:'oracleShipToSiteNumber',type: 'string'},
 		{name: 'retailerPO_CustomerJob', mapping:'retailerPO_CustomerJob',type: 'string'},
 		{name: 'averyItemNumber', mapping:'averyItemNumber',type: 'string'},
 		{name: 'oracleItemNumber', mapping:'oracleItemNumber',type: 'string'},
 		{name: 'customerItemNumber', mapping:'customerItemNumber',type: 'string'},
 		{name: 'itemDescription', mapping:'ModelserialNumber',type: 'string'},
 		{name: 'customerColorCode', mapping:'customerColorCode',type: 'string'},
 		{name: 'customerSize', mapping:'customerSize',type: 'string'},
 		{name: 'customerUnitPrice', mapping:'customerUnitPrice',type: 'string'},
 		{name: 'customerCost', mapping:'customerCost',type: 'string'},
 		{name: 'contractNumber', mapping:'contractNumber',type: 'string'},
 		{name: 'styleNo', mapping:'styleNo',type: 'string'},
 		{name: 'customerItemNumber1', mapping:'customerItemNumber1',type: 'string'},
 		{name: 'customerItemNumber2', mapping:'customerItemNumber2',type: 'string'},
 		{name: 'customerSeason', mapping:'customerSeason',type: 'string'},
 		{name: 'customerUOM', mapping:'customerUOM',type: 'string'},
 		{name: 'customerOrderedQty', mapping:'customerOrderedQty',type: 'string'},
 		{name: 'calculatedOrderdedQty', mapping:'calculatedOrderdedQty',type: 'string'},
 		{name: 'orderDate', mapping:'orderDate',type: 'string'},
 		{name: 'customerRequestDate', mapping:'customerRequestDate',type: 'string'},
 		{name: 'promiseDate',type: 'date'},
 		{name: 'freightTerms', mapping:'freightTerms',type: 'string'},
 		{name: 'csr', mapping:'csr',type: 'string'},
 		{name: 'comment', mapping:'comment',type: 'string'},
 		{name: 'packingInstruction', mapping:'packingInstruction',type: 'string'},
 		{name: 'shippingInstructions', mapping:'shippingInstructions',type: 'string'},
 		{name: 'invoicelineInstruction', mapping:'invoicelineInstruction',type: 'string'},
 		{name: 'divisionForInterfaceERPORG', mapping:'divisionForInterfaceERPORG',type: 'string'},
 		{name: 'artWorkhold'},
 		{name: 'artworkAttachment'},
 		{name: 'variableDataBreakdown',type: 'string'},
 		{name: 'manufacturingNotes', type: 'string'},
 		{name: 'orderType', type: 'string'},
 		{name: 'orderBy', type: 'string'},
 		{name: 'endCustomer', type: 'string'},
 		
 		//{name: 'shippingonlynotes', mapping:'shippingonlynotes',type: 'string'},
 		
 		{name: 'bankCharge', mapping:'bankCharge',type: 'number'},
 		{name: 'freightCharge', mapping:'freightCharge',type: 'number'},
 		{name: 'shippingHold'},
 		{name: 'productionHold'},
 		{name: 'splitShipset', mapping:'splitShipset',type: 'string'},
 		{name: 'agreement', mapping:'agreement',type: 'string'},
 		{name: 'modelSerialNumber', mapping:'modelSerialNumber',type: 'string'},
 		{name: 'waiveMOQ', mapping:'waiveMOQ',type: 'boolean'},
 		{name: 'apoType', mapping:'apoType',type: 'string'},
 		{name: 'sentToOracleDate', mapping:'sentToOracleDate',type: 'string'},
 		{name: 'status', type: 'string'},
 		{name: 'duplicatePOFlag', type: 'string'},
 		{name: 'customerPOFlag', type: 'string'},
 		{name: 'bulkSampleValidationFlag', type: 'string'},
 		{name: 'moqValidationFlag', type: 'string'},
 		{name: 'atoValidationFlag', type: 'string'},
 		{name: 'mandatoryVariableDataFieldFlag', type: 'string'},
 		{name: 'htlSizePageValidationFlag', type: 'string'},
 		{name: 'orderLineDetail'},
 		{name: 'bulk'},
 		{name: 'mandatory', type: 'string'},
 		{name: 'roundQty', type: 'string'},
 		{name: 'moqDiffQty', type: 'string'},
 		{name: 'updateMOQ', type: 'string'},
 		{name: 'additionalLabelInternalItem', type:'string'},
 		{name: 'productionLine',type:'string'},
 		{name: 'qtyUnit', type:'string'},
 		{name: 'region', type:'string'},
 		{name: 'remark', type:'string'},
 		{name: 'reviseOrderFlag', type:'string'},
 		{name: 'shipMark', type:'string'},
 		{name: 'billToEmail', type:'string'},
 		{name: 'sortingId', type: 'int'}
     ]
});