Ext.define('AOC.model.OrderLineModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
	fields: [
	         // set up the fields mapping into the xml doc
	         {name: 'createdDate', mapping:'createdDate',type: 'string'},
	 		{name: 'createdBy', mapping:'createdBy',type: 'string'},
	 		{name: 'lastModifiedDate', mapping:'lastModifiedDate',type: 'string'},
	 		{name: 'lastModifiedBy', mapping:'lastModifiedBy',type: 'string'},
	 		{name: 'orderFileAttchmentID', mapping:'orderFileAttchmentID',type: 'string'},
	 		{name: 'partnerID', mapping:'partnerID',type: 'string'},
	 		{name: 'rboID', mapping:'rboID',type: 'string'},
	 		{name: 'productLineType', mapping:'productLineType',type: 'string'},
	 		{name: 'customerPONumber', mapping:'customerPONumber',type: 'string'},
	 		{name: 'poNumber', mapping:'poNumber',type: 'string'},
	 		{name: 'orderedDate', mapping:'orderedDate',type: 'date'},
	 		{name: 'partnerCustomerName', mapping:'partnerCustomerName',type: 'string'},
	 		{name: 'partnerVendorName', mapping:'partnerVendorName',type: 'string'},
	 		{name: 'shipToCustomer', mapping:'shipToCustomer',type: 'string'},
	 		{name: 'shipToContact', mapping:'shipToContact',type: 'string'},
	 		{name: 'shipToAddress1', mapping:'shipToAddress1',type: 'string'},
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
	 		{name: 'requestedDevliveryDate', mapping:'requestedDevliveryDate',type: 'date'},
	 		{name: 'shippingMethod', mapping:'shippingMethod',type: 'string'},
	 		{name: 'specialInstruction', mapping:'specialInstruction',type: 'string'},
	 		{name: 'orderReceivedDate', mapping:'orderReceivedDate',type: 'string'},
	 		{name: 'soldToRBONumber', mapping:'soldToRBONumber',type: 'string'},
	 		{name: 'oracleBillToSiteNumber', mapping:'oracleBilltoSiteNumber',type: 'string'},
	 		{name: 'oracleShipToSiteNumber', mapping:'oracleShiptoSiteNumber',type: 'string'},
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
	 		{name: 'promiseDate', mapping:'promiseDate',type: 'date'},
	 		{name: 'freightTerms', mapping:'freightTerms',type: 'string'},
	 		{name: 'csr', mapping:'csr',type: 'string'},
	 		{name: 'comment', mapping:'comment',type: 'string'},
	 		{name: 'packingInstruction', mapping:'packingInstruction',type: 'string'},
	 		{name: 'shippingInstructions', mapping:'shippingInstructions',type: 'string'},
	 		{name: 'invoicelineInstruction', mapping:'invoicelineInstruction',type: 'string'},
	 		{name: 'divisionForInterfaceERPORG', mapping:'divisionForInterfaceERPORG',type: 'string'},
	 		{name: 'artworkhold', mapping:'artworkhold',type: 'boolean'},
	 		{name: 'artworkworkattachment', mapping:'artworkworkattachment',type: 'boolean'},
	 		{name: 'variableDataBreakdown', mapping:'variableDataBreakdown',type: 'string'},
	 		{name: 'manufacturingNotes', mapping:'manufacturingNotes',type: 'string'},
	 		{name: 'orderType', mapping:'ordertype',type: 'string'},
	 		{name: 'orderBy', mapping:'orderby',type: 'string'},
	 		{name: 'endCustomer', mapping:'endcustomer',type: 'string'},
	 		{name: 'shippingOnlyNotes', mapping:'shippingonlynotes',type: 'string'},
	 		{name: 'bankCharge', mapping:'bankCharge',type: 'number'},
	 		{name: 'freightCharge', mapping:'freightCharge',type: 'number'},
	 		{name: 'shippingHold', mapping:'shippingHold',type: 'boolean'},
	 		{name: 'productionHold', mapping:'productionHold',type: 'boolean'},
	 		{name: 'splitShipset', mapping:'splitShipset',type: 'string'},
	 		{name: 'agreement', mapping:'agreement',type: 'string'},
	 		{name: 'modelSerialNumber', mapping:'modelSerialNumber',type: 'string'},
	 		{name: 'waiveMOQ', mapping:'waiveMOQ',type: 'boolean'},
	 		{name: 'apoType', mapping:'apoType',type: 'string'},
	 		{name: 'sentToOracleDate', mapping:'sentToOracleDate',type: 'string'},
	 		{name: 'status', mapping:'status',type: 'string'},
	 		{name: 'duplicatePOFlag', mapping:'duplicatePOFlag',type: 'string'},
	 		{name: 'customerPOFlag', mapping:'customerPOFlag',type: 'string'},
	 		{name: 'bulkSampleValidationFlag', mapping:'bulkSampleValidationFlag',type: 'string'},
	 		{name: 'moqvalidationFlag', mapping:'moqvalidationFlag',type: 'string'},
	 		{name: 'atovalidationFlag', type: 'string'},
	 		{name: 'mandatoryVariableDataFieldFlag', mapping:'mandatoryVariableDataFieldFlag',type: 'string'},
	 		{name: 'htlsizePageValidationFlag', mapping:'htlsizePageValidationFlag',type: 'string'},
	 		{name: 'listOrderlineDetails', mapping:'listOrderlineDetails'},
	 		{name: 'bulk', mapping:'bulk',type: 'string'},
	 		{name: 'mandatory', mapping:'mandatory',type: 'string'},
	 		{name: 'roundQty', mapping:'roundQty',type: 'string'},
	 		{name: 'moqdiffQty',type: 'string'},
	 		{name: 'updateMOQ', mapping:'updateMOQ',type: 'string'},
	 		{name:'fabricContent', type:'string'},
	 		{name:'reviceOrder', type:'string'},
	 		{name: 'averyATO', mapping:'averyATO', type:'string'},
	 		{name: 'averyBulk', mapping:'averyBulk', type:'string'},
	 		{name: 'averyMOQ', mapping:'averyMOQ', type:'string'},
	 		{name: 'averyProductLineType', mapping:'averyProductLineType', type:'string'},
	 		{name: 'averyRegion', mapping:'averyRegion', type:'string'},
	 		{name: 'averyRoundupQty', mapping:'averyRoundupQty', type:'string'},
	 		{name: 'variableFieldName', mapping:'variableFieldName', type:'string'},
	 		{name:'iconName'},{name:'colorCode'}
	 		
	     ]
});