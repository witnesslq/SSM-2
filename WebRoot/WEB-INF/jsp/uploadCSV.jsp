﻿<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
    <meta charset="utf-8">
    <!--网页头部图片-->
    <link rel="icon" href="favicon.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <link rel="Bookmark" href="favicon.ico">
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="css/index.css" rel="stylesheet" type="text/css">
    <script src="js/jquery-2.2.4.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
</head>

<body onLoad="javascript:window.resizeTo(screen.availWidth,screen.availHeight);window.moveTo(0,0) ">
		
        <div class="tab-content">
            <!--第一页--原始数据上传-->
            <div class="tab-pane fade in active" id="second_1">
                <!--上传原始数据-->
                <div class="tab-content menu-third-content navbar-fixed-top">
                    <div class="tab-pane fade in active" id="three_1">
                   
                        <!--上传原始数据 第一个三级菜单-->
                        <ul id="myTab" class="nav nav-tabs menu_rihgt_after">
                            <li class="active">
                                <a href="#three_c_1" data-toggle="tab"><img src="images/menu_third.png">&nbsp;&nbsp;上传原始数据</a>
                            </li>
                        </ul>
                        </div>
                </div>
                        <!--文件上传-->
                        <div class="tab-content menu_third_page">
                            <!-----------------------上传------------------>
                            <div class="tab-pane fade in active menu-third container" id="three_c_1">
                                <!--上传按钮-->
                                <div class="upload_icon">
                                    <!--上传图标-->
                                    <div class="upload"><img width="200px" src="images/upload2.png"></div>
                                    <br>
                                    <form id="uploadForm">
	                                    <div class="upload">
	                                        <a href="javascript:;" class="file">选择 CSV 文件
	                                                <input type="file" name="file" id="file"  onchange="fileList()" accept=".csv" multiple>
	                                        		
	                                        </a>
	                                        <c:if test="${db_endtime != null}">
	                                        	<span>&nbsp;温馨提示：你的数据截止日期为${db_endtime}</span>
	                                        </c:if>
	                                        
	                                    </div >
	                                    <!--上传取消按钮-->
	                                    <div>
	                                    	<input type="button" class="up_btn"onclick="UpladFile()" value="上传" />
	                                    	<input type="button" class="up_btn up_clean"onclick="upClean()" value="清除全部" />
	                                    </div>
	                                    <div id="addList">
	                                        <br>
	                                        <hr class='line' />
	                                        <!--进度条生成位置-->
	                                        
	                                    </div>
	                                    <div style="width:100%;height:100px;overflow:hidden"></div>
                                    </form>
                                </div>
                                <br>
                                <br>
                                <br>
                            </div>
                        </div>
                    
            </div>
            <!--第一页--原始数据上传over-->
        </div>
   
</body>
<script>
    /*获取上传的文件*/
    function fileList() {
        $(".up_btn").show(); /*显示全部上传和清除全部按钮*/
        var q = document.getElementById("file").files; /*获得文件数组*/
        /*alert(q[0].name);*/
        for (var i = 0; i <= q.length; i++) { /*添加文件显示信息*/
            $("#addList").append("<div class='col-md-12 list_padding'><div class='col-md-2 list_padding'><div class='progress progress-striped active'><div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' time=" + (q[i].size) + " style='width: 0%;'></div></div></div><div class='fileName col-md-2'><div>大小：" + "<span class='fileSize'>" + Math.round((q[i].size) / 1000) + "</span>" + "KB</div></div><div class='fileName'><div>文件名：" + q[i].name + "</div></div></div><hr class='line col-md-12'/></div>");
        }
    }

    /*清除上传文件*/
    function upClean() {
        location.reload();
    }
    /*点击上传进度条走*/   
        var xhr;
        var ot;//
        var oloaded;
        //上传文件方法
        function UpladFile() {
        	
        	
        	var p = $(".progress-bar"); /*获取进度条*/
			p.each(function () {
			$(this).animate({
                width: "100%"
                 }, parseInt(10000 * Math.random()));
			});
        	
        	
            var fileObj = document.getElementById("file").files[0]; // js 获取文件对象
            var url = "${pageContext.request.contextPath}/fileUpload.action"; // 接收上传文件的后台地址 
           
           
            var form = new FormData($("#uploadForm" )[0]); // FormData 对象
           
            xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
            xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
            xhr.onload = uploadComplete; //请求完成
            xhr.onerror =  uploadFailed; //请求失败
            xhr.upload.onprogress = progressFunction;//【上传进度调用方法实现】
            xhr.upload.onloadstart = function(){//上传开始执行方法
                ot = new Date().getTime();   //设置上传开始时间
                oloaded = 0;//设置上传开始时，以上传的文件大小为0
            };
            xhr.send(form); //开始上传，发送form数据
        }
        //上传进度实现方法，上传过程中会频繁调用该方法
        function progressFunction(evt) {
            $(window.parent.document).find(".jindutiao").css("display","block");
            
            
            
             var progressBar = $(window.parent.document).find("#progressBar");
             var percentageDiv = $(window.parent.document).find("#percentage");
             // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
             if (evt.lengthComputable) {//
                 progressBar.max = evt.total;
                 progressBar.value = evt.loaded;
                 percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
             }
            
            var time = $(window.parent.document).find("#time");
            var nt = new Date().getTime();//获取当前时间
            var pertime = (nt-ot)/1000; //计算出上次调用该方法时到现在的时间差，单位为s
            ot = new Date().getTime(); //重新赋值时间，用于下次计算
            
            var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b       
            oloaded = evt.loaded;//重新赋值已上传文件大小，用以下次计算
        
            //上传速度计算
            var speed = perload/pertime;//单位b/s
            var bspeed = speed;
            var units = 'b/s';//单位名称
            if(speed/1024>1){
                speed = speed/1024;
                units = 'k/s';
            }
            if(speed/1024>1){
                speed = speed/1024;
                units = 'M/s';
            }
            speed = speed.toFixed(1);
            //剩余时间
            var resttime = ((evt.total-evt.loaded)/bspeed).toFixed(1);
            
            if(resttime <= 0.0){$(window.parent.document).find(".sccg").html("文件正在上传，请稍后。。。");}
            $(window.parent.document).find("#time").html('文件上传速度：'+speed+units+"<br>请勿进行其他操作！");
               if(bspeed==0)
                time.innerHTML = '上传已取消';
           
        }
        //上传成功响应
        function uploadComplete(evt) {
         //服务断接收完文件返回的结果
	     		$(window.parent.document).find(".sccg").html("正在计算数据，请稍后。。。");
				$(window.parent.document).find("#time").html("<br>请勿进行其他操作！");
				var args = {"time": new Date()};
				$.post("doJbdata_jb.action",args,function(){
					$(window.parent.document).find("#time").html("<br>操作完成，即将关闭！");
					$("#progressBar").css('display','none');
					$(window.parent.document).find('.jindutiao').css('display','none');
					location.reload();
				});
        }
        //上传失败
        function uploadFailed(evt) {
            alert("上传失败！");
        }
          //取消上传
        function cancleUploadFile(){
            xhr.abort();
        }  
</script>

</html>