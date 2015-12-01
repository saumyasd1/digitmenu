Ext.define('AOC.model.PartnerProductLineModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
        // set up the fields mapping into the xml doc
	    {name: 'partner.partnerName', mapping:'partner.partnerName',type: 'string'},
		{name: 'rboName', mapping:'rboName',type: 'string'},
		{name: 'productLineType', mapping:'productLineType',type: 'string'},
		{name: 'csrName', mapping:'csrName',type: 'string'},
		{name: 'csrEmail', mapping:'csrEmail',type: 'string'},
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
		{name: 'attachmentRequired', mapping:'attachmentRequired',type: 'string'},
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
		{name: 'orderToProcessMappingID', mapping:'orderToProcessMappingID',type: 'string'}
			    ]
});

