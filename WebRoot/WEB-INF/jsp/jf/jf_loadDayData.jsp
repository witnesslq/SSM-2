﻿<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fun" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta charset="utf-8">
<title>成都赛特优化节能平台</title>
<!--时间控件-->
<link rel="stylesheet" type="text/css" href="stylesheets/normalize.css" media="screen">
<link rel="stylesheet" type="text/css" href="stylesheets/stylesheet.css" media="screen">
<link rel="stylesheet" type="text/css" href="stylesheets/github-light.css" media="screen">
<link type="text/css" rel="stylesheet" href="jedate/skin/jedate.css">
<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="css/htmleaf-demo.css">
<link href="css/tableexport.min.css" rel="stylesheet">
<link href="css/index.css" rel="stylesheet" type="text/css">
</head>
<body onLoad="javascript:window.resizeTo(screen.availWidth,screen.availHeight);window.moveTo(0,0) ">
	<img alt="" id="loading" src="images/ajax_soon.gif" style="display: none">
	<div style="padding-top:5px;background:#fff" class="tab-content navbar-fixed-top print_hidden">
		<ul id="myTab" class="nav nav-tabs menu_rihgt">
			<li class="active"><a class="31" href="jf_loadDayData.action">日 报 表</a></li>
			<%--<li><a href="jf_loadMouthData.action">月 报 表</a></li>
			<li><a href="jf_loadQuarterData.action">季度报表</a></li>
			<li><a href="jf_loadYearData.action">年度报表</a></li>
		--%></ul>
		<div class="tab-content menu-third-content">
			<div class="tab-pane fade in active">
				<ul id="myTab" class="nav nav-tabs menu_rihgt_after">
					<li class="active"><a href="#three_c_31" data-toggle="tab"><img src="images/menu_third.png">&nbsp;&nbsp;按日查看</a></li>
					<li><a href="#three_c_32" data-toggle="tab"><img src="images/menu_third.png">&nbsp;&nbsp;按班查看</a></li>
					<div id="message"></div>
				</ul>
			</div>
		</div>
	</div>
	<!--能耗分期日考核日报表--->
	<c:if test="${fun:length(jfdayList) > 0}">
		<div class="tab-content menu_third_page" id="appmsg">
			<!-----------------------按日查看------------------>
			<div class="tab-pane fade in active menu-third" id="three_c_31">
				<!-----------------------打印内容------------------>
				<div>
					<center>
						<div class="fmy">
							<h3>
								<div class="col-md-5 col-sm-5 col-xs-5  print_hidden">
									<div class="chart_title_l">
										<form action="">
											<span class="date_title print_hidden">考核时间:</span> 
											<input name="date_begin" class="datainp" id="indate_day_day1" type="text" value="${edate_begin}" readonly> 
											<span class="date_title">-</span> 
											<input name="date_end" class="datainp" id="indate_day_day2" type="text" value="${edate_end}" readonly> 
											<input type="button" class="look print_hidden" id="day_day_show" value="查看">
										</form>
									</div>
								</div>
								<div class="col-md-5 col-sm-5 col-xs-5">
									<div class="chart_title_l">日报表--按日查看</div>
								</div>
								<!--打印按钮-->
								<div class="col-md-2 col-sm-2 col-xs-2 print_hidden">
									<div class="chart_title_r">
								</div>
							</h3>
						</div>
						<!--固定表头-->
						<table class="table tbl_hd_dd">
							<tr>
								<th>时间段</th>
								<th>日氨产量<br>(t)</th>
								<th>日驰放气折氨量<br>(t)</th>
								<th>日天然气耗<br>(Nm<sup>3</sup>)</th>
								<th>日蒸汽耗<br>(折标煤)(kgce)</th>
								<th>日氨产量<br>(含驰放气折算)(t)</th>
								<th>小时氨产量<br>(含驰放气折算)(t/h)</th>
								<th>吨氨天然气耗<br>(Nm<sup>3</sup>/tNH<sub>3</sub>)</th>
								<th>吨氨综合消耗<br>(kgce/tNH<sub>3</sub>)</th>
								<th>样本数</th>
							</tr>

							<c:forEach var="day" items="${jfdayList}" varStatus="st1">
								<c:if test="${st1.index <= 0}">
									<tr class="hiden_tr">
										<c:if test="${day.data_time != null}">
									<td><fmt:formatDate value="${day.data_time}"pattern="yyyy/MM/dd" /></td>
								</c:if>
								<c:if test="${day.data_time == null}">
									<td>合计</td>
								</c:if>
									<td><fmt:formatNumber value="${day.time_FIQ162}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber value="${day.time_purge_nh3 + 0.0001}" pattern="##.###" minFractionDigits="3"></fmt:formatNumber></td>
									<td><fmt:formatNumber value="${day.time_FIQ203 + 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber value="${day.time_steam_coal + 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber value="${day.time_NH3 + 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber value="${day.time_NH3/day.orig_id *6 + 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber value="${day.time_FIQ203/day.time_NH3 + 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber value="${(day.time_FIQ203/day.time_NH3)*1.2143+day.time_steam_coal/day.time_NH3 + 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber value="${day.orig_id}" pattern="##" minFractionDigits="0"></fmt:formatNumber></td>
									</tr>
								</c:if>
							</c:forEach>
							
						</table>
						<!--表格和折线图-->
						<table id="energy_day"  class="table">
							<tr>
								<th>时间段</th>
								<th>日氨产量<br>(t)</th>
								<th>日驰放气折氨量<br>(t)</th>
								<th>日天然气耗<br>(Nm<sup>3</sup>)</th>
								<th>日蒸汽耗<br>(折标煤)(kgce)</th>
								<th>日氨产量<br>(含驰放气折算)(t)</th>
								
								<th>小时氨产量<br>(含驰放气折算)(t/h)</th>
								<th>吨氨天然气耗<br>(Nm<sup>3</sup>/tNH<sub>3</sub>)</th>
								
								<th>吨氨综合消耗<br>(kgce/tNH<sub>3</sub>)</th>
								<th>样本数</th>
							</tr>

							<c:forEach var="day" items="${jfdayList}" varStatus="st">
								<tr <c:if test="${(day.time_FIQ162 > 6000 || day.time_FIQ162 < 0 ) && st.index != st.count-1}"> style = "color: blue"</c:if>>
								<c:if test="${day.data_time != null}">
									<td><fmt:formatDate value="${day.data_time}"pattern="yyyy/MM/dd" /></td>
								</c:if>
								<c:if test="${day.data_time == null}">
									<td>合计</td>
								</c:if>
									<td><fmt:formatNumber value="${day.time_FIQ162}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber value="${day.time_purge_nh3 + 0.0001}" pattern="##.###" minFractionDigits="3"></fmt:formatNumber></td>
									<td><fmt:formatNumber value="${day.time_FIQ203 + 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber value="${day.time_steam_coal + 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber value="${day.time_NH3 + 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									
									<td><fmt:formatNumber value="${day.time_NH3/day.orig_id *6 + 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber value="${day.time_FIQ203/day.time_NH3 + 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									
									<td><fmt:formatNumber value="${(day.time_FIQ203/day.time_NH3)*1.2143+day.time_steam_coal/day.time_NH3 + 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber value="${day.orig_id}" pattern="##" minFractionDigits="0"></fmt:formatNumber></td>
								</tr>
							</c:forEach>
							
						</table>
						<table  class="table "  id="ene1">
							<tr class = "exetable">
								<td colspan="10"style="text-align: left;">
								<span class="date_title print_hidden">注：①&nbsp;小时氨产量(含驰放气折算)(t/h)= 日氨产量(含驰放气折算)(t)÷样本数×6；</span> <br>
									<span class="date_title print_hidden">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;②&nbsp;吨氨天然气耗(Nm<sup>3</sup>/tNH<sub>3</sub>)= 日天然气耗(Nm<sup>3</sup>)÷日氨产量(含驰放气折算)(t)；</span><br>
									<span class="date_title print_hidden">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;③&nbsp;吨氨综合消耗(kgce/tNH<sub>3</sub>)= 日蒸汽耗(折标煤)(kgce)÷日氨产量(含驰放气折算)(t)+1.2143(kgce/Nm<sup>3</sup>)×吨氨天然气耗(Nm<sup>3</sup>/tNH<sub>3</sub>)；<br>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标煤换算系数：气田天然气：1.2143kgce/Nm<sup>3</sup>，参见《综合能耗计算通则》(GB/T2589—2008)。
									</span>
								</td>
							</tr>
						</table>
						<!--  1 -->
						<div id="lineChart_day">
							<div class="line-chart" id="container_day"></div>
						</div><br>
						
						<!-- 3 -->
						<div id="lineChart_day_2">
							<div class="line-chart" id="container_day_2"></div>
						</div><br>
						<!--4 -->
						<div id="lineChart_day_3">
							<div class="line-chart" id="container_day_3"></div>
						</div><br>
					</center>
				</div>
				<br> <br> <br>
			</div>
			<!-----------------------按班查看------------------->
			<div class="tab-pane fade menu-third" id="three_c_32">
				<div>
					<center>
						<div class="fmy">
							<h3>
								<div class="col-md-5 col-sm-5 col-xs-5 print_hidden">
									<div class="chart_title_l">
										<form action="jf_to_show_day_data.action" method="post">
											<span class="date_title print_hidden">考核时间:</span> 
											<input name="date_begin" class="datainp" id="indate_day_ban1" type="text" value="${edate_begin}" readonly> 
											<span class="date_title">-</span>  
											<input name="date_end" class="datainp" id="indate_day_ban2" type="text" value="${edate_end}" readonly>
											<input type="button" class="look print_hidden" id="day_class_show" value="查看">
										</form>
									</div>
								</div>
								<div class="col-md-5 col-sm-5 col-xs-5">
									<div class="chart_title_l">日报表--按班查看</div>
								</div>
							</h3>
						</div>
						<!--固定表头-->
						<table class="table tbl1 tbl_hd_db">
							<tr>
								<th>时间段</th>
								<th style="width:60px">班次</th>
								<th>班氨产量<br>(t)</th>
								<th>班驰放气折氨量<br>(t)</th>
								<th>班天然气耗<br>(Nm<sup>3</sup>)</th>
								<th>班蒸汽耗<br>(折标煤)(kgce)</th>
								<th>班氨产量)<br>(含驰放气折算(t)</th>
							
								<th>小时氨产量<br>(含驰放气折算)(t/h)</th>
								<th>吨氨天然气耗<br>(Nm<sup>3</sup>/tNH<sub>3</sub>)</th>
								
								<th>吨氨综合消耗<br>(kgce/tNH<sub>3</sub>)</th>
								<th>样本数</th>
							</tr>
							<c:forEach var="mon" items="${monList}" varStatus="st">
								<c:if test="${st.index<=0 }">
									<tr class="hiden_tr">
									<c:if test="${mon.data_time !=null}">
										<td><fmt:formatDate value="${mon.data_time}" pattern="yyyy/MM/dd" /></td>
									</c:if>
									<c:if test="${mon.data_time ==null}">
										<td>合计</td>
									</c:if>
									<c:if test="${mon.classNumber==1}">
										<td>白班<c:if test="${mon.shift!=0}">(<fmt:formatNumber value="${mon.shift/mon.orig_id}" pattern="##" minFractionDigits="0"></fmt:formatNumber>)
									</c:if>
									</td>
									</c:if>
									<c:if test="${mon.classNumber==2}">
										<td>中班<c:if test="${mon.shift!=0}">(<fmt:formatNumber value="${mon.shift/mon.orig_id}" pattern="##" minFractionDigits="0"></fmt:formatNumber>)
									</c:if></td>
									</c:if>
									<c:if test="${mon.classNumber==3}">
										<td>夜班<c:if test="${mon.shift!=0}">(<fmt:formatNumber value="${mon.shift/mon.orig_id}" pattern="##" minFractionDigits="0"></fmt:formatNumber>)
									</c:if></td>
									</c:if>
									<c:if test="${mon.classNumber==11}">
										<td>1 班</td>
									</c:if>
									<c:if test="${mon.classNumber==12}">
										<td>2 班</td>
									</c:if>
									<c:if test="${mon.classNumber==13}">
										<td>3 班</td>
									</c:if>
									<c:if test="${mon.classNumber==14}">
										<td>4 班</td>
									</c:if>
									<c:if test="${mon.time_FIQ162 == 0}">
										<td>--</td>
									</c:if>
									<c:if test="${mon.time_FIQ162 != 0}">
										<td><fmt:formatNumber value="${mon.time_FIQ162+ 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									</c:if>
									<c:if test="${mon.time_purge_nh3 == 0}">
										<td>--</td>
									</c:if>
									<c:if test="${mon.time_purge_nh3 != 0}">
										<td><fmt:formatNumber value="${mon.time_purge_nh3+ 0.0001}" pattern="##.###" minFractionDigits="3"></fmt:formatNumber></td>
									</c:if>
									<c:if test="${mon.time_FIQ203 == 0}">
										<td>--</td>
									</c:if>
									<c:if test="${mon.time_FIQ203 != 0}">
										<td><fmt:formatNumber value="${mon.time_FIQ203+ 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									</c:if>
									<c:if test="${mon.time_steam_coal == 0}">
										<td>--</td>
									</c:if>
									<c:if test="${mon.time_steam_coal != 0}">
										<td><fmt:formatNumber value="${mon.time_steam_coal+ 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									</c:if>
									<c:if test="${mon.time_NH3 == 0}">
										<td>--</td>
									</c:if>
									<c:if test="${mon.time_NH3 != 0}">
										<td><fmt:formatNumber value="${mon.time_NH3 + 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									</c:if>
									<c:if test="${mon.time_FIQ203 == 0}">
										<td>--</td>
									</c:if>
									
									<c:if test="${mon.orig_id == 0}">
										<td>--</td>
									</c:if>
									<c:if test="${mon.orig_id != 0}">
										<td><fmt:formatNumber value="${mon.time_NH3/mon.orig_id * 6 + 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									</c:if>
									<c:if test="${mon.time_purge_nh3 == 0}">
										<td>--</td>
									</c:if>
									<c:if test="${mon.time_purge_nh3 != 0}">
										<td><fmt:formatNumber value="${mon.time_FIQ203/mon.time_purge_nh3 + 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									</c:if>
									<c:if test="${mon.time_purge_nh3  == 0}">
										<td>--</td>
									</c:if>
									
									<c:if test="${mon.time_purge_nh3 == 0}">
										<td>--</td>
									</c:if>
									<c:if test="${mon.time_purge_nh3 != 0}">
										<td><fmt:formatNumber value="${mon.time_FIQ203/mon.time_purge_nh3*1.2143+mon.time_steam_coal+ 0.0001}"pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									</c:if>
									<td><fmt:formatNumber value="${mon.orig_id}" pattern="##" minFractionDigits="0"></fmt:formatNumber></td>
									</tr>
								</c:if>
							</c:forEach>
						</table>
						<!--数据表格-->
						<table id="energy_day_ban"  class="table tbl1">
							<tr>
								<th>时间段</th>
								<th style="width:60px">班次</th>
								<th>班氨产量<br>(t)</th>
								<th>班驰放气折氨量<br>(t)</th>
								<th>班天然气耗<br>(Nm<sup>3</sup>)</th>
								<th>班蒸汽耗<br>(折标煤)(kgce)</th>
								<th>班氨产量)<br>(含驰放气折算(t)</th>
								<th>小时氨产量<br>(含驰放气折算)(t/h)</th>
								<th>吨氨天然气耗<br>(Nm<sup>3</sup>/tNH<sub>3</sub>)</th>
								<th>吨氨综合消耗<br>(kgce/tNH<sub>3</sub>)</th>
								<th>样本数</th>
							</tr>
							<c:forEach var="mon" items="${monList}">
								<tr><%--
								//时间段
								--%><c:if test="${mon.data_time !=null}">
									<td><fmt:formatDate value="${mon.data_time}" pattern="yyyy/MM/dd" /></td>
								</c:if>
								<c:if test="${mon.data_time ==null}">
									<td>合计</td>
								</c:if><%--
								//班次
								--%><c:if test="${mon.classNumber==1}">
									<td>白班<c:if test="${mon.shift!=0}">(<fmt:formatNumber value="${mon.shift/mon.orig_id}" pattern="##" minFractionDigits="0"></fmt:formatNumber>)</td>
								</c:if>
								</c:if>
								<c:if test="${mon.classNumber==2}">
									<td>中班<c:if test="${mon.shift!=0}">(<fmt:formatNumber value="${mon.shift/mon.orig_id}" pattern="##" minFractionDigits="0"></fmt:formatNumber>)</td>
								</c:if>
								</c:if>
								<c:if test="${mon.classNumber==3}">
									<td>夜班<c:if test="${mon.shift!=0}">(<fmt:formatNumber value="${mon.shift/mon.orig_id}" pattern="##" minFractionDigits="0"></fmt:formatNumber>)</td>
								</c:if>
								</c:if>
								<c:if test="${mon.classNumber==11}">
									<td>1 班</td>
								</c:if>
								<c:if test="${mon.classNumber==12}">
									<td>2 班</td>
								</c:if>
								<c:if test="${mon.classNumber==13}">
									<td>3 班</td>
								</c:if>
								<c:if test="${mon.classNumber==14}">
									<td>4 班</td>
								</c:if><%--
								//>班氨产量
								--%><c:if test="${mon.time_FIQ162 == 0}">
									<td>--</td>
								</c:if>
								<c:if test="${mon.time_FIQ162 != 0}">
									<td><fmt:formatNumber value="${mon.time_FIQ162+ 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
								</c:if><%--
								//班稀氨水<br>(折氨量)(t)
								--%><c:if test="${mon.time_purge_nh3 == 0}">
									<td>--</td>
								</c:if>
								<c:if test="${mon.time_purge_nh3 != 0}">
									<td><fmt:formatNumber value="${mon.time_purge_nh3+ 0.0001}" pattern="##.###" minFractionDigits="3"></fmt:formatNumber></td>
								</c:if><%--
								//>班天然气耗
								--%><c:if test="${mon.time_FIQ203 == 0}">
									<td>--</td>
								</c:if>
								<c:if test="${mon.time_FIQ203 != 0}">
									<td><fmt:formatNumber value="${mon.time_FIQ203+ 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
								</c:if><%--
								//班蒸汽耗<br>(折标煤)
								--%><c:if test="${mon.time_steam_coal == 0}">
									<td>--</td>
								</c:if>
								<c:if test="${mon.time_steam_coal != 0}">
									<td><fmt:formatNumber value="${mon.time_steam_coal+ 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
								</c:if><%--
								//班氨产量<br>(含稀氨水折氨量)
								--%><c:if test="${mon.time_NH3 == 0}">
									<td>--</td>
								</c:if>
								<c:if test="${mon.time_NH3 != 0}">
									<td><fmt:formatNumber value="${mon.time_NH3 + 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
								</c:if><%--
								//小时氨产量<br>(含稀氨水折算)
								--%><c:if test="${mon.orig_id == 0}">
									<td>--</td>
								</c:if>
								<c:if test="${mon.orig_id != 0}">
									<td><fmt:formatNumber value="${mon.time_NH3/mon.orig_id * 6 + 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
								</c:if><%--
								//吨氨天然气耗
								--%><c:if test="${mon.time_purge_nh3 == 0}">
									<td>--</td>
								</c:if>
								<c:if test="${mon.time_purge_nh3 != 0}">
										<td><fmt:formatNumber value="${mon.time_FIQ203/mon.time_NH3 + 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
								</c:if>
								<c:if test="${mon.time_purge_nh3 == 0}">
									<td>--</td>
								</c:if>
								<c:if test="${mon.time_purge_nh3 != 0}">
									<td><fmt:formatNumber value="${((mon.time_FIQ203)/mon.time_NH3)*1.2143+mon.time_steam_coal/mon.time_NH3+ 0.0001}" pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
								</c:if>
									<td><fmt:formatNumber value="${mon.orig_id}"pattern="##" minFractionDigits="0"></fmt:formatNumber></td>
								</tr>
							</c:forEach>
							
						</table>
						<table  class="table" id="ene2">
							<tr>
								<td colspan="10"style="text-align: left;">
								<span class="date_title print_hidden">注：①&nbsp;小时氨产量(含驰放气折算)(t/h)= 班氨产量(含驰放气折算)(t)÷样本数×6；</span> <br>
									<span class="date_title print_hidden">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;②&nbsp;吨氨天然气耗(Nm<sup>3</sup>/tNH<sub>3</sub>)= 班天然气耗(Nm<sup>3</sup>)÷班氨产量(含驰放气折算)(t)；</span><br>
									<span class="date_title print_hidden">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;③&nbsp;吨氨综合消耗(kgce/tNH<sub>3</sub>)= 班蒸汽耗(折标煤)(kgce)÷班氨产量(含驰放气折算)(t)+1.2143(kgce/Nm<sup>3</sup>)×吨氨天然气耗(Nm<sup>3</sup>/tNH<sub>3</sub>)；<br>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标煤换算系数：气田天然气：1.2143kgce/Nm<sup>3</sup>，参见《综合能耗计算通则》(GB/T2589—2008)。
									</span>
								</td>
							</tr>
						</table>
						
						<div id="lineChart_ban_4_1">
							<center>
								<br>
								<div class="line-chart"  id="container_day_ban_4_1"></div>
							</center>
						</div>
						<div id="lineChart_ban_5_1">
							<center>
								<br>
								<div class="line-chart"  id="container_day_ban_5_1"></div>
							</center>
						</div>
						<div id="lineChart_ban_6_1">
							<center>
								<br>
								<div class="line-chart"  id="container_day_ban_6_1"></div>
							</center>
						</div>
						<!--走势图-->
						<!-- 吨氨综合消耗 -->
						<div id="lineChart_ban_1">
							<center>
								<br>
								<div class="line-chart" id="container_day_ban_1"></div>
							</center>
						</div>
						
						<!-- 吨氨天然气耗 -->
						<div id="lineChart_ban_3">
							<center>
								<br>
								<div class="line-chart" id="container_day_ban_3"></div>
							</center>
						</div>
						<!-- 吨氨蒸汽折标煤 -->
						<div id="lineChart_ban_4">
							<center>
								<br>
								<div class="line-chart" id="container_day_ban_4"></div>
							</center>
						</div>
					</center>
				</div>
				<br> <br> <br>
			</div>
		</div>
	</c:if>
	<c:if test="${fun:length(jfdayList) <= 0}">
	<div class="tab-content menu_third_page" id="appmsg">
			<!-----------------------按日查看------------------>
			<div class="tab-pane fade in active menu-third" id="three_c_31">
				<!-----------------------打印内容------------------>
				<div>
					<center>
						<div class="fmy">
							<h3>
								该时段暂无数据！
							</h3>
						</div>
					</center>
				</div>



			</div>
			

		</div>
</c:if>


</body>
<script type="text/javascript" src="js/jquery-2.2.4.min.js"></script>

<script type="text/javascript" src="jedate/jedate.js"></script>
<script type="text/javascript" src="js/jquery.blockUI.js"></script>
<script src="js/bootstrap.min.js"></script>

<!--折线图-->
<script type="text/javascript" src="js/highcharts1.js"></script>
<script type="text/javascript" src="js/exporting1.js"></script>
<script type="text/javascript" src="js/data_jf.js"></script>
<script type="text/javascript" src="js/index.js"></script>
<!--折线图数据位置-->

<!-- <script type="text/javascript" src="js/gridlight.js"></script> -->

<script>window.jQuery || document.write('<script src="js/jquery-1.11.0.min.js"><\/script>')</script>


<!-- pdf -->
<!-- <script src="tableExportTest/js/table.js"></script>
<script src="tableExportTest/tableExport/libs/pdfMake/pdfmake.min.js"></script>
<script src="tableExportTest/tableExport/libs/pdfMake/vfs_fonts.js"></script>

<script type="text/javascript" src="tableExportTest/tableExport/libs/FileSaver/FileSaver.min.js"></script>
<script type="text/javascript" src="tableExportTest/tableExport/libs/js-xlsx/xlsx.core.min.js"></script>
<script type="text/javascript" src="tableExportTest/tableExport/libs/jsPDF/jspdf.min.js"></script>
<script type="text/javascript" src="tableExportTest/tableExport/libs/jsPDF-AutoTable/jspdf.plugin.autotable.js"></script>
<script type="text/javascript" src="tableExportTest/tableExport/libs/html2canvas/html2canvas.min.js"></script>
<script type="text/javascript" src="tableExportTest/tableExport/tableExport.js"></script>
<script src="tableExportTest/js/table-export.js"></script> -->


<!-- <script type="text/javascript" src="js/html2pdf/js/jspdf.min.js"></script>
<script type="text/javascript" src="js/html2pdf/js/jspdf.debug.js"></script>
<script type="text/javascript" src="js/html2pdf/js/html2canvas.js"></script> -->
<script>

        
         

    jQuery(document).ready(function () {
        TableExport.init();
    });





	/*时间控件*/
	/*日报表-日*/
	jeDate({
		dateCell : "#indate_day_day1", //isinitVal:true,
		format : "YYYY-MM-DD",
		isTime : false, //isClear:false,
		minDate : "2014-09-19 00:00:00"
	});

	jeDate({
		dateCell : "#indate_day_day2", //isinitVal:true,
		format : "YYYY-MM-DD",
		isTime : false, //isClear:false,
		minDate : "2014-09-19 00:00:00"
	});

	/*日报表-班*/
	jeDate({
		dateCell : "#indate_day_ban1", //isinitVal:true,
		format : "YYYY-MM-DD",
		isTime : false, //isClear:false,
		minDate : "2014-09-19 00:00:00"
	});
	jeDate({
		dateCell : "#indate_day_ban2", //isinitVal:true,
		format : "YYYY-MM-DD",
		isTime : false, //isClear:false,
		minDate : "2014-09-19 00:00:00"
	});

	/* 统计打印次数 */
	$(".btn_print").click(function() {
		var val = 1;
		if (val != "") {
			var url = "${pageContext.request.contextPath}/CountPrintNumber";
			var args = {
				"printnumber" : val,
				"time" : new Date()
			};
			$.post(url, args, function(data) {
				$("#message").html(data);
			});
		}
	});

</script>
</html>