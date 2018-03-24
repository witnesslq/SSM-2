﻿<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
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
</head>

<body
	onLoad="javascript:window.resizeTo(screen.availWidth,screen.availHeight);window.moveTo(0,0) ">

	<div class="tab-content">

		<div class="tab-pane fade in active" id="second_1">
			<div class="tab-content menu-third-content navbar-fixed-top">
				<div class="tab-pane fade in active" id="three_1">
					<!--三级菜单-->
					<ul id="myTab" class="nav nav-tabs menu_rihgt_after">
						<li class="active"><a href="#three_c_1" data-toggle="tab"><img
								src="images/menu_third.png">&nbsp;&nbsp;执行反馈表</a>
						</li>
					</ul>
				</div>
			</div>
			
			<center>
				<div><br>
					<h3>调控指令执行信息表</h3>
					<c:if test="${feedback02s != null}">
						<div style="float:left;margin-left:7.5%;margin-bottom:10px">
							<h4 style="float:left" >调控指令发布时间：</h4>
							<h4 style="float:left" ><fmt:formatDate value="${cdate}" pattern="yyyy年MM月dd日"></fmt:formatDate></h4>
						</div>
						<table class="table" border="1px">
							<tr>
								<th>序号</th>
								<th>动态调控被动控制变量名</th>
								<th id="colNum" colspan="100">实施调控关联变量名 
							
								<!-- <img width="20px" id="rdccol" src="images/reduce.png"> 
								<img width="20px" id="addcol" src="images/add.png"> -->
								</th>
	
							</tr>
							
							<c:forEach var="fb" items="${feedback02s}" varStatus="st">
							<tr id="tdNum" class="addplace">
								<td>${st.index+1}</td>
								<td>${fb.passivevar}</td>
								<c:forEach var="p" items="${fb.feedback03s}">
								<td>
									${p.activevar}
								</td>
								</c:forEach>
							</tr>
							</c:forEach>
						</table>
					</c:if>
					<c:if test="${feedback02s == null}">
						暂无数据！
					</c:if>
				</div>
			</center>
		</div>
		<!--第一页--原始数据上传over-->
	</div>

	<script src="js/bootstrap.min.js"></script>
</body>

</html>