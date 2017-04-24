Ext.define('AOC.model.WIBillShipMappingModel',{
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
		{name: 'csr', type:'string'}
    ]
});

