Ext.define('AOC.view.email.EmailManagementController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.emailManagementController',
    runTime : AOC.config.Runtime,
    helper: AOC.util.Helper,
    requires:['AOC.view.advsearch.ProductLineAdvanceSearch','AOC.util.Helper'],
    
    init : function(){
	     var me=this;
	     me.menuTpl = me.buildMenuTpl();    
    },
    onClickMenu: function(obj, rowIndex, colIndex, item, e, record) {
        var me = this;
        var callout = Ext.widget('callout', {
            cls: 'white more-menu-item-callout extra',
            html: me.menuTpl.apply(record.data),
            target: e.target,
            calloutArrowLocation: 'top-left',
            relativePosition: 't-b',
            relativeOffsets: [52, 23],
            dismissDelay: 0,
            listeners: {
            	afterrender: me.onAfterRenderEditCallout,
				viewMail: function(){
					currentRecord = e.record;
					var id = currentRecord.get('id'),
						form = Ext.ComponentQuery.query('#viewmailformItemId')[0],
						panel = Ext.ComponentQuery.query('#emailPanel')[0],
						emailAttachmentInfoGrid = panel.down('#EmailAttachmentInfoGriditemId');
				
					var listOrderFileAttachment = record.get('listOrderFileAttachment'),
						partnerName =[],
						len = listOrderFileAttachment.length;
				
					for(var i=0;i<len;i++){
						var data = listOrderFileAttachment[i];
						data.varProductLine  ? partnerName.push(data.varProductLine.varPartner ? data.varProductLine.varPartner.partnerName  :'') :'';
					}
					currentRecord.data.PartnerName = partnerName.join('');
					
					Helper.showHideEmailBodySubjectFields(form, currentRecord);
					form.loadRecord(currentRecord);
					
					store = Ext.create('AOC.store.ViewMailformStore',{
						storeId: 'ViewMailformStoreId',
						totalCount: 'total',
						proxy : {
							type : 'rest',
							url : applicationContext+'/rest/orderattachements/order/'+id,
							reader:{
								type:'json', 
								rootProperty: 'viewmail',
								totalProperty: 'totalCount'
							}
						}
					});
					
					emailAttachmentInfoGrid.trackingId = id;
					emailAttachmentInfoGrid.status = currentRecord.get('status');
					emailAttachmentInfoGrid.bindStore(store); //Bind Store to viewmail grid
					
					panel.getLayout().setActiveItem(1);
					me.runTime.setActiveGrid(emailAttachmentInfoGrid);
					callout.destroy();
				},
				cancelMail:function(){
					var currentRecord = e.record,
						id = currentRecord.get('id'),
						win = Ext.create('AOC.view.email.CancelEmailWindow');
						
					callout.destroy();
					win.show();
					me.runTime.setOrderEmailQueueId(id);
					me.runTime.setOrderEmailQueueStatus(currentRecord.get('Status'));
				},
				viewOrder: function(cmp) {
					var currentRecord = e.record,
						id = currentRecord.id;
					
					AOC.app.fireEvent('changemainview','orderqueueview', id);
					callout.destroy();
				}
            }
        });
        //Adding functionality related to Menu item visibility
        callout.show();
        var heightAbove = e.getY() - Ext.getBody().getScroll().top,
        heightBelow = Ext.Element.getViewportHeight() - heightAbove;
		
  	    if(heightBelow<(callout.getHeight()+40)){
			callout.calloutArrowLocation='bottom-left'; 
			callout.relativePosition='b-t';
			callout.relativeOffsets = [80, 0];
		}else{
			callout.calloutArrowLocation='top-left'; 
			callout.relativePosition='t-b';
			callout.relativeOffsets = [80, 5];
		}
        callout.show();
    },
    
    onAfterRenderEditCallout: function(cmp) {
        var me = this;
        cmp.el.on({
            delegate: 'div.user-profile-menu-item',
            click: function(e, element) {
                var el = Ext.get(element),
                    event = el.getAttribute('event');
                
                if (event && !el.hasCls('edit-menu-disabled')) { 
                    me.fireEvent(event);
                }
            }
        });
    },
    buildMenuTpl: function() {
        var me = this;
        return Ext.create('Ext.XTemplate',
			'<div style="width:180px !important; {[this.getViewMailMenuItemStyle(values)]}" class="user-profile-menu-callout {[this.getViewMailEnableDisableClass(values)]}" event="viewMail"">View Mail</div>',
            '<div style="width: 180px !important;{[this.getViewOrderMenuItemStyle(values)]}" class="user-profile-menu-callout {[this.getViewOrderEnableDisableClass(values)]}" event="viewOrder"> View Order </div>',
        	'<div style="width: 180px !important;{[this.getMoveToTaskManagerMenuItemStyle(values)]}" class="user-profile-menu-callout {[this.getMoveToTaskManagerEnableDisableClass(values)]}" event="cancelMail"> Move To Task Manager</div>',
        	{
        		compiled:true,
        		getViewMailMenuItemStyle:function(value){
        			if(Helper.isEmailQueueViewMailEnabled(value.status)){
        				return Helper.getEnableMenuItemStyle();
        			}
        			return Helper.getDisableMenuItemStyle();
        		},
        		getViewOrderMenuItemStyle:function(value){
        			if(Helper.isEmailQueueViewOrderEnabled(value.status)){
        				return Helper.getEnableMenuItemStyle();
        			}
        			return Helper.getDisableMenuItemStyle();
        		},
        		getMoveToTaskManagerMenuItemStyle:function(value){
        			if(Helper.isEmailQueueMoveToTaskManagerEnabled(value.status)){
        				return Helper.getEnableMenuItemStyle();
        			}
        			return Helper.getDisableMenuItemStyle();
        		},
        		getViewMailEnableDisableClass:function(value){
        			if(Helper.isEmailQueueViewMailEnabled(value.status)){
        				return 'user-profile-menu-item';
        			}
        			return 'order-profile-menu-item';
        		},
        		getViewOrderEnableDisableClass:function(value){
        			if(Helper.isEmailQueueViewOrderEnabled(value.status)){
        				return 'user-profile-menu-item';
        			}
        			return 'order-profile-menu-item';
        		},
        		getMoveToTaskManagerEnableDisableClass:function(value){
        			if(Helper.isEmailQueueMoveToTaskManagerEnabled(value.status)){
        				return 'user-profile-menu-item';
        			}
        			return 'order-profile-menu-item';
        		}
        	}
        );
    }
});