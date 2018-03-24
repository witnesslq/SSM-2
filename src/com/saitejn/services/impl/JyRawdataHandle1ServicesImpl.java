package com.saitejn.services.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.saitejn.mapper.JyRawdataHandle1CustomerMapper;
import com.saitejn.pojo.JyRawdataHandle1;
import com.saitejn.services.JyRawdataHandle1Services;
/**
 * 原始数据存储实现类
 * @class jyRawdataHandle1ServicesImpl.java
 * @Description:
 * @author:罗康元
 * Company:赛特工信科技有限公司
 * @date :2016-9-23
 */
public class JyRawdataHandle1ServicesImpl implements JyRawdataHandle1Services {
	@Autowired
	private JyRawdataHandle1CustomerMapper jyRawdataHandle1CustomerMapper;
	
	private Double average;
	/*@Override
	public void saveDate(int ecount,int bcount)throws Exception {
		//获取用户上传的数据
		 List<JyExcelInput> cdataList = jyDataServices.selectAll();
		 
		 		for(int j = ecount; j<ecount+bcount; j++){
					 JyRawdataHandle1 jyRawdataHandle1 = new JyRawdataHandle1();
					JyExcelInput ftime = cdataList.get(j);//前一刻时间
					
					JyExcelInput btime = cdataList.get(j+1);//后一刻时间
					
					//原始基本数据
					Date datetimeDate = btime.getJytime();
					jyRawdataHandle1.set时间(datetimeDate);
					jyRawdataHandle1.setTI_501(btime.getTI_501());
					jyRawdataHandle1.setTI_1_51(btime.getTI_1_51());
					jyRawdataHandle1.setTI_1_85(btime.getTI_1_85());
					jyRawdataHandle1.setTI_1_90(btime.getTI_1_90());
					jyRawdataHandle1.setTI_10(btime.getTI_10());
					jyRawdataHandle1.setTI_281(btime.getTI_281());
					jyRawdataHandle1.setTI_111(btime.getTI_111());
					jyRawdataHandle1.setTI_19(btime.getTI_19());
					jyRawdataHandle1.setTI_272(btime.getTI_272());
					jyRawdataHandle1.setTI_22(btime.getTI_22());
					jyRawdataHandle1.setTI_24(btime.getTI_24());
					jyRawdataHandle1.setTI_266(btime.getTI_266());
					jyRawdataHandle1.setTI_31(btime.getTI_31());
					jyRawdataHandle1.setTI_70(btime.getTI_70());
					jyRawdataHandle1.setTI_267(btime.getTI_267());
					jyRawdataHandle1.setTI_85A(btime.getTI_85A());
					jyRawdataHandle1.setTI_522(btime.getTI_522());
					jyRawdataHandle1.setTI_81(btime.getTI_81());
					jyRawdataHandle1.setTI_45(btime.getTI_45());
					jyRawdataHandle1.setTI_12(btime.getTI_12());
					jyRawdataHandle1.setFI_1(btime.getFI_1());
					jyRawdataHandle1.setFI_2(btime.getFI_2());
					jyRawdataHandle1.setFI_3(btime.getFI_3());
					jyRawdataHandle1.setFI_51(btime.getFI_51());
					jyRawdataHandle1.setFI_4001(btime.getFI_4001());
					jyRawdataHandle1.setFI_63(btime.getFI_63());
					jyRawdataHandle1.setFI_27(btime.getFI_27());
					jyRawdataHandle1.setFI_5(btime.getFI_5());
					jyRawdataHandle1.setW_C(btime.getW_C());
					jyRawdataHandle1.setA_C(btime.getA_C());
					jyRawdataHandle1.setFI_2000(btime.getFI_2000());
					jyRawdataHandle1.setFI_7(btime.getFI_7());
					jyRawdataHandle1.setFI_84(btime.getFI_84());
					jyRawdataHandle1.setFI_84A(btime.getFI_84A());
					jyRawdataHandle1.setFI_84B(btime.getFI_84B());
					jyRawdataHandle1.setFI_314(btime.getFI_314());
					jyRawdataHandle1.setFI_3110(btime.getFI_3110());
					jyRawdataHandle1.setFI_3116(btime.getFI_3116());
					jyRawdataHandle1.setFI_3117(btime.getFI_3117());
					jyRawdataHandle1.setFI_2301(btime.getFI_2301());
					jyRawdataHandle1.setFI_50(btime.getFI_50());
					jyRawdataHandle1.setFI_1502(btime.getFI_1502());
					jyRawdataHandle1.setPI_657(btime.getPI_657());
					jyRawdataHandle1.setPI_4(btime.getPI_4());
					jyRawdataHandle1.setPI_5(btime.getPI_5());
					jyRawdataHandle1.setPI_6(btime.getPI_6());
					jyRawdataHandle1.setPI_80(btime.getPI_80());
					jyRawdataHandle1.setPI_82(btime.getPI_82());
					jyRawdataHandle1.setPI_9(btime.getPI_9());
					jyRawdataHandle1.setPI_19(btime.getPI_19());
					jyRawdataHandle1.setPI_25(btime.getPI_25());
					jyRawdataHandle1.setAIA_5(btime.getAIA_5());
					jyRawdataHandle1.setAIA_5A(btime.getAIA_5A());
					jyRawdataHandle1.setAI_1(btime.getAI_1());
					jyRawdataHandle1.setAI_1B(btime.getAI_1B());
					jyRawdataHandle1.setAI_1401(btime.getAI_1401());
					jyRawdataHandle1.setAI_1401HN(btime.getAI_1401HN());
					jyRawdataHandle1.set累积氨产量(btime.getFIQ_1502()/1000);
					jyRawdataHandle1.set累积总气耗(btime.getFIQ_6001());
					jyRawdataHandle1.set累积原料气耗(btime.getFIQ_1());
					jyRawdataHandle1.set累积燃料气耗(btime.getFIQ_32());
					jyRawdataHandle1.set累积快锅燃气(btime.getFIQ_6003());
					jyRawdataHandle1.set累积快锅产汽(btime.getFIQ_6002());
					//原始计算后的数据
					//计算后的时段氨产量，没有精确度
					Double timeNh3 = btime.getFIQ_1502()/1000-ftime.getFIQ_1502()/1000;
					BigDecimal b = new BigDecimal(timeNh3);
					//四舍五入后，保留三位小数的时段氨产量
					Double etimeNh3 = b.setScale(4,BigDecimal.ROUND_HALF_UP).doubleValue();
					jyRawdataHandle1.set时段氨产量(etimeNh3);
					
					//时段总气耗计算
					Double timegascon = btime.getFIQ_6001()-ftime.getFIQ_6001();
					BigDecimal btimegascon = new BigDecimal(timegascon);
					//四舍五入后，保留三位小数的时段氨产量
					Double etimegascon = btimegascon.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					jyRawdataHandle1.set时段总气耗(etimegascon);
					
					//时段时段原料气耗计算
					Double timerawcon = btime.getFIQ_1()-ftime.getFIQ_1();
					BigDecimal btimerawcon = new BigDecimal(timerawcon);
					//四舍五入后，保留三位小数的时段氨产量
					Double etimerawcon = btimerawcon.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					jyRawdataHandle1.set时段原料气耗(etimerawcon);
					
					//时段时段燃料气耗计算
					Double timefuecon = btime.getFIQ_32()-ftime.getFIQ_32();
					BigDecimal btimefuecon = new BigDecimal(timefuecon);
					//四舍五入后，保留三位小数的时段氨产量
					Double etimefuecon = btimefuecon.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					jyRawdataHandle1.set时段燃料气耗(etimefuecon);
					
					//时段快锅气耗计算
					Double timefastgcon = btime.getFIQ_6003()-ftime.getFIQ_6003();
					BigDecimal btimefastgcon = new BigDecimal(timefastgcon);
					//四舍五入后，保留三位小数的时段氨产量
					Double etimefastgcon = btimefastgcon.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					jyRawdataHandle1.set时段快锅气耗(etimefastgcon);
					
					//时段净蒸汽耗計算
					Double timecleancon = btime.getFI_3110()*1000*0.1071/6-btime.getFI_3116()*1000*0.1071/6+btime.getFI_3117()*1000*0.0929/6+btime.getFI_2301()*1000*0.0929/6;
					BigDecimal btimecleancon = new BigDecimal(timecleancon);
					//四舍五入后，保留三位小数的时段氨产量
					Double etimecleancon = btimecleancon.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					jyRawdataHandle1.set时段净蒸汽耗(etimecleancon);
					
					//时段气耗計算 时段总气耗-时段快锅气耗
					Double timeongas = timegascon-timefastgcon;
					BigDecimal btimeongas = new BigDecimal(timeongas);
					//四舍五入后，保留三位小数的时段氨产量
					Double etimeongas = btimeongas.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					jyRawdataHandle1.set时段气耗(etimeongas);
					
					//时段气耗_含蒸汽折算计算   时段气耗+时段净蒸汽耗÷1.2143
				    Double timegasteamcon = timeongas+timecleancon/1.2143;
				    BigDecimal btimegasteamcon = new BigDecimal(timegasteamcon);
					//四舍五入后，保留三位小数的时段氨产量
					Double etimegasteamcon = btimegasteamcon.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					jyRawdataHandle1.set时段气耗_含蒸汽折算(etimegasteamcon);
					
					//系统负荷计算
					jyRawdataHandle1.set系统负荷(btime.getFI_1_FH());
					
					//小时氨产量计算 时段氨产量×6
					Double hourNh3 = timeNh3*6;
					BigDecimal bhourNh3 = new BigDecimal(hourNh3);
					//四舍五入后，保留三位小数的时段氨产量
					Double ehourNh3 = bhourNh3.setScale(4,BigDecimal.ROUND_HALF_UP).doubleValue();
					jyRawdataHandle1.set小时氨产量(ehourNh3);
					
					//吨氨气耗_含蒸汽折算 计算  时段气耗（含蒸汽折算）÷ 时段氨产量
					Double tongascon = timegasteamcon/timeNh3;
					BigDecimal btongascon = new BigDecimal(tongascon);
					//四舍五入后，保留三位小数的时段氨产量
					Double etongascon = btongascon.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					jyRawdataHandle1.set吨氨气耗_含蒸汽折算(etongascon);
					
					//吨氨综合消耗计算 1.2143×吨氨气耗（含蒸汽折算）
					Double tonNh3con= 1.2143*tongascon;
					BigDecimal btonNh3con = new BigDecimal(tonNh3con);
					//四舍五入后，保留三位小数的时段氨产量
					Double etonNh3con = btonNh3con.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					jyRawdataHandle1.set吨氨综合消耗(etonNh3con);
					
					//吨氨气耗 计算 时段气耗÷ 时段氨产量
					Double tonNh3gascon = timeongas/timeNh3;
					BigDecimal btonNh3gascon = new BigDecimal(tonNh3gascon);
					//四舍五入后，保留三位小数的时段氨产量
					Double etonNh3gascon = btonNh3gascon.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					jyRawdataHandle1.set吨氨气耗(etonNh3gascon);
					
					//吨氨原料气耗计算 时段原料气耗÷ 时段氨产量
					Double tonNh3rawcon = timerawcon/timeNh3;
					BigDecimal btonNh3rawcon = new BigDecimal(tonNh3rawcon);
					//四舍五入后，保留三位小数的时段氨产量
					Double etonNh3rawcon = btonNh3rawcon.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					jyRawdataHandle1.set吨氨原料气耗(etonNh3rawcon);
					
					//吨氨燃料气耗计算  时段燃料气耗÷ 时段氨产量
					Double tonNh3fuecon = timefuecon/timeNh3;
					BigDecimal btonNh3fuecon = new BigDecimal(tonNh3fuecon);
					//四舍五入后，保留三位小数的时段氨产量
					Double etonNh3fuecon = btonNh3fuecon.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					jyRawdataHandle1.set吨氨燃料气耗(etonNh3fuecon);
					
					//班次计算
					jyRawdataHandle1.set班次(1);
					//获取用户信息里的班次信息
					
					//根据时间获取对应的班次信息
					Date date = btime.getJbtime();
					String classtime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
					//截取年
					String year = classtime.substring(0, 10);
					JbClassinfor jbClassinfor = seclectByTime(year);
				
					//截取时分秒
					String mdate = classtime.substring(11, 19);
					if(isInTime("16:09-00:01", mdate)){
						int m = jbClassinfor.getMorclass();
						jyRawdataHandle1.setShift(m);
					}
					if(isInTime("00:09-08:01", mdate)){
						int a = jbClassinfor.getAftclass();
						jyRawdataHandle1.setShift(a);
					}
					if(isInTime("08:09-16:01", mdate)){
						int e = jbClassinfor.getEveclass();
						jyRawdataHandle1.setShift(e);
					}
				
					//查询班次信息
					
					//保存到数据库
			       jyRawdataHandle1CustomerMapper.saveDate(jyRawdataHandle1);
			       //问题所在
			       
			
		}
		 	}
	 int ycxs=0;
	@Override
	public void saveToDate2(int ycount,int upcount) throws Exception {
		 
		List<JyRawdataHandle1> handel1List = jyRawdataHandle1CustomerMapper.selectAllhandle1();
	      
	       JyRawdataHandle2 jyRawdataHandle2 = new JyRawdataHandle2();
	       //定义总的小时氨产量
	       Double total_hour_nh3_yield = 0.0;
	      
	       //获取平均值
	       for(int k = ycount; k<ycount+upcount;k++){
	    	   JyRawdataHandle1 handle1 = handel1List.get(k);
		  	   //小时氨产量
		  	   Double hour_nh3_yield = handle1.get小时氨产量();
		  	   if(hour_nh3_yield >100.00){
		  		   ycxs++;
		  	   }else{
		  		 //小时氨产量的总数
			  	 total_hour_nh3_yield += hour_nh3_yield;
		  	   }
	       }
	       //平均氨产量
	  	   Double average = total_hour_nh3_yield/upcount-ycxs;
	  	   BigDecimal baverage = new BigDecimal(average);
				Double eaverage = baverage.setScale(3,BigDecimal.ROUND_HALF_UP).doubleValue();
	  	   this.average = eaverage;
	       //剔除异常数据
	       for(int h= ycount; h<ycount+upcount; h++){
	    	   JyRawdataHandle1 handle1 = handel1List.get(h);
	    	   //小时氨产量
	    	   Double hour_nh3_yield = handle1.get小时氨产量();
	    	   if(hour_nh3_yield >100.00){
		    		  //获取异常ID
		    		 Date time = handle1.get时间();
		    		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		    		 String yctime = sdf.format(time);
		    		  //根据异常ID删除异常记录
		    		  jyRawdataHandle1CustomerMapper.deleteByTime(yctime);
		    		  continue;
		    	  }
			    	  if(hour_nh3_yield == 0){
			    		  //获取异常ID
			    		 Date time = handle1.get时间();
			    		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
			    		 String yctime = sdf.format(time);
			    		  //根据异常ID删除异常记录
			    		  jyRawdataHandle1CustomerMapper.deleteByTime(yctime);
			    		  continue;
			    	  }
			    	  //小时氨产量”数据与平均值误差绝对值超过平均值35%时
			    	  Double aver = hour_nh3_yield-average;
			    	  aver = new Double(Math.abs(aver.doubleValue()));
			    	  System.out.println("aver");
			    	  if((aver>average*0.35)){
			    		  Date time = handle1.get时间();
				    		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
				    		 String yctime = sdf.format(time);
				    		  //根据异常ID删除异常记录
				    		  jyRawdataHandle1CustomerMapper.deleteByTime(yctime);
				    		  continue;
			    	  }
			    	   //吨氨综合消耗
			    	   Double tonnh3_compre_consume = handle1.get吨氨综合消耗();
			    	   if(tonnh3_compre_consume == 0){
				    		  //获取异常ID
			    		   Date time = handle1.get时间();
				    		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
				    		 String yctime = sdf.format(time);
				    		  //根据异常ID删除异常记录
				    		  jyRawdataHandle1CustomerMapper.deleteByTime(yctime);
				    		 
				    	  }
			    	   //吨氨气耗
			    	   Double  tonnh3_gas_consume = handle1.get吨氨气耗();
			    	   if(tonnh3_gas_consume == 0){
				    		  //获取异常ID
			    		   Date time = handle1.get时间();
				    		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
				    		 String yctime = sdf.format(time);
				    		  //根据异常ID删除异常记录
				    		  jyRawdataHandle1CustomerMapper.deleteByTime(yctime);
				    		 
				    	  }
			    	   //吨氨原料气耗
			    	   Double tonnh3_raw_gas_consume = handle1.get吨氨原料气耗();
			    	   if(tonnh3_raw_gas_consume == 0){
				    		  //获取异常ID
			    		     Date time = handle1.get时间();
				    		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
				    		 String yctime = sdf.format(time);
				    		  //根据异常ID删除异常记录
				    		  jyRawdataHandle1CustomerMapper.deleteByTime(yctime);
				    		 
				    	  }
			    	   //吨氨燃料气耗
			    	   Double tonnh3_fuel_consume = handle1.get吨氨燃料气耗();
			    	   if(tonnh3_fuel_consume == 0){
			    		   Date time = handle1.get时间();
				    		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
				    		 String yctime = sdf.format(time);
				    		  //根据异常ID删除异常记录
				    		  jyRawdataHandle1CustomerMapper.deleteByTime(yctime);
				    		 
				    	  }
			    	   //吨氨电耗
			    	   Double tonnh3_electric_consume = handle1.get吨氨气耗_含蒸汽折算();
			    	   if(tonnh3_electric_consume == 0){
			    		   Date time = handle1.get时间();
				    		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
				    		 String yctime = sdf.format(time);
				    		  //根据异常ID删除异常记录
				    		  jyRawdataHandle1CustomerMapper.deleteByTime(yctime);
				    		  
				    	  }
			    	   //基本数据获取开始
			    	   Date datetime = handle1.get时间();
			    	   jyRawdataHandle2.set时间(datetime);
			    	   jyRawdataHandle2.setTI_501(handle1.getTI_501());
			    	   jyRawdataHandle2.setTI_1_51(handle1.getTI_1_51());
			    	   jyRawdataHandle2.setTI_1_85(handle1.getTI_1_85());
			    	   jyRawdataHandle2.setTI_1_90(handle1.getTI_1_90());
			    	   jyRawdataHandle2.setTI_10(handle1.getTI_10());
			    	   jyRawdataHandle2.setTI_281(handle1.getTI_281());
			    	   jyRawdataHandle2.setTI_111(handle1.getTI_111());
			    	   jyRawdataHandle2.setTI_19(handle1.getTI_19());
			    	   jyRawdataHandle2.setTI_272(handle1.getTI_272());
			    	   jyRawdataHandle2.setTI_22(handle1.getTI_22());
			    	   jyRawdataHandle2.setTI_24(handle1.getTI_24());
			    	   jyRawdataHandle2.setTI_266(handle1.getTI_266());
			    	   jyRawdataHandle2.setTI_31(handle1.getTI_31());
			    	   jyRawdataHandle2.setTI_70(handle1.getTI_70());
			    	   jyRawdataHandle2.setTI_267(handle1.getTI_267());
			    	   jyRawdataHandle2.setTI_85A(handle1.getTI_85A());
			    	   jyRawdataHandle2.setTI_522(handle1.getTI_522());
			    	   jyRawdataHandle2.setTI_81(handle1.getTI_81());
			    	   jyRawdataHandle2.setTI_45(handle1.getTI_45());
			    	   jyRawdataHandle2.setTI_12(handle1.getTI_12());
			    	   jyRawdataHandle2.setFI_1(handle1.getFI_1());
			    	   jyRawdataHandle2.setFI_2(handle1.getFI_2());
			    	   jyRawdataHandle2.setFI_3(handle1.getFI_3());
			    	   jyRawdataHandle2.setFI_51(handle1.getFI_51());
			    	   jyRawdataHandle2.setFI_4001(handle1.getFI_4001());
			    	   jyRawdataHandle2.setFI_63(handle1.getFI_63());
			    	   jyRawdataHandle2.setFI_27(handle1.getFI_27());
			    	   jyRawdataHandle2.setFI_5(handle1.getFI_5());
			    	   jyRawdataHandle2.setW_C(handle1.getW_C());
			    	   jyRawdataHandle2.setA_C(handle1.getA_C());
			    	   jyRawdataHandle2.setFI_2000(handle1.getFI_2000());
			    	   jyRawdataHandle2.setFI_7(handle1.getFI_7());
			    	   jyRawdataHandle2.setFI_84(handle1.getFI_84());
			    	   jyRawdataHandle2.setFI_84A(handle1.getFI_84A());
			    	   jyRawdataHandle2.setFI_84B(handle1.getFI_84B());
			    	   jyRawdataHandle2.setFI_314(handle1.getFI_314());
			    	   jyRawdataHandle2.setFI_3110(handle1.getFI_3110());
			    	   jyRawdataHandle2.setFI_3116(handle1.getFI_3116());
			    	   jyRawdataHandle2.setFI_3117(handle1.getFI_3117());
			    	   jyRawdataHandle2.setFI_2301(handle1.getFI_2301());
			    	   jyRawdataHandle2.setFI_50(handle1.getFI_50());
			    	   jyRawdataHandle2.setFI_1502(handle1.getFI_1502());
			    	   jyRawdataHandle2.setPI_657(handle1.getPI_657());
			    	   jyRawdataHandle2.setPI_4(handle1.getPI_4());
			    	   jyRawdataHandle2.setPI_5(handle1.getPI_5());
			    	   jyRawdataHandle2.setPI_6(handle1.getPI_6());
			    	   jyRawdataHandle2.setPI_80(handle1.getPI_80());
			    	   jyRawdataHandle2.setPI_82(handle1.getPI_82());
			    	   jyRawdataHandle2.setPI_9(handle1.getPI_9());
			    	   jyRawdataHandle2.setPI_19(handle1.getPI_19());
			    	   jyRawdataHandle2.setPI_25(handle1.getPI_25());
			    	   jyRawdataHandle2.setAIA_5(handle1.getAIA_5());
			    	   jyRawdataHandle2.setAIA_5A(handle1.getAIA_5A());
			    	   jyRawdataHandle2.setAI_1(handle1.getAI_1());
			    	   jyRawdataHandle2.setAI_1B(handle1.getAI_1B());
			    	   jyRawdataHandle2.setAI_1401(handle1.getAI_1401());
			    	   jyRawdataHandle2.setAI_1401HN(handle1.getAI_1401HN());
			    	   jyRawdataHandle2.set累积氨产量(handle1.get累积氨产量());
			    	   jyRawdataHandle2.set累积总气耗(handle1.get累积总气耗());
			    	   jyRawdataHandle2.set累积原料气耗(handle1.get累积原料气耗());
			    	   jyRawdataHandle2.set累积燃料气耗(handle1.get累积燃料气耗());
			    	   jyRawdataHandle2.set累积快锅燃气(handle1.get累积快锅燃气());
			    	   jyRawdataHandle2.set累积快锅产汽(handle1.get累积快锅产汽());
			    	   jyRawdataHandle2.set时段氨产量(handle1.get时段氨产量());
			    	   jyRawdataHandle2.set时段总气耗(handle1.get时段总气耗());
			    	   jyRawdataHandle2.set时段原料气耗(handle1.get时段原料气耗());
			    	   jyRawdataHandle2.set时段燃料气耗(handle1.get时段燃料气耗());
			    	   jyRawdataHandle2.set时段快锅气耗(handle1.get时段快锅气耗());
			    	   jyRawdataHandle2.set时段净蒸汽耗(handle1.get时段净蒸汽耗());
			    	   jyRawdataHandle2.set时段气耗(handle1.get时段气耗());
			    	   jyRawdataHandle2.set时段气耗_含蒸汽折算(handle1.get时段气耗_含蒸汽折算());
			    	   jyRawdataHandle2.set系统负荷(handle1.get系统负荷());
			    	   jyRawdataHandle2.set小时氨产量(handle1.get小时氨产量());
			    	   jyRawdataHandle2.set吨氨综合消耗(handle1.get吨氨综合消耗());
			    	   jyRawdataHandle2.set吨氨气耗(handle1.get吨氨气耗());
			    	   jyRawdataHandle2.set吨氨原料气耗(handle1.get吨氨原料气耗());
			    	   jyRawdataHandle2.set吨氨燃料气耗(handle1.get吨氨燃料气耗());
			    	   jyRawdataHandle2.set吨氨气耗_含蒸汽折算(handle1.get吨氨气耗_含蒸汽折算());
			    	   jyRawdataHandle2.set班次(handle1.get班次());
			    	//基本数据获取结束
			    	   //保存到干净数据中
			    	   jyRawdataHandle1CustomerMapper.saveToHandl2(jyRawdataHandle2);
		    	 
	    
	    	   
	       }
	      
		
	}*/
	/*public static boolean isInTime(String sourceTime, String curTime) {
	    if (sourceTime == null || !sourceTime.contains("-") || !sourceTime.contains(":")) {
	        throw new IllegalArgumentException("Illegal Argument arg:" + sourceTime);
	    }
	    if (curTime == null || !curTime.contains(":")) {
	        throw new IllegalArgumentException("Illegal Argument arg:" + curTime);
	    }
	    String[] args = sourceTime.split("-");
	    SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
	    try {
	        long now = sdf.parse(curTime).getTime();
	        long start = sdf.parse(args[0]).getTime();
	        long end = sdf.parse(args[1]).getTime();
	        if (args[1].equals("00:00")) {
	            args[1] = "24:00";
	        }
	        if (end < start) {
	            if (now >= end && now < start) {
	                return false;
	            } else {
	                return true;
	            }
	        } 
	        else {
	            if (now >= start && now < end) {
	                return true;
	            } else {
	                return false;
	            }
	        }
	    } catch (ParseException e) {
	        e.printStackTrace();
	        throw new IllegalArgumentException("Illegal Argument arg:" + sourceTime);
	    }

	}*/
	@Override
	public List<JyRawdataHandle1> selectDataByContidion(String stime,
			String btime) throws Exception {
		List<JyRawdataHandle1> list1 = jyRawdataHandle1CustomerMapper.selectDataByContidion(stime, btime);//时间
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date newdate = sdf.parse(btime);
		Calendar c = Calendar.getInstance(); 
		c.setTime(newdate);  
		c.set(Calendar.DATE, c.get(Calendar.DATE) + 1);
        Date data2 = c.getTime();
        String dayBefore = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(data2);
		List<JyRawdataHandle1>list3 = jyRawdataHandle1CustomerMapper.selectDataByContidionAndClass3(stime, dayBefore);
		
		List<JyRawdataHandle1>list5 = new ArrayList<JyRawdataHandle1>();
		List<JyRawdataHandle1>list6 = new ArrayList<JyRawdataHandle1>();
		List<JyRawdataHandle1>list7 = new ArrayList<JyRawdataHandle1>();
		if(list3.size()>0){
		for(int i = 0; i <list3.size(); i++){
			
			JyRawdataHandle1 jy = list3.get(i);
			Date date = jy.get时间();
			Calendar date1 = Calendar.getInstance();
			date1.setTime(date);
			date1.set(Calendar.DATE, date1.get(Calendar.DATE) - 1);
			Date date2 = date1.getTime();
			jy.set时间(date2);
			list5.add(jy);
		}
		
		//将两个集合相同就相加list5(输入的时间一天的所有的0点)和list2
		for(JyRawdataHandle1 l1:list5){
			for(JyRawdataHandle1 l2:list1){
				if(l1.get时间().getTime()==l2.get时间().getTime()){
					JyRawdataHandle1 jyRawdataHandle1 = new JyRawdataHandle1();
					jyRawdataHandle1.set时间(l2.get时间());
					jyRawdataHandle1.set时段氨产量(l1.get时段氨产量()+l2.get时段氨产量());
					jyRawdataHandle1.set时段净蒸汽耗(l1.get时段净蒸汽耗()+l2.get时段净蒸汽耗());
					jyRawdataHandle1.set时段气耗(l1.get时段气耗()+l2.get时段气耗());
					jyRawdataHandle1.set累积氨产量(l1.get累积氨产量()+l2.get累积氨产量());
					jyRawdataHandle1.setClassNumber(l1.getClassNumber());
					list6.add(jyRawdataHandle1);
					break;
				}
			}
		}
		for(JyRawdataHandle1 l1:list5){
			for(JyRawdataHandle1 l2:list1){
				if(l1.get时间().getTime()==l2.get时间().getTime()){
				     list1.remove(l2);
					break;
				}
			}
		}

		
		
		}
		
		list6.addAll(list1);
		Collections.sort(list6,new Comparator<JyRawdataHandle1>() {

			@Override
			public int compare(JyRawdataHandle1 o1, JyRawdataHandle1 o2) {
				if(o1.get时间().getTime() > o2.get时间().getTime()){
					return 1;
				}
				if(o1.get时间().getTime() == o2.get时间().getTime()){
					return 0;
				}
				
				return -1;
			}
		});
		return list6;
		
	}
	
	@Override
	public List<JyRawdataHandle1> selectDataByMouth(String stime, String btime)
			throws Exception {
		List<JyRawdataHandle1> list1 = jyRawdataHandle1CustomerMapper.selectDataByMouth(stime, btime);//时间
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date newdate = sdf.parse(btime);
		Calendar c = Calendar.getInstance(); 
		c.setTime(newdate);  
		c.set(Calendar.DATE, c.get(Calendar.DATE) + 1);
        Date data2 = c.getTime();
        String dayBefore = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(data2);
		List<JyRawdataHandle1>list3 = jyRawdataHandle1CustomerMapper.selectDataByContidionAndClass3(stime, dayBefore);
		
		List<JyRawdataHandle1>list5 = new ArrayList<JyRawdataHandle1>();
		List<JyRawdataHandle1>list6 = new ArrayList<JyRawdataHandle1>();
		List<JyRawdataHandle1>list7 = new ArrayList<JyRawdataHandle1>();
		if(list3.size()>0){
		for(int i = 0; i <list3.size(); i++){
			
			JyRawdataHandle1 jy = list3.get(i);
			Date date = jy.get时间();
			Calendar date1 = Calendar.getInstance();
			date1.setTime(date);
			date1.set(Calendar.DATE, date1.get(Calendar.DATE) - 1);
			Date date2 = date1.getTime();
			jy.set时间(date2);
			list5.add(jy);
		}
		
		//将两个集合相同就相加list5(输入的时间一天的所有的0点)和list2
		for(JyRawdataHandle1 l1:list5){
			for(JyRawdataHandle1 l2:list1){
				if(l1.get时间().getTime()==l2.get时间().getTime()){
					JyRawdataHandle1 jyRawdataHandle1 = new JyRawdataHandle1();
					jyRawdataHandle1.set时间(l2.get时间());
					jyRawdataHandle1.set时段氨产量(l1.get时段氨产量()+l2.get时段氨产量());
					jyRawdataHandle1.set时段净蒸汽耗(l1.get时段净蒸汽耗()+l2.get时段净蒸汽耗());
					jyRawdataHandle1.set时段气耗(l1.get时段气耗()+l2.get时段气耗());
					jyRawdataHandle1.set累积氨产量(l1.get累积氨产量()+l2.get累积氨产量());
					jyRawdataHandle1.setClassNumber(l1.getClassNumber());
					list6.add(jyRawdataHandle1);
					break;
				}
			}
		}
		for(JyRawdataHandle1 l1:list5){
			for(JyRawdataHandle1 l2:list1){
				if(l1.get时间().getTime()==l2.get时间().getTime()){
				     list1.remove(l2);
					break;
				}
			}
		}

		
		
		}
		
		list6.addAll(list1);
		Collections.sort(list6,new Comparator<JyRawdataHandle1>() {

			@Override
			public int compare(JyRawdataHandle1 o1, JyRawdataHandle1 o2) {
				if(o1.get时间().getTime() > o2.get时间().getTime()){
					return 1;
				}
				if(o1.get时间().getTime() == o2.get时间().getTime()){
					return 0;
				}
				
				return -1;
			}
		});
		return list6;
		
	}
	@Override
	public List<JyRawdataHandle1> selectDataByYear(String stime, String btime)
			throws Exception {
		//用户输入时间段中包含了00.00.00
		List<JyRawdataHandle1> list1 = jyRawdataHandle1CustomerMapper.selectDataByYear(stime, btime);//时间
	
		//得到用户输入的时间区域中有哪些月份
		List<String> Utime = this.getMonthBetween(stime, btime);
		List<JyRawdataHandle1>listNext = new ArrayList<JyRawdataHandle1>();
		//查询月份的00：00：00的数据
		for(int i =0;i<Utime.size();i++){
			String time = Utime.get(i);
			
			String betime = time+"-01 00:00:00";
			String entime = time+"-01 00:01:00";
			JyRawdataHandle1 jyRawdataHandle1 = jyRawdataHandle1CustomerMapper.selectDataByYearnext(betime, entime);
			if(jyRawdataHandle1 != null){
			listNext.add(jyRawdataHandle1);
			}
		}
		List<JyRawdataHandle1>list6 = new ArrayList<JyRawdataHandle1>();
		for(JyRawdataHandle1 l1:list1){
			for(JyRawdataHandle1 l2:listNext){
				Date l1time = l1.get时间();
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
				String lintime = sdf.format(l1time);
				
				Date listNextTime = l2.get时间();
				
				String liNeTime = sdf.format(listNextTime);
				
				if(lintime.equals(liNeTime)){
					
					l1.set时间(l1.get时间());
					l1.set时段氨产量(l1.get时段氨产量()-l2.get时段氨产量());
					l1.set时段净蒸汽耗(l1.get时段净蒸汽耗()-l2.get时段净蒸汽耗());
					l1.set时段气耗(l1.get时段气耗()-l2.get时段气耗());
					l1.set累积氨产量(l1.get累积氨产量()-1);
					
					break;
				}
			}
		}
		for(JyRawdataHandle1 l1:list1){
			for(JyRawdataHandle1 l2:listNext){
				Date l1time = l1.get时间();
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
				String lintime = sdf.format(l1time);
				
				Date listNextTime = l2.get时间();
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(listNextTime); 
				calendar.add(Calendar.MONTH, -1);
				Date newDate = calendar.getTime();
				
				String liNeTime = sdf.format(newDate);
				
				
				if(lintime.equals(liNeTime)){
					
					l1.set时间(l1.get时间());
					l1.set时段氨产量(l1.get时段氨产量()+l2.get时段氨产量());
					l1.set时段净蒸汽耗(l1.get时段净蒸汽耗()+l2.get时段净蒸汽耗());
					l1.set时段气耗(l1.get时段气耗()+l2.get时段气耗());
					l1.set累积氨产量(l1.get累积氨产量()+1);
					
					break;
				}
			}
		}
		
	
		
		Collections.sort(list1,new Comparator<JyRawdataHandle1>() {

			@Override
			public int compare(JyRawdataHandle1 o1, JyRawdataHandle1 o2) {
				if(o1.get时间().getTime() > o2.get时间().getTime()){
					return 1;
				}
				if(o1.get时间().getTime() == o2.get时间().getTime()){
					return 0;
				}
				
				return -1;
			}
		});
		
		return list1;
		
	}
	@Override
	public List<JyRawdataHandle1> selectDataByQuarter(String stime, String btime)
			throws Exception {
			//用户输入时间段中包含了00.00.00
				List<JyRawdataHandle1> list1 = jyRawdataHandle1CustomerMapper.selectDataByQuarter(stime, btime);//时间
			
				//得到用户输入的时间区域中有哪些月份
				List<String> Utime = this.getMonthBetween(stime, btime);
				List<JyRawdataHandle1>listNext = new ArrayList<JyRawdataHandle1>();
				//查询月份的00：00：00的数据
				for(int i =0;i<Utime.size();i++){
					String time = Utime.get(i);
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
					Date userDate = sdf.parse(time);
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(userDate); 
					calendar.add(Calendar.MONTH, +1);
					Date newDate = calendar.getTime();
					String rtime = sdf.format(newDate)
;					String betime = rtime+"-01 00:00:00";
					String entime = rtime+"-01 00:09:00";
					JyRawdataHandle1 jyRawdataHandle1 = jyRawdataHandle1CustomerMapper.selectDataByYearnext(betime, entime);
					if(jyRawdataHandle1 != null){
					listNext.add(jyRawdataHandle1);
					}
				}
				List<JyRawdataHandle1>listNext2 = new ArrayList<JyRawdataHandle1>();
				//查询月份的00：00：00的数据
				for(int i =0;i<Utime.size();i++){
					String time = Utime.get(i);
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
					Date userDate = sdf.parse(time);
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(userDate); 
					calendar.add(Calendar.MONTH, -0);
					Date newDate = calendar.getTime();
					String rtime = sdf.format(newDate)
;					String betime = rtime+"-01 00:00:00";
					String entime = rtime+"-01 00:09:00";
					JyRawdataHandle1 jyRawdataHandle1 = jyRawdataHandle1CustomerMapper.selectDataByYearnext(betime, entime);
					if(jyRawdataHandle1 != null){
					listNext2.add(jyRawdataHandle1);
					}
				}
				
				for(JyRawdataHandle1 l1:list1){
					for(JyRawdataHandle1 l2:listNext){
						Date l1time = l1.get时间();
						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
						String lintime = sdf.format(l1time);
						
						Date listNextTime = l2.get时间();
						Calendar calendar = Calendar.getInstance();
						calendar.setTime(listNextTime); 
						calendar.add(Calendar.MONTH, -1);
						Date newDate = calendar.getTime();
						String liNeTime = sdf.format(newDate);
						
						if(lintime.equals(liNeTime)){
							
							l1.set时间(l1.get时间());
							l1.set时段氨产量(l1.get时段氨产量()+l2.get时段氨产量());
							l1.set时段净蒸汽耗(l1.get时段净蒸汽耗()+l2.get时段净蒸汽耗());
							l1.set时段气耗(l1.get时段气耗()+l2.get时段气耗());
							l1.set累积氨产量(l1.get累积氨产量()+1);
							
							break;
						}
					}
				}
				for(JyRawdataHandle1 l1:list1){
					for(JyRawdataHandle1 l2:listNext2){
						Date l1time = l1.get时间();
						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
						String lintime = sdf.format(l1time);
						
						Date listNextTime = l2.get时间();
						Calendar calendar = Calendar.getInstance();
						calendar.setTime(listNextTime); 
						calendar.add(Calendar.MONTH, -0);
						Date newDate = calendar.getTime();
						
						String liNeTime = sdf.format(newDate);
						
						
						if(lintime.equals(liNeTime)){
							
							l1.set时间(l1.get时间());
							l1.set时段氨产量(l1.get时段氨产量()-l2.get时段氨产量());
							l1.set时段净蒸汽耗(l1.get时段净蒸汽耗()-l2.get时段净蒸汽耗());
							l1.set时段气耗(l1.get时段气耗()-l2.get时段气耗());
							l1.set累积氨产量(l1.get累积氨产量()-1);
							
							break;
						}
					}
				}
				
			
				
				Collections.sort(list1,new Comparator<JyRawdataHandle1>() {

					@Override
					public int compare(JyRawdataHandle1 o1, JyRawdataHandle1 o2) {
						if(o1.get时间().getTime() > o2.get时间().getTime()){
							return 1;
						}
						if(o1.get时间().getTime() == o2.get时间().getTime()){
							return 0;
						}
						
						return -1;
					}
				});
				
				return list1;
		
	}
	/*@Override
	public JbClassinfor seclectByTime(String time) throws Exception {
		
		return jyRawdataHandle1CustomerMapper.seclectByTime(time);
	}
	//判断时间是否在区间里面
	public static boolean isInTime(String sourceTime, String curTime) {
	    if (sourceTime == null || !sourceTime.contains("-") || !sourceTime.contains(":")) {
	        throw new IllegalArgumentException("Illegal Argument arg:" + sourceTime);
	    }
	    if (curTime == null || !curTime.contains(":")) {
	        throw new IllegalArgumentException("Illegal Argument arg:" + curTime);
	    }
	    String[] args = sourceTime.split("-");
	    SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
	    try {
	        long now = sdf.parse(curTime).getTime();
	        long start = sdf.parse(args[0]).getTime();
	        long end = sdf.parse(args[1]).getTime();
	        if (args[1].equals("00:00")) {
	            args[1] = "24:00";
	        }
	        if (end < start) {
	            if (now >= end && now < start) {
	                return false;
	            } else {
	                return true;
	            }
	        } 
	        else {
	            if (now >= start && now < end) {
	                return true;
	            } else {
	                return false;
	            }
	        }
	    } catch (ParseException e) {
	        e.printStackTrace();
	        throw new IllegalArgumentException("Illegal Argument arg:" + sourceTime);
	    }

	}
	@Override
	public List<jyRawdataHandle1> selectDataByContidionAndClass(String stime,
			String btime) throws Exception {
		return jyRawdataHandle1CustomerMapper.selectDataByContidionAndClass(stime, btime);
	}
	@Override
	public List<jyRawdataHandle1> selectDataByMouthAndClass(String stime,
			String btime) throws Exception {
		
		return jyRawdataHandle1CustomerMapper.selectDataByMouthAndClass(stime, btime);
	}
	*/
	@Override
	public void deleteHand1() {
		jyRawdataHandle1CustomerMapper.deleteHand1();
	}
	@Override
	public void deleteHand2() {
		jyRawdataHandle1CustomerMapper.deleteHand2();
		
	}
	/*日报表按班查看*/
	@Override
	public List<JyRawdataHandle1> selectDataByContidionAndClass(String stime,
			String btime) throws Exception {
		// TODO Auto-generated method stub
		//早班
		List<JyRawdataHandle1> list1 = jyRawdataHandle1CustomerMapper.selectDataByContidionAndClass4(stime, btime); //00:10:00--08:00:00
		List<JyRawdataHandle1> list9 = new ArrayList<JyRawdataHandle1>();
		for(int i = 0; i<list1.size()-1;i++){
			JyRawdataHandle1 jyRawdataHandle1 = list1.get(i);
			JyRawdataHandle1 jyRawdataHandle2 = list1.get(i+1);
			
			Date jytime = jyRawdataHandle1.get时间();
			Date jytime2 = jyRawdataHandle2.get时间();
			long between=(jytime2.getTime()-jytime.getTime())/1000;//除以1000是为了转换成秒
			long day1=between/(24*3600);
			if(day1>1){
				//说明之间有缺失的早班，则添加
				for(int j = 1;j<day1;j++){
					//添加
					JyRawdataHandle1 jy = new JyRawdataHandle1();
					Calendar date1 = Calendar.getInstance();
					date1.setTime(jytime);
					date1.set(Calendar.DATE, date1.get(Calendar.DATE) +j);
					Date date2 = date1.getTime();
					jy.set时间(date2);
					jy.set时段氨产量(0.0);
					jy.set时段净蒸汽耗(0.0);
					jy.set时段气耗(0.0);
					jy.set累积氨产量(0.0);
					jy.setClassNumber(1);
					list9.add(jy);
				}
			}
		}
		list1.addAll(list9);
		//中班
		List<JyRawdataHandle1> list2 = jyRawdataHandle1CustomerMapper.selectDataByContidionAndClass1(stime, btime);// 08:10:00--16:00:00
		
		List<JyRawdataHandle1> list10 = new ArrayList<JyRawdataHandle1>();
		for(int i = 0; i<list2.size()-1;i++){
			JyRawdataHandle1 jyRawdataHandle1 = list2.get(i);
			JyRawdataHandle1 jyRawdataHandle2 = list2.get(i+1);
			
			Date jytime = jyRawdataHandle1.get时间();
			Date jytime2 = jyRawdataHandle2.get时间();
			long between=(jytime2.getTime()-jytime.getTime())/1000;//除以1000是为了转换成秒
			long day1=between/(24*3600);
			if(day1>1){
				//说明之间有缺失的早班，则添加
				for(int j = 1;j<day1;j++){
					//添加
					JyRawdataHandle1 jy = new JyRawdataHandle1();
					Calendar date1 = Calendar.getInstance();
					date1.setTime(jytime);
					date1.set(Calendar.DATE, date1.get(Calendar.DATE) +j);
					Date date2 = date1.getTime();
					jy.set时间(date2);
					jy.set时段氨产量(0.0);
					jy.set时段净蒸汽耗(0.0);
					jy.set时段气耗(0.0);
					jy.set累积氨产量(0.0);
					jy.setClassNumber(2);
					list10.add(jy);
				}
			}
		}
		list2.addAll(list10);
		//晚班
		List<JyRawdataHandle1> list4 = jyRawdataHandle1CustomerMapper.selectDataByContidionAndClass2(stime, btime);//18:10:00--23:29:29
		
		List<JyRawdataHandle1> list11 = new ArrayList<JyRawdataHandle1>();
		for(int i = 0; i<list4.size()-1;i++){
			JyRawdataHandle1 jyRawdataHandle1 = list4.get(i);
			JyRawdataHandle1 jyRawdataHandle2 = list4.get(i+1);
			
			Date jytime = jyRawdataHandle1.get时间();
			Date jytime2 = jyRawdataHandle2.get时间();
			long between=(jytime2.getTime()-jytime.getTime())/1000;//除以1000是为了转换成秒
			long day1=between/(24*3600);
			if(day1>1){
				//说明之间有缺失的早班，则添加
				for(int j = 1;j<day1;j++){
					//添加
					JyRawdataHandle1 jy = new JyRawdataHandle1();
					Calendar date1 = Calendar.getInstance();
					date1.setTime(jytime);
					date1.set(Calendar.DATE, date1.get(Calendar.DATE) +j);
					Date date2 = date1.getTime();
					jy.set时间(date2);
					jy.set时段氨产量(0.0);
					jy.set时段净蒸汽耗(0.0);
					jy.set时段气耗(0.0);
					jy.set累积氨产量(0.0);
					jy.setClassNumber(3);
					list11.add(jy);
				}
			}
		}
		list4.addAll(list11);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date newdate = sdf.parse(btime);
		Calendar c = Calendar.getInstance(); 
		c.setTime(newdate);  
		c.set(Calendar.DATE, c.get(Calendar.DATE) + 1);
        Date data2 = c.getTime();
        String dayBefore = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(data2);
        //晚班
		List<JyRawdataHandle1>list3 = jyRawdataHandle1CustomerMapper.selectDataByContidionAndClass3(stime, dayBefore);
		
		List<JyRawdataHandle1>list5 = new ArrayList<JyRawdataHandle1>();
		List<JyRawdataHandle1>list6 = new ArrayList<JyRawdataHandle1>();
		List<JyRawdataHandle1>list7 = new ArrayList<JyRawdataHandle1>();
		if(list3.size()>0){
		for(int i = 0; i <list3.size(); i++){
			
			JyRawdataHandle1 jy = list3.get(i);
			Date date = jy.get时间();
			Calendar date1 = Calendar.getInstance();
			date1.setTime(date);
			date1.set(Calendar.DATE, date1.get(Calendar.DATE) - 1);
			Date date2 = date1.getTime();
			jy.set时间(date2);
			list5.add(jy);
		}
		List<JyRawdataHandle1> list12 = new ArrayList<JyRawdataHandle1>();
		for(int i = 0; i<list5.size()-1;i++){
			JyRawdataHandle1 jyRawdataHandle1 = list5.get(i);
			JyRawdataHandle1 jyRawdataHandle2 = list5.get(i+1);
			
			Date jytime = jyRawdataHandle1.get时间();
			Date jytime2 = jyRawdataHandle2.get时间();
			long between=(jytime2.getTime()-jytime.getTime())/1000;//除以1000是为了转换成秒
			long day1=between/(24*3600);
			if(day1>1){
				//说明之间有缺失的早班，则添加
				for(int j = 1;j<day1;j++){
					//添加
					JyRawdataHandle1 jy = new JyRawdataHandle1();
					Calendar date1 = Calendar.getInstance();
					date1.setTime(jytime);
					date1.set(Calendar.DATE, date1.get(Calendar.DATE) +j);
					Date date2 = date1.getTime();
					jy.set时间(date2);
					jy.set时段氨产量(0.0);
					jy.set时段净蒸汽耗(0.0);
					jy.set时段气耗(0.0);
					jy.set累积氨产量(0.0);
					jy.setClassNumber(3);
					list12.add(jy);
				}
			}
		}
		list5.addAll(list12);
		//将两个集合相同就相加list5(输入的时间一天的所有的0点)和list2
		for(JyRawdataHandle1 l1:list5){
			for(JyRawdataHandle1 l2:list4){
				if(l1.get时间().getTime()==l2.get时间().getTime()){
					JyRawdataHandle1 jyRawdataHandle1 = new JyRawdataHandle1();
					jyRawdataHandle1.set时间(l2.get时间());
					jyRawdataHandle1.set时段氨产量(l1.get时段氨产量()+l2.get时段氨产量());
					jyRawdataHandle1.set时段净蒸汽耗(l1.get时段净蒸汽耗()+l2.get时段净蒸汽耗());
					jyRawdataHandle1.set时段气耗(l1.get时段气耗()+l2.get时段气耗());
					jyRawdataHandle1.set累积氨产量(l1.get累积氨产量()+l2.get累积氨产量());
					jyRawdataHandle1.setClassNumber(l1.getClassNumber());
					list6.add(jyRawdataHandle1);
					break;
				}
			}
		}
		

		
		
		list1.addAll(list2);
		list1.addAll(list6);
		}else{
			list1.addAll(list2);
			list1.addAll(list4);
			
		}
		
		JyRawdataHandle1 jyRawdataHandle1 = new JyRawdataHandle1();
		
	
			
		
		Collections.sort(list1,new Comparator<JyRawdataHandle1>() {

			@Override
			public int compare(JyRawdataHandle1 o1, JyRawdataHandle1 o2) {
				if(o1.get时间().getTime() > o2.get时间().getTime()){
					return 1;
				}
				if(o1.get时间().getTime() == o2.get时间().getTime()){
					return 0;
				}
				
				return -1;
			}
		});
		List<JyRawdataHandle1> alllist = new ArrayList<JyRawdataHandle1>();
		Integer m = list1.get(0).getClassNumber();
		if(m !=1){
			//首条记录缺少早班
			Date date = list1.get(0).get时间();
			jyRawdataHandle1.set时间(date);
			jyRawdataHandle1.setClassNumber(1);
			jyRawdataHandle1.set时段氨产量(0.0);
			jyRawdataHandle1.set时段净蒸汽耗(0.0);
			jyRawdataHandle1.set时段气耗(0.0);
			jyRawdataHandle1.set累积氨产量(0.0);
			alllist.add(jyRawdataHandle1);
			
		}
		alllist.addAll(list1);
		Collections.sort(alllist,new Comparator<JyRawdataHandle1>() {

			@Override
			public int compare(JyRawdataHandle1 o1, JyRawdataHandle1 o2) {
				if(o1.get时间().getTime() > o2.get时间().getTime()){
					return 1;
				}
				if(o1.get时间().getTime() == o2.get时间().getTime()){
					return 0;
				}
				
				return -1;
			}
		});
		
		List<JyRawdataHandle1> newlist = new ArrayList<JyRawdataHandle1>();
		//取出list中整天缺失的班次信息
		for(int g = 0 ; g <alllist.size(); g+=3){
			if(g<alllist.size()-1){
				if(g%3 == 0){
					if(alllist.get(g).get时段氨产量()==0.0&&alllist.get(g+1).get时段氨产量()==0.0&&alllist.get(g+2).get时段氨产量()==0.0){
						newlist.add(alllist.get(g));
						newlist.add(alllist.get(g+1));
						newlist.add(alllist.get(g+2));
					}
				}
				
			}
		}
		alllist.removeAll(newlist);
		
		Collections.sort(alllist,new Comparator<JyRawdataHandle1>() {

			@Override
			public int compare(JyRawdataHandle1 o1, JyRawdataHandle1 o2) {
				if(o1.get时间().getTime() > o2.get时间().getTime()){
					return 1;
				}
				if(o1.get时间().getTime() == o2.get时间().getTime()){
					return 0;
				}
				
				return -1;
			}
		});
		
		return alllist;
	}
	@Override
	public List<JyRawdataHandle1> selectDataByMouthAndClass(String stime,
			String btime) throws Exception {
	
		//早班
		List<JyRawdataHandle1> list1 = jyRawdataHandle1CustomerMapper.selectDataByMouthAndClass(stime, btime); //00:10:00--08:00:00
		List<JyRawdataHandle1> list9 = new ArrayList<JyRawdataHandle1>();
		for(int i = 0; i<list1.size()-1;i++){
			JyRawdataHandle1 jyRawdataHandle1 = list1.get(i);
			JyRawdataHandle1 jyRawdataHandle2 = list1.get(i+1);
			
			Date jytime = jyRawdataHandle1.get时间();
			Date jytime2 = jyRawdataHandle2.get时间();
			long between=(jytime2.getTime()-jytime.getTime())/1000;//除以1000是为了转换成秒
			long day1=between/(24*3600);
			if(day1>1){
				//说明之间有缺失的早班，则添加
				for(int j = 1;j<day1;j++){
					//添加
					JyRawdataHandle1 jy = new JyRawdataHandle1();
					Calendar date1 = Calendar.getInstance();
					date1.setTime(jytime);
					date1.set(Calendar.DATE, date1.get(Calendar.DATE) +j);
					Date date2 = date1.getTime();
					jy.set时间(date2);
					jy.set时段氨产量(0.0);
					jy.set时段净蒸汽耗(0.0);
					jy.set时段气耗(0.0);
					jy.set累积氨产量(0.0);
					jy.setClassNumber(1);
					list9.add(jy);
				}
			}
		}
		list1.addAll(list9);
		//中班
		List<JyRawdataHandle1> list2 = jyRawdataHandle1CustomerMapper.selectDataByMouthAndClass1(stime, btime);// 08:10:00--16:00:00
		List<JyRawdataHandle1> list10 = new ArrayList<JyRawdataHandle1>();
		for(int i = 0; i<list2.size()-1;i++){
			JyRawdataHandle1 jyRawdataHandle1 = list2.get(i);
			JyRawdataHandle1 jyRawdataHandle2 = list2.get(i+1);
			
			Date jytime = jyRawdataHandle1.get时间();
			Date jytime2 = jyRawdataHandle2.get时间();
			long between=(jytime2.getTime()-jytime.getTime())/1000;//除以1000是为了转换成秒
			long day1=between/(24*3600);
			if(day1>1){
				//说明之间有缺失的早班，则添加
				for(int j = 1;j<day1;j++){
					//添加
					JyRawdataHandle1 jy = new JyRawdataHandle1();
					Calendar date1 = Calendar.getInstance();
					date1.setTime(jytime);
					date1.set(Calendar.DATE, date1.get(Calendar.DATE) +j);
					Date date2 = date1.getTime();
					jy.set时间(date2);
					jy.set时段氨产量(0.0);
					jy.set时段净蒸汽耗(0.0);
					jy.set时段气耗(0.0);
					jy.set累积氨产量(0.0);
					jy.setClassNumber(2);
					list10.add(jy);
				}
			}
		}
		list2.addAll(list10);
		//晚班
		List<JyRawdataHandle1> list4 = jyRawdataHandle1CustomerMapper.selectDataByMouthAndClass2(stime, btime);//18:10:00--23:29:29
		List<JyRawdataHandle1> list11 = new ArrayList<JyRawdataHandle1>();
		for(int i = 0; i<list4.size()-1;i++){
			JyRawdataHandle1 jyRawdataHandle1 = list4.get(i);
			JyRawdataHandle1 jyRawdataHandle2 = list4.get(i+1);
			
			Date jytime = jyRawdataHandle1.get时间();
			Date jytime2 = jyRawdataHandle2.get时间();
			long between=(jytime2.getTime()-jytime.getTime())/1000;//除以1000是为了转换成秒
			long day1=between/(24*3600);
			if(day1>1){
				//说明之间有缺失的早班，则添加
				for(int j = 1;j<day1;j++){
					//添加
					JyRawdataHandle1 jy = new JyRawdataHandle1();
					Calendar date1 = Calendar.getInstance();
					date1.setTime(jytime);
					date1.set(Calendar.DATE, date1.get(Calendar.DATE) +j);
					Date date2 = date1.getTime();
					jy.set时间(date2);
					jy.set时段氨产量(0.0);
					jy.set时段净蒸汽耗(0.0);
					jy.set时段气耗(0.0);
					jy.set累积氨产量(0.0);
					jy.setClassNumber(3);
					list11.add(jy);
				}
			}
		}
		list4.addAll(list11);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date newdate = sdf.parse(btime);
		Calendar c = Calendar.getInstance(); 
		c.setTime(newdate);  
		c.set(Calendar.DATE, c.get(Calendar.DATE) + 1);
        Date data2 = c.getTime();
        String dayBefore = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(data2);
        //晚班
		List<JyRawdataHandle1>list3 = jyRawdataHandle1CustomerMapper.selectDataByContidionAndClass3(stime, dayBefore);
		
		List<JyRawdataHandle1>list5 = new ArrayList<JyRawdataHandle1>();
		List<JyRawdataHandle1>list6 = new ArrayList<JyRawdataHandle1>();
		List<JyRawdataHandle1>list7 = new ArrayList<JyRawdataHandle1>();
		if(list3.size()>0){
		for(int i = 0; i <list3.size(); i++){
			
			JyRawdataHandle1 jy = list3.get(i);
			Date date = jy.get时间();
			Calendar date1 = Calendar.getInstance();
			date1.setTime(date);
			date1.set(Calendar.DATE, date1.get(Calendar.DATE) - 1);
			Date date2 = date1.getTime();
			jy.set时间(date2);
			list5.add(jy);
		}
		List<JyRawdataHandle1> list12 = new ArrayList<JyRawdataHandle1>();
		for(int i = 0; i<list5.size()-1;i++){
			JyRawdataHandle1 jyRawdataHandle1 = list5.get(i);
			JyRawdataHandle1 jyRawdataHandle2 = list5.get(i+1);
			
			Date jytime = jyRawdataHandle1.get时间();
			Date jytime2 = jyRawdataHandle2.get时间();
			long between=(jytime2.getTime()-jytime.getTime())/1000;//除以1000是为了转换成秒
			long day1=between/(24*3600);
			if(day1>1){
				//说明之间有缺失的早班，则添加
				for(int j = 1;j<day1;j++){
					//添加
					JyRawdataHandle1 jy = new JyRawdataHandle1();
					Calendar date1 = Calendar.getInstance();
					date1.setTime(jytime);
					date1.set(Calendar.DATE, date1.get(Calendar.DATE) +j);
					Date date2 = date1.getTime();
					jy.set时间(date2);
					jy.set时段氨产量(0.0);
					jy.set时段净蒸汽耗(0.0);
					jy.set时段气耗(0.0);
					jy.set累积氨产量(0.0);
					jy.setClassNumber(3);
					list12.add(jy);
				}
			}
		}
		list5.addAll(list12);
		//将两个集合相同就相加list5(输入的时间一天的所有的0点)和list2
		for(JyRawdataHandle1 l1:list5){
			for(JyRawdataHandle1 l2:list4){
				if(l1.get时间().getTime()==l2.get时间().getTime()){
					JyRawdataHandle1 jyRawdataHandle1 = new JyRawdataHandle1();
					jyRawdataHandle1.set时间(l2.get时间());
					jyRawdataHandle1.set时段氨产量(l1.get时段氨产量()+l2.get时段氨产量());
					jyRawdataHandle1.set时段净蒸汽耗(l1.get时段净蒸汽耗()+l2.get时段净蒸汽耗());
					jyRawdataHandle1.set时段气耗(l1.get时段气耗()+l2.get时段气耗());
					jyRawdataHandle1.set累积氨产量(l1.get累积氨产量()+l2.get累积氨产量());
					jyRawdataHandle1.setClassNumber(l1.getClassNumber());
					list6.add(jyRawdataHandle1);
					break;
				}
			}
		}
		

		
		
		list1.addAll(list2);
		list1.addAll(list6);
		}else{
			list1.addAll(list2);
			list1.addAll(list4);
			
		}
		JyRawdataHandle1 jyRawdataHandle1 = new JyRawdataHandle1();
		Collections.sort(list1,new Comparator<JyRawdataHandle1>() {

			@Override
			public int compare(JyRawdataHandle1 o1, JyRawdataHandle1 o2) {
				if(o1.get时间().getTime() > o2.get时间().getTime()){
					return 1;
				}
				if(o1.get时间().getTime() == o2.get时间().getTime()){
					return 0;
				}
				
				return -1;
			}
		});
		List<JyRawdataHandle1> alllist = new ArrayList<JyRawdataHandle1>();
		if(alllist.size()>0){
			Integer m = list1.get(0).getClassNumber();
			if(m !=1){
				//首条记录缺少早班
				Date date = list1.get(0).get时间();
				jyRawdataHandle1.set时间(date);
				jyRawdataHandle1.setClassNumber(1);
				jyRawdataHandle1.set时段氨产量(0.0);
				jyRawdataHandle1.set时段净蒸汽耗(0.0);
				jyRawdataHandle1.set时段气耗(0.0);
				jyRawdataHandle1.set累积氨产量(0.0);
				alllist.add(jyRawdataHandle1);
				
			}
		}
		
		alllist.addAll(list1);
		Collections.sort(alllist,new Comparator<JyRawdataHandle1>() {

			@Override
			public int compare(JyRawdataHandle1 o1, JyRawdataHandle1 o2) {
				if(o1.get时间().getTime() > o2.get时间().getTime()){
					return 1;
				}
				if(o1.get时间().getTime() == o2.get时间().getTime()){
					return 0;
				}
				
				return -1;
			}
		});
		
		
		return alllist;
		
		
		
	}
	//得到用户输入的时间区域中有哪些月份
	 private static List<String> getMonthBetween(String minDate, String maxDate) throws Exception {
		    ArrayList<String> result = new ArrayList<String>();
		      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");//格式化为年月
		  
		      Calendar min = Calendar.getInstance();
		      Calendar max = Calendar.getInstance();
		  
		      min.setTime(sdf.parse(minDate));
		      min.set(min.get(Calendar.YEAR), min.get(Calendar.MONTH), 1);
		
		     max.setTime(sdf.parse(maxDate));
		     max.set(max.get(Calendar.YEAR), max.get(Calendar.MONTH), 2);
		 
		     Calendar curr = min;
	     while (curr.before(max)) {
		      result.add(sdf.format(curr.getTime()));
		      curr.add(Calendar.MONTH, 1);
		     }
		 
		     return result;
		   }

	@Override
	public JyRawdataHandle1 getLastTime() throws Exception {
		return jyRawdataHandle1CustomerMapper.getLastTime();
	}

}
