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
					itemId: 'partnerproductlinegriditemId',
					//isGridEditable:true
    			}
    			]
    		}],
			dockedItems: [{
			    xtype: 'basetoolbar',
			    dock: 'top',
			    title:'Partner Mangement',
			    items: [{
			    		  xtype : 'tbtext',
			    		  text : '<div style="color:"><b>Partner Mangement</b></div>',
			    		  itemId:'partnertitleItemid'
			    		},
			    	    {
				        	  xtype:'displayfield',
				        	  itemId:'advanceSearchField',
				        	  flex:1,
				        	  style:
				        	         'text-align: center;'
				        	        ,
				        	        labelStyle: "font-size:8px;",
				        	  //defaultValue:'<font color="black" size:1px > <b>Showing Partner Information. Please try Advance search for better options. '/*from '+ (Ext.Date.format(new Date(),'m-d-Y')) +' to ' +(Ext.Date.format(new Date(),'m-d-Y'))*/+'</b><font>',
				        	 // value:'<font color="black" size:1px > <b>Showing Partner Information. Please try Advance search for better options. '/*from '+ (Ext.Date.format(new Date(),'m-d-Y')) +' to ' +(Ext.Date.format(new Date(),'m-d-Y'))*/+'</b><font>'
				          }]
			}]
	 	});
	 	this.callParent(arguments);
	}
});
