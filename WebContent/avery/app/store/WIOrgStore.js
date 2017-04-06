Ext.define('AOC.store.WIOrgStore', {
	extend : 'Ext.data.Store',
	fields:['billToCode', 'freightTerm','orgName', 'shipToCode', 'shippingInstruction', 
        'shippingMethod', 'siteName', 'systemName'
    ],
	autoLoad:false,
	proxy: {
        type: 'rest',
        url : applicationContext+ '/rest/wiorg',
        reader: {
            type: 'json'
            //rootProperty : 'items'
        }
    }
});
