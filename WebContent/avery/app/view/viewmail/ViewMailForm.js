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
    bodyPadding: 10,
    requires: ['AOC.lang.lit'],
    border: false,
    attachmentCount: 1,
    isResubmit: false,
    layout: {
        type: 'anchor'
    },
    initComponent: function () {
        var me = this;
        me.fieldArray = [],
		Ext.apply(me, {
			items: me.buildItem()
		});
        me.callParent(arguments);
    },
    buildItem: function () {
        var me = this;
        return [
            {
				xtype: 'fieldcontainer',
				border: false,
				layout: 'hbox',
				defaults:{
					labelSeparator:'',
					labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
					labelAlign:'left',
					labelWidth:150
				},
				defaultType:'displayfield',
				margin:'0 0 5 0',
				items: [
					{
						name: 'partner',
						itemId: 'subject',
						fieldLabel: 'Partner',
						flex:2
					}, 
					
					{
						name: 'Tracking #',
						itemId: 'trackingId',
						fieldLabel: 'Tracking ID#',
						flex:1
					},
					
					{
						name: 'senderEmailId',
						itemId: 'senderemailId',
						fieldLabel: 'Sender Email ID',
						flex:1
					}
				]
			}, 
			{
				xtype: 'fieldcontainer',
				border: false,
				layout: 'hbox',
				defaults:{
					labelSeparator:'',
					labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
					labelAlign:'left',
					labelWidth:150
				},
				defaultType:'displayfield',
				margin:'0 0 5 0',
				items: [
					{
						name: 'subject',
						itemId: 'subject',
						fieldLabel: 'Email Subject',
						flex:2
					}, 
					/*{
						xtype: 'tbspacer',
						width: 100
					},*/ 
					{
						name: 'RBO',
						itemId: 'rbo',
						fieldLabel: 'RBO Match',
						flex:1
					}, 
					
					{
						name: 'Product Line',
						itemId: 'productline',
						fieldLabel: 'Product Line Match',
						flex:1
					}
				]
			},
			{
				xtype: 'fieldcontainer',
				border: false,
				layout: 'hbox',
				defaults:{
					labelSeparator:'',
					labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
					labelAlign:'left',
					labelWidth:150
				},
				margin:'0 0 5 0',
				defaultType:'displayfield',
				items: [
					{
						name: 'Email', //name:'mailBody'(DB column name)
						itemId: 'mailbody',
						fieldLabel: 'Email Body',
						flex:2
					},
					
					{
						name: 'RBO',
						itemId: 'rbo',
						fieldLabel: 'RBO Match',
						flex:1
					}, 
					
					{
						name: 'Product Line',
						itemId: 'productline',
						fieldLabel: 'Product Line Match',
						flex:1
					}
				]
			}
		]
    },
    notifyByImage: function (config) {
        if (config.isValid())
            config.setFieldStyle('background-image:url( AOC.config.Settings.buttonIcons.valid_field);background-repeat:no-repeat;background-position:right;');
        else
            config.setFieldStyle('background-image:url(AOC.config.Settings.buttonIcons.invalid_field);background-repeat:no-repeat;background-position:right;');

    }
});
