﻿<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="renderer" content="webkit"> 
<title>成都赛特优化节能平台</title>

<link rel="stylesheet" type="text/css" href="stylesheets/normalize.css">
<link rel="stylesheet" type="text/css" href="stylesheets/stylesheet.css">
<link rel="stylesheet" type="text/css" href="stylesheets/github-light.css">


<!--网页头部图片-->
<link rel="icon" href="/pic/images/favicon.ico" type="image/x-icon"/>
<link rel="shortcut icon" href="/pic/images/favicon.ico" type="image/x-icon"/>
<link rel="Bookmark" href="/pic/images/favicon.ico">

<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="css/index.css" rel="stylesheet" type="text/css">

<script type="text/javascript">

			//setInterval("freshPage()",1000);//间隔1秒执行一次
			setTimeout("freshPage()",1000);
            function freshPage(){
                var flag = 0;
                //请求位置
                var val = "message";
                var url = "${pageContext.request.contextPath}/showMessageNumer";
                var args = {"message":val,"time": new Date()};
                $.post(url,args,function(data){
                	var nu = data.split('。');
                	var newmsg = "";
                	flag = data;
                	//消息条数
                	$("#msg_txt").html(nu[0]);
                	for(var i = 1;i <= nu[0];i++){
                		newmsg += "<li><a href=''>"+i+"."+nu[i]+"</a></li>";
                	}
                	$("#messageCount").html(newmsg);
                	//alert(nu[0]);
                	if( flag!= 0 ){//若有消息，滑出消息框
                        //alert("s")
                         $(".newMessage").animate({bottom:"5px"});
                		//$("#messageSound").play();
                    }else{//消息阅读，移出消息框
                         $(".newMessage").animate({bottom:"-300px"});
                         //$("#messageSound").pause();
                    }
                });
            };
        /*退出按钮
        $(function(){
            $(".newMessage_exit").click(function(){
               alert("sd");
                $(".newMessage").animate({bottom:"-300px"});
                $("#messageSound").pause();
            });
        });*/
        
    </script>
    
    <style>
      
        .newMessage{width:300px;min-height:200px;background:rgba(255, 255, 255, 0.9);box-shadow:0px 0px 10px #000;position:fixed;right:10px;bottom:-300px;z-index:100;font-family: microsoft YaHei}
        .newMessage_top div{color:#fff;padding:5px 0px ;float: left;text-align: center}
        .newMessage_title{background:#FF5E3A;width: 300px}
        /*.newMessage_exit{background: #ff0000;width: 30px}
        .newMessage_exit:hover{background: #ffffff;color:red}*/
        .message_content{float: left;padding:10px;}
        .newMessage a{text-decoration: none}
        .newMessage a:link{color:#000;}/*未被访问）*/
        .newMessage a:hover{color:red}/*（鼠标悬停*/）
        .newMessage a:visited{color:#b9b9b9;}/*（访问过：真正到达那个页面）*/
        .message_content ul{padding-left:5px;}
        .jd_left,.jd_right{float:left}
        .jd_right{padding:20px;}
    </style>



</head>
<body class="index_body" onLoad="javascript:window.resizeTo(screen.availWidth,screen.availHeight);window.moveTo(0,0) ">
	<div class="jindutiao" style='width:100%;height:100%;background:rgba(0, 0, 0, 0.77);position:fixed;z-index:1000000;display:none'>
		<div style="width:650px;background:#fff;margin:0 auto;padding:30px;margin-top:15%;min-height:250px">
		<h4><center>温馨提示</center></h4>
		<hr style="height:1px;border:none;border-top:1px solid #1B627B;">
			<div style="width:70%;margin:0 auto">
				<div class="jd_left"><img src="/pic/images/loading.gif"></div>
				<div class="jd_right">
					<div class="sccg"></div>
					<div id='time'></div>
					<div class="czwc"></div>
				</div>
			</div>
		</div>
	</div>
	<!--消息刷新-->
		<div class="newMessage">
	        <div class="newMessage_top">
	            <div class="newMessage_title">您有新的消息</div>
	            <!--<div class="newMessage_exit">X</div>
	        --></div>
        
	        <div class="message_content">
	            <ul>
	                <li><a href="#" id="messageCount"></a></li>
	                
	            </ul>
	        </div>
    		<audio id="messageSound"autoplay="autoplay" loop="loop" src="css/newMessage.wav">
			您的浏览器不支持声音提醒!
			</audio>
		</div>
	<!--返回按钮-->
    <div class="history">
        <div class="back"><a href="javascript:;" title="返回上一级" onClick="javascript:history.back(-1);"><img width="40px" height="40px" src="/pic/images/back.png"></a></div>
        <div class="back"><a href="index.action"><img width="40px" title="返回首页"height="40px" src="/pic/images/home.png"></a></div>
    </div>
    <!-----------------------------------------------头部------------------------------------------------------------>
    <div class="head navbar-fixed-top">
        <!--左边logo-->
        <div class="col-md-6 col-sm-6 col-xs-6 head_left">
            <div class="col-md-1 col-sm-1 col-xs-1 logo"><img width="650px" src="images/logo_web_before.gif"></div>
            <!--<div class="col-md-4 logo_text"><h3>成都赛特节能平台</h3></div>-->
        </div>
        <!--右边头像-->
        <div class="col-md-6 col-sm-6 col-xs-6 head-right">
            <div class="head_exit">
                <button id="loginout" class="btn_1 btn-danger">退出登录</button>
            </div>
            <div class="head_welcome">
                <h4 id="meaasgenumber">欢迎你！</h4>
                <h4>${user.utruename}${user.sex}</h4>
                
            </div>
            <div class="head_usr"><img class="head_usr_img" width="50px" height="50px" src="/pic/images/${user.headimage}"></div>
            <!--消息-->
            <div class="message_top">
               <a id="showMessagetwo">
                  <!-- 信封-->
                    <div class="msg_img"><img width="40px" src="/pic/images/message.png"></div>
                    <!--条数-->
                   
                 <c:if test="${number != null}">
                    <div class="msg_txt"><center id="msg_txt">${number}</center></div>
                    </c:if>
                    
                </a>
            </div>
            <!-- ${user.company} -->
            
            
            <div class="theme">
            	<div style="margin-top: 13px;"><h4>
            	${user.company}
            	
            	</h4></div>
            </div>
            
        </div>
    </div>
    <!---------------------------------------------头部结束------------------------------------------------------------>


    <!------------------------------------------------中间----------------------------------------------------------->
    <div>
        <!------------左边菜单---------------->
        <div class="col-md-2 col-sm-2 col-xs-2 body_left">
        	
            <div class="panel-group" id="accordion">
             <div class="panel panel-default">
             	
                    <!--一级菜单-->
                    <div class="panel-heading pop" data-container="body" data-toggle="popover" data-placement="right">
                        <h4 class="panel-title" href="#second_4" data-toggle="tab">
                            <a data-toggle="collapse" data-parent="#accordion" 
                               href="#collapseFour" >
                               <img width="30px" src="images/body_left_9.png" />&nbsp; <span class="menu_text">信息修改</span>
                            </a>
                        </h4>
                    </div>
                    <!--二级菜单-->
                     <c:if test="${user.company=='金杯有限公司'}">
	                    <div id="collapseFour" class="panel-collapse collapse ">
	                        <div class="panel-body">
	                            <ul class="nav nav-tabs">
	                            	 <li class="menu_second">
	                                    <a  data-toggle="tab" id="jb_toupUifo">
	                                        <span class="menu_second_txt ">
	                                            <img src="images/body_left_4.png">&nbsp;个人资料
	                                        </span>
	                                    </a>
	                                </li>
	
									<li class="menu_second">
	                                    <a  data-toggle="tab" id="jb_change_pass">
	                                        <span class="menu_second_txt ">
	                                            <img src="images/body_left_5.png">&nbsp;修改密码
	                                        </span>
	                                    </a>
	                                </li>
	                                
	                               
	                            </ul>
	                        </div>
	                    </div>
                    </c:if>
                     <c:if test="${user.company=='玖源有限公司'}">
                    <div id="collapseFour" class="panel-collapse collapse ">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                                <li class="menu_second">
                                    <a  data-toggle="tab" id="jy_toupUifo">
                                        <span class="menu_second_txt ">
                                            <img src="images/body_left_4.png">&nbsp;个人资料
                                        </span>
                                    </a>
                                </li>

								<li class="menu_second">
                                    <a  data-toggle="tab" id="jy_change_pass">
                                        <span class="menu_second_txt ">
                                            <img src="images/body_left_5.png">&nbsp;修改密码
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </c:if>
                    <c:if test="${user.company=='建峰有限公司'}">
                    <div id="collapseFour" class="panel-collapse collapse ">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                                <li class="menu_second">
                                    <a  data-toggle="tab" id="jf_toupUifo">
                                        <span class="menu_second_txt ">
                                            <img src="images/body_left_4.png">&nbsp;个人资料
                                        </span>
                                    </a>
                                </li>

								<li class="menu_second">
                                    <a  data-toggle="tab" id="jf_change_pass">
                                        <span class="menu_second_txt ">
                                            <img src="images/body_left_5.png">&nbsp;修改密码
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </c:if>
                </div>
                <!--原始数据上传-->
                <div class="panel panel-default">
                    <!--一级菜单-->
                     
                    <div class="panel-heading pop" data-container="body" data-toggle="popover" data-placement="right">
                        <h4 class="panel-title" href="#second_1" data-toggle="tab">
                            <a data-toggle="collapse" data-parent="#accordion" 
                               href="#collapseOne">
                               <img width="30px" src="images/body_left_10.png"/>&nbsp; <span class="menu_text">数据上传</span>
                            </a>
                        </h4>
                    </div>
                   
                  
                   
                    <!--二级菜单-->
                    
                     <c:if test="${user.company=='金杯有限公司'}">
                    <div id="collapseOne" class="panel-collapse collapse">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                                <li class="menu_second">
                                    <a id="1" onclick="change_right(this)" href="#three_1" data-toggle="tab">
                                        <span class="menu_second_txt ">
                                            <img src="images/body_left_4.png">&nbsp;上传excel
                                        </span>
                                    </a>
                                </li>
                                  
                               
                            </ul>
                        </div>
                    </div>
                    </c:if>
                     <c:if test="${user.company=='建峰有限公司'}">
                    <div id="collapseOne" class="panel-collapse collapse">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                                <li class="menu_second">
                                    <a id="jf_upload" onclick="change_right(this)" href="#three_1" data-toggle="tab">
                                        <span class="menu_second_txt ">
                                            <img src="images/body_left_4.png">&nbsp;原始数据上传
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </c:if>
                     <c:if test="${user.company=='其他公司'}">
                    <div id="collapseOne" class="panel-collapse collapse">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                                <li class="menu_second">
                                    <a id="qt_upload" onclick="change_right(this)" href="#three_1" data-toggle="tab">
                                        <span class="menu_second_txt ">
                                            <img src="images/body_left_4.png">&nbsp;原始数据上传
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </c:if>
                   <c:if test="${user.company=='玖源有限公司'}">
                    <div id="collapseOne" class="panel-collapse collapse">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                                <li class="menu_second">
                                    <a id="jy" onclick="change_right(this)" href="#three_1" data-toggle="tab">
                                        <span class="menu_second_txt ">
                                            <img src="images/body_left_4.png">&nbsp;上传excel
                                        </span>
                                    </a>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                    </c:if>
                     <c:if test="${user.company=='广安玖源有限公司'}">
                    <div id="collapseOne" class="panel-collapse collapse">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                                <li class="menu_second">
                                    <a id="gajy_upload" onclick="change_right(this)" href="#three_1" data-toggle="tab">
                                        <span class="menu_second_txt ">
                                            <img src="images/body_left_4.png">&nbsp;上传excel
                                        </span>
                                    </a>
                                </li>
                                  
                               
                            </ul>
                        </div>
                    </div>
                    </c:if>
                </div>
                <!--指导数据-->
                <div class="panel panel-default">
                    <!--一级菜单-->
                    <c:if test="${ user.company !='广安玖源有限公司' && user.company !='其他公司'}">
                    <div class="panel-heading pop" data-container="body" data-toggle="popover" data-placement="right">
                        <h4 class="panel-title" href="#second_2" data-toggle="tab">
                            <a data-toggle="collapse" data-parent="#accordion" 
                               href="#collapseTwo">
                               <img width="30px" src="images/body_left_1.png"/>&nbsp; <span class="menu_text">指导文件</span>
                            </a>
                        </h4>
                    </div>
                    </c:if>
                    <!--二级菜单-->
                      <c:if test="${user.company=='金杯有限公司'}">
                    <div id="collapseTwo" class="panel-collapse collapse ">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                               
                                 <li class="menu_second">
                                    <a class="third_menu_aaa" href="#"  data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_6.png">&nbsp;优化方案系列文件</span>
                                    </a>
                                </li>
                                <li class="menu_second">
                                  <div class="third_menu_" >
                                   		<h5 id="optpar"><a class="" href="#"><span>优化工艺指标</span></a></h5>
                                      <h5 id=Varass><a class="" href="#"><span>变量关联分析文件</span></a></h5>
                                      <h5 id="Dynreg"><a class="" href="#"><span>动态调控分析文件</span></a></h5>
                                   </div>
                                </li>
                                
                                <li class="menu_second up">
                                    <a id="datashow" href="#" data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_7.png">&nbsp;跟踪分析系列文件</span>
                                    </a>
                                </li>
                                 <li class="menu_second up">
                                    <a id="showhistory" href="#three_2" data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_5.png">&nbsp;指导文件历史记录</span>
                                    </a>
                                </li>
                                <%--<li class="menu_second up">
                                    <a id="showtable" href="#" data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_4.png">&nbsp;指令执行信息表</span>
                                    </a>
                                </li>
                            --%></ul>
                        </div>
                    </div>
               		</c:if>
               		<c:if test="${user.company=='建峰有限公司'}">
                    <div id="collapseTwo" class="panel-collapse collapse ">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                               
                                 <li class="menu_second">
                                    <a class="third_menu_aaa" href="#"  data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_6.png">&nbsp;优化方案系列文件</span>
                                    </a>
                                </li>
                                <li class="menu_second">
                                  <div class="third_menu_" >
                                   		<h5 id="jf_optpar"><a class="" href="#"><span>优化工艺指标</span></a></h5><%--
                                      <h5 id=jf_Varass><a class="" href="#"><span>变量关联分析文件</span></a></h5>
                                      --%><h5 id="jf_Dynreg"><a class="" href="#"><span>动态调控指令</span></a></h5>
                                   </div>
                                </li>
                                
                                <li class="menu_second up">
                                    <a id="jf_datashow" href="#" data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_7.png">&nbsp;跟踪分析系列文件</span>
                                    </a>
                                </li>
                                 <li class="menu_second up">
                                    <a id="jf_showhistory" href="#three_2" data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_5.png">&nbsp;推送记录</span>
                                    </a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
               		</c:if>
               		<c:if test="${user.company=='玖源有限公司'}">
               		<div id="collapseTwo" class="panel-collapse collapse ">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                               
                                 <li class="menu_second">
                                    <a class="third_menu_aaa" href="#"  data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_6.png">&nbsp;优化方案系列文件</span>
                                    </a>
                                </li>
                                <li class="menu_second">
                                  <div class="third_menu_" >
                                   		<h5 id="jy_optpar"><a class="" href="#"><span>优化工艺指标</span></a></h5>
                                      <h5 id=jy_Varass><a class="" href="#"><span>变量关联分析文件</span></a></h5>
                                      <h5 id="jy_Dynreg"><a class="" href="#"><span>动态调控分析文件</span></a></h5>
                                   </div>
                                </li>
                                
                                <li class="menu_second up">
                                    <a id="jy_datashow" href="#" data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_7.png">&nbsp;跟踪分析系列文件</span>
                                    </a>
                                </li>
                                 <li class="menu_second up">
                                    <a id="jy_showhistory" href="#three_2" data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_5.png">&nbsp;指导文件历史记录</span>
                                    </a>
                                </li>
                                <li class="menu_second up">
                                    <a id="jy_fankui" href="#" data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_7.png">&nbsp;调控指令执行反馈表</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
               	</c:if>
                </div>
                <!--能耗监测-->
                <c:if test="${user.jurisdiction=='董事长'&& user.company=='金杯有限公司'}">
                <div class="panel panel-default">
                    <!--一级菜单-->
                    <div class="panel-heading pop" data-container="body" data-toggle="popover" data-placement="right">
                        <h4 class="panel-title" href="#second_3" data-toggle="tab">
                            <a data-toggle="collapse" data-parent="#accordion" 
                               href="#collapseThree">
                               <img width="30px" src="images/body_left_11.png"/>&nbsp; <span class="menu_text">能耗监测</span>
                            </a>
                        </h4>
                    </div>
                    <!--二级菜单-->
                    <div id="collapseThree" class="panel-collapse collapse ">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                                <li class="menu_second">
                                    <a id="31" onclick="change_ifrm()" href="to_show_day_data.action" data-toggle="tab"><span class="menu_second_txt "><img src="images/body_left_4.png">&nbsp;日 报 表</span></a>
                                </li>
                               
                                <li class="menu_second">
                                    <a id="33" onclick="change_ifrm(this)" href="do_select_Mouth.action" data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_6.png">&nbsp;月 报 表</span>
                                    </a>
                                </li>
                                <li class="menu_second">
                                    <a id="34" onclick="change_ifrm(this)" href="#three_34" data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_7.png">&nbsp;季度报表</span>
                                    </a>
                                </li>
                                <li class="menu_second">
                                    <a id="35" onclick="change_ifrm(this)" href="#three_35" data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_7.png">&nbsp;年度报表</span>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                </c:if>
                
               <!--  玖源 -->
                 <c:if test="${user.jurisdiction=='董事长'&& user.company=='玖源有限公司'}">
                <div class="panel panel-default">
                    <!--一级菜单-->
                    <div class="panel-heading pop" data-container="body" data-toggle="popover" data-placement="right">
                        <h4 class="panel-title" href="#second_3" data-toggle="tab">
                            <a data-toggle="collapse" data-parent="#accordion" 
                               href="#collapseThree">
                               <img width="30px" src="images/body_left_11.png"/>&nbsp; 能耗监测
                            </a>
                        </h4>
                    </div>
                    <!--二级菜单-->
                    <div id="collapseThree" class="panel-collapse collapse ">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                                <li class="menu_second">
                                    <a id="jy_31" onclick="change_ifrm()" href="to_show_day_data.action" data-toggle="tab"><span class="menu_second_txt "><img src="images/body_left_4.png">&nbsp;日 报 表</span></a>
                                </li>
                               
                                <li class="menu_second">
                                    <a id="jy_33" onclick="change_ifrm(this)" href="do_select_Mouth.action" data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_6.png">&nbsp;月 报 表</span>
                                    </a>
                                </li>
                                <li class="menu_second">
                                    <a id="jy_34" onclick="change_ifrm(this)" href="#three_34" data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_7.png">&nbsp;季度报表</span>
                                    </a>
                                </li>
                                <li class="menu_second">
                                    <a id="jy_35" onclick="change_ifrm(this)" href="#three_35" data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_7.png">&nbsp;年度报表</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                </c:if>
                
                <c:if test="${user.jurisdiction=='董事长'&& user.company=='建峰有限公司'}">
                <div class="panel panel-default">
                    <!--一级菜单-->
                    <div class="panel-heading pop" data-container="body" data-toggle="popover" data-placement="right">
                        <h4 class="panel-title" href="#second_3" data-toggle="tab">
                            <a data-toggle="collapse" data-parent="#accordion" 
                               href="#collapseThree">
                               <img width="30px" src="images/body_left_11.png"/>&nbsp; <span class="menu_text">能耗监测</span>
                            </a>
                        </h4>
                    </div>
                    <!--二级菜单-->
                    <div id="collapseThree" class="panel-collapse collapse ">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                                <li class="menu_second">
                                    <a id="jf31" onclick="change_ifrm()" href="jf_to_show_day_data.action" data-toggle="tab"><span class="menu_second_txt "><img src="images/body_left_4.png">&nbsp;日 报 表</span></a>
                                </li>
                               
                                <li class="menu_second">
                                    <a id="jf33" onclick="change_ifrm(this)" href="jfdo_select_Mouth.action" data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_6.png">&nbsp;月 报 表</span>
                                    </a>
                                </li>
                                <li class="menu_second">
                                    <a id="jf34" onclick="change_ifrm(this)" href="#three_34" data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_7.png">&nbsp;季度报表</span>
                                    </a>
                                </li>
                                <li class="menu_second">
                                    <a id="jf35" onclick="change_ifrm(this)" href="#three_35" data-toggle="tab">
                                        <span class="menu_second_txt "><img src="images/body_left_7.png">&nbsp;年度报表</span>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                </c:if>
               
               
                <!--个人信息修改-->
               
               <!--  消息管理 -->
                <c:if test="${user.company=='金杯有限公司'}">
                 <div class="panel panel-default">
                    <!--一级菜单-->
                    <div class="panel-heading pop" data-container="body" data-toggle="popover" data-placement="right">
                        <h4 class="panel-title" href="#second_4" data-toggle="tab">
                            <a data-toggle="collapse" data-parent="#accordion" 
                               href="#collapseFive" >
                               <img width="30px" src="images/body_left_9.png"/>&nbsp; <span class="menu_text">消息管理 </span>
                            </a>
                        </h4>
                    </div>
                    <!--二级菜单-->
                    <div id="collapseFive" class="panel-collapse collapse ">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                                <li class="menu_second">
                                    <a  data-toggle="tab" id="showmessage">
                                        <span class="menu_second_txt ">
                                            <img src="images/body_left_4.png">&nbsp;消息列表 
                                        </span>
                                    </a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                </c:if>
                <c:if test="${user.company=='建峰有限公司'}">
                 <div class="panel panel-default">
                    <!--一级菜单-->
                    <div class="panel-heading pop" data-container="body" data-toggle="popover" data-placement="right">
                        <h4 class="panel-title" href="#second_4" data-toggle="tab">
                            <a data-toggle="collapse" data-parent="#accordion" 
                               href="#collapseFive" >
                               <img width="30px" src="images/body_left_9.png"/>&nbsp; <span class="menu_text">消息管理 </span>
                            </a>
                        </h4>
                    </div>
                    <!--二级菜单-->
                    <div id="collapseFive" class="panel-collapse collapse ">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                                <li class="menu_second">
                                    <a  data-toggle="tab" id="jf_showmessage">
                                        <span class="menu_second_txt ">
                                            <img src="images/body_left_4.png">&nbsp;消息列表 
                                        </span>
                                    </a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                </c:if>
            <c:if test="${user.company=='玖源有限公司'}">
             <div class="panel panel-default">
                    <!--一级菜单-->
                    <div class="panel-heading pop" data-container="body" data-toggle="popover" data-placement="right">
                        <h4 class="panel-title" href="#second_4" data-toggle="tab">
                            <a data-toggle="collapse" data-parent="#accordion" 
                               href="#collapseFive" >
                               <img width="30px" src="images/body_left_9.png"/>&nbsp; 消息管理   
                            </a>
                        </h4>
                    </div>
                    <!--二级菜单-->
                    <div id="collapseFive" class="panel-collapse collapse ">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                                <li class="menu_second">
                                    <a  data-toggle="tab" id="jy_showmessage">
                                        <span class="menu_second_txt ">
                                            <img src="images/body_left_4.png">&nbsp;消息列表 
                                        </span>
                                    </a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </c:if>
            <!--  反馈报表 -->
                <c:if test="${user.company=='金杯有限公司'}">
                 <div class="panel panel-default">
                    <!--一级菜单-->
                    <div class="panel-heading pop" data-container="body" data-toggle="popover" data-placement="right">
                        <h4 class="panel-title" href="#second_4" data-toggle="tab">
                            <a data-toggle="collapse" data-parent="#accordion" 
                               href="#collapseTable" >
                               <img width="30px" src="images/body_left_1.png"/>&nbsp; <span class="menu_text">反馈报表 </span>
                            </a>
                        </h4>
                    </div>
                    <!--二级菜单-->
                    <div id="collapseTable" class="panel-collapse collapse ">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                                <li class="menu_second">
                                    <a  data-toggle="tab" id="jb_backtable">
                                        <span class="menu_second_txt ">
                                            <img src="images/body_left_4.png">&nbsp;执行反馈表 
                                        </span>
                                    </a>
                                </li>
                                <li class="menu_second">
                                    <a  data-toggle="tab" id="jb_backtablehis">
                                        <span class="menu_second_txt ">
                                            <img src="images/body_left_4.png">&nbsp;反馈表纪录
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                </c:if>
                 <c:if test="${user.company=='建峰有限公司'}">
                 <div class="panel panel-default">
                    <!--一级菜单-->
                    <div class="panel-heading pop" data-container="body" data-toggle="popover" data-placement="right">
                        <h4 class="panel-title" href="#second_4" data-toggle="tab">
                            <a data-toggle="collapse" data-parent="#accordion" 
                               href="#collapseTable" >
                               <img width="30px" src="images/body_left_1.png"/>&nbsp; <span class="menu_text">执行情况反馈 </span>
                            </a>
                        </h4>
                    </div>
                    <!--二级菜单-->
                    <div id="collapseTable" class="panel-collapse collapse ">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                                <li class="menu_second">
                                    <a  data-toggle="tab" id="jf_backtable">
                                        <span class="menu_second_txt ">
                                            <img src="images/body_left_4.png">&nbsp;执行反馈表 
                                        </span>
                                    </a>
                                </li>
                                <li class="menu_second">
                                    <a  data-toggle="tab" id="jf_backtablehis">
                                        <span class="menu_second_txt ">
                                            <img src="images/body_left_4.png">&nbsp;反馈历史记录
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                </c:if>
                
            </div>
        </div>
        <!------------左边菜单结束------------>
        <!-- 收起放开菜单操坐 -->
		<div class="menu_slide">
       		<div><img id="img_menu" title="收放菜单" width="50px" height="50px" src="images/menu_in.png"></div>
       	</div>
        <!--------------右边--------------------->
        <div class="col-md-10 col-sm-10 col-xs-10 body_right">
            <iframe id="iframepage" src="welcome.action" frameborder="0px" style="width:100%;border:none; background:transparent"></iframe>
        </div>
        <div class="test" style="background:red; width:100%;">we</div>
        <!-------------右边结束------------------->
    </div>
    <!--------------------------------------------中间结束----------------------------------------------------->
    
    <script src="js/jquery-2.2.4.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    
    <script>

	$(function(){
	   	
		
    
		/********************* 能耗监测    菜单跳转**************************/
		/**** 金杯能耗监测*** */
		$("html").on("click","#33",function(){
			$("#iframepage").attr("src","do_select_Mouth.action");
		});
		$("html").on("click","#31",function(){
			$("#iframepage").attr("src","to_show_day_data.action");
		});
		$("html").on("click","#34",function(){
			$("#iframepage").attr("src","do_select_Quarter.action");
		});
		$("html").on("click","#35",function(){
			$("#iframepage").attr("src","do_select_Year.action");
		});


		/****jfdata建峰能耗监测****/
		$("html").on("click","#jf31",function(){
			$("#iframepage").attr("src","jf_loadDayData.action");
		});
		$("html").on("click","#jf33",function(){
			$("#iframepage").attr("src","jf_loadMouthData.action");
		});
		$("html").on("click","#jf34",function(){
			$("#iframepage").attr("src","jf_loadQuarterData.action");
		});
		$("html").on("click","#jf35",function(){
			$("#iframepage").attr("src","jf_loadYearData.action");
		});
		
		
		/**** jydata玖源能耗监测 ****/
		$("html").on("click","#jy_33",function(){
			$("#iframepage").attr("src","jy_do_select_Mouth.action");
		});
		$("html").on("click","#jy_31",function(){
			$("#iframepage").attr("src","jy_to_show_day_data.action");
		});
		$("html").on("click","#jy_34",function(){
			$("#iframepage").attr("src","jy_do_select_Quarter.action");
		});
		$("html").on("click","#jy_35",function(){
			$("#iframepage").attr("src","jy_do_select_Year.action");
		});
		$("html").on("click","#ajaxupload",function(){
			$("#iframepage").attr("src","Ajaxtoupload.action");
		});
		/********************* 能耗监测     菜单跳转   结束**************************/
		
		/********************* 数据上传     菜单跳转   **************************/
		/* 金杯上传 */
		$("html").on("click","#1",function(){
			$("#iframepage").attr("src","toupload.action");
		});
		/* 建峰 */
		$("html").on("click","#jf_upload",function(){
			$("#iframepage").attr("src","jf_toUpload.action");
		});
		/* 其他公司上传 */
		$("html").on("click","#qt_upload",function(){
			$("#iframepage").attr("src","qt_upload.action");
		});
		/* 玖源 */
		$("html").on("click","#jy",function(){
			$("#iframepage").attr("src","jy_toUpload.action")
		});
		/* 广安玖源上传 */
		$("html").on("click","#gajy_upload",function(){
			$("#iframepage").attr("src","gajy_toupload.action");
		});
		/********************* 数据上传     菜单跳转  结束 **************************/
		
		
		/********************* 指导文件    菜单跳转  **************************/
		/************金杯指导文件 ********/
		/* 跟踪分析系列文件 */
		$("html").on("click","#datashow",function(){
			$("#iframepage").attr("src","showTrackUnCheck.action");
		});
		/* 变量关联系列文件 */
		$("html").on("click","#Varass",function(){
			$("#iframepage").attr("src","showoptimizationUnCheck.action");
		});
		/* 动态调控系列文件 */
		$("html").on("click","#Dynreg",function(){
			$("#iframepage").attr("src","showDynreg.action");
		});
		/* 优化工艺指标 */
		$("html").on("click","#optpar",function(){
			$("#iframepage").attr("src","optpar.action");
		});
		/* 指导文件历史记录 */
		$("html").on("click","#showhistory",function(){
			$("#iframepage").attr("src","showguidehist.action");
		});
		/* 指导文件历史记录 */
		$("html").on("click","#showtable",function(){
			$("#iframepage").attr("src","showtable.action");
		});

		/*****玖源指导文件*****/
		/* 跟踪分析系列文件 */
		$("html").on("click","#jy_datashow",function(){
			$("#iframepage").attr("src","jy_showTrackUnCheck.action");
		});
		/* 变量关联系列文件 */
		$("html").on("click","#jy_Varass",function(){
			$("#iframepage").attr("src","jy_showoptimizationUnCheck.action");
		});
		/* 动态调控系列文件 */
		$("html").on("click","#jy_Dynreg",function(){
			$("#iframepage").attr("src","jy_showDynreg.action");
		});
		/* 优化工艺指标 */
		$("html").on("click","#jy_optpar",function(){
			$("#iframepage").attr("src","jy_optpar.action");
		});
		/* 指导文件历史记录 */
		$("html").on("click","#jy_showhistory",function(){
			$("#iframepage").attr("src","jy_showguidehist.action");
		});
		/* 指导文件历史记录 */
		$("html").on("click","#jy_fankui",function(){
			$("#iframepage").attr("src","jy_fankui.action");
		});
		/***** 建峰指导文件 *****/
		/* 跟踪分析系列文件 */
		$("html").on("click","#jf_datashow",function(){
			$("#iframepage").attr("src","jf_showTrackUnCheck.action");
		});
		/* 变量关联系列文件 */
		$("html").on("click","#jf_Varass",function(){
			$("#iframepage").attr("src","jf_showoptimizationUnCheck.action");
		});
		/* 动态调控系列文件 */
		$("html").on("click","#jf_Dynreg",function(){
			$("#iframepage").attr("src","jf_showDynreg.action");
		});
		/* 优化工艺指标 */
		$("html").on("click","#jf_optpar",function(){
			$("#iframepage").attr("src","jf_optpar.action");
		});
		/* 指导文件历史记录 */
		$("html").on("click","#jf_showhistory",function(){
			$("#iframepage").attr("src","jf_showguidehist.action");
		});
		/* 暂无 */
		/********************* 指导文件    菜单跳转  结束**************************/
		
		/********************* 个人资料 **********************/
		/* 金杯用户个人资料 */
		$("html").on("click","#jb_toupUifo",function(){
			$("#iframepage").attr("src","toupUifo.action")
		});
		/* 修改密码 */
		$("html").on("click","#jb_change_pass",function(){
			$("#iframepage").attr("src","touppass.action")
		});
		/* 玖源 */
		/* 修改资料 */
		$("html").on("click","#jy_toupUifo",function(){
			$("#iframepage").attr("src","jy_toupUifo.action")
		});
		/* 修改密码 */
		$("html").on("click","#jy_change_pass",function(){
			$("#iframepage").attr("src","jy_tojyuppassUifo.action")
		});
		/* 建峰 */
		/* 修改资料 */
		$("html").on("click","#jf_toupUifo",function(){
			$("#iframepage").attr("src","jf_toPersonalData.action")
		});
		/* 改密码 */
		$("html").on("click","#jf_change_pass",function(){
			$("#iframepage").attr("src","jf_toPasswordData.action")
		});
		/********************* 个人资料  结束**********************/
		
		/************************ 消息管理 ****************/
		/* 前台消息管理 */
		$("html").on("click","#showmessage",function(){
			$("#iframepage").attr("src","showMessage.action")
		});
		$("html").on("click","#jf_showmessage",function(){
			$("#iframepage").attr("src","jf_showMessage.action")
		});
		/* 前台消息管理 */
		/*$("html").on("click","#showMessagetwo",function(){
			$("#iframepage").attr("src","showMessage.action")
		});*/
		/* 前台消息管理 */
		$("html").on("click","#jy_showmessage",function(){
			$("#iframepage").attr("src","jy_showMessage.action")
		});
		$("html").on("click","#jb_backtable",function(){
			$("#iframepage").attr("src","jb_backTable.action")
		});

		$("html").on("click","#jb_backtablehis",function(){
			$("#iframepage").attr("src","jb_backTableHistory.action")
		});
		$("html").on("click","#jf_backtable",function(){
			$("#iframepage").attr("src","jf_backTable.action")
		});

		$("html").on("click","#jf_backtablehis",function(){
			$("#iframepage").attr("src","jf_backTableHistory.action")
		});

		/************************ 消息管理 结束 ****************/

	})

        /*一开始加载*/
        $(window).load(ifrmHt());
        /*窗口变化时加载*/
        $(window).resize(function(){
            ifrmHt();
        })
        /*设置iframe高度*/
        function ifrmHt(){
            /*获取浏览器文本框高度*/
            var windowHeight = $(window).height();
            var ht = windowHeight-70 + "px";
            /*设置iframe高度*/
            $("#iframepage").css("height", ht);
        }

        /* 三级菜单弹出与隐藏 */
        $(document).ready(function(){
        	$("body").on("click",".third_menu_aaa",function(){
        		$(".third_menu_").slideToggle(300);
        	});
           
            $(".up").click(function(){
                        $(".third_menu_").slideUp();
                     });
            $(".panel-heading").click(function(){
                        $(".third_menu_").slideUp();
                     });
       });
        
    </script>
    <script type="text/javascript" src="js/data.js"></script>
    <script src="js/jquery-migrate-1.1.0.js"></script>

    <script type="text/javascript">
	$("#loginout").click(function(){
	  
		window.location.href="loginout.action"
	})
	 /*三级菜单点击背景替换*/
        $(".third_menu_ h5").click(function(){
            $(this).css("background","#e6e6e6")
            $(this).siblings().css("background","linear-gradient(to right, #ffffff, #ebebeb, #ffffff)")
        })
        /*信息抖动*/
        setInterval("shock()",2500)
        function shock(){
            $(".msg_txt").animate({"margin-top":"-13px"},100);
            $(".msg_txt").animate({"margin-top":"-17px"},100);
            $(".msg_txt").animate({"margin-top":"-13px"},100);
            $(".msg_txt").animate({"margin-top":"-17px"},100);
            $(".msg_txt").animate({"margin-top":"-12px"},100);
        }
        
	/* 点击收起 */
	var flag_menu = false;
	$(".menu_slide").click(function(){
		/* 当菜单未收起 时收起菜单*/
		if(flag_menu == false){
			/* 收放块移动 */
			$(this).animate({marginLeft:"60px"});
			/* 菜单移动 */
			$(".body_left").animate({width:"70px"});
			/* 右边移动 */
			$(".body_right").animate({width:"96.5%",left:"74px"});
			$('.pop').popover('hide'); /* 隐藏所有pop */
			/* 收起所有二级菜单 */
			$(".collapse").removeClass("in");
			/* 二级菜单padding归零 */
			$(".menu_second_txt").css("padding-left","0px");
			/* 让菜单不能展开 */
			$(".panel-heading a").removeAttr("data-toggle");
			/* 隐藏菜单 */
			$(".menu_text").css("display","none");
			 
			setTimeout(function(){
				/* 切换按钮图片 */
				$("#img_menu").attr("src","images/menu_out.png");
			}, 200);
			flag_menu = true;
			
		/* 当菜单已收起时展开菜单 */
		}else if(flag_menu == true){
			/* 收放块移动 */
			$(this).animate({marginLeft:"11%"});
			/* 菜单移动 */
			$(".body_left").animate({width:"12%"});
			/* 右边移动 */
			$(".body_right").animate({width:"88%",left:"12.2%"});
			/* 回复菜单能展开功能 */
			$(".panel-heading a").attr("data-toggle","collapse");
			/* 二级菜单padding回复*/
			$(".menu_second_txt").css("padding-left","15%");
			$('.pop').popover('hide'); /* 隐藏所有pop */
			setTimeout(function(){
				/* 延时显示菜单，保持布局 */
				$(".menu_text").css("display","inline-block");
			},400);
			
			setTimeout(function(){
				/* 切换图片 */
				$("#img_menu").attr("src","images/menu_in.png");
			}, 250);
			flag_menu = false;
		}
	});
	
	/*  鼠标点击 弹出菜单*/
	   		$(".pop").popover({
				trigger:'manual', 
				html: true,
	            title: function () {
	                return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>"+$(this).find(".menu_text").html()+"</b>";
	            },
	            content: function () {
	              return $(this).siblings().find(".panel-body").html();
	            }
	        });
	        $(".body_right").hover(function(){
	        	$('.pop').popover('hide');
	        })
	        $(".pop").click(function (event) {
	            $('.pop').popover('hide');          // 当点击一个按钮的时候把其他的所有内容先关闭。
	            if(flag_menu == true){
	           		$(this).popover('toggle');          // 然后只把自己打开。
	            }
	        }); 
    	
</script>
    
  

</body>


</html>
  
  
  
  
  
  
  
  
 