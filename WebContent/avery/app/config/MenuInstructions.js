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
		PartnerManagement : {
			tab : 'PowerPay APP',
			controller : 'MenuController',
			fnc : 'loadPartnerManagement'
		},
		WebFormScreen : {
			tab : 'AOC APP',
			controller : 'MenuController',
			fnc : 'loadWebFormScreen'
		},
		AddressManage : {
			tab : 'PowerPay APP',
			controller : 'MenuController',
			fnc : 'loadAddressManage'
		}
},
	constructor : function(config) {
		this.initConfig(config);
	}
});