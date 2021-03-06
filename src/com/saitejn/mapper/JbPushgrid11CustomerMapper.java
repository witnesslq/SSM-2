package com.saitejn.mapper;

import java.util.List;

import com.saitejn.pojo.JbPushgrid101;
import com.saitejn.pojo.JbPushgrid111WithBLOBs;
import com.saitejn.pojo.JbPushgrid112WithBLOBs;
import com.saitejn.pojo.JbPushgrid113WithBLOBs;
import com.saitejn.pojo.JbPushgrid114WithBLOBs;
import com.saitejn.pojo.JbPushgrid11WithBLOBs;
import com.saitejn.pojo.JbPushgrid12;
import com.saitejn.pojo.JbPushgrid13;
import com.saitejn.pojo.JbPushgrid13WithBLOBs;
import com.saitejn.pojo.JbPushgrid14WithBLOBs;
import com.saitejn.pojo.JbPushgrid15WithBLOBs;
import com.saitejn.pojo.JbPushgrid21;
import com.saitejn.pojo.JbPushgrid22WithBLOBs;
import com.saitejn.pojo.JbPushgrid23WithBLOBs;
import com.saitejn.pojo.JbPushgrid24WithBLOBs;
import com.saitejn.pojo.JbPushgrid31WithBLOBs;
import com.saitejn.pojo.JbPushgrid41;
import com.saitejn.pojo.JbPushgrid51;
import com.saitejn.pojo.JbPushgrid61;
import com.saitejn.pojo.JbPushgrid71;
import com.saitejn.pojo.JbPushgrid81WithBLOBs;
import com.saitejn.pojo.JbPushgrid82WithBLOBs;
import com.saitejn.pojo.JbPushgrid91WithBLOBs;
import com.saitejn.pojo.JbPushgrid92WithBLOBs;
import com.saitejn.pojo.JbPushgrid93WithBLOBs;
import com.saitejn.pojo.JbPushgrid94WithBLOBs;

/**
 * 最佳模式接口
 * @class JbPushgrid11CustomerMapper.java
 * @Description:
 * @author:罗康元
 * Company:赛特工信科技有限公司
 * @date :2016-10-8
 */
public interface JbPushgrid11CustomerMapper {
	/**
	 * 查询所有的最佳模式中的时间段划分
	 * @return
	 * @throws Exception
	 */
	public List<JbPushgrid11WithBLOBs> selectAllPush(int id)throws Exception;
	/**
	 * 各时间段和全体样本氨产量及能耗统计
	 * @return
	 * @throws Exception
	 */
	public List<JbPushgrid12> selectAllPush12(int id )throws Exception;
	/**
	 * 各时间段样本与全体样本吨氨能耗比较
	 * @return
	 * @throws Exception
	 */
	public List<JbPushgrid13WithBLOBs> selectAllPushgrid13s(int id ) throws Exception;
	/**
	 * 各时间段增效效益估算
	 * @return
	 * @throws Exception
	 */
	public List<JbPushgrid14WithBLOBs> selectAllPushgrid14s(int id ) throws Exception;
	/**
	 * 各时间段样本与全体样本氨产量、气耗、电耗月度折算比较-日期
	 * @return
	 * @throws Exception
	 */
	public List<JbPushgrid15WithBLOBs> selectAllWithBLOB15s(int id )throws Exception;
	/**
	 * 优类样本、最佳模式样本及全体样本累计量及吨氨能耗统计-日期
	 * @return
	 * @throws Exception
	 */
	public List<JbPushgrid21> selectAllJbPushgrid21s(int id )throws Exception;
	/**
	 * 优类样本、最佳模式样本及全体样本吨氨能耗比较-日期
	 * @return
	 * @throws Exception
	 */
	public List<JbPushgrid22WithBLOBs> selectAllPushgrid22WithBLOBs(int id )throws Exception;
	/**
	 * 优类样本增效效益估算
	 * @return
	 * @throws Exception
	 */
	public List<JbPushgrid23WithBLOBs> selectAllPushgrid23WithBLOBs(int id )throws Exception;
	/**
	 * 优类样本、最佳模式样本及全体样本液氨产量、气耗和电耗月度折算比较-日期
	 * @return
	 * @throws Exception
	 */
	public List<JbPushgrid24WithBLOBs> selectAllPushgrid24WithBLOBs(int id )throws Exception;
	/**
	 * 优化工艺指标
	 * @return
	 * @throws Exception
	 */
	public List<JbPushgrid31WithBLOBs> selectAllPushgrid31WithBLOBs(int id )throws Exception;
	/**
	 * 被动控制变量相关分析表
	 * @return
	 * @throws Exception
	 */
	public List<JbPushgrid41> selectAllPushgrid41s(int id )throws Exception;
	/**
	 * 主动控制变量相关分析表
	 * @return
	 * @throws Exception
	 */
	public List<JbPushgrid51> selectAllPushgrid51s(int id )throws Exception;
	/**
	 * 变量对响应值影响排序-日期
	 * @return
	 * @throws Exception
	 */
	public List<JbPushgrid61> selectAllPushgrid61s(int id )throws Exception;
	public List<JbPushgrid71> selectAllPushgrid71s(int id )throws Exception;
	/**
	 * 新样本与全体对照样本累计量统计及吨氨能耗比较-日期
	 * @return
	 * @throws Exception
	 */
	public List<JbPushgrid81WithBLOBs> selectAllPushgrid81WithBLOBs(int id )throws Exception;
	/**
	 * 新样本与优类对照样本累计量统计及吨氨能耗比较-日期
	 * @return
	 * @throws Exception
	 */
	public List<JbPushgrid82WithBLOBs> selectAllPushgrid82WithBLOBs(int id ) throws Exception;
	/**
	 * 增加吨氨消耗的重点关注调控变量贡献分析-日期
	 * @return
	 * @throws Exception
	 */
	public List<JbPushgrid91WithBLOBs> selectAllPushgrid91WithBLOBs(int id ) throws Exception;
	
	public List<JbPushgrid92WithBLOBs> selectAllPushgrid92WithBLOBs(int id ) throws Exception;
	
	public List<JbPushgrid93WithBLOBs> selectAllPushgrid93WithBLOBs(int id ) throws Exception;
	
	public List<JbPushgrid94WithBLOBs> selectAllPushgrid94WithBLOBs(int id ) throws Exception;
	
	public List<JbPushgrid101> selectAllPushgrid101WithBLOBs(int id ) throws Exception;
	
	public List<JbPushgrid111WithBLOBs> selectAllPushgrid111WithBLOBs( String guideData) throws Exception;
	
	public List<JbPushgrid112WithBLOBs> selectAllPushgrid112WithBLOBs( String guideData) throws Exception;
	
	public List<JbPushgrid113WithBLOBs> selectAllPushgrid113WithBLOBs(String guideData) throws Exception;
	
	public List<JbPushgrid114WithBLOBs> selectAllPushgrid114WithBLOBs( String guideData) throws Exception;

}
