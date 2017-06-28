
const postRouter  = require('express').Router();
const multer      = require('multer')
const path        = require('path');

//--create a multer instance
const postHandler = multer( getMulterPattern() );

//--set post route for multer
postRouter.post( '/addImage'
                 , postHandler.single('image')
                 , (request, response) => response.end()
               );

//--export it as module
module.exports = postRouter;



function getMulterPattern()
{
    let multerPattern =
    {
        storage: multer.diskStorage(
        {
            destination: function (request, file, callback)
            {
                const imagesDirPath = path.resolve(__dirname, "../files/images");
                callback(null, imagesDirPath);
            },

            filename: function (request, file, callback)
            {
                //--set unique name with current date part
                // callback( null, file.fieldname + '-' + Date.now() );
                
                //--set original name for posted file
                callback(null, file.originalname);
            }
        })
    };

    return multerPattern; 
}