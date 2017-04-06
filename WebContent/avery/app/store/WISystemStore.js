Ext.define('AOC.store.WISystemStore', {
	extend : 'Ext.data.Store',
	fields:['artWorkHold','csrName','defaultOrg','invoiceLineInstruction','manufacturing', 'packingInstruction',
        'shipMark','splitByShipSet', 'systemName','variableDataBreakdown'
    ],
	autoLoad:false,
	proxy: {
        type: 'rest',
        url : applicationContext+ '/rest/wisystem',
        reader: {
            type: 'json'
        }
    }
});

