Ext.define('AOC.config.MenuInstructions', {
	singleton : true,
	config : {
		OrderQueueScreen : {
			tab : 'AOC APP',
			controller : 'MenuController',
			fnc : 'loadOrderQueueScreen'
		},
		Home : {
			tab : 'AOC APP',
			controller : 'MenuController',
			fnc : 'loadHomePage'
		},
		EmailManagement : {
			tab : 'AOC APP',
			controller : 'MenuController',
			fnc : 'loadEmailManagement'
		},
		TaskManager : {
			tab : 'AOC APP',
			controller : 'MenuController',
			fnc : 'loadTaskManager'
		},
		PartnerManagement : {
			tab : 'AOC APP',
			controller : 'MenuController',
			fnc : 'loadPartnerManagement'
		},
		WebFormScreen : {
			tab : 'AOC APP',
			controller : 'MenuController',
			fnc : 'loadWebFormScreen'
		},
		AddressManage : {
			tab : 'AOC APP',
			controller : 'MenuController',
			fnc : 'loadAddressManage'
		},
		ArchiveScreen : {
			tab : 'AOC APP',
			controller : 'MenuController',
			fnc : 'loadArchiveManage'
		},
		TaskManager : {
			tab : 'AOC APP',
			controller : 'MenuController',
			fnc : 'loadTaskManager'
		}
},
	constructor : function(config) {
		this.initConfig(config);
	}
});