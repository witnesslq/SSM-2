﻿ <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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
                                    				<c:set var="db" value="${db_endtime}"></c:set>
	                                        		<c:set var="db_newendtime" value="${db_newendtime}"></c:set>
	                                                <c:if test="${db==db_newendtime}">
	                                              			  <h4>上传失败！</h4>
	                                              			  提示：
	                                              			  <h5>1.请检仔细查所有上传文件是否非标准excel（97~2003）文件，如果不是请打开另存为新的文件在进行保存！</h5>
	                                              			  <h5>2.请检查网络状态是否稳定！</h5>
	                                              			  <h5>3.上传过程中请勿进行其他操作！</h5>
	                                                </c:if>
	                                                 <c:if test="${db!=db_newendtime}">
	                                              			  上传成功！
	                                                </c:if>
	                                                <br>
	                                    <div class="upload">
	                                        <a href="jf_toUpload.action" class="file">
	                                        		重新上传
	                                        </a>
	                                       
	                                    </div >
	                                    
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


</html>