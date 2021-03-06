Ext.define('AOC.model.PartnerProductLineModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
        // set up the fields mapping into the xml doc
        {name:'id',type:'string'},
	    {name: 'partner.partnerName', mapping:'varPartner.partnerName',type: 'string'},
		{name: 'partnerId', mapping:'varPartner.id',type: 'string'},
		{name: 'rboName', mapping:'rbo.rboName',type: 'string'},
		{name: 'rboId', mapping:'rbo.id',type: 'string'},
		{name: 'productLineType', mapping:'productLineType',type: 'string'},
		{name: 'csrName', mapping:'csrName',type: 'string'},
		{name: 'csrEmail', mapping:'csrEmail',type: 'string'},
		{name: 'csrPrimaryId',mapping:'csrPrimaryId',type:'string'},
		{name: 'csrSecondaryId',mapping:'csrSecondaryId',type:'string'},
		{name: 'orderEmailDomain', mapping:'orderEmailDomain',type: 'string'},
		{name: 'packingInstruction', mapping:'packingInstruction',type: 'string'},
		{name: 'splitShipSetBy', mapping:'splitShipSetBy',type: 'string'},
		{name: 'invoiceLineInstruction', mapping:'invoiceLineInstruction',type: 'string'},
		{name: 'manufacturingNotes', mapping:'manufacturingNotes',type: 'string'},
		{name: 'attachmentMappingName2', mapping:'attachmentMappingName2',type: 'string'},
		{name: 'variableDataBreakdown', mapping:'variableDataBreakdown',type: 'string'},
		{name: 'shippingOnlyNotes', mapping:'shippingOnlyNotes',type: 'string'},
		{name: 'orderSchemaType', mapping:'orderSchemaType',type: 'string'},
		{name: 'orderSchemaID', mapping:'orderSchemaID',type: 'string'},
		{name: 'orderMappingID', mapping:'orderMappingID',type: 'string'},
		{name: 'attachmentRequired', mapping:'attachmentRequired',type: 'boolean'},
		{name: 'attachmentSchemaType_1', mapping:'attachmentSchemaType_1',type: 'string'},
		{name: 'attachmentMappingID_1', mapping:'attachmentMappingID_1',type: 'string'},
		{name: 'attachmentIdentifier_1', mapping:'attachmentIdentifier_1',type: 'string'},
		{name: 'attachmentSchemaID_2', mapping:'attachmentSchemaID_2',type: 'string'},
		{name: 'attachmentSchemaType_2', mapping:'attachmentSchemaType_2',type: 'string'},
		{name: 'attachmentMappingID_2', mapping:'attachmentMappingID_2',type: 'string'},
		{name: 'attachmentIdentifier_2', mapping:'attachmentIdentifier_2',type: 'string'},
		{name: 'attachmentSchemaID_3', mapping:'attachmentSchemaID_3',type: 'string'},
		{name: 'attachmentSchemaType_3', mapping:'attachmentSchemaType_3',type: 'string'},
		{name: 'attachmentMappingID_3', mapping:'attachmentMappingID_3',type: 'string'},
		{name: 'attachmentIdentifier_3', mapping:'attachmentIdentifier_3',type: 'string'},
		{name: 'orderToProcessSchemaID', mapping:'orderToProcessSchemaID',type: 'string'},
		{name: 'orderToProcessMappingID', mapping:'orderToProcessMappingID',type: 'string'},
		{name: 'preProcessPID', mapping:'preProcessPID',type: 'string'},
		{name: 'fiberpercentagecheck',mapping:'fiberpercentagecheck',type:'string'},
		{name: 'llkk',mapping:'llkk',type:'boolean'},
		{name: 'sizeCheck',mapping:'sizeCheck',type:'string'},
		{name: 'localBilling',mapping:'localBilling',type:'boolean'},
		{name: 'shipmentSample',mapping:'shipmentSample',type:'boolean'},
		{name: 'factoryTransfer',mapping:'factoryTransfer',type:'boolean'},
		{name: 'lastModifiedBy', mapping:'lastModifiedBy',type: 'string'},
		{name:'lastModifiedDate',mapping:'lastModifiedDate',type:'string'},
		{name:'siteName',mapping:'siteName',type:'string'}
	]
});

