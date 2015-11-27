Ext.define('AOC.view.AOCHeader',{
    extend : 'Ext.form.Panel',
    alias : 'widget.aocheader',
    height : 60,
    layout: 'fit',
    cls : 'intake-header',
    requires : ['AOC.config.Settings'],
    initComponent : function(){
        Ext.apply(this,{
        	layout: {
            	type: 'hbox'
            	},
        	//items:this.buildItem(),
        	items:[
                     {
				        	           xtype: 'image',
				       	               src: 'avery/resources/images/aoc-header.png',
				       	               width:1300,
				       	               height:60
        	        },
        	              {
        	               xtype: 'button',
        	               icon: 'avery/resources/images/logout.png',
        	               margin:'20 0 0 0',
       		  	    	   menu: {
       		  	    	 		   
       		  	    	 		    items: [{
       		  	    	 		        text: 'Logout',
       		  	    	 		        handler:function()
       		  	    			        {
       		  	    	 		  	    var activeCard=Ext.ComponentQuery.query("#viewportitemid")[0];
       		            			    activeCard.getLayout().setActiveItem(0);
       		            			    var login=Ext.ComponentQuery.query("#aocLoginItemId")[0];
       		            			    login.getForm().reset();
       		  	    			        }
       		  	    	 		    }
       		  	    	 		   ]
       		  	    			}
       		  	    	}
        	              ]
        });
        this.callParent(arguments);
    }
});