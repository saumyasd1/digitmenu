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
            //afterrender:me.selectFirst
        });
    },
    buildMarkup : function(){
        return Ext.create('Ext.XTemplate',
			'<tpl for=".">',
				'<div  class="section-wrap">',
//					'<div class="section-wrap-img"><img src="avery/resources/images/{image}"/></div>',
					'<div class="section-wrap-img {image}" style="color:#2c3e50; font-size:15px;"></div>',
					'<div class="section-wrap-text">{title}</div>',
//					'<tpl if="values.count!=0">',
//						'<div class="section-wrap-count"><span class="count-text">{count}</span></div>',
//					'</tpl>',
				'</div>',
			'</tpl>'
		);
    },

    onItemClickMenu : function(cmp,rec){
        this.fireEvent('clickmenu', cmp, rec);
    },
    selectFirst:function(cmp){
		cmp.getSelectionModel().select(cmp.getStore().getAt(0));
    }
});
