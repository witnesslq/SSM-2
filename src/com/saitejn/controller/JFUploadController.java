package com.saitejn.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.saitejn.pojo.FileUpInfo;
import com.saitejn.pojo.JbUserifo;
import com.saitejn.pojo.JfRawdataHandle1;
import com.saitejn.pojo.JfUploadMiddle;
import com.saitejn.services.JF_UploadServices;

@Controller
public class JFUploadController {
	@Autowired
	private JF_UploadServices jf_UploadServices;
	/*去文件的上传页面*/
	@RequestMapping("/jf_toUpload")
	public String jf_toUpload(Model model,HttpSession session)throws Exception{
		JfRawdataHandle1 jfRawdataHandle1 = jf_UploadServices.getLastTime_jf();
		if(jfRawdataHandle1 != null){
			Date time =  jfRawdataHandle1.getData_time();
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
			String db_endtime = sdf.format(time);
			session.setAttribute("db_endtime", db_endtime);
		}
		return "jf/jf_toUpload";
	}
	/*文件上传完成后*/
	@RequestMapping("jf_toUploadType")
	public String jf_toUploadType(Model model)throws Exception{
		JfRawdataHandle1 jfRawdataHandle1 = jf_UploadServices.getLastTime_jf();
		if(jfRawdataHandle1 != null){
			Date time =  jfRawdataHandle1.getData_time();
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
			String db_newendtime = sdf.format(time);
			model.addAttribute("db_newendtime",db_newendtime);
		}
		return "jf/jf_toUploadType";
	}
	//处理文件上传
	@RequestMapping("/jf_doUploadFile")
	public void jf_doUploadFile(@RequestParam("jf_file") MultipartFile[] file,Model model,HttpSession session)throws Exception{
		if(file != null){
			String file_path = "E:\\myeclipse10\\upload\\temp\\file\\jf\\jfys\\";
			for(int i = 0; i<file.length;i++){
				String OriginalFilename = file[i].getOriginalFilename();
				String preff = OriginalFilename.substring(0,OriginalFilename.lastIndexOf("."));
				String newFileName =preff+UUID.randomUUID()+OriginalFilename.substring(OriginalFilename.lastIndexOf("."));
				File newFile = new File(file_path+newFileName);
				file[i].transferTo(newFile);
				String filePath_ys = newFile.toString();	
				String file_path_bz = "E:\\myeclipse10\\upload\\temp\\file\\jf\\";
				String bzFileName = preff+UUID.randomUUID()+".xls";
				File bzfile = new File(file_path_bz+bzFileName);
				jf_UploadServices.saveCopyAs(filePath_ys, bzfile.toString());
				Date nowtime  = new Date();
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String uptime =   format.format(nowtime);
				JbUserifo user = (JbUserifo) session.getAttribute("user");
				String upperson = user.getUtruename();
				String upname = OriginalFilename;
				String fileename = newFileName;
				String filtype = "未处理";
				FileUpInfo fileupifo = new FileUpInfo();
				fileupifo.setFileename(fileename);
				fileupifo.setFiltype(filtype);
				fileupifo.setUpname(upname);
				fileupifo.setUpperson(upperson);
				fileupifo.setUptime(uptime);
				//dataServices.saveUpFileIfo(fileupifo);
				String filePath = bzfile.toString();
				 List<JfUploadMiddle> datalist =  jf_UploadServices.readExcel_jf(filePath);
				 for(JfUploadMiddle jb : datalist){
					 JfUploadMiddle jbExcelMiddle = jb;
					 jf_UploadServices.insertDataToMiddle_jf(jbExcelMiddle);
					 jf_UploadServices.insertDataToExcel_jf(jbExcelMiddle);
				 }
				 
			}
		}
		jf_UploadServices.insertDataToHand1_jf();
		jf_UploadServices.insertDataToHand2_jf();
		jf_UploadServices.deleterawdataMiddle_jf();
		jf_UploadServices.deleteUploadMiddle_jf();
		
	}
	//能耗统计
	/*初始状态加载表数据的日报表中表的数据*/
	@RequestMapping("/jf_loadDayData")
	public String jf_loadDayData(String date_begin,String date_end,Model model,@RequestParam(value="message", defaultValue="1") String message )throws Exception{
		if(date_begin == null && date_end == null ){
			JfRawdataHandle1 jfRawdataHandle1 = jf_UploadServices.getLastTime_jf();
			if(jfRawdataHandle1 != null){
				Date time =  jfRawdataHandle1.getData_time();
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
				String db_endtime = sdf.format(time);
				String year_mouth = db_endtime.substring(0,7);
				String n_begin_time = year_mouth+"-01 00:00:00";
				String n_end_time = db_endtime;
				List<JfRawdataHandle1> dayList = jf_UploadServices.selectDataForDayByContidion_jf(n_begin_time, n_end_time);
				if(dayList.size()>0){
					model.addAttribute("jfdayList", dayList);
					//按班查看
					List<JfRawdataHandle1> monList = jf_UploadServices.selectDataForClass_jf(n_begin_time, n_end_time);
					model.addAttribute("monList", monList);
					model.addAttribute("edate_begin", n_begin_time.substring(0, 10));
					model.addAttribute("edate_end", n_end_time.substring(0, 10));
				}
			}
		
		}
		return "jf/jf_loadDayData";
	}
	/*初始状态加载表数据的月报表中表的数据*/
	@RequestMapping("/jf_loadMouthData")
	public String jf_loadMouthData(String mouth_date_begin,Model model)throws Exception{
		if(mouth_date_begin == null){
			JfRawdataHandle1 jfRawdataHandle1 = jf_UploadServices.getLastTime_jf();
			if(jfRawdataHandle1 != null){
				Date time =  jfRawdataHandle1.getData_time();
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
				String db_endtime = sdf.format(time);
				String year_mouth = db_endtime.substring(0,7);
				String n_begin_time = year_mouth+"-01 00:00:00";
				String n_end_time = db_endtime;
				List<JfRawdataHandle1> mouthList = jf_UploadServices.selectDataForMouthByContidion_jf(n_begin_time, n_end_time);
				model.addAttribute("mouthList", mouthList);
				//用户输入查询条件为空
				List<JfRawdataHandle1> mouthClassList = jf_UploadServices.selectDataForClass_jf(n_begin_time, n_end_time);
				model.addAttribute("mouthClassList", mouthClassList);
				model.addAttribute("edate_begin", n_begin_time.substring(0, 7));
			}
		}
		return "jf/jf_loadMouthData";
	}
	/*初始状态加载表数据的季度报表中表的数据*/
	@RequestMapping("/jf_loadQuarterData")
	public String jf_loadQuarterData(String Quarter_year,String Quarter,Model model)throws Exception{
		if((Quarter_year==null)||(Quarter == null)){
			JfRawdataHandle1 jbRawdataHandle1 = jf_UploadServices.getLastTime_jf();
			if(jbRawdataHandle1 != null){
				Date time =  jbRawdataHandle1.getData_time();
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
				String db_endtime = sdf.format(time);
				String year_mouth = db_endtime.substring(5,7);
				Integer quarter_u = Integer.parseInt(year_mouth);
				if(1 <= quarter_u && quarter_u <= 3 ){
					String new_end_QueryTime = db_endtime;
					String end_QueryTime = db_endtime.substring(0, 4);
					String new_begin_query_time = end_QueryTime+"-01-01 00:00:00";
					
					List<JfRawdataHandle1> quaryList = jf_UploadServices.selectDataForQuarterByContidion_jf(new_begin_query_time, new_end_QueryTime);
					model.addAttribute("quaryList", quaryList);
					model.addAttribute("quarter_text", "第一季度");
					model.addAttribute("year_text", end_QueryTime);
				}
				if(4 <= quarter_u && quarter_u <= 6 ){
					String new_end_QueryTime = db_endtime;
					String end_QueryTime = db_endtime.substring(0, 4);
					String new_begin_query_time = end_QueryTime+"-04-01 00:00:00";
					List<JfRawdataHandle1> quaryList = jf_UploadServices.selectDataForQuarterByContidion_jf(new_begin_query_time, new_end_QueryTime);
					model.addAttribute("quaryList", quaryList);
					model.addAttribute("quarter_text", "第二季度");
					model.addAttribute("year_text", end_QueryTime);
				}
				if(7 <= quarter_u && quarter_u <= 9 ){
					String new_end_QueryTime = db_endtime;
					String end_QueryTime = db_endtime.substring(0, 4);
					String new_begin_query_time = end_QueryTime+"-07-01 00:00:00";
					List<JfRawdataHandle1> quaryList = jf_UploadServices.selectDataForQuarterByContidion_jf(new_begin_query_time, new_end_QueryTime);
					model.addAttribute("quaryList", quaryList);
					model.addAttribute("quarter_text", "第三季度");
					model.addAttribute("year_text", end_QueryTime);
				}
				if(10 <= quarter_u && quarter_u <= 12 ){
					String new_end_QueryTime = db_endtime;
					String end_QueryTime = db_endtime.substring(0, 4);
					String new_begin_query_time = end_QueryTime+"-10-01 00:00:00";
					List<JfRawdataHandle1> quaryList = jf_UploadServices.selectDataForQuarterByContidion_jf(new_begin_query_time, new_end_QueryTime);
					model.addAttribute("quaryList", quaryList);
					model.addAttribute("quarter_text", "第四季度");
					model.addAttribute("year_text", end_QueryTime);
				}
			}
		}
		return "jf/jf_loadQuarterData";
	}
	/*初始状态加载表数据的年报表中表的数据*/
	@RequestMapping("/jf_loadYearData")
	public String jf_loadYearData(String Year_data_begin,Model model)throws Exception{
		if(Year_data_begin == null){
			JfRawdataHandle1 jbRawdataHandle1 = jf_UploadServices.getLastTime_jf();
			if(jbRawdataHandle1 != null){
				Date time =  jbRawdataHandle1.getData_time();
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
				String db_endtime = sdf.format(time);
				String year_mouth = db_endtime.substring(0,4);
				String begin_time = year_mouth+"-01-01 00:00:00";
				String end_time = year_mouth+"-12-31 23:59:59";
				List<JfRawdataHandle1> yearList = jf_UploadServices.selectDataForQuarterByContidion_jf(begin_time, end_time);
				model.addAttribute("yearList", yearList);
				model.addAttribute("year_db", year_mouth);
			}
		}
		return "jf/jf_loadYearData";
	}
	//AJAX处理能耗监测
	/*选择时间加载数据和图加载数据的日报表按日查看*/
	@RequestMapping("/jf_loadDayDataForDayByAjax")
	public void jf_loadDayDataForDayByAjax(String isdate,HttpServletResponse response,String date_begin,String date_end,Model model,@RequestParam(value="message", defaultValue="1") String message )throws Exception{
		if(date_begin != null && date_end != null ){
		String edate_begin = date_begin+" 00:00:00";
		String edate_end = date_end+" 23:59:59";
		List<JfRawdataHandle1> dayList = jf_UploadServices.selectDataForDayByContidion_jf(edate_begin, edate_end);
		model.addAttribute("dayList", dayList);
		ObjectMapper mapper =  new ObjectMapper();
		String jsonstr = mapper.writeValueAsString(dayList);
		response.setContentType("text/javascript");
		response.getWriter().print(jsonstr);
		}else if(isdate.equals("1")){
			JfRawdataHandle1 jfRawdataHandle1 = jf_UploadServices.getLastTime_jf();
			if(jfRawdataHandle1 != null){
				Date time =  jfRawdataHandle1.getData_time();
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
				String db_endtime = sdf.format(time);
				String year_mouth = db_endtime.substring(0,7);
				String n_begin_time = year_mouth+"-01 00:00:00";
				String n_end_time = db_endtime;
				List<JfRawdataHandle1> dayList = jf_UploadServices.selectDataForDayByContidion_jf(n_begin_time, n_end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(dayList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
		}
	}
	/*选择时间加载数据和图加载数据的日报表按班查看*/
	@RequestMapping("/jf_loadDayDataForClassByAjax")
	public void jf_loadDayDataForClassByAjax(String isdate,HttpServletResponse response,String date_begin,String date_end,Model model,@RequestParam(value="message", defaultValue="1") String message )throws Exception{
		//拼接字符串
		if(date_begin != null && date_end != null ){
		String edate_begin = date_begin+" 00:00:00";
		String edate_end = date_end+" 23:59:59";
		//按班查看
		List<JfRawdataHandle1> monList = jf_UploadServices.selectDataForClass_jf(edate_begin, edate_end);
		model.addAttribute("monList", monList);
		model.addAttribute("edate_begin", date_begin);
		model.addAttribute("edate_end", date_end);
		ObjectMapper mapper =  new ObjectMapper();
		String jsonstr = mapper.writeValueAsString(monList);
		response.setContentType("text/javascript");
		response.getWriter().print(jsonstr);
		}else if(isdate.equals("1")){
			JfRawdataHandle1 jfRawdataHandle1 = jf_UploadServices.getLastTime_jf();
			if(jfRawdataHandle1 != null){
				Date time =  jfRawdataHandle1.getData_time();
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
				String db_endtime = sdf.format(time);
				String year_mouth = db_endtime.substring(0,7);
				String n_begin_time = year_mouth+"-01 00:00:00";
				String n_end_time = db_endtime;
				List<JfRawdataHandle1> monList = jf_UploadServices.selectDataForClass_jf(n_begin_time, n_end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(monList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);	
				
			}

		}
		
	}
	/*选择时间加载数据和图加载数据的月报表按日查看*/
	@RequestMapping("/jf_loadMouthDataForClassByAjax")
	public void jf_loadMouthDataForClassByAjax(String isdate,HttpServletResponse response,String mouth_date_begin,Model model)throws Exception{
		if(mouth_date_begin != null){
		String year = mouth_date_begin.substring(0,4);
		String mouth = mouth_date_begin.substring(5, 7);
		int years = Integer.parseInt(year);
		int mouths = Integer.parseInt(mouth);
		//判断年是否为闰年
		if(years % 4 == 0 && years % 100 != 0 || years % 400 == 0){
			//如果为瑞年，判断用户输入的月是否为二月，29天
			if(mouths==2){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-29 23:59:59";
				List<JfRawdataHandle1> mouthClassList = jf_UploadServices.selectDataForClass_jf(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
			if(mouths == 1||mouths == 3||mouths == 5 || mouths == 7 || mouths == 8 || mouths == 10 || mouths == 12){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-31 23:59:59";
				List<JfRawdataHandle1> mouthClassList = jf_UploadServices.selectDataForClass_jf(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
			if(mouths == 4||mouths == 6|| mouths == 9|| mouths == 11){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-30 23:59:59";
				
				List<JfRawdataHandle1> mouthClassList = jf_UploadServices.selectDataForClass_jf(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
	       
		}else{
			//如果不为瑞年，判断用户输入的月是否为二月，28天
			if(mouths==2){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-28 23:59:59";
				List<JfRawdataHandle1> mouthClassList = jf_UploadServices.selectDataForClass_jf(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
			if(mouths == 1||mouths == 3||mouths == 5 || mouths == 7 || mouths == 8 || mouths == 10 || mouths == 12){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-31 23:59:59";
				
				List<JfRawdataHandle1> mouthClassList = jf_UploadServices.selectDataForClass_jf(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
			if(mouths == 4||mouths == 6|| mouths == 9|| mouths == 11){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-30 23:59:59";
				List<JfRawdataHandle1> mouthClassList = jf_UploadServices.selectDataForClass_jf(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
				
			}
		}
		}else if(isdate.equals("1")){
			JfRawdataHandle1 jfRawdataHandle1 = jf_UploadServices.getLastTime_jf();
			if(jfRawdataHandle1 != null){
				Date time =  jfRawdataHandle1.getData_time();
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
				String db_endtime = sdf.format(time);
				String year_mouth = db_endtime.substring(0,7);
				String n_begin_time = year_mouth+"-01 00:00:00";
				String n_end_time = db_endtime;
				List<JfRawdataHandle1> mouthClassList = jf_UploadServices.selectDataForClass_jf(n_begin_time, n_end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
				
			}
		}
	
	}
	/*选择时间加载数据和图加载数据的月报表按班查看*/
	@RequestMapping("/jf_loadMouthDataForDayByAjax")
	public void jf_loadMouthDataForDayByAjax(String isdate,HttpServletResponse response,String mouth_date_begin,Model model)throws Exception{
		if(mouth_date_begin != null){
		String year = mouth_date_begin.substring(0,4);
		String mouth = mouth_date_begin.substring(5, 7);
		int years = Integer.parseInt(year);
		int mouths = Integer.parseInt(mouth);
		//判断年是否为闰年
		if(years % 4 == 0 && years % 100 != 0 || years % 400 == 0){
			//如果为瑞年，判断用户输入的月是否为二月，29天
			if(mouths==2){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-29 23:59:59";
				List<JfRawdataHandle1> mouthList = jf_UploadServices.selectDataForMouthByContidion_jf(begin_time, end_time);
				
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
			if(mouths == 1||mouths == 3||mouths == 5 || mouths == 7 || mouths == 8 || mouths == 10 || mouths == 12){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-31 23:59:59";
				List<JfRawdataHandle1> mouthList = jf_UploadServices.selectDataForMouthByContidion_jf(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
				
			}
			if(mouths == 4||mouths == 6|| mouths == 9|| mouths == 11){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-30 23:59:59";
				List<JfRawdataHandle1> mouthList = jf_UploadServices.selectDataForMouthByContidion_jf(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
	       
		}else{
			//如果不为瑞年，判断用户输入的月是否为二月，28天
			if(mouths==2){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-28 23:59:59";
				List<JfRawdataHandle1> mouthList = jf_UploadServices.selectDataForMouthByContidion_jf(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
			if(mouths == 1||mouths == 3||mouths == 5 || mouths == 7 || mouths == 8 || mouths == 10 || mouths == 12){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-31 23:59:59";
				List<JfRawdataHandle1> mouthList = jf_UploadServices.selectDataForMouthByContidion_jf(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
				
			}
			if(mouths == 4||mouths == 6|| mouths == 9|| mouths == 11){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-30 23:59:59";
				List<JfRawdataHandle1> mouthList = jf_UploadServices.selectDataForMouthByContidion_jf(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
		}
		}else if(isdate.equals("1")){
			JfRawdataHandle1 jfRawdataHandle1 = jf_UploadServices.getLastTime_jf();
			if(jfRawdataHandle1 != null){
				Date time =  jfRawdataHandle1.getData_time();
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
				String db_endtime = sdf.format(time);
				String year_mouth = db_endtime.substring(0,7);
				String n_begin_time = year_mouth+"-01 00:00:00";
				String n_end_time = db_endtime;
				
				List<JfRawdataHandle1> mouthList = jf_UploadServices.selectDataForMouthByContidion_jf(n_begin_time, n_end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
			
		}
	}
	/*选择时间加载数据和图加载数据的季度报表按月查看*/
	@RequestMapping("/jf_loadQuarterDataForMouthByAjax")
	public void jf_loadQuarterDataForMouthByAjax(String isdate,HttpServletResponse response,String Quarter_year,String Quarter,Model model)throws Exception{
		if((Quarter_year!=null)&&(Quarter != null)){
		if(Quarter.equals("第一季度")){
			String begin_QueryTime = Quarter_year+"-01-01 00:00:00";
			String end_QueryTime = Quarter_year+"-03-31 23:59:59";
			List<JfRawdataHandle1> quaryList = jf_UploadServices.selectDataForQuarterByContidion_jf(begin_QueryTime, end_QueryTime);
			ObjectMapper mapper =  new ObjectMapper();
			String jsonstr = mapper.writeValueAsString(quaryList);
			response.setContentType("text/javascript");
			response.getWriter().print(jsonstr);
		}
		if(Quarter.equals("第二季度")){
			//查询的时间区间为Quarter_year-01-01 00:00:00至Quarter_year-03-31 23:59:59
		
			String begin_QueryTime = Quarter_year+"-04-01 00:00:00";
			String end_QueryTime = Quarter_year+"-06-30 23:59:59";
			List<JfRawdataHandle1> quaryList = jf_UploadServices.selectDataForQuarterByContidion_jf(begin_QueryTime, end_QueryTime);
			ObjectMapper mapper =  new ObjectMapper();
			String jsonstr = mapper.writeValueAsString(quaryList);
			response.setContentType("text/javascript");
			response.getWriter().print(jsonstr);
		}
		if(Quarter.equals("第三季度")){
			//查询的时间区间为Quarter_year-01-01 00:00:00至Quarter_year-03-31 23:59:59
			
			String begin_QueryTime = Quarter_year+"-07-01 00:00:00";
			String end_QueryTime = Quarter_year+"-09-30 23:59:59";
			List<JfRawdataHandle1> quaryList = jf_UploadServices.selectDataForQuarterByContidion_jf(begin_QueryTime, end_QueryTime);
			ObjectMapper mapper =  new ObjectMapper();
			String jsonstr = mapper.writeValueAsString(quaryList);
			response.setContentType("text/javascript");
			response.getWriter().print(jsonstr);
		}
		if(Quarter.equals("第四季度")){
			//查询的时间区间为Quarter_year-01-01 00:00:00至Quarter_year-03-31 23:59:59
			
			String begin_QueryTime = Quarter_year+"-10-01 00:00:00";
			String end_QueryTime = Quarter_year+"-12-31 23:59:59";
			List<JfRawdataHandle1> quaryList = jf_UploadServices.selectDataForQuarterByContidion_jf(begin_QueryTime, end_QueryTime);
			ObjectMapper mapper =  new ObjectMapper();
			String jsonstr = mapper.writeValueAsString(quaryList);
			response.setContentType("text/javascript");
			response.getWriter().print(jsonstr);
		}
		}else if(isdate.equals("1")){
			JfRawdataHandle1 jbRawdataHandle1 = jf_UploadServices.getLastTime_jf();
			if(jbRawdataHandle1 != null){
				Date time =  jbRawdataHandle1.getData_time();
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
				String db_endtime = sdf.format(time);
				String year_mouth = db_endtime.substring(5,7);
				Integer quarter_u = Integer.parseInt(year_mouth);
				
				if(1 <= quarter_u && quarter_u <= 3 ){
					String new_end_QueryTime = db_endtime;
					String end_QueryTime = db_endtime.substring(0, 4);
					String new_begin_query_time = end_QueryTime+"-01-01 00:00:00";
					
					List<JfRawdataHandle1> quaryList = jf_UploadServices.selectDataForQuarterByContidion_jf(new_begin_query_time, new_end_QueryTime);
					ObjectMapper mapper =  new ObjectMapper();
					String jsonstr = mapper.writeValueAsString(quaryList);
					response.setContentType("text/javascript");
					response.getWriter().print(jsonstr);
				}
				if(4 <= quarter_u && quarter_u <= 6 ){
					String new_end_QueryTime = db_endtime;
					String end_QueryTime = db_endtime.substring(0, 4);
					String new_begin_query_time = end_QueryTime+"-04-01 00:00:00";
					
					List<JfRawdataHandle1> quaryList = jf_UploadServices.selectDataForQuarterByContidion_jf(new_begin_query_time, new_end_QueryTime);

					ObjectMapper mapper =  new ObjectMapper();
					String jsonstr = mapper.writeValueAsString(quaryList);
					response.setContentType("text/javascript");
					response.getWriter().print(jsonstr);
				}
				if(7 <= quarter_u && quarter_u <= 9 ){
					String new_end_QueryTime = db_endtime;
					String end_QueryTime = db_endtime.substring(0, 4);
					String new_begin_query_time = end_QueryTime+"-07-01 00:00:00";
					
					List<JfRawdataHandle1> quaryList = jf_UploadServices.selectDataForQuarterByContidion_jf(new_begin_query_time, new_end_QueryTime);

					ObjectMapper mapper =  new ObjectMapper();
					String jsonstr = mapper.writeValueAsString(quaryList);
					response.setContentType("text/javascript");
					response.getWriter().print(jsonstr);
				}
				if(10 <= quarter_u && quarter_u <= 12 ){
					String new_end_QueryTime = db_endtime;
					String end_QueryTime = db_endtime.substring(0, 4);
					String new_begin_query_time = end_QueryTime+"-10-01 00:00:00";
					
					List<JfRawdataHandle1> quaryList = jf_UploadServices.selectDataForQuarterByContidion_jf(new_begin_query_time, new_end_QueryTime);

					ObjectMapper mapper =  new ObjectMapper();
					String jsonstr = mapper.writeValueAsString(quaryList);
					response.setContentType("text/javascript");
					response.getWriter().print(jsonstr);
				}
			}
		}
		
	}
	/*选择时间加载数据和图加载数据的年度报表按月查看*/
	@RequestMapping("/jf_loadYearDataForMouthByAjax")
	public void jf_loadYearDataForMouthByAjax(String isdate,HttpServletResponse response,String Year_data_begin,Model model)throws Exception{
		
		if(Year_data_begin != null){
		String begin_time = Year_data_begin+"-01-01 00:00:00";
		String end_time = Year_data_begin+"-12-31 23:59:59";
		List<JfRawdataHandle1> yearList = jf_UploadServices.selectDataForQuarterByContidion_jf(begin_time, end_time);
		ObjectMapper mapper =  new ObjectMapper();
		String jsonstr = mapper.writeValueAsString(yearList);
		response.setContentType("text/javascript");
		response.getWriter().print(jsonstr);
		}else if(isdate.equals("1")){
			JfRawdataHandle1 jbRawdataHandle1 = jf_UploadServices.getLastTime_jf();
			if(jbRawdataHandle1 != null){
				Date time =  jbRawdataHandle1.getData_time();
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
				String db_endtime = sdf.format(time);
				String year_mouth = db_endtime.substring(0,4);
				String begin_time = year_mouth+"-01-01 00:00:00";
				String end_time = year_mouth+"-12-31 23:59:59";
				List<JfRawdataHandle1> yearList = jf_UploadServices.selectDataForQuarterByContidion_jf(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(yearList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
		}
		
	}
	/*根据用户id修改用户密码信息*/
    @RequestMapping("/jf_doUpdatePassword")
    public void jf_doUpdatePassword(String uloginPassword,HttpSession session, HttpServletResponse response)throws Exception{
		JbUserifo jbUserifo = new JbUserifo();
		JbUserifo sysuser = (JbUserifo) session.getAttribute("user");
		jbUserifo.setUid(sysuser.getUid());
		jbUserifo.setUloginpass(uloginPassword);
		jf_UploadServices.updatePassword_jf(jbUserifo);
		String jsonstr = "ok";
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(jsonstr);
    }
	/*前往个人资料页面*/
	@RequestMapping("/jf_toPersonalData")
	public String jf_toPersonalData()throws Exception{
		return "jf/jf_toPersonalData";
	}
	/*前往密码修改页面*/
	@RequestMapping("/jf_toPasswordData")
	public String jf_toPasswordData()throws Exception{
		return "jf/jf_toPasswordData";
	}
	/*修改个人资料时检验账户名是否存在*/	
	@RequestMapping("/jf_doCheckUsercode")
	public void jf_doCheckUsercode(HttpSession session,String userName,HttpServletRequest request, HttpServletResponse response)throws Exception{
		List<JbUserifo> userList = jf_UploadServices.selectAllUser_jf();
		List<String> usernameList = new ArrayList<String>();	
		for(JbUserifo username:userList){
			usernameList.add(username.getUloginname());
		}
		//获取系统的用户对象
		JbUserifo jbUserifo = (JbUserifo) session.getAttribute("user");
		String name = jbUserifo.getUloginname();
		usernameList.remove(name);
		String username = request.getParameter("userName");
		String result = null;
		if(usernameList.contains(username)){
			result = "用户名已存在";
		}else{
			result = "用户名可使用";
		}
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(result);
	}
	
	//月报表不统计数据显示散点图
	@RequestMapping("/selectMothNoCount")
	public void selectMothNoCount(String isdate,HttpServletResponse response,String mouth_date_begin,Model model)throws Exception{
		if(mouth_date_begin != null){
		String year = mouth_date_begin.substring(0,4);
		String mouth = mouth_date_begin.substring(5, 7);
		int years = Integer.parseInt(year);
		int mouths = Integer.parseInt(mouth);
		//判断年是否为闰年
		if(years % 4 == 0 && years % 100 != 0 || years % 400 == 0){
			//如果为瑞年，判断用户输入的月是否为二月，29天
			if(mouths==2){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-29 23:59:59";
				List<JfRawdataHandle1> mouthClassList = jf_UploadServices.selectclass_1(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
			if(mouths == 1||mouths == 3||mouths == 5 || mouths == 7 || mouths == 8 || mouths == 10 || mouths == 12){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-31 23:59:59";
				List<JfRawdataHandle1> mouthClassList = jf_UploadServices.selectclass_1(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
			if(mouths == 4||mouths == 6|| mouths == 9|| mouths == 11){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-30 23:59:59";
				
				List<JfRawdataHandle1> mouthClassList = jf_UploadServices.selectclass_1(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
	       
		}else{
			//如果不为瑞年，判断用户输入的月是否为二月，28天
			if(mouths==2){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-28 23:59:59";
				List<JfRawdataHandle1> mouthClassList = jf_UploadServices.selectclass_1(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
			if(mouths == 1||mouths == 3||mouths == 5 || mouths == 7 || mouths == 8 || mouths == 10 || mouths == 12){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-31 23:59:59";
				
				List<JfRawdataHandle1> mouthClassList = jf_UploadServices.selectclass_1(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
			if(mouths == 4||mouths == 6|| mouths == 9|| mouths == 11){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-30 23:59:59";
				List<JfRawdataHandle1> mouthClassList = jf_UploadServices.selectclass_1(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
				
			}
		}
		}else if(isdate.equals("1")){
			JfRawdataHandle1 jfRawdataHandle1 = jf_UploadServices.getLastTime_jf();
			if(jfRawdataHandle1 != null){
				Date time =  jfRawdataHandle1.getData_time();
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
				String db_endtime = sdf.format(time);
				String year_mouth = db_endtime.substring(0,7);
				String n_begin_time = year_mouth+"-01 00:00:00";
				String n_end_time = db_endtime;
			    System.out.println(n_begin_time+"========="+n_end_time);
				List<JfRawdataHandle1> mouthClassList = jf_UploadServices.selectclass_1(n_begin_time, n_end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
				
			}
		}
	
	}
	
	
	
			
}
