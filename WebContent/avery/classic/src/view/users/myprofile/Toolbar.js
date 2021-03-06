Ext.define('AOC.view.users.myprofile.Toolbar', {
    extend   : 'Ext.Container',
    alias    : 'widget.profiletoolbar',
    requires : [
        'Ext.layout.container.HBox',
        'Ext.XTemplate',
        'AOC.view.widget.PlainButton',
        'AOC.view.widget.WhiteButton',
        'AOC.view.widget.BlueButton'
    ],
    layout    : {
        type  : 'hbox',
        pack  : 'start',
        align : 'stretch'
    },
    cls: 'aoc-panel',
    style: {
        "background-color" : "#ffffff",
        "padding": "10px 20px 10px 20px"
    },
    initComponent : function(){
        var me = this;
        Ext.apply(me,{
            items : me.buildItems()
        });
        me.callParent(arguments);
    },
    buildItems : function(){
        var me = this;
        return [{
            xtype: 'component',
            flex: 1,
            hidden:true,
            itemId: 'title',
            data: me.data,
            tpl: me.buildTpl(),
            cls: 'profile-info-header-text'
        },{
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'end'
            },
            items   : [{
                xtype:'button',
                itemId: 'changepasswordbtn',
                hidden:true,
                margin : '0 0 0 10',
                cls: 'blue-btn',
                text:'Change Password',
                scope: me,
                handler: me.onClickChangePassword
              },{
                  xtype:'button',
                  itemId: 'editbutton',
                  margin: '0 0 0 10',
                  text:'Edit',
                  cls: 'blue-btn',
                  scope: me,
                  hidden:true,
                  handler: me.onClickEdit
              },{
                xtype: 'button',
                margin: '0 0 0 10',
                cls: 'blue-btn',
                scope: me,
                hidden:true,
                itemId: 'cancel',
                text:'Cancel',
                handler: me.onClickCancel
            },{
                xtype: 'button',
                margin: '0 0 0 10',
                scope: me,
                cls: 'blue-btn',
                text:'Save',
                hidden:true,
                itemId: 'save',
                handler: me.onClickSave
            }
            ]
        }];
    },

    buildTpl : function(){
        var me = this;
        return Ext.create('Ext.XTemplate',
            '<span class="profile-info-large-text">{title}</span>'
        );
    },

    onClickCancel : function(){
        var me = this;
        me.fireEvent('cancel',me);
    },
    onClickSave : function(){
        var me = this;
        this.fireEvent('save',me);
    },
    onClickEdit: function(){
        var me = this;
	 this.fireEvent('edit',me);
    },
    onClickChangePassword:function(){
    	var me=this;
    	me.fireEvent('changepassword',me);
    },
    updateTitle : function(t){
        var me    = this,
        title = me.down('#title');
        if (title){
            title.update({
                title : t
            });
    }
    }
});