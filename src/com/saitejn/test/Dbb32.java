package com.saitejn.test;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import com.saitejn.pojo.JbClassinfor;

/**
 * 金杯三班两运转倒班表
 * @Dbb32
 * @Description
 * @author 罗康元
 * @company 成都赛特工信科技有限公司
 * @date 2017-6-27
 */
public class Dbb32 {
	private static String classinfo="121231312323";
	public static void main(String[] args) {
		classplay("2017-06-16", "2018-10-24");
	}
	
	public static  void classplay(String dateFirst, String dateSecond){
		 SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
	        //获取用户班次信息，并截取字符串
		  String mon = classinfo.substring(0,4);
		   String emon = mon.substring(0, 2);
		   System.out.println("======="+mon);
		   String aft = classinfo.substring(4, 8);
		   String eaft = aft.substring(0,2);
		   System.out.println("======="+aft);
		   String eve = classinfo.substring(8,12);
		   String eeve = eve.substring(0,2);
		   System.out.println("======="+eve);
	        try{
	            Date dateOne = dateFormat.parse(dateFirst);
	            Date dateTwo = dateFormat.parse(dateSecond);
	             
	            Calendar calendar = Calendar.getInstance();
	             
	            calendar.setTime(dateOne);
	            int i = 0;
	            String classinfos = "";
	            System.out.println("时间日期"+"                   白班"+"          夜班");
	            while(calendar.getTime().before(dateTwo)){               
	             
	               i++;
	              
	               if(i%6 ==5||i%6 ==0){
	            	   classinfo = eeve;
	   			}
	               if(i%6 ==1||i%6 ==2){
	   			 classinfo = emon;
	   			}
	   			if(i%6 ==3||i%6 ==4){
	   			 classinfo = eaft;
	   			}
	   	
	   			String eemon = classinfo.substring(0, 1);
	   			int cmon = Integer.parseInt(eemon);
	   			String eeaft = classinfo.substring(1, 2);
	   			int caft = Integer.parseInt(eeaft);
	   			
	   			
	   			System.out.println(dateFormat.format(calendar.getTime())+"        "+cmon+"             "+caft+"                   ");
	                JbClassinfor jbClassinfor = new JbClassinfor();
	                //将String装换为Date,
	                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	                Date date = sdf.parse(dateFormat.format(calendar.getTime()));
	                jbClassinfor.setClass_time(date);
	                jbClassinfor.setMorclass(cmon);
	                jbClassinfor.setAftclass(caft);
	               
	                //userServices.saveClassifo(jbClassinfor);
	                //保存班次记录
	                 
	                calendar.add(Calendar.DAY_OF_MONTH, 1);               
	            }
	        }
	        catch(Exception e){
	            e.printStackTrace();
	        }
	      
	}
}
