Ext.define('AOC.view.viewmail.ViewMailForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.viewmailform',
    itemId: 'viewmailformItemId',
    controller: 'viewMailController',
    bodyPadding: 10,
    layout: {
        type: 'anchor'
    },
    initComponent: function () {
        var me = this;
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
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:150
				},
				defaultType:'displayfield',
				margin:'0 0 5 0',
				items: [
					{
						name: 'PartnerName',
						itemId: 'partnerName',
						fieldLabel: 'Partner',
						flex:1.5
					}, 
					
					{
						name: 'id',
						itemId: 'trackingId',
						fieldLabel: AOCLit.TrackingNo,
						margin:'0 0 5 0',
						labelWidth:180,
						flex:1
					},
					
					{
						name: 'senderEmailId',
						itemId: 'senderemailId',
						fieldLabel: 'Sender Email ID',
						labelWidth:180,
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
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign
				},
				defaultType:'displayfield',
				margin:'0 0 5 0',
				items: [
					{
						name: 'subject',
						itemId: 'subject',
						fieldLabel: 'Email Subject',
						labelWidth:150,
						flex:1.5
					}, 
					{
						name: 'emailSubjectRBOMatch',
						itemId: 'emailSubjectRBOMatch',
						labelWidth:180,
						fieldLabel: 'Subject RBO Match',
						margin:'0 0 5 0',
						reference:'emailSubjectRBOMatch',
						flex:1
					}, 
					{
						name: 'emailSubjectProductLineMatch',
						itemId: 'emailSubjectProductLineMatch',
						labelWidth:180,
						reference:'emailSubjectProductLineMatch',
						fieldLabel: 'Subject Product Line Match',
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
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign
				},
				margin:'0 0 5 0',
				defaultType:'displayfield',
				items: [
					{
						name: 'Email Body', //name:'mailBody'(DB column name)
						itemId: 'mailbody',
						fieldLabel: 'Email Body',
						labelWidth:150,
						flex:1.5
					},
					
					{
						name: 'emailBodyRBOMatch',
						itemId: 'emailBodyRBOMatch',
						labelWidth:180,
						fieldLabel: 'Body RBO Match',
						margin:'0 0 5 0',
						reference:'emailBodyRBOMatch',
						flex:1
					}, 
					
					{
						name: 'emailBodyProductLineMatch',
						itemId: 'emailBodyProductLineMatch',
						reference:'emailBodyProductLineMatch',
						labelWidth:180,
						fieldLabel: 'Body Product Line Match',
						flex:1
					}
				]
			},
			{
				xtype:'fieldcontainer',
				layout:{
					type:'hbox',
					align:'stretch'
				},
				margin:'0 0 5 0',
				defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.defaultLabelAlign,
					labelWidth:200,
					flex:1
				},
				defaultType:'displayfield',
				items:[
				    {
				    	name:'emailSubjectPartnerMatch',
				    	fieldLabel:'Email Subject Partner Match',
				    	reference:'emailSubjectPartnerMatch',
				    	itemId:'emailSubjectPartnerMatch'
				    }
				]
			}
		];
    }
});
