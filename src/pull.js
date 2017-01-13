router.post('/pullVideoForADD', (req, res)=> {
  var optionsRadios1 = req.body.optionsRadios1;
  var pull_url = req.body.pull_url;
  var tv_type = req.body.tv_type;
  var type = req.body.type;
  let params = {};
  params.pull_url = pull_url;
  params.tv_type = tv_type;
  params.type = type;
  if (optionsRadios1 == 'IMDB') {
    if (pull_url && pull_url.indexOf('imdb') == -1) {
      res.send({success: false, message: '地址解析异常,请检查IMDB详情页地址是否输入正确.'});
    } else {
      pullVideoForADD_imdb(params, req, res);
    }
  } else if (optionsRadios1 == 'DOUBAN') {
    if (pull_url && pull_url.indexOf('douban') == -1) {
      res.send({success: false, message: '地址解析异常,请检查豆瓣详情页地址是否输入正确.'});
    } else {
      pullVideoForADD_douban(params, req, res)
    }
  } else {
    res.send({success: false, message: '没有找到符合的类型!'});
  }
});


var pullVideoForADD_imdb = (params, req, res)=> {
  requestModule(params.pull_url, (error, response, body)=> {
    if (error) {
      res.send({success: false, message: '请求异常,请检查路径是否输入正确!'});
      return;
    }
    var $ = cheerio.load(body.toString());//得到返回的值
    if (params.pull_url.indexOf('/?') > -1) {
      var site_id = params.pull_url.substring(params.pull_url.indexOf('/title/') + 7, params.pull_url.indexOf('/?'));
    } else {
      var site_id = params.pull_url.substring(params.pull_url.indexOf('/title/') + 7, params.pull_url.lastIndexOf('/'));
    }
    if (!site_id) {
      res.send({success: false, message: '缺少site_id'});
      return;
    }
    var title = $("div#title-overview-widget div.title_block div.title_wrapper>h1").text();
    if (title.indexOf('(') > -1 && title.indexOf(')') > -1) {
      title = title.substring(0, title.indexOf('('));
    }
    /*var title_node = title.replace(/[^A-Z]/g, "");
     if(title_node){
     title_node = title_node.toLowerCase();
     }*/
    var arr = title.split(' ');
    var title_node = '';
    arr.forEach(function (item) {
      title_node += item.charAt(0);
    });
    if (title_node) {
      title_node = title_node.toLocaleLowerCase();
    }
    var rate = $("div#title-overview-widget div.title_block div.ratingValue>strong").text();
    var obj = {};
    obj.site_id = site_id;
    obj.site_type = 'IMDB';
    obj.i18n_language = 'en';
    obj.title = title;
    obj.title_node = title_node;
    obj.rate = rate;
    if (params.tv_type == 'TV') {
      obj.is_serial = 1;
    } else {
      obj.is_serial = 0;
    }
    videoService.findOneVideo({
      site_id: site_id,
      site_type: 'IMDB'
      //tv_type: _params.tv_type,
      //type: _params.type
    }, ['key_id'], (err, video)=> {
      if (!video) {
        commIMDBVal($, function (v_obj) {
          obj.time_long = v_obj.time_long;
          obj.language = v_obj.language;
          obj.tag = v_obj.tag;
          obj.exhibition_time = v_obj.exhibition_time.replace(/\n/g, "");
          if (obj.exhibition_time) {
            obj.exhibition_time = dateUtils.convertDate(obj.exhibition_time);
          }
          if (params.tv_type == 'Animation') {
            if (v_obj.episodes > 1) {
              obj.is_serial = 1;
            }
          }
          obj.year = obj.exhibition_time.split('-')[0];
          obj.cover_logo_s = v_obj.cover_logo_s;
          obj.cover_logo = v_obj.cover_logo;
          obj.director = v_obj.director;
          obj.writers = v_obj.writers;
          obj.actor = v_obj.actor;
          obj.episodes = v_obj.episodes;
          obj.introduction = v_obj.introduction.replace(/(^\s*)|(\s*$)/g, "");
          res.send({success: true, data: obj, message: '爬取成功'});
        });
      } else {
        res.send({success: false, message: '视频已经存在了...'});
      }
    });
  });

};


var pullVideoForADD_douban = (params, req, res)=> {
  requestModule(params.pull_url, (error, response, body)=> {
    if (error) {
      res.send({success: false, message: '请求异常,请检查路径是否输入正确!'});
      return;
    }
    var $ = cheerio.load(body.toString());//得到返回的值
    var title = $("#content>h1>span[property = 'v:itemreviewed']").text();
    if (title) {
      var titleArr = title.split(' ');
      title = titleArr[0];
      if (titleArr[1] && titleArr[1].indexOf('第') > -1) {
        title += " " + titleArr[1];
      }
    }
    var title_node = converter.pinyinInitial(title);
    if (params.pull_url.indexOf('?') > -1) {
      var site_id = params.pull_url.substring(0, params.pull_url.indexOf('?')).replace(/[^0-9]/ig, "");
    } else {
      var site_id = params.pull_url.replace(/[^0-9]/ig, "");
    }
    var rate = $("#interest_sectl div.rating_self").find('strong[property="v:average"]').text();
    var cover_logo_s = $("#content div#mainpic>a>img").attr('src');
    var cover_logo = '';
    if (cover_logo_s) {
      cover_logo = cover_logo_s.replace('movie_poster_cover/lpst', 'photo/photo');
    }
    var obj = {};
    obj.title = title;
    obj.cover_logo = cover_logo;
    obj.cover_logo_s = cover_logo_s;
    obj.title_node = title_node;
    obj.site_id = site_id;
    obj.rate = rate;
    obj.i18n_language = 'zh';
    videoService.findOneVideo({
      site_id: site_id,
      site_type: 'DOUBAN'
      //tv_type: _params.tv_type,
      //type: _params.type
    }, ['key_id'], (err, video)=> {
      if (!video) {
        commVal($, 'single', function (v_obj) {
          if (params.tv_type == 'Movie') {
            obj.is_serial = 0;
          } else if (params.tv_type == 'TV') {
            obj.is_serial = 1;
          } else {
            if (params.tv_type == 'Animation') {
              if (v_obj.episodes > 1) {
                obj.is_serial = 1;
              } else {
                obj.is_serial = 0;
              }
            }
          }
          obj.writers = v_obj.writers;
          obj.actor = v_obj.actor;
          obj.director = v_obj.director;
          obj.tag = v_obj.type;
          obj.exhibition_time = v_obj.exhibition_time;
          obj.introduction = v_obj.introduction;
          obj.production_country = v_obj.production_country;
          obj.time_long = v_obj.time_long;
          obj.episodes = v_obj.episodes;
          obj.language = v_obj.language;
          obj.advance_picture = v_obj.advance_picture;
          obj.year = v_obj.year;
          res.send({success: true, data: obj, message: '爬取成功'});
        });
      } else {
        res.send({success: false, message: '视频已经存在了...'});
      }
    });
  });
};
