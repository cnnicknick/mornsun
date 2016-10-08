
/*************导航条子菜单弹出 开始******************/
$("#header_nav").on('mouseover','li',function(){
  var str=$(this).children('a').text();
  $('#sub_menu').css('display','block');
  $("#sub_menu>ul[name="+str+"]").css('display','block');
})
$("#header_nav").on('mouseout','li',function(){
  var str=$(this).children('a').text();
  $('#sub_menu').css('display','none');
  $("#sub_menu>ul[name="+str+"]").css('display','none');
})
$("#sub_menu>ul").hover(
    function(){$(this).css('display','block');$(this).parent().css('display','block')},
    function(){$(this).css('display','none');$(this).parent().css('display','none')});
/*************导航条子菜单弹出 结束******************/

/***********  轮播开始  *****************/
var imgs=[
  {"i":0,"img":"images/banner_source/banner_01.jpg"},
  {"i":1,"img":"images/banner_source/banner_02.jpg"},
  {"i":2,"img":"images/banner_source/banner_03.jpg"},
  {"i":3,"img":"images/banner_source/banner_04.jpg"},
  {"i":4,"img":"images/banner_source/banner_05.jpg"},
];
/*广告对象*/
var adv={
  LIWIDTH:1920,//每个li的宽度
  LIHEIGHT:330,//每个li的高度
  DURATION:500,//动画总时长
  INTERVAL:25,//动画时间间隔
  WAIT:4000,//自动轮播等待时间
  timer:null, //定时器序号
  canAuto:true,//是否可以自动轮播
  init:function() {//初始化广告对象，为ul绑定事件处理函数
    var self=this;
    //设置ulImgs的宽度
    //$("#imgs").style.width=self.LIWIDTH*imgs.length+"px";
    /*生成序号ul中的每个li*/
    for (var i=0,idxs=[];i<imgs.length;idxs[i]=i++ +1);
    $("#indexs").html('<li class="hover">'
    + idxs.join("</li><li>")+ '</li>');
    self.updateView();//更新界面

    //当鼠标进入序号ul时，启动手动滚动动画
    $("#indexs>li").on('mouseover',function() {
      var e = window.event || arguments[0];
      var target = e.srcElement || e.target;
      if (target.nodeName == "LI"
          && target.innerHTML != imgs[0].i + 1) {
        $("#indexs>.hover").removeClass();
        $(this).addClass("hover");
        self.move(target.innerHTML - 1 - imgs[0].i);
      }
    });
    //只要slider中只要发生进入事件，就禁止自动轮播
    $("#slider_box").on('mouseover',function(){
      self.canAuto=false;
    });
    //只要slider最后一次发生的是移出事件，就允许自动轮播
    $("#slider_box").on('mouseout',function(){
      self.canAuto=true;
    });
    //启动自动轮播
    self.automove();
  },
  //根据imgs数组更新广告ul界面，同时设置序号ul中li的hover
  updateView:function() {
    for(var i= 0,lis=[];i<imgs.length;i++){
      lis[i]='<li data-i="'+imgs[i].i+'">'
      +'<img src="'+imgs[i].img+'"/></li>';
    }
    $("#imgs").html(lis.join(""));
    //每次更新时找到上次hover的li，去掉hover
    $("#indexs>.hover").removeClass();
    //为imgs中第一个元素的i属性对应的li设置hover
    $("#indexs>li:eq("+imgs[0].i+")").addClass("hover");
  },
  //移动任意个li的方法
  move:function(n) { var self=this;
    clearTimeout(self.timer);//任何移动前，先停止其它动画
    self.timer=null;
    if(n<0){//右移，先设置数组元素，再播放动画
      var dels=imgs.splice(imgs.length-Math.abs(n),Math.abs(n));
      imgs=dels.concat(imgs);
      self.updateView();
      $("#imgs").css('left',self.LIWIDTH*n+"px");
    }
    self.moveStep(n);//开始移动动画
  },
  automove:function(){var self=this;
    self.timer=setTimeout(function(){
      if(self.canAuto) {//如果允许自动轮播
        self.move(1);//才继续移动
      }else{//否则，空调用automove继续等待，而什么都不做
        self.automove();
      }
    },self.WAIT);
  },
  moveStep:function(n) {//动画的每一步
    var self = this;
    var step = self.LIWIDTH * n * self.INTERVAL / self.DURATION;
    //var style =$("#imgs").css("left"); //getComputedStyle($("#imgs"));
    var left = parseFloat($("#imgs").css("left")) - step;
    $("#imgs").css("left",left + "px");
    if (n > 0 && left > -self.LIWIDTH * n
        || n < 0 && left < 0){//如果还未移动到位，就继续移动
      self.timer=setTimeout(function () {
        self.moveStep(n);
      }, self.INTERVAL);
    }else{//否则
      if(n>0){//如果是左移，要在移动后，将开头元素换到结尾
        var dels=imgs.splice(0,n);
        imgs=imgs.concat(dels);
        self.updateView();
      }
      $("#imgs").css("left","0px");
      self.automove();//只要移动结束，都要启动自动轮播
    }
  }
}
window.addEventListener("load",function() {
  adv.init();
},false);
/***********  轮播结束  *****************/