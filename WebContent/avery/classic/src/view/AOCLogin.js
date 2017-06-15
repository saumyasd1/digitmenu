Ext.define('AOC.view.AOCLogin',{
	extend:'Ext.Container',
	alias:'widget.aoclogin',
	itemId:'aocLoginItemId',
	layout:{
		type:'vbox',
		align:'center',
		pack:'center'
	},
	initComponent : function(){
		this.items = this.buildItems();
		this.callParent(arguments);
	},
	buildItems:function(){
		var me=this;
		return [
			{
				xtype: 'form',        
				bodyPadding:'30 50 50 50',
				border:true,
				bodyStyle:{"border-radius":"10px"},
				style  : AOC.config.Settings.getBaseBackgroundColor(),
				layout: {
					type: 'vbox',
					align: 'center',
					pack: 'center'
				},
				defaults: {             
					xtype: 'textfield', 
					width : 350,
					hideLabel:true,
					height:40,
					allowBlank:false
				},
				items: [
					{
						xtype:'image',
						border:false,
						width:100,
						height:100,
						src: AOC.config.Settings.buttonIcons.logoImage
					},
					{
						xtype:'component',
						html:'<div class="heading-text">Accelerated Order Capture</div>'
					},
					{
						name: 'username',
						margin:'30 0 0 0',
						blankText : 'UserName Field is required',
						emptyText:'Username'
					},
					{   
						name: 'password',
						inputType: 'password',
						margin:'-1 0 0 0',
						itemId:'loginpasswordfield',
						blankText : 'Password Field is required',
						emptyText:'Password',
						listeners: {
							specialkey:function(fld,event,eop){
								if (event.keyCode == Ext.EventObject.ENTER && !Ext.isEmpty(fld.getValue())){
									me.fireEvent('login',me);	
								}
							}
						}
					},
					{
						xtype:'fieldcontainer',
						margin:'10 0 0 0',
						layout:'hbox',
						items:[
							{
								xtype : 'checkbox',
								width:245,
								boxLabel : '<div class="forget-pws-text" >Remember me</div>',
								oldValue : false,
								listeners : {
									scope : this,
									change :function( cmp, newValue, oldValue){}
								}
							
							}
//							{
//								xtype:'component',
//								flex:1,
//								margin:'7 0 0 0',
//								html:'<div class="forget-pws-text">Forgot Password?</div>'
//							}
						]
					},
					{
						xtype :'button',
						margin :'20 0 0 0',
						text : 'LOGIN',
						width : 350,
						height:40,
						handler: function(){
							me.fireEvent('login',me);
						}
					}
				]
			}
		]
	} 
 });
