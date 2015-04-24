var Class = require('../../database/models/classModel.js'),
    User = require('../../database/models/userModel.js');
    awsConfig = require('./awsConfig');

module.exports.imageErrors = function(req, res, next){
  if(!req.files || !req.files.file){
    console.log('no req.files or req.files.file or both');
    return res.status(403).send('expected multipart/form-data encoding with an image file associated with the file key');
  }
  if(!req.body.userName && !req.body.className){
    console.log('no req.body.userName or req.body.className');
    return res.status(403).send('expected a username or className with request to generate unique filename');
  }
  if (!/^image\/(jpe?g|png|gif)$/i.test(req.files.file.mimetype)) {
    console.log('wrong mimetype');
    return res.status(403).send('expected image file').end();
  }
  next();
};

module.exports.userImageUpload = function(req, res, next){
  var photoId = req.body.userName + '-profile.' + req.files.file.extension;
  awsConfig.s3uploader(req.files.file.path, photoId, function(err, data){
    if(err){
      return res.status(500).send('failed to upload to s3').end();
    }
    res.status(200).send(data.Location.replace(/"/g, '&quot;')).end();
  });
};

module.exports.classImageUpload = function(req, res, next){
  var photoId = req.body.className + '-banner.' + req.files.file.extension;
  awsConfig.s3uploader(req.files.file.path, photoId, function(err, data){
    if(err){
      return res.status(500).send('failed to upload to s3').end();
    }
    res.status(200).send(data.Location.replace(/"/g, '&quot;')).end();
  });
};