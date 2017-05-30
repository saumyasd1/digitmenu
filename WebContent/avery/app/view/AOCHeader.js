Ext.define('AOC.view.AOCHeader', {
    extend: 'Ext.Container',
    alias: 'widget.aocheader',
    height: 60,
    cls: 'aoc-header',
    viewModel:'main',
    requires: ['AOC.config.Settings'],
    initComponent: function () {
        var settings = AOC.config.Settings,
            runtime = AOC.config.Runtime,
            username = "",
            userInfo = runtime.getUser();
        if (!Ext.isEmpty(userInfo)) {
            username = userInfo.firstName;
            username = (!Ext.isEmpty(userInfo.lastName)) ? username + ' ' + userInfo.lastName : username;
        }
        Ext.apply(this, {
            layout: {
                type: 'hbox'
            },
            style: Settings.config.header.headerBgStyle,
            items: [{
                xtype: 'image',
                src: settings.buttonIcons.logoImage,
                width: 60,
                margin: '1 0 0 0',
                height: 56
            }, {
                xtype: 'component',
                height: 60,
                width: 30,
                html: '<div class="header-pipe-icon">|</div>'
            }, {
                xtype: 'component',
                height: 60,
                html: '<div class="header-right-text">Accelerated Order Capture</div>'

            }, {
                xtype: 'component',
                flex: 1
            }, {
                xtype: 'image',
                itemId:'profileImage',
                src:Helper.getFilePath(),
                border: true,
                style: {
                    "border-radius": "50%",
                    "border": "1px solid #d4d4d4;"
                },
                bind:{
                	src:'{userImageSrc}'
                },
                margin: '10 0 10 0',
                width: 40,
                height: 40
            }, {
                xtype: 'component',
                height: 60,
                margin: '0 5 0 5',
                itemId: 'userName',
                event: 'clickprofilemenu',
                html: '<div class="header-user-name-text">' + username + '</div>'
            }, {
				xtype: 'component',
				html:'<span class="fa fa-caret-down" style="font-size:16px;cursor:pointer"></span>',
				event:'clickprofilemenu',
				margin:'22 20 22 0',
				cls:'header-profile-menu-icon',
			}
            ]
        });
        this.callParent(arguments);
    },
    onRender: function () {
        var me = this,
        	filePath = Helper.getFilePath();
        me.callParent(arguments);
        me.getViewModel().set('userImageSrc',filePath);
        me.el.on({
            scope: me,
            delegate: '.header-profile-menu-icon',
            click: me.onClickActionIcon
        });
    },
    onClickActionIcon: function (e, element) {
        var me = this,
            elId = Ext.get(element).id,
            cmp = Ext.getCmp(elId);

        if (cmp && !Ext.isEmpty(cmp.event)) {
        	me.fireEvent(cmp.event, e, element);
        }
    },
    updateUserName: function (userName) {
        var me = this,
            cmp = me.down('#userName');
        cmp.update('<div class="header-user-name-text">' + userName + '</div>')
    }
});
