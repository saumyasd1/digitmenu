Ext.define('AOC.view.users.manage.UserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userMain',
    runTime: AOC.config.Runtime,
    helper: AOC.util.Helper,
    createuser: function () {
        var me = this,
            win = Ext.create('AOC.view.users.myprofile.AddUserWindow', {
                gridView: me.getView()
            });
        win.show();
    },
    init: function () {
        var me = this;
        me.menuTpl = me.buildMenuTpl();
    },
    CancelDetails: function () {
        Ext.getBody().unmask();
        var win = Ext.ComponentQuery.query('#userWindowItemId')[0];
        win.close();
    },
    onClickMenu: function (obj, rowIndex, colIndex, item, e, record) {
        var me = this;
        var callout = Ext.widget(
            'callout', {
                cls: 'white more-menu-item-callout extra',
                html: me.menuTpl.apply(record.data),
                target: e.target,
                calloutArrowLocation: 'top-left',
                relativePosition: 't-b',
                relativeOffsets: [52, 23],
                dismissDelay: 0,
                listeners: {
                    afterrender: me.onAfterRenderEditCallout,
                    edit: function (cmp) {
                        var me = this,
                            currentRecord = e.record,
                            data = currentRecord.data;
                        var id = data.id;
                        win = Ext.create('AOC.view.users.myprofile.AddUserWindow', {
                            mode: 'edit',
                            ID: id,
                            title: 'Edit User'
                        });
                        var refs = win.getReferences(),
                            profileImage = refs.profileImage,
                            userId = AOCRuntime.getUser().id;
                        if (id == userId) {
                            profileImage.setSrc(Helper.getFilePath());
                            if (id == 1) {
                                win.down('#site').setHidden(true);
                            }
                            win.down('#site').setDisabled(true);
                            win.down('#role').setHidden(true);
                            win.down('#roledisplayfield').setHidden(false);
                        }
                        win.down('form').loadRecord(currentRecord);
                        win.show();
                        callout.destroy();
                    },
                    deleteuser: function (cmp) {
                        currentRecord = e.record;
                        var ID = record.get('id');
                        var Msg = AOCLit.deleteUserMsg;
                        Ext.Msg.confirm('Alert', AOCLit.delUserMsg,
                            function (btn) {
                                if (btn == 'yes') {
                                    Ext.Ajax.request({
                                        method: 'DELETE',
                                        url: applicationContext + '/rest/users/' + ID,
                                        success: function (response, opts) {
                                            Helper.showToast('Success', Msg);
                                            me.runTime.getActiveGrid().store.load();
                                        },
                                        failure: function (response, opts) {
                                            msg = response.responseText;
                                            Helper.showToast('failure', msg);
                                            view.unmask();
                                            view.close();
                                        }
                                    });
                                }
                            });
                        callout.destroy();
                    }
                }
            });
        callout.show();
        var heightAbove = e.getY() - Ext.getBody().getScroll().top,
            heightBelow = Ext.Element
            .getViewportHeight() - heightAbove;

        if (heightBelow < (callout.getHeight() + 40)) {
            callout.calloutArrowLocation = 'bottom-left';
            callout.relativePosition = 'b-t';
            callout.relativeOffsets = [55, -5];
        } else {
            callout.calloutArrowLocation = 'top-left';
            callout.relativePosition = 't-b';
            callout.relativeOffsets = [55, 5];
        }
        callout.show();
    },
    onAfterRenderEditCallout: function (cmp) {
        var me = this;
        cmp.el.on({
            delegate: 'div.user-profile-menu-item',
            click: function (e, element) {
                var el = Ext.get(element),
                    event = el
                    .getAttribute('event');
                if (event && !el.hasCls('edit-menu-disabled')) {
                    me.fireEvent(event);
                }
            }
        });
    },
    buildMenuTpl: function () {
        return Ext.create('Ext.XTemplate',
            '<div style="width: 140px !important;border-bottom: none !important;cursor:pointer;" class="user-profile-menu-callout {[this.isDeleteEnable(values)]}"  event="edit">Edit</div>',
            '<div style="width: 140px !important;border-bottom: none{[this.getDeleteUserStyle(values)]};" class="user-profile-menu-callout {[this.isDeleteEnable(values)]}"  event="deleteuser">Delete</div>', {
                isDeleteEnable: function (v) {
                	var userinfo = AOCRuntime.getUser(),
                	roleId = userinfo.role;
                    if (v.id == 1 || v.role == roleId) {							
                        return 'order-profile-menu-item';
                    }
                    return 'user-profile-menu-item';
                },
                getDeleteUserStyle: function (v) {
                    if (v.id == 1) {
                        return Helper.getDisableMenuItemStyle();
                    }
                    return Helper.getEnableMenuItemStyle();
                }
            }
        );
    },
    hideMandatoryMessage: function () {
        var obj = this.getView();
        this.helper.hideMandatoryMessage(obj);
    },
    notifyByMessage: function () {
        var obj = this.getView();
        this.helper.notifyByMessage(obj);
    },
    notifyByImage: function (config) {
        this.helper.notifyByImage(config);
    },
    getQuickSearchResults: function (cmp) {
        var store = this.getView().store;
        var value = cmp.getValue();
        if (value != null && value != '') {
            store.proxy.setFilterParam('query');
            var parameters = '{"email":"' + value + '"}';
            store.setRemoteFilter(true);
            if (!store.proxy.hasOwnProperty('filterParam')) {
                store.proxy.setFilterParam('query');
            }
            store.proxy.encodeFilters = function (filters) {
                return filters[0].getValue();
            };
            store.filter({
                id: 'query',
                property: 'query',
                value: parameters
            });
        }
        cmp.orderedTriggers[0].show();
    },
    getSearchResults: function (cmp, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.getQuickSearchResults(cmp);
        }
    },
    clearSearchResults: function (cmp) {
        var grid = this.getView();
        var store = grid.store;
        store.clearFilter();
        store.loadPage(1);
        cmp.setValue('');
        cmp.orderedTriggers[0].hide();
    }
});
