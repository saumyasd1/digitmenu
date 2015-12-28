Ext.define('AOC.model.OrderChart',{
    extend   : 'Ext.data.Model',
    fields : ['received','waitingCR','waitingSR','success','failed','day']
});