Ext.define('AOC.view.home.HomePageWrapper', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.homepagewrapper',
	layout: {
        type: 'fit'
    },
	initComponent : function() {
		Ext.apply(this, {
			items:this.buildItems()	
		});
		this.callParent(arguments);
	},
	buildItems:function(){
	    return [
            {
            	xtype:'orderqueuestatuslist',
            	reference:'orderQueueStatusList'
            }
        ];
	}
});