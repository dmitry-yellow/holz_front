var path = require('path'), fs = require('fs');

function fromDir(startPath, filter, callback) {

    console.log('Starting from dir ' + startPath + '/');

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }
    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter, callback); //recurse
        } else if (filter.test(filename)) callback(filename);
    }
    ;
};

const renamer = function (filename) {
    let newFileName = filename.split('.');
    newFileName.splice(1, 1);
    newFileName = newFileName.join('.');
    console.log('-- renamed: ', newFileName);
    fs.renameSync(filename, newFileName);
}

fromDir('build/static', /\.chunk.js$/, function (filename) {
    console.log('-- found: ', filename);
    renamer(filename);
});

fromDir('build/static', /\.chunk.js.map$/, function (filename) {
    console.log('-- found: ', filename);
    renamer(filename);
});


fromDir('build/static', /\.chunk.css$/, function (filename) {
    console.log('-- found: ', filename);
    renamer(filename);
});

fromDir('build/static', /\.chunk.css.map$/, function (filename) {
    console.log('-- found: ', filename);
    renamer(filename);
});