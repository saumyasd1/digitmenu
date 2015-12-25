Ext.define('AOC.store.HomePageOders', {
    extend : 'Ext.data.Store',
    model  : 'AOC.model.HomePageOder',
    data   : [
             {"orderType":"Received" ,"lastOneDay":10,"lastWeak":76,"lastTwoWeak":78,"lastMonth":200},
             {"orderType":"Waiting CS Review" ,"lastOneDay":10,"lastWeak":76,"lastTwoWeak":78,"lastMonth":200},
             {"orderType":"Waiting System Response" ,"lastOneDay":10,"lastWeak":76,"lastTwoWeak":78,"lastMonth":200},
             {"orderType":"Successful" ,"lastOneDay":10,"lastWeak":76,"lastTwoWeak":78,"lastMonth":200},
             {"orderType":"Failed" ,"lastOneDay":10,"lastWeak":76,"lastTwoWeak":78,"lastMonth":200}
    ]
});