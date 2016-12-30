Ext.define('AOC.view.viewmail.EmailAttachmentInfoGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.emailattachmentinfoGrid',
    itemId:'EmailAttachmentInfoGriditemId',
    controller:'viewMailController',
    reserveScrollbar:true,
    initComponent : function(){
        Ext.apply(this,{
            columns : this.buildColumns(),
			columnLines:true,
			listeners:{
				edit:function ( editor ,e ) { 
					var valueObj = e.record.data,
					dataStructure = e.record.get('dataStructureName');
					attachmentId = valueObj.id;
					var parameters = Ext.JSON.encode({productLineId:dataStructure,id:attachmentId});
					Ext.Ajax.request({
	                    method: 'PUT',
	                    jsonData: parameters,
	                    url: applicationContext+'/rest/orderattachements/order/'+attachmentId,
	                    success: function(response, opts) {
	                        var jsonString = Ext.JSON.decode(response.responseText);
	                        var valueExist = jsonString.valueExist;
	                        if (valueExist) {
	                            Ext.getBody().unmask();
	                            //createpartner.lookupReference('partnerName').focus();
	                            //createpartner.down('#messageFieldItemId').show();
	                            //createpartner.down('#messageFieldItemId').setValue(AOCLit.partExistMsg);
	                            return false;
	                        }
	                        Ext.getBody().unmask();
	                        createpartner.destroy();
	                        AOC.util.Helper.fadeoutMessage('Success', Msg);
	                        grid.store.load();
	                    },
	                    failure: function(response, opts) {
	                        Msg = response.responseText;
	                        Msg = Msg.replace("Exception:", " ");
	                        //  AOC.util.Helper.fadeoutMessage('Success',Msg);
	                        Ext.Msg.alert('Alert Message', Msg);
	                        Ext.getBody().unmask();
	                        createpartner.destroy();
	                    }
	                });
				}
			
			}
        });
        this.callParent(arguments);
    },
    plugins: [
		      {
			        ptype: 'cellediting',
			        clicksToEdit: 1
			    }
	],
	selType: 'checkboxmodel',
    buildColumns : function(){
        return {
			defaults : {
                draggable : false,
                sortable : false,
                hideable :false,
                resizable:false
			},
		   items:[
				{
					text : 'File Name',
					flex :1.5,
					dataIndex:'fileName',
					name: 'fileName',
					renderer: function (value) {
						return '<a href="#">'+value+'</a>';
					}
				},
				{
					text : 'Partner Data Structure',
					flex :1.3,
					dataIndex:'dataStructureName',
					name: 'Partner Data Structure',
					editor: {
						xtype:'combobox',
						displayField:'dataStructureName',
						valueField:'id',
						queryMode :'local',
						store:Ext.data.StoreManager.lookup('PartnerProductLineStoreStoreId') == null ? Ext.create('AOC.store.PartnerProductLineStore') : Ext.data.StoreManager.lookup('PartnerProductLineStoreStoreId')
						  }
					}, 
				{
					xtype: 'checkcolumn',
					text : 'Additional File',
					flex :1,
					dataIndex:'Additional File',
					name: 'additionalDataFileKey',
					editor: {
						xtype: 'checkbox',
						cls: 'x-grid-checkheader-editor'
					}
				},
				{
					text : 'RBO Match',
					flex :1,
					dataIndex:'RBO Match',
					name: 'rboMatch'
				},
				{
					text : 'ProductLine Match',
					flex :1,
					dataIndex:'ProductLine Match',
					name: 'productLineMatch'
				},
				{
					text : 'File Type Match',
					flex :1.2,
					dataIndex:'fileContentType',
					name: 'fileContentType'
				},
				{
					xtype: 'checkcolumn',
					text : 'Disregard',
					flex :1,
					dataIndex:'disregard',
					name: 'disregard',
					editor: {
						xtype: 'checkbox'
					}
				}
			]
		};
    }
});