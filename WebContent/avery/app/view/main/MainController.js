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
//    	var userInfo = AOCRuntime.getUser(),
//    		roleId = userInfo.role,
//    		webOrderTab = tabpanel.child('#webOrder').tab;
//    	
//    	if(roleId == AOCLit.userRole.superAdmin){
//    		webOrderTab.hide();
//    	}else{
//    		webOrderTab.show();
//    	}
    	//to do hide tab dynamically
    },
    onTabClick:function(tab, b){
    	this.selectTabPanelView(tab.initialConfig.card);
    },
    selectTabPanelView:function(tab){
    	var me = this,
    		tabPanel = me.getView(),
    		refs = tabPanel.getReferences(),
    		listType = tab.listType;
	
		switch(listType){
			case 'orderQueueStatusList':
				var orderQueueStatusListRefs = refs['homewrapper'].getReferences().orderQueueStatusList.getReferences(),
					siteCombo = orderQueueStatusListRefs.siteCombo,
					csrCombo = orderQueueStatusListRefs.csrCombo;
				
				if(AOCRuntime.getUser().role == AOCLit.userRole.superAdmin){
					siteCombo.setValue('All');
				}
				csrCombo.setValue('All');
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
