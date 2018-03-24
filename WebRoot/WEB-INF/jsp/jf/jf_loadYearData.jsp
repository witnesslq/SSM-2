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
		<!-- 	<li><a class="31" href="jf_loadDayData.action">日 报 表</a></li>
			<li><a href="jf_loadMouthData.action">月 报 表</a></li>
			<li><a href="jf_loadQuarterData.action">季度报表</a></li> -->
			<li class="active"><a href="jf_loadYearData.action">年度报表</a></li>
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
	</div>
	<!--能耗分期日考核日报表--->
	<c:if test="${fun:length(yearList) > 0}">
		<div class="tab-content menu_third_page">
			<!-----------------------按年查看------------------>
			<div class="tab-pane fade in active menu-third" id="three_c_31">
				<!-----------------------打印内容------------------>
				<div id="printTable">
					<center>
						<div class="fmy">
							<h3>
								<div class="col-md-5 col-sm-5 col-xs-5  print_hidden">
									<div class="chart_title_l">
										<form method="post">
											<span class="date_title">考核时间:</span> <input
												name="jf_Year_data_begin" class="datainp" id="indate_year"
												type="text" value="${year_db}" placeholder="选择年份" readonly>
											<input type="button" id="year_show" class="look" value="查看">
										</form>
									</div>
								</div>
								<div class="col-md-5 col-sm-5 col-xs-5  ">
									<div class="chart_title_l">年度报表--按月查看</div>
								</div>
								<!--打印按钮-->
								<div class="col-md-2 print_hidden">
									<!-- <div class="chart_title_r">
	                                                        <img width="30px" src="images/print.png">
	                                                        <input class="btn_print" id="" type="button" value="打印"  onclick="javascript:window.print();" >
	                                                 </div> -->
								</div>
							</h3>
						</div>

						<!--表格和折线图-->
						<table id="energy_year" class="table">
							<tr>
								<th>时间段</th>
								<th>月氨产量<br>(t)</th>
								<th>月驰放气折氨量<br>(t)</th>
								<th>月天然气耗<br>(Nm<sup>3</sup>)</th>
								<th>月蒸汽耗<br>(折标煤)(kgce)</th>
								<th>月氨产量<br>(含驰放气折算)(t)</th>

								<th>小时氨产量<br>(含驰放气折算)(t/h)</th>
								<th>吨氨天然气耗<br>(Nm<sup>3</sup>/tNH<sub>3</sub>)</th>

								<th>吨氨综合消耗<br>(kgce/tNH<sub>3</sub>)</th>
								<th>样本数</th>
							</tr>

							<c:if test="${yearList !=null}">
								<c:forEach var="day" items="${yearList}">

									<tr>
										<c:if test="${day.data_time != null}">
											<td><fmt:formatDate value="${day.data_time}"
													pattern="yyyy/MM" /></td>
										</c:if>
										<c:if test="${day.data_time == null}">
											<td>合计</td>
										</c:if>
										<td><fmt:formatNumber value="${day.time_FIQ162+ 0.0001}"
												pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
										<td><fmt:formatNumber
												value="${day.time_purge_nh3 + 0.0001}" pattern="##.###"
												minFractionDigits="3"></fmt:formatNumber></td>
										<td><fmt:formatNumber value="${day.time_FIQ203 + 0.0001}"
												pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
										<td><fmt:formatNumber
												value="${day.time_steam_coal + 0.0001}" pattern="##.##"
												minFractionDigits="2"></fmt:formatNumber></td>
										<td><fmt:formatNumber value="${day.time_NH3 + 0.0001}"
												pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>

										<td><fmt:formatNumber
												value="${day.time_NH3/day.orig_id * 6 + 0.0001}"
												pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
										<td><fmt:formatNumber
												value="${day.time_FIQ203/day.time_NH3 + 0.0001}"
												pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>

										<td><fmt:formatNumber
												value="${(day.time_FIQ203/day.time_NH3)*1.2143 +day.time_steam_coal/day.time_NH3+ 0.0001}"
												pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>

										<td><fmt:formatNumber value="${day.orig_id}" pattern="##"
												minFractionDigits="0"></fmt:formatNumber></td>

									</tr>
								</c:forEach>
							</c:if>

						</table>
						<table  class="table"  id="ene6">                           
                                          <tr>
											<td colspan="10"style="text-align: left;">
											<span class="date_title print_hidden">注：①&nbsp;小时氨产量(含驰放气折算)(t/h)= 月氨产量(含驰放气折算)(t)÷样本数×6；</span> <br>
												<span class="date_title print_hidden">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;②&nbsp;吨氨天然气耗(Nm<sup>3</sup>/tNH<sub>3</sub>)= 月天然气耗(Nm<sup>3</sup>)÷月氨产量(含驰放气折算)(t)；</span><br>
												<span class="date_title print_hidden">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;③&nbsp;吨氨综合消耗(kgce/tNH<sub>3</sub>)= 月蒸汽耗(折标煤)(kgce)÷月氨产量(含驰放气折算)(t)+1.2143(kgce/Nm<sup>3</sup>)×吨氨天然气耗(Nm<sup>3</sup>/tNH<sub>3</sub>)；<br>
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标煤换算系数：气田天然气：1.2143kgce/Nm<sup>3</sup>，参见《综合能耗计算通则》(GB/T2589—2008)。
												</span>
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

						<div id="lineChart_year_2">
							<center>
								<br>
								<div class="line-chart" id="container_year_2"></div>
							</center>
						</div>
						<div id="lineChart_year_3">
							<center>
								<br>
								<div class="line-chart" id="container_year_3"></div>
							</center>
						</div>

					</center>
				</div>


				<br> <br> <br>

			</div>
		</div>
	</c:if>
	<c:if test="${fun:length(yearList) <= 0}">
		<div class="tab-content menu_third_page">
			<!-----------------------按年查看------------------>
			<div class="tab-pane fade in active menu-third" id="three_c_31">
				<!-----------------------打印内容------------------>
				<div id="printTable">
					<center>
						<div class="fmy">
							<h3>该时段暂无数据！</h3>
						</div>
					</center>
				</div>
			</div>
		</div>

	</c:if>


</body>
<script src="js/jquery-2.2.4.min.js"></script>
<script src="js/bootstrap.min.js"></script>

<script type="text/javascript" src="js/jquery.blockUI.js"></script>
<!--折线图-->
<script type="text/javascript" src="js/highcharts1.js"></script>
<script type="text/javascript" src="js/exporting1.js"></script>
<script type="text/javascript" src="js/data_jf.js"></script>
<!--折线图数据位置-->
<!-- <script type="text/javascript" src="js/gridlight.js"></script> -->
<script type="text/javascript" src="js/index.js"></script>
<script>
     /*自动获取今年年份累加*/
    var mytime = new Date();
    var year = mytime.getFullYear();
    $(function(){
        for(i = 2016; i<= year; i++){
            $(".fullyear").after("<option>"+i+"</option>")
        }
    })
/*日期控件*/
    jeDate({
        dateCell: "#indate_year", //isinitVal:true,
        format: "YYYY",
        isTime: false, //isClear:false,
        minDate: ""
    })        

</script>

</html>