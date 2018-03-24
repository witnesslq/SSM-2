﻿<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fun" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta charset="utf-8">
<title>成都赛特优化节能平台</title>
<!--时间控件-->
<link rel="stylesheet" type="text/css" href="stylesheets/normalize.css"
	media="screen">
<link rel="stylesheet" type="text/css" href="stylesheets/stylesheet.css"
	media="screen">
<link rel="stylesheet" type="text/css"
	href="stylesheets/github-light.css" media="screen">
<script type="text/javascript" src="jedate/jedate.js"></script>
<link type="text/css" rel="stylesheet" href="jedate/skin/jedate.css">


<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="css/index.css" rel="stylesheet" type="text/css">


</head>
<body
	onLoad="javascript:window.resizeTo(screen.availWidth,screen.availHeight);window.moveTo(0,0) ">

	<div style="padding-top:5px;background:#fff"
		class="tab-content navbar-fixed-top print_hidden">
		<!--右边二级菜单-->
		<ul id="myTab" class="nav nav-tabs menu_rihgt">
			<li><a class="31" href="to_show_day_data.action">日 报 表</a>
			</li>

			<li><a href="do_select_Mouth.action">月 报 表</a>
			</li>
			<li><a href="do_select_Quarter.action">季度报表</a>
			</li>
			<li class="active"><a href="do_select_Year.action">年度报表</a>
			</li>
		</ul>
		<!--右边二级菜单结束-->
		<div class="tab-content menu-third-content">
			<!--日报表三级菜单-->
			<div class="tab-pane fade in active">
				<!--日报表--按班查看---按日查看菜单------>
				<ul id="myTab" class="nav nav-tabs menu_rihgt_after">
					<li class="active"><a href="#three_c_31" data-toggle="tab"><img
							src="images/menu_third.png">&nbsp;&nbsp;按月查看</a></li>
				</ul>
			</div>


		</div>
		<!--能耗分期日考核日报表--->
	</div>
	 <c:if test="${fun:length(yearList) > 0 }">
	<div class="tab-content menu_third_page">
		<!-----------------------按年查看------------------>
		<div class="tab-pane fade in active menu-third" id="three_c_31">
			<!-----------------------打印内容------------------>
			<div id="printTable">
				<center>
					<div class="fmy">
						<h3>
							<div class="col-md-5 col-sm-5 col-xs-5 print_hidden">
								<div class="chart_title_l">
									<form  method="post">
										<span class="date_title">考核时间：</span>
										 <input style="width:50px" name="Year_data_begin" class="datainp" id="indate_year"	type="text" value="${year_db}" readonly> 
										 <span class="date_title">年</span> 
										 <input type="button" id="year_show" class="look" value="查看">
									</form>
								</div>
							</div>
							<div class="col-md-5 col-sm-5 col-xs-5">
								<div class="chart_title_l">年度报表</div>
								</div>
								
									<!--打印按钮-->
									<div class="col-md-2 ol-sm-2 col-xs-2 print_hidden">
										<div class="chart_title_r">
											<!-- <img width="30px" src="images/print.png"> <input
												class="btn_print" type="button"
												onclick="javascript:window.print();" value="打印" /> -->
										</div>
									</div>
						</h3>
					</div>
				
					<!--表格和折线图-->
					<table id="energy_year"  class="table">
						<tr>
							<th>时间段</th>
							<th>月氨产量(t)</th>
							<th>月耗电(kWh)</th>
							<th>月耗气(Nm<sup>3</sup>)</th>
							<th>小时氨产量(t/h)</th>
							<th>吨氨综合消耗(kgce/tNH<sub>3</sub>)</th>
							<th>吨氨电耗(kWh/tNH<sub>3</sub>)</th>
							<th>吨氨气耗(Nm<sup>3</sup>/tNH<sub>3</sub>)</th>
							<th>样本数</th>
						</tr>

						<c:if test="${yearList !=null}">
							<c:forEach var="year" items="${yearList}">
								<c:set var="sum">${sum+year.time_nh3_yield}</c:set>
								<c:set var="sum1">${sum1+year.time_electric_consume}</c:set>
								<c:set var="sum2">${sum2+year.time_raw_gas_consume}</c:set>
								<c:set var="sum3">${sum3+year.time_nh3_yield/year.orig_id*6}</c:set>
								<c:set var="sum4">${sum4+1.2143*year.time_raw_gas_consume/year.time_nh3_yield+year.time_electric_consume/year.time_nh3_yield*0.1229}</c:set>
								<c:set var="sum5">${sum5+year.time_electric_consume/year.time_nh3_yield}</c:set>
								<c:set var="sum6">${sum6+year.time_raw_gas_consume/year.time_nh3_yield}</c:set>
								<c:set var="sum7">${sum7+year.orig_id}</c:set>
								<tr>
									<td><fmt:formatDate value="${year.data_time}"
											pattern="yyyy/MM" />
									</td>
									<td><fmt:formatNumber value=" ${year.time_nh3_yield}"
											pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber
											value="${year.time_electric_consume}" pattern="##.##"
											minFractionDigits="2"></fmt:formatNumber>
									</td>
									<td><fmt:formatNumber value="${year.time_raw_gas_consume}"
											pattern="##.##" minFractionDigits="2"></fmt:formatNumber>
									</td>
									<td><fmt:formatNumber
											value="${year.time_nh3_yield/year.orig_id*6}" pattern="##.##"
											minFractionDigits="2"></fmt:formatNumber>
									</td>
									<td><fmt:formatNumber
											value="${1.2143*year.time_raw_gas_consume/year.time_nh3_yield+year.time_electric_consume/year.time_nh3_yield*0.1229}"
											pattern="##.##" minFractionDigits="2"></fmt:formatNumber>
									</td>
									<td><fmt:formatNumber
											value="${year.time_electric_consume/year.time_nh3_yield}"
											pattern="##.##" minFractionDigits="2"></fmt:formatNumber>
									</td>
									<td><fmt:formatNumber
											value="${year.time_raw_gas_consume/year.time_nh3_yield}"
											pattern="##.##" minFractionDigits="2"></fmt:formatNumber>
									</td>
									<td><fmt:formatNumber value="${year.orig_id}" pattern="##"
											minFractionDigits="0"></fmt:formatNumber>
									</td>
								</tr>
							</c:forEach>
						</c:if>
						<tr style="color: red">
							<td>合计</td>
							<td><fmt:formatNumber value="${sum}" pattern="##.##"
									minFractionDigits="2"></fmt:formatNumber>
							</td>
							<td><fmt:formatNumber value="${sum1}" pattern="##.##"
									minFractionDigits="2"></fmt:formatNumber>
							</td>
							<td><fmt:formatNumber value="${sum2}" pattern="##.##"
									minFractionDigits="2"></fmt:formatNumber>
							</td>
							<td><fmt:formatNumber value="${sum/sum7*6}" pattern="##.##"
									minFractionDigits="2"></fmt:formatNumber>
							</td>
							<td><fmt:formatNumber
									value="${sum1/sum*0.1229+sum2/sum*1.2143}" pattern="##.##"
									minFractionDigits="2"></fmt:formatNumber>
							</td>
							<td><fmt:formatNumber value="${sum1/sum}" pattern="##.##"
									minFractionDigits="2"></fmt:formatNumber>
							</td>
							<td><fmt:formatNumber value="${sum2/sum}" pattern="##.##"
									minFractionDigits="2"></fmt:formatNumber>
							</td>
							<td><fmt:formatNumber value="${sum7}" pattern="##"></fmt:formatNumber>
							</td>
						</tr>
					</table>
					<!--折线图-->
					<div id="lineChart_year">
						<center>
							<br>
							<div class="line-chart" id="container_year"></div>
						</center>
					</div>
					<div id="lineChart_year_1">
						<center>
							<br>
							<div class="line-chart"id="container_year_1"></div>
						</center>
					</div>
					
					<div id="lineChart_year_2">
						<center>
							<br>
							<div class="line-chart"id="container_year_2"></div>
						</center>
					</div>
				
				</center>
			</div>
			<br>
			<br>
<br>

		</div>
	</div>
	</c:if>
	<c:if test="${fun:length(yearList) <= 0 }">
			<div class="tab-content menu_third_page">
				<!-----------------------按日查看------------------>
				<div class="tab-pane fade in active menu-third" id="three_c_31">
					<!-----------------------打印内容------------------>
					<div>
						<center>
							<div class="fmy">
								<h3>暂无原始数据</h3>
							</div>
						</center>
					</div>
				</div>
			</div>
		</c:if>


</body>
<script src="js/jquery-2.2.4.min.js"></script>
<script src="js/index.js"></script>
<script src="js/bootstrap.min.js"></script>


<!--折线图-->
<script type="text/javascript" src="js/highcharts1.js"></script>
<script type="text/javascript" src="js/exporting1.js"></script>
<script type="text/javascript" src="js/data_jb.js"></script>
<!--折线图数据位置-->
<script>
	/*打印表格*/
	function printTable() {
		$("#printTable").jqprint();
	}


	/*自动获取今年年份累加*/
	var mytime = new Date();
	var year = mytime.getFullYear();
	$(function() {
		for (i = 2016; i <= year; i++) {
			$(".fullyear").after("<option>" + i + "</option>")
		}
	})
	/*日期控件*/
	jeDate({
		dateCell : "#indate_year", //isinitVal:true,
		format : "YYYY",
		isTime : false, //isClear:false,
		minDate : ""
	})
</script>
</html>