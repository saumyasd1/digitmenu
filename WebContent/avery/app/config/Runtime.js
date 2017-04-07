Ext.define('AOC.config.Runtime',{
    singleton : true,
    alternateClassName:['AOCRuntime'],
    config :{
        activeButton : null,
        activeGrid:null,
        windowInEditMode:false,
        orderQueueId:null,
        currentOrderQueuePartnerId:null,
        currentOrderQueueDefaultSystem:null,
        currentOrderQueueSiteId:null,
        currentOrderQueueOrgCodeId:null,
        orderEmailQueueId:null,
        attachmentQueueId:null,
        orderQueueActiveRecord:null,
        orderEmailQueueActiveRecord:null,
        orderEmailQueueStatus:null,
        salesOrderCount:0,
        hideSubmitToSystemButton:false,
        orderQueueStatus:null,
        orderLineStatus:null,
        allowOrderLineEdit:true,
        openRow:[],
        user: {},
        storeERPORG:null,
        orderLineCurrenProductLine:0,
        timeZone:null,
        wiId:null
    },
    constructor : function(config){
        this.initConfig(config);
    }
});