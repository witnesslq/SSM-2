package com.saitejn.mapper;

import java.util.List;

import com.saitejn.pojo.JbRawdataHandle1;

/**
 * 金杯能耗
 * @JB_EnergyMapper
 * @Description 金杯能耗是分白班和夜班进行三班两运转，白班是8：00-20：00，夜班是指：20：00-次日8：00
 * @author 罗康元
 * @company 成都赛特工信科技有限公司
 * @date 2017-6-28
 */
public interface JB_EnergyMapper {
	//金杯日报表统计时间为8：01-23：59
	public List<JbRawdataHandle1> selectDailyreportFortime1_jb(String btime,String etime)throws Exception;
	//金杯日报表统计时间为0：00-8：01
	public List<JbRawdataHandle1> selectDailyreportFortime2_jb(String btime,String etime)throws Exception;
	//金杯日报表按班统计时间为白班8：01-20：01
	public List<JbRawdataHandle1> selectDailyReportForClass1_jb(String btime,String etime)throws Exception;
	//金杯日报表按班统计时间为夜班20：01-23：59
	public List<JbRawdataHandle1> selectDailyReportForClass2_1_jb(String btime,String etime)throws Exception;
	//金杯日报表按班统计时间为夜班00：00-08：01
	public List<JbRawdataHandle1> selectDailyReportForClass2_2_jb(String btime,String etime)throws Exception;
	//金杯季度报表统计时间为8.01-23：59：59
	public List<JbRawdataHandle1> selectQuarterForMouth_1_jb(String btime,String etime)throws Exception;
	//金杯季度报表统计时间为次日0.00-08：01：00
	public List<JbRawdataHandle1> selectQuarterForMouth_2_jb(String btime,String etime)throws Exception;
	public JbRawdataHandle1 selectQuarterForMouth_3_jb(String btime,String etime)throws Exception;
	
}
