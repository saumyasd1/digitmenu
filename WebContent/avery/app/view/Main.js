Ext.define('AOC.view.Main',{
	extend:'Ext.Container',
	alias:'widget.maincontainer',
	requires : ['AOC.view.home.Wrapper',
	            'AOC.view.ToolbarView',
	            'AOC.view.orderqueue.OrderQueueView',
	            'AOC.view.partner.PartnerManagement',
	            'AOC.view.address.AddressManage',
	            'AOC.view.webform.WebOrderView',
	            'AOC.view.archive.ArchiveManage'],
	initComponent : function(){
    	var me=this;
    	this.fieldArray = [],
            Ext.apply(this,{
                items:this.buildItem(),
                layout: {
                	type: 'card',
                	deferredRender : true
                	},
                	activeItem : 0
            });
            this.callParent(arguments);
        },
        buildItem:function(){
        	var me=this;
        	return [   
        	           {
        	              xtype : 'homewrapper'
        	           },{
		    	     xtype : 'orderqueueview' 
		           },{
			       xtype : 'partnermanagement'
			   },{
			       xtype : 'addressmanage'
			   },{
			       xtype : 'weborderview'
			   },{
			       xtype : 'archivemanage'
			   }
			   ]
                 }
		});
