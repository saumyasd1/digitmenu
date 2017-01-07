Ext.define('AOC.view.email.EmailManagementController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.emailManagementController',
    runTime : AOC.config.Runtime,
    helper: AOC.util.Helper,
    requires:['AOC.view.advsearch.ProductLineAdvanceSearch','AOC.util.Helper'],
    onClickMenu: function(obj, rowIndex, colIndex, item, e, record) {
        var me = this;
        var callout = Ext.widget('callout', {
            cls: 'white more-menu-item-callout extra',
            html: me.buildMenuTpl.apply("{}"),
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
						viewmail = panel.down('#EmailAttachmentInfoGriditemId');
					
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
					
					viewmail.trackingId = id;
					viewmail.status = currentRecord.get('status');
					viewmail.bindStore(store); //Bind Store to viewmail grid
					
					panel.getLayout().setActiveItem(1);
					me.runTime.setActiveGrid(viewmail);
					callout.destroy();
				},
				cancelMail:function(){
					var currentRecord = e.record,
						id = currentRecord.get('id'),
						win = Ext.create('AOC.view.email.CancelEmailWindow');
						
					callout.destroy();
					win.show();
					me.runTime.setOrderEmailQueueId(id);
					// me.runTime.setOrderEmailQueueActiveRecord(currentRecord);
					me.runTime.setOrderEmailQueueStatus(currentRecord.get('Status'));
					//me.runTime.setAllowOrderLineEdit(true);
					// var bulkUpdate = Ext.ComponentQuery.query('#bulkUpdateItemId')[0];
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
			callout.relativeOffsets = [60, 0];
		}else{
			callout.calloutArrowLocation='top-left'; 
			callout.relativePosition='t-b';
			callout.relativeOffsets = [60, 5];
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
            '<div style="width: 140px !important;border-bottom: none !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="viewMail"">View Mail</div>',
            '</tpl>',
            '<div style="width: 140px !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item "  event="cancelMail">Cancel Email</div>',
            '</tpl>',
            '<div style="width: 140px !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="viewOrder"">View Order</div>',
            '</tpl>',
            { 
				isCancelOrderDisabled : function(v){
					return (v.Status!=AOCLit.orderError);
				}
            }
        );
    }
});