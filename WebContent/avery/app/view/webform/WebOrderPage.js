Ext.define('AOC.view.webform.WebOrderPage',{
	extend:'Ext.panel.Panel',
	alias:'widget.weborderpage',
	itemId:'weborderpageItemId',
	controller:'webFormMain',
	requires:['AOC.view.webform.AttachmentInfoGrid','AOC.view.webform.WebOrderForm'],
	bodyPadding: 5,
	width: 700,
	border:false,
	 layout: {
        type: 'hbox',
        pack: 'center'
    },
    initComponent : function(){
    	this.fieldArray = [],
            Ext.apply(this,{
                items:this.buildItem(),
                buttons:this.buildButtons()
            });
            this.callParent(arguments);
        },
        buildButtons : function(){
            return [{
            	text : 'Save',
                handler : 'SaveDetails'
            },
            {
            	text : 'Cancel',
                scope : this,
                action : 'CancelDetails'
            }];
        },
        buildItem:function(){
        	var me=this;
        	return [{
        		xtype:'displayfield',
        		itemId:'messageFieldItemId',
        		hidden:true
        	}, {
 				xtype:'panel',
 				layout:'vbox',
 				
 				items:[
				{
					 xtype:'weborderform',
				    //height: 200,
				    margin:'5 5 5 5',
				    width:550,
				},
				 {
					 xtype:'attachmentinfoGrid',
				     height: 200,
				     margin:'5 5 5 5',
				     width:550,
				 }]
    		  }]
        }
});
