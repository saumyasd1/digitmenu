Ext.define('AOC.view.partner.ProductLineViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.productlineviewmodel',
    itemId: 'createpartnerItemId',
    controller: 'partnerMain',
    bodyPadding: 5,
    width: 350,
    border: false,
    modal: true,
    draggable: false,
    editMode: false,
    rec: null,
    partnerId: null,
    partnerName: null,
    buttonAlign: 'center',
    initComponent: function() {
        var me = this;
        this.fieldArray = [],
            Ext.apply(this, {
                items: this.buildItem(),
                listeners: {
                    'afterrender': function(obj) {
                        if (me.rec != null) {
                            me.down('form').loadRecord(me.rec);
                        }
                    }
                }
            });
        this.callParent(arguments);
    },
    buildButtons: function() {
        return [{
            text: 'Save',
            handler: 'SaveDetails'
        }, {
            text: 'Cancel',
            handler: 'CancelDetails'
        }];
    },
    buildItem: function() {
        return [{
            xtype: 'displayfield',
            itemId: 'titleItemId',
            value: '',
            hidden: false,
            margin: '5 0 0 120'
        }, {
            xtype: 'displayfield',
            itemId: 'messageFieldItemId',
            fieldStyle:'text-align: center;',
            value: '',
            hidden: true
        }, {
            xtype: 'form',
            itemId: 'listPanel',
            border: false,
            items: [{

                xtype: 'textfield',
                itemId: 'PNItemId',
                labelAlign: 'top',
                name: 'partnerName',
                reference: 'partnerName',
                fieldLabel: AOCLit.partnerName,
                value: '',
                labelSeparator: '',
                allowBlank: false,
                labelWidth: 100,
                width: 300,
                maxLength: '250',
                margin: '0 0 0 15',
                blankText: AOCLit.partnerNameReq,
                enforceMaxLength: true
            }, {
                xtype: 'tbspacer',
                width: 20
            }, {
                xtype: 'textfield',
                itemId: 'AItemId',
                labelAlign: 'top',
                name: 'address',
                fieldLabel: AOCLit.address,
                value: '',
                labelSeparator: '',
                allowBlank: false,
                labelWidth: 100,
                width: 300,
                margin: '5 0 0 15',
                blankText: AOCLit.addReq,
                maxLength: '500',
                enforceMaxLength: true
            }, {
                xtype: 'tbspacer',
                width: 10
            }, {
                xtype: 'textfield',
                itemId: 'CPItemId',
                labelAlign: 'top',
                name: 'contactPerson',
                fieldLabel: AOCLit.contactPerson,
                labelSeparator: '',
                allowBlank: false,
                labelWidth: 100,
                width: 300,
                margin: '5 0 0 15',
                blankText: AOCLit.contactPerson,
                maxLength: '100',
                enforceMaxLength: true
            }, {

                xtype: 'textfield',
                itemId: 'phone',
                labelAlign: 'top',
                name: 'phone',
                fieldLabel: 'Phone',
                labelSeparator: '',
                allowBlank: false,
                labelWidth: 100,
                width: 300,
                margin: '5 0 0 15',
                blankText: AOCLit.phoneReqMsg,
                maxLength: '100',
                regex: /^(\d+-?)+\d+$/,
                enforceMaxLength: true
            }, {
                xtype: 'tbspacer',
                width: 100,
                height: 20
            }, {
                buttons: this.buildButtons()
            }]
        }]
    }
});