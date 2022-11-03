const fse = require('fs-extra');
// const path = require('path');
const sh = require('shelljs');
const targetBaseUrl = `${process.cwd()}/dist`;
// const changeLogUrl = `${process.cwd()}/changelog`;

// const copyFile = (from, to) => {
//   fse
//     .copy(from, to)
//     .then(() => {
//       console.log('success >>>>', to);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// };

const removeFile = async (url) => {
  return new Promise((res, rej) => {
    fse.remove(url, (err) => {
      if (err) {
        throw err;
      }
      res(true);
    });
  });
};

const copy = async () => {
  // const quarkPath = path.resolve(__dirname, '../packages/quark');

  // 判断 site_docs 文件是否存在根路径中
  const existsRoot = await fse.pathExists(targetBaseUrl);

  console.log('111111', existsRoot)
};


sh.exec('yarn build',  function(code, stdout, stderr) {
  console.log('Exit code:', code);
  console.log('Program output:', stdout);
  console.log('Program stderr:', stderr);

  copy();
});
