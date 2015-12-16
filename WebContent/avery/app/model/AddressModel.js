Ext.define('AOC.model.AddressModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
        {name: 'ID', mapping:'ID',type: 'string'},
        {name: 'partner_id', mapping:'partner.id',type: 'string'},
		{name: 'orgCode', mapping:'orgCode',type: 'string'},
		{name: 'partnerName', mapping:'partner.partnerName',type: 'string'},
		{name: 'billToSiteNumber', mapping:'billToSiteNumber',type: 'string'},
		{name: 'shipToSiteNumber', mapping:'shipToSiteNumber',type: 'string'},
		{name: 'description', mapping:'description',type: 'string'},
		{name: 'address1', mapping:'address1',type: 'string'},
		{name: 'address2', mapping:'address2',type: 'string'},
		{name: 'address3', mapping:'address3',type: 'string'},
		{name: 'address4', mapping:'address4',type: 'string'},
		{
		    name: 'address',
		    type: 'string',
		    convert: function( v, record ) {
		       return record.get( 'address1' ) + ' ' + record.get( 'address2' )+' '+record.get( 'address3' ) + ' ' + record.get( 'address4' )
		    }
		},
		{name: 'city', mapping:'city',type: 'string'},
		{name: 'state', mapping:'state',type: 'string'},
		{name: 'country', mapping:'country',type: 'string'},
		{name: 'zip', mapping:'zip',type: 'string'},
		{name: 'billToContact', mapping:'billToContact',type: 'string'},
		{name: 'billToPhone1', mapping:'billToPhone1',type: 'string'},
		{name: 'billToPhone2', mapping:'billToPhone2',type: 'string'},
		{name: 'billToFax', mapping:'billToFax',type: 'string'},
		{name: 'billToEmail', mapping:'billToEmail',type: 'string'},
		{name: 'shipToContact', mapping:'shipToContact',type: 'string'},
		{name: 'shipToPhone1', mapping:'shipToPhone1',type: 'string'},
		{name: 'shipToPhone2', mapping:'shipToPhone2',type: 'string'},
		{name: 'shippingMethod', mapping:'shippingMethod',type: 'string'},
		{name: 'freightTerms', mapping:'freightTerms',type: 'string'},
		{name: 'shippingInstructions', mapping:'shippingInstructions',type: 'string'},
		{name: 'siteNumber', mapping:'siteNumber',type: 'string'},
		{name: 'contact', mapping:'contact',type: 'string'},
		{name: 'phone1', mapping:'phone1',type: 'string'},
		{name: 'phone2', mapping:'phone2',type: 'string'},
		{name: 'fax', mapping:'fax',type: 'string'},
		{name: 'email', mapping:'email',type: 'string'},
		{name: 'siteType', mapping:'siteType',type: 'string'}
	    ]
});

