Ext.define('AOC.view.Canwas',{
	extend:'Ext.panel.Panel',
	alias:'widget.canwas',
	requires : [
	    'AOC.view.Main',
	    'AOC.view.MainMenu'
    ],
    
    layout:{
    	type: 'border'
	},
	bodyStyle:'background-color: rgb(246, 246, 246);',
	initComponent : function(){
		this.items = this.buildItems();
    	this.callParent(arguments);
    },
    
    buildItems:function(){
    	return [
	        {
				 xtype:'mainmenu',
				 region:'north',
				 style  : AOC.config.Settings.getBaseBackgroundColor(),
				 height:60
	    	},
	    	{
	    	    xtype:'maincontainer' ,
	    	    margin:'0 10 10 10',
	    	    region:'center',
	    	    style:{"background-color": "#fff;","border-radius":"5px",'border':'solid 1px #ccc'}
	    	}
    	]
    }
});
