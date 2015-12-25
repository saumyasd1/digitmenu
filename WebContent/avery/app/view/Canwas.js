Ext.define('AOC.view.Canwas',{
	extend:'Ext.Container',
	alias:'widget.canwas',
	requires : [
	            'AOC.view.Main',
	            'AOC.view.MainMenu'
	            ],
	initComponent : function(){
    	var me=this;
    	this.fieldArray = [],
            Ext.apply(this,{
                items:this.buildItem(),
                layout: {
                	type: 'vbox',
                	align: 'strech',
                	pack: 'left'
                	}
            });
            this.callParent(arguments);
        },
        buildItem:function(){
        	var me=this;
        	return [{
        	 xtype:'mainmenu',
        	 width:'100%',
        	 style  : AOC.config.Settings.getBaseBackgroundColor(),
        	 height:60
        	},{
        	    xtype:'maincontainer' ,
        	    margin:'0 20 0 20',
        	    width:'100%',
        	    flex:1,
        	    style:{"background-color": "#ffffff;","border-radius":"10px"}
        	},{
        	 xtype:'container',
        	 width:'100%',
        	 style  : AOC.config.Settings.getBaseBackgroundColor(),
        	 height:20
        	}]
        }
	});
