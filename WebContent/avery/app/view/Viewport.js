/**
 * The main application viewport, which displays the whole application
 * 
 * @extends  Ext.Viewport
 */
Ext.define('AOC.view.Viewport', {
	extend : 'Ext.container.Viewport',
	itemId : 'viewportitemid',
	requires : [
	            'AOC.view.Canwas',
	            'AOC.view.AOCLogin',
	            'AOC.view.AOCHeader'
	            ],
	stores:[ 'PartnerManagementStore','AddressManageStore'],
	initComponent : function(){
		Ext.apply(this, {
			layout : {
				type : 'card',
				activeItem:0,
			        deferredRender : true
			    },
			    items : [
			         {
			             xtype : 'aocLogin',
			             style  : AOC.config.Settings.getBaseBackgroundColor()
			         },
			         {
			            xtype     : 'container',
			         	layout : {
							type : 'border'
						},
			               items     : [
					{
						region : 'north',
						xtype : 'aocheader'
					},
					{
						region : 'center',
						xtype : 'canwas',
						style  : AOC.config.Settings.getBaseBackgroundColor()
					}
					]
					}
				]
			})
		this.callParent(arguments);
	}
		});
	
