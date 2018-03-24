﻿<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fun" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
<meta charset="utf-8">
<title>成都赛特优化节能平台</title>
<link rel="stylesheet" type="text/css" href="jedate/skin/jedate.css">
<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css">
<link rel="stylesheet" href="css/index.css" type="text/css">
</head>

<body
	onLoad="javascript:window.resizeTo(screen.availWidth,screen.availHeight);window.moveTo(0,0) ">

	<div style="padding-top:5px;background:#fff"
		class="tab-content navbar-fixed-top print_hidden">
		<!--右边二级菜单-->
		<ul id="myTab" class="nav nav-tabs menu_rihgt">
			<li><a class="31" href="to_show_day_data.action">日 报 表</a></li>

			<li class="active"><a href="do_select_Mouth.action">月 报 表</a></li>
			<li><a href="do_select_Quarter.action">季度报表</a></li>
			<li><a href="do_select_Year.action">年度报表</a></li>
		</ul>
		<!--右边二级菜单结束-->

		<div class="tab-content menu-third-content">

			<!--日报表三级菜单-->
			<div class="tab-pane fade in active">
				<!--日报表--按班查看---按日查看菜单------>
				<ul id="myTab" class="nav nav-tabs menu_rihgt_after">
					<li class="active"><a href="#three_c_31" data-toggle="tab"><img
							src="images/menu_third.png">&nbsp;&nbsp;按日查看</a>
					</li>
					<li><a href="#three_c_32" data-toggle="tab"><img
							src="images/menu_third.png">&nbsp;&nbsp;按班查看</a>
					</li>
				</ul>
			</div>


		</div>
	</div>
	<!--能耗分期日考核日报表--->
	<c:if
		test="${fun:length(mouthList) > 0 || fun:length(mouthClassList)>0}">
		<div class="tab-content menu_third_page">
			<!-----------------------按日查看------------------>
			<div class="tab-pane fade in active menu-third" id="three_c_31">
				<!-----------------------打印内容------------------>
				<div id="printTable">
					<center>
						<div class="fmy">
							<h3>
								<div class="col-md-5 col-sm-5 col-xs-5 print_hidden">
									<div class="chart_title_l">
										<form action="" method="post">
											<span class="date_title">考核时间</span> <input
												name="mouth_date_begin" class="datainp"
												id="indate_month_day1" type="text" value="${edate_begin}"
												readonly> <input type="button" class="look"
												id="month_day_show" value="查看">
										</form>
									</div>
								</div>
								<div class="col-md-5 col-sm-5 col-xs-5 ">
									<div class="chart_title_l">月报表--按日查看</div>
								</div>

								<!--打印按钮-->
								<div class="col-md-2 col-xs-2 col-sm-2 print_hidden">
									<div class="chart_title_r">
										<!-- <img width="30px" src="images/print.png"> <input
										class="btn_print" type="button"
										onclick="javascript:window.print();" value="打印" /> -->
									</div>
								</div>
							</h3>
						</div>

						<!--固定表头-->

						<table class="table tbl_hd_md">
							<tr>
								<th>时间段</th>
								<th>日氨产量(t)</th>
								<th>日耗电(kWh)</th>
								<th>日耗气(Nm<sup>3</sup>)</th>
								<th>小时氨产量(t/h)</th>
								<th>吨氨综合消耗(kgce/tNH<sub>3</sub>)</th>
								<th>吨氨电耗(kWh/tNH<sub>3</sub>)</th>
								<th>吨氨气耗(Nm<sup>3</sup>/tNH<sub>3</sub>)</th>
								<th>样本数</th>
							</tr>
							<c:if test="${mouthList !=null}">
								<c:forEach var="mouth" items="${mouthList}" varStatus="st">
									<c:if test="${st.index<=0  }">
										<tr class="hiden_tr">
											<td><fmt:formatDate value="${mouth.data_time}"
													pattern="yyyy/MM/dd" /></td>
											<td><fmt:formatNumber value=" ${mouth.time_nh3_yield}"
													pattern="##.##" minFractionDigits="2"></fmt:formatNumber>
											</td>
											<td><fmt:formatNumber
													value="${mouth.time_electric_consume}" pattern="##.##"
													minFractionDigits="2"></fmt:formatNumber></td>
											<td><fmt:formatNumber
													value="${mouth.time_raw_gas_consume}" pattern="##.##"
													minFractionDigits="2"></fmt:formatNumber></td>
											<td><fmt:formatNumber
													value="${mouth.time_nh3_yield/mouth.orig_id*6}"
													pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
											<td><fmt:formatNumber
													value="${1.2143*mouth.time_raw_gas_consume/mouth.time_nh3_yield+mouth.time_electric_consume/mouth.time_nh3_yield*0.1229}"
													pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
											<td><fmt:formatNumber
													value="${mouth.time_electric_consume/mouth.time_nh3_yield}"
													pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
											<td><fmt:formatNumber
													value="${mouth.time_raw_gas_consume/mouth.time_nh3_yield}"
													pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
											<td><fmt:formatNumber value="${mouth.orig_id}"
													pattern="##" minFractionDigits="0"></fmt:formatNumber></td>
										</tr>
									</c:if>
								</c:forEach>
							</c:if>
						</table>
						<!--表格和折线图-->

						<table id="energy_month_day"  class="table">
							<tr>
								<th>时间段</th>
								<th>日氨产量(t)</th>
								<th>日耗电(kWh)</th>
								<th>日耗气(Nm<sup>3</sup>)</th>
								<th>小时氨产量(t/h)</th>
								<th>吨氨综合消耗(kgce/tNH<sub>3</sub>)</th>
								<th>吨氨电耗(kWh/tNH<sub>3</sub>)</th>
								<th>吨氨气耗(Nm<sup>3</sup>/tNH<sub>3</sub>)</th>
								<th>样本数</th>
							</tr>
							<c:if test="${mouthList !=null}">
								<c:forEach var="mouth" items="${mouthList}">
									<tr>
										<c:if test="${mouth.data_time != null}">
										<td><fmt:formatDate value="${mouth.data_time}"
												pattern="yyyy/MM/dd" /></td>
										</c:if>
										<c:if test="${mouth.data_time == null}">
										<td>合计</td>
										</c:if>
										<td><fmt:formatNumber value=" ${mouth.time_nh3_yield}"
												pattern="##.##" minFractionDigits="2"></fmt:formatNumber>
										</td>
										<td><fmt:formatNumber
												value="${mouth.time_electric_consume}" pattern="##.##"
												minFractionDigits="2"></fmt:formatNumber></td>
										<td><fmt:formatNumber
												value="${mouth.time_raw_gas_consume}" pattern="##.##"
												minFractionDigits="2"></fmt:formatNumber></td>
										<c:if test="${mouth.orig_id ==0}">
                                  				<td>--</td>
                                  				<td>--</td>
                                  				<td>--</td>
                                  				<td>--</td>
                                  				<td>--</td>
                                   		</c:if>
                                   		<c:if test="${mouth.orig_id !=0}">
										<td><fmt:formatNumber
												value="${mouth.time_nh3_yield/mouth.orig_id*6}"
												pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
										<td><fmt:formatNumber
												value="${1.2143*mouth.time_raw_gas_consume/mouth.time_nh3_yield+mouth.time_electric_consume/mouth.time_nh3_yield*0.1229}"
												pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
										<td><fmt:formatNumber
												value="${mouth.time_electric_consume/mouth.time_nh3_yield}"
												pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
										<td><fmt:formatNumber
												value="${mouth.time_raw_gas_consume/mouth.time_nh3_yield}"
												pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
										<td><fmt:formatNumber value="${mouth.orig_id}"
												pattern="##" minFractionDigits="0"></fmt:formatNumber></td>
										</c:if>		
									</tr>

								</c:forEach>
							</c:if>
						</table>
						<!--折线图-->

						<div id="lineChart_month_day">
							<center>
								<br>
								<div class="line-chart" id="container_month_day"></div>
							</center>
						</div>
						<div id="lineChart_month_day_1">
							<center>
								<br>
								<div class="line-chart" id="container_month_day_1"></div>
							</center>
						</div>
						<div id="lineChart_month_day_2">
							<center>
								<br>
								<div class="line-chart" id="container_month_day_2"></div>
							</center>
						</div>
							
                                 <c:if test="${fun:length(mouthList) <= 0}">
						       <h1>该时间段暂无数据</h1>
						 </c:if>
					</center>
				</div>


				<br> <br> <br>

			</div>
			<!-----------------------按班查看------------------->
			<div class="tab-pane fade menu-third" id="three_c_32">
				<div id="printTable11">
					<center>
						<div class="fmy">
							<h3>
								<div class="col-md-5 col-sm-5 col-xs-5 print_hidden">
									<div class="chart_title_l">
										<form method="post">
											<span class="date_title">考核时间</span> <input
												name="mouth_date_begin" class="datainp"
												id="indate_month_ban" type="text" value="${edate_begin}"
												readonly> <input type="button" class="look"
												id="month_ban_show" value="查看">
										</form>
									</div>
								</div>
								<div class="col-md-5 col-sm-5 col-xs-5">
									<div class="chart_title_l">月报表--按班查看</div>
								</div>
								<!--打印按钮-->
								<div class="col-md-2 col-xs-2 col-sm-2">
									<div class="chart_title_r">
										<!-- <img width="30px" src="images/print.png"> <input
										class="btn_print" id="" type="button" value="打印"
										onclick="printTable(this)"> -->
									</div>
								</div>
							</h3>
						</div>
						<!--固定表头-->

						<table class="table tbl1 tbl_hd_mb">
							<tr>
								<th>时间段</th>
								<th>班次</th>
								<th>班氨产量(t)</th>
								<th>班耗电(kWh)</th>
								<th>班耗气(Nm<sup>3</sup>)</th>
								<th>小时氨产量(t/h)</th>
								<th>吨氨综合消耗(kgce/tNH<sub>3</sub>)</th>
								<th>吨氨电耗(kWh/tNH<sub>3</sub>)</th>
								<th>吨氨气耗(Nm<sup>3</sup>/tNH<sub>3</sub>)</th>
								<th>样本数</th>
							</tr>
							<c:forEach var="mon" items="${mouthClassList}" varStatus="st">
								<c:if test="${st.index<=0  }">


								<tr class="hiden_tr">
									<td><fmt:formatDate value="${mon.data_time}"
											pattern="yyyy/MM/dd" /></td>
									<c:if test="${mon.classNumber==1}">
	                                                <td>
	                                              		白班(<fmt:formatNumber value="${mon.shift/mon.orig_id}" pattern="##" minFractionDigits="0" ></fmt:formatNumber>)
	                                                </td>
	                                                </c:if>
	                                                <c:if test="${mon.classNumber==2}">
	                                                <td>
	                                              		夜班(<fmt:formatNumber value="${mon.shift/mon.orig_id}" pattern="##" minFractionDigits="0" ></fmt:formatNumber>)
	                                                </td>
	                                                </c:if>
									<td><fmt:formatNumber value="${mon.time_nh3_yield}"
											pattern="##.##" minFractionDigits="2"></fmt:formatNumber>
									</td>
									<td><fmt:formatNumber value="${mon.time_electric_consume}"
											pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber value="${mon.time_raw_gas_consume}"
											pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber
											value="${mon.time_nh3_yield/mon.orig_id*6}" pattern="##.##"
											minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber
											value="${1.2143*mon.time_raw_gas_consume/mon.time_nh3_yield+mon.time_electric_consume/mon.time_nh3_yield*0.1229}"
											pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber
											value="${mon.time_electric_consume/mon.time_nh3_yield}"
											pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber
											value="${mon.time_raw_gas_consume/mon.time_nh3_yield}"
											pattern="##.##" minFractionDigits="2"></fmt:formatNumber></td>
									<td><fmt:formatNumber value="48" pattern="##"
											minFractionDigits="0"></fmt:formatNumber></td>
								</tr>
								</c:if>
							</c:forEach>

						</table>
						<!--数据表格-->

						<table id="energy_month_ban"  class="table tbl1">
							<tr>
								<th>时间段</th>
								<th>班次</th>
								<th>班氨产量(t)</th>
								<th>班耗电(kWh)</th>
								<th>班耗气(Nm<sup>3</sup>)</th>
								<th>小时氨产量(t/h)</th>
								<th>吨氨综合消耗(kgce/tNH<sub>3</sub>)</th>
								<th>吨氨电耗(kWh/tNH<sub>3</sub>)</th>
								<th>吨氨气耗(Nm<sup>3</sup>/tNH<sub>3</sub>)</th>
								<th>样本数</th>
							</tr>
							<c:forEach var="mon" items="${mouthClassList}">


								<tr>
								 <c:if test="${mon.data_time != null}">
									<td><fmt:formatDate value="${mon.data_time}"
									pattern="yyyy/MM/dd" /></td>
									</c:if>
									<c:if test="${mon.data_time == null}">
                                               	<td>合计</td>
                                               </c:if>
							<c:if test="${mon.classNumber==1}">
								 <c:if test="${mon.orig_id !=0}">
	                                                 <td>
	                                              		白班(<fmt:formatNumber value="${mon.shift/mon.orig_id}" pattern="##" minFractionDigits="0" ></fmt:formatNumber>)
	                                                </td>
	                                                 </c:if>
	                                                <c:if test="${mon.orig_id ==0}">
	                                                <td>
	                                              		白班(缺失)
	                                                </td>
	                                                 </c:if>
                                   </c:if>
                                   <c:if test="${mon.classNumber==2}">
                                  <c:if test="${mon.orig_id !=0}">
                                     <td>
                                   		夜班(<fmt:formatNumber value="${mon.shift/mon.orig_id}" pattern="##" minFractionDigits="0" ></fmt:formatNumber>)
                                     </td>
                                      </c:if>
                                      <c:if test="${mon.orig_id ==0}">
                                     <td>
                                   		夜班(缺失)
                                     </td>
                                      </c:if>
                                     </c:if>
                                     <c:if test="${mon.classNumber==3}">
										<td>晚班</td>
									</c:if>
									 <c:if test="${mon.classNumber==11}">
                                        <td>
                                      		1 班
                                        </td>
                                        </c:if>
                                          <c:if test="${mon.classNumber==12}">
                                        <td>
                                      		2 班
                                        </td>
                                        </c:if>
                                          <c:if test="${mon.classNumber==13}">
                                        <td>
                                      		3 班
                                        </td>
                                        </c:if>
									 <c:if test="${mon.orig_id !=0}">
	                                                <td><fmt:formatNumber value="${mon.time_nh3_yield}" pattern="##.##" minFractionDigits="2"  ></fmt:formatNumber>   </td>
	                                                 </c:if>
	                                                <c:if test="${mon.orig_id ==0}">
	                                                <td>--</td>
	                                                </c:if>
	                                                  <c:if test="${mon.orig_id !=0}">
	                                                <td><fmt:formatNumber value="${mon.time_electric_consume}" pattern="##.##" minFractionDigits="2" ></fmt:formatNumber></td>
	                                                 </c:if>
	                                                <c:if test="${mon.orig_id ==0}">
	                                                <td>--</td>
	                                                </c:if>
	                                                  <c:if test="${mon.orig_id !=0}">
	                                                <td><fmt:formatNumber value="${mon.time_raw_gas_consume}" pattern="##.##" minFractionDigits="2" ></fmt:formatNumber></td>
	                                                 </c:if>
	                                                <c:if test="${mon.orig_id ==0}">
	                                                <td>--</td>
	                                                </c:if>
	                                                <c:if test="${mon.orig_id !=0}">
	                                                <td><fmt:formatNumber value="${mon.time_nh3_yield/mon.orig_id*6}" pattern="##.##" minFractionDigits="2" ></fmt:formatNumber></td>
	                                                 </c:if>
	                                                 <c:if test="${mon.orig_id ==0}">
	                                                <td>--</td>
	                                                 </c:if>
	                                                 <c:if test="${mon.time_nh3_yield !=0}">
	                                                <td><fmt:formatNumber value="${1.2143*mon.time_raw_gas_consume/mon.time_nh3_yield+mon.time_electric_consume/mon.time_nh3_yield*0.1229}" pattern="##.##" minFractionDigits="2" ></fmt:formatNumber></td>
	                                                </c:if>
	                                               <c:if test="${mon.time_nh3_yield ==0}">
	                                                <td>0.0</td>
	                                                </c:if>
	                                                  <c:if test="${mon.time_nh3_yield !=0}">
	                                                <td><fmt:formatNumber value="${mon.time_electric_consume/mon.time_nh3_yield}" pattern="##.##" minFractionDigits="2" ></fmt:formatNumber></td>
	                                                </c:if>
	                                                <c:if test="${mon.time_nh3_yield ==0}">
	                                                <td>0.0</td>
	                                                </c:if>
	                                                 <c:if test="${mon.time_nh3_yield !=0}">
	                                                <td><fmt:formatNumber value="${mon.time_raw_gas_consume/mon.time_nh3_yield}" pattern="##.##" minFractionDigits="2" ></fmt:formatNumber></td>
	                                                </c:if>
	                                                <c:if test="${mon.time_nh3_yield ==0}">
	                                                <td>0.0</td>
	                                                </c:if>
	                                           	    <c:if test="${mon.orig_id !=0}">
	                                            	<td><fmt:formatNumber value="${mon.orig_id}" pattern="##" minFractionDigits="0" ></fmt:formatNumber></td>
	                                            	 </c:if>
	                                            	 <c:if test="${mon.orig_id ==0}">
	                                                <td>--</td>
	                                                </c:if>
	                                            
	                                            
								</tr>
							</c:forEach>

						</table>
						<!--走势图-->

						<div id="lineChart_month_ban_1">
							<center>
								<br>
								<div class="line-chart" id="container_month_ban_1"></div>
							</center>
						</div>
						<div id="lineChart_month_ban_2">
							<center>
								<br>
								<div class="line-chart" id="container_month_ban_2"></div>
							</center>
						</div>
						<div id="lineChart_month_ban_3">
							<center>
								<br>
								<div class="line-chart" id="container_month_ban_3"></div>
							</center>
						</div>

					</center>

				</div>
				<br> <br> <br>
			</div>
		</div>
	</c:if>
	<c:if test="${fun:length(mouthList) <= 0}">
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
<script src="js/jquery-migrate-1.1.0.js"></script>

<script type="text/javascript" src="jedate/jedate.js"></script>
<!--折线图-->
<script type="text/javascript" src="js/highcharts1.js"></script>
<script type="text/javascript" src="js/exporting1.js"></script>
<script type="text/javascript" src="js/data_jb.js"></script>

<!--折线图数据位置-->
<script>

 function _w_table_rowspan(_w_table_id,_w_table_colnum){
    _w_table_firsttd = "";
    _w_table_currenttd = "";
    _w_table_SpanNum = 0;
    _w_table_Obj = $(_w_table_id + " tr td:nth-child(" + _w_table_colnum + ")");
    _w_table_Obj.each(function(i){
        if(i==0){
            _w_table_firsttd = $(this);
            _w_table_SpanNum = 1;
        }else{
            _w_table_currenttd = $(this);
            if(_w_table_firsttd.text()==_w_table_currenttd.text()){
                _w_table_SpanNum++;
                _w_table_currenttd.hide(); //remove();
                _w_table_firsttd.attr("rowSpan",_w_table_SpanNum);
            }else{
                _w_table_firsttd = $(this);
                _w_table_SpanNum = 1;
            }
        }
    }); 
}
$(document).ready(function(){  
  // _w_table_rowspan("#process",4);
  // _w_table_rowspan("#process",3);
  // _w_table_rowspan("#process",2);
  _w_table_rowspan("#energy_month_ban",1);
 });

    /*打印表格*/
    function printTable() {
        $("#printTable").jqprint();
    }


    /*时间控件*/
    
    /*月报表-日*/
	jeDate({
	    dateCell: "#indate_month_day1", //isinitVal:true,
	    format: "YYYY-MM",
	    isTime: false, //isClear:false,
	    minDate: "2014-09-19 00:00:00"
	});
	/*日报表-班*/
    jeDate({
        dateCell: "#indate_month_ban", //isinitVal:true,
        format: "YYYY-MM",
        isTime: false, //isClear:false,
        minDate: "2014-09-19 00:00:00"
    });
</script>
</html>