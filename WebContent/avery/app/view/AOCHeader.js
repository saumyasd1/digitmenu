Ext.define('AOC.view.AOCHeader',{
    extend : 'Ext.form.Panel',
    alias : 'widget.aocheader',
    height : 60,
    layout: 'fit',
    cls : 'intake-header',
    requires : ['AOC.config.Settings'],
    initComponent : function(){
	var settings = AOC.config.Settings;
	var userName="aoc_user";
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
		         html:'<div style="width:100%;text-align:center;color:#d4d4d4;font-size:30px;font-weight:500;line-height: 60px;">|</div>' 
        	     },{
		         xtype:'component',
		         height:60,
		         html:'<div style="width:100%;text-align:center;font-size:18px;font-weight:500;line-height: 60px;">Accelerated Order Capture</div>'
		              
        	     },{
        		 xtype:'component',
        		 flex:1
        	     },{
                         xtype: 'image',
                         src: settings.buttonIcons.notification,
                         margin:'25 20 25 0',
                         width:15,
    		         height:15
            	     },{
                         xtype: 'image',
                         src: settings.buttonIcons.settings,
                         margin:'25 20 25 0',
                         width:15,
    		         height:15
            	     },{
                         xtype: 'image',
                         src: settings.buttonIcons.logoImage,
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
		         html:'<div style="width:100%;text-align:center;font-size:12px;font-weight:500;line-height: 60px;">'+userName+'</div>'
        	     },{
                         xtype: 'image',
                         src: settings.buttonIcons.arrowDown,
                         event:'clickprofilemenu',
                         margin:'22 20 22 0',
                         cls:'heading-actions-icon',
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
            delegate : '.heading-actions-icon',
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
    }
});