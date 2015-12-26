Ext.define('AOC.view.partner.PartnerManagement', {
	extend : 'Ext.panel.Panel',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.partner.PartnerManagementGrid'],
	alias : 'widget.partnermanagement',
	itemId : 'partnermanagementitemId',
	initComponent : function() {
		Ext.apply(this, {
			layout :'fit', 
			border:'4 4 4 4',	
			items : [ {
    			xtype : 'panel',
    			flex : 1.8,
    			layout:'card',
				itemId:'partnerPanel',
				collapsible :false,
				activeItem: 0,
				hidden:false,
    			items:[{
    				xtype:'partnermanagementgrid',
					CartId:1
    			},
    			{
    				xtype:'partnerproductlinegrid',
					CartId:1,
					itemId: 'partnerproductlinegriditemId'
					
    			}
    			]
    		}],
			dockedItems: [{
			    xtype: 'basetoolbar',
			    dock: 'top',
			    title:'',
			    items: [{
			    		  xtype : 'tbtext',
			    		  text : '<div style="color:"><b></b></div>',
			    		  itemId:'partnertitleItemid'
			    		},
			    	    {
				        	  xtype:'displayfield',
				        	  itemId:'advanceSearchField',
				        	  flex:1,
				        	  style:
				        	         'text-align: center;'
				        	        ,
				        	        labelStyle: "font-size:8px;"
				        	  
				          }]
			}]
	 	});
	 	this.callParent(arguments);
	}
});
