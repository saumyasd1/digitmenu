Ext.define('AOC.view.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'AOC',
        userImageSrc: Helper.getFilePath()
    }

    //TODO - add data, formulas and/or methods to support your view
});