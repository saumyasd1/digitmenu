Ext.define('AOC.view.home.Wrapper', {
	extend : 'Ext.Container',
	alias : 'widget.homewrapper',
	//requires:['AOC.view.home.HomePageOrderList'],
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
            	xtype:'orderqueuestatuslist'
            }
        ]
	}
});