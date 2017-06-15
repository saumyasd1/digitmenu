Ext.define('AOC.view.base.BaseWindow', {
    extend: 'Ext.window.Window',
    alias : 'widget.basewindow',
    modal : true,
    closable:true,
    closeAction:'destroy',
    draggable: true,
    maximizable:false,
    //autoScroll:true,
    shadow:false,
    margin: '0 10 0 10' ,
    ghost:false,
    
    initComponent : function(){
    	var me=this;
        Ext.apply(this,{
            header : true
        });
        this.callParent(arguments);
    },
    buildHeader : function(me){
        return Ext.create('Ext.panel.Header',{
            height : 30,
            isHeader : true,
            dock : 'top',
            dreagable:true,
            items:[{
            	xtype:'image',
            	value:'asjas'
            }]
        });
    }

});