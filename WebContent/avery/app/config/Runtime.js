Ext.define('AOC.config.Runtime',{
    singleton : true,
    config :{
        activeButton : null,
        activeGrid:null,
        windowInEditMode:false,
        orderQueueId:null,
        currentOrderQueuePartnerId:null,
        currentOrderQueueDefaultSystem:null,
        currentOrderQueueSiteId:null,
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
        orderLineCurrenProductLine:0
    },
    constructor : function(config){
        this.initConfig(config);
    }
});