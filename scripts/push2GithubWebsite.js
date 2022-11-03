const fse = require('fs-extra');
const path = require('path');
const targetBaseUrl = `${process.cwd()}/site_docs`;
// const changeLogUrl = `${process.cwd()}/changelog`;

const copyFile = (from, to) => {
  fse
    .copy(from, to)
    .then(() => {
      console.log('success >>>>', to);
    })
    .catch((err) => {
      console.error(err);
    });
};

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
  const quarkPath = path.resolve(__dirname, '../packages/quark');

  // 判断 site_docs 文件是否存在根路径中
  const existsRoot = await fse.pathExists(targetBaseUrl);
  if (existsRoot) await removeFile(targetBaseUrl);

  // 复制changelog
  // await fse.copyFileSync(changelogPath, `${changeLogUrl}/changelog.md`);
  // fse.readFile(changelogPath, (err, data) => {
  //   if (!err) {
  //     copyFile(changelogPath, `${changeLogUrl}/changelog.md`);
  //   }
  // });
  // await fse.copyFileSync(changelogPath, `${changeLogUrl}/changelog.en-US.md`);
};

copy();
