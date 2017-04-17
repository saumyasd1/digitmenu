Ext.define('AOC.store.WISystemStore', {
	extend : 'Ext.data.Store',
	fields:['artWorkHold','csrName','defaultOrg','invoiceLineInstruction','manufacturing', 'packingInstruction',
        'shipMark','splitByShipSet', 'systemName','variableDataBreakdown','defaultSelected'
    ],
	autoLoad:false,
	proxy: {
        type: 'rest',
        url : applicationContext+ '/rest/wisystem/system',
        reader: {
            type: 'json',
            rootProperty: 'system'
        }
    }
});

