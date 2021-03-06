<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>成都赛特优化节能平台</title>
<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="css/index.css" rel="stylesheet" type="text/css">
<script src="js/jquery-2.2.4.min.js"></script>
<script src="js/bootstrap.min.js"></script>


<style>
</style>

</head>
<body
	onLoad="javascript:window.resizeTo(screen.availWidth,screen.availHeight);window.moveTo(0,0) "
	scroll="no">
	<div class="tab-content welcom_top">

		<div class="menu-third">
			<br>
			<!--欢迎logo-->
			<center>
				<div>
					<img width="65%" src="/pic/images/logo_welcome.gif">
				</div>
			</center>
			<br>
			<!--快捷菜单-->
			<div class="quick_menu">
				<c:if test="${user.company=='金杯有限公司'}">
					<center>
						<h3>
							<b>快捷入口</b>
						</h3>
					</center>

					<div style="overflow:hidden;width:130px;margin-left:10%">
						<a href="toupload.action"><div class="welcome_up"></div>
						</a>
						<center>
							<div style="width:130px;margin:0 auto;margin-top:-5px">
								<h4>
									<b>文件上传</b>
								</h4>
							</div>
						</center>
					</div>



					<div class="welcome_mormal">
						<a href="showoptimizationUnCheck.action"><img
							src="/pic/images/data.png">
						</a>
						<center>
							<h4>
								<b>指导数据查看</b>
							</h4>
						</center>
					</div>
					<c:if test="${user.jurisdiction=='董事长'&& user.company=='金杯有限公司'}">
						<div class="welcome_mormal energy">
							<a href="to_show_day_data.action"><img
								src="/pic/images/energy.png">
							</a>
							<center>
								<h4>
									<b>能耗监测</b>
								</h4>
							</center>
						</div>
					</c:if>
					<div class="welcome_mormal">
						<a href="toguide.action"><img src="/pic/images/zhinanzhen.png">
						</a>
						<center>
							<h4>
								<b>使用指南</b>
							</h4>
						</center>
					</div>

					<div class="welcome_mormal welcome_mormal_h">
						<a href="toupUifo.action"><img
							src="/pic/images/default_head.png">
						</a>
						<center>
							<h4>
								<b>个人信息修改</b>
							</h4>
						</center>
					</div>
				</c:if>
				<c:if test="${user.company=='玖源有限公司'}">
					<center>
						<h3>
							<b>快捷功能</b>
						</h3>
					</center>

					<div style="overflow:hidden;width:130px;margin-left:10%">
						<a href="toupload.action"><div class="welcome_up"></div>
						</a>
						<center>
							<div style="width:130px;margin:0 auto;margin-top:-5px">
								<h4>
									<b>文件上传</b>
								</h4>
							</div>
						</center>
					</div>



					<div class="welcome_mormal">
						<a href="jy_showoptimizationUnCheck.action"><img
							src="/pic/images/data.png">
						</a>
						<center>
							<h4>
								<b>指导数据查看</b>
							</h4>
						</center>
					</div>
					<c:if test="${user.jurisdiction=='董事长'&& user.company=='玖源有限公司'}">
						<div class="welcome_mormal energy">
							<a href="jy_to_show_day_data.action"><img
								src="/pic/images/energy.png">
							</a>
							<center>
								<h4>
									<b>能耗监测</b>
								</h4>
							</center>
						</div>
					</c:if>
					<div class="welcome_mormal">
						<a href="jy_toguide.action"><img
							src="/pic/images/zhinanzhen.png">
						</a>
						<center>
							<h4>
								<b>使用指南</b>
							</h4>
						</center>
					</div>

					<div class="welcome_mormal welcome_mormal_h">
						<a id="gerenxinxi" href="jy_toupUifo.action"><img
							src="/pic/images/default_head.png">
						</a>
						<center>
							<h4>
								<b>个人信息修改</b>
							</h4>
						</center>
					</div>
				</c:if>
			</div>


			<div class="brift_intr">

				<h4>
					<b>成都赛特工信科技有限公司是一家新型节能服务型科技公司，公司依托具有自主知识产权的节能技术，采用国际通用的合同能源管理(EPC — Energy Performance Contracting)模式提供对企业生产过程进行管控的专业化节能技术，同时还致力于节能技术的研发 </b>
				</h4>
				<h4>
					<b>公司视信誉为生命，把服务当成一种不渝的使命。在向用户提供稳定、高品质的技术产品的同时，提供优质的售前售后服务，以确保用户在使用过程中的连续可靠性，以ISO9001质保体系为准则，以不懈追求卓越品质的精神，不断提升服务质量，努力把最好的技术产品呈现给用户
					</b>
				</h4>

			</div>

			<br> <br> <br>

		</div>

	</div>


</body>

</html>