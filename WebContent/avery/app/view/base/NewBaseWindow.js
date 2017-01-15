Ext.define('AOC.view.base.NewBaseWindow', {
    extend: 'Ext.window.Window',
    alias : 'widget.newbasewindow',
    modal : true,
    closable:true,
    closeAction:'destroy',
    draggable: true,
    maximizable:false,
    ghost:false,

	constrainHeader:true,
	constrain:true,
    
    cls:'aoc-win',
    titleAlign:'center',

	style: 'background: #FFFFFF !important;border: 1px solid #ccc;',
    
    initComponent : function(){
        this.callParent(arguments);
    }
});