const GETRouter     = require('express').Router();
const childProcess  = require('child_process');
const path          = require('path');
const fse           = require('fs-extra');

//--set GET route
GETRouter.get('/getModel', getRouterCallback);

//--and export it as module
module.exports = GETRouter;


function getRouterCallback(request, response)
{
    const imagesDirPath = getAbsPath("../files/images");
    const modelFilePath = getAbsPath("../files/reconstruction/model.off");
    const bvsReconPath  = getAbsPath("../../bvs_recon/build/Release/bvs_recon");

    const bvsReconApp   = childProcess.execFile(bvsReconPath
                            , [imagesDirPath, modelFilePath]
                            , function (error, cout, cerr)
      {
        const errorChildProcessMessage  = "external program report problem";
        const errorSendFileMessage      = "probably you put bad path to sending file";

        console.log(cout);

        //--Check exit code of childProcess
        errorHandling(error, errorChildProcessMessage);
        console.log("Command Line Program finished successfully: " + cout);

        //--if all is right, try to send model file
        response.sendFile( modelFilePath, (error) => errorHandling(error, errorSendFileMessage) );
        console.log('File was send properly\n');

        //and remove all received images
        fse.emptyDir(imagesDirPath);
    });
}

function getAbsPath     (localPath)
{
    return path.resolve(__dirname, localPath);
}

function errorHandling  (error, message)
{
    const a = "\n---------- Houston, we have a problem:  ";
    const b = " ----------\n";
    const c = a + message + b;

    if (error) throw c;
}