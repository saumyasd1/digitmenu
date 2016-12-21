Ext.apply(Ext.form.VTypes, {
    excelUpload: function (val, field) {
        var fileName = /^.*\.(gif|png|bmp|jpg|jpeg)$/i;
        return fileName.test(val);
    },
    excelUploadText: 'Image must be in .gif,.png,.bmp,.jpg,.jpeg format'
});
Ext.define('AOC.view.viewmail.ViewMailForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.viewmailform',
    itemId: 'viewmailformItemId',
    controller: 'viewMailController',
    bodyPadding: '0 200 0 200',
    requires: ['AOC.lang.lit'],
    border: false,
    attachmentCount: 1,
    isResubmit: false,
    layout: {
        type: 'anchor'
    },
    initComponent: function () {
        var me = this;
        this.fieldArray = [],
            Ext.apply(this, {
                items: this.buildItem()
            });
        this.callParent(arguments);
    },
    buildItem: function () {
        var me = this;
        return [{
            xtype: 'fieldcontainer',
            border: false,
            layout: 'hbox',
            items: [{
                xtype: 'displayfield',
                labelAlign: 'top',
                name: 'partner',
                itemId: 'subject',
                fieldLabel: 'Partner',
                labelSeparator: ''
            }, {
                xtype: 'tbspacer',
                width: 100
            }, {
                xtype: 'displayfield',
                labelAlign: 'top',
                name: 'Tracking #',
                itemId: 'trackingId',
                fieldLabel: 'Tracking ID#',
                labelSeparator: ''
            }]
        }, {
            xtype: 'fieldcontainer',
            border: false,
            layout: 'hbox',
            items: [{
                xtype: 'displayfield',
                labelAlign: 'top',
                name: 'subject',
                itemId: 'subject',
                fieldLabel: 'Email Subject',
                labelSeparator: ''
            }, {
                xtype: 'tbspacer',
                width: 100
            }, {
                xtype: 'displayfield',
                labelAlign: 'top',
                name: 'RBO',
                itemId: 'rbo',
                fieldLabel: 'RBO Match',
                labelSeparator: ''
            }, {
                xtype: 'tbspacer',
                width: 100
            }, {
                xtype: 'displayfield',
                labelAlign: 'top',
                name: 'Product Line',
                itemId: 'productline',
                fieldLabel: 'Product Line Match',
                labelSeparator: ''
            }]
        },  {
            xtype: 'displayfield',
            labelAlign: 'top',
            name: 'Sender Email Id',
            itemId: 'senderemailId',
            fieldLabel: 'Sender Email ID',
            labelSeparator: ''
        }, {
            xtype: 'fieldcontainer',
            border: false,
            layout: 'hbox',
            items: [{
                xtype: 'displayfield',
                labelAlign: 'top',
                name: 'Email', //name:'mailBody'(DB column name)
                itemId: 'mailbody',
                fieldLabel: 'Email Body',
                labelSeparator: ''
            }, {
                xtype: 'tbspacer',
                width: 100
            }, {
                xtype: 'displayfield',
                labelAlign: 'top',
                name: 'RBO',
                itemId: 'rbo',
                fieldLabel: 'RBO Match',
                labelSeparator: ''
            }, {
                xtype: 'tbspacer',
                width: 100
            }, {
                xtype: 'displayfield',
                labelAlign: 'top',
                name: 'Product Line',
                itemId: 'productline',
                fieldLabel: 'Product Line Match',
                labelSeparator: ''
            }]
        }]
    },
    notifyByImage: function (config) {
        if (config.isValid())
            config.setFieldStyle('background-image:url( AOC.config.Settings.buttonIcons.valid_field);background-repeat:no-repeat;background-position:right;');
        else
            config.setFieldStyle('background-image:url(AOC.config.Settings.buttonIcons.invalid_field);background-repeat:no-repeat;background-position:right;');

    }
});
