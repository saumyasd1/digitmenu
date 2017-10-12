Ext.define('AOC.model.BillShipMappingModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
	    {name: 'addressEmailSubject', type: 'string'},
		{name: 'beginendwith',type: 'string'},
		{name: 'keywording', type:'string'},
		{name: 'orgCode', type:'string'},
		{name: 'billToCode', type:'string'},
		{name: 'shipToCode', type:'string'},
		{name: 'shippingMethod', type:'string'},
		{name: 'freightTerm', type:'string'},
		{name: 'packingInstruction', type:'string'},
		{name: 'shippingInstruction', type:'string'},
		{name: 'endCustomer', type:'string'},
		{name: 'manufacturingNote', type:'string'},
		{name: 'csr', type:'string'},
		{name: 'fileName', type:'string'},
		{name: 'filePath', type:'string'},
		{name: 'fileContent', type:'string'},
		
		{name: 'billToAddress', type:'string'},
		{name: 'billToContact', type:'string'},
		{name: 'billToEmail', type:'string'},
		{name: 'billToTelephone', type:'string'},
		{name: 'shipToCode', type:'string'},
		{name: 'shipToAddress', type:'string'},
		{name: 'shipToContact', type:'string'},
		{name: 'shipToEmail', type:'string'},
		{name: 'shipToTelephone', type:'string'},
		{name: 'applyHold', type:'string'}
    ]
});

