Ext.define('PowerPay.view.base.BaseWindow', {
    extend: 'Ext.window.Window',
    alias : 'widget.basewindow',
    modal : true,
    cls : 'panelpopWindow',
    closable:false,
    closeAction:'destroy',
    draggable: true,
    maximizable:false,
    autoScroll:true,
    margin: '0 0 0 0' ,
    ghost:false,
    
    initComponent : function(){
    	var me=this;
        Ext.apply(this,{
            header : this.buildHeader(this)
        });
        this.dockedItems = [this.header];
        this.callParent(arguments);
    },
    buildHeader : function(me){
        return Ext.create('Ext.panel.Header',{
            height : 30,
            isHeader : true,
            dock : 'top',
            dreagable:true,
            title :'<b>'+ this.title+'</b>',
            bodyCls:'panelpopWindow'
        });
    }

});