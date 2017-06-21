/**
 * Created By Amit Kumar 
 *
 */
Ext.define('AOC.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
       
    },
    onTabChange:function(tabPanel, newCard, oldCard){
    	this.selectTabPanelView(tabPanel.getActiveTab());
    },
    onTabRenderer:function(tabpanel){
    	//to do hide tab dynamically
    },
    onTabClick:function(tab, b){
    	this.selectTabPanelView(tab.initialConfig.card);
    },
    selectTabPanelView:function(tab){
    	var me = this,
    		tabPanel = me.getView(),
    		refs = tabPanel.getReferences(),
//			activeTab = tabPanel.getActiveTab(),
    		listType = tab.listType;
	
		switch(listType){
			case 'orderQueueStatusList':
				break;
			case 'webOrderView':
				var webOrderView = refs[listType];
	            Helper.resetWebOrderForm(webOrderView);
	            webOrderView.down('#backButtonimage').hide();
	            webOrderView.updateHeaderLabel(newWebOrder);
		            break;
			default:
				var gridView = refs[listType],
	            clearAdvSarchBtn = gridView.down('#clearadvanedsearch'),
	            store = gridView.getStore();
	
	        clearAdvSarchBtn.isVisible() ? clearAdvSarchBtn.hide() : '';
	        store.clearFilter(true);
	        store.load();
	        break;
		}
    }
});
