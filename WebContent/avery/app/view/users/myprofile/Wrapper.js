Ext.define('AOC.view.users.myprofile.Wrapper', {
    extend : 'Ext.Container',
    alias  : 'widget.profileinfowrapper',
    requires : ['AOC.view.users.myprofile.UserEdit',
                'AOC.view.users.myprofile.UserInfo',
                'AOC.view.users.myprofile.ChangePassword',
                'AOC.view.users.myprofile.Toolbar'
                ],
                layout: {
	            type: 'vbox',
	            align: 'stretch'
	   },   
    rec :null,      
    initComponent : function(){
              var me = this;
              Ext.apply(me,{
                  items : me.buildItems()
              });
              me.callParent(arguments);
    },
    buildItems : function(){
        var me = this;
    return  [
	        {
	           xtype : 'profiletoolbar',
	           itemId: 'toptoolbar',
	           cls : 'top-toolbar-border',
	           height: 63
	        },{
	        xtype      : 'container',
	        itemId     : 'mainprofilewrapper',
	        layout     : 'card',
	        flex:1,
	        activeItem : 0,
    	        items      : [{
    	            xtype : 'userinfo'
    	        },{
    	            xtype : 'useredit'
    	        },{
    	            xtype : 'changepassword'
    	        }]
	    
	   },
	   {
	    xtype : 'profiletoolbar',
	    itemId: 'bottomtoolbar',
	    cls : 'bottom-toolbar-border',
	    height: 63
	   }]
    }
});