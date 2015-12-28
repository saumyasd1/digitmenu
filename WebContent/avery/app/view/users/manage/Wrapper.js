Ext.define('AOC.view.users.manage.Wrapper', {
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
	           cls : 'top-toolbar-border',
	           height: 63
	        },{
	            
	        }]
    }
});