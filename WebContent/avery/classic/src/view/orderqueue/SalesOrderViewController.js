Ext.define('AOC.view.orderqueue.SalesOrderViewController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.salesorder',
    requires : ['AOC.model.VariableHeaderModel'],
    backButton:function(){
    	var panel=Ext.ComponentQuery.query('#orderQueueViewItemId')[0];
    	var activeIndex = panel.items.indexOf(this.getView());
        panel.getLayout().setActiveItem(parseInt(activeIndex)-1);
        this.getView().destroy();
    }
});