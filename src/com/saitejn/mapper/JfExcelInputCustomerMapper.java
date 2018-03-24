package com.saitejn.mapper;

import java.util.List;

import com.saitejn.pojo.JbClassinfor;
import com.saitejn.pojo.JbUserifo;
import com.saitejn.pojo.JfRawdataHandle1;
import com.saitejn.pojo.JfRawdataHandle2;
import com.saitejn.pojo.JfUploadMiddle;
import com.saitejn.pojo.Jfclassinfo;

/**
 * Excel数据扩展类
 * @class JbExcelInputCustomerMapper.java
 * @Description:
 * @author:罗康元
 * Company:赛特工信科技有限公司
 * @date :2016-9-18
 */
public interface JfExcelInputCustomerMapper {
	//根据时间查询数据库是否有重复记录，用于剔除上传的时候的重复记录
	public int fingInputByJftime(String jftime)throws Exception;
	//保存数据到数据表中间表
	public void saveDatetomiddle(JfUploadMiddle jfUploadMiddle) throws Exception; 
	//保存数据到数据表Excel表
	public void saveDatetoExcel(JfUploadMiddle jfUploadMiddle) throws Exception; 
	// 按时间查询所有的中甲表的数据
	public List<JfUploadMiddle> selectAllJfMiddle()throws Exception;
	// 保存数据到数据表handl1表
	public void saveDatetoHandl1(JfRawdataHandle1 jfRawdataHandle1) throws Exception;
	// 保存数据到数据表handl1表
	public void saveDatetoHandlMiddle(JfRawdataHandle1 jfRawdataHandle1) throws Exception;
	//按时间查询randatahandlmiddle的数据
	public List<JfRawdataHandle2> selectAllHandleMiddle()throws Exception;
	// 保存数据到数据表handl2表
	public void saveDatetoHandl2(JfRawdataHandle2 jfRawdataHandle2) throws Exception;
	public void saveDatetoMatlabHandl1(JfRawdataHandle1 jfRawdataHandle1) throws Exception;
	public void saveDatetoMatlabHandl2(JfRawdataHandle2 jfRawdataHandle2) throws Exception;
	//删除数据
	public void deleteUploadMiddle()throws Exception;
	//删除数据
	public void deleterawdataMiddle()throws Exception;
	//取得handl1中最后一条数据，与新上传的形成一个list,在计算
	public JfRawdataHandle1 selectTopOneHandl1()throws Exception;
	
	// 按用户输入的条件查询日报表.按班来查看
	public List<JfRawdataHandle1> selectDataByContidionAndClass3(String stime,String btime)throws Exception;
	public List<JfRawdataHandle1> selectDataByContidionAndClass1(String stime,String btime)throws Exception;
	public List<JfRawdataHandle1> selectDataByContidionAndClass2(String stime,String btime)throws Exception;
	public List<JfRawdataHandle1> selectDataByContidionAndClass2_1(String stime,String btime)throws Exception;
	//查询干净数据库中最后一条的干净数据集的时间
	public JfRawdataHandle1 getLastTime() throws Exception;
	//工厂新规定头一天的8:10到第二天的8:00为一个既是天按用户输入的条件查询日报表
	public List<JfRawdataHandle1> selectNewDataOneByContidion(String stime,String btime )throws Exception;
	// 工厂新规定头一天的8:10到第二天的8:00为一个既是天按用户输入的条件查询日报表
	public List<JfRawdataHandle1> selectNewDataTwoByContidion(String stime,String btime )throws Exception;
	//季度报表
	public List<JfRawdataHandle1> selectNewDataOneByQuarter(String stime,String btime )throws Exception;
	public List<JfRawdataHandle1> selectNewDataTwoByQuarter(String stime,String btime )throws Exception;
	public JfRawdataHandle1 selectNewDatathreeByQuarter(String stime,String btime )throws Exception;
	//查询所有的用户信息
	public List<JbUserifo> selectAlljbUser()throws Exception;
	//修改用户密码信息
	public void updateJFPassInfo(JbUserifo jbUserifo)throws Exception;
	//查询建峰班次信息
	public Jfclassinfo seclectByTime(String time) throws Exception;
	//减分月报表不统计数据显示散点图
	public List<JfRawdataHandle1>selectclass_1(String stime,String btime ,String classnumber)throws Exception;
	
	
	
	
	
	
	
	
	public JfRawdataHandle1 qt_getLastTime() throws Exception;
	public int qt_fingInputByJftime(String jftime)throws Exception;
	//保存数据到数据表中间表
	public void qt_saveDatetomiddle(JfUploadMiddle jfUploadMiddle) throws Exception; 
	

}
