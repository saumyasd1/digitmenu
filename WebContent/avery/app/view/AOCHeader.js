Ext.define('AOC.view.AOCHeader',{
    extend : 'Ext.Container',
    alias : 'widget.aocheader',
    height : 60,
    cls : 'aoc-header',
    requires : ['AOC.config.Settings'],
    initComponent : function(){
	var settings = AOC.config.Settings,
	 runtime = AOC.config.Runtime,
	 username ="",
	 userInfo =runtime.getUser();
	if(!Ext.isEmpty(userInfo)){
	    username = userInfo.firstName;
	    username = (!Ext.isEmpty(userInfo.lastName))?username+' '+userInfo.lastName:username;
	    }
        Ext.apply(this,{
        	layout: {
            	type: 'hbox'
            	},
        	items:[
                     {
                     xtype: 'image',
                     src: settings.buttonIcons.logoImage,
                     width:60,
		             height:60
        	     },{
        		 xtype:'component',
		         height:60,
		         width:30,
		         html:'<div class="header-pipe-icon">|</div>' 
        	     },{
		         xtype:'component',
		         height:60,
		         html:'<div class="header-right-text">Accelerated Order Capture</div>'
		              
        	     },{
        		 xtype:'component',
        		 flex:1
        	     },
            	     {
                         xtype: 'image',
                         src: settings.buttonIcons.defaultUserImg,
                         border:true,
                         style:{"border-radius":"50%","border": "1px solid #d4d4d4;"},
                         margin:'10 0 10 0',
                         width:40,
    		         height:40
            	     },
            	     {
		         xtype:'component',
		         height:60,
		         margin:'0 5 0 5',
		         itemId:'userName',
		         event:'clickprofilemenu',
		         html:'<div class="header-user-name-text">'+username+'</div>'
        	     },{
                         xtype: 'image',
                         src: settings.buttonIcons.arrowDown,
                         event:'clickprofilemenu',
                         margin:'22 20 22 0',
                         cls:'header-profile-menu-icon',
                         width:15,
    		         height:15
        	     }
        	     ]
        });
        this.callParent(arguments);
    },
    onRender : function(){
        var me = this;
        me.callParent(arguments);
        me.el.on({
            scope    : me,
            delegate : '.header-profile-menu-icon',
            click    : me.onClickActionIcon
        });
    },
    onClickActionIcon : function(e,element){
        var me   = this,
            elId = Ext.get(element).id,
            cmp =  Ext.getCmp(elId);

        if (cmp && !Ext.isEmpty(cmp.event)){
            me.fireEvent(cmp.event,element);
        }
    },
    updateUserName:function(userName){
    var me=this,
    cmp = me.down('#userName');
    cmp.update('<div class="header-user-name-text">'+userName+'</div>')
    }
});