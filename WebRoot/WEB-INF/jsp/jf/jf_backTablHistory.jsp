﻿<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="css/index.css" rel="stylesheet" type="text/css">

</head>
<body>
	<div class="navbar-fixed-top"
		style="background:rgba(255, 255, 255, 0.95);">
		<!--右边二级菜单-->
		<!-- <ul id="myTab" class="nav nav-tabs menu_rihgt">
			<li class="active"><a class="31" href="#" data-toggle="tab">反馈报表</a>
			</li>
		</ul> -->
		<div class="tab-content menu-third-content">

			<div class="tab-pane fade in active">

				<ul id="myTab" class="nav nav-tabs menu_rihgt_after">
					<li class="active"><a href="#" data-toggle="tab"><img
							src="images/menu_third.png">&nbsp;&nbsp;反馈历史记录</a></li>
				</ul>
			</div>
		</div>
	</div>

	<div class="tab-content menu_third_page">
		<div class="tab-pane fade in active menu-third" id="three_c_31">
			<div id="printTable">
				<center>
					<div class="fmy">
						<h3>
							<div class="col-md-12">反馈历史记录</div>
						</h3>
					</div>
					<table id="energy_day" border="1" class="table">
						<tr>
							<th>编号</th>
							<th>文件名</th>
							<th>状态</th>
							<th>发布时间</th>
							<th>提交时间</th>
							<th>操作</th>
						</tr>
						<c:forEach items="${feedback01s}" varStatus="st" var="fb">
							<tr>
								<td>${st.index+1}</td>
								<td><fmt:formatDate value="${fb.time}"
										pattern="yyyy年MM月dd日"></fmt:formatDate>被动变量关联变量反馈表</td>
								<c:if test="${fb.type=='3'}">
									<td><span class="label label-success">已填写</span>
									</td>
								</c:if>
								<c:if test="${fb.type=='4'}">
									<td ><span class="label label-warning">已修改</span>
									</td>
								</c:if>
								<td><fmt:formatDate value="${fb.time}"
										pattern="yyyy年MM月dd日 HH:mm:ss"></fmt:formatDate>
								</td>
								<td><fmt:formatDate value="${fb.backtime}"
										pattern="yyyy年MM月dd日 HH:mm:ss"></fmt:formatDate>
								</td>
								<td><a
									href="jf_dofeedbackhis.action?fid=${fb.id}&cdate=${fb.time}"><button
											type="button" class="btn btn-info btn-sm">查看</button>
								</a> <a
									href="jf_updatefeedbackhis.action?fid=${fb.id}&cdate=${fb.time}"><button
											type="button" class="btn btn-success btn-sm">修改</button>
								</a></td>
							</tr>
						</c:forEach>
					</table>
				</center>
			</div>
		</div>
		<div class="end_page">
			<div class="message">
				共<i class="blue">${count}</i> 条记录，当前显示第&nbsp;<i class="blue">${page}&nbsp;</i>页
			</div>
			<div class="message">
				<ul>
					<c:set var="pages" value="${pages}" />
					<c:if test="${page>1}">
						<li><a href="jb_backTableHistory.action?page=${page-1}">上一页</a>
						</li>
					</c:if>
					<c:if test="${page<pages}">
						<li class="paginItem"><a
							href="jb_backTableHistory.action?page=${page+1}">下一页</a>
						</li>
					</c:if>
				</ul>
			</div>
		</div>
	</div>
</body>
<script src="js/jquery-2.2.4.min.js"></script>
<script src="js/bootstrap.min.js"></script>

</html>
