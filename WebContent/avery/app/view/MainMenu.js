Ext.define('AOC.view.MainMenu',{
    extend: 'Ext.view.View',
    alias: 'widget.mainmenu',
	store:'Sections',
	cls:'main-menu-list',
	itemSelector: 'div.section-wrap',
	selectedItemCls: 'section-wrap-selected',
	overItemCls: 'section-over',
    initComponent : function(){
        var me = this;
		this.tpl = me.buildMarkup();
        
        me.navigationModel.focusCls='section-focus';
        me.callParent(arguments);
        me.on({
            itemclick: me.onItemClickMenu,
            refresh:me.selectFirst
        });
    },
    buildMarkup : function(){
        return Ext.create('Ext.XTemplate',
			'<tpl for=".">',
				'<div  class="section-wrap">',
					'<div class="section-wrap-img {image}" style="color:#2c3e50; font-size:15px;"></div>',
					'<div class="section-wrap-text">{title}</div>',
				'</div>',
			'</tpl>'
		);
    },

    onItemClickMenu : function(cmp,rec){
        this.fireEvent('clickmenu', cmp, rec);
    },
    selectFirst:function(cmp){
		cmp.getSelectionModel().select(cmp.getStore().getAt(0));
		this.fireEvent('clickmenu', cmp, cmp.getStore().getAt(0));
    }
});
