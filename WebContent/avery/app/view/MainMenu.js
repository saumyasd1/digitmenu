Ext.define('AOC.view.MainMenu',{
    extend        : 'Ext.view.View',
    alias         : 'widget.mainmenu',
    initComponent : function(){
        var me = this;
        Ext.apply(me,{
            store           : 'Sections',
            tpl             : me.buildMarkup(),
            itemSelector    : 'div.section-wrap',
            selectedItemCls : 'section-wrap-selected',
            overItemCls     : 'section-over'
        });
        me.navigationModel.focusCls='section-focus';
        me.callParent(arguments);
        me.on({
            itemclick      : me.onItemClickMenu
        });
    },

    buildMarkup : function(){
        var me = this;
        return Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                    '<div  class="section-wrap">',
                        '<div class="section-wrap-img"><img src="avery/resources/images/{image}"/></div>',
                        '<div class="section-wrap-text">{title}</div>',
                        '<tpl if="values.count!=0">',
                            '<div class="section-wrap-count"><span class="count-text">{count}</span></div>',
                        '</tpl>',
                    '</div>',
                '</tpl>'
            );
    },

    onItemClickMenu : function(cmp,rec){
        var me        = this;
        me.fireEvent('clickmenu',cmp, rec);
    }

});
