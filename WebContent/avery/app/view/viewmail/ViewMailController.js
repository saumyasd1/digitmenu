Ext.define('AOC.view.viewmail.ViewMailController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.viewMailController',
  
    runTime : AOC.config.Runtime,
    onClickMenu: function(obj, rowIndex, colIndex, item, e, record) {
        var me = this;
        var callout = Ext.widget('callout', {
            cls: 'white more-menu-item-callout extra',
            html: me.buildMenuTpl.apply("{}"),
            target: e.target,
            calloutArrowLocation: 'top-left',
            relativePosition: 't-b',
            relativeOffsets: [52, 23],
            dismissDelay: 0,
            listeners: {
            	afterrender: me.onAfterRenderEditCallout,
            	    disregard: function(cmp) {}
            }
        });
        //Adding functionality related to Menu item visibility(KKaY)
        callout.show();
        var heightAbove = e.getY() - Ext.getBody().getScroll().top,
        heightBelow = Ext.Element.getViewportHeight() - heightAbove;
  	    if(heightBelow<(callout.getHeight()+40)){
  		  callout.calloutArrowLocation='bottom-left'; 
  		  callout.relativePosition='b-t';
  		  callout.relativeOffsets = [75, 0];
  	  }else{
  		  callout.calloutArrowLocation='top-left'; 
  		  callout.relativePosition='t-b';
  		callout.relativeOffsets = [75, 5];
  	  }
        callout.show();
    },
    onAfterRenderEditCallout: function(cmp) {
        var me = this;
        cmp.el.on({
            delegate: 'div.user-profile-menu-item',
            click: function(e, element) {
                var el = Ext.get(element),
                    event = el.getAttribute('event');
                if (event && !el.hasCls('edit-menu-disabled')) {
                    me.fireEvent(event);
                }
            }
        });
    },
    buildMenuTpl: function() {
        var me = this;
        return Ext.create('Ext.XTemplate',
            '<div style="width: 180px !important;border-bottom: none !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="disregard"">Disregard</div>',
            '</tpl>'
        );
    },
    backButton:function()
     {
    	   var owner = this.getView().ownerCt;
    	   if(owner.itemId=='emailPanel'){  		   
    	   var panel=Ext.ComponentQuery.query('#emailPanel')[0];
  	       var emailManagement=panel.down('#EmailMangementitemId');
  	       panel.getLayout().setActiveItem(emailManagement);
  	       emailManagement.getView().refresh();
  	       emailManagement.getStore().load();
  	       }
    	   else if(owner.itemId=='taskManagerPanel'){  		   
        	   var panel=Ext.ComponentQuery.query('#taskManagerPanel')[0];
      	       var taskManager=panel.down('#TaskManagerGriditemId');
      	       panel.getLayout().setActiveItem(taskManager);
      	       taskManager.getView().refresh();	
      	       taskManager.getStore().load();
      	       }
  	}
    
    
});
