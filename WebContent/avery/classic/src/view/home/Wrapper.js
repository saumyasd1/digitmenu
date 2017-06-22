Ext.define('AOC.view.home.Wrapper', {
	extend : 'Ext.Container',
	alias : 'widget.homewrapper',
	controller:'homewrappercontroller',
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
        ]
	}
});