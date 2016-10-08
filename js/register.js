
/************ 登录开始  ******************/
/*github上无法创建数据库，故暂不开发与后台交互功能*/
/***********  登录结束  *****************/

/************ 注册开始  ******************/
var canRegister=0;//是否满足注册条件

$("#login_check").on('blur','input',function(){
    if(this.name=='username'){
        var username_filter=/^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!username_filter.test(this.value)){$(this).next("span").removeClass("hidden");}
    }
    else if(this.name=='pwd'){
        var pwd_filter=/^([a-zA-Z0-9_\.\-]{6,20})$/;
        if(!pwd_filter.test(this.value)){$(this).nextAll("span#pwd_length").removeClass("hidden");}
        else if(/^([a-zA-Z0-9_\.\-]{6,10})$/.test(this.value)){$(this).nextAll("span#pwd_lower").removeClass("hidden");}
        else if(/^([a-zA-Z0-9_\.\-]{11,15})$/.test(this.value)){$(this).nextAll("span#pwd_middle").removeClass("hidden");}
        else if(/^([a-zA-Z0-9_\.\-]{16,18})$/.test(this.value)){$(this).nextAll("span#pwd_high").removeClass("hidden");}
        else if(/^([a-zA-Z0-9_\.\-]{19,20})$/.test(this.value)){$(this).nextAll("span#pwd_safe").removeClass("hidden");}
        else{$(this).nextAll("span#pwd_length").addClass("hidden");}
    }
    else if(this.name=='pwd_confirm'){
        if($("input#pwdp").val()!=this.value){
            $(this).next("span").removeClass("hidden");
        }
    }
    else if(this.name=='txtReadName'){
        if(/^([\s]*)$/.test(this.value)){
            $(this).next("span").removeClass("hidden");
        }
    }
    else if(this.name=='txtCompany'){
        if(/^([\s]*)$/.test(this.value)){
            $(this).next("span").removeClass("hidden");
        }
    }
    else if(this.name=='txtPosition'){
        if(/^([\s]*)$/.test(this.value)){
            $(this).next("span").removeClass("hidden");
        }
    }
    else if(this.name=='txtMobileOrPhone'){
        var txtMobileOrPhone_filter=/(^((\+86)|(86))?(13)\d{9}$)|(1[3|5|7|8|][0-9]{9})/;
        if(!txtMobileOrPhone_filter.test(this.value)){$(this).next("span").removeClass("hidden");}
    }
    else if(this.name=='txtCountry'){
        if(/^([\s]*)$/.test(this.value)){
            $(this).next("span").removeClass("hidden");
        }
    }
    else if(this.name=='txtProvince'){
        if(/^([\s]*)$/.test(this.value)){
            $(this).next("span").removeClass("hidden");
        }
    }
    else if(this.name=='txtCity'){
        if(/^([\s]*)$/.test(this.value)){
            $(this).next("span").removeClass("hidden");
        }
    }

});

$("#login_check").on('focus','input',function(){
    $(this).nextAll("span").addClass("hidden");
    if(this.name=='txtCountry'){
        $(this).nextAll("ul").css('display','block');
    }
    else if(this.name=='txtProvince'){
        $(this).nextAll("ul").css('display','block');
    }
    else if(this.name=='txtCity'){
        $(this).nextAll("ul").css('display','block');
    }
});

var country=['中国','韩国','日本','新加坡'];
var province=[];
province[0]=['广东省','湖南省','浙江省','江苏省'];
province[1]=['汉城','釜山','仁川','京畿道'];
province[2]=['东京都','大阪府','北海道','京都府'];
province[3]=['新加坡'];
var city=[];
city[0]=['广州市','深圳市','东莞市','佛山市'];
city[1]=['长沙市','株洲市','湘潭市','邵阳市'];
city[2]=['杭州市','宁波市','温州市','绍兴市'];
city[3]=['南京市','苏州市','无锡市','宿迁市'];
city[4]=['汉城'];
city[5]=['釜山','机张郡'];
city[6]=['仁川','江华郡','瓮津郡'];
city[7]=['水原市','城南市','安山市','高阳市'];
city[8]=['东京'];
city[9]=['大阪市'];
city[10]=['札幌市'];
city[11]=['京都市'];
city[12]=['新加坡'];

var frag=new DocumentFragment();
for(var i= 0,len=country.length;i<len;i++){
    var li=document.createElement('li');
    li.innerHTML=country[i];
    frag.appendChild(li);
}
document.getElementById('list_country').appendChild(frag);

$("#list_country").hover(function(){
    $(this).css('display','block');
},function(){
    $(this).css('display','none');
});
$("#list_province").hover(function(){
    $(this).css('display','block');
},function(){
    $(this).css('display','none');
});
$("#list_city").hover(function(){
    $(this).css('display','block');
},function(){
    $(this).css('display','none');
});
var temp=0;
$("#list_country").on('click','li',function(){
    $("#txtCountry").val($(this).text());
    temp=$("#list_country>li").index($(this));
    var frag=new DocumentFragment();
    for(var i= 0,len=province[temp].length;i<len;i++){
        var li=document.createElement('li');
        li.innerHTML=province[temp][i];
        frag.appendChild(li);
    }
	//document.getElementById('list_province').empty();
    document.getElementById('list_province').appendChild(frag);
});
$("#list_province").on('click','li',function(){
    $("#txtProvince").val($(this).text());
    var temp1=$("#list_province>li").index($(this));
    var frag=new DocumentFragment();
    for(var i= 0,len=city[temp*4+temp1].length;i<len;i++){
        var li=document.createElement('li');
        li.innerHTML=city[temp*4+temp1][i];
        frag.appendChild(li);
    }
	//document.getElementById('list_city').empty();
    document.getElementById('list_city').appendChild(frag);
});
$("#list_city").on('click','li',function(){
    $("#txtCity").val($(this).text());
});

/*********** 验证码生成 ************/
var code;
function createCode(){
	 code = "";
	 var codeLength = 6; //验证码的长度
	 var checkCode = document.getElementById("checkCode");
	 var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
		  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
		  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
	 for(var i = 0; i < codeLength; i++) 
		 {
		  var charNum = Math.floor(Math.random() * 52);
		  code += codeChars[charNum];
		 }
	 if(checkCode) 
		 {
		  checkCode.className = "code";
		  checkCode.innerHTML = code;
		 }
}
function validateCode(){
	 var inputCode=document.getElementById("inputCode").value;
	 if(inputCode.length <= 0) 
		 {
		  alert("请输入验证码！");
		 }
	 else if(inputCode.toUpperCase() != code.toUpperCase()) 
		 {
		   alert("验证码输入有误！");
		   createCode();
		 }
	 else 
		 {
		  alert("验证码正确！");
		 }    
}
createCode();
/***********  注册结束  *****************/
