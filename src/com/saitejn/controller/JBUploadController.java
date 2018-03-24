package com.saitejn.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.saitejn.pojo.Adminguideifo;
import com.saitejn.pojo.FileUpInfo;
import com.saitejn.pojo.JbRawdataHandle1;
import com.saitejn.pojo.JbUploadMiddle;
import com.saitejn.pojo.JbUserifo;
import com.saitejn.pojo.Jb_csv;
import com.saitejn.pojo.Jb_feedback01;
import com.saitejn.pojo.Jb_feedback02;
import com.saitejn.pojo.Jb_feedback05;
import com.saitejn.pojo.Messageleaving;
import com.saitejn.services.JB_UploadServices;

@Controller
public class JBUploadController {
	
	@Autowired
	private JB_UploadServices jb_UploadServices;
	int number =0;
	@RequestMapping("/Upfile")
	public String Upfile(@RequestParam("file") MultipartFile file)throws Exception{
		return "success";
	}
	@RequestMapping("/toupload")
	public String toupload(HttpSession session)throws Exception{
		JbRawdataHandle1 jbRawdataHandle1 = jb_UploadServices.getLastTime();
		if(jbRawdataHandle1 != null){
			Date time =  jbRawdataHandle1.getData_time();
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
			String db_endtime = sdf.format(time);
			session.setAttribute("jbdb_endtime", db_endtime);
		}
		return "upload";
	}
	@RequestMapping("tojbuploadtype")
	public String tojbuploadtype(Model model)throws Exception{
		JbRawdataHandle1 jbRawdataHandle1 = jb_UploadServices.getLastTime();
		if(jbRawdataHandle1 != null){
			Date time =  jbRawdataHandle1.getData_time();
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
			String db_newendtime = sdf.format(time);
			model.addAttribute("jbdb_newendtime",db_newendtime);
		}
		return "uploadtype";
	}
	@RequestMapping("/fileUpload")
	public void TestUpload(@RequestParam("file") MultipartFile[] file,Model model,HttpSession session)throws Exception{
		for(int j = 0; j<file.length;j++){
			String OriginalFname = file[j].getOriginalFilename();
			if(OriginalFname.substring(OriginalFname.lastIndexOf(".")).equals(".csv")){
				String file_path = "E:\\myeclipse10\\upload\\temp\\file\\jb\\jbfb\\";
				String preff = OriginalFname.substring(0,OriginalFname.lastIndexOf("."));
				String newFileName =preff+UUID.randomUUID()+".xls";
				File newFile = new File(file_path+newFileName);
				file[j].transferTo(newFile);	
				String filePath = newFile.toString();	
				String file_path_bz = "E:\\myeclipse10\\upload\\temp\\file\\jb\\";
				String bzFileName = preff+UUID.randomUUID()+".xls";
				File bzfile = new File(file_path_bz+bzFileName);
				jb_UploadServices.saveCopyAs(filePath, bzfile.toString());
				 List<Jb_csv> datalist =  jb_UploadServices.readJbcsv(bzfile.toString());
			}else{
				String file_path = "E:\\myeclipse10\\upload\\temp\\file\\jb\\";
				String OriginalFilename = file[j].getOriginalFilename();
				String preff = OriginalFilename.substring(0,OriginalFilename.lastIndexOf("."));
				String newFileName =preff+UUID.randomUUID()+OriginalFilename.substring(OriginalFilename.lastIndexOf("."));
				File newFile = new File(file_path+newFileName);
				file[j].transferTo(newFile);
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
				jb_UploadServices.saveUpFileIfo(fileupifo);
				String filePath = newFile.toString();	
				 List<JbUploadMiddle> datalist =  jb_UploadServices.readJbXls(filePath);
				 for(JbUploadMiddle jb : datalist){
					 JbUploadMiddle jbExcelMiddle = jb;
					 jb_UploadServices.saveDatetomiddle(jbExcelMiddle);
				 }
			}
		}
	}
	@RequestMapping("/doJbdata_jb")
	public void doJbdata_jb(HttpServletResponse response)throws Exception{
		jb_UploadServices.inserttoExcel_jb();
		jb_UploadServices.saveDatetoHandl1();
		jb_UploadServices.saveDatetoHandl2();
		jb_UploadServices.deleterawdataMiddle();
		jb_UploadServices.deleteUploadMiddle();
	}
	@RequestMapping("/Ajaxtoupload")
	public String Ajaxtoupload()throws Exception{
		return "testAjaxUpload";
	}
	@RequestMapping("/doAjaxUpload")
	public String  doAjaxUpload(HttpServletRequest request, @RequestParam("file") MultipartFile file[], ModelMap model)throws Exception{
		if(file != null){
			String file_path = "E:\\myeclipse10\\upload\\temp\\file\\testAjax\\";
			for(int i = 0; i<file.length;i++){
				String OriginalFilename = file[i].getOriginalFilename();
				String newFileName = UUID.randomUUID()+OriginalFilename.substring(OriginalFilename.lastIndexOf("."));
				File newFile = new File(file_path+newFileName);
				file[i].transferTo(newFile);
				model.addAttribute("fileUrl", request.getContextPath() + "/upload/" + OriginalFilename);
			}
		}
        return "testAjaxUpload";
	}
	@RequestMapping("/tojbuploadtypeCSV.action")
	public String tojbuploadtypeCSV()throws Exception{
		return "uploadCSV";
	}
	@RequestMapping("/showMessageNumer")
	public void showMessage(Model model,HttpSession session, HttpServletResponse response)throws Exception{
		JbUserifo user = (JbUserifo) session.getAttribute("user");
		int number = jb_UploadServices.selectMessageNumber(user.getCompany());
		List<Messageleaving> list = jb_UploadServices.selectMessageCount(user.getCompany());
		String messcount ="。";
		for(Messageleaving messageleaving :list){
			String count = messageleaving.getMessage();
			messcount +=count+"。";
		}
		
		if(number != 0){
		
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(number);
		response.getWriter().print(messcount);
		
		}
	}
	@RequestMapping("/index")
	public String index(Model model,HttpSession session)throws Exception{
		JbUserifo user = (JbUserifo) session.getAttribute("user");
		if(user != null){
			int number = jb_UploadServices.selectMessageNumber(user.getCompany());
			if(number != 0 ){
				model.addAttribute("number", number);
			}
		}
		return "nindex";
	}
	@RequestMapping("/welcome")
	public String welcome()throws Exception{
		return "welcome";
	}
	@RequestMapping("/showguidehist")
	public String showguidehist(Model model,@RequestParam(value="page", defaultValue="1") Integer page)throws Exception{
		PageHelper.startPage(page, 15);
		List<Adminguideifo> adminguideifos = jb_UploadServices.getAllAdminGuideifo();
		model.addAttribute("adminguideifos", adminguideifos);
		model.addAttribute("page", page);
		PageInfo<Adminguideifo> pageInfo = new PageInfo<Adminguideifo>(adminguideifos);
		Long count = pageInfo.getTotal();
		model.addAttribute("count", count);
		int pages = pageInfo.getPages();
		model.addAttribute("pages", pages);
		return "history";
	}
	@RequestMapping("/upfilehisifo")
	public String upfilehisifo(Model model )throws Exception{
		List<FileUpInfo> filelist = jb_UploadServices.selectFileAll();
		model.addAttribute("filelist", filelist);
		return "upfilehisifo";
	}
	@RequestMapping("/to_show_day_data")
	public String selectDataForDay(HttpServletResponse response,String date_begin,String date_end,Model model,@RequestParam(value="message", defaultValue="1") String message )throws Exception{
		if(date_begin == null && date_end == null ){
			JbRawdataHandle1 jbRawdataHandle1 = jb_UploadServices.getLastTime();
			if(jbRawdataHandle1 != null){
				Date time =  jbRawdataHandle1.getData_time();
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
				String db_endtime = sdf.format(time);
				String year_mouth = db_endtime.substring(0,7);
				String n_begin_time = year_mouth+"-01 00:00:00";
				String n_end_time = db_endtime;
				List<JbRawdataHandle1> dayList = jb_UploadServices.selectDailyreport_jb(n_begin_time, n_end_time);
				double suntime_nh3_yield_day_1 = 0.0;
				double suntime_electric_consume_day_1 = 0.0;
				double suntime_raw_gas_consume_day_1 = 0.0;
				Integer sunorig_id_day_1 = 0;
				for(int j = 0;j < dayList.size();j++){
					JbRawdataHandle1 jbRawdata1 = dayList.get(j);
					suntime_nh3_yield_day_1+=jbRawdata1.getTime_nh3_yield();
					suntime_electric_consume_day_1+=jbRawdata1.getTime_electric_consume();
					suntime_raw_gas_consume_day_1+=jbRawdata1.getTime_raw_gas_consume();
					sunorig_id_day_1+=jbRawdata1.getOrig_id();
				}
				JbRawdataHandle1 sunday1 = new JbRawdataHandle1();
				sunday1.setTime_nh3_yield(suntime_nh3_yield_day_1);
				sunday1.setTime_electric_consume(suntime_electric_consume_day_1);
				sunday1.setTime_raw_gas_consume(suntime_raw_gas_consume_day_1);
				sunday1.setOrig_id(sunorig_id_day_1);
				dayList.add(sunday1);
				if(dayList.size()>0){
					model.addAttribute("dayList", dayList);
					List<JbRawdataHandle1> monList = jb_UploadServices.selectDailyreportForClass_jb(n_begin_time, n_end_time);
					double suntime_nh3_yield_1 = 0.0;
					double suntime_electric_consume_1 = 0.0;
					double suntime_raw_gas_consume_1 = 0.0;
					Integer sunorig_id_1 = 0;
					double suntime_nh3_yield_2 = 0.0;
					double suntime_electric_consume_2 = 0.0;
					double suntime_raw_gas_consume_2 = 0.0;
					Integer sunorig_id_2 = 0;
					double suntime_nh3_yield_3 = 0.0;
					double suntime_electric_consume_3 = 0.0;
					double suntime_raw_gas_consume_3 = 0.0;
					Integer  sunorig_id_3 = 0;
					for(int i = 0;i<monList.size();i++){
						JbRawdataHandle1 jbRawdata = monList.get(i);
						if(jbRawdata.getOrig_id()!=0){
						int ban = jbRawdata.getShift()/jbRawdata.getOrig_id();
						if(ban==1){
							suntime_nh3_yield_1+=jbRawdata.getTime_nh3_yield();
							suntime_electric_consume_1+=jbRawdata.getTime_electric_consume();
							suntime_raw_gas_consume_1+=jbRawdata.getTime_raw_gas_consume();
							sunorig_id_1+=jbRawdata.getOrig_id();
						}if(ban==2){
							suntime_nh3_yield_2+=jbRawdata.getTime_nh3_yield();
							suntime_electric_consume_2+=jbRawdata.getTime_electric_consume();
							suntime_raw_gas_consume_2+=jbRawdata.getTime_raw_gas_consume();
							sunorig_id_2+=jbRawdata.getOrig_id();
						}if(ban==3){
							suntime_nh3_yield_3+=jbRawdata.getTime_nh3_yield();
							suntime_electric_consume_3+=jbRawdata.getTime_electric_consume();
							suntime_raw_gas_consume_3+=jbRawdata.getTime_raw_gas_consume();
							sunorig_id_3+=jbRawdata.getOrig_id();
						}
						}
					}
					JbRawdataHandle1 sunclass1 = new JbRawdataHandle1();
					sunclass1.setTime_nh3_yield(suntime_nh3_yield_1);
					sunclass1.setTime_electric_consume(suntime_electric_consume_1);
					sunclass1.setTime_raw_gas_consume(suntime_raw_gas_consume_1);
					sunclass1.setOrig_id(sunorig_id_1);
					sunclass1.setClassNumber(11);
					monList.add(sunclass1);
					JbRawdataHandle1 sunclass2 = new JbRawdataHandle1();
					sunclass2.setTime_nh3_yield(suntime_nh3_yield_2);
					sunclass2.setTime_electric_consume(suntime_electric_consume_2);
					sunclass2.setTime_raw_gas_consume(suntime_raw_gas_consume_2);
					sunclass2.setOrig_id(sunorig_id_2);
					sunclass2.setClassNumber(12);
					monList.add(sunclass2);
					JbRawdataHandle1 sunclass3 = new JbRawdataHandle1();
					sunclass3.setTime_nh3_yield(suntime_nh3_yield_3);
					sunclass3.setTime_electric_consume(suntime_electric_consume_3);
					sunclass3.setTime_raw_gas_consume(suntime_raw_gas_consume_3);
					sunclass3.setOrig_id(sunorig_id_3);
					sunclass3.setClassNumber(13);
					monList.add(sunclass3);
					model.addAttribute("monList", monList);
					model.addAttribute("edate_begin", n_begin_time.substring(0, 10));
					model.addAttribute("edate_end", n_end_time.substring(0, 10));
				}
			}
		}
		return "chart_day";
	}
	//处理日报表,AJAX按日查看
	@RequestMapping("/to_show_day_day_ajax")
	public void selectDataForDayAjax(HttpServletResponse response,String date_begin,String date_end,Model model,@RequestParam(value="message", defaultValue="1") String message )throws Exception{
		if(date_begin != null && date_end != null ){
		String edate_begin = date_begin+" 00:00:00";
		String edate_end = date_end+" 23:59:59";
		List<JbRawdataHandle1> dayList = jb_UploadServices.selectDailyreport_jb(edate_begin, edate_end);
		if(dayList.size()>0){
		double suntime_nh3_yield_day_1 = 0.0;
		double suntime_electric_consume_day_1 = 0.0;
		double suntime_raw_gas_consume_day_1 = 0.0;
		Integer sunorig_id_day_1 = 0;
		for(int j = 0;j < dayList.size();j++){
			JbRawdataHandle1 jbRawdata1 = dayList.get(j);
			suntime_nh3_yield_day_1+=jbRawdata1.getTime_nh3_yield();
			suntime_electric_consume_day_1+=jbRawdata1.getTime_electric_consume();
			suntime_raw_gas_consume_day_1+=jbRawdata1.getTime_raw_gas_consume();
			sunorig_id_day_1+=jbRawdata1.getOrig_id();
		}
		JbRawdataHandle1 sunday1 = new JbRawdataHandle1();
		sunday1.setData_time(new Date());
		sunday1.setTime_nh3_yield(suntime_nh3_yield_day_1);
		sunday1.setTime_electric_consume(suntime_electric_consume_day_1);
		sunday1.setTime_raw_gas_consume(suntime_raw_gas_consume_day_1);
		sunday1.setOrig_id(sunorig_id_day_1);
		dayList.add(sunday1);
		}
		ObjectMapper mapper =  new ObjectMapper();
		String jsonstr = mapper.writeValueAsString(dayList);
		response.setContentType("text/javascript");
		response.getWriter().print(jsonstr);
		}
	}
	@RequestMapping("/to_show_day_day_ajax_Notime")
	public void selectDataForDayAjaxNotime(HttpServletResponse response,Model model,@RequestParam(value="message", defaultValue="1") String message )throws Exception{
		JbRawdataHandle1 jbRawdataHandle1 = jb_UploadServices.getLastTime();
		if(jbRawdataHandle1 != null){
			Date time =  jbRawdataHandle1.getData_time();
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
			String db_endtime = sdf.format(time);
			String year_mouth = db_endtime.substring(0,7);
			String n_begin_time = year_mouth+"-01 00:00:00";
			String n_end_time = db_endtime;
			List<JbRawdataHandle1> dayList = jb_UploadServices.selectDailyreport_jb(n_begin_time, n_end_time);
			if(dayList.size()>0){
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(dayList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
				List<JbRawdataHandle1> monList = jb_UploadServices.selectDailyreportForClass_jb(n_begin_time, n_end_time);
				model.addAttribute("monList", monList);
				model.addAttribute("edate_begin", n_begin_time.substring(0, 10));
				model.addAttribute("edate_end", n_end_time.substring(0, 10));
			}
		}
		
	}
	@RequestMapping("/to_show_day_class_ajax_Notime")
	public void selectDataForDayAjaxNotimeAndClass(HttpServletResponse response,Model model,@RequestParam(value="message", defaultValue="1") String message )throws Exception{
		JbRawdataHandle1 jbRawdataHandle1 = jb_UploadServices.getLastTime();
		if(jbRawdataHandle1 != null){
			Date time =  jbRawdataHandle1.getData_time();
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
			String db_endtime = sdf.format(time);
			String year_mouth = db_endtime.substring(0,7);
			String n_begin_time = year_mouth+"-01 00:00:00";
			String n_end_time = db_endtime;
			List<JbRawdataHandle1> monList = jb_UploadServices.selectDailyreportForClass_jb(n_begin_time, n_end_time);
			if(monList.size()>0){
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(monList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
		}
	}
	//AJAX日报表按班查看
	@RequestMapping("/to_show_day_data_ajax")
	public void selectDataForDayAJAX(HttpServletResponse response,String date_begin,String date_end,Model model,@RequestParam(value="message", defaultValue="1") String message )throws Exception{
		if(date_begin != null && date_end != null ){
		String edate_begin = date_begin+" 00:00:00";
		String edate_end = date_end+" 23:59:59";
		List<JbRawdataHandle1> monList = jb_UploadServices.selectDailyreportForClass_jb(edate_begin, edate_end);
		model.addAttribute("monList", monList);
		model.addAttribute("edate_begin", date_begin);
		model.addAttribute("edate_end", date_end);
		ObjectMapper mapper =  new ObjectMapper();
		String jsonstr = mapper.writeValueAsString(monList);
		response.setContentType("text/javascript");
		response.getWriter().print(jsonstr);
		}
	}
	@RequestMapping("/to_show_month_class_ajax")
	public void selectDataByMouthAjax(HttpServletResponse response,String mouth_date_begin,Model model)throws Exception{
		if(mouth_date_begin != null){
		String year = mouth_date_begin.substring(0,4);
		String mouth = mouth_date_begin.substring(5, 7);
		int years = Integer.parseInt(year);
		int mouths = Integer.parseInt(mouth);
		System.out.println(year+mouth);
		if(years % 4 == 0 && years % 100 != 0 || years % 400 == 0){
			//如果为瑞年，判断用户输入的月是否为二月，29天
			if(mouths==2){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-29 23:59:59";
				List<JbRawdataHandle1> mouthClassList = jb_UploadServices.selectDailyreportForClass_jb(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
			if(mouths == 1||mouths == 3||mouths == 5 || mouths == 7 || mouths == 8 || mouths == 10 || mouths == 12){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-31 23:59:59";
				List<JbRawdataHandle1> mouthClassList = jb_UploadServices.selectDailyreportForClass_jb(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
			if(mouths == 4||mouths == 6|| mouths == 9|| mouths == 11){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-30 23:59:59";
				List<JbRawdataHandle1> mouthClassList = jb_UploadServices.selectDailyreportForClass_jb(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
		}else{
			if(mouths==2){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-28 23:59:59";
				List<JbRawdataHandle1> mouthClassList = jb_UploadServices.selectDailyreportForClass_jb(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
			if(mouths == 1||mouths == 3||mouths == 5 || mouths == 7 || mouths == 8 || mouths == 10 || mouths == 12){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-31 23:59:59";
				List<JbRawdataHandle1> mouthClassList = jb_UploadServices.selectDailyreportForClass_jb(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
			if(mouths == 4||mouths == 6|| mouths == 9|| mouths == 11){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-30 23:59:59";
				List<JbRawdataHandle1> mouthClassList = jb_UploadServices.selectDailyreportForClass_jb(begin_time, end_time);
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthClassList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
		}
		}
	
	}
	@RequestMapping("/to_show_month_data_ajax")
	public void selectDataByMouthAjax_day(HttpServletResponse response,String mouth_date_begin,Model model)throws Exception{
		if(mouth_date_begin != null){
		String year = mouth_date_begin.substring(0,4);
		String mouth = mouth_date_begin.substring(5, 7);
		int years = Integer.parseInt(year);
		int mouths = Integer.parseInt(mouth);
		if(years % 4 == 0 && years % 100 != 0 || years % 400 == 0){
			if(mouths==2){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-29 23:59:59";
				List<JbRawdataHandle1> mouthList = jb_UploadServices.selectDailyreport_jb(begin_time, end_time);
				if(mouthList.size()>0){
					double suntime_nh3_yield_day_1 = 0.0;
					double suntime_electric_consume_day_1 = 0.0;
					double suntime_raw_gas_consume_day_1 = 0.0;
					Integer sunorig_id_day_1 = 0;
					for(int j = 0;j < mouthList.size();j++){
						JbRawdataHandle1 jbRawdata1 = mouthList.get(j);
						suntime_nh3_yield_day_1+=jbRawdata1.getTime_nh3_yield();
						suntime_electric_consume_day_1+=jbRawdata1.getTime_electric_consume();
						suntime_raw_gas_consume_day_1+=jbRawdata1.getTime_raw_gas_consume();
						sunorig_id_day_1+=jbRawdata1.getOrig_id();
					}
					JbRawdataHandle1 sunday1 = new JbRawdataHandle1();
					sunday1.setData_time(new Date());
					sunday1.setTime_nh3_yield(suntime_nh3_yield_day_1);
					sunday1.setTime_electric_consume(suntime_electric_consume_day_1);
					sunday1.setTime_raw_gas_consume(suntime_raw_gas_consume_day_1);
					sunday1.setOrig_id(sunorig_id_day_1);
					mouthList.add(sunday1);
					}
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
			if(mouths == 1||mouths == 3||mouths == 5 || mouths == 7 || mouths == 8 || mouths == 10 || mouths == 12){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-31 23:59:59";
				List<JbRawdataHandle1> mouthList = jb_UploadServices.selectDailyreport_jb(begin_time, end_time);
				if(mouthList.size()>0){
					double suntime_nh3_yield_day_1 = 0.0;
					double suntime_electric_consume_day_1 = 0.0;
					double suntime_raw_gas_consume_day_1 = 0.0;
					Integer sunorig_id_day_1 = 0;
					for(int j = 0;j < mouthList.size();j++){
						JbRawdataHandle1 jbRawdata1 = mouthList.get(j);
						suntime_nh3_yield_day_1+=jbRawdata1.getTime_nh3_yield();
						suntime_electric_consume_day_1+=jbRawdata1.getTime_electric_consume();
						suntime_raw_gas_consume_day_1+=jbRawdata1.getTime_raw_gas_consume();
						sunorig_id_day_1+=jbRawdata1.getOrig_id();
					}
					JbRawdataHandle1 sunday1 = new JbRawdataHandle1();
					sunday1.setData_time(new Date());
					sunday1.setTime_nh3_yield(suntime_nh3_yield_day_1);
					sunday1.setTime_electric_consume(suntime_electric_consume_day_1);
					sunday1.setTime_raw_gas_consume(suntime_raw_gas_consume_day_1);
					sunday1.setOrig_id(sunorig_id_day_1);
					mouthList.add(sunday1);
					}
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
				
			}
			if(mouths == 4||mouths == 6|| mouths == 9|| mouths == 11){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-30 23:59:59";
				List<JbRawdataHandle1> mouthList = jb_UploadServices.selectDailyreport_jb(begin_time, end_time);
				if(mouthList.size()>0){
					double suntime_nh3_yield_day_1 = 0.0;
					double suntime_electric_consume_day_1 = 0.0;
					double suntime_raw_gas_consume_day_1 = 0.0;
					Integer sunorig_id_day_1 = 0;
					for(int j = 0;j < mouthList.size();j++){
						JbRawdataHandle1 jbRawdata1 = mouthList.get(j);
						suntime_nh3_yield_day_1+=jbRawdata1.getTime_nh3_yield();
						suntime_electric_consume_day_1+=jbRawdata1.getTime_electric_consume();
						suntime_raw_gas_consume_day_1+=jbRawdata1.getTime_raw_gas_consume();
						sunorig_id_day_1+=jbRawdata1.getOrig_id();
					}
					JbRawdataHandle1 sunday1 = new JbRawdataHandle1();
					sunday1.setData_time(new Date());
					sunday1.setTime_nh3_yield(suntime_nh3_yield_day_1);
					sunday1.setTime_electric_consume(suntime_electric_consume_day_1);
					sunday1.setTime_raw_gas_consume(suntime_raw_gas_consume_day_1);
					sunday1.setOrig_id(sunorig_id_day_1);
					mouthList.add(sunday1);
					}
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
	       
		}else{
			if(mouths==2){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-28 23:59:59";
				List<JbRawdataHandle1> mouthList = jb_UploadServices.selectDailyreport_jb(begin_time, end_time);
				if(mouthList.size()>0){
					double suntime_nh3_yield_day_1 = 0.0;
					double suntime_electric_consume_day_1 = 0.0;
					double suntime_raw_gas_consume_day_1 = 0.0;
					Integer sunorig_id_day_1 = 0;
					for(int j = 0;j < mouthList.size();j++){
						JbRawdataHandle1 jbRawdata1 = mouthList.get(j);
						suntime_nh3_yield_day_1+=jbRawdata1.getTime_nh3_yield();
						suntime_electric_consume_day_1+=jbRawdata1.getTime_electric_consume();
						suntime_raw_gas_consume_day_1+=jbRawdata1.getTime_raw_gas_consume();
						sunorig_id_day_1+=jbRawdata1.getOrig_id();
					}
					JbRawdataHandle1 sunday1 = new JbRawdataHandle1();
					sunday1.setData_time(new Date());
					sunday1.setTime_nh3_yield(suntime_nh3_yield_day_1);
					sunday1.setTime_electric_consume(suntime_electric_consume_day_1);
					sunday1.setTime_raw_gas_consume(suntime_raw_gas_consume_day_1);
					sunday1.setOrig_id(sunorig_id_day_1);
					mouthList.add(sunday1);
					}
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
			if(mouths == 1||mouths == 3||mouths == 5 || mouths == 7 || mouths == 8 || mouths == 10 || mouths == 12){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-31 23:59:59";
				List<JbRawdataHandle1> mouthList = jb_UploadServices.selectDailyreport_jb(begin_time, end_time);
				if(mouthList.size()>0){
					double suntime_nh3_yield_day_1 = 0.0;
					double suntime_electric_consume_day_1 = 0.0;
					double suntime_raw_gas_consume_day_1 = 0.0;
					Integer sunorig_id_day_1 = 0;
					for(int j = 0;j < mouthList.size();j++){
						JbRawdataHandle1 jbRawdata1 = mouthList.get(j);
						suntime_nh3_yield_day_1+=jbRawdata1.getTime_nh3_yield();
						suntime_electric_consume_day_1+=jbRawdata1.getTime_electric_consume();
						suntime_raw_gas_consume_day_1+=jbRawdata1.getTime_raw_gas_consume();
						sunorig_id_day_1+=jbRawdata1.getOrig_id();
					}
					JbRawdataHandle1 sunday1 = new JbRawdataHandle1();
					sunday1.setData_time(new Date());
					sunday1.setTime_nh3_yield(suntime_nh3_yield_day_1);
					sunday1.setTime_electric_consume(suntime_electric_consume_day_1);
					sunday1.setTime_raw_gas_consume(suntime_raw_gas_consume_day_1);
					sunday1.setOrig_id(sunorig_id_day_1);
					mouthList.add(sunday1);
					}
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
			if(mouths == 4||mouths == 6|| mouths == 9|| mouths == 11){
				String begin_time = mouth_date_begin+"-01 00:00:00";
				String end_time = mouth_date_begin+"-30 23:59:59";
				List<JbRawdataHandle1> mouthList = jb_UploadServices.selectDailyreport_jb(begin_time, end_time);
				if(mouthList.size()>0){
					double suntime_nh3_yield_day_1 = 0.0;
					double suntime_electric_consume_day_1 = 0.0;
					double suntime_raw_gas_consume_day_1 = 0.0;
					Integer sunorig_id_day_1 = 0;
					for(int j = 0;j < mouthList.size();j++){
						JbRawdataHandle1 jbRawdata1 = mouthList.get(j);
						suntime_nh3_yield_day_1+=jbRawdata1.getTime_nh3_yield();
						suntime_electric_consume_day_1+=jbRawdata1.getTime_electric_consume();
						suntime_raw_gas_consume_day_1+=jbRawdata1.getTime_raw_gas_consume();
						sunorig_id_day_1+=jbRawdata1.getOrig_id();
					}
					JbRawdataHandle1 sunday1 = new JbRawdataHandle1();
					sunday1.setData_time(new Date());
					sunday1.setTime_nh3_yield(suntime_nh3_yield_day_1);
					sunday1.setTime_electric_consume(suntime_electric_consume_day_1);
					sunday1.setTime_raw_gas_consume(suntime_raw_gas_consume_day_1);
					sunday1.setOrig_id(sunorig_id_day_1);
					mouthList.add(sunday1);
					}
				ObjectMapper mapper =  new ObjectMapper();
				String jsonstr = mapper.writeValueAsString(mouthList);
				response.setContentType("text/javascript");
				response.getWriter().print(jsonstr);
			}
		}
		}
	}
	@RequestMapping("/to_show_month_data_ajax_Notime")
	public void selectDataByMouthAjax_dayNotime(HttpServletResponse response,Model model)throws Exception{
		JbRawdataHandle1 jbRawdataHandle1 = jb_UploadServices.getLastTime();
		if(jbRawdataHandle1 != null){
			Date time =  jbRawdataHandle1.getData_time();
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
			String db_endtime = sdf.format(time);
			String year_mouth = db_endtime.substring(0,7);
			String n_begin_time = year_mouth+"-01 00:00:00";
			String n_end_time = db_endtime;
			List<JbRawdataHandle1> mouthList = jb_UploadServices.selectDailyreport_jb(n_begin_time, n_end_time);
			ObjectMapper mapper =  new ObjectMapper();
			String jsonstr = mapper.writeValueAsString(mouthList);
			response.setContentType("text/javascript");
			response.getWriter().print(jsonstr);
		}
		}
		@RequestMapping("/to_show_month_class_ajax_Notime")
	public void selectDataByMouthAjaxNotime(HttpServletResponse response,Model model)throws Exception{
		JbRawdataHandle1 jbRawdataHandle1 = jb_UploadServices.getLastTime();
		if(jbRawdataHandle1 != null){
			Date time =  jbRawdataHandle1.getData_time();
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
			String db_endtime = sdf.format(time);
			String year_mouth = db_endtime.substring(0,7);
			String n_begin_time = year_mouth+"-01 00:00:00";
			String n_end_time = db_endtime;
			List<JbRawdataHandle1> mouthClassList = jb_UploadServices.selectDailyreportForClass_jb(n_begin_time, n_end_time);
			ObjectMapper mapper =  new ObjectMapper();
			String jsonstr = mapper.writeValueAsString(mouthClassList);
			response.setContentType("text/javascript");
			response.getWriter().print(jsonstr);
		}
}
	@RequestMapping("/do_select_Mouth")
	public String selectDataByMouth(String mouth_date_begin,Model model)throws Exception{
		if(mouth_date_begin == null){
			JbRawdataHandle1 jbRawdataHandle1 = jb_UploadServices.getLastTime();
			if(jbRawdataHandle1 != null){
				Date time =  jbRawdataHandle1.getData_time();
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
				String db_endtime = sdf.format(time);
				String year_mouth = db_endtime.substring(0,7);
				String n_begin_time = year_mouth+"-01 00:00:00";
				String n_end_time = db_endtime;
				List<JbRawdataHandle1> mouthList = jb_UploadServices.selectDailyreport_jb(n_begin_time, n_end_time);
				double suntime_nh3_yield_day_1 = 0.0;
				double suntime_electric_consume_day_1 = 0.0;
				double suntime_raw_gas_consume_day_1 = 0.0;
				Integer sunorig_id_day_1 = 0;
				for(int j = 0;j < mouthList.size();j++){
					JbRawdataHandle1 jbRawdata1 = mouthList.get(j);
					suntime_nh3_yield_day_1+=jbRawdata1.getTime_nh3_yield();
					suntime_electric_consume_day_1+=jbRawdata1.getTime_electric_consume();
					suntime_raw_gas_consume_day_1+=jbRawdata1.getTime_raw_gas_consume();
					sunorig_id_day_1+=jbRawdata1.getOrig_id();
				}
				JbRawdataHandle1 sunday1 = new JbRawdataHandle1();
				sunday1.setTime_nh3_yield(suntime_nh3_yield_day_1);
				sunday1.setTime_electric_consume(suntime_electric_consume_day_1);
				sunday1.setTime_raw_gas_consume(suntime_raw_gas_consume_day_1);
				sunday1.setOrig_id(sunorig_id_day_1);
				mouthList.add(sunday1);
				model.addAttribute("mouthList", mouthList);
				List<JbRawdataHandle1> mouthClassList = jb_UploadServices.selectDailyreportForClass_jb(n_begin_time, n_end_time);
				double suntime_nh3_yield_1 = 0.0;
				double suntime_electric_consume_1 = 0.0;
				double suntime_raw_gas_consume_1 = 0.0;
				Integer sunorig_id_1 = 0;
				double suntime_nh3_yield_2 = 0.0;
				double suntime_electric_consume_2 = 0.0;
				double suntime_raw_gas_consume_2 = 0.0;
				Integer sunorig_id_2 = 0;
				double suntime_nh3_yield_3 = 0.0;
				double suntime_electric_consume_3 = 0.0;
				double suntime_raw_gas_consume_3 = 0.0;
				Integer  sunorig_id_3 = 0;
				for(int i = 0;i<mouthClassList.size();i++){
					JbRawdataHandle1 jbRawdata = mouthClassList.get(i);
					if(jbRawdata.getOrig_id() != 0){
					int ban = jbRawdata.getShift()/jbRawdata.getOrig_id();
					if(ban==1){
						suntime_nh3_yield_1+=jbRawdata.getTime_nh3_yield();
						suntime_electric_consume_1+=jbRawdata.getTime_electric_consume();
						suntime_raw_gas_consume_1+=jbRawdata.getTime_raw_gas_consume();
						sunorig_id_1+=jbRawdata.getOrig_id();
					}if(ban==2){
						suntime_nh3_yield_2+=jbRawdata.getTime_nh3_yield();
						suntime_electric_consume_2+=jbRawdata.getTime_electric_consume();
						suntime_raw_gas_consume_2+=jbRawdata.getTime_raw_gas_consume();
						sunorig_id_2+=jbRawdata.getOrig_id();
					}if(ban==3){
						suntime_nh3_yield_3+=jbRawdata.getTime_nh3_yield();
						suntime_electric_consume_3+=jbRawdata.getTime_electric_consume();
						suntime_raw_gas_consume_3+=jbRawdata.getTime_raw_gas_consume();
						sunorig_id_3+=jbRawdata.getOrig_id();
					}
					}
				}
				JbRawdataHandle1 sunclass1 = new JbRawdataHandle1();
				sunclass1.setTime_nh3_yield(suntime_nh3_yield_1);
				sunclass1.setTime_electric_consume(suntime_electric_consume_1);
				sunclass1.setTime_raw_gas_consume(suntime_raw_gas_consume_1);
				sunclass1.setOrig_id(sunorig_id_1);
				sunclass1.setClassNumber(11);
				mouthClassList.add(sunclass1);
				JbRawdataHandle1 sunclass2 = new JbRawdataHandle1();
				sunclass2.setTime_nh3_yield(suntime_nh3_yield_2);
				sunclass2.setTime_electric_consume(suntime_electric_consume_2);
				sunclass2.setTime_raw_gas_consume(suntime_raw_gas_consume_2);
				sunclass2.setOrig_id(sunorig_id_2);
				sunclass2.setClassNumber(12);
				mouthClassList.add(sunclass2);
				JbRawdataHandle1 sunclass3 = new JbRawdataHandle1();
				sunclass3.setTime_nh3_yield(suntime_nh3_yield_3);
				sunclass3.setTime_electric_consume(suntime_electric_consume_3);
				sunclass3.setTime_raw_gas_consume(suntime_raw_gas_consume_3);
				sunclass3.setOrig_id(sunorig_id_3);
				sunclass3.setClassNumber(13);
				mouthClassList.add(sunclass3);
				model.addAttribute("mouthClassList", mouthClassList);
				model.addAttribute("edate_begin", n_begin_time.substring(0, 7));
			}
			
		}
		return "chart_month";
	}
	@RequestMapping("/do_select_Year")
	public String selectDataByYear(String Year_data_begin,Model model)throws Exception{
		//用户输入查询条件
		if(Year_data_begin == null){
			JbRawdataHandle1 jbRawdataHandle1 = jb_UploadServices.getLastTime();
			if(jbRawdataHandle1 != null){
				Date time =  jbRawdataHandle1.getData_time();
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
				String db_endtime = sdf.format(time);
				String year_mouth = db_endtime.substring(0,4);
				String begin_time = year_mouth+"-01-01 00:00:00";
				String end_time = year_mouth+"-12-31 23:59:59";
				List<JbRawdataHandle1> yearList = jb_UploadServices.selectQuarterreport_jb(begin_time, end_time);
				model.addAttribute("yearList", yearList);
				model.addAttribute("year_db", year_mouth);
			}
		}
		return "chart_year";
	}
	@RequestMapping("/do_select_year_ajax")
	public void selectDataByYearAjax(HttpServletResponse response,String Year_data_begin,Model model)throws Exception{
		//用户输入查询条件
		if(Year_data_begin != null){
		String begin_time = Year_data_begin+"-01-01 00:00:00";
		String end_time = Year_data_begin+"-12-31 23:59:59";
		List<JbRawdataHandle1> yearList = jb_UploadServices.selectQuarterreport_jb(begin_time, end_time);
		ObjectMapper mapper =  new ObjectMapper();
		String jsonstr = mapper.writeValueAsString(yearList);
		response.setContentType("text/javascript");
		response.getWriter().print(jsonstr);
		}
	}
	@RequestMapping("/do_select_year_ajax_Notime")
	public void selectDataByYearAjaxNotime(HttpServletResponse response,String Year_data_begin,Model model)throws Exception{
		JbRawdataHandle1 jbRawdataHandle1 = jb_UploadServices.getLastTime();
		if(jbRawdataHandle1 != null){
			Date time =  jbRawdataHandle1.getData_time();
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
			String db_endtime = sdf.format(time);
			String year_mouth = db_endtime.substring(0,4);
			String begin_time = year_mouth+"-01-01 00:00:00";
			String end_time = year_mouth+"-12-31 23:59:59";
			List<JbRawdataHandle1> yearList = jb_UploadServices.selectQuarterreport_jb(begin_time, end_time);
			ObjectMapper mapper =  new ObjectMapper();
			String jsonstr = mapper.writeValueAsString(yearList);
			response.setContentType("text/javascript");
			response.getWriter().print(jsonstr);
		}
	}
	@RequestMapping("/do_select_Quarter")
	public String selectDateByQuarter(String Quarter_year,String Quarter,Model model)throws Exception{
		//用户没有输入查询条件
		if((Quarter_year==null)||(Quarter == null)){
			JbRawdataHandle1 jbRawdataHandle1 = jb_UploadServices.getLastTime();
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
					List<JbRawdataHandle1> quaryList = jb_UploadServices.selectQuarterreport_jb(new_begin_query_time, new_end_QueryTime);
					model.addAttribute("quaryList", quaryList);
					model.addAttribute("quarter_text", "第一季度");
					model.addAttribute("year_text", end_QueryTime);
				}
				if(4 <= quarter_u && quarter_u <= 6 ){
					String new_end_QueryTime = db_endtime;
					String end_QueryTime = db_endtime.substring(0, 4);
					String new_begin_query_time = end_QueryTime+"-04-01 00:00:00";
					List<JbRawdataHandle1> quaryList = jb_UploadServices.selectQuarterreport_jb(new_begin_query_time, new_end_QueryTime);
					model.addAttribute("quaryList", quaryList);
					model.addAttribute("quarter_text", "第二季度");
					model.addAttribute("year_text", end_QueryTime);
				}
				if(7 <= quarter_u && quarter_u <= 9 ){
					String new_end_QueryTime = db_endtime;
					String end_QueryTime = db_endtime.substring(0, 4);
					String new_begin_query_time = end_QueryTime+"-07-01 00:00:00";
					List<JbRawdataHandle1> quaryList = jb_UploadServices.selectQuarterreport_jb(new_begin_query_time, new_end_QueryTime);
					model.addAttribute("quaryList", quaryList);
					model.addAttribute("quarter_text", "第三季度");
					model.addAttribute("year_text", end_QueryTime);
				}
				if(10 <= quarter_u && quarter_u <= 12 ){
					String new_end_QueryTime = db_endtime;
					String end_QueryTime = db_endtime.substring(0, 4);
					String new_begin_query_time = end_QueryTime+"-10-01 00:00:00";
					List<JbRawdataHandle1> quaryList = jb_UploadServices.selectQuarterreport_jb(new_begin_query_time, new_end_QueryTime);
					model.addAttribute("quaryList", quaryList);
					model.addAttribute("quarter_text", "第四季度");
					model.addAttribute("year_text", end_QueryTime);
				}
			}
			
		}
		return "chart_season";
	}
	@RequestMapping("/do_select_Quarter_ajax_Notime")
	public void selectDateByQuarterAJAXNotime(HttpServletResponse response,Model model)throws Exception{
			JbRawdataHandle1 jbRawdataHandle1 = jb_UploadServices.getLastTime();
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
					List<JbRawdataHandle1> quaryList = jb_UploadServices.selectQuarterreport_jb(new_begin_query_time, new_end_QueryTime);
					ObjectMapper mapper =  new ObjectMapper();
					String jsonstr = mapper.writeValueAsString(quaryList);
					response.setContentType("text/javascript");
					response.getWriter().print(jsonstr);
				}
				if(4 <= quarter_u && quarter_u <= 6 ){
					String new_end_QueryTime = db_endtime;
					String end_QueryTime = db_endtime.substring(0, 4);
					String new_begin_query_time = end_QueryTime+"-04-01 00:00:00";
					List<JbRawdataHandle1> quaryList = jb_UploadServices.selectQuarterreport_jb(new_begin_query_time, new_end_QueryTime);
					ObjectMapper mapper =  new ObjectMapper();
					String jsonstr = mapper.writeValueAsString(quaryList);
					response.setContentType("text/javascript");
					response.getWriter().print(jsonstr);
				}
				if(7 <= quarter_u && quarter_u <= 9 ){
					String new_end_QueryTime = db_endtime;
					String end_QueryTime = db_endtime.substring(0, 4);
					String new_begin_query_time = end_QueryTime+"-07-01 00:00:00";
					List<JbRawdataHandle1> quaryList = jb_UploadServices.selectQuarterreport_jb(new_begin_query_time, new_end_QueryTime);
					ObjectMapper mapper =  new ObjectMapper();
					String jsonstr = mapper.writeValueAsString(quaryList);
					response.setContentType("text/javascript");
					response.getWriter().print(jsonstr);
				}
				if(10 <= quarter_u && quarter_u <= 12 ){
					String new_end_QueryTime = db_endtime;
					String end_QueryTime = db_endtime.substring(0, 4);
					String new_begin_query_time = end_QueryTime+"-10-01 00:00:00";
					List<JbRawdataHandle1> quaryList = jb_UploadServices.selectQuarterreport_jb(new_begin_query_time, new_end_QueryTime);
					ObjectMapper mapper =  new ObjectMapper();
					String jsonstr = mapper.writeValueAsString(quaryList);
					response.setContentType("text/javascript");
					response.getWriter().print(jsonstr);
				}
			}
	}
	@RequestMapping("/do_select_Quarter_ajax")
	public void selectDateByQuarterAJAX(HttpServletResponse response,String Quarter_year,String Quarter,Model model)throws Exception{
		if((Quarter_year!=null)&&(Quarter != null)){
		if(Quarter.equals("第一季度")){
			String begin_QueryTime = Quarter_year+"-01-01 00:00:00";
			String end_QueryTime = Quarter_year+"-03-31 23:59:59";
			List<JbRawdataHandle1> quaryList = jb_UploadServices.selectQuarterreport_jb(begin_QueryTime, end_QueryTime);
			ObjectMapper mapper =  new ObjectMapper();
			String jsonstr = mapper.writeValueAsString(quaryList);
			response.setContentType("text/javascript");
			response.getWriter().print(jsonstr);
		}
		if(Quarter.equals("第二季度")){
			String begin_QueryTime = Quarter_year+"-04-01 00:00:00";
			String end_QueryTime = Quarter_year+"-06-30 23:59:59";
			List<JbRawdataHandle1> quaryList = jb_UploadServices.selectQuarterreport_jb(begin_QueryTime, end_QueryTime);
			ObjectMapper mapper =  new ObjectMapper();
			String jsonstr = mapper.writeValueAsString(quaryList);
			response.setContentType("text/javascript");
			response.getWriter().print(jsonstr);
		}
		if(Quarter.equals("第三季度")){
			String begin_QueryTime = Quarter_year+"-07-01 00:00:00";
			String end_QueryTime = Quarter_year+"-09-30 23:59:59";
			List<JbRawdataHandle1> quaryList = jb_UploadServices.selectQuarterreport_jb(begin_QueryTime, end_QueryTime);
			ObjectMapper mapper =  new ObjectMapper();
			String jsonstr = mapper.writeValueAsString(quaryList);
			response.setContentType("text/javascript");
			response.getWriter().print(jsonstr);
		}
		if(Quarter.equals("第四季度")){
			String begin_QueryTime = Quarter_year+"-10-01 00:00:00";
			String end_QueryTime = Quarter_year+"-12-31 23:59:59";
			List<JbRawdataHandle1> quaryList = jb_UploadServices.selectQuarterreport_jb(begin_QueryTime, end_QueryTime);
			ObjectMapper mapper =  new ObjectMapper();
			String jsonstr = mapper.writeValueAsString(quaryList);
			response.setContentType("text/javascript");
			response.getWriter().print(jsonstr);
		}
		}
	}
	@RequestMapping("/toupUifo")
	public String toupUifo()throws Exception{
		return "toupUifo";
	}
	@RequestMapping("/touppass")
	public String touppass()throws Exception{
		return "jb_change_pass";
	}
	@RequestMapping("/jb_backTable")
	public String tobackTable(Model model )throws Exception{
		List<Jb_feedback02> feedback02s = jb_UploadServices.selectVar_jb();
		if(feedback02s !=null){
			model.addAttribute("feedback02s", feedback02s);
			Date date = jb_UploadServices.selectCheckTime();
			model.addAttribute("cdate", date);
		}
		return "backtable";
	}
	@RequestMapping("/showtable")
	public String showtable(Model model )throws Exception{
		List<Jb_feedback02> feedback02s = jb_UploadServices.selectVar_jb();
		if(feedback02s !=null){
			model.addAttribute("feedback02s", feedback02s);
			Date cdate = jb_UploadServices.selectCheckTime();
			model.addAttribute("cdate", cdate);
		}
		return "showtable";
	}
	@RequestMapping("/jb_backTableHistory")
	public String jb_backTableHistory(Model model ,@RequestParam(value="page", defaultValue="1") Integer page)throws Exception{
		PageHelper.startPage(page, 20);
		List<Jb_feedback01> feedback01s = jb_UploadServices.selectAllfeedback_jb();
		model.addAttribute("feedback01s", feedback01s);
		model.addAttribute("page", page);
		PageInfo<Jb_feedback01> pageInfo = new PageInfo<Jb_feedback01>(feedback01s);
		Long count = pageInfo.getTotal();
		model.addAttribute("count", count);
		int pages = pageInfo.getPages();
		model.addAttribute("pages", pages);
		return "backTablHistory";
	}
	@RequestMapping("/jb_doUserVar")
	public void doUserVar(HttpServletResponse response, @RequestBody List<Jb_feedback05> xg)throws Exception{
		jb_UploadServices.updatefeedbacktype_jb();
		for(int i = 0 ; i <xg.size();i++){
			for(int j = 0;j<xg.get(i).getUservar().size();j++){
				Jb_feedback05 jb_feedback05 = new Jb_feedback05();
				jb_feedback05.setParid(xg.get(i).getId());
				jb_feedback05.setUseractive(xg.get(i).getUservar().get(j));
				jb_UploadServices.insertUserVar_jb(jb_feedback05);
			}
		}
	}
	@RequestMapping("/dofeedbackhis_jb")
	public String dofeedbackhis_jb(Model model ,String fid,HttpServletRequest request)throws Exception{
		int id = Integer.parseInt(fid);
		List<Jb_feedback01> feedback01s = jb_UploadServices.selectAllfeedback_jb();
		if(feedback01s != null){
			for(int i = 0;i <feedback01s.size();i++){
				if(id==feedback01s.get(i).getId()){
				Date cdate = feedback01s.get(i).getTime();
				model.addAttribute("cdate", cdate);
				}
			}
		}
		List<Jb_feedback02> feedback02s = jb_UploadServices.selectFeedbackforhis_jb(id);
		model.addAttribute("feedback02s", feedback02s);
		return "backtableWrited";
	}
}
