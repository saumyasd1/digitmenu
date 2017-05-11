Ext.define('AOC.view.Main',{
	extend:'Ext.panel.Panel',
	alias:'widget.maincontainer',
	requires : [
        'AOC.view.home.Wrapper',
        'AOC.view.ToolbarView',
        'AOC.view.orderqueue.OrderQueueView',
        'AOC.view.partner.PartnerManagement',
        'AOC.view.email.EmailManagement',
        'AOC.view.address.AddressManage',
        'AOC.view.webform.WebOrderView',
        'AOC.view.archive.ArchiveManage',
        'AOC.view.users.myprofile.Wrapper',
        'AOC.view.users.manage.User',
    ],
    layout: {
    	type: 'card',
    	deferredRender : true
	},
	activeItem : 0,
	
	initComponent : function(){
		this.items = this.buildItems();
    	this.callParent(arguments);
    },
    
    buildItems:function(){
    	return [   
		   {
			   xtype : 'homewrapper'
		   },
		   {
			   xtype:'emailmanagement'
		   },
		   {
			   xtype : 'orderqueueview' 
		   },
		   {
			   xtype : 'partnermanagement'
		   },
		   {
		       xtype : 'addressmanage'
		   },
		   {
		       xtype : 'weborderview'
		   },
		   {
		       xtype : 'archivemanage'
		   },
		   {
		       xtype:'profileinfowrapper'
		   },
		   {
			   xtype:'users'
		   }
	   ]
    }
});
