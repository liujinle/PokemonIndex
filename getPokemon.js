const superagent = require("superagent");
const cheerio = require("cheerio");
const fs = require("fs");

const url =
  "https://wiki.52poke.com/zh-hans/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E5%88%97%E8%A1%A8%EF%BC%88%E6%8C%89%E5%85%A8%E5%9B%BD%E5%9B%BE%E9%89%B4%E7%BC%96%E5%8F%B7%EF%BC%89";

const area_arr = {
  guandu: ".s-关都",
  chengdu: ".s-城都",
  fengyuan: ".s-丰缘",
  shenao: ".s-神奥",
  hezong: ".s-合眾",
  kaluosi: ".s-卡洛斯",
  aluola: ".s-阿羅拉",
  jialeer: ".s-伽勒尔",
};

let data = [];

superagent
  .get(url)
  .then((res) => {
    const $ = cheerio.load(res.text);
    //遍历对象组成完整的数据
    Object.keys(area_arr).forEach((key) => {
      //地区区别
      data[key] = arrChangeObject(changeDomStr($(area_arr[key]).text()));

      // data.push(...arrChangeObject(changeDomStr($(area_arr[key]).text())))
    });

    fs.writeFile("pokemon_all.json", JSON.stringify(data), (err) => {
      if (err) {
        console.log(err);
      }
    });
  })
  .catch((err) => {
    throw err;
  });

//将Dom字符串处理为数组
function changeDomStr(str) {
  return str.split("\n").filter(delete_space).join().split("#");
}

//处理空字符
function delete_space(arr) {
  return arr && arr.trim();
}

//将数组内部转为对象
function arrChangeObject(arr) {
  let newArr = [];
  newArr = arr.map((el, i) => {
    return (
      i >= 1 && {
        id: str_split(el, 0),
        cn_name: str_split(el, 1),
        jp_name: str_split(el, 2),
        en_name: str_split(el, 3),
        type1: str_split(el, 4),
        type2:
          "[[{{{6}}}（属性）|{{{6}}}]]" == str_split(el, 5)
            ? null
            : str_split(el, 5),
      }
    );
  });
  newArr.shift();
  return newArr;
}

function str_split(str, sIndex) {
  return str.split(",")[sIndex];
}
