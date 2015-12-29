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
        type: 'vbox',
        pack: 'center',
        align: 'center'
    },
    initComponent : function(){
    	this.fieldArray = [],
            Ext.apply(this,{
                items:this.buildItem()
            });
            this.callParent(arguments);
        },
        buildItem:function(){
        	return [{
 				xtype:'panel',
 				layout:'vbox',
 				height:400,
 				scrollable : true,
 				items:[
				{
					 xtype:'weborderform',
				     margin:'5 5 5 5'
				},
				 {
					 xtype:'attachmentinfoGrid',
				     height: 200,
				     margin:'5 5 5 5',
				     width:550
				 }]
    		  },
    		  {
          		xtype:'container',
          		layout: {
          	        type: 'hbox',
          	        pack: 'center',
          	        align:'center'
          	    },
          		items:[{ 
          			  xtype :'button',
                  	  text : 'Save',
                      handler:'SaveDetails',
                      width : 80
                  },
                  {
                  	xtype:'tbspacer',
                  	width:70
                  },{  
          			xtype :'button',
                  	text : ResetText,
                    handler : 'CancelDetails',
                    width : 80
                  }
          		       ]
          	}]
        }
});